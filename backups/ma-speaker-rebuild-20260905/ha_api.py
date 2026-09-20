import asyncio,json,sys,aiohttp
async def main():
 data=json.load(sys.stdin)
 async with aiohttp.ClientSession() as s:
  async with s.ws_connect('http://supervisor/core/websocket',max_msg_size=16777216,headers={'Authorization':'Bearer '+data['token']}) as w:
   await w.receive_json();await w.send_json({'type':'auth','access_token':data['token']});auth=await w.receive_json()
   if auth['type']!='auth_ok':raise RuntimeError(auth)
   for i,item in enumerate(data['commands'],1):
    await w.send_json({'id':i,**item['request']})
    while True:
     r=await w.receive_json()
     if r.get('id')==i:break
    if not r.get('success'):raise RuntimeError(r)
    if item.get('output'):json.dump(r['result'],open(item['output'],'w'),indent=2,ensure_ascii=False)
    print(json.dumps({'type':item['request']['type'],'result':'saved' if item.get('output') else r['result']},ensure_ascii=False))
asyncio.run(main())
