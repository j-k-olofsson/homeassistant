import sys,json,pathlib,csv,collections,re,asyncio,datetime,hashlib
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,HA,dump,snapshot
async def main():
 async with HA()as ha:
  current=await snapshot(ha,RUN/'checkpoint-current')
  check=await ha.rest('/core/api/config/core/check_config',{});assert check['result']=='valid'and not check.get('errors')
  settings=await ha.call('config/entity_registry/settings/get')
  try:logs=await ha.call('system_log/list');dump(RUN/'system_log_at_checkpoint.json',logs)
  except Exception:logs=[]
 initial=json.load(open(RUN/'live_baseline/entities.json'));idev=json.load(open(RUN/'live_baseline/devices.json'));im={e['entity_id']:e for e in initial};dm={d['id']:d for d in current['devices']};em={e['entity_id']:e for e in current['entities']};am={a['area_id']:a for a in current['areas']};sm={s['entity_id']:s for s in current['states']}
 maps={};id_ver=[]
 for f in sorted(RUN.glob('*/id_map.json')):
  if(f.parent/'verification.json').exists():maps.update(json.load(open(f)));id_ver.append(json.load(open(f.parent/'verification.json')))
 def resolve(eid):
  seen=set()
  while eid in maps:
   assert eid not in seen;seen.add(eid);eid=maps[eid]
  return eid
 reverse={resolve(eid):eid for eid in im}
 assert set(reverse)==set(em)
 for old,e in im.items():
  actual=em[resolve(old)]
  for key in ['id','unique_id','device_id','area_id','disabled_by','hidden_by','platform','config_entry_id','labels','device_class','unit_of_measurement','entity_category']:
   assert e.get(key)==actual.get(key),(old,key)
 normalizations=[]
 old_exposure=json.load(open(RUN/'baseline/.storage/homeassistant.exposed_entities'))['data']
 old_cloud=json.load(open(RUN/'baseline/.storage/cloud'))['data']
 for old,e in im.items():
  actual=em[resolve(old)]
  if e.get('options')!=actual.get('options'):
   expected=dict(e.get('options')or{});expected['cloud.google_assistant']={'should_expose':False}
   assert expected==actual.get('options'),('Unexpected option change',old)
   assert old_exposure['assistants']['cloud.google_assistant']['expose_new']is False
   prior=old_exposure.get('exposed_entities',{}).get(old,{}).get('assistants',{}).get('cloud.google_assistant',{})
   legacy=old_cloud.get('google_entity_configs',{}).get(old,{})
   assert prior.get('should_expose')is not True and legacy.get('should_expose')is not True and legacy.get('expose')is not True
   assert e.get('disabled_by')or old.split('.')[0]not in(old_cloud.get('google_default_expose')or[])
   normalizations.append(resolve(old))
 dump(RUN/'explicit_google_exposure_false_normalizations.json',normalizations)
 stage_names=[];name_ids=set();alias_ids=set();device_ids=set();expected_area={d['id']:d.get('area_id')for d in idev}
 for f in sorted(DOC.glob('etapp-*.json')):
  plan=json.load(open(f));v=RUN/plan['stage']/'verification.json'
  if not v.exists():continue
  stage_names.append(plan['stage'])
  for op in plan['operations']:
   if op['kind']=='device':
    if'name_by_user'in op['after']:device_ids.add(op['id'])
    if'area_id'in op['after']:expected_area[op['id']]=op['after']['area_id']
   else:
    if'name'in op['after']:name_ids.add(resolve(op['id']))
    if'aliases'in op['after']:alias_ids.add(resolve(op['id']))
 assert set(dm)==set(expected_area)
 for did,area in expected_area.items():assert dm[did].get('area_id')==area,(did,'area mismatch')
 for eid in alias_ids:
  old=im[reverse[eid]].get('aliases')or[]
  assert set(old)<=set(em[eid].get('aliases')or[]),(eid,'historical aliases lost')
 refs=collections.defaultdict(set)
 def scan_obj(x,label,path):
  if isinstance(x,dict):
   for k,v in x.items():
    if k in em:refs[k].add(label+':'+path+'.<key>')
    scan_obj(v,label,path+'.'+str(k))
  elif isinstance(x,list):
   for i,v in enumerate(x):scan_obj(v,label,path+f'[{i}]')
  elif isinstance(x,str):
   for eid in set(re.findall(r'\b[a-z_]+\.[a-z0-9_]+\b',x))&em.keys():refs[eid].add(label+':'+path)
 source_files=[*ROOT.glob('*.yaml'),*ROOT.glob('packages/**/*.yaml'),*ROOT.glob('blueprints/**/*.yaml'),*ROOT.glob('custom_templates/*.jinja')]
 old_runtime_refs=[]
 for f in source_files:
  for line,text in enumerate(f.read_text().splitlines(),1):
   found=set(re.findall(r'\b[a-z_]+\.[a-z0-9_]+\b',text));old_runtime_refs.extend((str(f.relative_to(ROOT)),line,k)for k in found&maps.keys())
   for eid in found&em.keys():refs[eid].add(str(f.relative_to(ROOT))+':'+str(line))
 for path,board in current['dashboard_configs'].items():
  if path is not None:
   txt=json.dumps(board);assert not(set(re.findall(r'\b[a-z_]+\.[a-z0-9_]+\b',txt))&maps.keys()),path
   scan_obj(board,'dashboard/'+path,'config')
 assert not old_runtime_refs,old_runtime_refs[:5]
 for fn in ['core.config_entries','core.area_registry','frontend.system_data','energy','homeassistant.exposed_entities']:
  f=ROOT/'.storage'/fn
  if f.exists():
   obj=json.load(open(f));assert not(set(re.findall(r'\b[a-z_]+\.[a-z0-9_]+\b',json.dumps(obj)))&maps.keys()),fn
   scan_obj(obj,'.storage/'+fn,'data')
 rows=[]
 for eid,e in em.items():
  old=im[reverse[eid]];d=dm.get(e.get('device_id'),{});area=am.get(e.get('area_id')or d.get('area_id'),{}).get('name','');name=e.get('name')if e.get('name')is not None else e.get('original_name')or''
  rows.append({'entity_id_före':reverse[eid],'entity_id_nu':eid,'namn_före':old.get('name')if old.get('name')is not None else old.get('original_name'),'entitetsnamn_nu':name,'enhetsnamn_nu':d.get('name_by_user')or d.get('name')or'','område_nu':area,'plattform':e['platform'],'aktiverad':not e.get('disabled_by'),'visningsnamn_status':'Ensat och verifierat'if eid in name_ids else'Enhetsnamn/alias samordnat'if eid in alias_ids else'Automatiskt namn eller kvar för semantisk granskning','id_status':'Migrerat och verifierat'if eid in maps.values()else'Oförändrat; kvar för ID-granskning','lokala_referenser':' | '.join(sorted(refs[eid]))})
 for filename,data in [('hela-entitetsinventeringen.csv',rows)]:
  with(DOC/filename).open('w',newline='',encoding='utf-8-sig')as f:w=csv.DictWriter(f,fieldnames=list(data[0]));w.writeheader();w.writerows(data)
 dr=[{'device_id':d['id'],'enhetsnamn':d.get('name_by_user')or d.get('name'),'område':am.get(d.get('area_id'),{}).get('name',''),'namn_status':'Ensat och verifierat'if d['id']in device_ids else'Oförändrat; granska vid behov','parent_device_id':d.get('parent_device_id')or''}for d in current['devices']]
 with(DOC/'hela-enhetsinventeringen.csv').open('w',newline='',encoding='utf-8-sig')as f:w=csv.DictWriter(f,fieldnames=list(dr[0]));w.writeheader();w.writerows(dr)
 unregistered=[{'entity_id':s['entity_id'],'namn':s.get('attributes',{}).get('friendly_name',''),'status':'Utan registerpost; namn och ID måste hanteras i sin källa'}for s in current['states']if s['entity_id']not in em]
 if unregistered:
  with(DOC/'entiteter-utan-registerpost.csv').open('w',newline='',encoding='utf-8-sig')as f:w=csv.DictWriter(f,fieldnames=list(unregistered[0]));w.writeheader();w.writerows(unregistered)
 mr=[{'gammalt_id':old,'nytt_id':new,'status':'Migrerat och verifierat','lokala_referenser':' | '.join(sorted(refs[new]))}for old,new in maps.items()]
 with(DOC/'genomford-id-karta.csv').open('w',newline='',encoding='utf-8-sig')as f:w=csv.DictWriter(f,fieldnames=list(mr[0]));w.writeheader();w.writerows(mr)
 dump(DOC/'id-karta.json',maps);dump(RUN/'dependencies-current.json',{k:sorted(v)for k,v in refs.items()})
 changed_areas=sum(d.get('area_id')!=dm[d['id']].get('area_id')for d in idev)
 summary={'full_task_complete':False,'registered_entities':len(em),'registered_devices':len(dm),'state_entities_without_registry':len(unregistered),'device_names_changed_unique':len(device_ids),'entity_names_changed_unique':len(name_ids),'aliases_secured_unique':len(alias_ids),'device_areas_changed_unique':changed_areas,'ids_changed':len(maps),'history_records_verified':sum(v['history_records_verified']for v in id_ver),'statistics_points_verified':sum(v['statistics_series_verified']for v in id_ver),'statistics_metadata_migrated':sum(v['statistics_metadata_moved']for v in id_ver),'name_stages_verified':stage_names,'id_stages':id_ver,'config_check':check,'global_registry_invariants':'verified, with explicit approved device area changes and equivalent exposure false normalization','equivalent_explicit_google_exposure_false_additions':len(normalizations),'old_migrated_ids_in_active_sources':0,'entity_id_settings':settings,'pending_information':[],'deferred_items':json.load(open(DOC/'restpunkter.json')),'user_confirmed_external_dependencies':'Inga externa beroenden vad användaren vet','user_confirmed_locations':{'Blomlampa 2':'Köket','Taklampor tidigare i Entrén':'Köket','LED-lister':'Rummen i deras namn','Frösåddslampa':'Inte aktiv; driftstatus oförändrad'}}
 dump(DOC/'status.json',summary);dump(RUN/'global_verification.json',summary)
 print(json.dumps({k:v for k,v in summary.items()if k not in ['name_stages_verified','id_stages','user_confirmed_locations']},ensure_ascii=False))
asyncio.run(main())
