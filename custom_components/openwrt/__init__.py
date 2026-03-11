from __future__ import annotations
from .constants import DOMAIN, PLATFORMS

from homeassistant.core import HomeAssistant, SupportsResponse
from homeassistant.config_entries import ConfigEntry
from homeassistant.exceptions import ConfigEntryAuthFailed, ConfigEntryNotReady
from homeassistant.helpers import service
from homeassistant.helpers.typing import ConfigType
from homeassistant.helpers.update_coordinator import (
    CoordinatorEntity,
)
import homeassistant.helpers.config_validation as cv

import voluptuous as vol
import logging

from .coordinator import new_coordinator

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = vol.Schema({
    DOMAIN: vol.Schema({
    }),
}, extra=vol.ALLOW_EXTRA)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    data = entry.as_dict()['data']

    device = new_coordinator(hass, data, hass.data[DOMAIN]['devices'])

    hass.data[DOMAIN]['devices'][entry.entry_id] = device # Backward compatibility
    entry.runtime_data = device # New style

    # Start with a safe baseline so entities can be created even if first poll fails.
    if device.coordinator.data is None:
        device.coordinator.data = _default_data()
    try:
        await device.coordinator.async_config_entry_first_refresh()
    except ConfigEntryAuthFailed:
        raise
    except ConfigEntryNotReady as err:
        _LOGGER.warning(
            "Device [%s] first refresh failed; starting in degraded mode: %s",
            data.get("id", entry.entry_id),
            err,
        )
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry):
    await hass.config_entries.async_unload_platforms(entry, PLATFORMS)

    entry.runtime_data = None
    hass.data[DOMAIN]['devices'].pop(entry.entry_id)

    return True


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    hass.data[DOMAIN] = dict(devices={})

    async def async_reboot(call):
        for entry_id in await service.async_extract_config_entry_ids(hass, call):
            await hass.data[DOMAIN]["devices"][entry_id].do_reboot()

    async def async_exec(call):
        parts = call.data["command"].split(" ")
        ids = await service.async_extract_config_entry_ids(hass, call)
        response = {}
        for entry_id in ids:
            if coordinator := hass.data[DOMAIN]["devices"].get(entry_id): 
                if coordinator.is_api_supported("file"):
                    args = parts[1:]
                    if "arguments" in call.data:
                        args = call.data["arguments"].strip().split("\n")
                    response[entry_id] = await coordinator.do_file_exec(
                        parts[0],
                        args,
                        call.data.get("environment", {}),
                        call.data.get("extra", {})
                    )
        if len(ids) == 1:
            return response.get(list(ids)[0])
        return response

    async def async_init(call):
        parts = call.data["name"].split(" ")
        for entry_id in await service.async_extract_config_entry_ids(hass, call):
            device = hass.data[DOMAIN]["devices"][entry_id]
            if device.is_api_supported("rc"):
                await device.do_rc_init(
                    parts[0],
                    call.data.get("action", {})
                )

    async def async_ubus(call):
        response = {}
        ids = await service.async_extract_config_entry_ids(hass, call)
        for entry_id in ids:
            if coordinator := hass.data[DOMAIN]["devices"].get(entry_id):
                response[entry_id] = await coordinator.do_ubus_call(
                    call.data.get("subsystem"),
                    call.data.get("method"),
                    call.data.get("parameters", {}),
                )
        if len(ids) == 1:
            return response.get(list(ids)[0])
        return response

    hass.services.async_register(DOMAIN, "reboot", async_reboot)
    hass.services.async_register(DOMAIN, "exec", async_exec, supports_response=SupportsResponse.OPTIONAL)
    hass.services.async_register(DOMAIN, "init", async_init)
    hass.services.async_register(DOMAIN, "ubus", async_ubus, supports_response=SupportsResponse.ONLY)

    return True


class OpenWrtEntity(CoordinatorEntity):
    def __init__(self, device, device_id: str):
        super().__init__(device.coordinator)
        self._device_id = device_id
        self._device = device

    @property
    def device_info(self):
        info = self.data.get("info", {})
        return {
            "identifiers": {
                ("id", self._device_id)
            },
            "name": f"OpenWrt [{self._device_id}]",
            "model": info.get("model", "Unavailable"),
            "manufacturer": info.get("manufacturer", "OpenWrt"),
            "sw_version": info.get("sw_version", "Unavailable"),
        }

    @property
    def name(self):
        return "OpenWrt [%s]" % (self._device_id)

    @property
    def unique_id(self):
        return "sensor.openwrt.%s" % (self._device_id)

    @property
    def data(self) -> dict:
        return self.coordinator.data or _default_data()


def _default_data() -> dict:
    return {
        "info": {
            "model": "Unavailable",
            "manufacturer": "OpenWrt",
            "sw_version": "Unavailable",
        },
        "wireless": {},
        "mesh": {},
        "mwan3": {},
        "wan": {},
    }
