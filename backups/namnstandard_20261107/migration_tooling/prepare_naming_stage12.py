import sys,json,re,collections
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import ROOT,RUN,DOC,dump
B=RUN/'11-openwrt-namn-20/after';es=json.load(open(B/'entities.json'));ds=json.load(open(B/'devices.json'));sm={s['entity_id']:s for s in json.load(open(B/'states.json'))};dm={d['id']:d for d in ds};ops=[];changed=set()
for d in ds:
 old=d.get('name_by_user')or d.get('name')or'';new=old
 if re.search(r' - AP ',old):new='Accesspunkt'
 elif re.search(r' - Router ',old):new='Router'
 elif re.search(r' - Switch ',old):new='Nätverksswitch'
 elif old=='Forecast Met.no':new='Väderprognos Met.no'
 elif old=='Home Connect Service':new='Home Connect'
 elif old=='Elkostnad t.o.m. idag':new='Energisammanställning'
 elif old=='Broadlink RM4 mini (köket)'and d.get('area_id')=='kok':new='IR-fjärrkontroll'
 if new!=old:ops.append({'kind':'device','id':d['id'],'before':{'name_by_user':d.get('name_by_user')},'after':{'name_by_user':new}});changed.add(d['id'])
port={'Behållare':'','Bild':'Avbildning','Återskapa containern':'Återskapa container','Döda container':'Avsluta container direkt','Antal behållare':'Antal containrar','Behållare som körs':'Containrar som körs','Behållare stoppade':'Stoppade containrar','Behållare pausade':'Pausade containrar','Avbildning version':'Avbildningsversion','Avbildning skapad':'Avbildningens skapandetid','Totalt CPU':'Antal processorer'}
toyota={'Last error':'Senaste fel','Last error code':'Senaste felkod'}
prusa={'Värmebädd temperatur':'Värmebäddens temperatur','Munstycke temperatur':'Munstyckets temperatur','Värmebädd måltemperatur':'Värmebäddens måltemperatur','Munstycke måltemperatur':'Munstyckets måltemperatur'}
manual={'sensor.smhi_temp_inkl_vindfaktor':'Upplevd utomhustemperatur','todo.digeos_backlog':'Diegos uppgifter','todo.ai_server':'IT hemma','event.bilresa_dual_button_knapp_1':'På','event.bilresa_dual_button_knapp_2':'Av','climate.sef_42h_climate':''}
for e in es:
 eid=e['entity_id'];old=e.get('name');orig=e.get('original_name')or'';current=old if old is not None else orig;new=manual.get(eid)
 if new is None:
  table=port if e['platform']=='portainer'else toyota if e['platform']=='toyota'else prusa if e['platform']=='prusalink'else{}
  new=table.get(orig)
 if e['platform']=='home_connect_alt'and orig in ['Home Connect Status','Home Connect Refresh','Home Connect Debug Info']:new={'Home Connect Status':'Status','Home Connect Refresh':'Uppdatera','Home Connect Debug Info':'Felsökningsinformation'}[orig]
 before={};after={}
 if new is not None and new!=current:before['name']=old;after['name']=new
 if after or e.get('device_id')in changed:
  d=dm.get(e.get('device_id'),{});oldfull=sm.get(eid,{}).get('attributes',{}).get('friendly_name')or' '.join(x for x in[d.get('name_by_user')or d.get('name'),current]if x)
  aliases=list(e.get('aliases')or[])
  if oldfull and oldfull not in aliases:before['aliases']=e.get('aliases',[]);after['aliases']=aliases+[oldfull]
 if after:ops.append({'kind':'entity','id':eid,'before':before,'after':after})
dump(DOC/'etapp-12-natverk-och-ovriga-namn.json',{'stage':'12-natverk-och-ovriga-namn','description':'Tydliga router-/accesspunktsnamn, återstående svenska funktionsnamn och korrigerade namn på virtuella funktioner.','operations':ops})
print('PLAN',len(ops),'operations, devices',len(changed),'name overrides',sum('name'in o['after']for o in ops))
