import asyncio,copy,json,tempfile,time
from pathlib import Path
import yaml
from homeassistant.core import HomeAssistant, Context
from homeassistant.helpers import entity_registry
from homeassistant.helpers.script import Script
from homeassistant.helpers import config_validation as cv
from homeassistant.exceptions import HomeAssistantError

ROOT=Path('/config');src=yaml.safe_load((ROOT/'packages/bilvarme_scheduler.yaml').read_text())['script'];autos=yaml.safe_load((ROOT/'automations.yaml').read_text());auto=next(a for a in autos if a.get('id')=='1751907475273');results=[]
assert src['bilvarme_med_laddning']['sequence'][2]['delay']=='00:01:00'
async def case(name,relay='off',calendar='off',climate='off',ack=True,fail_heat=False,end_calendar=False):
 h=HomeAssistant(tempfile.mkdtemp(prefix='bilvarme-test-'));calls=[];h.states.async_set('switch.billaddare',relay);h.states.async_set('calendar.billaddning',calendar);h.states.async_set('climate.sef_42h_climate',climate,{'duration_minutes':20});h.states.async_set('script.bilvarme_starta_en_gang','on')
 async def on(call):
  calls.append(('on',time.monotonic()))
  if ack:h.states.async_set('switch.billaddare','on')
 async def off(call):calls.append(('off',time.monotonic()));h.states.async_set('switch.billaddare','off')
 async def heat(call):
  calls.append(('heat',time.monotonic()))
  if end_calendar:h.states.async_set('calendar.billaddning','off')
  if fail_heat:raise HomeAssistantError('simulated cloud failure')
  h.states.async_set('climate.sef_42h_climate','heat_cool')
 h.services.async_register('switch','turn_on',on);h.services.async_register('switch','turn_off',off);h.services.async_register('toyota','start_climate',heat)
 worker=copy.deepcopy(src['bilvarme_med_laddning']['sequence']);worker[1]['timeout']={'milliseconds':15};worker[2]['delay']={'milliseconds':20};worker[5]['delay']={'milliseconds':1};worker[4]['data']['device_id']='isolated-car'
 w=Script(h,cv.SCRIPT_SCHEMA(worker),'isolated worker','script')
 async def worker_call(call):await w.async_run(dict(call.data),context=call.context)
 h.services.async_register('script','bilvarme_med_laddning',worker_call)
 main=Script(h,cv.SCRIPT_SCHEMA(src['bilvarme_starta_en_gang']['sequence']),'isolated main','script')
 try:await main.async_run({},context=Context())
 except Exception:
  if climate=='off' and relay in ['on','off']:raise
 names=[x[0] for x in calls]
 if climate!='off' or relay not in ['on','off']:assert not names,names
 elif not ack:assert names==['on','off'],names
 else:
  assert names[:2]==['on','heat'],names
  assert calls[1][1]-calls[0][1]>=0.018,calls
  expect_off=(end_calendar or calendar!='on') and not (relay=='on' and calendar!='on')
  assert (names[-1]=='off')==expect_off,(names,expect_off)
 results.append({'case':name,'calls':names,'final_relay':h.states.get('switch.billaddare').state})
 await h.async_stop(force=True)
async def calendar_guard():
 h=HomeAssistant(tempfile.mkdtemp(prefix='bilvarme-guard-test-'));calls=[]
 async def off(call):calls.append('off')
 h.services.async_register('switch','turn_off',off)
 seq=cv.SCRIPT_SCHEMA(auto['actions'])
 h.states.async_set('script.bilvarme_starta_en_gang','on')
 await Script(h,seq,'guard active','automation').async_run({'trigger':{'id':'charging-ends'}},context=Context());assert not calls,calls
 h.states.async_set('script.bilvarme_starta_en_gang','off')
 await Script(h,seq,'guard idle','automation').async_run({'trigger':{'id':'charging-ends'}},context=Context());assert calls==['off'],calls
 results.append({'case':'calendar_guard','active_blocks_stop':True,'idle_allows_stop':True});await h.async_stop(force=True)
async def main():
 await case('charger_off_calendar_off')
 await case('manual_charger_on',relay='on')
 await case('calendar_still_charging',calendar='on')
 await case('calendar_ends_during_warming',relay='on',calendar='on',end_calendar=True)
 await case('cloud_error_still_restores',fail_heat=True)
 await case('no_relay_ack_no_heating',ack=False)
 await case('already_heating',climate='heat_cool')
 await case('charger_unavailable',relay='unavailable')
 await calendar_guard()
 (ROOT/'backups/bilvarme_laddning_20261107/isolated_test_results.json').write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2))
asyncio.run(main())
