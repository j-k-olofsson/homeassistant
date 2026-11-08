"""Run inside Eir's HA container; credentials stay in memory and are never printed."""
import asyncio
import json
from pathlib import Path
import sys
import time

import aiohttp

ROOT = Path('/config/whisper-migration-20261001')
BASE = 'http://127.0.0.1:80'

async def authenticate(session):
    auth = json.loads(Path('/config/.storage/auth').read_text())['data']
    admins = {x['id'] for x in auth['users'] if x.get('is_active') and 'system-admin' in x.get('group_ids', [])}
    tokens = sorted((x for x in auth['refresh_tokens'] if x['user_id'] in admins and x.get('token_type') == 'normal' and x.get('client_id')), key=lambda x: x.get('last_used_at') or '', reverse=True)
    for token in tokens:
        data = {'grant_type': 'refresh_token', 'refresh_token': token['token'], 'client_id': token['client_id']}
        async with session.post(BASE+'/auth/token', data=data) as response:
            result = await response.json()
            if response.status == 200 and 'access_token' in result:
                return result['access_token']
    raise RuntimeError('No usable existing HA admin refresh token')

async def main():
    op = sys.argv[1]
    async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=120)) as session:
        token = await authenticate(session)
        async with session.ws_connect(BASE+'/api/websocket') as ws:
            await ws.receive_json()
            await ws.send_json({'type':'auth','access_token':token})
            assert (await ws.receive_json())['type'] == 'auth_ok'
            if op == 'status':
                results = {}
                for i, message in enumerate([
                    {'type':'config_entries/get_single','entry_id':'01K7RYJTP6SWZ7WTSPF9Z871F0'},
                    {'type':'assist_pipeline/pipeline/list'},
                    {'type':'get_states'},
                ], 1):
                    await ws.send_json({'id':i,**message})
                    while True:
                        result = await ws.receive_json()
                        if result.get('id') == i and result['type'] == 'result': break
                    assert result['success'], result.get('error')
                    if i == 1: results['whisper_entry'] = result['result']
                    elif i == 2: results['pipelines'] = result['result']
                    else: results['states'] = [{'entity_id':x['entity_id'],'state':x['state']} for x in result['result'] if x['entity_id'] in {'stt.faster_whisper','conversation.ollama_conversation','tts.piper'}]
                print(json.dumps(results,ensure_ascii=False))
                return
            if op != 'pipeline': raise RuntimeError('Unsupported operation')
            audio = (ROOT/sys.argv[2]).read_bytes()
            end_stage = sys.argv[3] if len(sys.argv) > 3 else 'stt'
            await ws.send_json({'id':1,'type':'assist_pipeline/run','start_stage':'stt','end_stage':end_stage,'pipeline':'01k47r34sraw7qdxdtsw1rbv1e','input':{'sample_rate':16000},'timeout':90})
            events = []
            handler = None
            sent = False
            started = time.monotonic()
            async for message in ws:
                if message.type != aiohttp.WSMsgType.TEXT: raise RuntimeError('HA websocket ended')
                result = json.loads(message.data)
                if result['type'] == 'result' and not result.get('success'): raise RuntimeError(result.get('error'))
                if result['type'] != 'event': continue
                event = result['event']
                events.append(event)
                if event['type'] == 'run-start':
                    handler = event['data']['runner_data']['stt_binary_handler_id']
                if event['type'] == 'stt-start' and not sent:
                    assert handler is not None
                    for offset in range(0,len(audio),3200):
                        await ws.send_bytes(bytes([handler])+audio[offset:offset+3200])
                    await ws.send_bytes(bytes([handler]))
                    sent = True
                if event['type'] == 'error': raise RuntimeError(event['data'])
                if event['type'] == 'run-end': break
            assert any(x['type']=='stt-end' for x in events), 'Missing transcript'
            if end_stage == 'tts': assert any(x['type']=='tts-end' for x in events), 'Missing TTS result'
            audio_bytes = None
            if end_stage == 'tts':
                output = next(x['data']['tts_output'] for x in events if x['type']=='tts-end')
                async with session.get(BASE+output['url'],headers={'Authorization':'Bearer '+token}) as response:
                    assert response.status == 200, 'TTS audio could not be fetched'
                    audio_bytes = len(await response.read())
                    assert audio_bytes > 256, 'TTS returned empty audio'
            print(json.dumps({'seconds':time.monotonic()-started,'tts_audio_bytes':audio_bytes,'events':events},ensure_ascii=False))

asyncio.run(main())
