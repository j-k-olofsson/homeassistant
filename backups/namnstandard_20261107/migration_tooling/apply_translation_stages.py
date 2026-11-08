import sys,json,pathlib,asyncio
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import DOC,RUN,HA,apply_names
async def main():
 async with HA()as ha:
  plans=sorted(DOC.glob('etapp-11-*.json'))
  for i,f in enumerate(plans,1):
   plan=json.load(open(f))
   if(RUN/plan['stage']/'verification.json').exists():continue
   print('BATCH_START',i,len(plans),plan['stage'],flush=True)
   await apply_names(ha,f)
   print('BATCH_VERIFIED',i,len(plans),flush=True)
asyncio.run(main())
