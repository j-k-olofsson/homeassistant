"""Synchronized Music Assistant announcements with independent queue restoration."""

import asyncio
import logging

import voluptuous as vol

from homeassistant.core import SupportsResponse
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv, entity_registry as er

from .controller import broadcast

DOMAIN = 'granny_sync'
LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema({DOMAIN: vol.Schema({})}, extra=vol.ALLOW_EXTRA)


async def async_setup(hass, config):
    """Serialize speech and restoration as a single operation."""
    lock = asyncio.Lock()

    async def handle(call):
        async with lock:
            entity_id = call.data['entity_id']
            registry_entry = er.async_get(hass).async_get(entity_id)
            if not registry_entry or registry_entry.platform != 'music_assistant':
                raise HomeAssistantError('Target must be a Music Assistant sync group')
            entry = hass.config_entries.async_get_entry(registry_entry.config_entry_id)
            if not entry or not getattr(entry, 'runtime_data', None):
                raise HomeAssistantError('Music Assistant is not ready')
            mass = entry.runtime_data.mass

            async def speak():
                await hass.services.async_call(
                    'tts', 'speak',
                    {'entity_id': call.data['tts_entity_id'],
                     'media_player_entity_id': entity_id,
                     'message': call.data['message'], 'cache': True},
                    blocking=True, context=call.context,
                )

            try:
                async with asyncio.timeout(300):
                    result = await broadcast(
                        mass.send_command, registry_entry.unique_id, speak,
                        inspect_only=call.data['test_only'],
                    )
            except Exception as error:
                LOGGER.error('Granny synchronized announcement failed: %s', error)
                raise HomeAssistantError(str(error)) from error
            LOGGER.info('Granny synchronized announcement: %s', result)
            return result

    hass.services.async_register(
        DOMAIN, 'speak', handle,
        schema=vol.Schema({
            vol.Required('entity_id'): cv.entity_id,
            vol.Optional('tts_entity_id', default='tts.heimdal_ha_piper'): cv.entity_id,
            vol.Optional('message', default=''): cv.string,
            vol.Optional('test_only', default=False): cv.boolean,
        }),
        supports_response=SupportsResponse.OPTIONAL,
    )
    return True
