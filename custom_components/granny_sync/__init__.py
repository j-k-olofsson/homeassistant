"""Fault-tolerant announcements using the existing Music Assistant sync group."""

import asyncio
import logging

import voluptuous as vol

from homeassistant.components.media_player import async_process_play_media_url
from homeassistant.core import SupportsResponse
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv, entity_registry as er

from .controller import broadcast

DOMAIN = "granny_sync"
LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema({DOMAIN: vol.Schema({})}, extra=vol.ALLOW_EXTRA)


async def async_setup(hass, config):
    """Register a serialized service, leaving all single-speaker TTS unchanged."""
    lock = asyncio.Lock()

    async def handle(call):
        async with lock:
            entity_id = call.data["entity_id"]
            registry_entry = er.async_get(hass).async_get(entity_id)
            if not registry_entry or registry_entry.platform != "music_assistant":
                raise HomeAssistantError("Target must be a Music Assistant sync group")
            entry = hass.config_entries.async_get_entry(registry_entry.config_entry_id)
            if not entry or not getattr(entry, "runtime_data", None):
                raise HomeAssistantError("Music Assistant is not ready")
            mass = entry.runtime_data.mass
            group_id = registry_entry.unique_id
            silence_url = async_process_play_media_url(hass, "/local/granny_sync_silence.wav")
            cast_entities = {
                e.unique_id: e.entity_id for e in er.async_get(hass).entities.values()
                if e.platform == "cast" and not e.disabled_by
            }

            async def command(name, **kwargs):
                result = await mass.send_command(name, **kwargs)
                if name == "players/all":
                    for player in result:
                        cast_uuid = player.get("device_info", {}).get("identifiers", {}).get("cast_uuid")
                        if cast_entity := cast_entities.get(cast_uuid):
                            state = hass.states.get(cast_entity)
                            player["_cast_state"] = state.state if state else "unknown"
                            player["_cast_app_name"] = (state.attributes.get("app_name") or "") if state else ""
                return result

            async def prepare():
                await mass.players.play_announcement(
                    group_id, url=silence_url, pre_announce=False
                )

            async def speak():
                if not call.data["test_only"]:
                    await hass.services.async_call(
                        "tts", "speak",
                        {"entity_id": call.data["tts_entity_id"],
                         "media_player_entity_id": entity_id,
                         "message": call.data["message"], "cache": False},
                        blocking=True, context=call.context,
                    )

            try:
                async with asyncio.timeout(300):
                    result = await broadcast(command, group_id, prepare, speak)
            except Exception as error:
                LOGGER.error("Granny synchronized announcement failed: %s", error)
                raise HomeAssistantError(str(error)) from error
            LOGGER.info("Granny sync ready: %s", result)
            return result

    hass.services.async_register(
        DOMAIN, "speak", handle,
        schema=vol.Schema({
            vol.Required("entity_id"): cv.entity_id,
            vol.Optional("tts_entity_id", default="tts.piper"): cv.entity_id,
            vol.Optional("message", default=""): cv.string,
            vol.Optional("test_only", default=False): cv.boolean,
        }),
        supports_response=SupportsResponse.OPTIONAL,
    )
    return True
