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
original=call('lovelace/config',url_path=None);config=copy.deepcopy(original)
content="""{% set printer = states('sensor.prusaxl') %}
{% set progress = states('sensor.prusaxl_status') %}
{% set finish = as_timestamp(states('sensor.prusaxl_utskriften_ar_fardig'), none) %}
**Prusa XL · {{ 'Pausad' if printer == 'paused' else 'Skriver ut' }}**

{% if is_number(progress) %}**{{ progress | float | round(0) | int }} %** klart{% else %}Förlopp saknas{% endif %} · {% if printer == 'paused' %}Återstående tid uppdateras när utskriften fortsätter{% elif finish is not none and finish > as_timestamp(now()) %}{% set minutes = ((finish - as_timestamp(now())) / 60) | round(0, 'ceil') | int %}Cirka {% if minutes >= 60 %}{{ minutes // 60 }} h {% endif %}{{ minutes % 60 }} min kvar{% else %}Inväntar ny sluttidsprognos{% endif %}
"""
req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':content}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
rendered=urllib.request.urlopen(req).read().decode();assert '{{' not in rendered and 'Prusa XL' in rendered
card={'type':'markdown','content':content,'entity_id':['sensor.prusaxl','sensor.prusaxl_status','sensor.prusaxl_utskriften_ar_fardig'],'visibility':[{'condition':'state','entity':'sensor.prusaxl','state':['printing','paused']}],'grid_options':{'columns':12,'rows':'auto'}}
section=config['views'][0]['sections'][-1]
assert any(c.get('name')=='Hönsvatten' for c in section['cards'])
assert not any(c.get('type')=='markdown' and 'Prusa XL' in c.get('content','') for c in section['cards'])
path=['views',0,'sections',len(config['views'][0]['sections'])-1,'cards',len(section['cards'])]
section['cards'].append(card)
check=copy.deepcopy(config);check['views'][0]['sections'][-1]['cards'].pop();assert check==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');backup=folder/('original-'+stamp+'.json')
backup.write_text(json.dumps(original,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'backup':str(backup),'path':path,'added_card':card},ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent edit; stopping'
call('lovelace/config/save',url_path=None,config=config);assert call('lovelace/config',url_path=None)==config
print('Saved and verified: one conditional printer card appended. Existing layout preserved.')
print('HA rendered content:',rendered.strip());print('Backup:',backup)
w.close()
