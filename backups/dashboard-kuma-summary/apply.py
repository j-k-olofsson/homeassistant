import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/config/backups/dashboard-kuma-summary')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
def call(w,i,kind,**args):
 w.send(json.dumps(dict(id=i,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==i:
   assert r['success'],r
   return r.get('result')

card=json.loads((folder/'card.json').read_text())
def render(template):
 req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':template}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 return urllib.request.urlopen(req).read().decode().strip()
result=render(card['content']);assert '5 nere' in result and '53/58 uppe' in result;print(result)
css=render(card['card_mod']['style']['ha-markdown$']);assert 'kuma-alert 3s ease-in-out infinite' in css
for state,expected in [('up','Allt uppe'),('maintenance','Underhåll'),('pending','Kontroll pågår'),('unavailable','Status saknas')]:
 synthetic=card['content'].replace('states(id)',"'"+state+"'")
 assert expected in render(synthetic)
 print('Template verified:',state)
w=connect();original=call(w,1,'lovelace/config',url_path='lovelace');config=copy.deepcopy(original)
found=[(i,s) for i,s in enumerate(config['views'][0]['sections']) if any('sensor.prusaxl' in c.get('entity_id',[]) for c in s.get('cards',[]))];assert len(found)==1
si,section=found[0];section['cards'].append(card)
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'].pop();assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2))
assert call(w,2,'lovelace/config',url_path='lovelace')==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.kuma-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
call(w,3,'lovelace/config/save',url_path='lovelace',config=config);w.close()
w=connect();assert call(w,1,'lovelace/config',url_path='lovelace')==config;w.close()
assert json.loads(p.read_text())['data']['config']==config
print('Saved one new Kuma card in activity section, verified via new connection and disk.')
