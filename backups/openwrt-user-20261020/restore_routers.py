import ast,json,os,shlex,tarfile,io
from pathlib import Path
import paramiko
ROOT=Path('/config/backups/openwrt-user-20261020')
entries=json.loads(Path('/config/backups/openwrt-user-20261020/core.config_entries.backup').read_text())['data']['entries']
admin_password=next(e for e in entries if e['domain']=='openwrt_wifi_clients')['options']['aps'][0]['password']
password=os.environ['OPENWRT_HA_PASSWORD']
tree=ast.parse(Path('/config/custom_components/openwrt/api/base.py').read_text())
template=next(ast.literal_eval(n.value) for n in tree.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='PROVISION_SCRIPT_TEMPLATE' for t in n.targets))
# Use the installed integration's exact provisioning instructions, without its delayed HTTP restart.
script='set -e\n'+template.format(username='homeassistant',password=password).split('\n(\n    sleep 2')[0]
keep=['/etc/passwd','/etc/group','/etc/shadow','/etc/shells','/etc/config/rpcd','/etc/config/luci','/usr/share/rpcd/acl.d/homeassistant.json','/etc/sysupgrade.conf']
script+='\n# Preserve the integration account and ACL during upgrades that keep settings.\n'
for path in keep:script+=f'grep -qxF {shlex.quote(path)} /etc/sysupgrade.conf || echo {shlex.quote(path)} >> /etc/sysupgrade.conf\n'
script+='sync\n/etc/init.d/rpcd restart\n'
for e in entries:
 if e['domain']!='openwrt':continue
 host=e['data']['host'];c=paramiko.SSHClient();c.load_host_keys(str(ROOT/('hostkey-'+host)))
 try:
  c.connect(host,username='root',password=admin_password,look_for_keys=False,allow_agent=False,timeout=10)
  # Store rollback files locally, not on the router, and never print their contents.
  _,out,err=c.exec_command('tar -czf - /etc/passwd /etc/group /etc/shadow /etc/shells /etc/config/rpcd /etc/config/luci /etc/sysupgrade.conf /usr/share/rpcd/acl.d 2>/dev/null')
  backup=ROOT/(host+'-before.tar.gz');backup.write_bytes(out.read());backup.chmod(0o600)
  with tarfile.open(backup) as archive:assert 'etc/shadow' in archive.getnames()
  stdin,out,err=c.exec_command('/bin/sh -s');stdin.write(script);stdin.flush();stdin.channel.shutdown_write()
  output=out.read().decode();error=err.read().decode();status=out.channel.recv_exit_status()
  assert status==0,(host,status,error)
  _,out,err=c.exec_command('sysupgrade -l 2>/dev/null')
  listed=out.read().decode().splitlines();missing=set(keep)-set(listed)
  assert not missing,(host,'missing backup files',missing)
  # Generate an actual config archive and check its content locally.
  _,out,err=c.exec_command('sysupgrade -b /tmp/ha-preserve-check.tar.gz >/dev/null 2>&1 && cat /tmp/ha-preserve-check.tar.gz && rm -f /tmp/ha-preserve-check.tar.gz')
  data=out.read();assert out.channel.recv_exit_status()==0
  with tarfile.open(fileobj=io.BytesIO(data),mode='r:gz') as archive:
   names={n.lstrip('./') for n in archive.getnames()};assert all(p.lstrip('/') in names for p in keep)
   acl=json.load(archive.extractfile('usr/share/rpcd/acl.d/homeassistant.json'));assert 'homeassistant' in acl
  after=ROOT/(host+'-verified-backup.tar.gz');after.write_bytes(data);after.chmod(0o600)
  print(host,'restored; sysupgrade file list and actual backup verified',flush=True)
 finally:c.close()
