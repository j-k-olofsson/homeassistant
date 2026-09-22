import copy,json,os,datetime,urllib.request,websocket,quickjs
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-house-flows-preview')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
def call(w,i,kind,**args):
 w.send(json.dumps(dict(id=i,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==i:
   assert r['success'],r
   return r.get('result')

js=Path('/homeassistant/www/house-flows-card/house-flows-card-v1.js').read_text()
ctx=quickjs.Context();ctx.eval('class HTMLElement {}; const customElements={get:()=>false,define:()=>{}};');ctx.eval(js)
ctx.eval("""
if(!(HouseFlowsCard.duration(1,500)>HouseFlowsCard.duration(20,500)&&HouseFlowsCard.duration(20,500)>HouseFlowsCard.duration(500,500)))throw Error('Speed');
if(HouseFlowsCard.reading({state:'unavailable'})!==null)throw Error('Missing');
const c=Object.create(HouseFlowsCard.prototype);c.config={power:'p',download:'d',upload:'u',connection:'wan',rate_factor:1.048576};
c.rows=['power','download','upload'].map(key=>({key,row:{classList:{toggle(k,v){this[k]=v}},style:{setProperty(k,v){this[k]=v}},setAttribute(){}},number:{},detail:{}}));
c.update({p:{state:'2000',attributes:{unit_of_measurement:'W'}},d:{state:'20'},u:{state:'0'},wan:{state:'on'}});
if(c.rows[0].row.classList.still||c.rows[1].row.classList.still||!c.rows[2].row.classList.still)throw Error('Activity');
if(c.rows[2].row.style['--direction']!=='reverse')throw Error('Upload direction');
c.update({p:{state:'-2',attributes:{unit_of_measurement:'kW'}},d:{state:'20'},u:{state:'10'},wan:{state:'off'}});
if(!c.rows[1].row.classList.still||!c.rows[2].row.classList.still||c.rows[0].row.style['--direction']!=='reverse')throw Error('Offline/export');
""")
print('JS checks: speed scaling, units, zero traffic, missing values, offline and direction passed.')
url='/local/house-flows-card/house-flows-card-v1.js'
assert urllib.request.urlopen('http://homeassistant:80'+url).read().decode()==js
card={'type':'custom:house-flows-card','power':'sensor.power_consumed','download':'sensor.sovrummet_openwrt_one_router_sovrum_wan_rx_rate','upload':'sensor.sovrummet_openwrt_one_router_sovrum_wan_tx_rate','connection':'binary_sensor.sovrummet_openwrt_one_router_sovrum_wan_connected','rate_factor':1.048576,'grid_options':{'columns':'full','rows':'auto'}}
for k in ['power','download','upload','connection']:
 req=urllib.request.Request('http://supervisor/core/api/states/'+card[k],headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']})
 state=json.load(urllib.request.urlopen(req));print(k,state['state'],state['attributes'].get('unit_of_measurement'))
w=connect();original=call(w,1,'lovelace/config',url_path='lovelace');config=copy.deepcopy(original)
config['views'][0]['sections'].append({'type':'grid','column_span':2,'cards':[card]})
check=copy.deepcopy(config);check['views'][0]['sections'].pop();assert check==original
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
print('Added preview section only; all existing sections unchanged. Resource and configuration verified.')
