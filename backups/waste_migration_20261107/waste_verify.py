import sys,asyncio,json,shutil
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
OUT=ROOT/'backups/waste_migration_20261107'
async def main():
 async with HA() as h:
  states=await h.call('get_states');repairs=await h.call('repairs/list_issues');repos=json.loads((ROOT/'.storage/marketplace.repositories').read_text())['data'];repo=next(v for v in repos.values() if v.get('domain')=='waste_collection_schedule')
  async with h.s.post('http://127.0.0.1:80/api/config/core/check_config',headers={'Authorization':'Bearer '+h.token}) as r:check=await r.json();assert r.status==200 and check['result']=='valid'
  result={'version':json.loads((ROOT/'custom_components/waste_collection_schedule/manifest.json').read_text())['version'],'installed':repo.get('installed'),'repairs':repairs,'config_check':check,'current_waste_states':[s for s in states if s['entity_id'] in ['sensor.soptomning','calendar.sophamtning']]};(OUT/'verification_pending_address.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print({k:v for k,v in result.items() if k!='current_waste_states'})
  assert repo.get('installed') and len(result['current_waste_states'])==2
asyncio.run(main())
