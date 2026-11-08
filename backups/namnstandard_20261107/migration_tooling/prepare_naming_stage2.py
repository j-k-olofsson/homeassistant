import sys,json,re,collections
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,dump,slug
B=RUN/'01-klimat-och-plantsensorer/after';es=json.load(open(B/'entities.json'));ds=json.load(open(B/'devices.json'));sm={s['entity_id']:s for s in json.load(open(B/'states.json'))};dm={d['id']:d for d in ds};am={a['area_id']:a['name'] for a in json.load(open(B/'areas.json'))}
variants={'ateljen':['atelje','ateljen'],'duschen':['dusch','duschen'],'entren':['entre','entren'],'kontoret':['kontor','kontoret'],'kok':['kok','koket'],'sovrummet':['sovrum','sovrummet'],'toaletten':['toalett','toaletten'],'verndan':['veranda','verandan'],'hemmabion':['bio','bion','hemmabio','hemmabion','kallaren'],'gamla_verkstan':['gamla verkstan','gamla verkstaden'],'verkstan':['verkstan','verkstad','verkstaden'],'vinden':['vinden'],'friggan':['friggan'],'honshuset':['honshus','honshuset'],'pool':['pool','poolen'],'utomhus':['utomhus']}
T={'Firmware':'Firmware','Status':'Anslutning','Light':'','Relay State':'','Light Power':'Ljuseffekt','Light Voltage':'Ljusspänning','Light Current':'Ljusström','Voltage':'Spänning','Current':'Ström','Power':'Effekt','Energy':'Energi','Thread Device Role':'Thread-enhetsroll','Thread RLOC16':'Thread RLOC16','Thread Extended Address':'Thread-adress','Temperature':'Temperatur','Power Factor':'Effektfaktor','Apparent Power':'Skenbar effekt','Reactive Power':'Reaktiv effekt','Apply Scene':'Aktivera scen','Thermostat':'','Daily Energy':'Energi idag','Power Factor Template':'Effektfaktor beräknad','Total Daily Energy':'Energi idag','Wifi RSSI':'Wi-Fi-signalstyrka','Wifi BSSID':'Wi-Fi BSSID','Humidity':'Luftfuktighet','LPG level':'Gasolnivå','Room Temperature':'Temperatur rum','Room Humidity':'Luftfuktighet rum','Box Temperature':'Temperatur frysbox','Box Humidity':'Luftfuktighet frysbox','Water level':'Vattennivå','led light':'Belysning','Camera':'','markis':'','LED':'Belysning','DSMR Identification':'DSMR-identifikation','Electricity Failures':'Strömavbrott','Energy Consumed Luxembourg':'Förbrukad energi','ESPHome Version':'ESPHome-version','Long Electricity Failures':'Långa strömavbrott','SlimmeLezer Uptime':'Upptid','Power Consumed':'Förbrukad effekt','Fan':'','Cover':'','Restart':'Starta om','Mute':'Mikrofon avstängd','Wake sound':'Väckningsljud','Media Player':'Mediaspelare','Button press':'Knapptryckning','Wake word sensitivity':'Väckordskänslighet','UV Ambient':'Omgivningsljus råvärde','UV Index':'UV-index','Illuminance':'Belysningsstyrka','Infrared':'Infrarött råvärde','Apply Growlight Scene':'Aktivera växtbelysningsscen','Growlight':'Växtbelysning','ESP32 Temperature':'Enhetstemperatur','Disable physical controls':'Inaktivera fysiska reglage','Salt level':'Saltnivå','UV Counts':'UV-råvärde'}
for i in range(1,4):
 T[f'Current Phase {i}']=f'Ström fas {i}';T[f'Voltage Phase {i}']=f'Spänning fas {i}';T[f'Power Consumed Phase {i}']=f'Effekt fas {i}'
for i in range(1,5):T[f'Input {i}']=f'Ingång {i}'
for row in range(1,5):
 for col in range(1,3):T[f'RfRemoteR{row}C{col}']=f'RF-fjärrkontroll rad {row} knapp {col}'
