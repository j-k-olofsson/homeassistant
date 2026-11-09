import json, urllib.request, urllib.error
from pathlib import Path
D=next(e['data'] for e in json.loads(Path('/config/.storage/core.config_entries').read_text())['data']['entries'] if e['domain']=='portainer')
BASE=D['url'].rstrip('/')+'/api/endpoints/14/docker'
def api(path, data=None, method=None):
 b=None if data is None else json.dumps(data).encode()
 r=urllib.request.Request(BASE+path,data=b,method=method,headers={'X-API-Key':D['api_token'],'Content-Type':'application/json'})
 try:
  with urllib.request.urlopen(r,timeout=90) as f:
   out=f.read()
   return json.loads(out) if out and f.headers.get('Content-Type','').startswith('application/json') else out
 except urllib.error.HTTPError as e:
  raise RuntimeError(str(e.code)+' '+e.read().decode()[:500]) from None
if __name__=='__main__':
 print(api('/containers/ha/update',{'RestartPolicy':{'Name':'no'}}))
 print(api('/containers/ha/stop?t=30',method='POST'))
 info=api('/containers/ha/json'); Path('/config/tools/ha_test_isolation/original-container.json').write_text(json.dumps(info,indent=2)); print('ha stopped',info['State']['Running'])
 print([(i['Id'][:18],i.get('RepoTags')) for i in api('/images/json')])
