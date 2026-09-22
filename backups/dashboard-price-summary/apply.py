import copy,datetime,json,os,urllib.request
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-price-summary');content=(folder/'content.jinja').read_text()
req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':content}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
print('Rendered:',urllib.request.urlopen(req).read().decode())
w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok'
seq=0
def call(kind,**args):
 global seq
 seq+=1;w.send(json.dumps(dict(id=seq,type=kind,**args)))
 while True:
  r=json.loads(w.recv())
  if r.get('id')==seq:
   assert r.get('success'),str(r.get('error'))
   return r.get('result')
original=call('lovelace/config',url_path=None);config=copy.deepcopy(original)
sections=config['views'][0]['sections'];matches=[(i,s) for i,s in enumerate(sections) if any(c.get('heading')=='Elpris' for c in s.get('cards',[]))];assert len(matches)==1
si,s=matches[0];assert len(s['cards'])==2 and s['cards'][1]['type']=='custom:apexcharts-card';old=copy.deepcopy(s)
s['cards'][0]={'type':'markdown','content':content,'entity_id':['sensor.nordpool','sensor.template_nordpool_base_cost_current_hour','sensor.kvartbaserad_elkostnadsprognos'],'grid_options':{'columns':'full','rows':'auto'},'card_mod':{'style':{'ha-markdown$':'p { margin: 4px 0; font-size: 13px; line-height: 1.45; }','.':'ha-card { background: transparent; border: none; box-shadow: none; } ha-markdown { padding: 2px 8px; }'}}}
graph=s['cards'][1];graph['now']['label']='Nu';graph['graph_span']='48h';graph['update_interval']='1min';graph['series'][0]['name']='Elpris per kvart'
graph['series'][0]['data_generator']="const a = entity.attributes; const rows = [...(a.raw_today || []), ...(a.tomorrow_valid ? (a.raw_tomorrow || []) : [])]; return rows.filter(r => r.value !== null && Number.isFinite(Number(r.value)) && Number.isFinite(Date.parse(r.start))).map(r => [Date.parse(r.start), Number(r.value)]).sort((a,b) => a[0]-b[0]);"
graph['apex_config']['responsive']=[{'breakpoint':600,'options':{'chart':{'height':150}}},{'breakpoint':10000,'options':{'chart':{'height':180}}}]
graph['apex_config']['chart']={'animations':{'enabled':False}}
# Keep negative and high prices visible rather than clipping at 0 and 6.
graph['yaxis'][0].pop('min',None);graph['yaxis'][0].pop('max',None)
check=copy.deepcopy(config);check['views'][0]['sections'][si]=old;assert check==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');backup=folder/('original-'+stamp+'.json');backup.write_text(json.dumps(original,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'backup':str(backup),'section_index':si,'original_section':old,'updated_section':s},ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent dashboard edit'
call('lovelace/config/save',url_path=None,config=config);assert call('lovelace/config',url_path=None)==config
print('Saved and read back. Only electricity price section changed.');w.close()
