import asyncio,json,os,re
from pathlib import Path
from datetime import datetime,timezone
import aiohttp
ROOT=Path('/config');OUT=ROOT/'backups/marketplace_audit_20261106';OUT.mkdir(exist_ok=True,mode=0o700)
class HA:
 async def __aenter__(self):
  self.s=aiohttp.ClientSession();auth=json.loads((ROOT/'.storage/auth').read_text())['data']; admins={x['id'] for x in auth['users'] if x.get('is_active') and 'system-admin' in x.get('group_ids',[])}
  for t in sorted([x for x in auth['refresh_tokens'] if x['user_id'] in admins and x.get('token_type')=='normal' and x.get('client_id')],key=lambda x:x.get('last_used_at') or '',reverse=True):
   async with self.s.post('http://127.0.0.1:80/auth/token',data={'grant_type':'refresh_token','refresh_token':t['token'],'client_id':t['client_id']}) as r:
    v=await r.json()
    if r.status==200:self.token=v['access_token'];break
  self.ws=await self.s.ws_connect('http://127.0.0.1:80/api/websocket',max_msg_size=64*1024*1024)
  await self.ws.receive_json();await self.ws.send_json({'type':'auth','access_token':self.token});assert (await self.ws.receive_json())['type']=='auth_ok';self.i=0;return self
 async def __aexit__(self,*args):await self.s.close()
 async def call(self,typ,**args):
  self.i+=1;await self.ws.send_json({'id':self.i,'type':typ,**args})
  while True:
   v=await self.ws.receive_json()
   if v.get('id')==self.i and v['type']=='result':break
  if not v['success']:raise RuntimeError(str(v))
  return v['result']
 async def snapshot(self,name):
  out={}
  for k,t in [('states','get_states'),('entities','config/entity_registry/list'),('devices','config/device_registry/list'),('entries','config_entries/get'),('repairs','repairs/list_issues'),('services','get_services'),('config','get_config')]:
   try:out[k]=await self.call(t)
   except Exception as e:out[k]={'error':str(e)}
  (OUT/(name+'.json')).write_text(json.dumps(out,ensure_ascii=False,indent=2));return out
async def main():
 async with HA() as h:
  d=await h.snapshot('baseline');print('snapshot',[(k,len(v)) for k,v in d.items()]);print('repairs',json.dumps(d['repairs'],ensure_ascii=False));print('config',d['config'].get('version'))
  for e in d['entries']:
   if e['domain'] in {json.loads(p.read_text())['domain'] for p in (ROOT/'custom_components').glob('*/manifest.json')}:print('entry',e['domain'],e['entry_id'],e.get('state'),e.get('disabled_by'))
if __name__=='__main__':asyncio.run(main())
