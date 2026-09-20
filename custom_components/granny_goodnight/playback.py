"""Use Music Assistant's complete announcement path for the single clock."""
import asyncio
from homeassistant.exceptions import HomeAssistantError
from homeassistant.components.media_player import async_process_play_media_url
from homeassistant.helpers import entity_registry as er

CLOCK_UUID = "a56bb45d-aa7e-3a34-132d-5baa281f1f23"

async def play_verified(hass, player, url, context, timeout=60):
    state = hass.states.get(player)
    if state is None or state.state in ("unavailable", "unknown"):
        raise HomeAssistantError("högtalaren är otillgänglig i Music Assistant")
    registered = er.async_get(hass).async_get(player)
    if (registered is None or registered.platform != "music_assistant"
            or registered.unique_id != CLOCK_UUID):
        raise HomeAssistantError("mottagaren är inte Diegos väckarklocka i Music Assistant")
    entry = hass.config_entries.async_get_entry(registered.config_entry_id)
    runtime = getattr(entry, "runtime_data", None)
    if not runtime:
        raise HomeAssistantError("Music Assistant är inte redo")
    async with asyncio.timeout(timeout):
        players = await runtime.mass.send_command("players/all")
        clock = next((p for p in players if p["player_id"] == CLOCK_UUID), None)
        if not clock or not clock.get("available") or not clock.get("enabled"):
            raise HomeAssistantError("väckarklockan är inte tillgänglig i Music Assistant")
        # MA can forward a group leader's announcement to the entire group.
        # Refuse grouped use instead of risking audio in other rooms.
        if (clock.get("type") != "player" or clock.get("synced_to")
                or clock.get("active_group") or clock.get("group_members")
                or clock.get("static_group_members")):
            raise HomeAssistantError("väckarklockan ingår i en aktiv grupp; Godnatt kräver enbart väckarklockan")
        await hass.services.async_call(
            "music_assistant", "play_announcement",
            {"entity_id": player, "url": url, "use_pre_announce": True,
             "announce_volume": 40,
             "pre_announce_url": async_process_play_media_url(
                 hass, "/local/granny_goodnight/bedtime_chime.wav")},
            blocking=True, context=context,
        )
