import asyncio,json,os,shutil
from pathlib import Path
from datetime import datetime,timezone
import aiohttp
ROOT=Path('/config'); OUT=ROOT/'backups/haghs_cleanup_20261026';OUT.mkdir(exist_ok=True);OUT.chmod(0o700)
async def main():
 async with aiohttp.ClientSession() as s:
  auth=json.loads((ROOT/'.storage/auth').read_text())['data']; admins={x['id'] for x in auth['users'] if x.get('is_active') and 'system-admin' in x.get('group_ids',[])}
  token=None
  for t in sorted([x for x in auth['refresh_tokens'] if x['user_id'] in admins and x.get('token_type')=='normal' and x.get('client_id')],key=lambda x:x.get('last_used_at') or '',reverse=True):
   async with s.post('http://127.0.0.1:80/auth/token',data={'grant_type':'refresh_token','refresh_token':t['token'],'client_id':t['client_id']}) as r:
    v=await r.json()
    if r.status==200: token=v['access_token'];break
  assert token
  async with s.ws_connect('http://127.0.0.1:80/api/websocket',max_msg_size=32*1024*1024) as ws:
   await ws.receive_json();await ws.send_json({'type':'auth','access_token':token});assert (await ws.receive_json())['type']=='auth_ok'
   i=0
   async def call(typ,**args):
    nonlocal i
    i+=1;await ws.send_json({'id':i,'type':typ,**args})
    while True:
     v=await ws.receive_json()
     if v.get('id')==i and v['type']=='result':break
    assert v['success'],v
    return v['result']
   snap={}
   for key,typ in [('states','get_states'),('entities','config/entity_registry/list'),('devices','config/device_registry/list')]:snap[key]=await call(typ)
   (OUT/'live_before.json').write_text(json.dumps(snap,ensure_ascii=False))
   ids=next(x['attributes']['zombie_entities'] for x in snap['states'] if x['entity_id']=='sensor.system_ha_global_health_score')
   (OUT/'targets.json').write_text(json.dumps(ids))
   entries=json.loads((ROOT/'.storage/core.config_entries').read_text())['data']['entries']
   for e in entries:
    if e['domain']=='uptime_kuma':
     async with s.get(e['data']['url'].rstrip('/')+'/metrics',auth=aiohttp.BasicAuth('',e['data']['api_key'])) as r:
      txt=await r.text();assert r.status==200
      (OUT/'kuma_metrics.txt').write_text(txt)
      print('KUMA', '\n'.join(l for l in txt.splitlines() if 'monitor_id="65"' in l or 'monitor_id="66"' in l))
    if e['domain']=='portainer':
     async with s.get(e['data']['url'].rstrip('/')+'/api/endpoints/15/docker/volumes',headers={'X-API-Key':e['data']['api_token']}) as r:
      v=await r.json();print('VOLUMES_HTTP',r.status);(OUT/'volumes.json').write_text(json.dumps(v));print('VOLUMES',[x['Name'] for x in v.get('Volumes',[])])
   for e in entries:
    if e['domain']=='portainer':
     async with s.get(e['data']['url'].rstrip('/')+'/api/endpoints',headers={'X-API-Key':e['data']['api_token']}) as r:
      v=await r.json();assert r.status==200;print('ENDPOINTS',[(x['Id'],x['Name']) for x in v]);(OUT/'endpoints.json').write_text(json.dumps(v));assert 15 not in [x['Id'] for x in v]
   for eid in ids:
    e=next(x for x in snap['entities'] if x['entity_id']==eid)
    refs=[]
    for p in [*ROOT.glob('*.yaml'),*ROOT.glob('packages/**/*.yaml'),*ROOT.glob('.storage/lovelace*')]:
     for n,l in enumerate(p.read_text(errors='replace').splitlines(),1):
      if eid in l or (e.get('device_id') and e['device_id'] in l):refs.append([str(p),n,l[:200]])
    print('TARGET',eid,'REFS',refs)
   if os.environ.get('HAGHS_APPLY')!='yes':return
   for name in ['core.entity_registry','core.device_registry','core.label_registry']:
    shutil.copy2(ROOT/'.storage'/name,OUT/name)
   labels=await call('config/label_registry/list')
   ignore=next(x['label_id'] for x in labels if x['label_id']=='haghs_ignore')
   changes=[]
   for eid in ids:
    e=next(x for x in snap['entities'] if x['entity_id']==eid)
    st=next(x for x in snap['states'] if x['entity_id']==eid)
    if e['platform']=='uptime_kuma':
     await call('config/entity_registry/update',entity_id=eid,disabled_by='user'); action='disabled'
    elif e['platform']=='google_home':
     await call('config/entity_registry/update',entity_id=eid,labels=sorted(set(e['labels']+[ignore]))); action='haghs_ignore'
    else:
     assert st['attributes'].get('restored') and e['platform'] in ['portainer','music_assistant']
     await call('config/entity_registry/remove',entity_id=eid);action='removed'
    changes.append({'entity_id':eid,'action':action})
   (OUT/'changes.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2))
   await asyncio.sleep(10)
   await call('call_service',domain='homeassistant',service='update_entity',service_data={'entity_id':'sensor.system_ha_global_health_score'})
   await asyncio.sleep(3)
   after={}
   for key,typ in [('states','get_states'),('entities','config/entity_registry/list'),('devices','config/device_registry/list')]:after[key]=await call(typ)
   (OUT/'live_after.json').write_text(json.dumps(after,ensure_ascii=False))
   beforemap={x['entity_id']:x for x in snap['entities']};aftermap={x['entity_id']:x for x in after['entities']}
   removed=set(beforemap)-set(aftermap);expected={x['entity_id'] for x in changes if x['action']=='removed'}
   assert removed==expected,(removed,expected)
   changed={eid for eid in beforemap.keys() & aftermap.keys() if any(beforemap[eid].get(k)!=aftermap[eid].get(k) for k in ['labels','disabled_by'])}
   assert changed==set(ids)-expected,changed
   health=next(x for x in after['states'] if x['entity_id']=='sensor.system_ha_global_health_score')
   status={x['entity_id']:x['state'] for x in after['states'] if x['entity_id'] in ['sensor.tor_mimer_verifierad_backup_status','sensor.diskhalsa_och_lagring_status']}
   result={'removed':sorted(removed),'changed':sorted(changed),'health':health,'monitor_status':status}
   (OUT/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
   print('VERIFIED',health['state'],health['attributes']['zombie_count'],status)

asyncio.run(main())
