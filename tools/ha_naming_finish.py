#!/usr/bin/env python3
"""Finish a backed-up HA naming migration with a controlled cold dependency cutover.
Planning is read-only. Registry IDs move through HA/recorder APIs. Storage is written
only after Supervisor confirms HA is stopped. Every changed file has a before copy.
"""
import asyncio,collections,copy,datetime,fnmatch,json,os,pathlib,re,shutil,sys,time,hashlib,ast
import aiohttp,yaml,urllib.parse
from ha_naming_migration import HA,ROOT,RUN,DOC,dump,snapshot,append_journal,slug
from ha_naming_ids import REFERENCE_RE,rewrite,obj_rewrite,history
P=ROOT/'backups/namnstandard_20261108';OUT=P/'18-beroenden-och-slutlig-id-migration'
OWN_COMPONENTS=['granny_sync','granny_goodnight','plant']
HELPERS=['input_boolean','input_number','input_button','input_datetime','input_select','input_text','counter','timer','schedule']
STORES=['core.config_entries','person','ai_task','assist_pipeline.pipelines','cloud','powercalc_group','energy','core.area_registry','frontend.system_data']
class Loader(yaml.SafeLoader):pass
Loader.add_multi_constructor('!',lambda loader,tag,node:loader.construct_scalar(node)if isinstance(node,yaml.ScalarNode)else loader.construct_sequence(node)if isinstance(node,yaml.SequenceNode)else loader.construct_mapping(node))
def load_yaml(text):return yaml.load(text,Loader=Loader)
def atomic(path,text):
 tmp=path.with_name(path.name+'.namnstandard-tmp');tmp.write_text(text);os.chmod(tmp,path.stat().st_mode&0o777);tmp.replace(path)
def refs(text):return {h['eid']for h in REFERENCE_RE.finditer(text)}
def service_ids(services):return {domain+'.'+name for domain,items in services.items()for name in items}
def text_rewrite(text,mapping,services):
 # YAML unique IDs and service names are identities, even when spelled like an entity.
 spans=[]
 for h in re.finditer(r"(?P<key>action|service|perform_action|unique_id|host|hostname|username|password|api_key|token)[\\\"']*\s*:\s*[\\\"']*(?P<value>[a-z_]+\.[a-z0-9_]+)",text):
  if h['key']not in['action','service','perform_action']or h['value']in services:spans.append(h.span('value'))
 for h in re.finditer(r'https?://[^/\s\"\'<>]+',text):spans.append(h.span())
 for h in re.finditer(r'!\w+\s+[\"\']?(?P<value>[a-z_]+\.[a-z0-9_]+)',text):spans.append(h.span('value'))
 def sub(h):
  if any(a<=h.start('eid')<b for a,b in spans):return h[0]
  return(h['prefix']or'')+mapping.get(h['eid'],h['eid'])
 return REFERENCE_RE.sub(sub,text)
def structured(obj,mapping,services,key=None):
 if isinstance(obj,str):
  if key in ['unique_id','entry_id','device_id','user_id','identifiers','connections','host','hostname','username','client_id','password','token','access_token','refresh_token','api_key','noise_psk','client_secret','private_key','certificate']:return obj
  if obj.startswith(('http://','https://')):
   url=urllib.parse.urlsplit(obj)
   return urllib.parse.urlunsplit(url._replace(path=text_rewrite(url.path,mapping,services),query=text_rewrite(url.query,mapping,services),fragment=text_rewrite(url.fragment,mapping,services)))
  if key in ['unique_id','entry_id','device_id','user_id','identifiers','connections']:return obj
  if key in ['service','action','perform_action','service_name']and obj in services:return obj
  return text_rewrite(obj,mapping,services)
 if isinstance(obj,list):return[structured(v,mapping,services,key)for v in obj]
 if isinstance(obj,dict):return{rewrite(k,mapping):structured(v,mapping,services,k)for k,v in obj.items()}
 return obj
def merge_reference_updates(actual,before,expected,path=()):
 """Apply each rename once, including when native listeners already updated a field."""
 if before==expected:return copy.deepcopy(actual)
 if isinstance(before,dict)and isinstance(expected,dict)and isinstance(actual,dict):
  if set(before)!=set(expected):
   assert actual==before or actual==expected,('Concurrent reference-key change',path)
   return copy.deepcopy(expected)
  merged=copy.deepcopy(actual)
  for key in before:
   assert key in actual,('Reference field disappeared',path+(key,))
   merged[key]=merge_reference_updates(actual[key],before[key],expected[key],path+(key,))
  return merged
 if isinstance(before,list)and isinstance(expected,list)and isinstance(actual,list):
  assert len(actual)==len(before)==len(expected),('Reference list changed concurrently',path)
  return[merge_reference_updates(a,b,e,path+(i,))for i,(a,b,e)in enumerate(zip(actual,before,expected))]
 if path and path[-1]in['name','title','description']:return copy.deepcopy(actual if actual not in[before,expected]else expected)
 assert actual==before or actual==expected,('Reference changed concurrently',path)
 return copy.deepcopy(expected)
