import copy,datetime,json,os,urllib.request
from pathlib import Path
import websocket
folder=Path('/config/backups/dashboard-music-card')
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
def render(t):
 req=urllib.request.Request('http://supervisor/core/api/template',data=json.dumps({'template':t}).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 return urllib.request.urlopen(req).read().decode()
original=call('lovelace/config',url_path=None);config=copy.deepcopy(original);resources=call('lovelace/resources')
assert any('auto-entities' in r['url'] for r in resources)
assert not any('mini-media-player' in r['url'] for r in resources)
base={'type':'custom:mini-media-player','artwork':'default','info':'short','hide':{'power':True,'source':True,'group_button':True,'volume_level':False,'runtime':False},'tap_action':{'action':'more-info'}}
css="""ha-card { --mini-media-player-accent-color: #64b5c6; }
.entity__info__name::before {
  content: '♫'; display: inline-block; margin-right: 7px;
  color: STATUS_COLOR; animation: PLAY_ANIMATION;
}
.entity__info__media, .entity__info__media * { animation: none !important; }
@keyframes music-status-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
@media (prefers-reduced-motion: reduce) { .entity__info__name::before { animation: none; } }
"""
template="""{% set base = BASE | from_json %}
{% set css = CSS %}
{% set candidates = states.media_player | selectattr('attributes.mass_player_type', 'defined') | selectattr('state', 'in', ['playing', 'paused']) | list %}
{% set groups = candidates | selectattr('attributes.mass_player_type', 'eq', 'group') | sort(attribute='entity_id') | list %}
{% set players = candidates | rejectattr('attributes.mass_player_type', 'eq', 'group') | sort(attribute='entity_id') | list %}
{% set ns = namespace(queues=[], cards=[]) %}
{% for p in groups + players %}
  {% set queue = p.attributes.get('active_queue') or p.entity_id %}
  {% if queue not in ns.queues %}
    {% set ns.queues = ns.queues + [queue] %}
    {% set muted = p.attributes.get('is_volume_muted', false) %}
    {% set label = 'Ljud av' if muted else 'Pausad' if p.state == 'paused' else 'Spelar' %}
    {% set animation = 'music-status-pulse 3s ease-in-out infinite' if p.state == 'playing' and not muted else 'none' %}
    {% set color = '#FFC107' if muted or p.state == 'paused' else '#64b5c6' %}
    {% set styling = css | replace('STATUS_COLOR', color) | replace('PLAY_ANIMATION', animation) %}
    {% set card = dict(base, entity=p.entity_id, name=p.name ~ ' · ' ~ label, card_mod=dict(style=styling)) %}
    {% set ns.cards = ns.cards + [card] %}
  {% endif %}
{% endfor %}
{{ ns.cards | to_json }}
""".replace('BASE',repr(json.dumps(base))).replace('CSS',repr(css))
actual=json.loads(render(template));assert actual and all(c['entity'].startswith('media_player.') for c in actual)
print('Currently selected:',[(c['entity'],c['name']) for c in actual])
# Test queue deduplication and pause/mute styles using isolated template data.
sample=[{'entity_id':'media_player.test_group','name':'Group','state':'playing','attributes':{'mass_player_type':'group','active_queue':'same','is_volume_muted':False}},{'entity_id':'media_player.test_member','name':'Member','state':'playing','attributes':{'mass_player_type':'player','active_queue':'same'}},{'entity_id':'media_player.test_paused','name':'Paused','state':'paused','attributes':{'mass_player_type':'player','active_queue':'paused'}},{'entity_id':'media_player.test_muted','name':'Muted','state':'playing','attributes':{'mass_player_type':'player','active_queue':'muted','is_volume_muted':True}}]
test=template.replace('states.media_player', '('+repr(json.dumps(sample))+' | from_json)')
result=json.loads(render(test));assert len(result)==3
for c in result:
 if c['entity'] in ['media_player.test_paused','media_player.test_muted']:assert 'animation: none;' in c['card_mod']['style']
assert not any(c['entity']=='media_player.test_member' for c in result)
card={'type':'custom:auto-entities','card':{'type':'grid','columns':1,'square':False},'card_param':'cards','filter':{'template':template},'show_empty':False,'grid_options':{'columns':12,'rows':'auto'}}
section={'type':'grid','column_span':2,'cards':[card]}
assert 'music-status-pulse' not in json.dumps(original)
config['views'][0]['sections'].append(section)
check=copy.deepcopy(config);check['views'][0]['sections'].pop();assert check==original
url='/local/mini-media-player/mini-media-player-v1.16.12.js'
assert urllib.request.urlopen('http://homeassistant:80'+url).read()==Path('/config/www/mini-media-player/mini-media-player-v1.16.12.js').read_bytes()
backup=folder/('original-'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')+'.json');backup.write_text(json.dumps(original,ensure_ascii=False,indent=2))
assert call('lovelace/config',url_path=None)==original,'Concurrent dashboard edit'
resource=call('lovelace/resources/create',res_type='module',url=url)
(folder/'change.json').write_text(json.dumps({'backup':str(backup),'section':section,'resource':resource,'url':url},ensure_ascii=False,indent=2))
call('lovelace/config/save',url_path=None,config=config);assert call('lovelace/config',url_path=None)==config
print('Saved and read back. Resource served. Deduplication and paused/muted templates passed. No playback commands sent.');w.close()
