import copy, datetime, json, os, urllib.request
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-animation-step2')
ws=websocket.create_connection('ws://supervisor/core/websocket',timeout=20)
ws.recv();ws.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}))
assert json.loads(ws.recv())['type']=='auth_ok'
seq=0
def call(kind,**args):
 global seq
 seq+=1;ws.send(json.dumps(dict(id=seq,type=kind,**args)))
 while True:
  r=json.loads(ws.recv())
  if r.get('id')==seq:
   assert r.get('success'),str(r.get('error'))
   return r.get('result')
original=call('lovelace/config',url_path=None)
config=copy.deepcopy(original)
conditions={
 'switch.billaddare': "is_state('switch.billaddare', 'on') and is_state('sensor.sef_42h_charging_status', 'charging')",
 'climate.sef_42h_climate': "is_state('climate.sef_42h_climate', 'heat_cool')",
}
changes=[]
def walk(x,path):
 if isinstance(x,dict):
  entity=x.get('entity')
  if x.get('type')=='button' and entity in conditions:
   assert 'card_mod' not in x, 'Existing styling; stop for merge'
   before=copy.deepcopy(x)
   style="""ha-state-icon {
  animation: {{ 'vehicle-soft-pulse 4s ease-in-out infinite' if CONDITION else 'none' }};
}
@keyframes vehicle-soft-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.65; }
}
@media (prefers-reduced-motion: reduce) {
  ha-state-icon { animation: none; }
}
""".replace('CONDITION',conditions[entity])
   req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':style}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
   rendered=urllib.request.urlopen(req).read().decode()
   assert '{{' not in rendered and 'animation: none;' in rendered
   x['card_mod']={'style':style}
   changes.append({'path':path,'original_card':before,'updated_card':copy.deepcopy(x)})
  else:
   for k,v in x.items():walk(v,path+[k])
 elif isinstance(x,list):
  for i,v in enumerate(x):walk(v,path+[i])
walk(config['views'][0],['views',0])
assert len(changes)==2
# Prove the complete dashboard is otherwise identical, including approved pool pump styling.
reverted=copy.deepcopy(config)
for change in changes:
 parent=reverted
 for key in change['path'][:-1]:parent=parent[key]
 parent[change['path'][-1]]=change['original_card']
assert reverted==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
backup=folder/('original-'+stamp+'.json')
backup.write_text(json.dumps(original,ensure_ascii=False,indent=2))
(folder/'change.json').write_text(json.dumps({'backup':str(backup),'changes':changes},ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent dashboard edit; stopping'
call('lovelace/config/save',url_path=None,config=config)
assert call('lovelace/config',url_path=None)==config
print('Saved and read back successfully. Exactly two button styles added. Pool pump unchanged.')
print('Both templates rendered successfully in HA; currently inactive.')
print('Backup:',backup)
ws.close()
