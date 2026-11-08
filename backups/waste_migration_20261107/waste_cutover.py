import sys,asyncio,json,shutil
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
OUT=ROOT/'backups/waste_migration_20261107';OLD={'template':'00aa2b5819a44ae77a63ee083c87520c','local_calendar':'e68032cdcc5d02f1799bcc2a08b61370'}
async def main():
 async with HA() as h:
  before={k:await h.call(t) for k,t in [('states','get_states'),('entries','config_entries/get'),('entities','config/entity_registry/list')]};(OUT/'before_cutover.json').write_text(json.dumps(before,ensure_ascii=False,indent=2))
  for name in ['core.config_entries','core.entity_registry','lovelace.lovelace','local_calendar.sophamtning.ics']:shutil.copy2(ROOT/'.storage'/name,OUT/(name+'.pre_cutover'))
  newentry=next(e for e in before['entries'] if e['domain']=='waste_collection_schedule');assert newentry['state']=='loaded'
  newents=[e for e in before['entities'] if e['config_entry_id']==newentry['entry_id']];print('NEW_ENTITIES',[(e['entity_id'],e['platform']) for e in newents],flush=True)
  se=next(e for e in newents if e['entity_id'].startswith('sensor.'));cal=next(e for e in newents if e['entity_id'].startswith('calendar.'));sm={s['entity_id']:s for s in before['states']}
  print('NEW_STATES',[sm[e['entity_id']] for e in [se,cal]],flush=True)
  assert sm[se['entity_id']]['state']=='I övermorgon';assert sm[cal['entity_id']]['attributes']['start_time'].startswith('2026-11-09')
  assert '2026-11-09' in sm[se['entity_id']]['attributes'] and 'Slam' not in sm[se['entity_id']]['attributes']['2026-11-09']
  old_sensor=next(e for e in before['entities'] if e['entity_id']=='sensor.soptomning');assert old_sensor['config_entry_id']==OLD['template']
  changes=[]
  for domain,entry_id in OLD.items():
   async with h.s.delete('http://127.0.0.1:80/api/config/config_entries/entry/'+entry_id,headers={'Authorization':'Bearer '+h.token}) as r:d=await r.json();assert r.status==200,(r.status,d)
   changes.append({'delete_domain':domain,'entry_id':entry_id,'result':d});print('DELETED',domain,d,flush=True)
  for e,eid in [(se,'sensor.soptomning'),(cal,'calendar.sophamtning')]:
   args={'entity_id':e['entity_id'],'new_entity_id':eid}
   if eid.startswith('sensor.'):args['name']=old_sensor.get('name') or 'Sopor'
   result=await h.call('config/entity_registry/update',**args);changes.append({'renamed':e['entity_id'],'to':eid})
  after={k:await h.call(t) for k,t in [('states','get_states'),('entries','config_entries/get'),('entities','config/entity_registry/list'),('repairs','repairs/list_issues')]}
  entries={e['entry_id'] for e in after['entries']};assert not entries.intersection(OLD.values());assert {e['entry_id'] for e in before['entries']}-entries==set(OLD.values())
  for eid in ['sensor.soptomning','calendar.sophamtning']:
   e=next(e for e in after['entities'] if e['entity_id']==eid);assert e['platform']=='waste_collection_schedule' and e['config_entry_id']==newentry['entry_id']
  # Remove orphaned old local-calendar data only after its entry has been removed.
  p=ROOT/'.storage/local_calendar.sophamtning.ics'
  if p.exists():p.unlink();changes.append({'removed_orphan_calendar_file':p.name})
  (OUT/'after_cutover.json').write_text(json.dumps(after,ensure_ascii=False,indent=2));(OUT/'cutover_actions.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2));print('DONE',after['repairs'],flush=True)
asyncio.run(main())
