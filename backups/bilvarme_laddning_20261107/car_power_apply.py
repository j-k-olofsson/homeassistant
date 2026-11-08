import sys,asyncio,json,copy
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
O=ROOT/'backups/bilvarme_laddning_20261107'
async def main():
 async with HA() as h:
  async with h.s.post('http://127.0.0.1:80/api/config/core/check_config',headers={'Authorization':'Bearer '+h.token}) as r:check=await r.json();assert r.status==200 and check['result']=='valid',check
  for i in range(15):
   active=[s['entity_id'] for s in await h.call('get_states') if s['entity_id'].startswith('script.') and s['state']=='on']
   if not active:break
   await asyncio.sleep(1)
  assert not active,active
  await h.call('call_service',domain='script',service='reload')
  await h.call('call_service',domain='automation',service='reload')
  cfg=await h.call('lovelace/config',url_path='lovelace');(O/'dashboard_before.json').write_text(json.dumps(cfg,ensure_ascii=False,indent=2));carview=next(v for v in cfg['views'] if v.get('path')=='bill');section=next(s for s in carview['sections'] if s['cards'][0].get('heading')=='Bilvärme – engångstider');card=next(c for c in section['cards'] if c['type']=='markdown');card['content']='Välj **datum och tid för värmestart** via knappen. Ladduttaget slås på en minut tidigare och måste bekräfta att det är på innan värmen startas. Strömmen hålls tillgänglig under uppvärmningen. Listans klockslag visar laddstarten; bokningens namn anger värmestarten. Varje bokning körs en gång.'
  await h.call('lovelace/config/save',url_path='lovelace',config=cfg);assert await h.call('lovelace/config',url_path='lovelace')==cfg
  initial=await h.call('scheduler');assert not initial,initial
  test_id=None
  try:
   await h.call('call_service',domain='script',service='ange_starttid_for_bilvarmen',service_data={'starttid':'2099-01-01 00:00:00'})
   await asyncio.sleep(1);schedules=await h.call('scheduler');assert len(schedules)==1,schedules;s=schedules[0];test_id=s['entity_id']
   assert s['start_date']==s['end_date']=='2098-12-31' and s['timeslots'][0]['start']=='23:59',s
   assert s['repeat_type']=='single' and '01/01 00:00' in s['name'];(O/'booking_midnight_test.json').write_text(json.dumps(s,ensure_ascii=False,indent=2))
  finally:
   if test_id:await h.call('call_service',domain='scheduler',service='remove',service_data={'entity_id':test_id})
  await asyncio.sleep(1);assert not await h.call('scheduler')
  states=await h.call('get_states');sm={s['entity_id']:s for s in states};repairs=await h.call('repairs/list_issues');result={'check_config':check,'repairs':repairs,'pending_schedules':await h.call('scheduler'),'charger_state':sm['switch.billaddare']['state'],'car_climate_state':sm['climate.sef_42h_climate']['state'],'new_worker_available':'script.bilvarme_med_laddning' in sm}
  assert result['charger_state']=='off' and result['car_climate_state']=='off' and result['new_worker_available'];(O/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False))
asyncio.run(main())