def normal_options(before,after):
 if before==after:return True
 adjusted=copy.deepcopy(after);previous=before.get('cloud.google_assistant',{})
 if 'should_expose'in previous or adjusted.get('cloud.google_assistant',{}).get('should_expose')is not False:return False
 if json.load(open(ROOT/'.storage/homeassistant.exposed_entities'))['data']['assistants'].get('cloud.google_assistant',{}).get('expose_new')is not False:return False
 adjusted['cloud.google_assistant'].pop('should_expose')
 if 'cloud.google_assistant'not in before and not adjusted['cloud.google_assistant']:adjusted.pop('cloud.google_assistant')
 return adjusted==before
async def supervisor(route,data=None):
 async with aiohttp.ClientSession(headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']},timeout=aiohttp.ClientTimeout(total=300))as s:
  async with s.request('GET'if data is None else'POST','http://supervisor'+route,json=data)as r:
   v=await r.json();assert r.status==200 and v.get('result')=='ok',(route,r.status,v);return v['data']
async def core_running():
 process=await asyncio.create_subprocess_exec('docker','inspect','--format','{{.State.Running}}','homeassistant',stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE)
 output,error=await process.communicate();assert process.returncode==0,'Cannot confirm HA container state'
 value=output.decode().strip();assert value in['true','false'],value
 return value=='true'
async def ready():
 deadline=time.monotonic()+300
 while time.monotonic()<deadline:
  try:
   async with HA()as h:
    c=await h.call('get_config')
    if c.get('state')=='RUNNING':return
  except Exception:pass
  await asyncio.sleep(3)
 raise RuntimeError('HA did not reach RUNNING within 300 seconds')
def all_verified_mapping():
 mapping={}
 for f in sorted(RUN.glob('*/verification.json')):
  mp=f.parent/'id_map.json'
  if mp.exists():
   stage=json.load(open(mp))
   mapping={k:stage.get(v,v)for k,v in mapping.items()}
   mapping.update(stage)
   mapping={k:v for k,v in mapping.items()if k!=v}
 return mapping
def source_paths():
 paths=[*ROOT.glob('*.yaml'),*ROOT.glob('packages/**/*.yaml'),*ROOT.glob('blueprints/**/*.yaml'),*ROOT.glob('custom_templates/*.jinja')]
 for c in OWN_COMPONENTS:paths += [*ROOT.glob('custom_components/'+c+'/**/*.py'),*ROOT.glob('custom_components/'+c+'/**/*.yaml')]
 for name in ['thread-network-map','feedback-control-card']:paths += list((ROOT/'www'/name).glob('*.js'))
 paths += [ROOT/'tools/trigger_granny_plan.sh',ROOT/'tools/recorder_filter_audit.py',*ROOT.glob('tools/test_granny*.py')]
 return list(dict.fromkeys(f for f in paths if f.is_file()and f.name!='secrets.yaml'))
def resolve_plant_registered_ids(text):
 """Derived sensors must capture the registered source ID, not a legacy suggestion."""
 tree=ast.parse(text);lines=text.splitlines(keepends=True);edits=[]
 for node in ast.walk(tree):
  if not isinstance(node,ast.If):continue
  call=node.test
  if isinstance(call,ast.UnaryOp)and isinstance(call.op,ast.Not)and isinstance(call.operand,ast.Attribute)and call.operand.attr=='_is_new_entity':
   call=ast.parse('ent_reg.async_get_entity_id(NUMBER_DOMAIN, DOMAIN, self._attr_unique_id)',mode='eval').body
  if not isinstance(call,ast.Call)or not isinstance(call.func,ast.Attribute)or call.func.attr!='async_get_entity_id':continue
  if len(node.body)!=1 or not isinstance(node.body[0],ast.Assign):continue
  assignment=node.body[0]
  if not isinstance(assignment.value,ast.Call)or not isinstance(assignment.value.func,ast.Name)or assignment.value.func.id!='async_generate_entity_id':continue
  if ast.unparse(assignment.targets[0])!='self.entity_id':continue
  indent=' '*node.col_offset;args=', '.join(ast.unparse(arg)for arg in call.args)
  replacement=(indent+'if (\n'+indent+'    registered_entity_id := '+ast.unparse(call.func)+'(\n'+indent+'        '+args+'\n'+indent+'    )\n'+indent+'):\n'+indent+'    self.entity_id = registered_entity_id\n')
  edits.append((node.lineno-1,node.end_lineno,replacement))
 for start,end,replacement in sorted(edits,reverse=True):lines[start:end]=[replacement]
 result=''.join(lines)
 result=result.replace('# Only force entity_id for existing entities (backwards compat).','# Resolve registered IDs before derived sensors capture their sources.')
 return result
def sync_source_names(text,path,entities,devices):
 """Keep source labels aligned by stable unique_id; preserve YAML formatting."""
 by_uid=collections.defaultdict(list)
 for e in entities:by_uid[str(e.get('unique_id'))].append(e)
 edits=[]
 def walk(node,trail=()):
  if isinstance(node,yaml.MappingNode):
   fields={k.value:v for k,v in node.value if isinstance(k,yaml.ScalarNode)};chosen=None;field=None
   if 'unique_id'in fields and 'name'in fields and isinstance(fields['unique_id'],yaml.ScalarNode):
    candidates=by_uid.get(fields['unique_id'].value,[])
    if len(candidates)==1:chosen=candidates[0];field='name'
   if 'id'in fields and 'alias'in fields and isinstance(fields['id'],yaml.ScalarNode):
    candidates=[e for e in by_uid.get(fields['id'].value,[])if e['platform']=='automation']
    if len(candidates)==1:chosen=candidates[0];field='alias'
   if 'alias'in fields and trail and(path.name=='scripts.yaml'and len(trail)==1 or len(trail)>1 and trail[-2]=='script'):
    candidates=[e for e in by_uid.get(str(trail[-1]),[])if e['platform']=='script']
    if len(candidates)==1:chosen=candidates[0];field='alias'
   if 'name'in fields and len(trail)>1 and trail[-2]in HELPERS:
    candidates=[e for e in by_uid.get(str(trail[-1]),[])if e['platform']==trail[-2]]
    if len(candidates)==1:chosen=candidates[0];field='name'
   if chosen:
    deferred=json.load(open(DOC/'restpunkter.json'))
    if chosen['entity_id']in deferred['protected_entity_ids']or chosen.get('device_id')in deferred['protected_device_ids']:chosen=None
   if chosen and field and isinstance(fields[field],yaml.ScalarNode):
    name=chosen.get('name');old=fields[field]
    if name=='' and chosen.get('device_id'):
     d=devices.get(chosen['device_id'],{});name=d.get('name_by_user')or d.get('name')
    if isinstance(name,str)and name and old.value!=name and '{{'not in old.value and '{%'not in old.value:
     edits.append((old.start_mark.index,old.end_mark.index,json.dumps(name,ensure_ascii=False)))
   for key,value in node.value:walk(value,trail+(key.value,))
  elif isinstance(node,yaml.SequenceNode):
   for i,value in enumerate(node.value):walk(value,trail+(i,))
 walk(yaml.compose(text,Loader=Loader))
 for a,b,value in sorted(set(edits),reverse=True):text=text[:a]+value+text[b:]
 return text
def make_title(entry,entities,devices,parts):
 domain=entry['domain'];candidates=[e for e in entities if e.get('config_entry_id')==entry['entry_id']]
 eligible={'group','template','generic_thermostat','generic_hygrostat','switch_as_x','plant','esphome','xiaomi_ble','bthome','shelly','powercalc','mobile_app','file','haghs','smhi','sun','moon'}
 if domain not in eligible or not candidates:return None,None
 deferred=json.load(open(DOC/'restpunkter.json'))
 if any(e['entity_id']in deferred['protected_entity_ids']or e.get('device_id')in deferred['protected_device_ids']for e in candidates):return None,None
 if domain=='powercalc':
  source=entry['data'].get('entity_id');p=parts.get(source,{})
  short=p.get('device')or p.get('name')or entry['data'].get('name')
  if not short:return None,None
  kind={'light':'belysning','switch':'brytare'}.get((source or'').split('.')[0],'')
  label='Beräknad förbrukning'+(' '+kind if kind else'')
  return ' '.join(x for x in [p.get('area'),short,'–',label]if x),short+' – '+label.lower()
 preferred={'generic_thermostat':'climate','generic_hygrostat':'humidifier','plant':'plant'}
 chosen=sorted(candidates,key=lambda e:(e['entity_id'].split('.')[0]!=preferred.get(domain,entry.get('options',{}).get('group_type')),bool(e.get('disabled_by')),bool(e.get('entity_category')),not(e.get('name')==''or e.get('original_name')in[None,''])))[0]
 part=parts.get(chosen['entity_id'],{});d=devices.get(chosen.get('device_id'),{});device=d.get('name_by_user')or d.get('name')
 if domain in ['esphome','xiaomi_ble','bthome','shelly','mobile_app']:
  counts=collections.Counter(e.get('device_id')for e in candidates if e.get('device_id'));did=counts.most_common(1)[0][0]if counts else None
  d=devices.get(did,{});device=d.get('name_by_user')or d.get('name');area=next((parts[e['entity_id']].get('area')for e in candidates if e.get('device_id')==did),None)
  if not device:return None,None
  title=' '.join(x for x in [area,device]if x)
  if domain=='mobile_app'and device=='SM-T835':title+=' – app '+entry['entry_id'][-6:].lower()
  return title,None
 short=part.get('name')or device
 if not short:return None,None
 names=[]
 for x in [part.get('area'),device,part.get('name')]:
  if x and x not in names:names.append(x)
 return ' '.join(names),short
async def plan():
 assert not(OUT/'journal.jsonl').exists(),'A cutover journal exists; inspect before retrying'
 revision=OUT/'planning_revisions'/datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
 for name in['before_files','after_files','preview','plan.json','preflight_verification.json','id_map.json','all_map.json','order.json']:
  src=OUT/name
  if src.exists():revision.mkdir(parents=True,exist_ok=True);src.rename(revision/name)
 async with HA()as h:
  b=await snapshot(h,OUT/'before');dump(OUT/'services.json',await h.call('get_services'))
  dump(OUT/'config_entries_api_before.json',await h.rest('/core/api/config/config_entries/entry'))
  ids=[e['entity_id']for e in b['entities']];parts={}
  for i in range(0,len(ids),180):
   t='{% set ids = '+json.dumps(ids[i:i+180])+' %}[{% for id in ids %}{{ "," if not loop.first }}{{ {"name":entity_name(id),"device":device_name(id),"area":area_name(id),"entity_id":id}|to_json }}{% endfor %}]'
   async with h.s.post('http://supervisor/core/api/template',json={'template':t})as r:
    assert r.status==200;a=json.loads(await r.text());parts.update({x['entity_id']:x for x in a})
  dump(OUT/'parts.json',parts)
  check=await h.rest('/core/api/config/core/check_config',{});assert check['result']=='valid'and not check.get('errors'),check
 em={e['entity_id']:e for e in b['entities']};protected=json.load(open(DOC/'id-kompatibilitetsundantag.json'));src=json.load(open(P/'source_dependencies.json'))
 for fn,items in src.items():
  if '/esphome/'in fn:
   for eid in items:protected[eid]='ESPHome: befintlig firmware/källa använder detta stabila HA-ID'
 for e in b['entities']:
  if e['platform']=='waste_collection_schedule'and e['entity_id'].startswith('calendar.'):
   protected[e['entity_id']]='Kalenderintegration: stabilt ID bevaras för oförändrad historikrepresentation och kalenderadress'
 protected['media_player.home_assistant_voice_096460_media_player']='Music Assistant använder HA-ID som extern spelaridentitet'
 protected['binary_sensor.workday_sensor']='Scheduler använder detta ID som fast kompatibilitetsgränssnitt'
 protected['sensor.smhi_temp_inkl_vindfaktor']='Äldre uttrycklig röstexponering bevaras som kompatibilitetsundantag'
 for e in b['entities']:
  if e.get('options',{}).get('cloud.alexa',{}).get('should_expose')is True:protected[e['entity_id']]='Alexa: sparad exponering, stabil identitet bevaras även medan Alexa är avstängt'
 dump(DOC/'id-kompatibilitetsundantag.json',protected)
 mapping={k:v for k,v in json.load(open(P/'remaining_dependency_ids.json')).items()if k in em and k not in protected}
 # Freshly reviewed names may have a better target than the original initial plan.
 if( P/'17-reviewed-id-targets.json').exists():mapping.update({k:v for k,v in json.load(open(P/'17-reviewed-id-targets.json')).items()if k in em and k not in protected})
 mapping={k:v for k,v in mapping.items()if k!=v}
 assert len(set(mapping.values()))==len(mapping)
 assert not(set(mapping.values())&({s['entity_id']for s in b['states']}-set(em))),'Target occupied by an unregistered entity'
 assert not any(em[k].get('options',{}).get(assistant,{}).get('should_expose')is True for k in mapping for assistant in['cloud.google_assistant','cloud.alexa'])
 for k,v in mapping.items():assert k.split('.')[0]==v.split('.')[0]
 pending=dict(mapping);order=[]
 while pending:
  ready=[k for k,v in pending.items()if v not in pending]
  assert ready,'Rename cycle requires an explicit intermediate plan'
  for k in ready:
   assert pending[k]not in em or pending[k]in mapping,('Target occupied',k,pending[k]);order.append([k,pending.pop(k)])
 # Apply each stage once: a target may intentionally reuse another mover's old ID.
 # Current namespace ownership wins over historical aliases of an ID.
 allmap={k:mapping.get(v,v)for k,v in all_verified_mapping().items()}
 allmap.update(mapping)
 allmap={k:v for k,v in allmap.items()if k!=v and(k not in em or k in mapping)}
 assert all(allmap[k]==v for k,v in mapping.items()),'Migration must apply every current reference exactly once'
 services=service_ids(json.load(open(OUT/'services.json')))
 changes={}
 for f in source_paths():
  old=f.read_text();new=text_rewrite(old,allmap,services)
  if f in[ROOT/'custom_components/plant/sensor.py',ROOT/'custom_components/plant/number.py']:new=resolve_plant_registered_ids(new)
  if f.suffix in['.yaml','.yml']:new=sync_source_names(new,f,b['entities'],{d['id']:d for d in b['devices']})
  if old!=new:changes[str(f)]=[old,new]
 # Preserve recorder exclusion membership after the naming prefixes change.
 cfg=load_yaml((ROOT/'configuration.yaml').read_text());globs=cfg.get('recorder',{}).get('exclude',{}).get('entity_globs',[])
 excluded=ROOT/'recorder_excluded_entities.yaml';old,new=changes.get(str(excluded),[excluded.read_text(),excluded.read_text()]);listed=set(load_yaml(new)or[])
 initial=json.load(open(P/'before/entities.json'));added=[]
 for e in initial:
  eid=e['entity_id']
  if any(fnmatch.fnmatchcase(eid,g)for g in globs):
   current=allmap.get(eid,eid)
   if current not in listed:listed.add(current);added.append(current)
 if added:new += '\n# Bevarad exkludering efter namnstandard 2026.11\n'+''.join('- '+eid+'\n'for eid in sorted(added))
 if old!=new:changes[str(excluded)]=[old,new]
 # A legacy Wi-Fi rescan helper must resolve service nodes without relying on old HA entity names.
 scripts=ROOT/'scripts.yaml';old,new=changes.get(str(scripts),[scripts.read_text(),scripts.read_text()]);conf=load_yaml(new)
 if 'rescan_wifi_on_esphome_nodes'in conf:
  block=conf['rescan_wifi_on_esphome_nodes'];seq=block.get('sequence',[])
  if seq and'repeat'in seq[0]:
   # Routing by stable ESPHome config entry, not renamed sensor spelling.
   entries=json.load(open(ROOT/'.storage/core.config_entries'))['data']['entries'];nodes={e['entry_id']:e['data']['device_name']for e in entries if e['domain']=='esphome'and e['data'].get('device_name')}
   rep=seq[0]['repeat'];rep['for_each']="{{ integration_entities('esphome') | select('search', '_(?:wifi|wi_fi)_bssid$') | list | sort }}"
   rep['sequence'][0]['variables']['_esphome_node']="{% set nodes = "+json.dumps(nodes)+" %}{{ nodes.get(config_entry_id(repeat.item), '') }}"
   rep['sequence'][1]['if'][0]['value_template']="{{ _esphome_node | length > 0 }}"
   replacement=yaml.safe_dump({'rescan_wifi_on_esphome_nodes':block},allow_unicode=True,sort_keys=False)
   pattern=re.compile(r'^rescan_wifi_on_esphome_nodes:\n.*?(?=^[a-zA-Z0-9_]+:\n|\Z)',re.M|re.S)
   new,n=pattern.subn(lambda _:replacement,new);assert n==1
   if old!=new:changes[str(scripts)]=[old,new]
 # Legacy network tracker keys remain stable; display labels follow confirmed MAC links.
 known=ROOT/'known_devices.yaml';old,new=changes.get(str(known),[known.read_text(),known.read_text()]);items=load_yaml(new);devices=b['devices'];areas={a['area_id']:a['name']for a in b['areas']};known_count=0
 for key,item in items.items():
  mac=str(item.get('mac','')).lower();matches=[d for d in devices if any(str(v).lower()==mac for ns,v in d.get('connections',[]))]
  matches.sort(key=lambda d:(not bool(d.get('name_by_user')),d.get('model')in ['Tracked device','ESP device',None],not bool(d.get('area_id'))))
  if not matches:continue
  d=matches[0];name=d.get('name_by_user')or d.get('name');area=areas.get(d.get('area_id'))
  if not name or re.fullmatch(r'[0-9a-fA-F:._-]+',name):continue
  label=' '.join(x for x in[area,name]if x)
  if item.get('name')!=label:item['name']=label;known_count+=1
 if known_count:changes[str(known)]=[old,yaml.safe_dump(items,allow_unicode=True,sort_keys=False)]
 # Give the reserved, unregistered sun entity a Swedish display label.
 config=ROOT/'configuration.yaml';old,new=changes.get(str(config),[config.read_text(),config.read_text()]);raw=load_yaml(new)
 if 'customize'not in raw.get('homeassistant',{}):new=new.replace('homeassistant:\n','homeassistant:\n  customize:\n    sun.sun:\n      friendly_name: Solen\n',1)
 new=new.replace('  name: IR Broadcast\n','  name: IR-sändning\n')
 if old!=new:changes[str(config)]=[old,new]
 for fn,(old,new)in changes.items():
  if pathlib.Path(fn).suffix in ['.yaml','.yml']:load_yaml(new)
  rel=pathlib.Path(fn).relative_to(ROOT)
  for folder,text in [('before_files',old),('after_files',new)]:p=OUT/folder/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text)
 dump(OUT/'id_map.json',mapping);dump(OUT/'all_map.json',allmap);dump(OUT/'order.json',order)
 digest=hashlib.sha256(json.dumps(mapping,sort_keys=True).encode()+''.join(fn+v[1]for fn,v in sorted(changes.items())).encode()).hexdigest()
 dump(OUT/'plan.json',{'plan_digest':digest,'entity_ids':len(mapping),'source_files':list(changes),'recorder_exclusions_added':len(added),'cold_stores':STORES,'backup':'d1a7d04b','controlled_restart_required':True,'legacy_tracker_display_names_updated':known_count,'existing_missing_esphome_scan_services':True})
 print(json.dumps({'planned_ids':len(mapping),'files':len(changes),'recorder_exclusions_added':len(added)},ensure_ascii=False),flush=True)
