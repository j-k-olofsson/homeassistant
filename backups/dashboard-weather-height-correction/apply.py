import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-weather-height-correction')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
def call(w,i,kind,**args):
 w.send(json.dumps(dict(id=i,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==i:
   assert r['success'],r
   return r.get('result')
w=connect();original=call(w,1,'lovelace/config',url_path='lovelace');config=copy.deepcopy(original)
card=next(c for s in config['views'][0]['sections'] for c in s.get('cards',[]) if c['type']=='custom:weather-forecast-card')
style=card['card_mod']['style']
assert style.count('height: 136px !important;')==1
assert style.count('height:160px !important;')==1
# The 24px narrow-screen UV header must be paid for inside the existing height.
# Remove the prior 24px chart increase on wide screens as well.
style=style.replace('height: 136px !important;', 'height: 112px !important;').replace('height:160px !important;', 'height:136px !important;')
card['card_mod']['style']=style
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,2,'lovelace/config',url_path='lovelace')==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.background-map-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,3,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config;w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Verified: weather chart height reduced by 24px at both breakpoints; UV top placement retained; all other config unchanged.')
