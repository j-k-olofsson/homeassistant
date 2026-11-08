import sys,asyncio,json,shutil
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
OUT=ROOT/'backups/marketplace_trials_20261107';OUT.mkdir(exist_ok=True,mode=0o700)
async def main():
 async with HA() as h:
  baseline={k:await h.call(t) for k,t in [('states','get_states'),('entities','config/entity_registry/list'),('entries','config_entries/get'),('repairs','repairs/list_issues')]};(OUT/'before.json').write_text(json.dumps(baseline,ensure_ascii=False,indent=2))
  for name in ['core.config_entries','core.entity_registry','lovelace.ha_admin','lovelace.dashboard_elpris','lovelace.lovelace','marketplace.repositories']:shutil.copy2(ROOT/'.storage'/name,OUT/name)
  r=json.loads((ROOT/'.storage/marketplace.repositories').read_text())['data'];actions=[]
  for full in ['agittins/bermuda','basnijholt/adaptive-lighting','nielsfaber/scheduler-component','nielsfaber/scheduler-card']:
   rid,repo=next((k,v) for k,v in r.items() if v.get('full_name')==full)
   if not repo.get('installed'):
    print('INSTALLING',full,flush=True);result=await h.call('marketplace/repository/install',repository=rid);actions.append({'repository':full,'id':rid,'result':result});(OUT/'install_actions.json').write_text(json.dumps(actions,ensure_ascii=False,indent=2));print('INSTALLED',full,flush=True)
asyncio.run(main())
