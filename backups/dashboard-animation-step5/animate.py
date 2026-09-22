import copy,datetime,json,os,urllib.request
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-animation-step5')
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
original=call('lovelace/config',url_path=None);config=copy.deepcopy(original);found=[]
def walk(x,path):
 if isinstance(x,dict):
  if x.get('type')=='markdown' and 'Prusa XL' in x.get('content',''):found.append((x,path))
  for k,v in x.items():walk(v,path+[k])
 elif isinstance(x,list):
  for i,v in enumerate(x):walk(v,path+[i])
walk(config['views'][0],['views',0]);assert len(found)==1
card,path=found[0];before=copy.deepcopy(card);assert 'card_mod' not in card
assert card['content'].count('**Prusa XL')==1
card['content']=card['content'].replace('**Prusa XL','<ha-icon icon="mdi:printer-3d-nozzle"></ha-icon> **Prusa XL',1)
style='''ha-icon {
  color: #64b5c6;
  --mdc-icon-size: 24px;
  display: inline-block;
  margin-right: 6px;
  vertical-align: middle;
  animation: {{ 'printer-soft-pulse 3s ease-in-out infinite' if is_state('sensor.prusaxl', 'printing') else 'none' }};
}
@keyframes printer-soft-pulse {
  0%, 100% { opacity: 1; filter: drop-shadow(0 0 3px rgba(100,181,198,0.45)); }
  50% { opacity: 0.5; filter: drop-shadow(0 0 0px rgba(100,181,198,0)); }
}
@media (prefers-reduced-motion: reduce) {
  ha-icon { animation: none; }
}
'''
card['card_mod']={'style':{'ha-markdown$':style}}
for label,template in [('content',card['content']),('animation',style)]:
 req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':template}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 rendered=urllib.request.urlopen(req).read().decode();assert '{{' not in rendered
 print(label+':',rendered.strip()[:180])
check=copy.deepcopy(config);parent=check
for k in path[:-1]:parent=parent[k]
parent[path[-1]]=before;assert check==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');backup=folder/('before-animation-'+stamp+'.json');backup.write_text(json.dumps(original,ensure_ascii=False,indent=2))
(folder/'change-animation.json').write_text(json.dumps({'backup':str(backup),'path':path,'original_card':before,'updated_card':card},ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent dashboard edit'
call('lovelace/config/save',url_path=None,config=config);assert call('lovelace/config',url_path=None)==config
print('Saved and read back. Only printer card changed. Backup:',backup);w.close()
