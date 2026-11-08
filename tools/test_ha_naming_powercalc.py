#!/usr/bin/env python3
"""Exercise the actual related-sensor lookup without starting or actuating HA."""
import ast,enum,logging,pathlib,sys,types,json,random
ROOT=pathlib.Path(__file__).resolve().parents[1]
path=pathlib.Path(sys.argv[1])if len(sys.argv)>1 else ROOT/'custom_components/powercalc/helpers.py'
class SensorClass(enum.StrEnum):BATTERY='battery';CURRENT='current'
class BinaryClass(enum.StrEnum):BATTERY='battery'
NS=types.SimpleNamespace
class Registry:
 def __init__(self,entries):self.entries=entries
registry=Registry([]);linked={}
api=NS(async_get=lambda hass:registry,async_entries_for_device=lambda reg,did:[e for e in reg.entries if e.device_id==did and e.disabled_by is None])
ctx={'SensorDeviceClass':SensorClass,'BinarySensorDeviceClass':BinaryClass,'entity_registry':api,'_LOGGER':logging.getLogger('powercalc_test'),'get_profile_related_devices':lambda hass,did:[NS(id=d)for d in linked.get(did,[])]}
ctx['_LOGGER'].setLevel(logging.CRITICAL)
tree=ast.parse(path.read_text());nodes=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in['get_related_entity_by_device_class','_get_related_entity_for_device']]
assert len(nodes)==2
exec(compile(ast.fix_missing_locations(ast.Module(body=[ast.ImportFrom(module='__future__',names=[ast.alias(name='annotations')],level=0)]+nodes,type_ignores=[])),str(path),'exec'),ctx)
lookup=ctx['get_related_entity_by_device_class'];source=NS(entity_id='vacuum.koket_max_s6_maxv',device_id='device',entity_entry=NS(platform='roborock'))
def entry(eid,platform='roborock',did='device',disabled=None,dc='battery'):
 return NS(entity_id=eid,platform=platform,device_id=did,disabled_by=disabled,device_class=None,original_device_class=dc)
native=entry('sensor.koket_max_s6_maxv_batteriniva');note=entry('sensor.battery_notes_battery','battery_notes');low=entry('binary_sensor.battery_notes_low','battery_notes')
# Equal-valued StrEnum classes must not make on/off flags into numeric battery sources.
for seed in range(20):
 registry.entries=[native,note,low];random.Random(seed).shuffle(registry.entries)
 assert lookup(None,source,SensorClass.BATTERY)==native.entity_id
 assert lookup(None,source,BinaryClass.BATTERY)==low.entity_id
registry.entries=[low];assert lookup(None,source,SensorClass.BATTERY)is None
registry.entries=[low,note];assert lookup(None,source,SensorClass.BATTERY)==note.entity_id
registry.entries=[note,entry('sensor.second_notes','battery_notes')];assert lookup(None,source,SensorClass.BATTERY)is None
registry.entries=[entry('sensor.disabled_native',disabled='user'),low,note];assert lookup(None,source,SensorClass.BATTERY)==note.entity_id
linked['device']=['linked'];registry.entries=[low,entry('sensor.linked_battery',did='linked')];assert lookup(None,source,SensorClass.BATTERY)=='sensor.linked_battery'
registry.entries.append(entry('sensor.second_linked_battery',did='linked'));assert lookup(None,source,SensorClass.BATTERY)is None
# Real reviewed HA registry: the vacuum must use its native Roborock sensor.
p=ROOT/'backups/namnstandard_20261108_totalanalys/before/entities.json'
if p.exists():
 es=json.load(p.open());vac=next(e for e in es if e['entity_id']=='vacuum.koket_max_s6_maxv');source.device_id=vac['device_id'];source.entity_entry.platform=vac['platform']
 registry.entries=[NS(**{k:e.get(k)for k in['entity_id','platform','device_id','disabled_by','device_class','original_device_class']})for e in es];linked.clear()
 assert lookup(None,source,SensorClass.BATTERY)=='sensor.koket_max_s6_maxv_batteriniva'
print('POWER_CALC_SOURCE_LOOKUP_PASSED: numeric vs binary, native preference, ordering, disabled, ambiguous, linked, real registry')
