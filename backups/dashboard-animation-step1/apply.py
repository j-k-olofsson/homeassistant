import copy, datetime, json, os
from pathlib import Path
import websocket

folder = Path('/config/backups/dashboard-animation-step1')
ws = websocket.create_connection('ws://supervisor/core/websocket', timeout=20)
ws.recv()
ws.send(json.dumps({'type': 'auth', 'access_token': os.environ['SUPERVISOR_TOKEN']}))
assert json.loads(ws.recv())['type'] == 'auth_ok'
seq = 0
def call(kind, **args):
    global seq
    seq += 1
    ws.send(json.dumps(dict(id=seq, type=kind, **args)))
    while True:
        reply = json.loads(ws.recv())
        if reply.get('id') == seq:
            assert reply.get('success'), str(reply.get('error'))
            return reply.get('result')

original = call('lovelace/config', url_path=None)
config = copy.deepcopy(original)
path = ['views', 0, 'sections', 2, 'cards', 4]
card = config
for key in path:
    card = card[key]
assert card.get('entity') == 'switch.poolpump_utomhus_esphome27_relay_state'
assert card.get('type') == 'button' and 'card_mod' not in card
backup = folder / ('original-' + datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ') + '.json')
backup.write_text(json.dumps(original, ensure_ascii=False, indent=2))
card['icon'] = 'mdi:fan'
card['card_mod'] = {'style': '''ha-state-icon {
  transform-origin: center;
}
ha-state-icon[data-state="on"] {
  animation: poolpump-rotation 4s linear infinite;
}
@keyframes poolpump-rotation {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  ha-state-icon[data-state="on"] { animation: none; }
}
'''}
(folder / 'change.json').write_text(json.dumps({'path':path,'original_card':original['views'][0]['sections'][2]['cards'][4],'updated_card':card,'backup':str(backup)},ensure_ascii=False,indent=2))
assert call('lovelace/config', url_path=None) == original, 'Dashboard changed concurrently; stopped'
call('lovelace/config/save', url_path=None, config=config)
assert call('lovelace/config', url_path=None) == config, 'Readback mismatch'
print('Saved and verified: only pool pump icon and card_mod changed.')
print('Backup:',backup)
ws.close()
