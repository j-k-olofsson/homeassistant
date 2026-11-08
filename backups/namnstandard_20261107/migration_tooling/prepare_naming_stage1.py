import sys,json,pathlib,csv
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,dump
B=RUN/'live_baseline';es=json.loads((B/'entities.json').read_text());ds=json.loads((B/'devices.json').read_text());sm={s['entity_id']:s for s in json.loads((B/'states.json').read_text())};dm={d['id']:d for d in ds}
climate={e['device_id'] for e in es if e['platform']=='xiaomi_ble' and e['original_name'] in ['Humidity','Voltage']}
operations=[]
for d in ds:
 if d['id'] in climate and (d.get('name_by_user') or d.get('name'))!='Klimatsensor':operations.append({'kind':'device','id':d['id'],'before':{'name_by_user':d.get('name_by_user')},'after':{'name_by_user':'Klimatsensor'}})
translation={'Temperature':'Temperatur','Humidity':'Luftfuktighet','Battery':'Batterinivå','Voltage':'Spänning','Signal Strength':'Signalstyrka','Illuminance':'Belysningsstyrka','Moisture':'Jordfuktighet','Conductivity':'Ledningsförmåga','Fukt':'Jordfuktighet','Batteri':'Batterinivå','Temperatur':'Temperatur','Signalstyrka':'Signalstyrka','Belysningsstyrka':'Belysningsstyrka','Ledningsförmåga':'Ledningsförmåga'}
for e in es:
 if e['platform']!='xiaomi_ble':continue
 new=translation[e['original_name']]
 old=e.get('name')
 if (old if old is not None else e['original_name'])==new:continue
 d=dm[e['device_id']];oldfull=sm.get(e['entity_id'],{}).get('attributes',{}).get('friendly_name') or ' '.join(x for x in [d.get('name_by_user') or d.get('name'),old or e['original_name']] if x)
 aliases=list(e.get('aliases') or [])
 if oldfull not in aliases:aliases.append(oldfull)
 operations.append({'kind':'entity','id':e['entity_id'],'before':{'name':old,'aliases':e.get('aliases',[])},'after':{'name':new,'aliases':aliases}})
dump(DOC/'etapp-01-klimat-och-plantsensorer.json',{'stage':'01-klimat-och-plantsensorer','description':'Enhetliga visningsnamn för Xiaomi BLE-klimatsensorer och plantsensorer. Oförändrade ID:n och områden.','operations':operations})
print('PLAN stage01',len(operations),'devices',sum(o['kind']=='device' for o in operations),'entities',sum(o['kind']=='entity' for o in operations))
