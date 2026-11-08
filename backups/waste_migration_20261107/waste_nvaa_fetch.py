import asyncio,json
from pathlib import Path
import aiohttp
OUT=Path('/config/backups/waste_migration_20261107')
async def main():
 async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=40)) as s:
  async with s.post('https://sjalvservice.nvaa.se/api/v1/integration/findAddress',data={'address':'Blidö Söderskogs väg 28'}) as r:
   data=await r.json();assert r.status==200;(OUT/'nvaa_address_lookup.json').write_text(json.dumps(data,ensure_ascii=False,indent=2));print(json.dumps(data,ensure_ascii=False))
asyncio.run(main())
