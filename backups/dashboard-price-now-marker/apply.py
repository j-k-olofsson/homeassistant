import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/config/backups/dashboard-price-now-marker')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
found=[(si,ci,c) for si,s in enumerate(config['views'][0]['sections']) for ci,c in enumerate(s.get('cards',[])) if c.get('type')=='custom:apexcharts-card' and any(x.get('entity')=='sensor.nordpool' for x in c.get('series',[]))];assert len(found)==1
si,ci,c=found[0];before=copy.deepcopy(c)
assert not c.get('apex_config',{}).get('annotations'), 'Additional annotations require narrower selector'
c['now']['label']='Nu'
c['card_mod']['style']+="""
/* Only the existing current-time annotation is present on this chart. */
.apexcharts-xaxis-annotations line {
 stroke: #a4e3ef !important;
 stroke-width: 2px !important;
 stroke-dasharray: 5 5 !important;
 animation: {{ 'price-now-travel 1.5s linear infinite' if is_number(states('sensor.nordpool')) else 'none' }};
}
@keyframes price-now-travel { from { stroke-dashoffset: 10; } to { stroke-dashoffset: 0; } }
@media(prefers-reduced-motion:reduce) {
 .apexcharts-xaxis-annotations line { animation: none; }
}
"""
req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':c['card_mod']['style']}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
out=urllib.request.urlopen(req).read().decode();assert 'animation: price-now-travel 1.5s linear infinite;' in out
check_card=copy.deepcopy(c);check_card['now']=before['now'];check_card['card_mod']=before['card_mod'];assert check_card==before
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'][ci]=before;assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'path':['views',0,'sections',si,'cards',ci],'original_card':before,'updated_card':c},ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('Current-time annotation styling and Swedish label saved; data and layout preserved; fresh connection and disk verified.')
