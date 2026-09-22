import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-four-refinements')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
changed=[]
for si,section in enumerate(config['views'][0]['sections']):
 for ci,c in enumerate(section['cards']):
  before=copy.deepcopy(c)
  if c['type']=='custom:weather-forecast-card':
   for attr in c['current']['show_attributes']:
    if attr.get('entity')=='sensor.openuv_aktuell_uv_niva':attr['entity']='sensor.openuv_aktuellt_uv_index'
   # A deliberate long press opens the cloud level; ordinary tap stays on weather.
   pass
  elif c['type']=='markdown' and 'Prusa XL' in c.get('content',''):
   t=c['content'];pos=t.index('{% if is_number(progress) %}')
   c['content']=t[:pos]+"{% if printer in ['attention','error'] %}Åtgärda meddelandet på skrivarens skärm.{% else %}"+t[pos:]+"{% endif %}"
   c['card_mod']['style']['.']=c['card_mod']['style']['.'].replace('{% set valid = is_number(value)',"{% set valid = state in ['printing','paused'] and is_number(value)")
  elif c['type']=='custom:apexcharts-card':
   c['card_mod']['style']+="""
{% set tomorrow = (now() + timedelta(days=1)).date() %}
{% set data = namespace(count=0) %}
{% for item in state_attr('sensor.nordpool','raw_tomorrow') or [] %}
{% set start = as_datetime(item.get('start'), none) %}
{% if start is not none and as_local(start).date() == tomorrow and is_number(item.get('value')) %}{% set data.count = data.count + 1 %}{% endif %}
{% endfor %}
ha-card { position:relative; }
ha-card::after {
 content:'Morgondagens priser inväntas';
 display:{{ 'block' if data.count == 0 else 'none' }};
 position:absolute; left:55%; right:3%; top:48%;
 text-align:center; font-size:12px; line-height:1.4;
 color:var(--secondary-text-color); pointer-events:none;
}
"""
   c['series'][0]['data_generator']="return [...(entity.attributes.raw_today || []), ...(entity.attributes.raw_tomorrow || [])].filter(p => p.value != null && Number.isFinite(Number(p.value)) && Number.isFinite(new Date(p.start).getTime())).map(p => [new Date(p.start).getTime(), Number(p.value)]);"
  if c!=before:changed.append((si,ci))
assert len(changed)==3
# Do not alter the service warnings without evidence they are intentional.
# Test templates, including printer attention with a reported 0 percent.
for si,ci in changed:
 c=config['views'][0]['sections'][si]['cards'][ci]
 templates=[]
 if c['type']=='markdown':
  templates=[c['content'].replace("states('sensor.prusaxl')","'attention'").replace("states('sensor.prusaxl_status')","'0'"),c['card_mod']['style']['.']]
 elif c['type']=='custom:apexcharts-card':templates=[c['card_mod']['style']]
 for template in templates:
  req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':template}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
  out=urllib.request.urlopen(req).read().decode();assert '{{' not in out
  if c['type']=='markdown' and template==templates[0]:assert '0 %' not in out and 'skrivarens skärm' in out
check=copy.deepcopy(config)
for si,ci in changed:check['views'][0]['sections'][si]['cards'][ci]=original['views'][0]['sections'][si]['cards'][ci]
assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('Printer, price missing-data label and numeric cloud UV saved and verified. Monitoring warnings retained pending classification.')
