import sys,asyncio,json
sys.path.insert(0,'/tmp')
from marketplace_audit import HA,ROOT
OUT=ROOT/'backups/marketplace_trials_20261107'
async def main():
 async with HA() as h:
  async def req(path,payload):
   async with h.s.post('http://127.0.0.1:80/api/'+path,headers={'Authorization':'Bearer '+h.token},json=payload) as r:
    d=await r.json();assert r.status==200,(r.status,d)
   assert not d.get('errors'),d
   return d
  for domain in ['bermuda','scheduler','adaptive_lighting']:
   es=await h.call('config_entries/get');existing=[e for e in es if e['domain']==domain]
   if existing:print('EXISTS',domain,existing[0]['state'],flush=True);continue
   d=await req('config/config_entries/flow',{'handler':domain,'show_advanced_options':True})
   if d['type']=='form':d=await req('config/config_entries/flow/'+d['flow_id'],{'name':'Ateljén – test'} if domain=='adaptive_lighting' else {})
   (OUT/(domain+'_created.json')).write_text(json.dumps(d,ensure_ascii=False,indent=2));print('CREATED',domain,d['type'],d.get('result',{}).get('state'),flush=True)
   assert d['type']=='create_entry',d
asyncio.run(main())
