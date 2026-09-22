import json,datetime,statistics,urllib.request,os
from zoneinfo import ZoneInfo
from pathlib import Path
root=Path('/config/backups/level-estimate-simulation')
s=json.load(open(root/'statistics.json'))['result'];tz=ZoneInfo('Europe/Stockholm');today=datetime.datetime.now(tz).date()
refills={'sensor.gasol_utomhus_esphome73_lpg_level':datetime.date(2026,8,4),'sensor.esphome90_esphome90_salt_level':datetime.date(2026,9,10),'sensor.vattenniva_honshuset_esphome74_water_level':datetime.date(2026,9,16)}
report={}
for entity,rows in s.items():
 ds={}
 for r in rows:
  if r.get('mean') is not None:
   d=datetime.datetime.fromtimestamp(r['start']/1000,tz).date()
   ds.setdefault(d,[]).append(r['mean'])
 daily={d:statistics.median(v) for d,v in ds.items() if d<today and len(v)>=12}
 current=json.load(urllib.request.urlopen(urllib.request.Request('http://supervisor/core/api/states/'+entity,headers={'Authorization':'Bearer '+os.environ['SUPERVISOR_TOKEN']})))
 level=float(current['state']);points=[(d,v) for d,v in sorted(daily.items()) if d>refills[entity] and v<98]
 result={'current':level,'as_of':datetime.datetime.now(tz).isoformat(),'refill_candidate':str(refills[entity]),'windows':[]}
 for n in [3,7,14]:
  if len(points)<n:continue
  a,b=points[-n],points[-1];days=(b[0]-a[0]).days;rate=(a[1]-b[1])/days
  result['windows'].append({'n_daily_points':n,'from':str(a[0]),'to':str(b[0]),'first':a[1],'last':b[1],'elapsed_days':days,'rate_pp_day':rate,'days_to_20':max(0,level-20)/rate if rate>0 else None,'days_to_zero':level/rate if rate>0 else None})
 # Rolling check: predict daily median 3 days ahead from the previous 7 daily medians.
 errors=[]
 dates=sorted(daily)
 for end in dates:
  start=end-datetime.timedelta(days=6);target=end+datetime.timedelta(days=3)
  if start not in daily or target not in daily:continue
  seq=[daily.get(start+datetime.timedelta(days=i)) for i in range(10)]
  if any(v is None for v in seq):continue
  if any(seq[i+1]-seq[i]>15 for i in range(9)):continue
  if max(seq)>=98:continue
  rate=(daily[start]-daily[end])/6
  if rate<=0 or min(seq)<0:continue
  pred=daily[end]-rate*3
  errors.append(abs(pred-daily[target]))
 result['backtest']={'forecast_days':3,'training_daily_points':7,'count':len(errors),'median_abs_error_pp':statistics.median(errors) if errors else None,'max_abs_error_pp':max(errors) if errors else None}
 report[entity]=result
print(json.dumps(report,ensure_ascii=False,indent=2));(root/'analysis.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
