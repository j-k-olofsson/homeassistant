import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/config/backups/dashboard-weather-compact-step2')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
found=[(si,ci,c) for si,s in enumerate(config['views'][0]['sections']) for ci,c in enumerate(s.get('cards',[])) if c.get('type')=='custom:weather-forecast-card'];assert len(found)==1
si,ci,c=found[0];before=copy.deepcopy(c)
style=c['card_mod']['style']
changes={
 '--card-padding: 12px !important;':'--card-padding: 8px 12px !important;',
 '--weather-forecast-card-current-conditions-icon-size: 48px !important;':'--weather-forecast-card-current-conditions-icon-size: 40px !important;',
 '--weather-forecast-card-forecast-conditions-icon-size: 30px !important;':'--weather-forecast-card-forecast-conditions-icon-size: 26px !important;',
 '.wfc-container, .wfc-current-weather { gap: 8px !important; }':'.wfc-container, .wfc-current-weather { gap: 4px !important; }',
 '.wfc-forecast-chart { height: 110px !important; }':'.wfc-forecast-chart { height: 96px !important; }'
}
for old,new in changes.items():
 assert old in style, old
 style=style.replace(old,new)
style+='\n.wfc-forecast-slot { gap: 2px !important; }\n'
c['card_mod']['style']=style
unchanged=copy.deepcopy(c);unchanged['card_mod']=before['card_mod'];assert unchanged==before
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'][ci]=before;assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'path':['views',0,'sections',si,'cards',ci],'original_card':before,'updated_card':c},ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('Weather-only styling and labels saved; forecast settings and entities preserved; verified on fresh connection and disk.')
