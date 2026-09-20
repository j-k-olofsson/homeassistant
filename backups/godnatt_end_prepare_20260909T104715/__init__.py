"""Prepare AI/TTS ahead of time; play unencoded audio through Music Assistant at bedtime."""

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

from .text import FALLBACK, PROMPT, door_variant, variants, greeting
from .playback import play_verified

DOMAIN = "granny_goodnight"
PLAYER = "media_player.diegos_vackarklocka_ma"
DOOR = "binary_sensor.shelly_blu_door_window_2a6d_window"
LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema({DOMAIN: vol.Schema({})}, extra=vol.ALLOW_EXTRA)


async def async_setup(hass, config):
    root = Path(hass.config.path("www", DOMAIN))
    lock = asyncio.Lock()
    storage_lock = asyncio.Lock()
    speech_lock = asyncio.Lock()
    manifest = {"queue": [], "recent": [], "audio_version": 2}

    def read_manifest():
        root.mkdir(parents=True, exist_ok=True)
        try:
            data = json.loads((root / "queue.json").read_text())
            if data.get("audio_version") != 2:
                return {"queue": [], "recent": data.get("recent", [])[-12:], "audio_version": 2}
            queue = [item for item in data["queue"] if all(
                (root / item[k]["file"]).is_file() for k in ("closed", "open", "unknown"))]
            return {"queue": queue, "recent": data.get("recent", [])[-12:], "audio_version": 2}
        except (OSError, ValueError, KeyError, TypeError):
            return {"queue": [], "recent": []}

    manifest.update(await hass.async_add_executor_job(read_manifest))

    async def save():
        # Serialize snapshots so a background refill cannot overwrite consumption.
        async with storage_lock:
            payload = json.dumps(manifest, ensure_ascii=False)
            def commit():
                temp = root / "queue.tmp"
                temp.write_text(payload)
                temp.replace(root / "queue.json")
            await hass.async_add_executor_job(commit)

    async def prepare(call=None):
        if lock.locked():
            return {"status": "already_preparing"}
        async with lock:
            attempts = 0
            while len(manifest["queue"]) < 4 and attempts < 8:
                attempts += 1
                await prepare_one()
            return {"status": "ready" if len(manifest["queue"]) >= 4 else "partial",
                    "queued": len(manifest["queue"])}

    async def prepare_one():
        text = FALLBACK
        try:
            async with asyncio.timeout(45):
                result = await hass.services.async_call(
                    "ai_task", "generate_data",
                    {"entity_id": "ai_task.ollama_ai_task", "task_name": "godnatt_kort",
                     "instructions": PROMPT + " Undvik att upprepa dessa tidigare hälsningar: "
                     + json.dumps(manifest["recent"] + [x["closed"]["message"] for x in manifest["queue"]], ensure_ascii=False)}, blocking=True, return_response=True,
                )
                text = result.get("data", FALLBACK)
        except Exception as error:
            LOGGER.warning("Godnatt preparation: using short fallback: %s", error)
        text = greeting(text)
        if text in manifest["recent"] or any(x["closed"]["message"] == text for x in manifest["queue"]):
            LOGGER.warning("Discarding repeated Godnatt greeting; requesting another")
            return
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
            prepared[key] = {"file": filename, "message": message}
        prepared["prepared_at"] = time.time()

        manifest["queue"].append(prepared)
        await save()
        LOGGER.info("Prepared queued Godnatt greeting (%s ready): %s", len(manifest["queue"]), text)

    async def refill():
        try:
            await prepare()
        except Exception:
            LOGGER.exception("Could not refill Godnatt queue; retaining prepared greetings")

    async def speak(call):
        async with speech_lock:
            return await speak_one(call)

    async def speak_one(call):
        if not manifest["queue"]:
            raise HomeAssistantError("Godnatt audio not prepared; run granny_goodnight.prepare")
        state = hass.states.get(DOOR)
        key = door_variant(state.state if state else None)
        selected = manifest["queue"][0]
        clip = selected[key]
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
        manifest["queue"].remove(selected)
        manifest["recent"] = (manifest["recent"] + [selected["closed"]["message"]])[-12:]
        await save()
        hass.async_create_background_task(refill(), "Refill Godnatt greetings")
        await hass.services.async_call(
            "persistent_notification", "dismiss",
            {"notification_id": "granny_goodnight_playback"}, blocking=True,
        )
        return {"player": PLAYER, "door_variant": key, "message": clip["message"],
                "announcement_completed": True, "service_seconds": round(time.monotonic() - started, 3)}

    hass.services.async_register(DOMAIN, "prepare", prepare, schema=vol.Schema({}),
                                 supports_response=SupportsResponse.OPTIONAL)
    hass.services.async_register(DOMAIN, "speak", speak, schema=vol.Schema({}),
                                 supports_response=SupportsResponse.OPTIONAL)
    return True
