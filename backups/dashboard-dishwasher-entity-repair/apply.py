import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/config/backups/dashboard-dishwasher-entity-repair')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
entity='sensor.siemens_016050395510002818_bsh_common_status_operationstate'
found=[(si,ci,c) for si,s in enumerate(config['views'][0]['sections']) for ci,c in enumerate(s.get('cards',[])) if entity in c.get('entity_id',[])];assert len(found)==1
si,ci,c=found[0];before=copy.deepcopy(c)
progress='sensor.siemens_016050395510002818_bsh_common_option_programprogress'
finish='sensor.siemens_016050395510002818_bsh_common_option_remainingprogramtime'
prefix="""{% set machine_entities = device_entities(device_id('sensor.siemens_016050395510002818_bsh_common_status_operationstate')) %}
{% set progress_entity = machine_entities | select('match', 'sensor\\..*_bsh_common_option_programprogress$') | first | default(none) %}
{% set finish_entity = machine_entities | select('match', 'sensor\\..*_bsh_common_option_remainingprogramtime$') | first | default(none) %}
"""
def fix(text):
 return prefix+text.replace("states('"+progress+"')", "(states(progress_entity) if progress_entity else 'unknown')").replace("states('"+finish+"')", "(states(finish_entity) if finish_entity else 'unknown')")
c['content']=fix(c['content'])
c['card_mod']['style']['.']=fix(c['card_mod']['style']['.'])
# Let HA's template dependency tracker follow the discovered entities, including registry changes.
c.pop('entity_id',None)
assert progress not in json.dumps(c) and finish not in json.dumps(c)
for template in [c['content'],c['card_mod']['style']['.']]:
 req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':template}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 out=urllib.request.urlopen(req).read().decode();assert '{{' not in out
print('Dynamic device lookup rendered correctly with missing optional sensors.')
assert progress not in json.dumps(config) and finish not in json.dumps(config)
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'][ci]=before;assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'path':['views',0,'sections',si,'cards',ci],'original_card':before,'updated_card':c},ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('Removed dangling dishwasher references; latest saved dashboard verified via fresh connection and disk.')
