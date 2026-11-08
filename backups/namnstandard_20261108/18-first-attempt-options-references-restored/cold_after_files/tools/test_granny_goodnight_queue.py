"""Exercise live service handlers with temporary files and mocked HA/device calls."""
import asyncio
import json
from pathlib import Path
import sys
import tempfile
from types import SimpleNamespace as NS
import unittest
from unittest.mock import AsyncMock, Mock, patch
sys.path.insert(0, str(Path(__file__).parents[1]))
from custom_components import granny_goodnight as g
from homeassistant.exceptions import HomeAssistantError

class QueueTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        items = []
        for i in range(4):
            filename = f'{i}.mp3'
            (self.root / filename).write_bytes(b'audio')
            items.append({k: {'file': filename, 'message': f'{k} greeting {i}'} for k in ('closed','open','unknown')})
        (self.root / 'queue.json').write_text(json.dumps({'queue':items,'recent':[],'audio_version':2}))
        self.handlers = {}
        async def executor(fn,*args):
            return await asyncio.to_thread(fn,*args)
        self.hass = NS(config=NS(path=lambda *args:str(self.root)),
            states=NS(get=lambda entity: NS(state={'binary_sensor.verandan_balkongdorr_oppning':'off', 'cover.honshuset_lucka':'closed', 'lock.entren_ytterdorren':'locked'}.get(entity, 'on'))),
            async_add_executor_job=executor,
            async_create_background_task=Mock(),
            services=NS(async_call=AsyncMock(),async_register=lambda domain,name,fn,**kwargs:self.handlers.update({name:fn})))
        await g.async_setup(self.hass,{})

    async def test_old_ai_queue_is_ignored_and_fixed_clip_reused(self):
        import hashlib
        message = "Godnatt och sov sött!"
        (self.root / 'fixed.flac').write_bytes(b'audio')
        cache = self.root / ("fixed_" + hashlib.sha256(message.encode()).hexdigest()[:24] + ".json")
        cache.write_text(json.dumps({'file': 'fixed.flac', 'message': message}))
        with patch.object(g, 'async_process_play_media_url', lambda hass,url:url), patch.object(g, 'play_verified', AsyncMock()) as play:
            first = await self.handlers['speak'](NS(context=None))
            second = await self.handlers['speak'](NS(context=None))
        self.assertEqual(first['message'], message)
        self.assertEqual(second['message'], message)
        self.assertTrue(first['safe'])
        self.assertEqual(play.await_count, 2)
        self.assertFalse(any(c.args[0] == 'ai_task' for c in self.hass.services.async_call.await_args_list))
        with patch.object(g, 'async_process_play_media_url', lambda hass,url:url), patch.object(g, 'play_verified', AsyncMock(side_effect=HomeAssistantError('offline'))):
            with self.assertRaises(HomeAssistantError):
                await self.handlers['speak'](NS(context=None))
        self.assertTrue(cache.is_file())
        self.assertEqual(self.hass.services.async_call.await_args.args[:2], ('persistent_notification', 'create'))

if __name__ == '__main__':
    unittest.main()
