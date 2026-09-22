import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/config/backups/dashboard-presence-icon')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
found=[(si,ci,c) for si,s in enumerate(config['views'][0]['sections']) for ci,c in enumerate(s.get('cards',[])) if c.get('entity')=='input_boolean.narvarosimulering_aktiv'];assert len(found)==1
si,ci,c=found[0];before=copy.deepcopy(c)
c['card_mod']={'style':{'ha-tile-icon$': """
{% set active = is_state('input_boolean.narvarosimulering_aktiv', 'on') %}
.container ::slotted([slot="icon"]), .container ha-icon, .container ha-svg-icon { opacity: 0 !important; }
.container.background::before { opacity: 0 !important; }
.container::after {
 content: ""; position: absolute; inset: 0; pointer-events: none;
 background: center / 36px 36px no-repeat url('/local/dashboard-icons/presence-{{ 'on' if active else 'off' }}-v1.svg');
}
"""}}
for state in ['on','off']:
 path='/local/dashboard-icons/presence-'+state+'-v1.svg'
 assert urllib.request.urlopen('http://homeassistant:80'+path).read()==Path('/config/www/dashboard-icons/presence-'+state+'-v1.svg').read_bytes()
css=c['card_mod']['style']['ha-tile-icon$']
req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':css}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
rendered=urllib.request.urlopen(req).read().decode();assert '{{' not in rendered
print('SVG files served correctly; live CSS template rendered.')
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'][ci]=before;assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'path':['views',0,'sections',si,'cards',ci],'original_card':before,'updated_card':c},ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('Presence icon change verified across connection and disk. Size and actions unchanged.')
