import asyncio,importlib.util,json,re,sys
from pathlib import Path
import aiohttp
spec=importlib.util.spec_from_file_location('authhelper','/config/whisper-migration-20261001/ha-api.py')
# Load only the existing authentication function; do not execute its CLI main.
namespace={}
source=Path(spec.origin).read_text().split('async def main():')[0]
exec(source,namespace)
rx=re.compile(r'\b(frigg|eir)\b',re.I)
def rename(s):
 return rx.sub(lambda m:'Tor' if m[0].lower()=='frigg' else 'Heimdal',s)
async def main():
 async with aiohttp.ClientSession() as session:
  token=await namespace['authenticate'](session)
  async with session.ws_connect('http://127.0.0.1:80/api/websocket') as ws:
   await ws.receive_json(); await ws.send_json({'type':'auth','access_token':token}); assert (await ws.receive_json())['type']=='auth_ok'
   seq=0
   async def call(kind,**kw):
    nonlocal seq
    seq+=1; await ws.send_json({'id':seq,'type':kind,**kw})
    while True:
     r=await ws.receive_json()
     if r.get('id')==seq and r['type']=='result':break
    assert r['success'],r.get('error')
    return r['result']
   entries=await call('config_entries/get')
   devices=await call('config/device_registry/list')
   saved={'entries':entries,'devices':devices}
   p=Path('/config/rename-hosts-20261014');p.mkdir(mode=0o700,exist_ok=True)
   (p/'registry-before.json').write_text(json.dumps(saved));(p/'registry-before.json').chmod(0o600)
   for e in entries:
    title=e.get('title','')
    if rx.search(title):
     print('entry',e['entry_id'],e['domain'],title)
     if '--apply' in sys.argv:
      await call('config_entries/update',entry_id=e['entry_id'],title=rename(title))
   for d in devices:
    name=d.get('name_by_user') or d.get('name') or ''
    if rx.search(name):
     print('device',d['id'],name)
     if '--apply' in sys.argv:
      await call('config/device_registry/update',device_id=d['id'],name_by_user=rename(name))
   print('complete')
asyncio.run(main())
