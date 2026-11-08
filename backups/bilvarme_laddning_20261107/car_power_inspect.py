import sys,asyncio,json
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
O=ROOT/'backups/bilvarme_laddning_20261107';O.mkdir(exist_ok=True,mode=0o700)
async def main():
 async with HA() as h:
  d={k:await h.call(t) for k,t in [('states','get_states'),('entities','config/entity_registry/list'),('entries','config_entries/get'),('repairs','repairs/list_issues')]};(O/'before.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
  for s in d['states']:
   if s['entity_id'] in ['switch.billaddare','climate.sef_42h_climate','sensor.sef_42h_charging_status','calendar.billaddning'] or s['entity_id'].startswith('binary_sensor.sef_42h'):print(json.dumps(s,ensure_ascii=False)[:1200])
  print('charger_entities',[(e['entity_id'],e.get('disabled_by')) for e in d['entities'] if e.get('device_id')=='4b1b09643004d61b8bd8e96326f68b79'])
  print('schedules',await h.call('scheduler'))
asyncio.run(main())
