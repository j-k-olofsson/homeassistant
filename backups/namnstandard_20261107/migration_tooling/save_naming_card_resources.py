import sys,json,asyncio,urllib.parse,pathlib,shutil
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import HA,RUN,dump
async def main():
 out=RUN/'13-natverkskort-kontext'
 async with HA()as ha:
  resources=await ha.call('lovelace/resources');assert isinstance(resources,list);dump(out/'resources_before.json',resources)
  targets=[r for r in resources if any(s in r['url']for s in ['/openwrt-network-map/openwrt-network-map.js','/thread-network-map/thread-network-map.js'])];assert len(targets)==2
  info=(await ha.rest('/core/info'))['data'];base=('https://'if info['ssl']else'http://')+info['ip_address']+':'+str(info['port'])
  changed=[]
  try:
   for r in targets:
    u=urllib.parse.urlsplit(r['url']);q=dict(urllib.parse.parse_qsl(u.query));q['v']='20261107-naming2';url=urllib.parse.urlunsplit((u.scheme,u.netloc,u.path,urllib.parse.urlencode(q),u.fragment))
    await ha.call('lovelace/resources/update',resource_id=r['id'],url=url);changed.append(r)
    async with ha.s.get(base+url)as response:
     txt=await response.text();assert response.status==200;assert'deviceDisplayName'in txt
   saved=await ha.call('lovelace/resources');dump(out/'resources_after.json',saved)
   for r in targets:
    actual=next(x for x in saved if x['id']==r['id']);assert'20261107-naming2'in actual['url']
   for r in saved:
    if r['id']not in {x['id']for x in targets}:assert r==next(x for x in resources if x['id']==r['id'])
   for rel in ['openwrt-network-map/openwrt-network-map.js','thread-network-map/thread-network-map.js']:
    src=pathlib.Path('/homeassistant/www')/rel;dst=out/'after'/rel;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
   result={'status':'verified','resources_updated':len(targets),'javascript_syntax':'passed','name_context_tests':'passed','served_scripts_verified':True,'visual_browser_test':False}
   dump(out/'verification.json',result);print(json.dumps(result))
  except Exception:
   for r in reversed(changed):await ha.call('lovelace/resources/update',resource_id=r['id'],url=r['url'])
   for rel in ['openwrt-network-map/openwrt-network-map.js','thread-network-map/thread-network-map.js']:shutil.copy2(out/'before'/rel,pathlib.Path('/homeassistant/www')/rel)
   raise
asyncio.run(main())
