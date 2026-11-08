import json,re
from pathlib import Path
rx=re.compile(r'(?i)\b(frigg|eir)\b')
for f in Path('/config/.storage').glob('*'):
 if f.name not in ('core.config_entries','core.device_registry','core.entity_registry','core.config','frontend.user_data') and not f.name.startswith('lovelace'): continue
 try: data=json.loads(f.read_text())
 except Exception: continue
 def walk(obj,path=''):
  if isinstance(obj,dict):
   for k,v in obj.items(): walk(v,path+'/'+str(k))
  elif isinstance(obj,list):
   for i,v in enumerate(obj): walk(v,path+'/'+str(i))
  elif isinstance(obj,str) and rx.search(obj) and path.rsplit('/',1)[-1] in ('title','name','name_by_user','host','hostname','url','internal_url','external_url','entity_id','unique_id'):
   if '://' in obj and '@' in obj:return
   print(f.name,path,obj[:220])
 walk(data)
