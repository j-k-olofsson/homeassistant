import copy,json,os,datetime,urllib.request,websocket,quickjs
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-unified-surfaces')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
def call(w,i,kind,**args):
 w.send(json.dumps(dict(id=i,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==i:
   assert r['success'],r
   return r.get('result')

urls=json.loads((folder/'urls.json').read_text())
for url in urls:
 js=Path('/homeassistant/www/'+url.removeprefix('/local/')).read_text()
 ctx=quickjs.Context();ctx.eval('class HTMLElement {}; const customElements={get:()=>false,define:()=>{}};');ctx.eval(js)
 assert urllib.request.urlopen('http://homeassistant:80'+url).read().decode()==js
w=connect();original=call(w,1,'lovelace/config',url_path='lovelace');config=copy.deepcopy(original)
common="ha-card { background: linear-gradient(145deg,#263a49,#1b2937) !important; border:1px solid rgba(158,185,203,.20) !important; border-radius:12px !important; --primary-text-color:#eef4f8; --secondary-text-color:#bdcbd5; }"
buttons=" :host { height:100%; } ha-card { height:100% !important; min-height:118px; box-sizing:border-box; } .name { font-size:12px !important; font-weight:500 !important; line-height:1.3 !important; } .state { font-size:11px !important; } "
def append(card,css):
 mod=card.setdefault('card_mod',{});style=mod.get('style','')
 if isinstance(style,str):mod['style']=style+'\n'+css
 else:style['.']=style.get('.','')+'\n'+css
for section in config['views'][0]['sections']:
 for c in section['cards']:
  typ=c['type']
  if typ in ['button','tile']:
   append(c,common+buttons);c['grid_options']['rows']='auto'
   if typ=='tile':
    styles=c['card_mod']['style'];assert isinstance(styles,dict)
    styles['ha-tile-info$']=styles.get('ha-tile-info$','')+' .primary {font-size:12px !important;font-weight:500 !important;} .secondary {font-size:11px !important;}'
    styles['.']+=' ha-tile-info { --ha-tile-info-primary-font-size:12px; --ha-tile-info-secondary-font-size:11px; }'
  elif typ in ['markdown','custom:apexcharts-card']:append(c,common)
  elif typ=='custom:auto-entities' and 'mass_player_type' in c.get('filter',{}).get('template',''):
   t=c['filter']['template'];anchor='ha-card { --mini-media-player-accent-color: #64b5c6; }';assert anchor in t
   c['filter']['template']=t.replace(anchor,anchor+' '+common)
# Validate server-side templates including the music card's generated configuration.
for section in config['views'][0]['sections']:
 for c in section['cards']:
  t=c.get('filter',{}).get('template')
  if t:
   req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':t}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
   out=urllib.request.urlopen(req).read().decode();assert '{{' not in out
resources=call(w,2,'lovelace/resources');(folder/'resources-before.json').write_text(json.dumps(resources,indent=2))
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,3,'lovelace/config',url_path='lovelace')==original
for i,url in enumerate(urls,4):
 directory=url.rsplit('/',1)[0]+'/'
 matches=[r for r in resources if r['url'].startswith(directory)];assert len(matches)==1
 call(w,i,'lovelace/resources/update',resource_id=matches[0]['id'],url=url,res_type='module')
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.surfaces-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,7,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config
current=call(w,2,'lovelace/resources');assert all(any(r['url']==url for r in current) for url in urls);w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Unified surfaces, 118px minimum control height and smaller labels saved. Templates, JS and resources verified.')
