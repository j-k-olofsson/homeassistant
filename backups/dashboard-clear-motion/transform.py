import re
from pathlib import Path

def transform(config):
 changed=[]
 def walk(o,path):
  if isinstance(o,list):
   for i,v in enumerate(o):walk(v,path+[i])
  elif isinstance(o,dict):
   for k,v in list(o.items()):
    if isinstance(v,(dict,list)):walk(v,path+[k])
    elif isinstance(v,str):
     old=v
     if 'vehicle-soft-pulse' in v:
      heat='climate.sef_42h_climate' in v
      name='vehicle-spin' if heat else 'charging-motion'
      v=v.replace('vehicle-soft-pulse 4s ease-in-out infinite',name+(' 3s linear infinite' if heat else ' 1.4s ease-in-out infinite'))
      v=re.sub(r'@keyframes vehicle-soft-pulse \{.*?\n\}', '@keyframes '+name+(' { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }' if heat else ' { 0%,100% { transform:translateY(3px); } 50% { transform:translateY(-3px); } }'),v,flags=re.S)
     if 'printer-soft-pulse' in v:
      printer="states('sensor.prusaxl')" in v
      name='printer-head-motion' if printer else 'appliance-motion'
      v=v.replace('printer-soft-pulse 3s ease-in-out infinite',name+' 1.6s ease-in-out infinite')
      v=re.sub(r'@keyframes printer-soft-pulse \{.*?\n\}', '@keyframes '+name+(' { 0%,100% { transform:translateX(-5px); } 50% { transform:translateX(5px); } }' if printer else ' { 0%,100% { transform:rotate(-12deg); } 50% { transform:rotate(12deg); } }'),v,flags=re.S)
     if '@keyframes traffic-down' in v:
      v=v.replace('(6 - dp * 0.045)','(1.8 - dp * 0.01)').replace('(6 - upct * 0.045)','(1.8 - upct * 0.01)')
      v=v.replace('transform:translateY(-2px); opacity:.45','transform:translateY(-4px)').replace('transform:translateY(2px); opacity:1','transform:translateY(4px)').replace('transform:translateY(2px); opacity:.45','transform:translateY(4px)').replace('transform:translateY(-2px); opacity:1','transform:translateY(-4px)')
      v=v.replace('ha-icon { --mdc-icon-size:18px;', 'ha-icon { display:inline-block; --mdc-icon-size:18px;')
     if 'music-status-pulse' in v:
      v=v.replace('music-status-pulse 3s ease-in-out infinite','music-note-motion 1.5s ease-in-out infinite')
      v=v.replace('@keyframes music-status-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }','@keyframes music-note-motion { 0%,100% { transform:rotate(-15deg) translateY(1px); } 50% { transform:rotate(15deg) translateY(-2px); } }')
     if '@keyframes kuma-alert' in v:
      v=v.replace('ha-icon { color:', 'ha-icon { display:inline-block; color:')
      v=v.replace('@keyframes kuma-alert { 50% { opacity: .4; } }','@keyframes kuma-alert { 0%,30%,100% { transform:rotate(0deg); } 5%,15%,25% { transform:rotate(-14deg); } 10%,20% { transform:rotate(14deg); } }')
     if old!=v:o[k]=v;changed.append(path+[k])
 walk(config,[])
 for s in config['views'][0]['sections']:
  for c in s['cards']:
   if c.get('entity')=='climate.sef_42h_climate':c['icon']='mdi:fan'
 return changed

p=Path('/config/www/compact-levels-card/compact-levels-card-v1.js')
s=p.read_text()
s=s.replace('.critical .fill,.critical .value{animation:low-level 3s ease-in-out infinite}', '.critical .value::before{content:"!";display:inline-block;color:#e45b4f;font-weight:bold;margin-right:3px;animation:low-level 2s ease-in-out infinite}')
s=s.replace('@keyframes low-level{50%{opacity:.45}}','@keyframes low-level{0%,30%,100%{transform:rotate(0deg)}10%{transform:rotate(-20deg)}20%{transform:rotate(20deg)}}')
s=s.replace('.critical .fill,.critical .value{animation:none}', '.critical .value::before{animation:none}')
Path('/config/www/compact-levels-card/compact-levels-card-v2.js').write_text(s)
