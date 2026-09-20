"""Silent live verification; never modifies a nonempty queue or active player."""
import asyncio, importlib.util, json, time, wave
from pathlib import Path
from music_assistant_client import MusicAssistantClient
from music_assistant_models.enums import QueueOption
ROOT=Path('/config/backups/granny-sync-correction-20260920')
spec=importlib.util.spec_from_file_location('controller','/config/custom_components/granny_sync/controller.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
GROUP='syncgroup_rk7qfzy6';KITCHEN='upb2965530';ATELIER='up0ba23cfe'
async def main():
 d=next(x['data'] for x in json.load(open('/config/.storage/core.config_entries'))['data']['entries'] if x['domain']=='music_assistant')
 with wave.open('/config/www/granny_sync_announcement_test.wav','wb') as w:
  w.setnchannels(1);w.setsampwidth(2);w.setframerate(48000);w.writeframes(bytes(48000*2*8))
 async with MusicAssistantClient(d['url'],None,token=d['token']) as m, MusicAssistantClient(d['url'],None,token=d['token']) as observer:
  async def players(client=m):return {p['player_id']:p for p in await client.send_command('players/all')}
  async def queues(client=m):return {q['queue_id']:q for q in await client.send_command('player_queues/all')}
  before=await players();ids=[GROUP,KITCHEN,ATELIER]
  assert all(before[p]['state']=='idle' for p in ids),'Player in use'
  for q in [GROUP,KITCHEN]:assert not await m.send_command('player_queues/items',queue_id=q,limit=10,offset=0),'Queue not empty'
  data={}
  async def wait_playing(pid,timeout=30):
   until=time.monotonic()+timeout
   while time.monotonic()<until:
    p=(await players())[pid]
    if p['state']=='playing':return p
    await asyncio.sleep(.5)
   raise RuntimeError('No playback on '+pid)
  async def speak():
   await m.players.play_announcement(GROUP,url='http://homeassistant:80/local/granny_sync_announcement_test.wav',pre_announce=False,volume_level=5)
  async def run_case(name,source):
   samples=[];done=False
   async def monitor():
    while not done:
     ps=await players(observer)
     samples.append({'at':time.time(),'players':{p:{k:ps[p].get(k) for k in ['state','active_group','active_source','active_output_protocol','synced_to','group_members','current_media','volume_level']} for p in ids}})
     await asyncio.sleep(.5)
   await m.player_queues.play_media(source,'http://homeassistant:80/local/granny_sync_verification.wav',option=QueueOption.REPLACE)
   await wait_playing(source);await asyncio.sleep(6)
   pre=(await queues())[source];print(name,'BEFORE',pre['state'],pre['elapsed_time'],flush=True)
   monitor_task=asyncio.create_task(monitor())
   try:
    response=await c.broadcast(m.send_command,GROUP,speak)
    await wait_playing(source);await asyncio.sleep(2)
    post=(await queues())[source]
    data[name]={'before':pre,'after':post,'result':response,'samples':samples}
    assert post['state']=='playing',post
    assert pre['current_item']['queue_item_id']==post['current_item']['queue_item_id']
    assert post['elapsed_time']>=max(pre['elapsed_time']-2,0),(pre['elapsed_time'],post['elapsed_time'])
    simultaneous=[s for s in samples if all(s['players'][p]['state']=='playing' and (s['players'][p]['active_output_protocol'] or (s['players'][ATELIER]['active_output_protocol'] if s['players'][p]['synced_to']==ATELIER else '') or '').startswith('spb_') for p in [KITCHEN,ATELIER]) and s['players'][KITCHEN]['synced_to']==ATELIER]
    assert simultaneous,'Did not observe both rooms in one Sendspin session'
    print(name,'PASS',response,'after',post['state'],post['elapsed_time'],flush=True)
   finally:
    done=True;await monitor_task
    await m.send_command('players/cmd/stop',player_id=source)
    await m.send_command('players/cmd/power',player_id=GROUP,powered=False)
    await m.player_queues.clear(source)
  try:
   for p in [KITCHEN,ATELIER]:await m.send_command('players/cmd/volume_set',player_id=p,volume_level=5)
   await run_case('independent_kitchen_music',KITCHEN)
   data['success']=True
  finally:
   (ROOT/'independent-restore-live.json').write_text(json.dumps(data,indent=2))
   for q in [GROUP,KITCHEN]:
    try:
     await m.send_command('players/cmd/stop',player_id=q)
     await m.player_queues.clear(q)
    except Exception as e: print('cleanup',q,str(e),flush=True)
   for p in [KITCHEN,ATELIER]:
    await m.send_command('players/cmd/volume_set',player_id=p,volume_level=before[p]['volume_level'])
asyncio.run(main())
