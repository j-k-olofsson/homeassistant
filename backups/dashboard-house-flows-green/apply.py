import copy,json,os,datetime,urllib.request,websocket,quickjs
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-house-flows-green')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
def call(w,i,kind,**args):
 w.send(json.dumps(dict(id=i,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==i:
   assert r['success'],r
   return r.get('result')

url='/local/house-flows-card/house-flows-card-v5.js'
js=Path('/homeassistant/www/house-flows-card/house-flows-card-v5.js').read_text()
ctx=quickjs.Context();ctx.eval('class HTMLElement {}; const customElements={get:()=>false,define:()=>{}};');ctx.eval(js)
assert js.count('<i class="dot"></i>')==1 and '<i class="dot second"></i>' not in js
assert urllib.request.urlopen('http://homeassistant:80'+url).read().decode()==js
w=connect();original=call(w,1,'lovelace/config',url_path='lovelace');config=copy.deepcopy(original)
cards=[c for sec in config['views'][0]['sections'] for c in sec['cards']]
reference=next(c for c in cards if c['type']=='custom:power-flow-card-plus')
preview=next(c for c in cards if c['type']=='custom:house-flows-card')
preview['grid_options']['rows']='auto'
resources=call(w,2,'lovelace/resources');r=[r for r in resources if '/house-flows-card/' in r['url']];assert len(r)==1
(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,3,'lovelace/config',url_path='lovelace')==original
call(w,4,'lovelace/resources/update',resource_id=r[0]['id'],url=url,res_type='module')
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.compact-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,5,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config
assert any(r['url']==url for r in call(w,2,'lovelace/resources'));w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Electricity icon, line and moving dot green; saved resource verified.')
