import json,concurrent.futures,paramiko
from pathlib import Path
entries=json.loads(Path('/config/backups/openwrt-user-20261020/core.config_entries.backup').read_text())['data']['entries']
password=next(e for e in entries if e['domain']=='openwrt_wifi_clients')['options']['aps'][0]['password']
def audit(host):
 c=paramiko.SSHClient();c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
 try:
  c.connect(host,username='root',password=password,look_for_keys=False,allow_agent=False,timeout=8)
  _,out,err=c.exec_command('id homeassistant; test -f /usr/share/rpcd/acl.d/homeassistant.json && echo ACL_EXISTS; uci -q get rpcd.homeassistant.username; cat /etc/sysupgrade.conf; ubus call system board')
  print(host,out.read().decode(),err.read().decode(),flush=True)
  c.save_host_keys('/config/backups/openwrt-user-20261020/hostkey-'+host)
 except Exception as ex:print(host,type(ex).__name__,str(ex)[:100],flush=True)
 finally:c.close()
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(audit,['192.168.10.9']))
