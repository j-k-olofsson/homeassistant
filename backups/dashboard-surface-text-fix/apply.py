import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-surface-text-fix')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
count=0
for section in config['views'][0]['sections']:
 for c in section['cards']:
  if c['type']=='button':
   mod=c.setdefault('card_mod',{});css="ha-card {font-size:12px !important;} ha-card > span:not(.state) {font-size:12px !important;font-weight:500 !important;line-height:1.3 !important;} ha-card > span.state {font-size:11px !important;}"
   style=mod.get('style','')
   if isinstance(style,str):mod['style']=style+'\n'+css
   else:style['.']=style.get('.','')+'\n'+css
   count+=1
  if c['type']=='custom:auto-entities' and 'mass_player_type' in c.get('filter',{}).get('template',''):
   t=c['filter']['template'];anchor='ha-card { --mini-media-player-accent-color: #64b5c6; }';assert anchor in t
   css='ha-card { --mini-media-player-accent-color: #64b5c6; --ha-card-background: linear-gradient(145deg,#263a49,#1b2937); } .mmp__bg { background:linear-gradient(145deg,#263a49,#1b2937) !important; }'
   c['filter']['template']=t.replace(anchor,css)
   req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':c['filter']['template']}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
   out=urllib.request.urlopen(req).read().decode();assert '{{' not in out;print('Media template renders successfully')
assert count==6,count
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('Six button labels and media background layer corrected; saved config verified.')
