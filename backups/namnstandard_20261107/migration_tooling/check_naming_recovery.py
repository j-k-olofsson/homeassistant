import tarfile,pathlib,json,hashlib
P=pathlib.Path('/homeassistant/backups/namnstandard_20261107');f=P/'full-backup-22f83cfa.tar';h=hashlib.sha256()
with f.open('rb') as inp:
 while chunk:=inp.read(16*1024*1024):h.update(chunk)
m=json.loads((P/'full_backup_archive_manifest.json').read_text());m['sha256']=h.hexdigest();print('SHA256',h.hexdigest(),flush=True)
wanted={'configuration.yaml','automations.yaml','scripts.yaml','.storage/core.entity_registry','.storage/core.device_registry','.storage/core.config_entries'};found={}
with tarfile.open(f) as outer:
 with tarfile.open(fileobj=outer.extractfile('homeassistant.tar.gz'),mode='r|gz') as inner:
  for item in inner:
   name=item.name.removeprefix('./');name=name.removeprefix('data/')
   if name in wanted:
    content=inner.extractfile(item).read();dst=P/'restore_read_test'/name;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(content);found[name]={'size':len(content),'sha256':hashlib.sha256(content).hexdigest()}
assert wanted==set(found),('Missing recovery files',wanted-set(found))
for name in ['configuration.yaml','automations.yaml','scripts.yaml']:
 assert (P/'restore_read_test'/name).read_bytes()==(P/'baseline'/name).read_bytes(),name
for name,key in [('.storage/core.entity_registry','entities'),('.storage/core.device_registry','devices')]:
 content=json.loads((P/'restore_read_test'/name).read_text());assert len(content['data'][key])>1000
m['restore_read_test']=found;m['source_yaml_matches_baseline']=True;m['restore_tested']=False
(P/'full_backup_archive_manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2));print('RESTORE_FILES_READ_VERIFIED',list(found),flush=True)