def cold_changes(allmap,entities,parts,services):
 result={};dm={d['id']:d for d in json.load(open(OUT/'before/devices.json'))};current_ids={e['entity_id']for e in entities};old_ids=set(allmap)
 for name in STORES+HELPERS+['homeassistant.exposed_entities']+[f.name for f in(ROOT/'.storage').glob('lovelace*')]+[f.name for f in(ROOT/'.storage').glob('frontend.user_data*')]:
  f=ROOT/'.storage'/name
  if not f.is_file()or any(x in name for x in['.bak','.BACKUP','.NEW','migration_backup']):continue
  old=f.read_text();data=json.loads(old)
  baseline=OUT/'pre_api_storage'/name
  before=json.load(open(baseline))if baseline.exists()else data
  expected=structured(before,allmap,services)
  new=merge_reference_updates(data,before,expected)if name!='homeassistant.exposed_entities'else copy.deepcopy(data)
  if name=='homeassistant.exposed_entities':
   new=copy.deepcopy(data);legacy=new['data']['exposed_entities'];new['data']['exposed_entities']={k:v for k,v in legacy.items()if k not in old_ids and k not in current_ids}
  elif name=='core.config_entries':
   for entry in new['data']['entries']:
    title,short=make_title(entry,entities,dm,parts)
    if title:entry['title']=title
    if short:
     if entry['domain']=='plant' and isinstance(entry['data'].get('plant_info'),dict) and'name'in entry['data']['plant_info']:entry['data']['plant_info']['name']=short
     for kind in ['data','options']:
      if isinstance(entry.get(kind),dict)and'name'in entry[kind]:entry[kind]['name']=short
  elif name in HELPERS:
   ens={str(e.get('unique_id')):e for e in entities if e['platform']==name}
   for item in new.get('data',{}).get('items',[]):
    e=ens.get(str(item.get('id')))
    if e and e['entity_id']!='input_number.slider'and e.get('name'):item['name']=e['name']
  elif name=='energy':
   for item in new['data'].get('device_consumption',[]):
    eid=item.get('stat_consumption');part=parts.get(eid,{})
    if item.get('name')and part:
     names=[]
     for x in[part.get('area'),part.get('device')]:
      if x and x not in names:names.append(x)
     if names:item['name']=' '.join(names)
  elif name=='lovelace_resources':
   changed={str(f.relative_to(OUT/'after_files/www')).replace(os.sep,'/')for f in(OUT/'after_files/www').rglob('*.js')}if(OUT/'after_files/www').exists()else set()
   for resource in new.get('data',{}).get('items',[]):
    url=resource.get('url','');u=urllib.parse.urlsplit(url)
    if u.path.removeprefix('/local/')in changed:
     query=urllib.parse.parse_qs(u.query);query['v']=['20261108-naming3'];resource['url']=urllib.parse.urlunsplit(u._replace(query=urllib.parse.urlencode(query,doseq=True)))
  elif name.startswith('lovelace'):
   initial_es={e['entity_id']:e for e in json.load(open(P/'before/entities.json'))};initial_states=json.load(open(P/'before/states.json'))
   extra=[allmap.get(st['entity_id'],st['entity_id'])for st in initial_states if st['entity_id'].startswith('sensor.')and initial_es.get(st['entity_id'],{}).get('platform')=='battery_notes'and st['attributes'].get('device_class')=='battery'and'battery_type_and_quantity'in st['attributes']and not fnmatch.fnmatchcase(st['entity_id'],'*_battery_plus')]
   def patch(o):
    if isinstance(o,dict):
     if isinstance(o.get('filter'),dict)and any(inc.get('entity_id')=='*_battery_plus'for inc in o['filter'].get('include',[])if isinstance(inc,dict)):
      o['filter'].setdefault('exclude',[]).extend({'entity_id':eid}for eid in extra)

     if o.get('entity_id')=='*_battery_plus':
      o.pop('entity_id');o['integration']='battery_notes';o.setdefault('attributes',{})['device_class']='battery'
     for v in o.values():patch(v)
    elif isinstance(o,list):
     for v in o:patch(v)
   patch(new)
  if data!=new:result[str(f)]=[old,json.dumps(new,ensure_ascii=False,indent=2)+'\n']
 return result
