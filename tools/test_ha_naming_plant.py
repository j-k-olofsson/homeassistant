#!/usr/bin/env python3
"""Test existing/new constructor ID resolution without HA or hardware actions."""
import ast,pathlib,types
ROOT=pathlib.Path('/homeassistant')
def test(paths):
 tested=0
 for path in paths:
  tree=ast.parse(path.read_text())
  for node in ast.walk(tree):
   if not isinstance(node,ast.If)or not isinstance(node.test,ast.NamedExpr):continue
   expr=node.test.value
   if not isinstance(expr,ast.Call)or not isinstance(expr.func,ast.Attribute)or expr.func.attr!='async_get_entity_id':continue
   if not any(isinstance(x,ast.Assign)and any(ast.unparse(t)=='self.entity_id'for t in x.targets)for x in node.body):continue
   class Registry:
    existing=True
    def async_get_entity_id(self,domain,platform,uid):return domain+'.rum_enhet_funktion'if self.existing else None
   registry=Registry()
   def generate(*args,**kwargs):raise AssertionError('A registered ID must not be regenerated')
   for exists in[True,False]:
    registry.existing=exists;entity=types.SimpleNamespace(_attr_unique_id='stable_uid',entity_id=None)
    ns={'ent_reg':registry,'self':entity,'config':types.SimpleNamespace(entry_id='stable_entry'),'SENSOR_DOMAIN':'sensor','NUMBER_DOMAIN':'number','DOMAIN':'plant','async_generate_entity_id':generate}
    exec(compile(ast.fix_missing_locations(ast.Module(body=[node],type_ignores=[])),str(path),'exec'),ns)
    expected=expr.args[0].id;domain=ns[expected]
    assert entity.entity_id==(domain+'.rum_enhet_funktion'if exists else None)
   tested+=1
 assert tested>=7,('Expected seven ID-resolution constructors',tested)
 print('PLANT_ID_RESOLUTION_PASSED',tested,'constructors, existing and new entities')
if __name__=='__main__':
 import sys
 base=pathlib.Path(sys.argv[1])if len(sys.argv)>1 else ROOT
 test([base/'custom_components/plant/sensor.py',base/'custom_components/plant/number.py'])
