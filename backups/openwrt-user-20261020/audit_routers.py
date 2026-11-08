import asyncio,json
from pathlib import Path
import aiohttp
entries=json.loads(Path('/config/backups/openwrt-user-20261020/core.config_entries.backup').read_text())['data']['entries']
aps=next(e for e in entries if e['domain']=='openwrt_wifi_clients')['options']['aps']
password=aps[0]['password']
async def inspect(e):
 host=e['data']['host'];url=f'http://{host}/ubus'
 async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=20)) as s:
  async def call(sid,obj,method,args):
   async with s.post(url,json={'jsonrpc':'2.0','id':1,'method':'call','params':[sid,obj,method,args]}) as r:return (await r.json())['result']
  try:
   r=await call('0'*32,'session','login',{'username':'root','password':password});assert r[0]==0
   sid=r[1]['ubus_rpc_session']; print(host,'acl',json.dumps(r[1].get('acls',{})),flush=True)
   r=await call(sid,'file','exec',{'command':'/bin/sh','params':['-c','id homeassistant; test -f /usr/share/rpcd/acl.d/homeassistant.json && echo ACL_EXISTS; uci -q get rpcd.homeassistant.username; cat /etc/sysupgrade.conf; ubus call system board']})
   print(host,json.dumps(r),flush=True)
  except Exception as ex: print(host,type(ex).__name__,str(ex)[:100],flush=True)
async def main():await asyncio.gather(*(inspect(e) for e in entries if e['domain']=='openwrt'))
asyncio.run(main())
