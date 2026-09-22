import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/config/backups/dashboard-kuma-expand')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
found=[(si,ci,c) for si,s in enumerate(config['views'][0]['sections']) for ci,c in enumerate(s.get('cards',[])) if c.get('type')=='markdown' and 'Tjänster' in c.get('content','')];assert len(found)==1
si,ci,c=found[0];before=copy.deepcopy(c)
content=c['content'];pos=content.index('{% if names %}')
summary=content[pos:].strip()
# Keep the short summary; reveal only exceptional monitors on demand.
c['content']=content[:pos]+"""{% if names %}
<details><summary>{{ names[:2] | join(' · ') | e }}{% if names | count > 2 %} · +{{ names | count - 2 }} till{% endif %}</summary>
<ul>
{% for label, group in [('Nere', ns.down), ('Väntar', ns.pending), ('Status saknas', ns.unknown), ('Underhåll', ns.maintenance)] %}
{% for name in group %}<li><strong>{{ label }}</strong> · {{ name | e }}</li>{% endfor %}
{% endfor %}
</ul>
<a href="/config/integrations/integration/uptime_kuma">Öppna Uptime Kuma-integrationen</a>
</details>
{% else %}Alla övervakade kontroller svarar{% endif %}
"""
c.pop('tap_action',None)
c['card_mod']['style']['.']=''
c['card_mod']['style']['ha-markdown$']+="""
details { margin-top:5px; font-size:12px; line-height:1.5; }
summary { cursor:pointer; color:var(--secondary-text-color); }
summary:focus-visible { outline:2px solid var(--primary-color); }
ul { margin:8px 0; padding-left:18px; }
li { margin:4px 0; overflow-wrap:anywhere; }
a { color:var(--primary-color); }
"""
def render(t):
 req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':t}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 return urllib.request.urlopen(req).read().decode()
out=render(c['content']);assert '<details><summary>' in out and '<li>' in out;print('Live exception rows:',out.count('<li>'))
assert '<details>' not in render(c['content'].replace('states(id)',"'up'"))
for status,label in [('maintenance','Underhåll'),('pending','Väntar'),('unavailable','Status saknas')]:
 out=render(c['content'].replace('states(id)',repr(status)));assert '<strong>'+label+'</strong>' in out
print('Expansion content and all-up/maintenance/pending/unavailable templates checked.')
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'][ci]=before;assert check==original
p=Path('/config/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'path':['views',0,'sections',si,'cards',ci],'original_card':before,'updated_card':c},ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('Kuma expansion saved and verified on fresh connection and disk.')
