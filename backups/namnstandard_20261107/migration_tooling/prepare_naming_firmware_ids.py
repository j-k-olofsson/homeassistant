import sys,asyncio,json,re,collections,pathlib
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import HA,RUN,DOC,snapshot,dump,slug
async def main():
 async with HA()as ha:data=await snapshot(ha,RUN/'14-firmware-id-preparation')
 es=data['entities'];dm={d['id']:d for d in data['devices']};am={a['area_id']:a for a in data['areas']};sm={s['entity_id']:s for s in data['states']};allids={e['entity_id']for e in es};mapping={};excluded=[]
 for e in es:
  if e['platform']!='esphome'or not e['entity_id'].startswith('update.'):continue
  d=dm.get(e.get('device_id'),{});name=d.get('name_by_user')or d.get('name')or'';area=am.get(e.get('area_id')or d.get('area_id'),{}).get('name')
  reason=None
  if d.get('id')=='0cc979ea34852945574729129825a6b2':reason='Restpunkt: ESPHome09'
  elif not area:reason='Område saknas'
  elif name.startswith(('Hemmabio El','HA Voice PE')):reason='Enhetsnamnet behöver ytterligare granskning före permanent ID'
  elif name in ['Gasol','Salt']:reason='Primärfunktion och enhetsnamn behöver samordnas före ID'
  elif '('in name:reason='Ytterligare namnkontext behöver granskas före permanent ID'
  if reason:excluded.append({'entity_id':e['entity_id'],'name':name,'reason':reason});continue
  state=sm.get(e['entity_id'],{})
  assert not state.get('attributes',{}).get('in_progress'),('Firmware update in progress',e['entity_id'])
  new='update.'+'_'.join(filter(None,[slug(area),slug(name),'firmware']))
  if new==e['entity_id']:continue
  assert new not in allids and new not in mapping.values(),('Collision',e['entity_id'],new)
  mapping[e['entity_id']]=new
 # Inspect references without changing anything. The migration engine performs stricter live checks.
 refs=collections.defaultdict(list)
 for f in [*pathlib.Path('/homeassistant').glob('*.yaml'),*pathlib.Path('/homeassistant').glob('packages/*.yaml')]:
  txt=f.read_text()
  for eid in mapping:
   if eid in txt:refs[eid].append(str(f))
 for f in (pathlib.Path('/homeassistant')/'.storage').iterdir():
  if not f.is_file()or f.name.startswith('tmp')or '.bak'in f.name or '.BACKUP'in f.name or f.name.endswith('.NEW'):continue
  try:txt=f.read_text()
  except:continue
  for eid in mapping:
   if eid in txt and f.name not in ['core.entity_registry','core.restore_state','trace.saved_traces']:refs[eid].append('.storage/'+f.name)
 dump(DOC/'id-plan-14-firmware.json',{'mapping':mapping,'excluded':excluded,'references':dict(refs)})
 print('FIRMWARE ID CANDIDATES',len(mapping),'excluded',excluded,'references',dict(refs));print('SAMPLE',list(mapping.items())[:8])
asyncio.run(main())
