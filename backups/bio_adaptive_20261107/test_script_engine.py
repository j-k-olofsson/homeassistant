import asyncio,copy,json,tempfile
from pathlib import Path
import yaml
from homeassistant.core import HomeAssistant,Context,State
from homeassistant.helpers.script import Script
from homeassistant.helpers import config_validation as cv
R=Path('/config');pkg=yaml.safe_load((R/'packages/bio_adaptive_lighting.yaml').read_text());main=next(a for a in yaml.safe_load((R/'automations.yaml').read_text()) if a.get('id')=='1769682852305');lamps=['light.bordslampa_vanster','light.bordslampa_hoger'];profile='switch.adaptive_lighting_bio';results=[]
def quick(v):
 if isinstance(v,dict):return {k:({'milliseconds':1} if k=='delay' else quick(x)) for k,x in v.items()}
 if isinstance(v,list):return [quick(x) for x in v]
 return v
async def run(name,scene,bio,event,guard=False,from_scene='DUSK',lights_on=True):
 h=HomeAssistant(tempfile.mkdtemp(prefix='bio-adaptive-test-'));calls=[]
 h.states.async_set('input_select.light_scene',scene);h.states.async_set('switch.grupp_hemmabio',bio)
 for e in lamps:h.states.async_set(e,'on' if lights_on else 'off',{'brightness_pct':25,'rgb_color':[255,255,255]})
 for e in [profile,profile+'_adapt_color',profile+'_adapt_brightness',profile+'_sleep_mode']:h.states.async_set(e,'on')
 async def switch(call):
  ids=call.data['entity_id'];ids=[ids] if isinstance(ids,str) else ids
  for eid in ids:h.states.async_set(eid,'on' if call.service=='turn_on' else 'off')
  calls.append((call.domain+'.'+call.service,dict(call.data)))
 async def light(call):
  ids=call.data['entity_id'];ids=[ids] if isinstance(ids,str) else ids
  for eid in ids:
   attrs=dict(h.states.get(eid).attributes);attrs.update({k:v for k,v in call.data.items() if k!='entity_id'});h.states.async_set(eid,'on' if call.service=='turn_on' else 'off',attrs)
  calls.append((call.domain+'.'+call.service,dict(call.data)))
 async def adaptive(call):
  calls.append(('adaptive_lighting.'+call.service,dict(call.data)))
  if call.service=='apply':
   assert scene in ['DAY','DAWN','DUSK'] and bio=='off';assert call.data['adapt_brightness'] is False and call.data['turn_on_lights'] is False
 h.services.async_register('switch','turn_on',switch);h.services.async_register('switch','turn_off',switch);h.services.async_register('light','turn_on',light);h.services.async_register('light','turn_off',light);h.services.async_register('adaptive_lighting','apply',adaptive);h.services.async_register('adaptive_lighting','set_manual_control',adaptive)
 sync=Script(h,cv.SCRIPT_SCHEMA(pkg['script']['bio_adaptivt_ljus_synkronisera']['sequence']),'sync','script')
 async def sync_call(call):await sync.async_run({},context=call.context)
 h.services.async_register('script','bio_adaptivt_ljus_synkronisera',sync_call)
 script=Script(h,cv.SCRIPT_SCHEMA(quick(pkg['automation'][0]['actions'] if guard else main['actions'])),name,'automation')
 await script.async_run({'trigger':{'id':event,'from_state':State('input_select.light_scene',from_scene),'to_state':State('input_select.light_scene',scene)}},context=Context())
 adapts=[i for i,c in enumerate(calls) if c[0]=='adaptive_lighting.apply'];lightcalls=[i for i,c in enumerate(calls) if c[0].startswith('light.')]
 if bio=='on':assert not adapts and all(h.states.is_state(e,'off') for e in lamps) and h.states.is_state(profile,'off')
 elif scene=='NIGHT':
  assert not adapts and h.states.is_state(profile,'off')
  for e in lamps:
   s=h.states.get(e)
   if not guard or lights_on:assert s.state=='on' and s.attributes['rgb_color']==[255,0,0] and s.attributes['brightness_pct']==15,s
   else:assert s.state=='off',s
 elif scene in ['DAY','DAWN','DUSK']:
  assert adapts and h.states.is_state(profile,'on') and h.states.is_state(profile+'_adapt_brightness','off')
  if not guard:assert max(lightcalls)<min(adapts),calls
  if from_scene=='NIGHT' and event=='scene_day':assert len(lightcalls)==21,len(lightcalls)
 else:assert not adapts and not lightcalls and h.states.is_state(profile,'off')
 if not guard:assert calls[0][0]=='switch.turn_off' and calls[0][1]['entity_id'] in (profile,[profile]),calls[0]
 results.append({'case':name,'adaptive_apply_calls':len(adapts),'light_calls':len(lightcalls),'profile_state':h.states.get(profile).state});await h.async_stop(force=True)
async def test():
 for scene in ['DAY','DAWN','DUSK']:await run('scene_'+scene,scene,'off','scene_'+scene.lower())
 await run('night_red','NIGHT','off','scene_night')
 await run('cinema_on','DAY','on','bio_on')
 await run('cinema_off_at_night','NIGHT','off','bio_off')
 await run('cinema_off_day','DAY','off','bio_off')
 await run('morning_fade_before_adaptive','DAY','off','scene_day',from_scene='NIGHT')
 await run('guard_manual_enable_night','NIGHT','off','profile_on',guard=True)
 await run('guard_night_does_not_wake_lamps','NIGHT','off','profile_on',guard=True,lights_on=False)
 await run('guard_manual_enable_cinema','DAY','on','profile_on',guard=True)
 await run('guard_party_keeps_colours','PARTY','off','block',guard=True)
 await run('startup_day','DAY','off','startup',guard=True)
 (R/'backups/bio_adaptive_20261107/isolated_results.json').write_text(json.dumps(results,indent=2));print(json.dumps(results,indent=2))
asyncio.run(test())
