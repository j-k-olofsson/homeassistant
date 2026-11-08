import sys,json,pathlib,collections,re,hashlib,shutil,asyncio
import yaml
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,dump,HA
OUT=RUN/'05-kort-och-namnmallar'
# Swedish macro: build context from the actual naming parts instead of friendly_name.
MACRO="""{%- macro namn(entity_id) -%}
  {%- set a = area_name(entity_id) or '' -%}
  {%- set d = device_name(entity_id) or '' -%}
  {%- set n = entity_name(entity_id) or '' -%}
  {%- set parts = namespace(values=[]) -%}
  {%- if a and a | lower not in (d ~ ' ' ~ n) | lower -%}
    {%- set parts.values = parts.values + [a] -%}
  {%- endif -%}
  {%- if d and d | lower not in n | lower -%}
    {%- set parts.values = parts.values + [d] -%}
  {%- endif -%}
  {%- if n -%}{%- set parts.values = parts.values + [n] -%}{%- endif -%}
  {{- parts.values | unique | join(' ') if parts.values else entity_id -}}
{%- endmacro -%}
"""
def template_rewrite(value):
 if not isinstance(value,str):return value
 new=value
 for variable in ['plant','state','p']:
  new=re.sub(r'\b'+variable+r'\.name\b','namn('+variable+'.entity_id)',new)
 if new!=value:new="{% from 'ha_namn.jinja' import namn %}\n"+new
 return new

def node_edits(node,name_map,edits):
 if isinstance(node,yaml.MappingNode):
  for k,v in node.value:
   if isinstance(k,yaml.ScalarNode) and isinstance(v,yaml.ScalarNode):
    if k.value in ['name','alias'] and v.value in name_map:
     edits.append((v.start_mark.index,v.end_mark.index,json.dumps(name_map[v.value],ensure_ascii=False)))
    if k.value in ['task','sensors']:
     new=template_rewrite(v.value)
     if new!=v.value:edits.append((v.start_mark.index,v.end_mark.index,json.dumps(new,ensure_ascii=False)))
   node_edits(v,name_map,edits)
 elif isinstance(node,yaml.SequenceNode):
  for v in node.value:node_edits(v,name_map,edits)

