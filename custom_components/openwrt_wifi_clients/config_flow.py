from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
import yaml

from homeassistant import config_entries
from homeassistant.const import CONF_HOST, CONF_PASSWORD, CONF_USERNAME
from homeassistant.core import callback

from .const import (
    CONF_AP_NAME,
    CONF_APS,
    CONF_CLIENT_NAME_MAP,
    CONF_IGNORE_MACS,
    CONF_INTERFACES,
    CONF_SCAN_INTERVAL,
    CONF_SCHEME,
    CONF_TIMEOUT,
    CONF_VERIFY_SSL,
    DEFAULT_SCAN_INTERVAL,
    DEFAULT_SCHEME,
    DEFAULT_TIMEOUT,
    DEFAULT_VERIFY_SSL,
    DOMAIN,
)

_LOGGER = logging.getLogger(__name__)


def _parse_yaml(value: str | None) -> Any:
    if value is None or value == "":
        return None
    try:
        return yaml.safe_load(value)
    except yaml.YAMLError as err:
        raise vol.Invalid(f"Invalid YAML: {err}") from err


def _csv_to_list(value: str | None) -> list[str]:
    if not value:
        return []
    return [v.strip() for v in value.split(",") if v.strip()]


def _normalize_ap(ap: dict[str, Any]) -> dict[str, Any]:
    ap = dict(ap)
    ap[CONF_AP_NAME] = ap.get(CONF_AP_NAME) or ap.get("name")
    ap[CONF_HOST] = ap.get(CONF_HOST) or ap.get("host")
    ap[CONF_USERNAME] = ap.get(CONF_USERNAME) or ap.get("username")
    ap[CONF_PASSWORD] = ap.get(CONF_PASSWORD) or ap.get("password")
    ap[CONF_SCHEME] = ap.get(CONF_SCHEME, DEFAULT_SCHEME)
    ap[CONF_VERIFY_SSL] = ap.get(CONF_VERIFY_SSL, DEFAULT_VERIFY_SSL)
    ap[CONF_TIMEOUT] = ap.get(CONF_TIMEOUT, DEFAULT_TIMEOUT)
    interfaces = ap.get(CONF_INTERFACES) or ap.get("interfaces")
    if isinstance(interfaces, str):
        ap[CONF_INTERFACES] = _csv_to_list(interfaces)
    else:
        ap[CONF_INTERFACES] = interfaces or []
    return ap


class OpenWrtWifiClientsConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    def __init__(self) -> None:
        self._global: dict[str, Any] = {}
        self._aps: list[dict[str, Any]] = []

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            client_map = _parse_yaml(user_input.get("client_name_map_yaml")) or {}
            ignore_macs = _parse_yaml(user_input.get("ignore_macs_yaml")) or []
            self._global = {
                CONF_SCAN_INTERVAL: int(user_input[CONF_SCAN_INTERVAL]),
                CONF_CLIENT_NAME_MAP: client_map,
                CONF_IGNORE_MACS: ignore_macs,
            }
            return await self.async_step_ap()

        schema = vol.Schema(
            {
                vol.Optional(CONF_SCAN_INTERVAL, default=DEFAULT_SCAN_INTERVAL): vol.Coerce(
                    int
                ),
                vol.Optional("client_name_map_yaml", default=""): str,
                vol.Optional("ignore_macs_yaml", default=""): str,
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema)

    async def async_step_ap(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            ap = _normalize_ap(user_input)
            self._aps.append(ap)
            if user_input.get("add_another"):
                return await self.async_step_ap()
            data = {**self._global, CONF_APS: self._aps}
            title = "OpenWrt Wi-Fi Clients"
            return self.async_create_entry(title=title, data=data)

        schema = vol.Schema(
            {
                vol.Required(CONF_AP_NAME): str,
                vol.Required(CONF_HOST): str,
                vol.Required(CONF_USERNAME): str,
                vol.Required(CONF_PASSWORD): str,
                vol.Optional(CONF_SCHEME, default=DEFAULT_SCHEME): vol.In(
                    ["http", "https"]
                ),
                vol.Optional(CONF_VERIFY_SSL, default=DEFAULT_VERIFY_SSL): bool,
                vol.Optional(CONF_TIMEOUT, default=DEFAULT_TIMEOUT): vol.Coerce(int),
                vol.Optional(CONF_INTERFACES, default=""): str,
                vol.Optional("add_another", default=True): bool,
            }
        )
        return self.async_show_form(step_id="ap", data_schema=schema)

    async def async_step_import(self, user_input: dict[str, Any]):
        data = dict(user_input)
        aps = data.get(CONF_APS, [])
        data[CONF_APS] = [_normalize_ap(ap) for ap in aps]
        data[CONF_SCAN_INTERVAL] = int(
            data.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        )
        data[CONF_CLIENT_NAME_MAP] = data.get(CONF_CLIENT_NAME_MAP, {})
        data[CONF_IGNORE_MACS] = data.get(CONF_IGNORE_MACS, [])
        return self.async_create_entry(title="OpenWrt Wi-Fi Clients", data=data)

    @callback
    def async_get_options_flow(self, config_entry):
        return OpenWrtWifiClientsOptionsFlow(config_entry)


class OpenWrtWifiClientsOptionsFlow(config_entries.OptionsFlow):
    def __init__(self, entry: config_entries.ConfigEntry) -> None:
        self._entry = entry

    async def async_step_init(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            options: dict[str, Any] = {}
            options[CONF_SCAN_INTERVAL] = int(user_input[CONF_SCAN_INTERVAL])

            client_map = _parse_yaml(user_input.get("client_name_map_yaml"))
            if client_map is not None:
                options[CONF_CLIENT_NAME_MAP] = client_map

            ignore_macs = _parse_yaml(user_input.get("ignore_macs_yaml"))
            if ignore_macs is not None:
                options[CONF_IGNORE_MACS] = ignore_macs

            aps_yaml = _parse_yaml(user_input.get("aps_yaml"))
            if aps_yaml is not None:
                if not isinstance(aps_yaml, list):
                    raise vol.Invalid("AP list must be a YAML list")
                options[CONF_APS] = [_normalize_ap(ap) for ap in aps_yaml]

            return self.async_create_entry(title="", data=options)

        options = self._entry.options
        data = self._entry.data
        scan_interval = options.get(
            CONF_SCAN_INTERVAL, data.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        )
        client_map = options.get(CONF_CLIENT_NAME_MAP, data.get(CONF_CLIENT_NAME_MAP, {}))
        ignore_macs = options.get(CONF_IGNORE_MACS, data.get(CONF_IGNORE_MACS, []))
        aps = options.get(CONF_APS, data.get(CONF_APS, []))

        schema = vol.Schema(
            {
                vol.Optional(CONF_SCAN_INTERVAL, default=scan_interval): vol.Coerce(int),
                vol.Optional("client_name_map_yaml", default=yaml.safe_dump(client_map)): str,
                vol.Optional("ignore_macs_yaml", default=yaml.safe_dump(ignore_macs)): str,
                vol.Optional("aps_yaml", default=yaml.safe_dump(aps)): str,
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
