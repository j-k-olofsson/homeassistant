import copy,datetime,json,os,urllib.request
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-activity-status-colors')
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
def render(template):
 req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':template}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 return urllib.request.urlopen(req).read().decode()
original=call('lovelace/config',url_path=None);config=copy.deepcopy(original);changes=[]
def walk(x,path):
 if isinstance(x,dict):
  if x.get('type')=='markdown' and any(t in x.get('content','') for t in ['Prusa XL','Tvätt/tork','Diskmaskin']):
   before=copy.deepcopy(x);printer='Prusa XL' in x['content'];entity=x['entity_id'][0]
   prefix='BSH.Common.EnumType.OperationState.'
   run='printing' if printer else prefix+'Run';pause='paused' if printer else prefix+'Pause';attention=['attention','error'] if printer else [prefix+'ActionRequired']
   normal='#FE6E31' if printer else '#64b5c6'
   css=x['card_mod']['style']['ha-markdown$']
   color="{{ '#FFC107' if indicator_state == PAUSE else '#FF9800' if indicator_state in ATTENTION else NORMAL }}".replace('PAUSE',repr(pause)).replace('ATTENTION',repr(attention)).replace('NORMAL',repr(normal))
   assert 'color: '+normal+';' in css
   css=css.replace('color: '+normal+';','color: '+color+';')
   css=css.replace(f"is_state('{entity}', '{run}')",f"indicator_state == '{run}'")
   css="{% set indicator_state = states('"+entity+"') %}\n"+css
   x['card_mod']['style']['ha-markdown$']=css
   if printer:
    old="{{ 'Pausad' if printer == 'paused' else 'Skriver ut' }}"
    assert old in x['content']
    x['content']=x['content'].replace(old,"{{ {'printing': 'Skriver ut', 'paused': 'Pausad', 'attention': 'Åtgärd krävs', 'error': 'Fel – kontrollera skrivaren'}.get(printer, 'Inväntar status') }}")
    x['content']=x['content'].replace("{% elif finish is not none", "{% elif printer in ['attention', 'error'] %}Kontrollera skrivaren{% elif finish is not none")
    assert x['visibility']==[{'condition':'state','entity':entity,'state':['printing','paused']}]
    x['visibility'][0]['state']+=attention
   assert '{{' not in render(css)
   for state,expected in [(run,normal),(pause,'#FFC107')]+[(s,'#FF9800') for s in attention]:
    result=render(css.replace(f"states('{entity}')",repr(state)))
    assert 'color: '+expected+';' in result
    assert ('animation: printer-soft-pulse 3s ease-in-out infinite;' if state==run else 'animation: none;') in result
    if printer:
     content=render(x['content'].replace(f"states('{entity}')",repr(state)))
     if state in attention: assert 'Kontrollera skrivaren' in content and 'min kvar' not in content
   changes.append({'path':path,'original_card':before,'updated_card':copy.deepcopy(x)})
  else:
   for k,v in x.items():walk(v,path+[k])
 elif isinstance(x,list):
  for i,v in enumerate(x):walk(v,path+[i])
walk(config['views'][0],['views',0]);assert len(changes)==3
check=copy.deepcopy(config)
for c in changes:
 p=check
 for key in c['path'][:-1]:p=p[key]
 p[c['path'][-1]]=c['original_card']
assert check==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');backup=folder/('original-'+stamp+'.json');backup.write_text(json.dumps(original,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'backup':str(backup),'changes':changes},ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent edit; stopped'
call('lovelace/config/save',url_path=None,config=config);assert call('lovelace/config',url_path=None)==config
print('Saved and read back: three activity cards updated. Layout and other cards unchanged.')
print('HA template checks passed for run, pause and attention; printer error also verified. No device states changed.')
print('Backup:',backup);w.close()
