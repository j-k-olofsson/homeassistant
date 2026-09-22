import json
from pathlib import Path
folder=Path('/config/backups/dashboard-internet')
base='sensor.sovrummet_openwrt_one_router_sovrum_wan_'
rx=base+'rx_rate';tx=base+'tx_rate';wan='binary_sensor.sovrummet_openwrt_one_router_sovrum_wan_connected'
prefix="""{% set rx = states('RX') %}
{% set tx = states('TX') %}
{% set wan = states('WAN') %}
{% set down = rx | float(0) * 1.048576 %}
{% set up = tx | float(0) * 1.048576 %}
{% set dp = [100, [0, down / 5] | max] | min %}
{% set upct = [100, [0, up / 5] | max] | min %}
""".replace('RX',rx).replace('TX',tx).replace('WAN',wan)
content=prefix+"""**Internet · 500/500** <small>· {{ 'WAN ansluten' if wan == 'on' else 'WAN frånkopplad' if wan == 'off' else 'Status saknas' }}</small>
<table role="presentation"><tr><td><ha-icon icon="mdi:download"></ha-icon> Ned</td><td>{{ ('%.1f' | format(down)) | replace('.', ',') if is_number(rx) and wan == 'on' else '—' }} Mbit/s</td><td>{{ ('%.1f' | format(dp)) | replace('.', ',') if is_number(rx) and wan == 'on' else '—' }} %</td></tr><tr><td><ha-icon icon="mdi:upload"></ha-icon> Upp</td><td>{{ ('%.1f' | format(up)) | replace('.', ',') if is_number(tx) and wan == 'on' else '—' }} Mbit/s</td><td>{{ ('%.1f' | format(upct)) | replace('.', ',') if is_number(tx) and wan == 'on' else '—' }} %</td></tr></table>
"""
css=prefix+"""
p { margin: 0 0 5px; font-size: 12px; }
small { color: var(--secondary-text-color); font-size: 10px; }
table { width:100%; font-size:12px; line-height:1.6; }
td { padding:0 !important; font-variant-numeric:tabular-nums; }
td:nth-child(2), td:nth-child(3) { text-align:right; }
td:nth-child(3) { color:var(--secondary-text-color); font-size:11px; }
ha-icon { --mdc-icon-size:18px; color:#64b5c6; margin-right:4px; }
tr:nth-child(1) ha-icon { animation: {{ 'traffic-down ' ~ (6 - dp * 0.045) ~ 's ease-in-out infinite' if is_number(rx) and down > 0 and wan == 'on' else 'none' }}; }
tr:nth-child(2) ha-icon { animation: {{ 'traffic-up ' ~ (6 - upct * 0.045) ~ 's ease-in-out infinite' if is_number(tx) and up > 0 and wan == 'on' else 'none' }}; }
@keyframes traffic-down { 0%,100% { transform:translateY(-2px); opacity:.45; } 60% { transform:translateY(2px); opacity:1; } }
@keyframes traffic-up { 0%,100% { transform:translateY(2px); opacity:.45; } 60% { transform:translateY(-2px); opacity:1; } }
@media(prefers-reduced-motion:reduce) { ha-icon { animation:none !important; } }
"""
card={'type':'markdown','content':content,'entity_id':[rx,tx,wan],'grid_options':{'columns':12,'rows':'auto'},'tap_action':{'action':'more-info','entity':rx},'hold_action':{'action':'more-info','entity':tx},'card_mod':{'style':{'ha-markdown$':css}}}
(folder/'card.json').write_text(json.dumps(card,ensure_ascii=False,indent=2))
