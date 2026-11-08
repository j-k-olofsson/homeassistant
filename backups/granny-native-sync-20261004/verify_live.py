import asyncio,json,os,time
from pathlib import Path
import aiohttp
from music_assistant_client import MusicAssistantClient
ROOT=Path('/config/backups/granny-native-sync-20261004')
async def main():
 d=next(e['data'] for e in json.load(open('/config/.storage/core.config_entries'))['data']['entries'] if e['domain']=='music_assistant')
 async with MusicAssistantClient(d['url'],None,token=d['token']) as m,aiohttp.ClientSession(headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']}) as http:
  ids=['56862e31-51ae-420f-a85e-02ce6410ded3','upb2965530','up1a2803a2']
  before={p['player_id']:p for p in await m.send_command('players/all') if p['player_id'] in ids}
  assert all(p['state']!='playing' for p in before.values()),'Target is already playing'
  async def broadcast():
   data={'task':'Verifiera gemensamt tal','message':'Det här är ett test av Granny. Samma meddelande ska nu höras samtidigt i köket och ateljén.','channels':['tts']}
   async with http.post('http://supervisor/core/api/services/script/granny_broadcast?return_response',json=data) as r:
    body=await r.text()
    assert r.status==200,(r.status,body)
    return json.loads(body)
  task=asyncio.create_task(broadcast());samples=[]
  while not task.done():
   players=await m.send_command('players/all')
   samples.append({'at':time.time(),'players':[{k:p.get(k) for k in ['player_id','state','volume_level','volume_muted','elapsed_time','active_source','active_group','synced_to','active_output_protocol']} for p in players if p['player_id'] in ids]})
   await asyncio.sleep(.3)
  result=await task
  after={p['player_id']:p for p in await m.send_command('players/all') if p['player_id'] in ids}
  ROOT.joinpath('live-test.json').write_text(json.dumps({'response':result,'samples':samples,'before':before,'after':after},indent=2))
  print('Response:',result.get('service_response'))
  for pid in ids:
   states=[p for s in samples for p in s['players'] if p['player_id']==pid]
   print(pid,'states:',sorted({p['state'] for p in states}),'volumes:',sorted({p['volume_level'] for p in states if p['volume_level'] is not None}))
  print('Samples:',len(samples))
asyncio.run(main())
