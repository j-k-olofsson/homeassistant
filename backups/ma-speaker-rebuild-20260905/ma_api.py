import asyncio,json,sys,aiohttp
from music_assistant_client import MusicAssistantClient
async def main():
 c=next(c for c in json.load(open('/config/.storage/core.config_entries'))['data']['entries'] if c['domain']=='music_assistant')
 async with aiohttp.ClientSession() as s:
  m=MusicAssistantClient(c['data']['url'],s,token=open('/config/ma-admin-token.txt').read().strip());await m.connect()
  for item in json.load(sys.stdin):
   try:
    result=await m.send_command(item['command'],**item.get('args',{}))
   except Exception as e:
    if not item.get('continue_on_error'):raise
    print(json.dumps({'command':item['command'],'args':item.get('args'),'error':str(e)}));continue
   if item.get('output'):json.dump(result,open(item['output'],'w'),ensure_ascii=False,indent=2)
   print(json.dumps({'command':item['command'],'result':result if not item.get('output') else 'saved'},ensure_ascii=False))
  await m.disconnect()
asyncio.run(main())
