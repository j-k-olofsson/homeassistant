import copy,datetime,json,os
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-animation-step3')
w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20)
w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok'
seq=0
def call(kind,**args):
 global seq
 seq+=1;w.send(json.dumps(dict(id=seq,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==seq:
   assert r.get('success'),str(r.get('error'))
   return r.get('result')
original=call('lovelace/config',url_path=None)
config=copy.deepcopy(original)
targets={'light.esphome93_esphome93_led','light.grupp_lampor_vid_tvn'}
changes=[]
def walk(x,path):
 if isinstance(x,dict):
  if x.get('type')=='button' and x.get('entity') in targets:
   assert 'card_mod' not in x,'Existing styling requires merge'
   before=copy.deepcopy(x)
   x['card_mod']={'style':'''ha-state-icon {
  transition: color 300ms ease-in-out,
              filter 300ms ease-in-out,
              transform 180ms ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  ha-state-icon { transition: none; }
}
'''}
   changes.append({'path':path,'original_card':before,'updated_card':copy.deepcopy(x)})
  else:
   for k,v in x.items():walk(v,path+[k])
 elif isinstance(x,list):
  for i,v in enumerate(x):walk(v,path+[i])
walk(config['views'][0],['views',0])
assert len(changes)==2
reverted=copy.deepcopy(config)
for c in changes:
 parent=reverted
 for key in c['path'][:-1]:parent=parent[key]
 parent[c['path'][-1]]=c['original_card']
assert reverted==original
backup=folder/('original-'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')+'.json')
backup.write_text(json.dumps(original,ensure_ascii=False,indent=2))
(folder/'change.json').write_text(json.dumps({'backup':str(backup),'changes':changes},ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent dashboard edit; stopped'
call('lovelace/config/save',url_path=None,config=config)
assert call('lovelace/config',url_path=None)==config
print('Saved and read back. Only Markis-LED and Tv-lampor icon transitions added; prior animations preserved.')
print('Backup:',backup)
w.close()
