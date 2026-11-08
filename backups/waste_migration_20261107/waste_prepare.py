import sys,asyncio,json,shutil
from pathlib import Path
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
OUT=ROOT/'backups/waste_migration_20261107';OUT.mkdir(exist_ok=True,mode=0o700)
async def main():
 async with HA() as h:
  d={k:await h.call(t) for k,t in [('entries','config_entries/get'),('states','get_states'),('entities','config/entity_registry/list'),('repairs','repairs/list_issues'),('services','get_services')]};(OUT/'before.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
  for name in ['local_calendar.sophamtning.ics','core.config_entries','core.entity_registry','marketplace.repositories']:
   shutil.copy2(ROOT/'.storage'/name,OUT/name)
  for s in d['states']:
   if s['entity_id'] in ['calendar.sophamtning','sensor.soptomning','climate.sef_42h_climate','light.bordslampa_ateljen']:print(json.dumps(s,ensure_ascii=False))
  print('toyota_services',list(d['services'].get('toyota',{})))
  repos=json.loads((ROOT/'.storage/marketplace.repositories').read_text())['data'];rid,r=next((k,v) for k,v in repos.items() if v.get('domain')=='waste_collection_schedule')
  if not r.get('installed'):
   print('INSTALLING',rid,flush=True);result=await h.call('marketplace/repository/install',repository=rid);print('INSTALL_RESULT',result,flush=True);(OUT/'install_result.json').write_text(json.dumps({'repository':rid,'result':result}))
  print('DIRECTORY_EXISTS',(ROOT/'custom_components/waste_collection_schedule').exists(),flush=True)
asyncio.run(main())
