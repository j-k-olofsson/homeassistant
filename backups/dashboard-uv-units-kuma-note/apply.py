import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-uv-units-kuma-note')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
changes=[]
for si,sec in enumerate(config['views'][0]['sections']):
 for ci,c in enumerate(sec['cards']):
  before=copy.deepcopy(c)
  if c['type']=='custom:weather-forecast-card':
   attrs=c['current']['show_attributes'];assert len(attrs)==3
   for i,attr in enumerate(attrs,1):
    e=attr['entity']
    value="{{ ('%.1f' | format(states('"+e+"') | float)) | replace('.', ',') if is_number(states('"+e+"')) else '—' }} UVI"
    c['card_mod']['style']+="\n.wfc-current-attribute:nth-child("+str(i)+") .wfc-current-attribute-value { font-size:0 !important; }\n.wfc-current-attribute:nth-child("+str(i)+") .wfc-current-attribute-value::after { font-size:12px; content: '"+value+"'; }\n"
   req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':c['card_mod']['style']}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
   rendered=urllib.request.urlopen(req).read().decode();assert '{{' not in rendered and rendered.count(' UVI')==3
  elif c['type']=='markdown' and 'Tjänster' in c.get('content',''):
   old='</ul>\n<a href="/config/integrations/integration/uptime_kuma">'
   assert old in c['content']
   note="""</ul>
{% if 'Kiwi' in names or 'gw_kiwi' in names or 'ap_kiwi' in names or 'ha_kiwi' in names %}
<p>Kiwi: känt åtkomstproblem via Tailscale på HA-servern. Åtgärdas på plats; fjärrtjänsternas faktiska drift kan inte bekräftas.</p>
{% endif %}
<a href="/config/integrations/integration/uptime_kuma">"""
   c['content']=c['content'].replace(old,note)
  if c!=before:changes.append((si,ci))
assert len(changes)==2
check=copy.deepcopy(config)
for si,ci in changes:check['views'][0]['sections'][si]['cards'][ci]=original['views'][0]['sections'][si]['cards'][ci]
assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('UV display uses UVI with one decimal; known Kiwi access issue annotated without suppressing alerts. Saved and verified.')
