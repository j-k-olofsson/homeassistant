import sys,json,re
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,dump,slug
B=RUN/'02-esphome-visningsnamn/after';es=json.load(open(B/'entities.json'));ds=json.load(open(B/'devices.json'));sm={s['entity_id']:s for s in json.load(open(B/'states.json'))};dm={d['id']:d for d in ds}
manual_devices={'076c2ebaa51875bb440a42739602d564':'Vattensensor torkskåp','c625aacb05f0aaf9a190446f7fa560d4':'Balkongdörr','d20e95d12fc062ba28934ae290341031':'LED-plafonder','57e88ba04471e052a1fc0bbefa6ec9bf':'Shelly Pro 3','71f3182e4acc54323071e4b8456782fe':'Taklampor','0aaa0df0aa35b88522795c517f3c27f7':'Luftkompressor','aad98607dbb4df7bf25d10bab95ef936':'Spånsug','726bee2f9efa222cf68c48c9019dc7fa':'LED-stjärnor'}
for d in ds:
 old=d.get('name_by_user')or d.get('name')or''
 if old.startswith('Golvvärme (') and d.get('area_id') in ['hemmabion','verndan','entren','ateljen','kok','duschen']:manual_devices[d['id']]='Golvvärme'
 if old in ['Väggkontakt x2 (verandan)','Taklampor (verandan)','Julstjärnor (verandan)']:manual_devices[d['id']]=old.split(' (')[0]
ops=[];renamed=set()
for did,new in manual_devices.items():
 d=dm[did]
 if (d.get('name_by_user')or d.get('name'))!=new:ops.append({'kind':'device','id':did,'before':{'name_by_user':d.get('name_by_user')},'after':{'name_by_user':new}});renamed.add(did)
TBN={'Battery replaced':'Batteri bytt','Battery type':'Batterityp','Battery last replaced':'Senaste batteribyte','Battery+':'Batteriinformation','Battery low':'Låg batterinivå'}
TB={'Window':'Öppning','Packet Id':'Paket-ID','Battery':'Batterinivå','Illuminance':'Belysningsstyrka','Rotation':'Vinkel','Signal Strength':'Signalstyrka'}
TC={'Selected Program':'Valt program','Active Program':'Aktivt program','Connected':'Anslutning','Programs':'Program','Pause':'Pausa','Stop':'Stoppa','Start':'Starta','Program Name':'Programnamn','Base Program':'Basprogram','Remaining Program Time':'Återstående programtid','Program Progress':'Programförlopp','Programme Mode':'Programläge','AutoStain':'Fläckbehandling','Hygiene Care':'Hygienvård','Wrinkle Guard Boost':'Förstärkt skrynkelskydd','Drying Target':'Torkmål','Smart Start Enabled':'Smart start aktiverad'}
TO={'C200C minorStream':'Videoström låg upplösning','C200C mainStream':'Videoström hög upplösning','C200C Reboot':'Starta om','C200C Set System Date and Time':'Synkronisera datum och tid','C200C Cell Motion Detection':'Rörelsedetektering','C200C Person Detection':'Persondetektering'}
for e in es:
 eid=e['entity_id'];platform=e['platform'];orig=e.get('original_name');old=e.get('name');new=None;change=False
 if platform=='shelly':
  if orig is not None:new='Batterinivå' if orig=='Batteri' else orig;change=True
  elif old in ['Relä','LED-plafonder','Taklampor','Luftkompressor','Spånsug']:new='';change=True
 elif platform=='switch_as_x' and eid in ['light.shellyplug_s_083a8dc344dd','light.shellypro3_ec626089edbc_switch_0']:new='';change=True
 elif platform=='battery_notes':new=TBN[orig];change=True
 elif platform=='bthome':new=TB[orig];change=True
 elif platform=='onvif' and orig in TO:new=TO[orig];change=True
 elif platform=='home_connect_alt':
  base=old if old is not None else orig
  if base:
   base=re.sub(r'^Siemens (?:Kombinerad tvätt/tork|Tvätt/tork|Diskmaskin) - ','',base);new=TC.get(base,base);change=True
 elif platform=='generic_thermostat':new='';change=True
 before={};after={}
 if change and (old if old is not None else orig)!=new:before['name']=old;after['name']=new
 if after or e.get('device_id')in renamed:
  d=dm.get(e.get('device_id'),{});oldfull=sm.get(eid,{}).get('attributes',{}).get('friendly_name')
  if not oldfull:oldfull=' '.join(x for x in [d.get('name_by_user')or d.get('name'),old if old is not None else orig]if x)
  aliases=list(e.get('aliases')or[])
  if oldfull and oldfull not in aliases:aliases.append(oldfull);before['aliases']=e.get('aliases',[]);after['aliases']=aliases
 if after:ops.append({'kind':'entity','id':eid,'before':before,'after':after})
plan={'stage':'03-shelly-vitvaror-batterier','description':'Enhetliga visningsnamn för Shelly, vitvaror, batteriinformation, kamera och termostater. Oförändrade ID:n och områden.','operations':ops}
dump(DOC/'etapp-03-shelly-vitvaror-batterier.json',plan)
print('PLAN',len(ops),'devices',len(renamed),'entity_names',sum('name'in o['after'] for o in ops))
