import sys,asyncio,json,shutil
from pathlib import Path
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
from datetime import datetime,timezone
OUT=ROOT/'backups/marketplace_remove_20261106';OUT.mkdir(mode=0o700,exist_ok=True)
TARGETS={'ai_agent_ha','spotifyplus','watchman'}
async def main():
 async with HA() as h:
  before=await h.snapshot('before_remove_live');(OUT/'before.json').write_text(json.dumps(before,ensure_ascii=False,indent=2))
  for name in ['core.config_entries','core.entity_registry','core.device_registry','marketplace.repositories','marketplace.common']:
   shutil.copy2(ROOT/'.storage'/name,OUT/name)
  for d in TARGETS:
   shutil.copytree(ROOT/'custom_components'/d,OUT/'custom_components'/d,dirs_exist_ok=True)
  for p in (ROOT/'.storage').glob('ai_agent_ha_history*'):shutil.copy2(p,OUT/p.name)
  if (ROOT/'watchman_report.txt').exists():shutil.copy2(ROOT/'watchman_report.txt',OUT/'watchman_report.txt')
  repos=json.loads((ROOT/'.storage/marketplace.repositories').read_text())['data'];result=[]
  for domain in ['spotifyplus','watchman','ai_agent_ha']:
   entry=next(e for e in before['entries'] if e['domain']==domain);repo=next(k for k,v in repos.items() if v.get('domain')==domain and v.get('installed'))
   async with h.s.delete('http://127.0.0.1:80/api/config/config_entries/entry/'+entry['entry_id'],headers={'Authorization':'Bearer '+h.token}) as r:
    data=await r.json();assert r.status==200,(r.status,data)
   print('REMOVE_ENTRY',domain,data,flush=True)
   assert not any(e['domain']==domain for e in await h.call('config_entries/get'))
   data_uninstall=await h.call('marketplace/repository/uninstall',repository=repo)
   result.append({'domain':domain,'entry_id':entry['entry_id'],'repository':repo,'delete':data,'uninstall':data_uninstall})
   (OUT/'actions.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
   print('UNINSTALLED',domain,'directory_exists',(ROOT/'custom_components'/domain).exists(),flush=True)
   assert not (ROOT/'custom_components'/domain).exists()
  await asyncio.sleep(3)
  after=await h.snapshot('after_remove_live');(OUT/'after.json').write_text(json.dumps(after,ensure_ascii=False,indent=2))
  async with h.s.post('http://127.0.0.1:80/api/config/core/check_config',headers={'Authorization':'Bearer '+h.token}) as r:v=await r.json();print('CONFIG',r.status,v,flush=True);assert r.status==200 and v['result']=='valid';(OUT/'check_config.json').write_text(json.dumps(v))
  print('REPAIRS',after['repairs'],flush=True)
  print('AI_PANEL_REMAINS','ai_agent_ha' in await h.call('get_panels'),flush=True)
asyncio.run(main())
