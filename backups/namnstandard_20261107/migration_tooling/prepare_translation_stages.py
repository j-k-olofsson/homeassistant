import json,pathlib,re,sys,collections
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,dump
B=RUN/'10-lankade-natverksenheter/after';es=json.load(open(B/'entities.json'));dm={d['id']:d for d in json.load(open(B/'devices.json'))};sm={s['entity_id']:s for s in json.load(open(B/'states.json'))}
def pairs(text):return dict(line.split('|',1)for line in text.strip().splitlines())
network=pairs('''Connected|Anslutning
Reboot Required|Omstart krävs
WPS Active|WPS aktivt
Reboot Router|Starta om router
Start WPS|Starta WPS
Cancel WPS|Avbryt WPS
Create Backup|Skapa säkerhetskopia
Flush DNS Cache|Töm DNS-cache
CPU Usage|Processoranvändning
Public IP|Publik IP-adress
Memory Usage|Minnesanvändning
Memory Used|Använt minne
Swap Usage|Växlingsminnesanvändning
Load (1m)|Belastning senaste minuten
Load (5m)|Belastning senaste 5 minuterna
Load (15m)|Belastning senaste 15 minuterna
Uptime|Upptid
Temperature|Temperatur
Storage Usage|Diskanvändning
Filesystem Free|Ledigt diskutrymme
Kernel Version|Kärnversion
Architecture|Arkitektur
Connected Clients|Anslutna klienter
Wireless Clients|Trådlösa klienter
Neighbor Devices|Grannenheter
System Logs|Systemloggar
Top Processes|Processöversikt
USB Devices|USB-enheter
DHCP Leases|DHCP-tilldelningar
WAN Latency|WAN-svarstid
Reconnect WAN|Återanslut WAN
Connection Tracking|Anslutningsspårning
Physical radio|Fysisk radio
New Device|Ny enhet
Signal Strength|Signalstyrka
RX Rate|Mottagningshastighet
TX Rate|Sändningshastighet
Noise Level|Brusnivå
Internet Access|Internetåtkomst
Traffic Rx|Mottagen datamängd
Traffic Tx|Skickad datamängd
Clients|Klienter
Channel|Kanal
TX Power|Sändareffekt
HT Mode|HT-läge
Hardware Mode|Hårdvaruläge
Disconnect device|Koppla från enhet
Signal Quality|Signalkvalitet
Bitrate|Bithastighet
Transmit power|Sändareffekt''')
mobile=pairs('''Detected activity|Identifierad aktivitet
Sleep confidence|Säkerhet i sömndetektering
Sleep segment|Sömnperiod
Current version|Appversion
App Rx GB|Appens mottagna data
App Tx GB|Appens skickade data
App memory|Appens minnesanvändning
App inactive|Appen inaktiv
App importance|Appens prioritet
Ringer mode|Ringsignalläge
Audio mode|Ljudläge
Headphones|Hörlurar
Mic muted|Mikrofon avstängd
Speakerphone|Högtalartelefon
Music active|Musik aktiv
Volume level alarm|Alarmvolym
Volume level call|Samtalsvolym
Volume level music|Musikvolym
Volume level ringer|Ringsignalvolym
Volume level notification|Aviseringsvolym
Volume level system|Systemvolym
Volume level DTMF|Knappvalsvolym
Volume level accessibility|Tillgänglighetsvolym
Battery level|Batterinivå
Battery state|Batteristatus
Is charging|Laddar
Charger type|Laddartyp
Battery health|Batterihälsa
Battery temperature|Batteritemperatur
Battery power|Batterieffekt
Bluetooth connection|Bluetooth-anslutning
Bluetooth state|Bluetooth-status
BLE transmitter|BLE-sändare
Beacon monitor|Övervakning av Bluetooth-sändare
Screen brightness|Skärmljusstyrka
Screen off timeout|Tid till skärmavstängning
Do Not Disturb sensor|Stör ej-läge
Work profile|Arbetsprofil
Geocoded location|Platsadress
Device locked|Enheten låst
Device secure|Enheten skyddad
Keyguard locked|Skärmlåset låst
Keyguard secure|Skärmlåset skyddat
Last used app|Senast använda app
Last reboot|Senaste omstart
Last update trigger|Senaste uppdateringsorsak
Light sensor|Belysningsstyrka
High accuracy mode|Platsläge med hög precision
High accuracy update interval|Uppdateringsintervall för hög precision
Mobile data|Mobildata
Mobile data roaming|Dataroaming
WiFi connection|Wi-Fi-anslutning
WiFi BSSID|Wi-Fi BSSID
WiFi IP address|Wi-Fi IP-adress
WiFi link speed|Wi-Fi-länkhastighet
WiFi state|Wi-Fi-status
WiFi frequency|Wi-Fi-frekvens
WiFi signal strength|Wi-Fi-signalstyrka
Public IP address|Publik IP-adress
Network type|Nätverkstyp
Next alarm|Nästa alarm
Last notification|Senaste avisering
Last removed notification|Senast borttagna avisering
Active notification count|Antal aktiva aviseringar
Media session|Mediasession
Phone state|Telefonstatus
Interactive|Skärmen interaktiv
Doze mode|Viloläge
Power save|Energisparläge
Pressure sensor|Lufttryck
Proximity sensor|Närhetssensor
Steps sensor|Steg
Internal storage|Intern lagring
External storage|Extern lagring
Current time zone|Aktuell tidszon
Total Rx GB|Totalt mottagna data
Total Tx GB|Totalt skickade data
OS version|Operativsystemsversion
Security patch|Säkerhetsuppdatering
Car battery|Bilens batterinivå
Car name|Bilens namn
Car charging status|Bilens laddningsstatus
Car EV connector type|Bilens laddkontakt
Car fuel|Bilens bränslenivå
Car fuel type|Bilens bränsletyp
Car odometer|Bilens vägmätare
NFC state|NFC-status
App standby bucket|Appens energisparklass
Wi-Fi connection|Wi-Fi-anslutning
Wi-Fi BSSID|Wi-Fi BSSID
Wi-Fi IP address|Wi-Fi IP-adress
Wi-Fi link speed|Wi-Fi-länkhastighet
Wi-Fi state|Wi-Fi-status
Wi-Fi frequency|Wi-Fi-frekvens
Wi-Fi signal strength|Wi-Fi-signalstyrka
Hotspot state|Internetdelningsstatus
IPv6 addresses|IPv6-adresser
Remaining charge time|Återstående laddningstid
Screen orientation|Skärmriktning
Screen rotation|Skärmrotation
Car speed|Bilens hastighet
Car range remaining|Bilens återstående räckvidd
Accent color|Accentfärg
Signal strength (SIM 1)|Signalstyrka SIM 1
Signal strength (SIM 2)|Signalstyrka SIM 2
Data network type (SIM 1)|Datanätverkstyp SIM 1
Data network type (SIM 2)|Datanätverkstyp SIM 2
Heart rate|Puls
Active calories burned|Aktiv energiförbrukning
Daily distance|Dagens sträcka
Daily elevation gained|Dagens stigning
Daily floors|Dagens våningar
Daily steps|Dagens steg
Total calories burned|Total energiförbrukning
Mobile Rx GB|Mottagna mobildata
Mobile Tx GB|Skickade mobildata
Battery cycle count|Antal battericykler
Blood glucose|Blodsocker
Body fat|Kroppsfett
Diastolic blood pressure|Diastoliskt blodtryck
Heart rate variability|Pulsvariation
Oxygen saturation|Syremättnad
Respiratory rate|Andningsfrekvens
Resting heart rate|Vilopuls
Sleep duration|Sömnlängd
Systolic blood pressure|Systoliskt blodtryck
Weight|Vikt
Basal body temperature|Basal kroppstemperatur
Basal metabolic rate|Basal ämnesomsättning
Body temperature|Kroppstemperatur
Body water mass|Kroppsvattenmassa
Bone mass|Benmassa
Height|Längd
Daily hydration|Dagens vätskeintag
Lean body mass|Fettfri kroppsmassa''')
for i in [1,2]:mobile['SIM '+str(i)]='SIM '+str(i)
mobile['Android Auto']='Android Auto';mobile['VO2 max']='VO2 max'
interface={'RX':'Mottagen datamängd','TX':'Skickad datamängd','RX Rate':'Mottagningshastighet','TX Rate':'Sändningshastighet','Link Speed':'Länkhastighet','Uptime':'Upptid','IPv4 Address':'IPv4-adress','IPv6 Address':'IPv6-adress','Connected':'Anslutning'}
mount={'Total Storage':'Totalt diskutrymme','Used Storage':'Använt diskutrymme','Free Storage':'Ledigt diskutrymme','Storage Usage':'Diskanvändning'}
opsby=collections.defaultdict(list)
for e in es:
 plat=e['platform'];old=e.get('name');raw=e.get('original_name')or'';d=dm.get(e.get('device_id'),{});base=raw
 if plat not in ['openwrt','mobile_app']:continue
 # Preserve manually meaningful names, including names already standardized in earlier stages.
 if old is not None:continue
 for prefix in [d.get('name_by_user'),d.get('name')]:
  if prefix and base.lower().startswith(prefix.lower()+' '):base=base[len(prefix)+1:];break
 table=network if plat=='openwrt'else mobile
 new=next((v for k,v in table.items()if k.lower()==base.lower()),None)
 if new is None and plat=='openwrt':
  for prefix,translation in [('Service ','Tjänst '),('Restart ','Starta om tjänst '),('Stop ','Stoppa tjänst '),('Firewall Rule: ','Brandväggsregel '),('Temperature Zone ','Temperatur zon '),('Temperature Hwmon ','Temperatur hwmon '),('WPS Push ','Starta WPS '),('Wi-Fi QR Code ','Wi-Fi QR-kod ')]:
   if base.startswith(prefix):new=translation+base[len(prefix):];break
  if new is None:
   for suffix,translation in sorted(interface.items(),key=lambda p:len(p[0]),reverse=True):
    if base.endswith(' '+suffix):new=translation+' '+base[:-len(suffix)-1];break
  if new is None:
   for suffix,translation in mount.items():
    if base.endswith(' '+suffix):new=translation+' '+base[:-len(suffix)-1];break
 if new is None or new==raw:continue
 oldfull=sm.get(e['entity_id'],{}).get('attributes',{}).get('friendly_name')or' '.join(x for x in[d.get('name_by_user')or d.get('name'),raw]if x)
 aliases=list(e.get('aliases')or[])
 if oldfull and oldfull not in aliases:aliases.append(oldfull)
 opsby[plat].append({'kind':'entity','id':e['entity_id'],'before':{'name':old,'aliases':e.get('aliases',[])},'after':{'name':new,'aliases':aliases}})
dump(DOC/'namnordlista.json',{'openwrt':network,'mobile_app':mobile,'network_interface_functions':interface,'filesystem_functions':mount})
for platform,ops in opsby.items():
 for index,start in enumerate(range(0,len(ops),250),1):
  stage=f'11-{platform}-namn-{index:02d}';dump(DOC/('etapp-'+stage+'.json'),{'stage':stage,'description':'Svenska funktionsnamn enligt granskad ordlista. Inga ID:n, inställningar eller värden ändras.','operations':ops[start:start+250]})
 print(platform,'name candidates',len(ops),'batches',(len(ops)+249)//250)
