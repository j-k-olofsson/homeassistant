import sys,asyncio,json
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
O=ROOT/'backups/marketplace_trials_20261107'
async def main():
 async with HA() as h:
  f=json.loads((O/'bermuda_device_form.json').read_text());opts=f['data_schema'][0]['selector']['select']['options'];chosen=['A4:C1:38:B9:99:BA','A4:C1:38:BF:E8:1B'];assert all(any(x['value']==c for x in opts) for c in chosen)
  async with h.s.post('http://127.0.0.1:80/api/config/config_entries/options/flow/'+f['flow_id'],headers={'Authorization':'Bearer '+h.token},json={'configured_devices':chosen}) as r:d=await r.json();assert r.status==200 and not d.get('errors'),(r.status,d)
  (O/'bermuda_selection_result.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));print('Bermuda selection',d['type'])
asyncio.run(main())
