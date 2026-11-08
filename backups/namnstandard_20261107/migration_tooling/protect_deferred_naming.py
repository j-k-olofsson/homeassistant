import sys,json,asyncio
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_migration import HA,DOC,dump
async def main():
 root='0cc979ea34852945574729129825a6b2'
 async with HA()as ha:
  linked=(await ha.call('config/device_registry/list_linked_devices',device_id=root))['linked_devices']
 dump(DOC/'restpunkter.json',{'status':'Utreds senare enligt användarens besked','protected_entity_ids':['input_number.slider'],'protected_device_ids':sorted(set([root]+linked)),'reason':'Syftet med Slider och placeringen för ESPHome09 är oklara. Ingen fortsatt namn-/ID-/områdesändring för dessa innan de har utretts.'})
 print('Deferred device representations protected',len(set([root]+linked)))
asyncio.run(main())