async def main():
 assert not OUT.exists();OUT.mkdir(mode=0o700)
 b=RUN/'04-hjalpare-grupper-automationer/before';es=json.load(open(b/'entities.json'));em={e['entity_id']:e for e in es}
 plan=json.load(open(DOC/'etapp-04-hjalpare-grupper-automationer.json'));name_map=collections.defaultdict(set)
 for op in plan['operations']:
  old=em[op['id']].get('name');old=old if old is not None else em[op['id']].get('original_name');name_map[old].add(op['after']['name'])
 names={k:next(iter(v)) for k,v in name_map.items() if len(v)==1};conflicts={k:list(v)for k,v in name_map.items()if len(v)>1}
 files=[ROOT/'configuration.yaml',ROOT/'automations.yaml',ROOT/'scripts.yaml',ROOT/'scenes.yaml',*sorted((ROOT/'packages').glob('*.yaml'))]
 changes={};counts={}
 for f in files:
  old=f.read_text();tree=yaml.compose(old);edits=[];node_edits(tree,names,edits)
  after=old
  for a,z,new in sorted(set(edits),reverse=True):after=after[:a]+new+after[z:]
  if after!=old:changes[f]=(old,after);counts[str(f.relative_to(ROOT))]=len(edits)
 macro=ROOT/'custom_templates/ha_namn.jinja';assert not macro.exists();changes[macro]=(None,MACRO)
 # Verify YAML changes are limited to names, aliases and the two template consumers.
 def strip_names(x):
  if isinstance(x,dict):return {k:strip_names(v)for k,v in x.items()if k not in ['name','alias','task','sensors']}
  if isinstance(x,list):return [strip_names(v)for v in x]
  return x
 for f,(old,new)in changes.items():
  if f.suffix=='.yaml':
   if f.name=='configuration.yaml':
    # Compose handles !include tags without executing external constructors.
    assert yaml.compose(new)
   else:assert strip_names(yaml.safe_load(old))==strip_names(yaml.safe_load(new)),str(f)
 dump(OUT/'planned_changes.json',{'files':counts,'ambiguous_source_names_left_unchanged':conflicts})
 for f,(old,new)in changes.items():
  rel=f.relative_to(ROOT)
  if old is not None:
   dst=OUT/'before_files'/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_text(old)
  dst=OUT/'after_files'/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_text(new)
 async with HA()as ha:
  pre_states=await ha.call('get_states');running={s['entity_id']:s['attributes'].get('current',0)for s in pre_states if s['entity_id'].startswith('automation.')}
  targets=['automation.vaxter_torr_blomma','automation.batteri_varna_om_for_lag_niva']
  assert all(running.get(e,0)==0 for e in targets)
  written=[];saved_boards=[]
  try:
   for f,(old,new)in changes.items():
    assert (f.read_text()if f.exists()else None)==old,('Concurrent source change',str(f))
    f.parent.mkdir(parents=True,exist_ok=True);tmp=f.with_name(f.name+'.namnstandard-tmp');tmp.write_text(new);tmp.replace(f);written.append(f)
   await ha.rest('/core/api/services/homeassistant/reload_custom_templates',{})
   test_ids=['sensor.sovrummet_temp','sensor.temp_hum_sovrum_humidity','sensor.sanglampor_diego_power','plant.citron','sensor.vattensensor_torkskap_temperature','sensor.does_not_exist']
   tpl="{% from 'ha_namn.jinja' import namn %}{% for e in ids %}{{ e }}={{ namn(e) }}\\n{% endfor %}"
   # Template endpoint returns text, unlike JSON REST helper.
   async with ha.s.post('http://supervisor/core/api/template',json={'template':tpl,'variables':{'ids':test_ids}})as response:
    text=await response.text();assert response.status==200,text
   (OUT/'name_template_tests.txt').write_text(text)
   assert 'Sovrummet Klimatsensor Temperatur'in text,text
   config=await ha.rest('/core/api/config/core/check_config',{});assert config['result']=='valid'and not config.get('errors'),config
   automations=yaml.safe_load((ROOT/'automations.yaml').read_text());by_unique={str(a.get('id')):a for a in automations}
   for eid in targets:
    unique=str(em[eid]['unique_id']);auto=by_unique[unique]
    def find_templates(x):
     if isinstance(x,str)and'from \'ha_namn.jinja\''in x:yield x
     elif isinstance(x,dict):
      for v in x.values():yield from find_templates(v)
     elif isinstance(x,list):
      for v in x:yield from find_templates(v)
    for template in find_templates(auto):
     async with ha.s.post('http://supervisor/core/api/template',json={'template':template,'variables':{'threshold':15,'exclude':{'entity_id':[]}}})as response:
      rendered=await response.text();assert response.status==200,rendered
    await ha.rest('/core/api/services/automation/reload',{'id':unique})
   # Update only name values on stored dashboards. Entity references and actions stay intact.
   labels={'Poolprylar':'Poolutrustning','Vinterprylar':'Vinterutrustning','CPU Temp':'Processortemperatur','OS reboot':'Senaste systemstart','Transferavgift':'Överföringsavgift','Spot påslag':'Spotpåslag','Total Energi':'Energi totalt','Daglig energi':'Energi idag','Odometer':'Vägmätare','Batteri':'Batterinivå'}
   board_changes={}
   def walk(x,view,stats):
    if isinstance(x,dict):
     if isinstance(x.get('name'),str)and x['name']in labels:x['name']=labels[x['name']];stats['labels']+=1
     if x.get('type')=='thermostat'and str(x.get('entity','')).startswith('climate.')and view=='Värme':x['name']=[{'type':'area'},{'type':'device'}];stats['context_names']+=1
     for k,v in list(x.items()):
      if k=='template'and isinstance(v,str):
       new=template_rewrite(v)
       if new!=v:x[k]=new;stats['templates']+=1
      elif isinstance(v,(dict,list)):walk(v,view,stats)
    elif isinstance(x,list):
     for v in x:walk(v,view,stats)
   dashboards=await ha.call('lovelace/dashboards/list')
   for b in dashboards:
    if b['mode']!='storage':continue
    path=b['url_path'];before=await ha.call('lovelace/config',url_path=path);after=json.loads(json.dumps(before));stats=collections.Counter()
    for view in after.get('views',[]):walk(view,view.get('title'),stats)
    if after==before:continue
    def refs(x):return collections.Counter(e for e in re.findall(r'(?<![a-z0-9_.])[a-z_]+\.[a-z0-9_]+(?![a-z0-9_.])',json.dumps(x)) if e in em)
    assert refs(before)==refs(after),('Unexpected dashboard references',path)
    # Render the dynamic mini-media-player template before saving it.
    def templates(x):
     if isinstance(x,dict):
      for k,v in x.items():
       if k=='template'and isinstance(v,str)and'from \'ha_namn.jinja\''in v:yield v
       elif isinstance(v,(dict,list)):yield from templates(v)
     elif isinstance(x,list):
      for v in x:yield from templates(v)
    for template in templates(after):
     async with ha.s.post('http://supervisor/core/api/template',json={'template':template})as response:
      rendered=await response.text();assert response.status==200,rendered
    dump(OUT/('dashboard-'+path+'-before.json'),before);dump(OUT/('dashboard-'+path+'-after.json'),after)
    assert await ha.call('lovelace/config',url_path=path)==before
    await ha.call('lovelace/config/save',url_path=path,config=after);saved_boards.append((path,before))
    assert await ha.call('lovelace/config',url_path=path)==after
    board_changes[path]=dict(stats)
   result={'status':'verified','source_edits':counts,'dashboard_changes':board_changes,'targeted_automation_reloads':targets,'configuration_check':config,'references_unchanged':True,'custom_template_evaluation':'passed'}
   dump(OUT/'verification.json',result);print(json.dumps(result,ensure_ascii=False))
  except Exception as error:
   for path,before in reversed(saved_boards):await ha.call('lovelace/config/save',url_path=path,config=before)
   for f in reversed(written):
    old=changes[f][0]
    if old is None:f.unlink()
    else:f.write_text(old)
   await ha.rest('/core/api/services/homeassistant/reload_custom_templates',{})
   for eid in targets:
    try:await ha.rest('/core/api/services/automation/reload',{'id':str(em[eid]['unique_id'])})
    except Exception:pass
   dump(OUT/'failure.json',{'error':str(error),'files_restored':True,'dashboards_restored':True});raise
if __name__=='__main__':asyncio.run(main())
