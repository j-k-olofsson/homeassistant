from pathlib import Path
surface='background:linear-gradient(145deg,#263a49,#1b2937) !important;border:1px solid rgba(158,185,203,.20);border-radius:12px;'
resources=[]
for directory,old,new in [('house-flows-card','house-flows-card-v7.js','house-flows-card-v8.js'),('compact-levels-card','compact-levels-card-v4.js','compact-levels-card-v5.js'),('home-status-strip','home-status-strip-v1.js','home-status-strip-v2.js')]:
 p=Path('/homeassistant/www')/directory;s=(p/old).read_text()
 if directory=='home-status-strip':
  oldbg='background:linear-gradient(120deg,rgba(31,47,58,.94),rgba(26,32,39,.94));'
  assert oldbg in s;s=s.replace(oldbg,'background:linear-gradient(120deg,#29434a,#1e3039);border:1px solid rgba(158,185,203,.20);border-radius:12px;')
 else:s=s.replace('ha-card{','ha-card{'+surface+'min-height:118px;',1)
 (p/new).write_text(s);resources.append('/local/'+directory+'/'+new)
import json
Path('/homeassistant/backups/dashboard-unified-surfaces/urls.json').write_text(json.dumps(resources))
