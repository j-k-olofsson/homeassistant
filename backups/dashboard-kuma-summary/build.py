import json
from pathlib import Path
folder=Path('/config/backups/dashboard-kuma-summary')
es=[e for e in json.load(open('/config/.storage/core.entity_registry'))['data']['entities'] if e.get('platform')=='uptime_kuma' and e.get('original_name')=='Status' and not e.get('disabled_by')]
ids=[e['entity_id'] for e in es];assert len(ids)==58
prefix="""{% set ids = IDS %}
{% set ns = namespace(up=0, down=[], pending=[], maintenance=[], unknown=[]) %}
{% for id in ids %}
{% set s = states(id) %}
{% set name = (state_attr(id, 'friendly_name') or id) | regex_replace(' Status$', '') %}
{% if s == 'up' %}{% set ns.up = ns.up + 1 %}
{% elif s == 'down' %}{% set ns.down = ns.down + [name] %}
{% elif s == 'pending' %}{% set ns.pending = ns.pending + [name] %}
{% elif s == 'maintenance' %}{% set ns.maintenance = ns.maintenance + [name] %}
{% else %}{% set ns.unknown = ns.unknown + [name] %}{% endif %}
{% endfor %}
{% set color = '#e45b4f' if ns.down else '#e8b841' if ns.pending or ns.unknown else '#64b5c6' if ns.maintenance else '#66bb6a' %}
""".replace('IDS',json.dumps(ids))
content=prefix+"""<ha-icon icon="{{ 'mdi:server-off' if ns.down else 'mdi:server-security' }}"></ha-icon> **Tjänster · {% if ns.down %}{{ ns.down | count }} nere{% elif ns.pending %}Kontroll pågår{% elif ns.unknown %}Status saknas{% elif ns.maintenance %}Underhåll{% else %}Allt uppe{% endif %}** · {{ ns.up }}/{{ ids | count }} uppe

{% set names = ns.down + ns.pending + ns.unknown + ns.maintenance %}
{% if names %}{{ names[:2] | join(' · ') | e }}{% if names | count > 2 %} · +{{ names | count - 2 }} till{% endif %}{% else %}Alla övervakade kontroller svarar{% endif %}{% if ns.pending %} · {{ ns.pending | count }} väntar{% endif %}{% if ns.unknown %} · {{ ns.unknown | count }} okända{% endif %}{% if ns.maintenance %} · {{ ns.maintenance | count }} underhåll{% endif %}
"""
style=prefix+"""
ha-icon { color: {{ color }}; --mdc-icon-size: 22px; margin-right: 5px; vertical-align: middle; animation: {{ 'kuma-alert 3s ease-in-out infinite' if ns.down else 'none' }}; }
p { margin: 0; font-size: 12px; line-height: 1.5; }
p + p { margin-top: 5px; color: var(--secondary-text-color); }
@keyframes kuma-alert { 50% { opacity: .4; } }
@media (prefers-reduced-motion: reduce) { ha-icon { animation: none; } }
"""
card={'type':'markdown','content':content,'entity_id':ids,'grid_options':{'columns':12,'rows':'auto'},'tap_action':{'action':'navigate','navigation_path':'/config/integrations/integration/uptime_kuma'},'card_mod':{'style':{'ha-markdown$':style,'.':'ha-card { cursor: pointer; }'}}}
(folder/'card.json').write_text(json.dumps(card,ensure_ascii=False,indent=2))
