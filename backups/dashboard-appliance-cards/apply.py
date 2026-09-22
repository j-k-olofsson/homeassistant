import copy,datetime,json,os,urllib.request
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-appliance-cards')
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
original=call('lovelace/config',url_path=None);config=copy.deepcopy(original)
sections=config['views'][0]['sections']
matches=[s for s in sections if any(c.get('type')=='markdown' and 'Prusa XL' in c.get('content','') for c in s.get('cards',[]))];assert len(matches)==1
section=matches[0]
printer=next(c for c in section['cards'] if c.get('type')=='markdown' and 'Prusa XL' in c.get('content',''))
style=printer['card_mod']['style']['ha-markdown$']
prefix='BSH.Common.EnumType.OperationState.'
dish='sensor.siemens_016050395510002818_'
specs=[('Tvätt/tork','mdi:washing-machine','sensor.siemens_tvatt_tork_driftsstatus','sensor.siemens_tvatt_tork_aktuell_programstatus','sensor.siemens_tvatt_tork_aterstaende_programtid'),('Diskmaskin','mdi:dishwasher',dish+'bsh_common_status_operationstate',dish+'bsh_common_option_programprogress',dish+'bsh_common_option_remainingprogramtime')]
added=[]
for name,icon,status,progress,finish in specs:
 assert not any(c.get('type')=='markdown' and ('**'+name+' ·') in c.get('content','') for c in section['cards'])
 content="""{% set operation = states('STATUS').split('.')[-1] %}
{% set progress = states('PROGRESS') %}
{% set finish = as_timestamp(states('FINISH'), none) %}
<ha-icon icon="ICON"></ha-icon> **NAME · {{ {'Run': 'Kör program', 'Pause': 'Pausad', 'ActionRequired': 'Åtgärd krävs'}.get(operation, 'Inväntar status') }}**

{% if is_number(progress) %}**{{ progress | float | round(0) | int }} %** klart{% else %}Förlopp saknas{% endif %} · {% if operation == 'Pause' %}Tid uppdateras när programmet fortsätter{% elif operation == 'ActionRequired' %}Kontrollera maskinen{% elif finish is not none and finish > as_timestamp(now()) %}{% set minutes = ((finish - as_timestamp(now())) / 60) | round(0, 'ceil') | int %}Cirka {% if minutes >= 60 %}{{ minutes // 60 }} h {% endif %}{{ minutes % 60 }} min kvar{% else %}Inväntar tidsprognos{% endif %}
"""
 for key,value in [('STATUS',status),('PROGRESS',progress),('FINISH',finish),('ICON',icon),('NAME',name)]:content=content.replace(key,value)
 css=style.replace("is_state('sensor.prusaxl', 'printing')",f"is_state('{status}', '{prefix}Run')")
 card={'type':'markdown','content':content,'entity_id':[status,progress,finish],'visibility':[{'condition':'state','entity':status,'state':[prefix+x for x in ['Run','Pause','ActionRequired']]}],'grid_options':{'columns':12,'rows':'auto'},'card_mod':{'style':{'ha-markdown$':css}}}
 assert '{{' not in render(content) and 'animation: none;' in render(css)
 # Render active and paused samples without changing real appliance states.
 for op,expected in [('Run','min kvar'),('Pause','Tid uppdateras'),('ActionRequired','Kontrollera maskinen')]:
  sample=content.replace(f"states('{status}')",repr(prefix+op)).replace(f"states('{progress}')","'42'").replace(f"states('{finish}')","(now() + timedelta(minutes=85)).isoformat()")
  out=render(sample);assert '42 %' in out and expected in out,(name,op,out)
 section['cards'].append(card);added.append(card)
check=copy.deepcopy(config);check['views'][0]['sections'][sections.index(section)]['cards']=check['views'][0]['sections'][sections.index(section)]['cards'][:-2];assert check==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');backup=folder/('original-'+stamp+'.json');backup.write_text(json.dumps(original,ensure_ascii=False,indent=2))
(folder/'change.json').write_text(json.dumps({'backup':str(backup),'section_index':sections.index(section),'added_cards':added},ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent edit; stop'
call('lovelace/config/save',url_path=None,config=config);assert call('lovelace/config',url_path=None)==config
print('Saved and verified two appliance cards. Existing layout and printer preserved.')
print('Live inactive and simulated run/pause/action-required templates rendered successfully in HA. No appliance states changed.')
print('Backup:',backup);w.close()
