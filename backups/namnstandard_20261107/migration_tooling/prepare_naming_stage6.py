import sys,json,collections,re
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,dump
B=RUN/'04-hjalpare-grupper-automationer/after';es=json.load(open(B/'entities.json'));dm={d['id']:d for d in json.load(open(B/'devices.json'))};sm={s['entity_id']:s for s in json.load(open(B/'states.json'))}
entries={e['entry_id']:e for e in json.load(open(ROOT/'.storage/core.config_entries'))['data']['entries'] if e['domain']=='powercalc'}
T={'Illuminance':'Belysningsstyrka','Conductivity':'Ledningsförmåga','Soil moisture':'Jordfuktighet','Temperature':'Temperatur','Air humidity':'Luftfuktighet','PPFD':'PPFD','Total ppfd (mol) Integral':'Ackumulerad ljusmängd','dli':'Daglig ljusmängd','CO2':'Koldioxid','Soil temperature':'Jordtemperatur','dli 24h':'Ljusmängd senaste dygnet','Lux to PPFD factor':'Omräkningsfaktor lux till PPFD','Vapour pressure deficit':'Ångtrycksunderskott'}
limits={'soil moisture':'jordfuktighet','temperature':'temperatur','illuminance':'belysningsstyrka','conductivity':'ledningsförmåga','air humidity':'luftfuktighet','DLI':'daglig ljusmängd','CO2':'koldioxid','soil temperature':'jordtemperatur','VPD':'ångtrycksunderskott'}
for key,value in limits.items():T['Max '+key]='Högsta '+value;T['Min '+key]='Lägsta '+value
power=[]
for e in es:
 if e['platform']!='powercalc':continue
 entry=entries.get(e.get('config_entry_id'),{});source=entry.get('data',{}).get('entity_id','');orig=e.get('original_name')or''
 if e['entity_id'].endswith('_daily'):function='Beräknad energi idag'
 elif e['entity_id'].endswith('_weekly'):function='Beräknad energi denna vecka'
 elif e['entity_id'].endswith('_monthly'):function='Beräknad energi denna månad'
 elif 'power'in orig.lower() or e.get('original_device_class')=='power':function='Beräknad effekt'
 else:function='Beräknad energi'
 power.append((e,source,function))
groups=collections.Counter((e.get('device_id'),func)for e,src,func in power if e.get('device_id'))
ops=[]
for e in es:
 orig=e.get('original_name')or'';old=e.get('name');current=old if old is not None else orig;new=None
 if e['platform']=='plant'and orig in T:new=T[orig]
 if e['platform']=='powercalc':
  _,source,new=next(x for x in power if x[0]['entity_id']==e['entity_id'])
  if e.get('device_id')and groups[(e['device_id'],new)]>1:
   new+=' belysning'if source.startswith('light.')else' brytare'if source.startswith('switch.')else' '+source.split('.')[0]
  if not e.get('device_id'):
   if e['entity_id']=='sensor.all_standby_power':new='Beräknad standbyeffekt totalt'
   elif e['entity_id']=='sensor.all_standby_energy':new='Beräknad standbyenergi totalt'
   else:
    label=re.sub(r'\s*(?:Device )?(?:Power|Energy|power|energy)$','',orig).strip();new=label+' – '+new.lower()
 if new is None or current==new:continue
 aliases=list(e.get('aliases')or[]);d=dm.get(e.get('device_id'),{});oldfull=sm.get(e['entity_id'],{}).get('attributes',{}).get('friendly_name')or' '.join(x for x in[d.get('name_by_user')or d.get('name'),current]if x)
 if oldfull and oldfull not in aliases:aliases.append(oldfull)
 ops.append({'kind':'entity','id':e['entity_id'],'before':{'name':old,'aliases':e.get('aliases',[])},'after':{'name':new,'aliases':aliases}})
# Guard that the new names distinguish sensors within every powercalc device.
proposed={o['id']:o['after']['name']for o in ops}
seen={}
for e,src,func in power:
 if e.get('device_id'):
  key=(e['device_id'],e['entity_id'].split('.')[0],proposed.get(e['entity_id'],e.get('name')or e.get('original_name')))
  assert key not in seen,('Ambiguous calculated sensor',e['entity_id'],seen.get(key));seen[key]=e['entity_id']
dump(DOC/'etapp-06-vaxt-och-energisensorer.json',{'stage':'06-vaxt-och-energisensorer','description':'Svenska funktionsnamn för växtövervakning och tydligt åtskild beräknad energi/effekt.','operations':ops})
print('PLAN',len(ops),'entity names')
