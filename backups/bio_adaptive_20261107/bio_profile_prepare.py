import sys,asyncio,json,shutil
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
O=ROOT/'backups/bio_adaptive_20261107';O.mkdir(mode=0o700,exist_ok=True)
async def main():
 async with HA() as h:
  d={k:await h.call(t) for k,t in [('states','get_states'),('entities','config/entity_registry/list'),('entries','config_entries/get'),('repairs','repairs/list_issues')]};(O/'before.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
  for n in ['automations.yaml','.storage/core.config_entries','.storage/lovelace.ha_admin']:shutil.copy2(ROOT/n,O/ROOT.joinpath(n).name)
  for s in d['states']:
   if s['entity_id'] in ['light.bordslampa_vanster','light.bordslampa_hoger','switch.grupp_hemmabio','input_select.light_scene']:print(json.dumps(s,ensure_ascii=False),flush=True)
  async def post(path,data):
   async with h.s.post('http://127.0.0.1:80/api/'+path,headers={'Authorization':'Bearer '+h.token},json=data) as r:v=await r.json();assert r.status==200,(r.status,v)
   assert not v.get('errors'),v;return v
  f=await post('config/config_entries/flow',{'handler':'adaptive_lighting'})
  if f['type']=='menu':raise RuntimeError(f)
  if f['type']=='form' and f.get('step_id')=='menu':f=await post('config/config_entries/flow/'+f['flow_id'],{'action':'new'})
  f=await post('config/config_entries/flow/'+f['flow_id'],{'name':'Bio'});assert f['type']=='create_entry',f
  (O/'created.json').write_text(json.dumps(f,ensure_ascii=False,indent=2));eid=f['result']['entry_id']
  for _ in range(10):
   entities=await h.call('config/entity_registry/list');ee=[e for e in entities if e['config_entry_id']==eid]
   if len(ee)==4:break
   await asyncio.sleep(1)
  for e in ee:
   if 'adapt_color' not in e['entity_id']:await h.call('call_service',domain='switch',service='turn_off',service_data={'entity_id':e['entity_id']})
  f=await post('config/config_entries/options/flow',{'handler':eid})
  config={'lights':['light.bordslampa_vanster','light.bordslampa_hoger'],'min_color_temp':2200,'max_color_temp':4000,'sleep_brightness':15,'transition':30,'interval':90,'advanced':{'take_over_control':True,'take_over_control_mode':'pause_changed','detect_non_ha_changes':True,'manual_control_on_external_turn_on':False,'adapt_only_on_bare_turn_on':True,'initial_transition':3,'sleep_rgb_or_color_temp':'rgb_color','sleep_rgb_color':[255,0,0]}}
  f=await post('config/config_entries/options/flow/'+f['flow_id'],config);assert f['type']=='create_entry';(O/'options.json').write_text(json.dumps(f,ensure_ascii=False,indent=2));print('PROFILE_CONFIGURED_OFF',eid,flush=True)
asyncio.run(main())
