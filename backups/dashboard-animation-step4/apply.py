import copy,datetime,json,os,urllib.request
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-animation-step4')
w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok'
seq=0
def call(kind,**args):
 global seq
 seq+=1;w.send(json.dumps(dict(id=seq,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==seq:
   assert r.get('success'),str(r.get('error'))
   return r.get('result')
original=call('lovelace/config',url_path=None);config=copy.deepcopy(original)
resources=call('lovelace/resources')
assert not any('power-flow-card-plus' in x['url'] for x in resources),'Resource already exists; review first'
url='/local/power-flow-card-plus/power-flow-card-plus-v0.3.7.js'
req=urllib.request.Request('http://homeassistant:80'+url,headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']})
served=urllib.request.urlopen(req).read()
assert served==Path('/config/www/power-flow-card-plus/power-flow-card-plus-v0.3.7.js').read_bytes()
card={'type':'custom:power-flow-card-plus','entities':{'grid':{'entity':'sensor.power_consumed','name':'Elnät','color':{'consumption':'#64b5c6','production':'#64b5c6'}},'home':{'entity':'sensor.power_consumed','name':'Hem','color_icon':True}},'min_flow_rate':4,'max_flow_rate':8,'use_new_flow_rate_model':True,'min_expected_power':0,'max_expected_power':16000,'kilo_decimals':1,'kilo_threshold':0,'clickable_entities':True,'grid_options':{'columns':12,'rows':'auto'}}
section=config['views'][0]['sections'][3]
assert section['cards'][0].get('entity')=='sensor.power_consumed'
assert all(c.get('type')!='custom:power-flow-card-plus' for c in section['cards'])
path=['views',0,'sections',3,'cards',len(section['cards'])]
section['cards'].append(card)
check=copy.deepcopy(config);check['views'][0]['sections'][3]['cards'].pop();assert check==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
backup=folder/('original-'+stamp+'.json');backup.write_text(json.dumps(original,ensure_ascii=False,indent=2))
(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent dashboard edit'
resource=call('lovelace/resources/create',res_type='module',url=url)
(folder/'change.json').write_text(json.dumps({'backup':str(backup),'path':path,'added_card':card,'resource':resource,'url':url},ensure_ascii=False,indent=2))
call('lovelace/config/save',url_path=None,config=config)
assert call('lovelace/config',url_path=None)==config
assert any(r['url']==url for r in call('lovelace/resources'))
print('Saved and verified: one flow card added below gauges; prior cards unchanged.')
print('Resource registered and served by HA. Backup:',backup)
w.close()
