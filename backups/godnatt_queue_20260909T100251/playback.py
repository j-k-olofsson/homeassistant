"""Require Cast confirmation for the requested clip, not just a service return."""

import asyncio

from homeassistant.core import callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_track_state_change_event


async def play_verified(hass, player, url, context, timeout=12):
    state = hass.states.get(player)
    if state is None or state.state in ("unavailable", "unknown"):
        raise HomeAssistantError("högtalaren är otillgänglig i Home Assistant")

    started = asyncio.Event()

    @callback
    def observe(event):
        state = event.data.get("new_state")
        if (state is not None and state.state == "playing"
                and state.attributes.get("media_content_id") == url):
            started.set()

    unsubscribe = async_track_state_change_event(hass, player, observe)
    try:
        async with asyncio.timeout(timeout):
            await hass.services.async_call(
                "media_player", "play_media",
                {"entity_id": player, "media_content_id": url,
                 "media_content_type": "audio/mpeg"},
                blocking=True, context=context,
            )
            await started.wait()
    except TimeoutError as error:
        raise HomeAssistantError("Cast bekräftade inte att ljudfilen började spelas") from error
    finally:
        unsubscribe()
