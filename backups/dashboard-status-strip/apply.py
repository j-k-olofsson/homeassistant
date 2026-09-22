import copy,json,os,datetime,urllib.request,websocket,quickjs
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-status-strip')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
def call(w,i,kind,**args):
 w.send(json.dumps(dict(id=i,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==i:
   assert r['success'],r
   return r.get('result')

js=Path('/homeassistant/www/home-status-strip/home-status-strip-v1.js').read_text()
ctx=quickjs.Context();ctx.eval('class HTMLElement {}; const customElements={get:()=>false,define:()=>{}};');ctx.eval(js)
ctx.eval("""
if(HomeStatusStrip.describe('lock',{state:'locked'}).text!=='Låst')throw Error('Lock');
if(!HomeStatusStrip.describe('lock',{state:'locking'}).moving)throw Error('Lock movement');
if(HomeStatusStrip.describe('cover',{state:'opening',attributes:{assumed_state:true}}).moving)throw Error('Assumed movement');
if(HomeStatusStrip.describe('door',{state:'unavailable'}).tone!=='unknown')throw Error('Unknown');
if(!HomeStatusStrip.describe('waste',{state:'Imorgon'}).notify)throw Error('Waste');
""")
url='/local/home-status-strip/home-status-strip-v1.js'
assert urllib.request.urlopen('http://homeassistant:80'+url).read().decode()==js
w=connect();original=call(w,1,'lovelace/config',url_path='lovelace');config=copy.deepcopy(original)
kinds=['post','waste','lock','door','cover']
badges=config['views'][0]['badges'];assert len(badges)==5
card={'type':'custom:home-status-strip','entities':[{'kind':kind,'entity':badge['entity']} for kind,badge in zip(kinds,badges)],'grid_options':{'columns':'full','rows':'auto'}}
found=[(i,s) for i,s in enumerate(config['views'][0]['sections']) if any(c['type']=='custom:weather-forecast-card' for c in s['cards'])];assert len(found)==1
si,section=found[0];section['cards'].insert(0,card)
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'].pop(0);assert check==original
resources=call(w,2,'lovelace/resources');(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,3,'lovelace/config',url_path='lovelace')==original
if not any(r['url']==url for r in resources):call(w,4,'lovelace/resources/create',url=url,res_type='module')
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.flows-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,5,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config
assert any(r['url']==url for r in call(w,2,'lovelace/resources'));w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Status strip added above weather; badges and other cards preserved. Resource/config verified.')
