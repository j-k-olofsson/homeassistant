import json,os,websocket
from pathlib import Path
w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok'
ids=['sensor.sovrummet_openwrt_one_router_sovrum_wan_'+d+'_rate' for d in ['rx','tx']]
registry=json.load(open('/config/.storage/core.entity_registry'))['data']['entities']
Path('/config/backups/dashboard-internet/entities-before.json').write_text(json.dumps([e for e in registry if e['entity_id'] in ids],indent=2))
for i,entity in enumerate(ids,1):
 w.send(json.dumps({'id':i,'type':'config/entity_registry/update','entity_id':entity,'disabled_by':None}));r=json.loads(w.recv());assert r['success'];print('Enabled',entity)
w.close()
