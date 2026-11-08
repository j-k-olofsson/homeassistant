#!/usr/bin/env python3
"""Guarded entity-ID migration, supported HA APIs, verified history and dependencies."""
import asyncio,collections,csv,datetime,hashlib,json,pathlib,re,sys,urllib.parse
from ha_naming_migration import ROOT,RUN,DOC,HA,dump,snapshot,append_journal

def rewrite(text,mapping):
 if not mapping:return text
 pattern=re.compile(r'(?<![a-z0-9_.])(?:'+'|'.join(re.escape(k)for k in sorted(mapping,key=len,reverse=True))+r')(?![a-z0-9_.])')
 return pattern.sub(lambda m:mapping[m.group(0)],text)
def obj_rewrite(obj,mapping):
 if isinstance(obj,str):return rewrite(obj,mapping)
 if isinstance(obj,list):return[obj_rewrite(v,mapping)for v in obj]
 if isinstance(obj,dict):return{obj_rewrite(k,mapping):obj_rewrite(v,mapping)for k,v in obj.items()}
 return obj
async def history(ha,ids,start,end):
 params=urllib.parse.urlencode({'filter_entity_id':','.join(ids),'end_time':end,'minimal_response':'true','no_attributes':'true'})
 result=await ha.rest('/core/api/history/period/'+urllib.parse.quote(start,safe='')+'?'+params)
 normalized={}
 for series in result:
  if series:
   key=series[0].get('entity_id');normalized[key]=[{k:v for k,v in item.items()if k!='entity_id'}for item in series]
 return normalized
