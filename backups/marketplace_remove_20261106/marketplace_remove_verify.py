import sys,asyncio,json
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
OUT=ROOT/'backups/marketplace_remove_20261106';TARGETS={'ai_agent_ha','spotifyplus','watchman'}
async def main():
 for i in range(36):
  try:
   async with HA() as h:
    cfg=await h.call('get_config')
    if cfg.get('state')=='RUNNING':break
  except Exception:pass
  await asyncio.sleep(5)
 else:raise RuntimeError('Home Assistant did not become RUNNING')
 await asyncio.sleep(20)
 async with HA() as h:
  after=await h.snapshot('after_restart_live');(OUT/'after_restart.json').write_text(json.dumps(after,ensure_ascii=False,indent=2));panels=await h.call('get_panels');repos=json.loads((ROOT/'.storage/marketplace.repositories').read_text())['data']
  before=json.loads((OUT/'before.json').read_text());bm={e['entry_id']:e for e in before['entries']}
  v={'remaining_target_entries':[e['domain'] for e in after['entries'] if e['domain'] in TARGETS], 'remaining_target_entities':[e['entity_id'] for e in after['entities'] if e['platform'] in TARGETS], 'remaining_target_services':[d for d in after['services'] if d in TARGETS], 'remaining_ai_panel':'ai_agent_ha' in panels, 'directories_remaining':[d for d in TARGETS if (ROOT/'custom_components'/d).exists()], 'marketplace_installed':{d:any(r.get('installed') for r in repos.values() if r.get('domain')==d) for d in TARGETS},'remaining_target_components':[d for d in after['config']['components'] if d.split('.')[0] in TARGETS], 'repairs':after['repairs'],'other_entry_state_changes':[{'domain':e['domain'],'title':e['title'],'before':bm[e['entry_id']]['state'],'after':e['state']} for e in after['entries'] if e['entry_id'] in bm and e['state']!=bm[e['entry_id']]['state']], 'installed_count':sum(bool(r.get('installed')) for r in repos.values()),'ha_state':after['config'].get('state')}
  (OUT/'verification.json').write_text(json.dumps(v,ensure_ascii=False,indent=2));print(json.dumps(v,ensure_ascii=False,indent=2),flush=True)
  assert not any(v[k] for k in ['remaining_target_entries','remaining_target_entities','remaining_target_services','remaining_ai_panel','directories_remaining','remaining_target_components'])
  assert not any(v['marketplace_installed'].values())
asyncio.run(main())
