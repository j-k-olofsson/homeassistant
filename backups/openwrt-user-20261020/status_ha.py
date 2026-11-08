import asyncio,json
from pathlib import Path
from collections import Counter
import aiohttp
ns={};exec(Path('/config/whisper-migration-20261001/ha-api.py').read_text().split('async def main():')[0],ns)
async def main():
 async with aiohttp.ClientSession() as s:
  token=await ns['authenticate'](s)
  async with s.ws_connect('http://127.0.0.1:80/api/websocket',max_msg_size=32*1024*1024) as ws:
   await ws.receive_json();await ws.send_json({'type':'auth','access_token':token});await ws.receive_json()
   async def call(i,kind):
    await ws.send_json({'id':i,'type':kind})
    while True:
     r=await ws.receive_json()
     if r.get('id')==i and r['type']=='result':break
    assert r['success'],r.get('error');return r['result']
   entries=await call(1,'config_entries/get');print('ENTRIES',json.dumps([{k:e.get(k) for k in ['entry_id','domain','title','state','reason']} for e in entries if 'openwrt' in e['domain']]))
   issues=await call(2,'repairs/list_issues');print('ISSUES',json.dumps([x for x in issues['issues'] if x['domain']=='openwrt']))
   registry=await call(3,'config/entity_registry/list');states={x['entity_id']:x for x in await call(4,'get_states')}
   for e in entries:
    if e['domain']!='openwrt':continue
    entities=[x for x in registry if x['config_entry_id']==e['entry_id'] and not x.get('disabled_by')]
    counts=Counter(states.get(x['entity_id'],{}).get('state','absent') in ('unknown','unavailable','absent') for x in entities)
    sample=[{'entity_id':x['entity_id'],'state':states.get(x['entity_id'],{}).get('state')} for x in entities if any(k in x['entity_id'] for k in ['uptime','memory_usage','cpu_usage'])][:5]
    print(e['title'],'enabled',len(entities),'unavailable',counts[True],'samples',json.dumps(sample))
asyncio.run(main())