async def restore_automations(h,states,mapping):
 em=await h.call('config/entity_registry/list');byid={e['id']:e['entity_id']for e in em}
 for row in states:
  eid=byid.get(row['id'],mapping.get(row['entity_id'],row['entity_id']))
  await h.rest('/core/api/services/automation/'+('turn_on'if row['state']=='on'else'turn_off'),{'entity_id':eid,'stop_actions':False}if row['state']!='on'else{'entity_id':eid})
async def apply(resume=False):
 assert(OUT/'plan.json').exists()and(resume or not(OUT/'journal.jsonl').exists())
 if resume:
  assert json.load(open(OUT/'failure.json'))['error']=="'state'"and not(OUT/'cold_before_files').exists(),'Inspect the journal before resuming'
  assert not await core_running(),'Resume is only valid while HA is stopped'
 assert json.load(open(OUT/'preflight_verification.json'))['plan_digest']==json.load(open(OUT/'plan.json'))['plan_digest'],'Fresh preflight required'
 manifest=json.load(open(P/'full_backup_archive_manifest.json'));assert manifest['slug']=='d1a7d04b'and manifest['restore_read_test']and pathlib.Path(manifest['path']).is_file()
 mapping=json.load(open(OUT/'id_map.json'));allmap=json.load(open(OUT/'all_map.json'));order=json.load(open(OUT/'order.json'));parts=json.load(open(OUT/'parts.json'));parts.update({mapping.get(k,k):v for k,v in list(parts.items())});services=service_ids(json.load(open(OUT/'services.json')))
 changes={str(ROOT/f.relative_to(OUT/'before_files')):[f.read_text(),(OUT/'after_files'/f.relative_to(OUT/'before_files')).read_text()]for f in(OUT/'before_files').rglob('*')if f.is_file()}
 assert all(pathlib.Path(fn).read_text()==v[0]for fn,v in changes.items()),'Source changed after planning'
 before=json.load(open(OUT/'before/entities.json'));em={e['entity_id']:e for e in before};baseline={s['entity_id']:s for s in json.load(open(OUT/'before/states.json'))};journal=OUT/'journal.jsonl';renamed=[];written=[];autos=[];stopped=False
 try:
  if resume:
   shutil.copy2(OUT/'failure.json',OUT/'initial_stop_confirmation_failure.json')
   shutil.copy2(OUT/'rollback_result.json',OUT/'initial_stop_confirmation_rollback.json')
   saved=json.load(open(OUT/'statistics_before.json'));metadata=saved['metadata'];stats=saved['series'];ss=saved['start'];se=saved['end'];hs=saved['history_start'];he=saved['history_end'];statids=[x['statistic_id']for x in metadata];hist=json.load(open(OUT/'history_before.json'))
   autos=json.load(open(OUT/'automation_states.json'));renamed=[tuple(x)for x in order];stopped=True
   after_ids={'entities':json.load(open(OUT/'after-api-rename/entities.json'))}
   actual={e['id']:e['entity_id']for e in json.load(open(ROOT/'.storage/core.entity_registry'))['data']['entities']}
   assert all(actual.get(e['id'])==mapping.get(e['entity_id'],e['entity_id'])for e in before),'Registry does not match the recorded completed rename stage'
   append_journal(journal,{'status':'resume_confirmed_core_stopped','renamed_entities':len(renamed)})
  else:
   async with HA()as h:
    current=await h.call('config/entity_registry/list');assert all(any(x['entity_id']==k and x['id']==em[k]['id']for x in current)for k in mapping)
    states=await h.call('get_states');dump(OUT/'states_immediately_before.json',states);assert not any(st.get('attributes',{}).get('in_progress')for st in states if st['entity_id']in mapping and st['entity_id'].startswith('update.')),'Wait for firmware installation to finish';assert not any(s.get('attributes',{}).get('current',0)for s in states if s['entity_id'].startswith(('script.','automation.'))),'Wait for active scripts/automations'
    now=datetime.datetime.now(datetime.timezone.utc);he=(now-datetime.timedelta(minutes=2)).isoformat();hs=(now-datetime.timedelta(days=1)).isoformat();se=(now.replace(minute=0,second=0,microsecond=0)-datetime.timedelta(hours=1)).isoformat();ss=(now.replace(minute=0,second=0,microsecond=0)-datetime.timedelta(days=1)).isoformat()
    metadata=await h.call('recorder/get_statistics_metadata',statistic_ids=list(mapping)+list(mapping.values()));assert not any(x['statistic_id']in mapping.values()and x['statistic_id']not in mapping for x in metadata)
    statids=[x['statistic_id']for x in metadata];stats=await h.call('recorder/statistics_during_period',start_time=ss,end_time=se,statistic_ids=statids,period='hour',types=['mean','min','max','sum','state'])if statids else{}
    hist=await history(h,list(mapping),hs,he);dump(OUT/'history_before.json',hist);dump(OUT/'statistics_before.json',{'metadata':metadata,'series':stats,'history_start':hs,'history_end':he,'start':ss,'end':se})
    shutil.copytree(ROOT/'.storage',OUT/'pre_api_storage')
    for s in states:
     if s['entity_id'].startswith('automation.')and s['entity_id']in em:
      autos.append({'entity_id':s['entity_id'],'id':em[s['entity_id']]['id'],'state':s['state']})
    dump(OUT/'automation_states.json',autos)
    for row in autos:
     if row['state']=='on':await h.rest('/core/api/services/automation/turn_off',{'entity_id':row['entity_id'],'stop_actions':False})
    for old,new in order:
     append_journal(journal,{'status':'rename_intent','old':old,'new':new})
     await h.call('config/entity_registry/update',entity_id=old,new_entity_id=new);renamed.append((old,new));append_journal(journal,{'status':'renamed','old':old,'new':new})
    await asyncio.sleep(3)
    after_ids=await snapshot(h,OUT/'after-api-rename');dump(OUT/'entry_states_at_cutover.json',await h.rest('/core/api/config/config_entries/entry'))
  # Supervisor owns the maintenance window. No .storage mutation while HA runs.
  if not resume:append_journal(journal,{'status':'stop_intent'});await supervisor('/core/stop',{})
  assert not await core_running(),'HA must be stopped before storage writes';stopped=True
  shutil.copytree(ROOT/'.storage',OUT/'cold_storage_before')
  cold=cold_changes(allmap,after_ids['entities'],parts,services);dump(OUT/'cold_files.json',list(cold))
  for fn,(old,new)in {**changes,**cold}.items():
   f=pathlib.Path(fn);assert f.read_text()==old,('Concurrent file change',fn)
   rel=f.relative_to(ROOT);dst=OUT/'cold_before_files'/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_text(old)
   dst=OUT/'cold_after_files'/rel;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_text(new)
   atomic(f,new);written.append(fn);append_journal(journal,{'status':'written','file':fn})
  append_journal(journal,{'status':'start_intent'});await supervisor('/core/start',{});stopped=False;await ready();print('HA_RUNNING_AFTER_CUTOVER',flush=True)
  await asyncio.sleep(12)
  async with HA()as h:
   check=await h.rest('/core/api/config/core/check_config',{});assert check['result']=='valid'and not check.get('errors'),check
   after=await snapshot(h,OUT/'after');ae={e['entity_id']:e for e in after['entities']};byid={e['id']:e for e in after['entities']};assert set(byid)=={e['id']for e in before},'Registry entries were recreated/lost'
   for e in before:
    other=byid[e['id']];assert other['entity_id']==mapping.get(e['entity_id'],e['entity_id'])
    for k in ['unique_id','device_id','area_id','disabled_by','hidden_by','platform','config_entry_id','device_class','unit_of_measurement','entity_category','name','aliases']:assert e.get(k)==other.get(k),('Entity property changed',e['entity_id'],k)
    assert set(e.get('labels')or[])==set(other.get('labels')or[]),('Labels changed',e['entity_id'])
    assert normal_options(structured(e.get('options')or{},allmap,services),other.get('options')or{}),('Options changed',e['entity_id'])
   expected_meta={x['statistic_id']:x for x in obj_rewrite(metadata,mapping)}
   deadline=time.monotonic()+60
   while True:
    meta=await h.call('recorder/get_statistics_metadata',statistic_ids=list(mapping)+list(mapping.values()));actual_meta={x['statistic_id']:x for x in meta}
    if all(actual_meta.get(k)==v for k,v in expected_meta.items())and(set(actual_meta)-set(expected_meta))<=set(mapping.values()):break
    assert time.monotonic()<deadline,'Statistics metadata mismatch';await asyncio.sleep(2)
   sta=await h.call('recorder/statistics_during_period',start_time=ss,end_time=se,statistic_ids=[mapping[k]for k in statids],period='hour',types=['mean','min','max','sum','state'])if statids else{}
   assert obj_rewrite(stats,mapping)==sta,'Historical statistics mismatch';hia=await history(h,list(mapping.values()),hs,he);dump(OUT/'history_after.json',hia);assert {mapping.get(k,k):v for k,v in hist.items()}==hia,'History mismatch'
   dump(OUT/'history_after.json',hia);dump(OUT/'statistics_after.json',{'metadata':meta,'series':sta})
   await restore_automations(h,autos,mapping)
   dump(OUT/'config_entries_api_after.json',await h.rest('/core/api/config/config_entries/entry'))
   dump(OUT/'verification.json',{'status':'verified','renamed_entities':len(mapping),'source_files':list(changes),'cold_files':list(cold),'config_check':check,'history_records_verified':sum(map(len,hia.values())),'statistics_points_verified':sum(map(len,sta.values())),'statistics_metadata_migrated':len(metadata),'new_statistics_metadata_created':len(meta)-len(metadata),'automation_states_restored':len(autos),'registry_identity_preserved':True})
   print(json.dumps(json.load(open(OUT/'verification.json')),ensure_ascii=False),flush=True)
 except BaseException as error:
  dump(OUT/'failure.json',{'error':str(error),'renamed':renamed,'written':written,'stopped':stopped})
  print('CUTOVER_FAILED_STARTING_ROLLBACK',str(error),flush=True)
  try:
   if stopped or not await core_running():await supervisor('/core/start',{});stopped=False
   await ready()
   async with HA()as h:
    for old,new in reversed(renamed):await h.call('config/entity_registry/update',entity_id=new,new_entity_id=old)
   if written:
    await supervisor('/core/stop',{});stopped=True;assert not await core_running()
    for fn in reversed(written):
     target=pathlib.Path(fn);rel=target.relative_to(ROOT);restore=OUT/'cold_before_files'/rel
     if rel.parts[0]=='.storage'and(OUT/'pre_api_storage'/rel.name).exists():restore=OUT/'pre_api_storage'/rel.name
     atomic(target,restore.read_text())
    await supervisor('/core/start',{});stopped=False;await ready()
   async with HA()as h:await restore_automations(h,autos,{})
   dump(OUT/'rollback_result.json',{'status':'restored','ids':len(renamed),'files':len(written)})
  except BaseException as rollback_error:dump(OUT/'rollback_result.json',{'status':'requires_recovery','error':str(rollback_error),'backup':'d1a7d04b'})
  raise
if __name__=='__main__':
 if len(sys.argv)!=2 or sys.argv[1]not in['plan','apply','resume']:raise SystemExit('Usage: ha_naming_finish.py plan|apply|resume')
 asyncio.run(plan()if sys.argv[1]=='plan'else apply(resume=sys.argv[1]=='resume'))
