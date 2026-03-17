from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
import yaml

from homeassistant import config_entries
from homeassistant.const import CONF_HOST, CONF_PASSWORD, CONF_USERNAME
from homeassistant.core import callback
from homeassistant.helpers import aiohttp_client

from . import APConfig, UbusClient
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


def _parse_yaml(value: str | None, *, expected_type: type | None = None) -> Any:
    if value is None or value == "":
        return None
    try:
        parsed = yaml.safe_load(value)
    except yaml.YAMLError as err:
        raise vol.Invalid(f"Invalid YAML: {err}") from err
    if expected_type is not None and parsed is not None and not isinstance(parsed, expected_type):
        type_name = expected_type.__name__
        raise vol.Invalid(f"YAML must parse to a {type_name}")
    return parsed


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


def _validate_global_config(user_input: dict[str, Any]) -> dict[str, Any]:
    client_map = _parse_yaml(
        user_input.get("client_name_map_yaml"), expected_type=dict
    ) or {}
    ignore_macs = _parse_yaml(
        user_input.get("ignore_macs_yaml"), expected_type=list
    ) or []
    return {
        CONF_SCAN_INTERVAL: int(user_input[CONF_SCAN_INTERVAL]),
        CONF_DHCP_HOST: (user_input.get(CONF_DHCP_HOST) or "").strip(),
        CONF_CLIENT_NAME_MAP: client_map,
        CONF_IGNORE_MACS: [str(mac).strip() for mac in ignore_macs if str(mac).strip()],
    }


def _validate_ap_shape(
    ap: dict[str, Any],
    *,
    existing_aps: list[dict[str, Any]],
    skip_index: int | None = None,
) -> dict[str, Any]:
    normalized = _normalize_ap(ap)
    host = str(normalized.get(CONF_HOST) or "").strip()
    name = str(normalized.get(CONF_AP_NAME) or "").strip()
    username = str(normalized.get(CONF_USERNAME) or "").strip()
    password = str(normalized.get(CONF_PASSWORD) or "")
    timeout_raw = normalized.get(CONF_TIMEOUT)
    timeout = DEFAULT_TIMEOUT if timeout_raw in (None, "") else int(timeout_raw)

    if not host or not name or not username or not password:
        raise vol.Invalid("AP name, host, username, and password are required")
    if timeout <= 0:
        raise vol.Invalid("Timeout must be greater than 0")

    normalized[CONF_AP_NAME] = name
    normalized[CONF_HOST] = host
    normalized[CONF_USERNAME] = username
    normalized[CONF_PASSWORD] = password
    normalized[CONF_TIMEOUT] = timeout
    normalized[CONF_INTERFACES] = [
        str(iface).strip()
        for iface in normalized.get(CONF_INTERFACES, [])
        if str(iface).strip()
    ]

    duplicate_hosts = {
        str(existing_ap.get(CONF_HOST) or "").strip()
        for idx, existing_ap in enumerate(existing_aps)
        if idx != skip_index
    }
    if host in duplicate_hosts:
        raise vol.Invalid("Host/IP is already configured in this entry")

    return normalized


async def _async_validate_ap_connection(hass, ap: dict[str, Any]) -> None:
    client = UbusClient(
        aiohttp_client.async_get_clientsession(hass),
        APConfig(
            name=ap[CONF_AP_NAME],
            host=ap[CONF_HOST],
            username=ap[CONF_USERNAME],
            password=ap[CONF_PASSWORD],
            scheme=ap[CONF_SCHEME],
            verify_ssl=ap[CONF_VERIFY_SSL],
            interfaces=ap[CONF_INTERFACES],
            timeout=ap[CONF_TIMEOUT],
        ),
    )
    await client.list_hostapd_interfaces()


def _globals_schema(defaults: dict[str, Any] | None = None) -> vol.Schema:
    defaults = defaults or {}
    return vol.Schema(
        {
            vol.Optional(
                CONF_SCAN_INTERVAL,
                default=defaults.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL),
            ): vol.Coerce(int),
            vol.Optional(
                CONF_DHCP_HOST, default=defaults.get(CONF_DHCP_HOST, "")
            ): str,
            vol.Optional(
                "client_name_map_yaml",
                default=defaults.get("client_name_map_yaml", ""),
            ): str,
            vol.Optional(
                "ignore_macs_yaml",
                default=defaults.get("ignore_macs_yaml", ""),
            ): str,
        }
    )


def _ap_schema(
    defaults: dict[str, Any] | None = None, *, include_add_another: bool
) -> vol.Schema:
    defaults = defaults or {}
    schema: dict[Any, Any] = {
        vol.Required(CONF_AP_NAME, default=defaults.get(CONF_AP_NAME, "")): str,
        vol.Required(CONF_HOST, default=defaults.get(CONF_HOST, "")): str,
        vol.Required(CONF_USERNAME, default=defaults.get(CONF_USERNAME, "")): str,
        vol.Required(CONF_PASSWORD, default=defaults.get(CONF_PASSWORD, "")): str,
        vol.Optional(
            CONF_SCHEME, default=defaults.get(CONF_SCHEME, DEFAULT_SCHEME)
        ): vol.In(["http", "https"]),
        vol.Optional(
            CONF_VERIFY_SSL,
            default=defaults.get(CONF_VERIFY_SSL, DEFAULT_VERIFY_SSL),
        ): bool,
        vol.Optional(
            CONF_TIMEOUT, default=defaults.get(CONF_TIMEOUT, DEFAULT_TIMEOUT)
        ): vol.Coerce(int),
        vol.Optional(
            CONF_INTERFACES,
            default=defaults.get(CONF_INTERFACES, ""),
        ): str,
    }
    if include_add_another:
        schema[vol.Optional("add_another", default=defaults.get("add_another", False))] = bool
    return vol.Schema(schema)


class OpenWrtWifiClientsConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    def __init__(self) -> None:
        self._global: dict[str, Any] = {}
        self._aps: list[dict[str, Any]] = []

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                self._global = _validate_global_config(user_input)
                return await self.async_step_ap()
            except vol.Invalid:
                errors["base"] = "invalid_globals"

        schema = _globals_schema(user_input)
        return self.async_show_form(step_id="user", data_schema=schema, errors=errors)

    async def async_step_ap(self, user_input: dict[str, Any] | None = None):
        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                ap = _validate_ap_shape(user_input, existing_aps=self._aps)
                await _async_validate_ap_connection(self.hass, ap)
            except vol.Invalid:
                errors["base"] = "invalid_ap"
            except Exception as err:
                _LOGGER.warning("OpenWrt AP validation failed for %s: %s", user_input.get(CONF_HOST), err)
                errors["base"] = "cannot_connect"
            else:
                self._aps.append(ap)
                if user_input.get("add_another"):
                    return await self.async_step_ap()
                data = {**self._global, CONF_APS: self._aps}
                title = "OpenWrt Wi-Fi Clients"
                return self.async_create_entry(title=title, data=data)

        schema = _ap_schema(user_input, include_add_another=True)
        return self.async_show_form(step_id="ap", data_schema=schema, errors=errors)

    async def async_step_import(self, user_input: dict[str, Any]):
        data = dict(user_input)
        aps = data.get(CONF_APS, [])
        if not isinstance(aps, list) or not aps:
            return self.async_abort(reason="invalid_import")

        try:
            data[CONF_APS] = [
                _validate_ap_shape(ap, existing_aps=aps, skip_index=index)
                for index, ap in enumerate(aps)
            ]
            data[CONF_SCAN_INTERVAL] = int(
                data.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
            )
            data[CONF_DHCP_HOST] = str(data.get(CONF_DHCP_HOST, "") or "").strip()
            data[CONF_CLIENT_NAME_MAP] = data.get(CONF_CLIENT_NAME_MAP, {})
            data[CONF_IGNORE_MACS] = data.get(CONF_IGNORE_MACS, [])
            if not isinstance(data[CONF_CLIENT_NAME_MAP], dict):
                raise vol.Invalid("client_name_map must be a dict")
            if not isinstance(data[CONF_IGNORE_MACS], list):
                raise vol.Invalid("ignore_macs must be a list")
        except (TypeError, ValueError, vol.Invalid):
            return self.async_abort(reason="invalid_import")
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
        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                self._options.update(_validate_global_config(user_input))
                return await self.async_step_init()
            except vol.Invalid:
                errors["base"] = "invalid_globals"

        schema = _globals_schema(
            {
                CONF_SCAN_INTERVAL: self._options[CONF_SCAN_INTERVAL],
                CONF_DHCP_HOST: self._options.get(CONF_DHCP_HOST, ""),
                "client_name_map_yaml": yaml.safe_dump(
                    self._options[CONF_CLIENT_NAME_MAP]
                ),
                "ignore_macs_yaml": yaml.safe_dump(self._options[CONF_IGNORE_MACS]),
                **(user_input or {}),
            }
        )
        return self.async_show_form(
            step_id="edit_globals", data_schema=schema, errors=errors
        )

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
        errors: dict[str, str] = {}
        if user_input is not None:
            try:
                ap = _validate_ap_shape(user_input, existing_aps=self._aps)
                await _async_validate_ap_connection(self.hass, ap)
            except vol.Invalid:
                errors["base"] = "invalid_ap"
            except Exception as err:
                _LOGGER.warning(
                    "OpenWrt AP validation failed for %s: %s",
                    user_input.get(CONF_HOST),
                    err,
                )
                errors["base"] = "cannot_connect"
            else:
                self._aps.append(ap)
                if user_input.get("add_another"):
                    return await self.async_step_ap()
                return await self.async_step_manage_aps()

        schema = _ap_schema(user_input, include_add_another=True)
        return self.async_show_form(step_id="ap", data_schema=schema, errors=errors)

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
            errors: dict[str, str] = {}
            try:
                ap = _validate_ap_shape(
                    user_input,
                    existing_aps=self._aps,
                    skip_index=self._edit_index,
                )
                await _async_validate_ap_connection(self.hass, ap)
            except vol.Invalid:
                errors["base"] = "invalid_ap"
            except Exception as err:
                _LOGGER.warning(
                    "OpenWrt AP validation failed for %s: %s",
                    user_input.get(CONF_HOST),
                    err,
                )
                errors["base"] = "cannot_connect"
            else:
                self._aps[self._edit_index] = ap
                self._edit_index = None
                return await self.async_step_manage_aps()
            return self.async_show_form(
                step_id="edit_ap",
                data_schema=_ap_schema(user_input, include_add_another=False),
                errors=errors,
            )

        ap = _normalize_ap(self._aps[self._edit_index])
        return self.async_show_form(
            step_id="edit_ap",
            data_schema=_ap_schema(
                {
                    **ap,
                    CONF_INTERFACES: ",".join(ap.get(CONF_INTERFACES, []) or []),
                },
                include_add_another=False,
            ),
        )
