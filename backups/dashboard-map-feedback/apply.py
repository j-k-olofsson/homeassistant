import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-map-feedback')
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
counts=[0,0]
for s in config['views'][0]['sections']:
 for i,c in enumerate(s.get('cards',[])):
  if c.get('entity')=='select.max_vald_karta':
   counts[0]+=1;s['cards'][i]={'type':'custom:robot-map-card','entity':'select.max_vald_karta','grid_options':c['grid_options']}
  if c.get('entity')=='input_boolean.narvarosimulering_aktiv':
   counts[1]+=1;c['card_mod']['style']['ha-tile-icon$']+="""
{% if not is_state('input_boolean.narvarosimulering_aktiv','on') %}
.container::after {
 background:var(--state-icon-color, #44739e) !important;
 -webkit-mask:url('/local/dashboard-icons/presence-off-v1.svg') center / 36px 36px no-repeat;
 mask:url('/local/dashboard-icons/presence-off-v1.svg') center / 36px 36px no-repeat;
}
{% endif %}
"""
assert counts==[1,1]
url='/local/robot-map-card/robot-map-card-v1.js'
assert urllib.request.urlopen('http://homeassistant:80'+url).read()==Path('/homeassistant/www/robot-map-card/robot-map-card-v1.js').read_bytes()
resources=call(w,2,'lovelace/resources')
(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
if not any(r['url']==url for r in resources):call(w,3,'lovelace/resources/create',res_type='module',url=url)
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,20,'lovelace/config',url_path='lovelace')==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.background-map-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,21,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config;w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Verified new map button and matching inactive presence icon, persisted across connection.')
