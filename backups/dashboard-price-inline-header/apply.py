import copy,json,os,datetime
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-price-inline-header')
w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok'
seq=0
def call(kind,**args):
 global seq
 seq+=1;w.send(json.dumps(dict(id=seq,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==seq:
   assert r.get('success'),str(r.get('error'))
   return r.get('result')
original=call('lovelace/config',url_path=None);config=copy.deepcopy(original)
matches=[(i,s) for i,s in enumerate(config['views'][0]['sections']) if any(c.get('heading')=='Elpris' for c in s.get('cards',[]))];assert len(matches)==1
si,s=matches[0];before=copy.deepcopy(s);heading=next(c for c in s['cards'] if c.get('heading')=='Elpris');graphs=[c for c in s['cards'] if c.get('type')=='custom:apexcharts-card'];assert len(graphs)==1
g=graphs[0];assert len(g['series'])==1 and 'card_mod' not in g
g['header']={'show':True,'show_states':True,'colorize_states':False}
g['series'][0]['name']='Elpris nu';g['series'][0]['unit']='kr/kWh';g['series'][0].setdefault('show',{})['in_header']='raw'
for entity,name,unit,precision in [('sensor.template_nordpool_base_cost_current_hour','Inköpspris','kr/kWh',2),('sensor.kvartbaserad_elkostnadsprognos','Månadsprognos','kr',0)]:
 assert any(b.get('entity')==entity for b in heading['badges'])
 g['series'].append({'entity':entity,'name':name,'unit':unit,'float_precision':precision,'yaxis_id':'first','show':{'in_chart':False,'in_header':'raw','legend_value':False},'data_generator':'return [];','header_actions':{'tap_action':{'action':'more-info'}}})
g['card_mod']={'style':'''#header { padding: 10px 12px 0; }
#header__states {
  justify-content: center;
  align-items: center;
  gap: 6px 22px;
  margin: 0;
}
#header__states > #states__state {
  flex: 0 0 auto;
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  gap: 6px;
  margin: 0;
}
#state__value { display: flex; align-items: baseline; gap: 4px; }
#state__value > #state { font-size: 15px; font-weight: 600; }
#state__value > #uom { font-size: 12px; }
#state__name { font-size: 12px; font-weight: 400; color: var(--secondary-text-color); }
#state__name::after { content: ':'; }
'''}
s['cards'].remove(heading)
check=copy.deepcopy(config);check['views'][0]['sections'][si]=before;assert check==original
assert g['apex_config']==graphs[0]['apex_config']
assert g['series'][0]['data_generator']==next(c for c in before['cards'] if c.get('type')=='custom:apexcharts-card')['series'][0]['data_generator']
backup=folder/('original-'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')+'.json');backup.write_text(json.dumps(original,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'backup':str(backup),'section_index':si,'original_section':before,'updated_section':s},ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent dashboard edit'
call('lovelace/config/save',url_path=None,config=config);assert call('lovelace/config',url_path=None)==config
print('Saved and read back: separate heading removed; three current entity states in chart header. Graph data and dimensions preserved.');w.close()
