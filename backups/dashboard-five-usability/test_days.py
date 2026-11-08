import json,datetime,zoneinfo
from pathlib import Path
import quickjs
q=quickjs.Context()
def parts(ts):
 d=datetime.datetime.fromtimestamp(ts/1000,zoneinfo.ZoneInfo('Europe/Stockholm'))
 return json.dumps(dict(year=d.year,month=d.month,day=d.day,hour=d.hour,minute=d.minute,second=d.second))
q.add_callable('partsPython',parts)
q.eval('''
var Intl={DateTimeFormat:class {format(t){let p=JSON.parse(partsPython(Number(t)));return p.year+'-'+String(p.month).padStart(2,'0')+'-'+String(p.day).padStart(2,'0')}formatToParts(t){return Object.entries(JSON.parse(partsPython(Number(t)))).map(([type,value])=>({type,value:String(value)}))}}};
var groups=[];var document={createElementNS(ns,tag){return{tag,attrs:{},children:[],setAttribute(k,v){this.attrs[k]=v},appendChild(n){this.children.push(n)}}}};
var svg={querySelector(){return{remove(){groups=[]}}},appendChild(n){groups.push(n)}};
''')
q.eval('var draw='+Path('/homeassistant/backups/dashboard-five-usability/day-labels.js').read_text())
for start in ['2026-09-22T00:00:00+02:00','2026-10-25T00:00:00+02:00','2027-03-28T00:00:00+01:00']:
 ms=int(datetime.datetime.fromisoformat(start).timestamp()*1000)
 q.eval(f"var chart={{w:{{globals:{{minX:{ms},maxX:{ms+47*3600000},gridWidth:940,gridHeight:150,translateX:40,translateY:30}}}},el:{{querySelector(){{return svg}}}}}};draw(chart);")
 children=json.loads(q.eval('JSON.stringify(groups[0].children)'))
 lines=[x for x in children if x['tag']=='line']
 expected={'2026-09-22':480,'2026-10-25':500,'2027-03-28':460}[start[:10]]
 assert abs(float(lines[0]['attrs']['x1'])-expected)<.01,(start,lines)
 q.eval('draw(chart)');assert q.eval('groups.length')==1
print('PASS: day boundary coordinates in Sweden, including 23/25-hour daylight-saving days; redraw avoids duplicate labels.')
