import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-four-final')
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
completion=json.loads((folder/'completion.json').read_text())
for s in config['views'][0]['sections']:
 for i,c in enumerate(s.get('cards',[])):
  if c.get('entity') in ['switch.poolpump_utomhus_esphome27_relay_state','cover.esphome93_esphome93_markis']:
   s['cards'][i]={'type':'custom:feedback-control-card','entity':c['entity'],'name':c['name'],'kind':'info','icon':c.get('icon','mdi:awning'),'grid_options':c['grid_options']}
  if c.get('type')!='markdown':continue
  key=next((k for k,d in completion.items() if d['source'] in c.get('content','')),None)
  if not key:continue
  source=completion[key]['source'];timer=completion[key]['timer']
  active_conditions=c['visibility'];active=copy.deepcopy(c);active.pop('visibility');active.pop('grid_options')
  name={'prusa':'Prusa XL','tvatt':'Tvätt/tork','disk':'Diskmaskin'}[key]
  title={'prusa':'Utskriften är klar','tvatt':'Programmet är klart','disk':'Disken är klar'}[key]
  done={'type':'markdown','content':'<ha-icon icon="mdi:check-circle-outline"></ha-icon> **'+name+'**<br>**'+title+'**\n\nTryck för att kvittera','tap_action':{'action':'perform-action','perform_action':'timer.cancel','target':{'entity_id':timer}},'card_mod':{'style':{'ha-markdown$':'ha-icon {color:#66bb6a;--mdc-icon-size:24px;vertical-align:middle;margin-right:6px;} p {margin:0;font-size:12px;line-height:1.4;} p+p {margin-top:6px;color:var(--secondary-text-color);}', '.':'ha-card {background:linear-gradient(145deg,#263a49,#1b2937)!important;border:1px solid rgba(158,185,203,.20);border-radius:12px;border-bottom:4px solid #66bb6a;--primary-text-color:#eef4f8;--secondary-text-color:#bdcbd5;}'}}}
  not_active={'condition':'state','entity':source,'state_not':active_conditions[0]['state']}
  s['cards'][i]={'type':'vertical-stack','grid_options':c['grid_options'],'visibility':[{'condition':'or','conditions':active_conditions+[{'condition':'state','entity':timer,'state':'active'}]}],'cards':[{'type':'conditional','conditions':active_conditions,'card':active},{'type':'conditional','conditions':[{'condition':'state','entity':timer,'state':'active'},not_active],'card':done}]}
# No weather/price/layout changes outside the control and activity sections.
for i in [0,1,2,4,6]:assert config['views'][0]['sections'][i]==original['views'][0]['sections'][i]
resources=call(w,2,'lovelace/resources');(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
updates=[('/feedback-control-card/','/local/feedback-control-card/feedback-control-card-v2.js'),('/house-flows-card/','/local/house-flows-card/house-flows-card-v9.js'),('/compact-levels-card/','/local/compact-levels-card/compact-levels-card-v6.js')]
for n,(prefix,url) in enumerate(updates):
 resource=next(r for r in resources if prefix in r['url'])
 assert urllib.request.urlopen('http://homeassistant:80'+url).read()==Path('/homeassistant/www/'+url.removeprefix('/local/')).read_bytes()
 call(w,n+3,'lovelace/resources/update',resource_id=resource['id'],url=url,res_type='module')
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,10,'lovelace/config',url_path='lovelace')==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.four-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,11,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config;w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Verified saved: completion cards, aligned controls, robot map secondary line, disconnect handling resources. Weather and price unchanged.')
