import copy,json,os,datetime,urllib.request,websocket,quickjs
from pathlib import Path
from transform import transform
folder=Path('/config/backups/dashboard-clear-motion')
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
changed=transform(config);assert len(changed)==8,(len(changed),changed)
for path in changed:
 value=config
 for part in path:value=value[part]
 req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':value}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 rendered=urllib.request.urlopen(req).read().decode();assert '{{' not in rendered
 assert 'soft-pulse' not in value and 'music-status-pulse' not in value
 print('Rendered',path)
js=Path('/config/www/compact-levels-card/compact-levels-card-v2.js').read_text()
ctx=quickjs.Context();ctx.eval('class HTMLElement {}; const customElements={get:()=>false,define:()=>{}};');ctx.eval(js)
assert 'opacity:.45' not in js and '.critical .value::before' in js
url='/local/compact-levels-card/compact-levels-card-v2.js'
assert urllib.request.urlopen('http://homeassistant:80'+url).read().decode()==js
resources=call(w,2,'lovelace/resources');r=[r for r in resources if '/compact-levels-card/' in r['url']];assert len(r)==1
(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,3,'lovelace/config',url_path='lovelace')==original
call(w,4,'lovelace/resources/update',resource_id=r[0]['id'],url=url,res_type='module')
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.motion-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,5,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config
assert any(r['url']==url for r in call(w,2,'lovelace/resources'));w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Eight animation templates and warning marker replaced; saved config/resource verified.')
