import asyncio,json
from marketplace_audit import HA,ROOT,OUT
async def main():
 async with HA() as h:
  d={'panels':await h.call('get_panels'),'dashboards':await h.call('lovelace/dashboards/list'),'resources':await h.call('lovelace/resources'),'configs':{}}
  for db in [None]+[x['url_path'] for x in d['dashboards'] if x['mode']=='storage']:
   try:d['configs'][db or 'default']=await h.call('lovelace/config',**({'url_path':db} if db else {}))
   except Exception as e:d['configs'][db or 'default']={'error':str(e)}
  d['http']=[]
  for r in d['resources']:
   url=r['url']
   if not url.startswith('/'):continue
   async with h.s.get('http://127.0.0.1:80'+url,headers={'Authorization':'Bearer '+h.token}) as resp:d['http'].append({'url':url,'http':resp.status,'type':resp.headers.get('Content-Type')});await resp.read()
  (OUT/'frontend.json').write_text(json.dumps(d,ensure_ascii=False,indent=2));print('panels',list(d['panels']));print('dashboard configs',list(d['configs']));print('resources',len(d['http']),'errors',[x for x in d['http'] if x['http']!=200])
asyncio.run(main())
