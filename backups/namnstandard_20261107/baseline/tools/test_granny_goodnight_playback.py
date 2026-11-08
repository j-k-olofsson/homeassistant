"""MA announcement routing and single-clock safety tests; no live devices."""
import importlib.util
from pathlib import Path
from types import SimpleNamespace as NS
import unittest
from unittest.mock import AsyncMock, Mock, patch
from homeassistant.exceptions import HomeAssistantError
spec = importlib.util.spec_from_file_location('playback', Path(__file__).parents[1] / 'custom_components/granny_goodnight/playback.py')
p = importlib.util.module_from_spec(spec)
spec.loader.exec_module(p)

class PlaybackTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.clock={'player_id':p.CLOCK_UUID,'type':'player','available':True,'enabled':True}
        self.registered=NS(platform='music_assistant',unique_id=p.CLOCK_UUID,config_entry_id='ma')
        self.mass=NS(send_command=AsyncMock(return_value=[self.clock]))
        self.hass=NS(states=NS(get=lambda _: NS(state='idle')),
            config_entries=NS(async_get_entry=lambda _:NS(runtime_data=NS(mass=self.mass))),
            services=NS(async_call=AsyncMock()))
        self.registry=patch.object(p.er,'async_get',return_value=NS(async_get=lambda _:self.registered))
        self.registry.start();self.addCleanup(self.registry.stop)
        url_patch=patch.object(p,"async_process_play_media_url",lambda hass,url:url)
        url_patch.start();self.addCleanup(url_patch.stop)

    async def test_uses_ma_chime_without_separate_turn_on(self):
        await p.play_verified(self.hass,'clock_ma','clip',None)
        self.hass.services.async_call.assert_awaited_once_with('music_assistant','play_announcement',
            {'entity_id':'clock_ma','url':'clip','use_pre_announce':True,'announce_volume':40,'pre_announce_url':'/local/granny_goodnight/bedtime_chime.wav'},blocking=True,context=None)

    async def test_unavailable_does_not_dispatch(self):
        self.hass.states.get=lambda _:NS(state='unavailable')
        with self.assertRaises(HomeAssistantError):await p.play_verified(self.hass,'clock_ma','clip',None)
        self.hass.services.async_call.assert_not_awaited()

    async def test_wrong_physical_device_rejected(self):
        self.registered.unique_id='another-speaker'
        with self.assertRaises(HomeAssistantError):await p.play_verified(self.hass,'clock_ma','clip',None)
        self.hass.services.async_call.assert_not_awaited()

    async def test_group_routing_rejected(self):
        for key,value in [('synced_to','leader'),('active_group','group'),('group_members',['other']),('static_group_members',['other'])]:
            with self.subTest(key=key):
                self.clock[key]=value
                with self.assertRaises(HomeAssistantError):await p.play_verified(self.hass,'clock_ma','clip',None)
                self.clock.pop(key)
        self.hass.services.async_call.assert_not_awaited()

    async def test_ma_failure_propagates(self):
        self.hass.services.async_call.side_effect=HomeAssistantError('failed to start')
        with self.assertRaises(HomeAssistantError):await p.play_verified(self.hass,'clock_ma','clip',None)

if __name__=='__main__':unittest.main()
