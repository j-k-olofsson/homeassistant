import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-four-final')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
def call(w,i,kind,**args):
 w.send(json.dumps(dict(id=i,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==i:
   assert r['success'],r
   return r.get('result')
headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'}
def request(path,data=None):
 req=urllib.request.Request('http://supervisor/core/api/'+path,headers=headers,data=json.dumps(data).encode() if data is not None else None)
 return json.load(urllib.request.urlopen(req))
devices=[('prusa','sensor.prusaxl','finished',['printing','paused','attention','busy'],'printing'),('tvatt','sensor.siemens_tvatt_tork_driftsstatus','BSH.Common.EnumType.OperationState.Finished',['BSH.Common.EnumType.OperationState.'+s for s in ['Run','Pause','ActionRequired']],'BSH.Common.EnumType.OperationState.Run'),('disk','sensor.siemens_016050395510002818_bsh_common_status_operationstate','BSH.Common.EnumType.OperationState.Finished',['BSH.Common.EnumType.OperationState.'+s for s in ['Run','Pause','ActionRequired']],'BSH.Common.EnumType.OperationState.Run')]
w=connect();timers=call(w,1,'timer/list');results={}
(folder/'automations-before.yaml').write_bytes(Path('/homeassistant/automations.yaml').read_bytes())
for n,(key,entity,finished,from_states,running) in enumerate(devices):
 name='Dashboard '+key+' klar'
 existing=next((t for t in timers if t['name']==name),None)
 timer=existing or call(w,n+2,'timer/create',name=name,duration='01:00:00',restore=True)
 timer_entity='timer.'+timer['id'];request('states/'+timer_entity)
 automation={'alias':'Kontrollpanel – '+key+' färdig','description':'Visa ett kvitterbart klarbesked i en timme efter bekräftat avslut. Ny körning tar bort beskedet.','mode':'restart','triggers':[{'trigger':'state','entity_id':entity,'to':finished,'id':'done'},{'trigger':'state','entity_id':entity,'to':running,'id':'running'}],'actions':[{'choose':[{'conditions':"{{ trigger.id == 'done' and trigger.from_state is not none and trigger.from_state.state in "+repr(from_states)+" }}",'sequence':[{'action':'timer.start','target':{'entity_id':timer_entity},'data':{'duration':'01:00:00'}}]},{'conditions':"{{ trigger.id == 'running' }}",'sequence':[{'action':'timer.cancel','target':{'entity_id':timer_entity}}]}]}]}
 aid='dashboard_completion_'+key
 request('config/automation/config/'+aid,automation)
 results[key]={'timer':timer_entity,'automation_id':aid,'source':entity}
 print(key,timer_entity,'created and automation saved')
(folder/'completion.json').write_text(json.dumps(results,indent=2));w.close()
