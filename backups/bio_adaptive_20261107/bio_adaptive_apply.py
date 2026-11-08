import sys,asyncio,json
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
O=ROOT/'backups/bio_adaptive_20261107'
async def main():
 async with HA() as h:
  async with h.s.post('http://127.0.0.1:80/api/config/core/check_config',headers={'Authorization':'Bearer '+h.token}) as r:check=await r.json();assert r.status==200 and check['result']=='valid',check
  states=await h.call('get_states');sm={s['entity_id']:s for s in states};assert int(sm['automation.bordslampor_hemmabio']['attributes'].get('current',0))==0
  active=[s['entity_id'] for s in states if s['entity_id'].startswith('script.') and s['state']=='on'];assert not active,active
  await h.call('call_service',domain='script',service='reload');await h.call('call_service',domain='automation',service='reload')
  await h.call('call_service',domain='script',service='bio_adaptivt_ljus_synkronisera')
  cfg=await h.call('lovelace/config',url_path='ha-admin');(O/'dashboard_before.json').write_text(json.dumps(cfg,ensure_ascii=False,indent=2));view=next(v for v in cfg['views'] if v.get('path')=='tester');assert not any(s['cards'][0].get('heading')=='Bio – adaptivt ljus' for s in view['sections'])
  view['sections'].append({'type':'grid','cards':[{'type':'heading','heading':'Bio – adaptivt ljus','heading_style':'title','icon':'mdi:lamps'},{'type':'markdown','content':'Bordslampornas färgtemperatur anpassas i **DAY, DAWN och DUSK** när bion är av. Befintlig ljusstyrka behålls. **NIGHT ger fortsatt rött ljus på 15 %**, och bion släcker lamporna. Profilen är spärrad i natt-/bioläge; morgonens mjuka övergång får bli klar innan anpassningen återupptas.'},{'type':'entities','show_header_toggle':False,'entities':[{'entity':'switch.adaptive_lighting_bio','name':'Adaptiv färgtemperatur'},{'entity':'input_select.light_scene','name':'Aktuell ljusscen'},{'entity':'switch.grupp_hemmabio','name':'Hemmabio'},{'entity':'light.bordslampa_vanster','name':'Bordslampa vänster'},{'entity':'light.bordslampa_hoger','name':'Bordslampa höger'}]}]})
  await h.call('lovelace/config/save',url_path='ha-admin',config=cfg);assert await h.call('lovelace/config',url_path='ha-admin')==cfg
  await asyncio.sleep(6)
  after={k:await h.call(t) for k,t in [('states','get_states'),('entries','config_entries/get'),('repairs','repairs/list_issues')]};(O/'after.json').write_text(json.dumps(after,ensure_ascii=False,indent=2));am={s['entity_id']:s for s in after['states']};allowed=am['input_select.light_scene']['state'] in ['DAY','DAWN','DUSK'] and am['switch.grupp_hemmabio']['state']=='off'
  assert am['switch.adaptive_lighting_bio']['state']==('on' if allowed else 'off');assert am['switch.adaptive_lighting_bio_adapt_brightness']['state']=='off'
  before=json.loads((O/'before.json').read_text());bm={s['entity_id']:s for s in before['states']};lamps=['light.bordslampa_vanster','light.bordslampa_hoger']
  for eid in lamps:
   assert am[eid]['state']==bm[eid]['state']
   if allowed:assert am[eid]['attributes']['brightness']==bm[eid]['attributes']['brightness'] and 2200<=am[eid]['attributes']['color_temp_kelvin']<=4000
  result={'check_config':check,'repairs':after['repairs'],'scene':am['input_select.light_scene']['state'],'cinema':am['switch.grupp_hemmabio']['state'],'profile':am['switch.adaptive_lighting_bio']['state'],'brightness_adaptation':am['switch.adaptive_lighting_bio_adapt_brightness']['state'],'lights':{eid:{'state':am[eid]['state'],'before_kelvin':bm[eid]['attributes'].get('color_temp_kelvin'),'after_kelvin':am[eid]['attributes'].get('color_temp_kelvin'),'before_brightness':bm[eid]['attributes'].get('brightness'),'after_brightness':am[eid]['attributes'].get('brightness')} for eid in lamps}}
  (O/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False,indent=2),flush=True)
asyncio.run(main())
