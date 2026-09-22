import copy,json,os,datetime,urllib.request,websocket,quickjs
from pathlib import Path
folder=Path('/config/backups/dashboard-level-sort-appliance-progress')
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

base=Path('/config/backups/dashboard-printer-progress/progress.css').read_text()
count=0
for section in config['views'][0]['sections']:
 for c in section['cards']:
  ids=c.get('entity_id',[])
  if not ids or not any('siemens' in e for e in ids):continue
  assert len(ids)==3
  css=base.replace("states('sensor.prusaxl')", "states('"+ids[0]+"').split('.')[-1]").replace('sensor.prusaxl_status',ids[1])
  css=css.replace("'printing'","'Run'").replace("'paused'","'Pause'").replace("['attention', 'error']","['ActionRequired', 'Error']").replace('#FE6E31','#64b5c6').replace('254,110,49','100,181,198').replace('prusa-progress-flow','appliance-progress-flow')
  for status,value in [('Run','50'),('Pause','50'),('unavailable','unavailable')]:
   template=css.replace("states('"+ids[0]+"').split('.')[-1]",repr(status)).replace("states('"+ids[1]+"')",repr(value))
   req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':template}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
   rendered=urllib.request.urlopen(req).read().decode()
   assert ('animation: appliance-progress-flow 3s linear infinite;' in rendered)==(status=='Run')
  c['card_mod']['style']['.']=css;count+=1
assert count==2
js=Path('/config/www/compact-levels-card/compact-levels-card-v3.js').read_text()
ctx=quickjs.Context();ctx.eval('class HTMLElement {}; const customElements={get:()=>false,define:()=>{}};');ctx.eval(js)
ctx.eval("""
const c=Object.create(CompactLevelsCard.prototype);
let ordered=[];
c.shadowRoot={querySelector:()=>({appendChild:r=>ordered.push(r.id)})};
c.rows=['a','b','c','d'].map(id=>({item:{entity:id,warning:10,good:20},row:{id,dataset:{},classList:{toggle(){}},setAttribute(){}},fill:{style:{}},value:{}}));
c.updateStates({a:{state:'100'},b:{state:'20'},c:{state:'unavailable'},d:{state:'20'}});
if(ordered.join()!=='b,d,a,c')throw Error('Initial sort');
ordered=[];
c.updateStates({a:{state:'5'},b:{state:'20'},c:{state:'0'},d:{state:'20'}});
if(ordered.join()!=='c,a,b,d')throw Error('Updated sort');
ordered=[];
c.updateStates({a:{state:'5'},b:{state:'20'},c:{state:'0'},d:{state:'20'}});
if(ordered.length)throw Error('Unnecessary reorder');
""")
print('Sorting checked: lowest first, stable ties, unavailable last, recovery; appliance progress run/pause/unavailable checked.')
url='/local/compact-levels-card/compact-levels-card-v3.js'
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
print('Sorted levels resource and two progress strips saved and verified.')
