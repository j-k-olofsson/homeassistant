import asyncio,json,os
from pathlib import Path
import aiohttp
entries=json.loads(Path('/config/.storage/core.config_entries').read_text())['data']['entries']
async def check(e):
 host=e['data']['host']
 async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=15)) as s:
  async def call(sid,obj,method,args):
   async with s.post('http://'+host+'/ubus',json={'jsonrpc':'2.0','id':1,'method':'call','params':[sid,obj,method,args]}) as r:return (await r.json())['result']
  r=await call('0'*32,'session','login',{'username':'homeassistant','password':os.environ['OPENWRT_HA_PASSWORD']});assert r[0]==0,(host,r[0])
  sid=r[1]['ubus_rpc_session'];assert 'homeassistant' in r[1]['acls']['access-group']
  for obj,method in [('system','board'),('system','info')]:
   r=await call(sid,obj,method,{});assert r[0]==0,(host,obj,method,r)
  print(host,'login, ACL, system.board and system.info OK',flush=True)
async def main():await asyncio.gather(*(check(e) for e in entries if e['domain']=='openwrt'))
asyncio.run(main())
