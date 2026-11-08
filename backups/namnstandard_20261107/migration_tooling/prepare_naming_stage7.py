import sys,json,re
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,dump
B=RUN/'checkpoint-after-names';es=json.load(open(B/'entities.json'));ds=json.load(open(B/'devices.json'));sm={s['entity_id']:s for s in json.load(open(B/'states.json'))}
ops=[];changed=set();prefixes={'sovrum':'sovrummet','ateljé':'ateljen','kök':'kok','verandan':'verndan','entrén':'entren','toalett':'toaletten'}
for d in ds:
 old=d.get('name_by_user')or d.get('name')or'';new=old;area=d.get('area_id');new_area=area
 if old.startswith('LED-list (')and area=='ha_admin':
  inside=old[len('LED-list ('):-1];room=next((k for k in prefixes if inside==k or inside.startswith(k+' ')),None);assert room,old
  new_area=prefixes[room];detail=inside[len(room):].strip();new='LED-list'+(' '+detail if detail else'')
 elif old=='Taklampor (köket)':new_area='kok';new='Taklampor ESPHome'
 elif old=='Blomlampa 2 (verandan)':new='Blomlampa 2'
 if new!=old or new_area!=area:
  before={'name_by_user':d.get('name_by_user'),'area_id':area};after={'name_by_user':new,'area_id':new_area}
  ops.append({'kind':'device','id':d['id'],'before':before,'after':after});changed.add(d['id'])
for e in es:
 if e.get('device_id')not in changed:continue
 old=sm.get(e['entity_id'],{}).get('attributes',{}).get('friendly_name')
 if old and old not in(e.get('aliases')or[]):ops.append({'kind':'entity','id':e['entity_id'],'before':{'aliases':e.get('aliases',[])},'after':{'aliases':list(e.get('aliases')or[])+[old]}})
dump(DOC/'etapp-07-bekraftade-rum.json',{'stage':'07-bekraftade-rum','description':'Områden enligt användarens besked: kökslampor och LED-lister. Frösåddslampans driftstatus ändras inte.','operations':ops})
print('AREA PLAN',len(changed),'devices',len(ops),'operations')
