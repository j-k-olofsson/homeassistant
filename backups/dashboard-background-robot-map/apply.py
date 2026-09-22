import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-background-robot-map')
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
matches=[(s,i) for s in view['sections'] for i,c in enumerate(s.get('cards',[])) if c.get('entity')=='climate.sef_42h_climate' and c.get('name')=='Bilvärme']
assert len(matches)==1
section,index=matches[0]
assert not any(c.get('entity')=='select.max_vald_karta' for s in view['sections'] for c in s.get('cards',[]))
style=next(c['card_mod'] for c in section['cards'] if c.get('name')=='Gästläge')
button={'type':'button','entity':'select.max_vald_karta','name':'Robotkarta','icon':'mdi:robot-vacuum','show_name':True,'show_icon':True,'show_state':True,'icon_height':'32px','grid_options':{'columns':3,'rows':'auto'},'tap_action':{'action':'perform-action','perform_action':'select.select_next','target':{'entity_id':'select.max_vald_karta'},'data':{'cycle':True}},'hold_action':{'action':'more-info'},'card_mod':copy.deepcopy(style)}
section['cards'].insert(index+1,button)
url='/local/backgrounds/nordic-night-balanced-v2.png'
assert isinstance(view['background'],dict)
view['background']['image']=url
view['background']['opacity']=100
req=urllib.request.Request('http://supervisor/core/api/states/select.max_vald_karta',headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']})
state=json.load(urllib.request.urlopen(req));options=state['attributes']['options'];assert options==['Hela huset','Verandan'];assert state['state'] in options
assert options[(options.index('Hela huset')+1)%len(options)]=='Verandan'
assert options[(options.index('Verandan')+1)%len(options)]=='Hela huset'
assert urllib.request.urlopen('http://homeassistant:80'+url).read()==Path('/homeassistant/www/backgrounds/nordic-night-balanced-v2.png').read_bytes()
check=copy.deepcopy(config);check['views'][0]['background']=original['views'][0]['background']
for s in check['views'][0]['sections']:
 s['cards']=[c for c in s.get('cards',[]) if c.get('entity')!='select.max_vald_karta']
assert check==original
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,2,'lovelace/config',url_path='lovelace')==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.background-map-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,3,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config;w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Saved and verified: new background, Robotkarta immediately after Bilvärme. Current map:',state['state'])
