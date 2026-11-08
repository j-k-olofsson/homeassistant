#!/usr/bin/env python3
"""Read-only naming/reference audit. Standard library only; no credentials printed."""
import json,pathlib,re,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
DOC=ROOT/'docs/namnstandard'
REFERENCE=re.compile(r'(?<![a-z0-9_.])(?:states\.)?([a-z_]+\.[a-z0-9_]+)(?![a-z0-9_])')
IDENTITIES={'unique_id','previous_unique_id','entry_id','device_id','user_id','identifiers','connections','aliases','aliases_v2','compat_aliases','name','title','description','host','hostname','username','password','token','access_token','refresh_token','api_key','client_secret','noise_psk'}
def main():
 manifest=json.load(open(DOC/'granskningsmanifest.json'));services=set(manifest['service_ids']);obsolete=set(json.load(open(DOC/'foraldrade-entitets-id.json')))
 er=json.load(open(ROOT/'.storage/core.entity_registry'))['data']['entities'];current={e['entity_id']for e in er};obsolete-=current
 oldrefs=[]
 def inspect(obj,path,key=None):
  if key in IDENTITIES:return
  if isinstance(obj,str):
   if key in['action','service','perform_action','service_name']and obj in services:return
   for eid in set(REFERENCE.findall(obj))&obsolete:oldrefs.append({'file':path,'entity_id':eid})
  elif isinstance(obj,list):
   for value in obj:inspect(value,path,key)
  elif isinstance(obj,dict):
   for k,v in obj.items():
    if k in obsolete:oldrefs.append({'file':path,'entity_id':k})
    inspect(v,path,k)
 for relative in manifest['active_sources']:
  f=ROOT/relative
  if not f.is_file():continue
  if f.suffix=='.json'or f.parent.name=='.storage':
   try:inspect(json.load(open(f)),relative)
   except (ValueError,OSError):oldrefs.append({'file':relative,'error':'JSON kunde inte läsas'})
   continue
  text=f.read_text();text=re.sub(r'{#.*?#}','',text,flags=re.S)
  for number,line in enumerate(text.splitlines(),1):
   if line.lstrip().startswith('#'):continue
   if re.match(r'\s*(?:-\s*)?(?:unique_id|name|alias|title|description|host|hostname|username|password|token|api_key):',line):continue
   # Service names are stable script identities, distinct from renamed entity IDs.
   line=re.sub(r'(?:action|service|perform_action)[\\"\x27]*\s*:\s*[\\"\x27]*([a-z_]+\.[a-z0-9_]+)',lambda h:''if h[1]in services else h[0],line)
   for eid in set(REFERENCE.findall(line))&obsolete:oldrefs.append({'file':relative,'line':number,'entity_id':eid})
 for e in er:inspect(e.get('options',{}),'.storage/core.entity_registry:'+e['entity_id'])
 byid={e['id']:e for e in er};review=manifest['entities'];new=[e['entity_id']for e in er if e['id']not in review];changed=[]
 for ident,expected in review.items():
  actual=byid.get(ident)
  if actual and any(actual.get(k)!=expected.get(k)for k in['entity_id','name','original_name','device_id','area_id']):changed.append(actual['entity_id'])
 result={'read_only':True,'registered_entities':len(er),'duplicate_entity_ids':len(er)-len(current),'obsolete_active_references':oldrefs,'new_entities_to_review':new,'changed_entities_to_review':changed,'removed_since_review':len(set(review)-set(byid)),'compatibility_exceptions':len(manifest['compatibility_exceptions'])}
 print(json.dumps(result,ensure_ascii=False,indent=2))
 return 1 if oldrefs or result['duplicate_entity_ids']else 0
if __name__=='__main__':sys.exit(main())
