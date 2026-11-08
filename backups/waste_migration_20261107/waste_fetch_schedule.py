import asyncio,json
from pathlib import Path
import aiohttp
O=Path('/config/backups/waste_migration_20261107')
async def main():
 data=json.loads((O/'nvaa_address_lookup.json').read_text())['results'];assert len(data)==1 and data[0]['address'].casefold()=='Blidö Söderskogs Väg 28, Blidö'.casefold()
 async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=40)) as s:
  async with s.post('https://sjalvservice.nvaa.se/api/v1/integration/getNextGarbageCollection',json={'buildingId':data[0]['id']}) as r:
   d=await r.json();assert r.status==200;(O/'nvaa_raw_schedule.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));print(json.dumps(d,ensure_ascii=False))
asyncio.run(main())
