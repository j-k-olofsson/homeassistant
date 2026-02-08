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
    CONF_DHCP_HOST,
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
                CONF_DHCP_HOST: user_input.get(CONF_DHCP_HOST) or "",
                CONF_CLIENT_NAME_MAP: client_map,
                CONF_IGNORE_MACS: ignore_macs,
            }
            return await self.async_step_ap()

        schema = vol.Schema(
            {
                vol.Optional(CONF_SCAN_INTERVAL, default=DEFAULT_SCAN_INTERVAL): vol.Coerce(
                    int
                ),
                vol.Optional(CONF_DHCP_HOST, default=""): str,
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
                vol.Optional("add_another", default=False): bool,
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

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return OpenWrtWifiClientsOptionsFlow(config_entry)


class OpenWrtWifiClientsOptionsFlow(config_entries.OptionsFlow):
    def __init__(self, entry: config_entries.ConfigEntry) -> None:
        self._entry = entry
        self._options: dict[str, Any] = {}
        self._aps: list[dict[str, Any]] = []
        self._edit_index: int | None = None

    async def async_step_init(self, user_input: dict[str, Any] | None = None):
        options = self._entry.options
        data = self._entry.data
        self._options = {
            CONF_SCAN_INTERVAL: options.get(
                CONF_SCAN_INTERVAL, data.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
            ),
            CONF_DHCP_HOST: options.get(CONF_DHCP_HOST, data.get(CONF_DHCP_HOST, "")),
            CONF_CLIENT_NAME_MAP: options.get(
                CONF_CLIENT_NAME_MAP, data.get(CONF_CLIENT_NAME_MAP, {})
            ),
            CONF_IGNORE_MACS: options.get(
                CONF_IGNORE_MACS, data.get(CONF_IGNORE_MACS, [])
            ),
        }
        self._aps = options.get(CONF_APS, data.get(CONF_APS, []))

        return self.async_show_menu(
            step_id="init",
            menu_options=["edit_globals", "manage_aps"],
        )

    async def async_step_edit_globals(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            self._options[CONF_SCAN_INTERVAL] = int(user_input[CONF_SCAN_INTERVAL])

            client_map = _parse_yaml(user_input.get("client_name_map_yaml"))
            if client_map is not None:
                self._options[CONF_CLIENT_NAME_MAP] = client_map

            ignore_macs = _parse_yaml(user_input.get("ignore_macs_yaml"))
            if ignore_macs is not None:
                self._options[CONF_IGNORE_MACS] = ignore_macs

            return await self.async_step_init()

        schema = vol.Schema(
            {
                vol.Optional(
                    CONF_SCAN_INTERVAL, default=self._options[CONF_SCAN_INTERVAL]
                ): vol.Coerce(int),
                vol.Optional(
                    CONF_DHCP_HOST, default=self._options.get(CONF_DHCP_HOST, "")
                ): str,
                vol.Optional(
                    "client_name_map_yaml",
                    default=yaml.safe_dump(self._options[CONF_CLIENT_NAME_MAP]),
                ): str,
                vol.Optional(
                    "ignore_macs_yaml",
                    default=yaml.safe_dump(self._options[CONF_IGNORE_MACS]),
                ): str,
            }
        )
        return self.async_show_form(step_id="edit_globals", data_schema=schema)

    async def async_step_manage_aps(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            action = user_input.get("action")
            if action == "add":
                return await self.async_step_ap()
            if action == "edit":
                return await self.async_step_select_ap_to_edit()
            if action == "remove":
                return await self.async_step_remove_ap()
            if action == "done":
                options: dict[str, Any] = dict(self._options)
                options[CONF_APS] = self._aps
                return self.async_create_entry(title="", data=options)

        schema = vol.Schema(
            {
                vol.Required("action"): vol.In(
                    {
                        "add": "Add AP",
                        "edit": "Edit AP",
                        "remove": "Remove AP",
                        "done": "Save",
                    }
                )
            }
        )
        return self.async_show_form(step_id="manage_aps", data_schema=schema)

    async def async_step_ap(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            ap = _normalize_ap(user_input)
            self._aps.append(ap)
            if user_input.get("add_another"):
                return await self.async_step_ap()
            return await self.async_step_manage_aps()

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
                vol.Optional("add_another", default=False): bool,
            }
        )
        return self.async_show_form(step_id="ap", data_schema=schema)

    async def async_step_remove_ap(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            index = int(user_input["ap_index"])
            if 0 <= index < len(self._aps):
                self._aps.pop(index)
            return await self.async_step_manage_aps()

        choices = {
            str(i): f"{ap.get(CONF_AP_NAME, 'AP')} ({ap.get(CONF_HOST, '-')})"
            for i, ap in enumerate(self._aps)
        }
        schema = vol.Schema({vol.Required("ap_index"): vol.In(choices)})
        return self.async_show_form(step_id="remove_ap", data_schema=schema)

    async def async_step_select_ap_to_edit(
        self, user_input: dict[str, Any] | None = None
    ):
        if user_input is not None:
            self._edit_index = int(user_input["ap_index"])
            return await self.async_step_edit_ap()

        choices = {
            str(i): f"{ap.get(CONF_AP_NAME, 'AP')} ({ap.get(CONF_HOST, '-')})"
            for i, ap in enumerate(self._aps)
        }
        schema = vol.Schema({vol.Required("ap_index"): vol.In(choices)})
        return self.async_show_form(step_id="select_ap_to_edit", data_schema=schema)

    async def async_step_edit_ap(self, user_input: dict[str, Any] | None = None):
        if self._edit_index is None or not (0 <= self._edit_index < len(self._aps)):
            return await self.async_step_manage_aps()

        if user_input is not None:
            ap = _normalize_ap(user_input)
            self._aps[self._edit_index] = ap
            self._edit_index = None
            return await self.async_step_manage_aps()

        ap = _normalize_ap(self._aps[self._edit_index])
        schema = vol.Schema(
            {
                vol.Required(CONF_AP_NAME, default=ap.get(CONF_AP_NAME, "")): str,
                vol.Required(CONF_HOST, default=ap.get(CONF_HOST, "")): str,
                vol.Required(
                    CONF_USERNAME, default=ap.get(CONF_USERNAME, "")
                ): str,
                vol.Required(
                    CONF_PASSWORD, default=ap.get(CONF_PASSWORD, "")
                ): str,
                vol.Optional(CONF_SCHEME, default=ap.get(CONF_SCHEME, DEFAULT_SCHEME)): vol.In(
                    ["http", "https"]
                ),
                vol.Optional(
                    CONF_VERIFY_SSL, default=ap.get(CONF_VERIFY_SSL, DEFAULT_VERIFY_SSL)
                ): bool,
                vol.Optional(
                    CONF_TIMEOUT, default=ap.get(CONF_TIMEOUT, DEFAULT_TIMEOUT)
                ): vol.Coerce(int),
                vol.Optional(
                    CONF_INTERFACES,
                    default=",".join(ap.get(CONF_INTERFACES, []) or []),
                ): str,
            }
        )
        return self.async_show_form(step_id="edit_ap", data_schema=schema)
