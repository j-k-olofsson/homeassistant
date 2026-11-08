#!/usr/bin/env python3
"""Read-only check of active HA references/actions, including archived entries.
Uses the installed local YAML parser. Never prints credentials or config values.
"""
import json,pathlib,re,sys,yaml
ROOT=pathlib.Path(__file__).resolve().parents[1];DOC=ROOT/'docs/namnstandard'
REF=re.compile(r'(?<![a-zA-Z0-9_.])(?P<prefix>states\.)?(?P<eid>[a-z_]+\.[a-z0-9_]+)(?(prefix)(?![a-z0-9_])|(?![a-z0-9_.]))')
SKIP={'unique_id','previous_unique_id','device_id','entry_id','user_id','name','title','alias','aliases','description','default_channel','api_key','token','password','refresh_token','access_token','noise_psk','client_secret','host','hostname','identifiers','connections','url','resource','image','icon','example','translation_key'}
class InputRef(str):pass
class Loader(yaml.SafeLoader):pass
Loader.add_multi_constructor('!',lambda loader,tag,node:loader.construct_scalar(node)if isinstance(node,yaml.ScalarNode)else loader.construct_sequence(node)if isinstance(node,yaml.SequenceNode)else loader.construct_mapping(node))
Loader.add_constructor('!input',lambda loader,node:InputRef(loader.construct_scalar(node)))
def audit(services,states=None):
 er=json.load(open(ROOT/'.storage/core.entity_registry'))['data']['entities'];known={e['entity_id']for e in er}|{s['entity_id']for s in(states or[])}|{'sun.sun','zone.home','conversation.home_assistant'};domains={e.split('.')[0]for e in known};svc={d+'.'+n for d,items in services.items()for n in items};deferred={'notify.flocken'};unknown=[];actions=[];pending=[];dynamic=[];archived=[];errors=[];sentinels=[];used_blueprints=set()
 def walk(obj,file,path=(),key=None):
  if key in SKIP:return
  if len(path)>=2 and path[:2]==('recorder','exclude'):return
  if isinstance(obj,str):
   if key in['action','service','perform_action','service_name']:
    if re.fullmatch(r'[a-z_]+\.[a-z0-9_]+',obj)and obj not in svc:
     item={'file':file,'path':'/'.join(map(str,path)),'service':obj};(pending if obj in deferred else actions).append(item)
    elif '{{'in obj or'{%'in obj:dynamic.append({'file':file,'path':'/'.join(map(str,path))})
    return
   if key in['trigger','label']and '{{'not in obj and'{%'not in obj:return
   masked=re.sub(r'https?://[^\s"\'<>]+','',obj);bound=set(re.findall(r'{%-?\s*(?:for|set)\s+(\w+)',obj))
   for hit in REF.finditer(masked):
    eid=hit['eid'];domain=eid.split('.')[0]
    if domain in domains and domain not in bound and eid not in known and eid not in svc:unknown.append({'file':file,'path':'/'.join(map(str,path)),'entity_id':eid})
  elif isinstance(obj,list):
   for i,v in enumerate(obj):walk(v,file,path+(i,),key)
  elif isinstance(obj,dict):
   for k,v in obj.items():
    if isinstance(k,str)and re.fullmatch(r'[a-z_]+\.[a-z0-9_]+',k)and k.split('.')[0]in domains and k not in known and k not in svc:unknown.append({'file':file,'path':'/'.join(map(str,path)),'entity_id':k,'dictionary_key':True})
    walk(v,file,path+(k,),k)
 def expand_blueprints(obj):
  if isinstance(obj,dict):
   use=obj.get('use_blueprint')
   if isinstance(use,dict)and use.get('path'):
    candidates=[ROOT/'blueprints'/kind/use['path']for kind in ['automation','script']]
    file=next((f for f in candidates if f.is_file()and (ROOT/'blueprints').resolve()in f.resolve().parents),None)
    if file is None:errors.append({'file':str(use['path']),'error':'Referenced blueprint missing'});return
    try:
     blueprint=yaml.load(file.read_text(),Loader=Loader);params={}
     def defaults(inputs):
      for name,spec in inputs.items():
       if not isinstance(spec,dict):continue
       if 'input'in spec:defaults(spec['input'])
       elif 'default'in spec:params[name]=spec['default']
     defaults(blueprint.get('blueprint',{}).get('input',{}));params.update(use.get('input',{}))
     def resolve(value):
      if isinstance(value,InputRef):
       if value not in params:raise ValueError('Missing blueprint input')
       return params[value]
      if isinstance(value,list):return[resolve(v)for v in value]
      if isinstance(value,dict):return{k:resolve(v)for k,v in value.items()}
      return value
     body=resolve({k:v for k,v in blueprint.items()if k!='blueprint'});walk(body,str(file.relative_to(ROOT)));used_blueprints.add(str(file.relative_to(ROOT)))
    except (OSError,ValueError,yaml.YAMLError)as ex:errors.append({'file':str(file.relative_to(ROOT)),'error':type(ex).__name__})
   for value in obj.values():expand_blueprints(value)
  elif isinstance(obj,list):
   for value in obj:expand_blueprints(value)
 files=[*ROOT.glob('*.yaml'),*ROOT.glob('packages/**/*.yaml'),*ROOT.glob('custom_templates/*.jinja')];count=0
 for f in files:
  if f.name in['secrets.yaml','known_devices.yaml','recorder_excluded_entities.yaml']:continue
  try:
   obj=yaml.load(f.read_text(),Loader=Loader)if f.suffix=='.yaml'else f.read_text();walk(obj,str(f.relative_to(ROOT)));expand_blueprints(obj);count+=1
  except (OSError,ValueError,yaml.YAMLError)as e:errors.append({'file':str(f.relative_to(ROOT)),'error':type(e).__name__})
 for f in(ROOT/'.storage').iterdir():
  if not(f.name.startswith('lovelace')or f.name in['core.config_entries','energy','person','input_boolean','input_number','input_select','input_datetime','input_text','timer','counter','schedule','ai_task','assist_pipeline.pipelines','frontend.system_data']):continue
  if not f.is_file()or any(x in f.name for x in['.bak','.NEW','.BACKUP']):continue
  try:
   obj=json.load(f.open());count+=1
   if f.name=='core.config_entries':
    for e in obj['data']['entries']:
     if e.get('disabled_by')is not None:archived.append({'entry_id':e['entry_id'],'domain':e['domain']});continue
     c=dict(e);c['data']=dict(e.get('data',{}))
     if e['domain']=='powercalc'and e['data'].get('entity_id')=='sensor.dummy'and e['data'].get('device'):
      sentinels.append(e['entry_id']);c['data'].pop('entity_id')
     walk(c,str(f.relative_to(ROOT)),('entries',e['entry_id']))
   else:walk(obj,str(f.relative_to(ROOT)))
  except (ValueError,OSError)as e:errors.append({'file':str(f.relative_to(ROOT)),'error':type(e).__name__})
 return {'read_only':True,'sources_and_stores_checked':count,'used_blueprints_resolved':sorted(used_blueprints),'known_entity_ids':len(known),'unknown_active_entity_references':unknown,'unknown_active_actions':actions,'deferred_actions':pending,'dynamic_actions_reviewed_separately':dynamic,'disabled_entries_excluded':len(archived),'powercalc_dummy_sources_recognized':len(sentinels),'read_errors':errors}
def main():
 if len(sys.argv)<2:raise SystemExit('Usage: ha_configuration_audit.py SERVICES_JSON [STATES_JSON]')
 result=audit(json.load(open(sys.argv[1])),json.load(open(sys.argv[2]))if len(sys.argv)>2 else[]);print(json.dumps(result,ensure_ascii=False,indent=2));return int(bool(result['unknown_active_entity_references']or result['unknown_active_actions']or result['read_errors']))
if __name__=='__main__':sys.exit(main())
