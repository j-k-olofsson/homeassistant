import json,os,urllib.request
from pathlib import Path
base='http://supervisor/addons/948e3081_tailscale'
def api(suffix,body=None):
 req=urllib.request.Request(base+suffix,data=None if body is None else json.dumps(body).encode(),headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN'],'Content-Type':'application/json'})
 with urllib.request.urlopen(req,timeout=30) as r:return json.load(r)
d=api('/info')['data']; options=d['options']
p=Path('/config/rename-hosts-20261014/tailscale-options-before.json')
if not p.exists():p.write_text(json.dumps(options));p.chmod(0o600)
options['hostname']='heimdal'
assert api('/options',{'options':options})['result']=='ok'
print('Persistent Tailscale hostname:',api('/info')['data']['options']['hostname'])
