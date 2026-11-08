import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-uv-top')
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
card=next(c for s in config['views'][0]['sections'] for c in s.get('cards',[]) if c['type']=='custom:weather-forecast-card')
style=card['card_mod']['style']
assert '/* Reuse the subheading line' in style
style=style[:style.index('/* Reuse the subheading line')]
style+="""
/* UV values occupy the top of the card, not the subheading line. */
.wfc-current-weather { position:relative !important; }
wfc-current-weather-attributes { display:contents !important; }
.wfc-current-attributes {
 position:absolute !important; top:0 !important; bottom:auto !important;
 left:0 !important; right:0 !important; width:auto !important;
 margin:0 !important; gap:4px 12px !important;
}
.wfc-current-conditions { padding-top:24px !important; box-sizing:border-box; }
@container wfc-container (min-width:900px) {
 .wfc-current-conditions { padding-top:0 !important; }
 .wfc-current-attributes { left:30% !important; right:18% !important; flex-wrap:nowrap !important; }
 .wfc-forecast-chart { height:160px !important; }
}
"""
card['card_mod']['style']=style
headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'}
req=urllib.request.Request('http://supervisor/core/api/template',headers=headers,data=json.dumps({'template':style}).encode())
output=urllib.request.urlopen(req).read().decode();assert 'TemplateError' not in output
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,2,'lovelace/config',url_path='lovelace')==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.background-map-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,3,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config;w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Verified UV top alignment saved; only weather styling changed.')
