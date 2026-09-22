import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/config/backups/dashboard-uv-max')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
found=[(si,ci,c) for si,s in enumerate(config['views'][0]['sections']) for ci,c in enumerate(s.get('cards',[])) if c.get('type')=='custom:gauge-card-pro' and c.get('entity')=='sensor.esphome98_esphome98_uv_index'];assert len(found)==1
si,ci,c=found[0];before=copy.deepcopy(c)
def number(entity):return "{{ ('%.1f' | format(states('"+entity+"') | float)) | replace('.', ',') if is_number(states('"+entity+"')) else '—' }}"
maxentity='sensor.openuv_max_uv_index'
c['setpoint']={'type':'entity','value':maxentity,'color':'#64b5c6','label':False}
c['animation_speed']='normal'
c['needle_color']='#ffffff';c['inner']['needle_color']='#64b5c6'
c['value_texts']['primary'].update({'value':number(c['entity']),'unit_of_measurement':'Egen','unit_before_value':True,'font_size_reduction':5,'color':'#ffffff'})
c['value_texts']['secondary'].update({'value':number(c['entity2']),'unit_of_measurement':'Moln','unit_before_value':True,'color':'#64b5c6'})
c['titles']={'primary':{'value':'UV','font_size':'12px'},'secondary':{'value':'Max '+number(maxentity),'font_size':'10px','color':'#64b5c6'}}
c['entity_id']=[c['entity'],c['entity2'],maxentity]
c['hold_action']={'action':'more-info','entity':maxentity}
for template in [c['value_texts']['primary']['value'],c['value_texts']['secondary']['value'],c['titles']['secondary']['value']]:
 req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':template}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 out=urllib.request.urlopen(req).read().decode();assert '{{' not in out;print('Rendered:',out)
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'][ci]=before;assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'path':['views',0,'sections',si,'cards',ci],'original_card':before,'updated_card':c},ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('UV-only change verified across connection and disk. Grid footprint unchanged.')
