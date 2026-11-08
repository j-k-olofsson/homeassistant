import asyncio,json,os
from pathlib import Path
import aiohttp
ns={};exec(Path('/config/whisper-migration-20261001/ha-api.py').read_text().split('async def main():')[0],ns)
entries=json.loads(Path('/config/.storage/core.config_entries').read_text())['data']['entries'];e=next(e for e in entries if e['domain']=='openwrt_wifi_clients')
valid={e['data']['host'] for e in entries if e['domain']=='openwrt'}
async def main():
 async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=90)) as s:
  token=await ns['authenticate'](s)
  async def post(path,data):
   async with s.post('http://127.0.0.1:80/api/config/config_entries/options/flow'+path,json=data,headers={'Authorization':'Bearer '+token}) as r:
    result=await r.json();assert r.status==200,(r.status,result);return result
  r=await post('',{'handler':e['entry_id']});flow=r['flow_id']
  async def advance(data):
   r=await post('/'+flow,data);assert not r.get('errors'),r.get('errors');return r
  await advance({'next_step_id':'manage_aps'})
  for i,ap in enumerate(e['options']['aps']):
   if ap['host'] not in valid:continue
   await advance({'action':'edit'});await advance({'ap_index':str(i)})
   data={k:v for k,v in ap.items() if k!='add_another'};data.update(username='homeassistant',password=os.environ['OPENWRT_HA_PASSWORD'],interfaces=','.join(ap.get('interfaces',[])))
   r=await advance(data);assert r['step_id']=='manage_aps'
   print(ap['host'],'Wi-Fi Clients credentials validated',flush=True)
  r=await advance({'action':'done'});assert r['type']=='create_entry'
  print('Wi-Fi Clients options saved; non-OpenWrt device unchanged',flush=True)
asyncio.run(main())
