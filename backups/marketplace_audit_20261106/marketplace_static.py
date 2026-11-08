import json,re
from pathlib import Path
from collections import Counter
R=Path('/config');O=R/'backups/marketplace_audit_20261106';b=json.loads((O/'baseline.json').read_text()); repos=json.loads((R/'.storage/marketplace.repositories').read_text())['data']; installed=[dict(v,repo_id=k) for k,v in repos.items() if v.get('installed')]
files=[*R.glob('*.yaml'),*R.glob('packages/**/*.yaml'),*R.glob('blueprints/**/*.yaml')]+[p for p in (R/'.storage').iterdir() if p.name.startswith(('lovelace','frontend.user_data','assist_pipeline','energy','template','input_','group','schedule','timer')) and not any(t in p.name.lower() for t in ['bak','backup'])]
texts={str(p.relative_to(R)):p.read_text(errors='replace') for p in files if p.is_file() and p.name!='secrets.yaml'}
# Config-entry options can reference entities/devices belonging to other integrations.
entries=json.loads((R/'.storage/core.config_entries').read_text())['data']['entries']
results=[]
for r in installed:
 d=r.get('domain'); row={k:r.get(k) for k in ['repo_id','full_name','category','domain']}
 if d:
  es=[e for e in b['entries'] if e['domain']==d];ents=[e for e in b['entities'] if e['platform']==d];ids={e['entity_id'] for e in ents};devs={e['device_id'] for e in ents if e.get('device_id')};ce={e['entry_id'] for e in es};terms=ids|devs|ce
  refs=[]
  for f,txt in texts.items():
   if f=='recorder_excluded_entities.yaml':continue
   for n,line in enumerate(txt.splitlines(),1):
    matches=[x for x in terms if x in line]
    if matches or re.search(r'(?<![\w])'+re.escape(d)+r'[.:]',line):refs.append({'file':f,'line':n,'text':line.strip()[:350],'matches':matches})
  cfgrefs=[]
  for e in entries:
   if e['domain']==d:continue
   st=json.dumps([e.get('data'),e.get('options')]);mt=[x for x in terms if x in st]
   if mt:cfgrefs.append({'domain':e['domain'],'entry_id':e['entry_id'],'matches':mt})
  deps=[]
  for p in (R/'custom_components').glob('*/manifest.json'):
   m=json.loads(p.read_text())
   if d in m.get('dependencies',[]) or d in m.get('after_dependencies',[]):deps.append(m['domain'])
  live=[s for s in b['states'] if s['entity_id'] in ids]
  row.update(entries=es,entity_count=len(ents),enabled_entities=sum(not e.get('disabled_by') for e in ents),live_count=len(live),available=sum(s['state'] not in ['unknown','unavailable'] for s in live),refs=refs,config_refs=cfgrefs,dependents=deps,entities=[{'entity_id':e['entity_id'],'disabled_by':e.get('disabled_by')} for e in ents])
  print(d,'entries',len(es),'ent',len(ents),'live',len(live),'refs',len(refs),'cfgrefs',len(cfgrefs),'deps',deps)
  for x in refs[:5]: print(' ',x['file'],x['line'],x['text'][:160])
  if cfgrefs:print(' cfg',cfgrefs[:5])
 else:
  name=r['full_name'].split('/')[-1];folder=R/'www/community'/name
  if not folder.exists():print('MISSING_FOLDER',name)
  js=list(folder.glob('*.js'));tokens=set()
  for p in js:
   if p.stat().st_size>10000000:continue
   txt=p.read_text(errors='replace');tokens.update(re.findall(r'(?:customElements\.define|customElements\.get)\(\s*["\x27]([a-z0-9_-]+)',txt));tokens.update(re.findall(r'type:\s*["\x27]custom:([a-z0-9_-]+)',txt))
  tokens.add(name.replace('lovelace-','').replace('ha-weather-forecast-card','weather-forecast-card'))
  if name=='lovelace-card-mod':tokens.add('card_mod')
  if name=='custom-brand-icons':tokens.update(['cbi:','phu:'])
  if name=='kiosk-mode':tokens.add('kiosk_mode')
  refs=[]
  for f,txt in texts.items():
   if f.startswith('.storage/lovelace_resources'):continue
   for n,line in enumerate(txt.splitlines(),1):
    mt=[t for t in tokens if t in line]
    if mt:refs.append({'file':f,'line':n,'text':line.strip()[:350],'matches':mt})
  row.update(tokens=sorted(tokens),refs=refs,files=[str(x.relative_to(R)) for x in js]);print(name,'tokens',sorted(tokens),'refs',len(refs))
 results.append(row)
(O/'inventory.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
