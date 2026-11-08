import sys,asyncio,json
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
OUT=ROOT/'backups/waste_migration_20261107'
async def main():
 async with HA() as h:
  f=json.loads((OUT/'flow.json').read_text());payload=json.loads(sys.argv[1])
  async with h.s.post('http://127.0.0.1:80/api/config/config_entries/flow/'+f['flow_id'],headers={'Authorization':'Bearer '+h.token},json=payload) as r:
   d=await r.json();assert r.status==200,(r.status,d)
  (OUT/'flow.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));(OUT/('flow_'+d.get('step_id',d['type'])+'.json')).write_text(json.dumps(d,ensure_ascii=False,indent=2));print(json.dumps(d,ensure_ascii=False)[:6500]);assert not d.get('errors'),d
asyncio.run(main())
