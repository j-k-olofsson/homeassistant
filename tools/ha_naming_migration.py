#!/usr/bin/env python3
"""Read-only inventory and guarded, journaled HA naming migrations.
Run using an isolated Python environment with aiohttp installed.
All credentials remain in the environment; raw snapshots are private.
"""
import asyncio, collections, csv, hashlib, json, os, pathlib, re, sys, unicodedata
import aiohttp
ROOT=pathlib.Path('/homeassistant')
RUN=ROOT/'backups/namnstandard_20261107'
DOC=ROOT/'docs/namnstandard'
DOC.mkdir(exist_ok=True)
def dump(path,value):
 path.parent.mkdir(parents=True,exist_ok=True)
 path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
def slug(value):
 value=unicodedata.normalize('NFKD',value or '').encode('ascii','ignore').decode().lower()
 return re.sub('[^a-z0-9]+','_',value).strip('_')
class HA:
 async def __aenter__(self):
  self.s=aiohttp.ClientSession(headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']},timeout=aiohttp.ClientTimeout(total=90))
  self.ws=await self.s.ws_connect('http://supervisor/core/websocket',max_msg_size=64*1024*1024)
  assert (await self.ws.receive_json())['type']=='auth_required'
  await self.ws.send_json({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']})
  assert (await self.ws.receive_json())['type']=='auth_ok'
  self.seq=0
  return self
 async def __aexit__(self,*args):await self.ws.close();await self.s.close()
 async def call(self,typ,**kwargs):
  self.seq+=1;mid=self.seq
  await self.ws.send_json({'id':mid,'type':typ,**kwargs})
  while True:
   v=await asyncio.wait_for(self.ws.receive_json(),90)
   if v.get('id')==mid and v.get('type')=='result':
    if not v.get('success'):raise RuntimeError(json.dumps({'command':typ,'error':v.get('error')}))
    return v.get('result')
 async def rest(self,route,data=None):
  async with self.s.request('GET' if data is None else 'POST','http://supervisor'+route,json=data) as r:
   value=await r.json()
   if r.status!=200:raise RuntimeError(str((route,r.status,value)))
   return value
async def snapshot(ha,output):
 output.mkdir(parents=True,exist_ok=True);output.chmod(0o700)
 results={}
 for key,typ in [('entities','config/entity_registry/list'),('devices','config/device_registry/list'),('areas','config/area_registry/list'),('floors','config/floor_registry/list'),('states','get_states'),('dashboards','lovelace/dashboards/list'),('config','get_config')]:
  results[key]=await ha.call(typ);dump(output/(key+'.json'),results[key])
 # Extended entries include aliases and options omitted by the list command.
 extended=await ha.call('config/entity_registry/get_entries',entity_ids=[e['entity_id'] for e in results['entities']])
 results['entities']=[{**e,**extended[e['entity_id']]} for e in results['entities']]
 dump(output/'entities.json',results['entities'])
 boards={}
 for b in results['dashboards']:
  if b.get('mode')=='storage':
   path=b.get('url_path');boards[path]=await ha.call('lovelace/config',**({'url_path':path} if path else {}))
 # The default dashboard is not always returned by dashboards/list.
 if None not in boards:
  try:boards[None]=await ha.call('lovelace/config')
  except RuntimeError:pass
 dump(output/'dashboard_configs.json',[{'url_path':k,'config':v} for k,v in boards.items()]);results['dashboard_configs']=boards
 return results
def append_journal(path,item):
 with path.open('a') as f:
  f.write(json.dumps(item,ensure_ascii=False)+'\n');f.flush();os.fsync(f.fileno())
async def apply_names(ha,plan_path):
 plan=json.loads(pathlib.Path(plan_path).read_text());stage=plan['stage'];out=RUN/stage
 assert not out.exists(), 'Stage already exists; inspect its journal instead of repeating it'
 job=json.loads((RUN/'full_backup_request.json').read_text())['data']['job_id']
 job_data=(await ha.rest('/jobs/'+job))['data']
 assert job_data['done'] and not job_data['errors'], 'Full backup has not completed successfully'
 dump(RUN/'full_backup_job.json',job_data)
 before=await snapshot(ha,out/'before');em={e['entity_id']:e for e in before['entities']};dm={d['id']:d for d in before['devices']}
 # Honor explicitly deferred items before any mutation.
 deferred=json.loads((DOC/'restpunkter.json').read_text()) if (DOC/'restpunkter.json').exists() else {}
 protected_entities=set(deferred.get('protected_entity_ids',[]));protected_devices=set(deferred.get('protected_device_ids',[]))
 for op in plan['operations']:
  assert not (op['kind']=='device' and op['id'] in protected_devices), ('Deferred device',op['id'])
  assert not (op['kind']=='entity' and (op['id'] in protected_entities or em[op['id']].get('device_id') in protected_devices)), ('Deferred entity',op['id'])
 # Check expected values. Only planned name/alias and device-area fields are writable.
 for op in plan['operations']:
  target=(em if op['kind']=='entity' else dm)[op['id']]
  assert all(target.get(k)==v for k,v in op['before'].items()), ('Concurrent modification',op['id'])
  assert set(op['after']) <= ({'name','aliases'} if op['kind']=='entity' else {'name_by_user','area_id'})
 dump(out/'plan.json',plan);journal=out/'journal.jsonl'
 applied=[]
 try:
  # Store historical full names before any device name changes.
  for op in sorted(plan['operations'],key=lambda o:o['kind']!='entity'):
   append_journal(journal,{'status':'intent','operation':op})
   typ='config/entity_registry/update' if op['kind']=='entity' else 'config/device_registry/update'
   arg='entity_id' if op['kind']=='entity' else 'device_id'
   await ha.call(typ,**{arg:op['id']},**op['after'])
   applied.append(op);append_journal(journal,{'status':'applied','kind':op['kind'],'id':op['id']})
  await asyncio.sleep(3)
  after=await snapshot(ha,out/'after');ae={e['entity_id']:e for e in after['entities']};ad={d['id']:d for d in after['devices']}
  assert set(em)==set(ae), 'Entity IDs changed unexpectedly'
  assert set(dm)==set(ad), 'Device IDs changed unexpectedly'
  invariant_keys=['unique_id','device_id','area_id','disabled_by','hidden_by','platform','config_entry_id','labels','device_class','unit_of_measurement','entity_category','has_entity_name']
  changed_invariants=[]
  for eid,e in em.items():
   for k in invariant_keys:
    if e.get(k)!=ae[eid].get(k):changed_invariants.append([eid,k])
  assert not changed_invariants, ('Unexpected registry changes',changed_invariants[:5])
  for did,d in dm.items():
   expected_device=dict(d)
   for op in plan['operations']:
    if op['kind']=='device' and op['id']==did:expected_device.update(op['after'])
   assert all(expected_device.get(k)==ad[did].get(k) for k in ['area_id','disabled_by','identifiers','connections','parent_device_id']), ('Unexpected device change',did)
  for op in plan['operations']:
   actual=(ae if op['kind']=='entity' else ad)[op['id']]
   assert all(actual.get(k)==v for k,v in op['after'].items()), ('Name verification failed',op['id'])
  bs={s['entity_id']:s for s in before['states']};as_={s['entity_id']:s for s in after['states']}
  device_ids={o['id'] for o in applied if o['kind']=='device'}
  targetids={o['id'] for o in applied if o['kind']=='entity'}|{e['entity_id'] for e in em.values() if e.get('device_id') in device_ids}
  missing=[x for x in targetids if x in bs and x not in as_]
  unavailable=[x for x in targetids if x in bs and x in as_ and bs[x]['state'] not in ['unknown','unavailable'] and as_[x]['state'] in ['unknown','unavailable']]
  assert not missing and not unavailable, ('Target state regression',missing,unavailable)
  check=await ha.rest('/core/api/config/core/check_config',{})
  assert check['result']=='valid' and not check.get('errors'), ('Config check failed',check)
  result={'stage':stage,'status':'verified','operations':len(applied),'devices':sum(o['kind']=='device' for o in applied),'entities':sum(o['kind']=='entity' for o in applied),'entity_ids_unchanged':len(em),'invariants_unchanged':True,'missing_target_states':missing,'new_unavailable_targets':unavailable,'config_check':check}
  dump(out/'verification.json',result);print(json.dumps(result,ensure_ascii=False))
 except Exception as err:
  dump(out/'failure.json',{'error':str(err),'applied':len(applied)})
  # Restore supported name/alias fields in reverse order; exact compat_name restoration
  # additionally requires the cold storage snapshot documented in the recovery guide.
  errors=[]
  for op in reversed(applied):
   try:
    typ='config/entity_registry/update' if op['kind']=='entity' else 'config/device_registry/update'
    arg='entity_id' if op['kind']=='entity' else 'device_id'
    await ha.call(typ,**{arg:op['id']},**op['before'])
   except Exception as rollback_error:errors.append({'id':op['id'],'error':str(rollback_error)})
  dump(out/'rollback_result.json',{'status':'supported_fields_restored' if not errors else 'requires_recovery','errors':errors,'compat_name_requires_cold_restore':True})
  raise
async def rollback_names(ha,stage):
 out=RUN/stage;plan=json.loads((out/'plan.json').read_text())
 assert (out/'verification.json').exists(), 'Use the failure journal for an incomplete stage'
 assert not (out/'manual_rollback.json').exists(), 'Rollback already recorded'
 current=await snapshot(ha,out/'before-manual-rollback')
 em={e['entity_id']:e for e in current['entities']};dm={d['id']:d for d in current['devices']}
 # Avoid overwriting later stages or changes made by the user.
 for op in plan['operations']:
  actual=(em if op['kind']=='entity' else dm)[op['id']]
  assert all(actual.get(k)==v for k,v in op['after'].items()), ('Later changes must be handled first',op['id'])
 restored=[]
 for op in reversed(plan['operations']):
  typ='config/entity_registry/update' if op['kind']=='entity' else 'config/device_registry/update'
  arg='entity_id' if op['kind']=='entity' else 'device_id'
  append_journal(out/'manual_rollback_journal.jsonl',{'status':'intent','operation':op})
  await ha.call(typ,**{arg:op['id']},**op['before']);restored.append(op['id'])
 result={'status':'supported_name_fields_restored','count':len(restored),'exact_compat_name_restore_requires_full_backup':True}
 dump(out/'manual_rollback.json',result);print(json.dumps(result))
async def main():
 cmd=sys.argv[1] if len(sys.argv)>1 else 'inventory'
 async with HA() as ha:
  if cmd=='inventory':
   data=await snapshot(ha,RUN/'live_baseline')
   print(json.dumps({'entities':len(data['entities']),'devices':len(data['devices']),'areas':len(data['areas']),'states':len(data['states']),'dashboards':len(data['dashboard_configs'])}))
  elif cmd=='rollback-names':
   await rollback_names(ha,sys.argv[2])
  elif cmd=='apply-names':
   await apply_names(ha,sys.argv[2])
  elif cmd=='check':
   print(json.dumps(await ha.rest('/core/api/config/core/check_config',{}),ensure_ascii=False))
  else:raise ValueError(cmd)
if __name__=='__main__':asyncio.run(main())
