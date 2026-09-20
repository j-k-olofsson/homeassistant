import asyncio,json,wave,time
from pathlib import Path
from music_assistant_client import MusicAssistantClient
from music_assistant_models.enums import QueueOption
ROOT=Path('/config/backups/granny-sync-correction-20260920')
async def main():
 d=next(x['data'] for x in json.load(open('/config/.storage/core.config_entries'))['data']['entries'] if x['domain']=='music_assistant')
 with wave.open('/config/www/granny_sync_verification.wav','wb') as w:
  w.setnchannels(1);w.setsampwidth(2);w.setframerate(48000);w.writeframes(bytes(48000*2*120))
 async with MusicAssistantClient(d['url'],None,token=d['token']) as m:
  group='syncgroup_rk7qfzy6';ids=[group,'up0ba23cfe','upb2965530']
  before={p['player_id']:p for p in await m.send_command('players/all') if p['player_id'] in ids}
  assert all(p['state']=='idle' for p in before.values())
  assert not await m.send_command('player_queues/items',queue_id=group,limit=10,offset=0)
  results=[]
  try:
   await m.send_command('players/cmd/volume_set',player_id=group,volume_level=5)
   await m.player_queues.play_media(group,'http://homeassistant:80/local/granny_sync_verification.wav',option=QueueOption.REPLACE)
   for i in range(15):
    await asyncio.sleep(2)
    ps=[{k:p.get(k) for k in ['player_id','state','elapsed_time','active_source','active_group','synced_to','active_output_protocol','group_members']} for p in await m.send_command('players/all') if p['player_id'] in ids]
    results.append(ps);print(json.dumps(ps),flush=True)
    if any(p['player_id']==group and (p['elapsed_time'] or 0)>10 for p in ps):break
  finally:
   await m.send_command('players/cmd/stop',player_id=group)
   await m.player_queues.clear(group)
   for pid,p in before.items():
    if pid!=group and p.get('volume_level') is not None:await m.send_command('players/cmd/volume_set',player_id=pid,volume_level=p['volume_level'])
   (ROOT/'group-probe.json').write_text(json.dumps(results,indent=2))
asyncio.run(main())
