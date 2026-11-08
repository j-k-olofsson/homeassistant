import asyncio,json,os,time
from pathlib import Path
import aiohttp
ROOT=Path('/config/backups/granny-reliability-20261003')
async def main():
 async with aiohttp.ClientSession(headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']}) as http:
  async def call(script,data):
   async with http.post('http://supervisor/core/api/services/script/'+script+'?return_response',json=data) as r:return {'status':r.status,'body':await r.text()}
  async def notifications():
   async with http.ws_connect('http://supervisor/core/api/websocket') as ws:
    await ws.receive_json()
    await ws.send_json({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']})
    assert (await ws.receive_json())['type']=='auth_ok'
    await ws.send_json({'id':1,'type':'persistent_notification/get'})
    return (await ws.receive_json())['result']
  results={}
  # Invalid first engine forces the real cloud fallback, without changing Piper.
  results['fallback']=await call('granny_announce',{'media_player':'media_player.kokets_skarm_ma','tts_engine':'tts.granny_test_missing','message':'Grannys reservröst fungerar också.'})
  # Empty speech raises immediately in both attempts; remaining HA channel must run.
  results['failure']=await call('granny_announce',{'media_player':'media_player.kokets_skarm_ma','message':''})
  assert results['fallback']['status']==200,results
  notices=await notifications()
  assert any(n['notification_id']=='granny_speech_failed' for n in notices),notices
  results['failure_notification']=True
  results['other_channel']=await call('granny_broadcast',{'task':'test','message':'Kontroll av textkanalen.','channels':['tts','ha'],'tts_media_player':'media_player.granny_test_missing'})
  assert results['other_channel']['status']==200,results
  notices=await notifications()
  assert any(n['message']=='Kontroll av textkanalen.' for n in notices),notices
  results['other_channel_delivered_after_speech_failure']=True
  for n in notices:
   if n['notification_id']=='granny_speech_failed' or n['message']=='Kontroll av textkanalen.':
    async with http.post('http://supervisor/core/api/services/persistent_notification/dismiss',json={'notification_id':n['notification_id']}) as r:assert r.status==200
  ROOT.joinpath('fault-tests.json').write_text(json.dumps(results,indent=2))
  print({k:v['status'] if isinstance(v,dict) else v for k,v in results.items()})
asyncio.run(main())
