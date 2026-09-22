import copy,datetime,json,os
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-appliance-cards')
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
found=[]
for si,s in enumerate(config['views'][0]['sections']):
 for ci,c in enumerate(s.get('cards',[])):
  if c.get('type')=='markdown' and 'Prusa XL' in c.get('content',''):found.append((si,ci,c))
assert len(found)==1
si,ci,printer=found[0]
before=copy.deepcopy(printer)
css=printer['card_mod']['style']['ha-markdown$'];assert '#64b5c6' in css
printer['card_mod']['style']['ha-markdown$']=css.replace('#64b5c6','#FE6E31').replace('100,181,198','254,110,49')
added=copy.deepcopy(json.loads((folder/'change.json').read_text())['added_cards'])
for new in added:
 status=new['entity_id'][0]
 assert status not in json.dumps(original['views'][0]['sections']), 'Appliance card already present; review first'
 # Match the width chosen by the user for the printer card.
 new['grid_options']=copy.deepcopy(printer['grid_options'])
section=config['views'][0]['sections'][si]
section['cards'].extend(added)
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards']=check['views'][0]['sections'][si]['cards'][:-2];check['views'][0]['sections'][si]['cards'][ci]=before;assert check==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');backup=folder/('before-restore-orange-'+stamp+'.json');backup.write_text(json.dumps(original,ensure_ascii=False,indent=2))
(folder/'change-restore-orange.json').write_text(json.dumps({'backup':str(backup),'section':si,'printer_index':ci,'original_printer':before,'updated_printer':printer,'added_cards':added},ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent dashboard edit; stopped'
call('lovelace/config/save',url_path=None,config=config)
actual=call('lovelace/config',url_path=None);assert actual==config
print('Verified: printer orange #FE6E31; two separate appliance cards restored in section',si+1,'with widths',printer['grid_options']['columns'])
print('Backup:',backup);w.close()
