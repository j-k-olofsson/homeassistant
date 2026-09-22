import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/config/backups/dashboard-compact-levels')
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
entities=['sensor.sef_42h_battery_level','sensor.sef_42h_fuel_level','sensor.gasol_utomhus_esphome73_lpg_level','sensor.esphome90_esphome90_salt_level','sensor.vattenniva_honshuset_esphome74_water_level']
found=[(i,s) for i,s in enumerate(config['views'][0]['sections']) if sum(c.get('type')=='gauge' and c.get('entity') in entities for c in s.get('cards',[]))==5];assert len(found)==1
si,section=found[0];before=copy.deepcopy(section)
gauges={c['entity']:c for c in section['cards'] if c.get('entity') in entities}
newcard={'type':'custom:compact-levels-card','entities':[{'entity':e,'name':gauges[e]['name'],'warning':gauges[e]['severity']['yellow'],'good':gauges[e]['severity']['green']} for e in entities],'grid_options':{'columns':12,'rows':'auto'}}
# Retain the two vehicle controls and UV card in their existing order, then add the level summary.
section['cards']=[c for c in section['cards'] if c.get('entity') not in entities]+[newcard]
for entity in entities:
 req=urllib.request.Request('http://supervisor/core/api/states/'+entity,headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']})
 state=json.load(urllib.request.urlopen(req));assert state['attributes'].get('unit_of_measurement')=='%';print(entity,state['state'])
check=copy.deepcopy(config);check['views'][0]['sections'][si]=before;assert check==original
url='/local/compact-levels-card/compact-levels-card-v1.js'
assert urllib.request.urlopen('http://homeassistant:80'+url).read()==Path('/config/www/compact-levels-card/compact-levels-card-v1.js').read_bytes()
resources=call(w,2,'lovelace/resources')
(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
if not any(r['url']==url for r in resources):call(w,3,'lovelace/resources/create',res_type='module',url=url)
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
(folder/'change.json').write_text(json.dumps({'section':si,'before':before,'after':section},ensure_ascii=False,indent=2))
assert call(w,4,'lovelace/config',url_path='lovelace')==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.levels-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,5,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config
assert any(r['url']==url for r in call(w,2,'lovelace/resources'));w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Verified saved config and resource across new connection; five gauges replaced, other sections unchanged.')
