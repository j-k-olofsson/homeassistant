import sys,asyncio,json
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
OUT=ROOT/'backups/marketplace_trials_20261107'
async def main():
 async with HA() as h:
  async def req(path,data):
   async with h.s.post('http://127.0.0.1:80/api/'+path,headers={'Authorization':'Bearer '+h.token},json=data) as r:d=await r.json();assert r.status==200,(r.status,d)
   assert not d.get('errors'),d
   return d
  entries=await h.call('config_entries/get');entities=await h.call('config/entity_registry/list');al=next(e for e in entries if e['domain']=='adaptive_lighting');ae=[e for e in entities if e['config_entry_id']==al['entry_id']];print('AL_ENTITIES',[(e['entity_id'],e.get('original_name')) for e in ae],flush=True)
  for e in ae:
   if 'sleep_mode' not in e['entity_id'] and 'adapt_color' not in e['entity_id']:
    await h.call('call_service',domain='switch',service='turn_off',service_data={'entity_id':e['entity_id']})
  f=await req('config/config_entries/options/flow',{'handler':al['entry_id']});(OUT/'adaptive_options_form.json').write_text(json.dumps(f,ensure_ascii=False,indent=2))
  settings={'lights':['light.bordslampa_ateljen'],'min_color_temp':2202,'max_color_temp':4000,'sleep_color_temp':2202,'transition':30,'interval':90,'advanced':{'take_over_control':True,'take_over_control_mode':'pause_changed','detect_non_ha_changes':True,'manual_control_on_external_turn_on':False,'adapt_only_on_bare_turn_on':True,'initial_transition':3}}
  d=await req('config/config_entries/options/flow/'+f['flow_id'],settings);(OUT/'adaptive_options_result.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));print('ADAPTIVE_CONFIGURED',d['type'],flush=True)
  be=next(e for e in entries if e['domain']=='bermuda');f=await req('config/config_entries/options/flow',{'handler':be['entry_id']});(OUT/'bermuda_info.json').write_text(json.dumps(f,ensure_ascii=False,indent=2));print('BERMUDA_INFO',f.get('description_placeholders'),flush=True)
  f=await req('config/config_entries/options/flow/'+f['flow_id'],{'next_step_id':'selectdevices'});(OUT/'bermuda_device_form.json').write_text(json.dumps(f,ensure_ascii=False,indent=2));opts=f['data_schema'][0]['selector']['select']['options'];print('BERMUDA_DEVICE_LABELS',[o['label'] for o in opts[:35]],flush=True)
  print('EXISTING_IBEACON',[(e['entity_id'],e.get('original_name')) for e in entities if e['platform']=='ibeacon'],flush=True)
asyncio.run(main())