for i in range(1,4):T[f'RfWallSwitch{i}']=f'RF-väggknapp {i}'
T.update({'Lexicon - Volume UP':'Lexicon höj volym','Lexicon - Volume DOWN':'Lexicon sänk volym','Lexicon - DVD1':'Lexicon DVD 1','Lexicon - DVD2':'Lexicon DVD 2','Lexicon - Playstation':'Lexicon PlayStation','Benq ON':'BenQ slå på','Benq OFF':'BenQ stäng av','Benq Mute':'BenQ ljud av'})
# Preserve individually meaningful functions on multi-function devices.
OV={'light.esphome53_led_light':'Belysning','light.esphome53_esphome53_light':'Julgransbelysning','sensor.esphome30_esphome30_total_daily_energy':'Energi idag','sensor.esphome31_esphome31_total_daily_energy':'Energi idag'}
ops=[];changed_devices={};espdev={e['device_id'] for e in es if e['platform']=='esphome'}
for d in ds:
 if d['id'] not in espdev:continue
 old=d.get('name_by_user')or d.get('name')or'';new=old
 for suffix in re.findall(r'\(([^)]*)\)',old):
  if slug(suffix).replace('_',' ') in variants.get(d.get('area_id'),[]):new=new.replace('('+suffix+')','').strip()
 if new.startswith('Ledstrip'):new=new.replace('Ledstrip','LED-list',1)
 if new=='RF bridge':new='RF-brygga'
 if new=='IR gateway':new='IR-gateway'
 if new=='Esp32 kamera':new='ESP32-kamera'
 if new=='Poolbelysning & temp':new='Poolbelysning och temperatur'
 if new=='TempHyg':new='Klimatsensor'
 if new!=old:
  changed_devices[d['id']]=new;ops.append({'kind':'device','id':d['id'],'before':{'name_by_user':d.get('name_by_user')},'after':{'name_by_user':new}})
# Do not turn ambiguous locations into a new area assignment.
misses=[]
for e in es:
 if e['platform']!='esphome':continue
 old=e.get('name');base=re.sub(r'^esphome\d+\s+','',e.get('original_name')or'');new=OV.get(e['entity_id'],T.get(base))
 if new is None:
  if re.match(r'IR (Transmitter|Receiver)',base):new='IR-sändare' if 'Transmitter'in base else'IR-mottagare'
  elif base.startswith('LED strip'):new=base.replace('LED strip','LED-list')
  else:misses.append((e['entity_id'],base));continue
 if new=='' and e['entity_id'].split('.')[0] not in ['light','switch','climate','cover','fan','camera']:raise ValueError(e['entity_id'])
 # Do not collapse multiple control channels into identical main entities.
 controls=[x for x in es if x['platform']=='esphome' and x.get('device_id')==e.get('device_id') and x['entity_id'].split('.')[0]==e['entity_id'].split('.')[0] and re.sub(r'^esphome\d+\s+','',x.get('original_name')or'') in ['Light','Relay State','led light','Growlight']]
 if new=='' and len(controls)>1:new='Belysning' if base=='Light' else 'Relä'
 before={};after={}
 if (old if old is not None else e.get('original_name'))!=new:before['name']=old;after['name']=new
 if after or e.get('device_id')in changed_devices:
  d=dm.get(e.get('device_id'),{});oldfull=sm.get(e['entity_id'],{}).get('attributes',{}).get('friendly_name')
  if not oldfull:oldfull=' '.join(x for x in [d.get('name_by_user')or d.get('name'),old if old is not None else e.get('original_name')]if x)
  aliases=list(e.get('aliases')or[])
  if oldfull and oldfull not in aliases:aliases.append(oldfull);before['aliases']=e.get('aliases',[]);after['aliases']=aliases
 if after:ops.append({'kind':'entity','id':e['entity_id'],'before':before,'after':after})
# Capture historical aliases for additional integrations sharing renamed devices.
for e in es:
 if e['platform']=='esphome' or e.get('device_id')not in changed_devices:continue
 oldfull=sm.get(e['entity_id'],{}).get('attributes',{}).get('friendly_name')
 if oldfull and oldfull not in (e.get('aliases')or[]):ops.append({'kind':'entity','id':e['entity_id'],'before':{'aliases':e.get('aliases',[])},'after':{'aliases':list(e.get('aliases')or[])+[oldfull]}})
plan={'stage':'02-esphome-visningsnamn','description':'Svenska funktionsnamn och tydliga enhetsnamn i HA. Firmware, områden och tekniska identiteter oförändrade.','operations':ops,'unmapped_names':misses}
dump(DOC/'etapp-02-esphome-visningsnamn.json',plan)
print('PLAN',len(ops),'devices',len(changed_devices),'unmapped',misses)
print('DEVICES',changed_devices)
