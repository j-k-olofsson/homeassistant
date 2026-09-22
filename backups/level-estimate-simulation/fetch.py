import os,json,datetime,websocket
from pathlib import Path
ids=['sensor.gasol_utomhus_esphome73_lpg_level','sensor.esphome90_esphome90_salt_level','sensor.vattenniva_honshuset_esphome74_water_level']
w=websocket.create_connection('ws://supervisor/core/websocket',timeout=40);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok'
now=datetime.datetime.now(datetime.timezone.utc)
w.send(json.dumps({'id':1,'type':'recorder/statistics_during_period','start_time':(now-datetime.timedelta(days=60)).isoformat(),'end_time':now.isoformat(),'statistic_ids':ids,'period':'hour','types':['mean','min','max']}))
r=json.loads(w.recv());Path('/config/backups/level-estimate-simulation/statistics.json').write_text(json.dumps(r));print('success',r.get('success'),r.get('error'));print({k:len(v) for k,v in r.get('result',{}).items()});w.close()
