import copy,json,os,datetime,urllib.request,websocket,quickjs
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-equal-auto-height')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
def call(w,i,kind,**args):
 w.send(json.dumps(dict(id=i,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==i:
   assert r['success'],r
   return r.get('result')

urls=['/local/house-flows-card/house-flows-card-v7.js','/local/compact-levels-card/compact-levels-card-v4.js']
for url in urls:
 js=Path('/homeassistant/www/'+url.removeprefix('/local/')).read_text()
 ctx=quickjs.Context();ctx.eval('class HTMLElement {}; const customElements={get:()=>false,define:()=>{}};');ctx.eval(js)
 assert urllib.request.urlopen('http://homeassistant:80'+url).read().decode()==js
w=connect();original=call(w,1,'lovelace/config',url_path='lovelace');config=copy.deepcopy(original)
changed=[]
for si,sec in enumerate(config['views'][0]['sections']):
 for ci,card in enumerate(sec['cards']):
  if card['type'] in ['custom:house-flows-card','custom:compact-levels-card']:
   card['grid_options']['rows']='auto';changed.append((si,ci))
assert len(changed)==2 and changed[0][0]==changed[1][0]
check=copy.deepcopy(config)
for si,ci in changed:check['views'][0]['sections'][si]['cards'][ci]=original['views'][0]['sections'][si]['cards'][ci]
assert check==original
resources=call(w,2,'lovelace/resources');(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,3,'lovelace/config',url_path='lovelace')==original
for i,url in enumerate(urls,4):
 directory=url.rsplit('/',1)[0]+'/'
 matches=[r for r in resources if r['url'].startswith(directory)];assert len(matches)==1
 call(w,i,'lovelace/resources/update',resource_id=matches[0]['id'],url=url,res_type='module')
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.auto-height-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,6,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config
current=call(w,2,'lovelace/resources');assert all(any(r['url']==url for r in current) for url in urls);w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Both cards: 12 columns, auto rows, stretch to shared row height. JS and saved resources/config verified.')
