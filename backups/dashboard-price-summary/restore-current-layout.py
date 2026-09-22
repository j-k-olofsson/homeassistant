import json,copy,os,datetime
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-price-summary')
change=json.loads((folder/'change.json').read_text());desired=change['updated_section']['cards']
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
matches=[(i,s) for i,s in enumerate(config['views'][0]['sections']) if any(c.get('heading')=='Elpris' for c in s.get('cards',[]))];assert len(matches)==1
si,s=matches[0];assert len(s['cards'])==2 and s['cards'][1]['type']=='custom:apexcharts-card'
before=copy.deepcopy(s)
s['cards'][0]=copy.deepcopy(desired[0])
graph=s['cards'][1]
for key in ['now','graph_span','update_interval','series','yaxis']:graph[key]=copy.deepcopy(desired[1][key])
graph['apex_config']['chart']=copy.deepcopy(desired[1]['apex_config']['chart'])
assert graph['apex_config']['responsive']==before['cards'][1]['apex_config']['responsive']
check=copy.deepcopy(config);check['views'][0]['sections'][si]=before;assert check==original
backup=folder/('before-restore-'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')+'.json');backup.write_text(json.dumps(original,ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent edit; stop'
call('lovelace/config/save',url_path=None,config=config);assert call('lovelace/config',url_path=None)==config
seq+=1;w.send(json.dumps({'id':seq,'type':'render_template','template':s['cards'][0]['content']}))
while True:
 r=json.loads(w.recv())
 if r.get('id')==seq and r.get('type')=='event':
  result=r['event']['result'];assert isinstance(result,str) and 'Billigaste kommande' in result and 'Nästa' in result
  print('HA live rendered:',result);break
print('Saved and verified. Current layout and graph heights preserved. Backup:',backup)
w.close()
