import sys,asyncio,json,shutil
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
O=ROOT/'backups/marketplace_trials_20261107'
async def main():
 async with HA() as h:
  final={k:await h.call(t) for k,t in [('states','get_states'),('entries','config_entries/get'),('entities','config/entity_registry/list'),('repairs','repairs/list_issues'),('services','get_services'),('config','get_config')]};(O/'final.json').write_text(json.dumps(final,ensure_ascii=False,indent=2));sm={s['entity_id']:s for s in final['states']};em={e['entity_id']:e for e in final['entities']}
  domains=['bermuda','adaptive_lighting','scheduler','waste_collection_schedule'];entries={d:[{'state':e['state'],'entry_id':e['entry_id']} for e in final['entries'] if e['domain']==d] for d in domains};assert all(len(es)==1 and es[0]['state']=='loaded' for es in entries.values()),entries
  schedules=await h.call('scheduler');assert not schedules,schedules
  for eid in ['sensor.soptomning','calendar.sophamtning']:assert em[eid]['platform']=='waste_collection_schedule'
  assert not {e['entry_id'] for e in final['entries']}.intersection({'00aa2b5819a44ae77a63ee083c87520c','e68032cdcc5d02f1799bcc2a08b61370'})
  assert sm['switch.adaptive_lighting_ateljen_test']['state']=='on' and sm['switch.adaptive_lighting_ateljen_test_adapt_brightness']['state']=='off'
  assert not (ROOT/'.storage/local_calendar.sophamtning.ics').exists()
  assert 'ange_starttid_for_bilvarmen' in final['services']['script'] and 'bilvarme_starta_en_gang' in final['services']['script']
  async with h.s.post('http://127.0.0.1:80/api/config/core/check_config',headers={'Authorization':'Bearer '+h.token}) as r:check=await r.json();assert r.status==200 and check['result']=='valid'
  before=json.loads((O/'before.json').read_text());bm={e['entry_id']:e for e in before['entries']};changes=[{'domain':e['domain'],'title':e['title'],'before':bm[e['entry_id']]['state'],'after':e['state']} for e in final['entries'] if e['entry_id'] in bm and e['state']!=bm[e['entry_id']]['state']]
  result={'entries':entries,'repairs':final['repairs'],'check_config':check,'pending_schedules':schedules,'timezone':final['config']['time_zone'],'existing_entry_state_changes':changes,'waste_sensor':sm['sensor.soptomning'],'light':sm['light.bordslampa_ateljen'],'car_state':sm['climate.sef_42h_climate']['state'],'bermuda_proxy_count':sm['sensor.bermuda_global_active_proxy_count']['state'],'bermuda_sample_rooms':{eid:sm[eid]['state'] for eid in ['sensor.atc_b999ba_area','sensor.atc_bfe81b_area']}}
  (O/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps({k:v for k,v in result.items() if k not in ['light','waste_sensor']},ensure_ascii=False,indent=2))
  for n in ['install_requested.py','configure_requested.py','configure_trials.py','bermuda_select.py','trials_activate.py','scheduler_verify.py','trials_dashboards.py','trials_final_verify.py']:shutil.copy2('/tmp/'+n,O/n)
asyncio.run(main())
