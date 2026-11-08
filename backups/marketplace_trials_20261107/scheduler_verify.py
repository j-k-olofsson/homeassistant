import sys,asyncio,json,subprocess
from datetime import datetime,timedelta
from zoneinfo import ZoneInfo
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
O=ROOT/'backups/marketplace_trials_20261107';MARKER='scheduler_one_shot_verified_20261107'
async def main():
 async with HA() as h:
  result={};before=await h.call('get_states');car=next(s for s in before if s['entity_id']=='climate.sef_42h_climate');initial=await h.call('scheduler');print('INITIAL_SCHEDULES',initial,flush=True)
  
  for old in initial:
   assert old['start_date']=='2099-01-01' and old['name']=='Bilvärme 01/01 12:34',old
   await h.call('call_service',domain='scheduler',service='remove',service_data={'entity_id':old['entity_id']})
  initial=[]
  try:
   await h.call('call_service',domain='script',service='ange_starttid_for_bilvarmen',service_data={'starttid':'2099-01-01 12:34:00'})
   await asyncio.sleep(1);schedules=await h.call('scheduler');print('BOOKING',schedules,flush=True);assert len(schedules)==1
   sid=schedules[0]['schedule_id'];item=await h.call('scheduler/item',schedule_id=sid);result['booking_test']=item
   assert item['repeat_type']=='single' and item['start_date']=='2099-01-01' and item['end_date']=='2099-01-01';assert item['timeslots'][0]['actions'][0]['entity_id']=='script.bilvarme_starta_en_gang'
   await h.call('call_service',domain='scheduler',service='remove',service_data={'entity_id':schedules[0]['entity_id']});await asyncio.sleep(1);assert not await h.call('scheduler')
   local=datetime.now(ZoneInfo('Europe/Stockholm'))+timedelta(seconds=20);datestr=local.strftime('%Y-%m-%d')
   await h.call('call_service',domain='scheduler',service='add',service_data={'name':'Verifiering – engångstimer','repeat_type':'single','start_date':datestr,'end_date':datestr,'weekdays':['daily'],'tags':['verification_only'],'timeslots':[{'start':local.strftime('%H:%M:%S'),'actions':[{'service':'system_log.write','service_data':{'level':'info','logger':'scheduler.verification','message':MARKER}}]}]})
   print('SAFE_TIMER_RUNNING',local.isoformat(),flush=True)
   for i in range(48):
    await asyncio.sleep(2)
    if not await h.call('scheduler'):break
   logs=subprocess.check_output(['docker','logs','--since','3m','homeassistant'],stderr=subprocess.STDOUT,text=True);matches=[l for l in logs.splitlines() if MARKER in l];result['timer_log_matches']=matches;result['remaining_schedules']=await h.call('scheduler');assert len(matches)==1,matches;assert not result['remaining_schedules'],result['remaining_schedules']
   after=await h.call('get_states');a=next(s for s in after if s['entity_id']==car['entity_id']);result['car_before']=car;result['car_after']=a;assert a['state']==car['state']=='off'
   print('VERIFIED_TIMER_SINGLE_RUN_AND_SELF_DELETE; CAR_REMAINS_OFF',flush=True)
  finally:
   for s in await h.call('scheduler'):
    if s['schedule_id'] not in {x['schedule_id'] for x in initial}:await h.call('call_service',domain='scheduler',service='remove',service_data={'entity_id':s['entity_id']})
   (O/'scheduler_verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
asyncio.run(main())
