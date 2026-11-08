import asyncio,json,sys,time
from marketplace_audit import HA,OUT
async def extra(h,name):
 result={}
 try:result['logs']=await h.call('system_log/list')
 except Exception as e:result['logs_error']=str(e)
 async with h.s.post('http://127.0.0.1:80/api/config/core/check_config',headers={'Authorization':'Bearer '+h.token}) as r:result['check_config']={'http':r.status,'body':await r.json()}
 (OUT/(name+'_checks.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2));return result
async def main():
 domain=sys.argv[1]
 async with HA() as h:
  before=await h.snapshot(domain+'_before');checks=await extra(h,domain+'_before');entry=next(e for e in before['entries'] if e['domain']==domain);assert entry['state']=='loaded' and not entry.get('disabled_by')
  if domain=='spotifyplus':
   ids={e['entity_id'] for e in before['entities'] if e['platform']==domain};assert all(s['state'] not in ['playing','buffering'] for s in before['states'] if s['entity_id'] in ids)
  result={'domain':domain,'entry_id':entry['entry_id'],'started':time.time()}
  try:
   result['disable_response']=await h.call('config_entries/disable',entry_id=entry['entry_id'],disabled_by='user')
   print('DISABLE',domain,result['disable_response'],flush=True)
   await asyncio.sleep(5)
   current=await h.call('config_entries/get');disabled=next(e for e in current if e['entry_id']==entry['entry_id']);result['disabled_entry']=disabled;assert disabled['state']=='not_loaded' and disabled['disabled_by']=='user',disabled
   if domain!='watchman':await h.call('call_service',domain='watchman',service='report',service_data={'parse_config':True,'create_file':False})
   await asyncio.sleep(55)
   during=await h.snapshot(domain+'_disabled');result['checks_disabled']=await extra(h,domain+'_disabled');print('DURING',domain,'repairs',during['repairs'],'config',result['checks_disabled']['check_config'],flush=True)
  finally:
   result['enable_response']=await h.call('config_entries/disable',entry_id=entry['entry_id'],disabled_by=None)
   for _ in range(20):
    await asyncio.sleep(2);es=await h.call('config_entries/get');e=next(e for e in es if e['entry_id']==entry['entry_id'])
    if e['state']=='loaded':break
   result['restored_entry']=e;print('RESTORED',domain,e['state'],e['disabled_by'],flush=True)
   after=await h.snapshot(domain+'_restored');result['checks_restored']=await extra(h,domain+'_restored');result['finished']=time.time()
   (OUT/(domain+'_test_result.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2))
   assert e['state']=='loaded' and e['disabled_by'] is None,e
asyncio.run(main())
