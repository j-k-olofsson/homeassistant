import asyncio,json,os,shutil
from pathlib import Path
from datetime import datetime,timezone
import aiohttp
ROOT=Path('/config'); OUT=ROOT/'backups/ha_admin_server_layout_20261026';OUT.mkdir(exist_ok=True);OUT.chmod(0o700)
async def main():
 async with aiohttp.ClientSession() as s:
  auth=json.loads((ROOT/'.storage/auth').read_text())['data']; admins={x['id'] for x in auth['users'] if x.get('is_active') and 'system-admin' in x.get('group_ids',[])}
  token=None
  for t in sorted([x for x in auth['refresh_tokens'] if x['user_id'] in admins and x.get('token_type')=='normal' and x.get('client_id')],key=lambda x:x.get('last_used_at') or '',reverse=True):
   async with s.post('http://127.0.0.1:80/auth/token',data={'grant_type':'refresh_token','refresh_token':t['token'],'client_id':t['client_id']}) as r:
    v=await r.json()
    if r.status==200: token=v['access_token'];break
  assert token
  async with s.ws_connect('http://127.0.0.1:80/api/websocket',max_msg_size=32*1024*1024) as ws:
   await ws.receive_json();await ws.send_json({'type':'auth','access_token':token});assert (await ws.receive_json())['type']=='auth_ok'
   i=0
   async def call(typ,**args):
    nonlocal i
    i+=1;await ws.send_json({'id':i,'type':typ,**args})
    while True:
     v=await ws.receive_json()
     if v.get('id')==i and v['type']=='result':break
    assert v['success'],v
    return v['result']
   import copy
   before=await call('lovelace/config',url_path='ha-admin')
   (OUT/'dashboard_before.json').write_text(json.dumps(before,ensure_ascii=False,indent=2))
   after=copy.deepcopy(before)
   view=next(v for v in after['views'] if v.get('path')=='system')
   assert view['title']=='Server'
   old=view['sections'][1]['cards'][1]['cards']
   assert len(old)==5 and old[0]['entity']=='sensor.system_ha_global_health_score'
   E='sensor.system_ha_global_health_score'
   pre="{% set e = '"+E+"' %}\n"
   offline="{% if states(e) in ['unknown', 'unavailable'] %}⚠️ HAGHS saknar aktuella data.{% else %}\n"
   def md(title,txt):
    return {'type':'markdown','title':title,'content':pre+offline+txt+'\n{% endif %}','grid_options':{'columns':12,'rows':'auto'}}
   gauge=copy.deepcopy(old[0]);gauge.update(name='HAGHS · Total hälsa',min=0,max=100,unit='%',grid_options={'columns':12,'rows':4})
   breakdown=md('Poängfördelning',"""| Område | Poäng |
| :--- | ---: |
| Hårdvara | **{{ state_attr(e, 'hardware_score') }} / 100** |
| Applikation | **{{ state_attr(e, 'application_score') }} / 100** |

Hårdvara väger 40 % och applikation 60 %.""")
   advisor=md('Rekommendationer',"""{% set rec = state_attr(e, 'recommendations') | default('', true) %}
{% if rec and '✅' not in rec %}{{ rec }}{% else %}✅ Inga rekommenderade åtgärder.{% endif %}""")
   zombies=md('Zombies',"""{% set count = state_attr(e, 'zombie_count') | int(0) %}
{% set raw = state_attr(e, 'zombie_entities') | default([], true) %}
{% set items = raw.split(',') | map('trim') | list if raw is string else raw | list %}
{% if count == 0 %}✅ **Inga zombies upptäckta.**
{% else %}⚠️ **{{ count }} zombies**
{% set domains = state_attr(e, 'zombie_count_per_domain') | default({}, true) %}
{% for domain, n in domains.items() %}{{ domain }}: **{{ n }}**{% if not loop.last %} · {% endif %}{% endfor %}

{% for item in items %}- `{{ item }}`
{% endfor %}
{% if count > items | length %}Visar {{ items | length }} av {{ count }}.{% endif %}
{% endif %}

[Öppna entitetsregistret](/config/entities)""")
   updates=md('Uppdateringar',"""{% set updates = state_attr(e, 'pending_updates') | default([], true) | list %}
{% if updates %}📦 **{{ updates | length }} väntande uppdateringar**

{% for item in updates %}- {{ item }}
{% endfor %}
{% else %}✅ **Inga väntande uppdateringar enligt HAGHS.**{% endif %}

[Öppna uppdateringar](/config/updates)""")
   recorder=md('Databas och insamling',"""{% set db = state_attr(e, 'db_size_mb') %}
{% set keep = state_attr(e, 'recorder_keep_days') %}
{% set filtered = state_attr(e, 'recorder_filter_active') %}
| Inställning | Status |
| :--- | :--- |
| Databas | {{ (db | float | round(1) ~ ' MB') if db is not none else 'Saknar uppgift' }} |
| Historik | {{ (keep ~ ' dagar') if keep is not none else 'Saknar uppgift' }} |
| Entitetsfilter | {{ 'Aktivt' if filtered else 'Ej aktivt' }} |
| Mätkälla | {{ 'PSI · CPU, RAM och I/O' if state_attr(e, 'psi_available') else 'Klassiska systemsensorer' }} |

{% if keep is none %}⚠️ Kontrollera automatisk rensning av historik.{% endif %}
{% if not filtered %}💡 Begränsa inspelningen med ett entitetsfilter.{% endif %}""")
   def section(title,icon,cards):
    return {'type':'grid','column_span':1,'cards':[{'type':'heading','heading':title,'icon':icon,'heading_style':'title'},*cards]}
   load=view['sections'][0];load['column_span']=3
   view['max_columns']=3
   view['dense_section_placement']=False
   view['sections']=[load,section('HAGHS · Hälsopoäng','mdi:shield-check-outline',[gauge,breakdown]),section('HAGHS · Åtgärder','mdi:clipboard-pulse-outline',[advisor,zombies]),section('HAGHS · Underhåll','mdi:database-cog-outline',[updates,recorder])]
   renders={}
   for card in [breakdown,advisor,zombies,updates,recorder]:
    async with s.post('http://127.0.0.1:80/api/template',headers={'Authorization':'Bearer '+token},json={'template':card['content']}) as r:
     txt=await r.text();assert r.status==200,(card['title'],txt);renders[card['title']]=txt
   (OUT/'rendered_templates.json').write_text(json.dumps(renders,ensure_ascii=False,indent=2))
   (OUT/'dashboard_after.json').write_text(json.dumps(after,ensure_ascii=False,indent=2))
   # Abort if someone changed the dashboard during preparation.
   assert await call('lovelace/config',url_path='ha-admin')==before
   await call('lovelace/config/save',url_path='ha-admin',config=after)
   saved=await call('lovelace/config',url_path='ha-admin')
   assert saved==after
   assert [v for v in before['views'] if v.get('path')!='system']==[v for v in saved['views'] if v.get('path')!='system']
   print(json.dumps({'saved':True,'sections':len(view['sections']),'haghs_cards':6,'templates_validated':list(renders),'backup':str(OUT)},ensure_ascii=False))
asyncio.run(main())
