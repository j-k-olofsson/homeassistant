"""Prepare AI/TTS ahead of time; only play a padded local file at bedtime."""

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

from .text import FALLBACK, PROMPT, door_variant, variants
from .playback import play_verified

DOMAIN = "granny_goodnight"
PLAYER = "media_player.diegos_vackarklocka"
DOOR = "binary_sensor.shelly_blu_door_window_2a6d_window"
LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema({DOMAIN: vol.Schema({})}, extra=vol.ALLOW_EXTRA)


async def async_setup(hass, config):
    root = Path(hass.config.path("www", DOMAIN))
    lock = asyncio.Lock()
    manifest = {}

    def read_manifest():
        root.mkdir(parents=True, exist_ok=True)
        try:
            data = json.loads((root / "index.json").read_text())
            if all((root / data[k]["file"]).is_file() for k in ("closed", "open", "unknown")):
                return data
        except (OSError, ValueError, KeyError, TypeError):
            pass
        return {}

    manifest.update(await hass.async_add_executor_job(read_manifest))

    async def prepare(call=None):
        if lock.locked():
            return {"status": "already_preparing"}
        async with lock:
            text = FALLBACK
            try:
                async with asyncio.timeout(45):
                    result = await hass.services.async_call(
                        "ai_task", "generate_data",
                        {"entity_id": "ai_task.ollama_ai_task", "task_name": "godnatt_kort",
                         "instructions": PROMPT}, blocking=True, return_response=True,
                    )
                    text = result.get("data", FALLBACK)
            except Exception as error:
                LOGGER.warning("Godnatt preparation: using short fallback: %s", error)
            prepared = {}
            for key, message in variants(text).items():
                engine = "tts.piper"
                state = hass.states.get(engine)
                if not state or state.state in ("unknown", "unavailable"):
                    engine = "tts.cloud"
                source = generate_media_source_id(hass, message, engine=engine, cache=True)
                async with asyncio.timeout(45):
                    _, audio = await async_get_media_source_audio(hass, source)
                proc = await asyncio.create_subprocess_exec(
                    "ffmpeg", "-v", "error", "-i", "pipe:0", "-af", "adelay=2000:all=1",
                    "-ar", "24000", "-ac", "1", "-c:a", "libmp3lame", "-f", "mp3", "pipe:1",
                    stdin=asyncio.subprocess.PIPE, stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE,
                )
                try:
                    async with asyncio.timeout(20):
                        padded, error = await proc.communicate(audio)
                except BaseException:
                    if proc.returncode is None:
                        proc.kill()
                    await proc.wait()
                    raise
                if proc.returncode or not padded:
                    raise HomeAssistantError("Cannot prepare Godnatt audio: " + error.decode()[:200])
                filename = hashlib.sha256(padded).hexdigest()[:24] + ".mp3"
                await hass.async_add_executor_job((root / filename).write_bytes, padded)
                prepared[key] = {"file": filename, "message": message}
            prepared["prepared_at"] = time.time()

            def commit():
                temp = root / "index.tmp"
                temp.write_text(json.dumps(prepared, ensure_ascii=False))
                temp.replace(root / "index.json")
                # Keep a full day of older clips so in-flight playback URLs stay valid.
                keep = {prepared[k]["file"] for k in ("closed", "open", "unknown")}
                for path in root.glob("*.mp3"):
                    if path.name not in keep and path.stat().st_mtime < time.time() - 86400:
                        path.unlink()
            await hass.async_add_executor_job(commit)
            manifest.clear()
            manifest.update(prepared)
            LOGGER.info("Prepared short Godnatt audio: %s", {k:v["message"] for k,v in prepared.items() if isinstance(v, dict)})
            return {"status": "ready"}

    async def speak(call):
        if not manifest:
            raise HomeAssistantError("Godnatt audio not prepared; run granny_goodnight.prepare")
        state = hass.states.get(DOOR)
        key = door_variant(state.state if state else None)
        clip = manifest[key]
        url = async_process_play_media_url(hass, f"/local/{DOMAIN}/{clip['file']}")
        started = time.monotonic()
        try:
            await play_verified(hass, PLAYER, url, call.context)
        except (HomeAssistantError, TimeoutError) as error:
            message = (
                f"Godnatt kunde inte spelas upp i Diegos väckarklocka: {error}. "
                f"Dörrläge: {key}. Meddelandet som skulle läsas upp: {clip['message']}"
            )
            LOGGER.error(message)
            await hass.services.async_call(
                "persistent_notification", "create",
                {"notification_id": "granny_goodnight_playback", "title": "Godnatt – ljudet uteblev",
                 "message": message}, blocking=True, context=call.context,
            )
            raise HomeAssistantError(message) from error
        await hass.services.async_call(
            "persistent_notification", "dismiss",
            {"notification_id": "granny_goodnight_playback"}, blocking=True,
        )
        return {"player": PLAYER, "door_variant": key, "message": clip["message"],
                "playback_confirmed": True, "start_seconds": round(time.monotonic() - started, 3)}

    hass.services.async_register(DOMAIN, "prepare", prepare, schema=vol.Schema({}),
                                 supports_response=SupportsResponse.OPTIONAL)
    hass.services.async_register(DOMAIN, "speak", speak, schema=vol.Schema({}),
                                 supports_response=SupportsResponse.OPTIONAL)
    return True
