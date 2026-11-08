import sys,asyncio,json,copy
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
O=ROOT/'backups/marketplace_trials_20261107'
async def main():
 async with HA() as h:
  for path in ['lovelace','ha-admin']:
   cfg=await h.call('lovelace/config',url_path=path);(O/('dashboard_'+path+'_before.json')).write_text(json.dumps(cfg,ensure_ascii=False,indent=2));original=copy.deepcopy(cfg)
   if path=='lovelace':
    view=next(v for v in cfg['views'] if v.get('path')=='bill');assert not any(s.get('cards',[{}])[0].get('heading')=='Bilvärme – engångstider' for s in view['sections'])
    section={'type':'grid','column_span':2,'cards':[{'type':'heading','heading':'Bilvärme – engångstider','heading_style':'title','icon':'mdi:car-seat-heater'}, {'type':'markdown','content':'Välj **datum och starttid** via knappen. Varje bokning körs en gång och tas sedan bort. Bilens senast valda klimatinställningar används. Ingen återkommande start är aktiverad.'},{'type':'button','entity':'script.ange_starttid_for_bilvarmen','name':'Välj starttid för bilvärmen','icon':'mdi:calendar-plus','tap_action':{'action':'more-info'},'show_state':False},{'type':'custom:scheduler-card','title':'Bokade engångstider','include':['script.bilvarme_starta_en_gang'],'tags':['bilvarme_ad_hoc'],'discover_existing':False,'show_add_button':False,'show_header_toggle':False,'time_step':1}]}
    view['sections'].insert(0,section)
    # Replace the obsolete car controls on the heating view with the same booking dialog.
    heating=next(v for v in cfg['views'] if v.get('path')=='varme')
    heating['badges']=[b for b in heating.get('badges',[]) if b.get('entity') not in ['input_datetime.starta_bilvarmen','input_boolean.automatisk_bilvarme']]
    heating['badges'].append({'type':'entity','entity':'script.ange_starttid_for_bilvarmen','name':'Boka bilvärme','show_name':True,'show_state':False,'icon':'mdi:calendar-plus','tap_action':{'action':'more-info'}})
   else:
    assert not any(v.get('path')=='tester' for v in cfg['views'])
    cfg['views'].append({'title':'Tester','path':'tester','type':'sections','icon':'mdi:flask-outline','max_columns':3,'sections':[{'type':'grid','cards':[{'type':'heading','heading':'Ateljén – ljustest','heading_style':'title','icon':'mdi:theme-light-dark'},{'type':'markdown','content':'Bordslampans färgtemperatur anpassas efter dagen, mellan cirka **2 200 och 4 000 K**. Ljusstyrka och tändning följer den befintliga styrningen. Reglaget nedan pausar anpassningen. Manuell färgändring kan pausa den tills lampan släcks och tänds igen.'},{'type':'entities','show_header_toggle':False,'entities':[{'entity':'switch.adaptive_lighting_ateljen_test','name':'Anpassa färgtemperatur'},{'entity':'light.bordslampa_ateljen','name':'Bordslampan'}]}]}, {'type':'grid','cards':[{'type':'heading','heading':'Bermuda – första jämförelsen','heading_style':'title','icon':'mdi:bluetooth'},{'type':'markdown','content':'Två av dina befintliga temperaturgivare används för att jämföra uppskattat rum med känd placering. Ingen mobilkalibrering har gjorts. Avstånden är uppskattningar till närmaste mottagare. Ingen belysning eller annan automation styrs av dessa mätningar.'},{'type':'entities','show_header_toggle':False,'entities':[{'entity':'sensor.bermuda_global_active_proxy_count','name':'Aktiva mottagare'},{'entity':'sensor.atc_b999ba_area','name':'Ateljéns givare – uppskattat rum'},{'entity':'sensor.atc_b999ba_distance','name':'Ateljéns givare – uppskattat avstånd'},{'entity':'sensor.atc_bfe81b_area','name':'Verandans givare – uppskattat rum'},{'entity':'sensor.atc_bfe81b_distance','name':'Verandans givare – uppskattat avstånd'}]},{'type':'button','name':'Välj fler enheter i Bermuda','icon':'mdi:bluetooth-settings','tap_action':{'action':'navigate','navigation_path':'/config/integrations/integration/bermuda'}}]}]})
   await h.call('lovelace/config/save',url_path=path,config=cfg)
   saved=await h.call('lovelace/config',url_path=path);assert saved==cfg
   (O/('dashboard_'+path+'_after.json')).write_text(json.dumps(saved,ensure_ascii=False,indent=2));print('SAVED',path,flush=True)
  res=await h.call('lovelace/resources');sr=next(r for r in res if 'scheduler-card' in r['url'])
  async with h.s.get('http://127.0.0.1:80'+sr['url'],headers={'Authorization':'Bearer '+h.token}) as r:assert r.status==200;await r.read();print('SCHEDULER_RESOURCE_HTTP',r.status,flush=True)
asyncio.run(main())
