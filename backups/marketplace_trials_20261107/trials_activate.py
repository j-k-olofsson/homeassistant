import sys,asyncio,json
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
O=ROOT/'backups/marketplace_trials_20261107'
async def main():
 async with HA() as h:
  async with h.s.post('http://127.0.0.1:80/api/config/core/check_config',headers={'Authorization':'Bearer '+h.token}) as r:d=await r.json();assert r.status==200 and d['result']=='valid',(r.status,d);(O/'config_check.json').write_text(json.dumps(d))
  await h.call('call_service',domain='script',service='reload')
  entities=await h.call('config/entity_registry/list');states=await h.call('get_states');sm={s['entity_id']:s for s in states}
  for e in entities:
   if e['platform']=='bermuda':print('BERMUDA_ENTITY',e['entity_id'],e.get('original_name'),sm.get(e['entity_id'],{}).get('state'),flush=True)
  main='switch.adaptive_lighting_ateljen_test';bright=main+'_adapt_brightness';color=main+'_adapt_color';sleep=main+'_sleep_mode'
  for eid in [main,bright,sleep]:await h.call('call_service',domain='switch',service='turn_off',service_data={'entity_id':eid})
  await h.call('call_service',domain='switch',service='turn_on',service_data={'entity_id':color})
  before=await h.call('get_states');(O/'before_light_test.json').write_text(json.dumps(before,ensure_ascii=False,indent=2));target=next(s for s in before if s['entity_id']=='light.bordslampa_ateljen');assert target['state']=='on',target
  await h.call('call_service',domain='switch',service='turn_on',service_data={'entity_id':main})
  await h.call('call_service',domain='adaptive_lighting',service='set_manual_control',service_data={'entity_id':main,'lights':['light.bordslampa_ateljen'],'manual_control':False})
  await h.call('call_service',domain='adaptive_lighting',service='apply',service_data={'entity_id':main,'lights':['light.bordslampa_ateljen'],'adapt_brightness':False,'adapt_color':True,'transition':3,'turn_on_lights':False})
  await asyncio.sleep(6)
  after=await h.call('get_states');(O/'after_light_test.json').write_text(json.dumps(after,ensure_ascii=False,indent=2));sm={s['entity_id']:s for s in after};a=sm['light.bordslampa_ateljen'];print('LIGHT_RESULT',{'before':target['attributes'],'after':a['attributes'],'adaptive_switch':sm[main]['state'],'brightness_adaptation':sm[bright]['state']},flush=True)
  assert a['state']==target['state'] and a['attributes']['brightness']==target['attributes']['brightness'];assert sm[bright]['state']=='off' and sm[main]['state']=='on'
  assert 2202<=a['attributes']['color_temp_kelvin']<=4000
asyncio.run(main())
