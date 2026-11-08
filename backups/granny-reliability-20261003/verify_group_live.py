import asyncio,json,os,time
from pathlib import Path
import aiohttp
from music_assistant_client import MusicAssistantClient
ROOT=Path('/config/backups/granny-reliability-20261003')
async def main():
 d=next(e['data'] for e in json.load(open('/config/.storage/core.config_entries'))['data']['entries'] if e['domain']=='music_assistant')
 headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']}
 async with MusicAssistantClient(d['url'],None,token=d['token']) as m,aiohttp.ClientSession(headers=headers) as http:
  async def post(path,data):
   async with http.post('http://supervisor/core/api/'+path,json=data) as r:
    body=await r.text()
    if r.status!=200:raise RuntimeError(f'{r.status}: {body}')
    return json.loads(body)
  ps={p['player_id']:p for p in await m.send_command('players/all')}
  assert ps['upb2965530']['state']!='playing','Kitchen is in use'
  samples=[]
  task=asyncio.create_task(post('services/script/granny_broadcast?return_response',{'task':'Testa talfunktionen','message':'Det här är ett gemensamt test av Granny i köket och ateljén.','channels':['tts'],'tts_media_player':'media_player.grannys_hogtalare'}))
  while not task.done():
   players=await m.send_command('players/all')
   samples.append({'at':time.time(),'players':[{k:p.get(k) for k in ['player_id','state','volume_level','elapsed_time','active_source','current_media']} for p in players if p['player_id'] in ['upb2965530','spb_00f48d97d9b5','0416fda2-3f4b-f8d8-8a46-572bce5e58bc','up1a2803a2','syncgroup_rk7qfzy6','spb_80c5f267aa69']]})
   await asyncio.sleep(.4)
  result=await task
  data={'response':result,'samples':samples}
  ROOT.joinpath('group-live-test.json').write_text(json.dumps(data,indent=2))
  print('Broadcast response:',result.get('service_response'))
  print('Observed volumes:',sorted({p['volume_level'] for s in samples for p in s['players'] if p['volume_level'] is not None}))
  print('Observed states:',sorted({p['state'] for s in samples for p in s['players']}))
  print('Samples:',len(samples))
asyncio.run(main())
