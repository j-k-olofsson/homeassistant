import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-five-usability')
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
view=config['views'][0]
weather=next(c for s in view['sections'] for c in s.get('cards',[]) if c['type']=='custom:weather-forecast-card')
weather['current']['show_attributes'][2]['label']='Prognosmax'
weather['card_mod']['style']+='''
/* Reuse the subheading line for UV on tablet/desktop; narrow screens keep wrapping. */
@container wfc-container (min-width:700px) {
 .wfc-current-weather { position:relative; }
 wfc-current-weather-attributes { position:absolute; left:120px; right:120px; bottom:2px; }
 .wfc-current-attributes { flex-wrap:nowrap !important; gap:4px 12px !important; }
 .wfc-forecast-chart { height:160px !important; }
}
'''
chart=next(c for s in view['sections'] for c in s.get('cards',[]) if c['type']=='custom:apexcharts-card')
fn='EVAL:'+Path('/homeassistant/backups/dashboard-five-usability/day-labels.js').read_text().strip()
events=chart.setdefault('apex_config',{}).setdefault('chart',{}).setdefault('events',{})
assert not events
events.update(mounted=fn,updated=fn)
# Keep appliance data, visibility, icon motion and progress bars; change only text layout.
for s in view['sections']:
 for c in s.get('cards',[]):
  if c.get('type')!='markdown' or not any(k in c.get('content','') for k in ['mdi:printer-3d-nozzle','mdi:washing-machine','mdi:dishwasher']):continue
  import re
  content=c['content']
  for name in ['Prusa XL','Tvätt/tork','Diskmaskin']:
   content=re.sub(r'(<ha-icon[^>]+></ha-icon>) \*\*'+re.escape(name)+r' · (.*?)\*\*',lambda m:m[1]+' **'+name+'**<br><span class="activity-status">'+m[2]+'</span>',content)
  content=content.replace('%** klart{% else %}Förlopp saknas{% endif %} · ','%** klart{% else %}Förlopp saknas{% endif %}<br>')
  c['content']=content
  c['card_mod']['style']['ha-markdown$']+='''
 p { margin:0; font-size:12px; line-height:1.4; }
 p + p { margin-top:5px; }
 .activity-status { font-size:12px; font-weight:500; }
'''
  if 'sensor.prusaxl' in content:c['tap_action']={'action':'more-info','entity':'sensor.prusaxl'}
  if 'sensor.siemens_tvatt_tork_driftsstatus' in content:c['tap_action']={'action':'more-info','entity':'sensor.siemens_tvatt_tork_driftsstatus'}
# Uniform direct controls with state-confirmed feedback and hold-for-details.
kinds={'input_boolean.guest_mode':'toggle','input_boolean.narvarosimulering_aktiv':'presence','light.esphome93_esphome93_led':'led','switch.billaddare':'charging','climate.sef_42h_climate':'climate','select.max_vald_karta':'map'}
icons={'toggle':'mdi:bed','presence':'mdi:home-lightbulb-outline','led':'mdi:led-strip-variant','charging':'mdi:battery-charging','climate':'mdi:fan','map':'mdi:robot-vacuum'}
changed=[]
for s in view['sections']:
 for i,c in enumerate(s.get('cards',[])):
  entity=c.get('entity')
  if entity in kinds:
   kind=kinds[entity];s['cards'][i]={'type':'custom:feedback-control-card','entity':entity,'name':c.get('name','Robotkarta'),'kind':kind,'icon':icons[kind],'grid_options':c['grid_options']};changed.append(entity)
  elif entity in ['switch.poolpump_utomhus_esphome27_relay_state','cover.esphome93_esphome93_markis']:
   c['tap_action']={'action':'more-info'};c['hold_action']={'action':'more-info'}
   c['card_mod']['style']+='''
 ha-card { position:relative; }
 ha-card::after { content:'ⓘ'; position:absolute; top:5px; right:6px; font-size:11px; color:var(--secondary-text-color); pointer-events:none; }
'''
assert set(changed)==set(kinds)
# User explicitly withdrew the Kiwi split; its entire card must remain unchanged.
def kuma(conf):return next(c for s in conf['views'][0]['sections'] for c in s.get('cards',[]) if 'sensor.kiwi_status' in c.get('content',''))
assert kuma(config)==kuma(original)
# Render all changed Jinja templates against live HA before saving.
headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'}
def validate(value):
 if isinstance(value,dict):
  for v in value.values():validate(v)
 elif isinstance(value,list):
  for v in value:validate(v)
 elif isinstance(value,str) and ('{%' in value or '{{' in value):
  req=urllib.request.Request('http://supervisor/core/api/template',headers=headers,data=json.dumps({'template':value}).encode())
  output=urllib.request.urlopen(req).read().decode();assert 'TemplateError' not in output
for si in [0,1,3]:validate(config['views'][0]['sections'][si])
for c in config['views'][0]['sections'][5]['cards'][:3]:validate(c)
url='/local/feedback-control-card/feedback-control-card-v1.js'
assert urllib.request.urlopen('http://homeassistant:80'+url).read()==Path('/homeassistant/www/feedback-control-card/feedback-control-card-v1.js').read_bytes()
resources=call(w,2,'lovelace/resources');(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
if not any(r['url']==url for r in resources):call(w,3,'lovelace/resources/create',res_type='module',url=url)
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,4,'lovelace/config',url_path='lovelace')==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.usability-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,5,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config;w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Saved and verified: UV header/chart space, activity layout, feedback controls + robot lock, day markers. Kuma unchanged.')
