import copy,json,os,datetime,urllib.request,websocket
from pathlib import Path
folder=Path('/homeassistant/backups/dashboard-music-always')
def connect():
 w=websocket.create_connection('ws://supervisor/core/websocket',timeout=20);w.recv();w.send(json.dumps({'type':'auth','access_token':os.environ['SUPERVISOR_TOKEN']}));assert json.loads(w.recv())['type']=='auth_ok';return w
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'];original=r['result'];config=copy.deepcopy(original)
found=[(si,ci,c) for si,s in enumerate(config['views'][0]['sections']) for ci,c in enumerate(s.get('cards',[])) if c.get('type')=='custom:auto-entities' and 'mass_player_type' in c.get('filter',{}).get('template','')];assert len(found)==1
si,ci,c=found[0];before=copy.deepcopy(c)
t=c['filter']['template']
t=t.replace('"tap_action": {"action": "more-info"}', '"tap_action": {"action": "navigate", "navigation_path": "/d5369777_music_assistant"}')
anchor="{% set groups = candidates"
assert anchor in t
t=t.replace(anchor,"""{% if candidates | count == 0 %}
{% set candidates = expand('media_player.dassens_hogtalare_ma') | list %}
{% endif %}
"""+anchor)
t=t.replace("else 'Spelar' %}","else 'Spelar' if p.state == 'playing' else 'Ej tillgänglig · Öppna MA' if p.state in ['unknown', 'unavailable'] else 'Välj musik' %}")
t=t.replace('{{ ns.cards }}',"""{% if ns.cards | count == 0 %}
{{ [dict(type='markdown', content='[♫ Välj musik i Music Assistant](/d5369777_music_assistant)')] }}
{% else %}
{{ ns.cards }}
{% endif %}""")
c['filter']['template']=t
c['show_empty']=True
# Render both live and forced-no-active-player branches without changing playback.
for label,template in [('live',t),('idle',t.replace("selectattr('state', 'in', ['playing', 'paused'])", "selectattr('state', 'in', ['__test_no_active__'])"))]:
 req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':template}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 out=urllib.request.urlopen(req).read().decode();assert 'media_player.dassens_hogtalare_ma' in out and '/d5369777_music_assistant' in out;print('Rendered',label)
check=copy.deepcopy(config);check['views'][0]['sections'][si]['cards'][ci]=before;assert check==original
p=Path('/homeassistant/.storage/lovelace.lovelace');disk=json.loads(p.read_text());assert disk['data']['config']==original
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');(folder/('original-'+stamp+'.json')).write_text(json.dumps(disk,ensure_ascii=False,indent=2));(folder/'change.json').write_text(json.dumps({'path':['views',0,'sections',si,'cards',ci],'original_card':before,'updated_card':c},ensure_ascii=False,indent=2))
w.send(json.dumps({'id':2,'type':'lovelace/config','url_path':'lovelace'}));assert json.loads(w.recv())['result']==original
assert json.loads(p.read_text())==disk
disk['data']['config']=config;temp=p.with_name(p.name+'.uv-tmp');temp.write_text(json.dumps(disk,ensure_ascii=False,indent=2));temp.chmod(p.stat().st_mode);os.replace(temp,p)
w.send(json.dumps({'id':3,'type':'lovelace/config/save','url_path':'lovelace','config':config}));assert json.loads(w.recv())['success'];w.close()
w=connect();w.send(json.dumps({'id':1,'type':'lovelace/config','url_path':'lovelace'}));r=json.loads(w.recv());assert r['success'] and r['result']==config;w.close();assert json.loads(p.read_text())['data']['config']==config
print('Always-visible MA fallback and navigation saved; new connection and disk verified.')