async def run(stage,mapping):
 backup=json.loads((RUN/'full_backup_archive_manifest.json').read_text())
 assert pathlib.Path(backup['path']).is_file() and backup.get('restore_read_test'), 'Verified recovery archive is required'
 out=RUN/stage;assert not out.exists(),'Inspect existing stage journal before retrying';out.mkdir(mode=0o700)
 mapping={k:v for k,v in mapping.items()if k!=v};assert len(set(mapping.values()))==len(mapping)
 async with HA()as ha:
  before=await snapshot(ha,out/'before');em={e['entity_id']:e for e in before['entities']};bs={s['entity_id']:s for s in before['states']}
  assert all(k in em for k in mapping);assert not(set(mapping.values())&set(em))
  deferred=json.loads((DOC/'restpunkter.json').read_text()) if (DOC/'restpunkter.json').exists() else {}
  assert not(set(mapping)&set(deferred.get('protected_entity_ids',[]))), 'Explicitly deferred entity'
  assert not any(em[eid].get('device_id') in deferred.get('protected_device_ids',[]) for eid in mapping), 'Explicitly deferred device'
  for k,v in mapping.items():assert k.split('.')[0]==v.split('.')[0]
  dump(out/'id_map.json',mapping);dump(DOC/(stage+'-id-karta.json'),mapping)
  entries_before=json.load(open(ROOT/'.storage/core.config_entries'));dump(out/'config_entries_before.json',entries_before)
  expected_entries=obj_rewrite(entries_before,mapping)
  # Any config-entry dependency must be handled by its integration's rename listener.
  affected_entries=[]
  for old,new in zip(entries_before['data']['entries'],expected_entries['data']['entries']):
   if old!=new:
    assert old['domain']in['generic_thermostat','generic_hygrostat'],('Unimplemented config-entry dependency',old['domain'])
    assert not old.get('disabled_by'),('Disabled helper cannot handle automatic source rename',old['entry_id'])
    assert old['data']==new['data'];assert set(k for k in old['options']if old['options'][k]!=new['options'][k])<={'target_sensor'}
    affected_entries.append(old['entry_id'])
  # Reject unsupported live storage dependencies before touching any IDs.
  allowed={'core.entity_registry','core.restore_state','core.area_registry','core.config_entries','trace.saved_traces','frontend.system_data','homeassistant.exposed_entities'}
  unknown=[]
  for f in (ROOT/'.storage').iterdir():
   if not f.is_file()or f.name.startswith('tmp')or f.name.startswith('lovelace')or f.name in allowed or '.bak'in f.name or '.BACKUP'in f.name or f.name.endswith('.NEW')or 'migration_backup'in f.name:continue
   try:text=f.read_text()
   except Exception:continue
   if rewrite(text,mapping)!=text:unknown.append(f.name)
  assert not unknown,('Unsupported storage dependencies',unknown)
  # A legacy exposure record should not be silently left behind.
  exposure=json.load(open(ROOT/'.storage/homeassistant.exposed_entities'))
  assert obj_rewrite(exposure,mapping)==exposure,'Legacy voice exposure needs a dedicated migration'
  source_files=[*ROOT.glob('*.yaml'),*ROOT.glob('packages/**/*.yaml'),*ROOT.glob('blueprints/**/*.yaml'),*ROOT.glob('custom_templates/*.jinja')]
  source_changes={}
  for f in source_files:
   old=f.read_text();new=rewrite(old,mapping)
   if old!=new:source_changes[f]=(old,new)
  # Runtime source code with hardcoded IDs needs separate cache/deployment handling.
  code_hits=[]
  for root in [ROOT/'www',ROOT/'esphome',ROOT/'shell_commands',pathlib.Path('/share')]:
   for f in root.rglob('*'):
    if not f.is_file()or f.suffix not in ['.js','.html','.yaml','.yml','.json','.py','.sh','.jinja']or any(x in f.parts for x in ['.esphome','node_modules','.git','build','.cache']):continue
    if f.stat().st_size>15000000:continue
    try:old=f.read_text()
    except Exception:continue
    if rewrite(old,mapping)!=old:code_hits.append(str(f))
  assert not code_hits,('Source consumers need deployment before ID cutover',code_hits)
  boards={}
  for path,config in before['dashboard_configs'].items():
   if path is None:continue
   new=obj_rewrite(config,mapping)
   if new!=config:boards[path]=(config,new)
  frontend=(await ha.call('frontend/get_system_data',key='home'))['value'];new_frontend=obj_rewrite(frontend,mapping)
  # Pause only automation consumers that need new source references, and keep their states.
  auto_file=ROOT/'automations.yaml';paused=[];reload_automations=[]
  if auto_file in source_changes:
   import yaml
   config=yaml.safe_load(source_changes[auto_file][0]);byid={str(x.get('id')):x for x in config}
   for e in before['entities']:
    if e['platform']!='automation'or str(e.get('unique_id'))not in byid:continue
    a=byid[str(e['unique_id'])]
    if obj_rewrite(a,mapping)!=a:
     state=bs.get(e['entity_id'],{});assert state.get('attributes',{}).get('current',0)==0,('Automation is running',e['entity_id'])
     reload_automations.append((e['entity_id'],str(e['unique_id']),state.get('state')))
  now=datetime.datetime.now(datetime.timezone.utc);histend=(now-datetime.timedelta(minutes=2)).isoformat();histstart=(now-datetime.timedelta(days=1)).isoformat()
  statend=(now.replace(minute=0,second=0,microsecond=0)-datetime.timedelta(hours=1)).isoformat();statstart=(now.replace(minute=0,second=0,microsecond=0)-datetime.timedelta(days=1)).isoformat()
  metadata=await ha.call('recorder/get_statistics_metadata',statistic_ids=list(mapping)+list(mapping.values()))
  assert not any(x['statistic_id']in mapping.values()for x in metadata),'New ID already has historical statistics'
  statids=[x['statistic_id']for x in metadata]
  stats_before=await ha.call('recorder/statistics_during_period',start_time=statstart,end_time=statend,statistic_ids=statids,period='hour',types=['mean','min','max'])if statids else{}
  hist_before=await history(ha,list(mapping),histstart,histend)
  dump(out/'statistics_before.json',{'metadata':metadata,'series':stats_before,'start':statstart,'end':statend});dump(out/'history_before.json',hist_before)
  dump(out/'dependencies_plan.json',{'source_files':[str(f.relative_to(ROOT))for f in source_changes],'dashboards':list(boards),'frontend_favorites_changed':frontend!=new_frontend,'auto_updated_config_entries':affected_entries,'automation_consumers':reload_automations})
  # Back up source content and record intents before every mutation.
  for f,(old,new)in source_changes.items():
   for sub,txt in [('before_files',old),('after_files',new)]:
    dst=out/sub/f.relative_to(ROOT);dst.parent.mkdir(parents=True,exist_ok=True);dst.write_text(txt)
  journal=out/'journal.jsonl';renamed=[];written=[];saved=[];front_saved=False
  try:
   for eid,uid,state in reload_automations:
    if state=='on':await ha.rest('/core/api/services/automation/turn_off',{'entity_id':eid,'stop_actions':False});paused.append(eid)
   for old,new in mapping.items():
    if old.startswith('update.') and old in bs:
     current_update=await ha.rest('/core/api/states/'+old)
     assert not current_update.get('attributes',{}).get('in_progress'), ('OTA in progress',old)
    append_journal(journal,{'status':'rename_intent','old':old,'new':new})
    await ha.call('config/entity_registry/update',entity_id=old,new_entity_id=new);renamed.append((old,new));append_journal(journal,{'status':'renamed','old':old,'new':new})
   for f,(old,new)in source_changes.items():
    assert f.read_text()==old,('Concurrent source edit',str(f))
    temp=f.with_name(f.name+'.namnstandard-tmp');temp.write_text(new);temp.replace(f);written.append(f)
   for path,(old,new)in boards.items():
    assert await ha.call('lovelace/config',url_path=path)==old,('Concurrent dashboard edit',path)
    await ha.call('lovelace/config/save',url_path=path,config=new);saved.append(path)
    assert await ha.call('lovelace/config',url_path=path)==new
   if frontend!=new_frontend:
    assert(await ha.call('frontend/get_system_data',key='home'))['value']==frontend
    await ha.call('frontend/set_system_data',key='home',value=new_frontend);front_saved=True
    assert(await ha.call('frontend/get_system_data',key='home'))['value']==new_frontend
   for eid,uid,state in reload_automations:
    await ha.rest('/core/api/services/automation/reload',{'id':uid})
    await ha.rest('/core/api/services/automation/'+('turn_on'if state=='on'else'turn_off'),{'entity_id':eid})
   # Config-entry persistence is delayed. The integrations update the live entry first.
   deadline=asyncio.get_running_loop().time()+35
   while True:
    actual_entries=json.load(open(ROOT/'.storage/core.config_entries'))
    entries={e['entry_id']:e for e in actual_entries['data']['entries']};expected={e['entry_id']:e for e in expected_entries['data']['entries']}
    ready=all(entries[k]['options']==expected[k]['options']for k in affected_entries)
    if ready:break
    assert asyncio.get_running_loop().time()<deadline,'Helper sensor references did not migrate'
    await asyncio.sleep(2)
   await asyncio.sleep(2)
   after=await snapshot(ha,out/'after');ae={e['entity_id']:e for e in after['entities']};ast={s['entity_id']:s for s in after['states']}
   assert set(ae)==(set(em)-set(mapping))|set(mapping.values())
   for old,e in em.items():
    new=mapping.get(old,old);other=ae[new]
    for key in ['id','unique_id','device_id','area_id','disabled_by','hidden_by','platform','config_entry_id','labels','device_class','unit_of_measurement','entity_category','name','aliases','options']:
     assert e.get(key)==other.get(key),('Unexpected entity property',old,key)
   for old,new in mapping.items():
    if old in bs:
     assert new in ast and old not in ast,('Missing/recreated state',old,new)
     assert bs[old]['state']in['unknown','unavailable']or ast[new]['state']not in['unknown','unavailable'],('New unavailable state',new)
   expected_areas=obj_rewrite(before['areas'],mapping)
   def stable_areas(areas):return{a['area_id']:{k:v for k,v in a.items()if k not in['modified_at']}for a in areas}
   assert stable_areas(after['areas'])==stable_areas(expected_areas),'Area sensor references did not follow the rename'
   meta_after=await ha.call('recorder/get_statistics_metadata',statistic_ids=list(mapping)+list(mapping.values()))
   assert sorted([obj_rewrite(x,mapping)for x in metadata],key=lambda x:x['statistic_id'])==sorted(meta_after,key=lambda x:x['statistic_id']),'Statistics metadata mismatch'
   stats_after=await ha.call('recorder/statistics_during_period',start_time=statstart,end_time=statend,statistic_ids=[mapping[k]for k in statids],period='hour',types=['mean','min','max'])if statids else{}
   assert obj_rewrite(stats_before,mapping)==stats_after,'Historical statistics mismatch'
   hist_after=await history(ha,list(mapping.values()),histstart,histend)
   assert obj_rewrite(hist_before,mapping)==hist_after,'Historical state sequence mismatch'
   dump(out/'statistics_after.json',{'metadata':meta_after,'series':stats_after});dump(out/'history_after.json',hist_after)
   check=await ha.rest('/core/api/config/core/check_config',{});assert check['result']=='valid'and not check.get('errors'),check
   # Exact local references are checked after integrations have persisted their changes.
   for f in source_files:
    assert rewrite(f.read_text(),mapping)==f.read_text(),('Old source reference remains',str(f))
   for path in boards:
    actual=await ha.call('lovelace/config',url_path=path);assert obj_rewrite(actual,mapping)==actual
   assert obj_rewrite((await ha.call('frontend/get_system_data',key='home'))['value'],mapping)==(await ha.call('frontend/get_system_data',key='home'))['value']
   actual_entries=json.load(open(ROOT/'.storage/core.config_entries'))
   assert obj_rewrite(actual_entries,mapping)==actual_entries,'Old config-entry reference remains'
   result={'status':'verified','stage':stage,'renamed_entities':len(mapping),'same_unique_ids_and_settings':True,'statistics_series_verified':sum(len(v)for v in stats_after.values()),'history_records_verified':sum(len(v)for v in hist_after.values()),'statistics_metadata_moved':len(metadata),'source_files_updated':[str(p.relative_to(ROOT))for p in written],'dashboards_updated':saved,'frontend_favorites_updated':front_saved,'helper_config_entries_auto_updated':affected_entries,'automation_consumers_reloaded':[x[0]for x in reload_automations],'config_check':check}
   dump(out/'verification.json',result);print(json.dumps(result,ensure_ascii=False))
  except Exception as error:
   dump(out/'failure.json',{'error':str(error),'renamed':renamed});rollback_errors=[]
   inverse={v:k for k,v in mapping.items()}
   for old,new in reversed(renamed):
    try:await ha.call('config/entity_registry/update',entity_id=new,new_entity_id=old)
    except Exception as err:rollback_errors.append(str(err))
   for f in reversed(written):f.write_text(source_changes[f][0])
   for path in reversed(saved):await ha.call('lovelace/config/save',url_path=path,config=boards[path][0])
   if front_saved:await ha.call('frontend/set_system_data',key='home',value=frontend)
   for eid,uid,state in reload_automations:
    try:
     await ha.rest('/core/api/services/automation/reload',{'id':uid});await ha.rest('/core/api/services/automation/'+('turn_on'if state=='on'else'turn_off'),{'entity_id':eid})
    except Exception as err:rollback_errors.append(str(err))
   dump(out/'rollback_result.json',{'errors':rollback_errors,'restored_ids':len(renamed)});raise
async def main():
 mode=sys.argv[1];rows=list(csv.DictReader(open(DOC/'id-forslag-etapp-klimatsensorer.csv',encoding='utf-8-sig')))
 if mode=='pilot':rows=[r for r in rows if r['föreslaget_id'].startswith('sensor.toaletten_')];stage='08-id-pilot-toaletten'
 elif mode=='remaining':rows=[r for r in rows if not r['föreslaget_id'].startswith('sensor.toaletten_')];stage='09-id-klimatsensorer'
 else:raise ValueError(mode)
 await run(stage,{r['gammalt_id']:r['föreslaget_id']for r in rows})
if __name__=='__main__':asyncio.run(main())
