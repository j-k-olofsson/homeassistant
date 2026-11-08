import sys,json,asyncio
sys.path.insert(0,'/homeassistant/tools')
from ha_naming_ids import run
from ha_naming_migration import DOC
plan=json.load(open(DOC/'id-plan-14-firmware.json'))
asyncio.run(run('14-id-firmware',plan['ready_mapping']))
