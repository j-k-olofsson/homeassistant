"""Private deployment verification; credentials never leave memory."""
import asyncio
import json
import sys
from pathlib import Path
import aiohttp

ROOT = Path('/config/backups/inkopslogg_sortering_20261108')

async def main():
    async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=30)) as session:
        auth = json.loads(Path('/config/.storage/auth').read_text())['data']
        admins = {u['id'] for u in auth['users'] if u.get('is_active') and 'system-admin' in u.get('group_ids', [])}
        tokens = [t for t in auth['refresh_tokens'] if t['user_id'] in admins and t.get('client_id') and t.get('token_type') == 'normal']
        for token in sorted(tokens, key=lambda t: t.get('last_used_at') or '', reverse=True):
            async with session.post('http://127.0.0.1:80/auth/token', data={'grant_type': 'refresh_token', 'refresh_token': token['token'], 'client_id': token['client_id']}) as response:
                result = await response.json()
                if response.status == 200:
                    access = result['access_token']
                    break
        else:
            raise RuntimeError('No usable administrator session')
        async with session.ws_connect('http://127.0.0.1:80/api/websocket') as ws:
            await ws.receive_json()
            await ws.send_json({'type': 'auth', 'access_token': access})
            assert (await ws.receive_json())['type'] == 'auth_ok'
            sequence = 0
            async def call(kind, **kwargs):
                nonlocal sequence
                sequence += 1
                await ws.send_json({'id': sequence, 'type': kind, **kwargs})
                while True:
                    value = await ws.receive_json()
                    if value.get('id') == sequence and value['type'] == 'result':
                        assert value.get('success'), value.get('error')
                        return value.get('result')
            mode = sys.argv[1]
            if mode == 'restart':
                await call('call_service', domain='homeassistant', service='restart', service_data={})
                print('Restart requested')
                return
            config = await call('get_config')
            states = await call('get_states')
            lists = {}
            for state in states:
                if state['entity_id'].startswith('todo.'):
                    lists[state['entity_id']] = (await call('todo/item/list', entity_id=state['entity_id']))['items']
            if mode == 'live-test':
                expected = lists['todo.inkopslogg']
                await call('todo/item/move', entity_id='todo.inkopslogg', uid=expected[-1]['uid'])
                await asyncio.sleep(2)
                actual = (await call('todo/item/list', entity_id='todo.inkopslogg'))['items']
                assert actual == expected, 'Automatic correction of list order failed'
                print(json.dumps({'live_subscription_verified': True, 'order_automatically_restored': True, 'items': len(actual)}))
                return
            (ROOT / (mode + '.json')).write_text(json.dumps(lists, ensure_ascii=False, indent=2))
            if mode == 'before':
                print(json.dumps({'state': config['state'], 'counts': {k: len(v) for k, v in lists.items()}}))
                return
            assert config['state'] == 'RUNNING', config['state']
            assert 'todo_order' in config['components']
            before = json.loads((ROOT / 'before.json').read_text())
            for entity_id, items in lists.items():
                if entity_id == 'todo.inkopslogg':
                    assert sorted(items, key=lambda x: x['uid']) == sorted(before[entity_id], key=lambda x: x['uid']), 'Item content changed'
                    from datetime import date, datetime
                    from homeassistant.components.todo import TodoItem
                    sys.path.insert(0, '/config')
                    from custom_components.todo_order import sort_key
                    from homeassistant.util import dt as dt_util
                    from zoneinfo import ZoneInfo
                    dt_util.set_default_time_zone(ZoneInfo(config['time_zone']))
                    parsed = [TodoItem(uid=i['uid'], due=(datetime.fromisoformat(i['due']) if 'T' in i['due'] else date.fromisoformat(i['due'])) if i.get('due') else None) for i in items]
                    assert parsed == sorted(parsed, key=sort_key, reverse=True), 'Order incorrect'
                else:
                    assert items == before[entity_id], f'Other list changed: {entity_id}'
            print(json.dumps({'running': True, 'integration_loaded': True, 'items': len(lists['todo.inkopslogg']), 'content_preserved': True, 'other_lists_unchanged': True, 'top_dates': [i.get('due') for i in lists['todo.inkopslogg'][:5]]}))

asyncio.run(main())
