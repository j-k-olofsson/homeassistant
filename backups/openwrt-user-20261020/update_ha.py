import asyncio,json,os,sys
from pathlib import Path
import aiohttp
ROOT=Path('/config/backups/openwrt-user-20261020')
ns={};exec(Path('/config/whisper-migration-20261001/ha-api.py').read_text().split('async def main():')[0],ns)
entries=json.loads(Path('/config/.storage/core.config_entries').read_text())['data']['entries']
async def main():
 async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=180)) as s:
  token=await ns['authenticate'](s);headers={'Authorization':'Bearer '+token}
  async def req(method,path,data=None):
   async with s.request(method,'http://127.0.0.1:80/api/'+path,json=data,headers=headers) as r:
    result=await r.json() if r.content_type=='application/json' else await r.text();assert r.status<300,(r.status,str(result)[:150]);return result
  async with s.ws_connect('http://127.0.0.1:80/api/websocket') as ws:
   await ws.receive_json();await ws.send_json({'type':'auth','access_token':token});assert (await ws.receive_json())['type']=='auth_ok'
   seq=0
   async def call(kind,**kwargs):
    nonlocal seq
    seq+=1;await ws.send_json({'id':seq,'type':kind,**kwargs})
    while True:
     r=await ws.receive_json()
     if r.get('id')==seq and r['type']=='result':break
    assert r['success'],r.get('error');return r['result']
   # Remove only the unsubmitted user flow opened by the earlier API probe.
   for f in await call('config_entries/flow/progress'):
    if f['handler']=='openwrt' and f['context']['source']=='user':
     await req('DELETE','config/config_entries/flow/'+f['flow_id'])
   for e in entries:
    if e['domain']!='openwrt':continue
    await req('POST','config/config_entries/entry/'+e['entry_id']+'/reload')
    for attempt in range(10):
     flows=await call('config_entries/flow/progress')
     flow=next((f for f in flows if f['handler']=='openwrt' and f['context'].get('entry_id')==e['entry_id'] and f['context']['source']=='reauth'),None)
     if flow:break
     await asyncio.sleep(1)
    assert flow,(e['data']['host'],'no reauth flow')
    r=await req('GET','config/config_entries/flow/'+flow['flow_id'])
    assert r['type']=='form' and r['step_id']=='reauth_confirm'
    r=await req('POST','config/config_entries/flow/'+flow['flow_id'],{'username':'homeassistant','password':os.environ['OPENWRT_HA_PASSWORD']})
    print(e['data']['host'],r['type'],r.get('reason'),r.get('errors'),flush=True)
    assert r['type']=='abort' and r['reason']=='reauth_successful'
asyncio.run(main())
