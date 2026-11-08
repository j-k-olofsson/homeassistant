"""Check the house and play deterministic bedtime speech through Music Assistant."""

import asyncio
import hashlib
import json
import logging
from pathlib import Path
import time

import voluptuous as vol

from homeassistant.components.media_player import async_process_play_media_url
from homeassistant.components.tts import async_get_media_source_audio
from homeassistant.components.tts.media_source import generate_media_source_id
from homeassistant.core import SupportsResponse
from homeassistant.exceptions import HomeAssistantError

from .text import FALLBACK, checks_message
from .playback import play_verified

DOMAIN = "granny_goodnight"
PLAYER = "media_player.sovrummet_diegos_vackarklocka_music_assistant"
LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema({DOMAIN: vol.Schema({})}, extra=vol.ALLOW_EXTRA)


async def async_setup(hass, config):
    root = Path(hass.config.path("www", DOMAIN))
    speech_lock = asyncio.Lock()
    root.mkdir(parents=True, exist_ok=True)

    async def prepare_audio(message):
        # Cache exact phrases; old AI queue files are never consulted.
        cache = root / ("fixed_" + hashlib.sha256(message.encode()).hexdigest()[:24] + ".json")
        if cache.is_file():
            clip = json.loads(await hass.async_add_executor_job(cache.read_text))
            if (root / clip["file"]).is_file():
                return clip
        clip = await render_audio(message)
        await hass.async_add_executor_job(cache.write_text, json.dumps(clip, ensure_ascii=False))
        return clip

    async def render_audio(message):
        engine = "tts.heimdal_ha_piper"
        state = hass.states.get(engine)
        if not state or state.state in ("unknown", "unavailable"):
            engine = "tts.cloud"
        source = generate_media_source_id(hass, message, engine=engine, cache=True)
        async with asyncio.timeout(45):
            _, audio = await async_get_media_source_audio(hass, source)
        proc = await asyncio.create_subprocess_exec(
            "ffmpeg", "-v", "error", "-i", "pipe:0",
            "-ar", "48000", "-ac", "1", "-c:a", "flac", "-f", "flac", "pipe:1",
            stdin=asyncio.subprocess.PIPE, stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        try:
            async with asyncio.timeout(20):
                encoded, error = await proc.communicate(audio)
        except BaseException:
            if proc.returncode is None:
                proc.kill()
            await proc.wait()
            raise
        if proc.returncode or not encoded:
            raise HomeAssistantError("Cannot prepare Godnatt audio: " + error.decode()[:200])
        filename = hashlib.sha256(encoded).hexdigest()[:24] + ".flac"
        await hass.async_add_executor_job((root / filename).write_bytes, encoded)
        return {"file": filename, "message": message}

    async def prepare(call=None):
        await prepare_audio(FALLBACK)
        return {"status": "ready"}

    async def speak(call):
        async with speech_lock:
            message, safe = checks_message(lambda entity: (
                hass.states.get(entity).state if hass.states.get(entity) else None))
            clip = await prepare_audio(message)
            url = async_process_play_media_url(hass, f"/local/{DOMAIN}/{clip['file']}")
            started = time.monotonic()
            try:
                await play_verified(hass, PLAYER, url, call.context)
            except (HomeAssistantError, TimeoutError) as error:
                await hass.services.async_call(
                    "persistent_notification", "create",
                    {"notification_id": "granny_goodnight_playback", "title": "Godnatt – ljudet uteblev",
                     "message": f"{message} Uppläsningen misslyckades: {error}"},
                    blocking=True, context=call.context)
                raise
            await hass.services.async_call(
                "persistent_notification", "dismiss",
                {"notification_id": "granny_goodnight_playback"}, blocking=True)
            return {"player": PLAYER, "message": message, "safe": safe,
                    "announcement_completed": True,
                    "service_seconds": round(time.monotonic() - started, 3)}

    hass.services.async_register(DOMAIN, "prepare", prepare, schema=vol.Schema({}),
                                 supports_response=SupportsResponse.OPTIONAL)
    hass.services.async_register(DOMAIN, "speak", speak, schema=vol.Schema({}),
                                 supports_response=SupportsResponse.OPTIONAL)
    return True
