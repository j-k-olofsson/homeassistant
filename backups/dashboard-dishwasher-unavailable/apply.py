import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/config/backups/dashboard-dishwasher-unavailable')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
entity='sensor.siemens_016050395510002818_bsh_common_status_operationstate'
found=[(si,ci,c) for si,s in enumerate(config['views'][0]['sections']) for ci,c in enumerate(s.get('cards',[])) if entity in c.get('entity_id',[])];assert len(found)==1
si,ci,c=found[0];before=copy.deepcopy(c)
original_content=c['content']
c['content']="{% if states('"+entity+"') in ['unknown', 'unavailable'] %}\n<ha-icon icon=\"mdi:dishwasher-alert\"></ha-icon> **Diskmaskin · Kontakt saknas**\n\nProgramstatus och återstående tid kan inte hämtas.\n{% else %}\n"+original_content+"\n{% endif %}"
for v in c['visibility']:
 if v.get('entity')==entity:
  v['state']+=['unknown','unavailable']
style=c['card_mod']['style']['ha-markdown$']
style=style.replace("['BSH.Common.EnumType.OperationState.ActionRequired']", "['BSH.Common.EnumType.OperationState.ActionRequired', 'unknown', 'unavailable']")
c['card_mod']['style']['ha-markdown$']=style
c['tap_action']={'action':'more-info','entity':entity}
req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':c['content']}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
out=urllib.request.urlopen(req).read().decode();assert 'Kontakt saknas' in out and 'Förlopp saknas' not in out;print(out)
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'][ci]=before;assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'path':['views',0,'sections',si,'cards',ci],'original_card':before,'updated_card':c},ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('Dishwasher visibility and unavailable display saved and verified on fresh connection and disk.')
