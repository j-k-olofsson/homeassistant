import sys,json,asyncio,collections
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,HA,dump
async def main():
 B=RUN/'09-id-klimatsensorer/after';es=json.load(open(B/'entities.json'));ds=json.load(open(B/'devices.json'));dm={d['id']:d for d in ds};sm={s['entity_id']:s for s in json.load(open(B/'states.json'))};platforms=collections.defaultdict(set)
 for e in es:
  if e.get('device_id'):platforms[e['device_id']].add(e['platform'])
 primary={o['id'] for f in DOC.glob('etapp-*.json') for o in json.load(open(f))['operations']if o['kind']=='device'}
 candidates=[d for d in ds if d['id']in primary and platforms[d['id']]&{'esphome','shelly','xiaomi_ble','bthome','matter'}]
 planned={};links={};conflicts=[]
 async with HA()as ha:
  for d in candidates:
   linked=(await ha.call('config/device_registry/list_linked_devices',device_id=d['id']))['linked_devices'];links[d['id']]=linked
   name=d.get('name_by_user')or d.get('name')or''
   for did in linked:
    if did not in dm or platforms[did]-{'openwrt'}:continue
    target=(name,d.get('area_id'))
    if did in planned and planned[did]!=target:conflicts.append((did,planned[did],target))
    planned[did]=target
 assert not conflicts,conflicts
 ops=[];changed=set()
 for did,(new,area)in planned.items():
  d=dm[did]
  if (d.get('name_by_user')or d.get('name'))!=new or d.get('area_id')!=area:
   ops.append({'kind':'device','id':did,'before':{'name_by_user':d.get('name_by_user'),'area_id':d.get('area_id')},'after':{'name_by_user':new,'area_id':area}});changed.add(did)
 for e in es:
  if e.get('device_id')not in changed:continue
  before={};after={};old=sm.get(e['entity_id'],{}).get('attributes',{}).get('friendly_name')
  if e['entity_id'].startswith('device_tracker.')and e.get('name')!='':before['name']=e.get('name');after['name']=''
  if old and old not in(e.get('aliases')or[]):before['aliases']=e.get('aliases',[]);after['aliases']=list(e.get('aliases')or[])+[old]
  if after:ops.append({'kind':'entity','id':e['entity_id'],'before':before,'after':after})
 dump(RUN/'linked_device_name_evidence.json',{'links':links,'canonical_names':{k:list(v)for k,v in planned.items()}})
 dump(DOC/'etapp-10-lankade-natverksenheter.json',{'stage':'10-lankade-natverksenheter','description':'Samma namn och område för OpenWrt-poster som HA kopplar till samma fysiska enhet via gemensam anslutningsidentitet.','operations':ops})
 print('LINKED_NETWORK_PLAN',len(changed),'device records',len(ops),'operations')
asyncio.run(main())
