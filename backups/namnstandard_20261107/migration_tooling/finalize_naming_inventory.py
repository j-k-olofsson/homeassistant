import sys,json,pathlib,collections,csv,re,asyncio,hashlib
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,dump,HA,snapshot,slug
async def main():
 async with HA()as ha:
  data=await snapshot(ha,RUN/'checkpoint-after-names')
  settings=await ha.call('config/entity_registry/settings/get');dump(RUN/'entity_id_settings.json',settings)
  config=await ha.rest('/core/api/config/core/check_config',{});assert config['result']=='valid'and not config.get('errors')
 initial=json.load(open(RUN/'live_baseline/entities.json'));im={e['entity_id']:e for e in initial};es=data['entities'];em={e['entity_id']:e for e in es};dm={d['id']:d for d in data['devices']};am={a['area_id']:a for a in data['areas']};sm={s['entity_id']:s for s in data['states']}
 assert set(im)==set(em),'Entity ID set changed'
 for eid,e in im.items():
  for key in ['unique_id','device_id','area_id','disabled_by','hidden_by','platform','config_entry_id','labels','device_class','unit_of_measurement','entity_category']:
   assert e.get(key)==em[eid].get(key),(eid,key)
 stages=[];name_ids=set();alias_ids=set();dev_ids=set()
 for f in sorted(DOC.glob('etapp-*.json')):
  p=json.load(open(f));vfile=RUN/p['stage']/'verification.json'
  if not vfile.exists():continue
  v=json.load(open(vfile));stages.append(v)
  for o in p['operations']:
   if o['kind']=='device':dev_ids.add(o['id'])
   else:
    if'name'in o['after']:name_ids.add(o['id'])
    if'aliases'in o['after']:alias_ids.add(o['id'])
 # Find exact local references once, without exposing credentials from config entries.
 refs=collections.defaultdict(set);paths=collections.defaultdict(list)
 files=[*ROOT.glob('*.yaml'),*ROOT.glob('packages/**/*.yaml'),*ROOT.glob('blueprints/**/*.yaml'),*ROOT.glob('custom_templates/*.jinja'),*ROOT.glob('tools/*.py'),*ROOT.glob('shell_commands/**/*.py'),*ROOT.glob('shell_commands/**/*.sh')]
 for f in files:
  if f.name=='ha_naming_migration.py':continue
  txt=f.read_text(errors='replace')
  for i,line in enumerate(txt.splitlines(),1):
   for eid in set(re.findall(r'\b[a-z_]+\.[a-z0-9_]+\b',line))&em.keys():refs[eid].add(str(f.relative_to(ROOT))+':'+str(i))
 def walk(x,label,path):
  if isinstance(x,dict):
   for k,v in x.items():
    # References may occur in dictionary keys, such as customize/exposure.
    if k in em:refs[k].add(label+':'+path+'.<key>')
    walk(v,label,path+'.'+k)
  elif isinstance(x,list):
   for i,v in enumerate(x):walk(v,label,path+f'[{i}]')
  elif isinstance(x,str):
   for eid in set(re.findall(r'\b[a-z_]+\.[a-z0-9_]+\b',x))&em.keys():refs[eid].add(label+':'+path)
 for path,board in data['dashboard_configs'].items():
  if path is not None:walk(board,'dashboard/'+path,'config')
 for fn in ['core.config_entries','core.area_registry','core.entity_registry','homeassistant.exposed_entities','energy','assist_pipeline.pipelines']:
  f=ROOT/'.storage'/fn
  if not f.exists():continue
  j=json.loads(f.read_text())
  if fn=='core.entity_registry':
   # IDs identifying registry entries are not dependencies, options can be.
   for e in j['data']['entities']:
    walk(e.get('options',{}),'.storage/'+fn,e['entity_id']+'.options')
  else:walk(j,'.storage/'+fn,'data')
 # The master list covers every registered entity; review status is explicit.
 rows=[];id_candidates=[]
 for e in es:
  eid=e['entity_id'];d=dm.get(e.get('device_id'),{});a=am.get(e.get('area_id')or d.get('area_id'),{});name=e.get('name')if e.get('name')is not None else e.get('original_name_unprefixed',e.get('original_name'))
  if name is None:name=e.get('original_name')or''
  dn=d.get('name_by_user')or d.get('name')or'';area=a.get('name','');proposal='';id_status='Återstår: semantisk granskning och beroendekontroll'
  if e['platform']=='xiaomi_ble'and dn=='Klimatsensor'and area:
   proposal=eid.split('.')[0]+'.'+'_'.join(filter(None,[slug(area),'klimatsensor',slug(name)]));id_status='Förberett förslag; inväntar externa beroenden och etappkontroll'
   if proposal in em and proposal!=eid:id_status='Blockerad: föreslaget ID finns redan';proposal=''
   id_candidates.append({'gammalt_id':eid,'föreslaget_id':proposal,'status':id_status,'beroenden':' | '.join(sorted(refs[eid]))})
  row={'entity_id':eid,'visningsnamn_före':im[eid].get('name')if im[eid].get('name')is not None else im[eid].get('original_name'),'entitetsnamn_nu':name,'enhetsnamn_nu':dn,'område_nu':area,'plattform':e['platform'],'aktiverad':not e.get('disabled_by'),'synlig':not e.get('hidden_by'),'visningsnamn_status':'Ensat och verifierat'if eid in name_ids else'Ingående alias säkrat'if eid in alias_ids else'Kvar för granskning; ingen ändring gjord','föreslaget_id':proposal,'id_status':id_status,'lokala_referenser':' | '.join(sorted(refs[eid]))}
  rows.append(row)
 for fn,items in [('hela-entitetsinventeringen.csv',rows),('id-forslag-etapp-klimatsensorer.csv',id_candidates)]:
  with (DOC/fn).open('w',newline='',encoding='utf-8-sig')as f:
   w=csv.DictWriter(f,fieldnames=list(items[0]));w.writeheader();w.writerows(items)
 dr=[]
 for d in data['devices']:
  dr.append({'device_id':d['id'],'enhetsnamn':d.get('name_by_user')or d.get('name'),'område':am.get(d.get('area_id'),{}).get('name',''),'visningsnamn_status':'Ensat och verifierat'if d['id']in dev_ids else'Kvar för granskning; ingen ändring gjord','parent_device_id':d.get('parent_device_id')or''})
 with(DOC/'hela-enhetsinventeringen.csv').open('w',newline='',encoding='utf-8-sig')as f:
  w=csv.DictWriter(f,fieldnames=list(dr[0]));w.writeheader();w.writerows(dr)
 summary={'registered_entities':len(es),'registered_devices':len(data['devices']),'name_overrides_changed_unique':len(name_ids),'historical_aliases_secured_unique':len(alias_ids),'device_names_changed_unique':len(dev_ids),'ids_changed':0,'states_now':len(data['states']),'config_check':config,'stages':stages,'id_settings':settings,'prepared_climate_id_candidates':len(id_candidates),'pending_entity_name_review':len(es)-len(name_ids)}
 dump(DOC/'status.json',summary);dump(RUN/'dependencies.json',{k:sorted(v)for k,v in refs.items()})
 print(json.dumps({k:v for k,v in summary.items()if k!='stages'},ensure_ascii=False))
asyncio.run(main())
