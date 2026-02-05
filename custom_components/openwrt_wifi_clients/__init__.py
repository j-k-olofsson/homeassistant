from __future__ import annotations

import asyncio
from dataclasses import dataclass
from datetime import timedelta
import logging
from typing import Any

import aiohttp
import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, SOURCE_IMPORT
from homeassistant.const import CONF_HOST, CONF_PASSWORD, CONF_USERNAME
from homeassistant.core import HomeAssistant
from homeassistant.helpers import aiohttp_client
from homeassistant.helpers.device_registry import async_get as async_get_device_registry
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util

from .const import (
    AP_KEYS,
    ATTR_AP_IP,
    ATTR_AP_NAME,
    ATTR_BY_AP,
    ATTR_CLIENTS,
    ATTR_INTERFACES,
    CONF_APS,
    CONF_AP_NAME,
    CONF_CLIENT_NAME_MAP,
    CONF_IGNORE_MACS,
    CONF_INTERFACES,
    CONF_SCAN_INTERVAL,
    CONF_SCHEME,
    CONF_TIMEOUT,
    CONF_VERIFY_SSL,
    CONNECTION_NETWORK_MAC,
    DEFAULT_SCAN_INTERVAL,
    DEFAULT_SCHEME,
    DEFAULT_TIMEOUT,
    DEFAULT_VERIFY_SSL,
    DOMAIN,
    PLATFORMS,
    UBUS_PATH,
)

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = vol.Schema(
    {
        DOMAIN: vol.Schema(
            {
                vol.Required(CONF_APS): list,
                vol.Optional(CONF_SCAN_INTERVAL, default=DEFAULT_SCAN_INTERVAL): vol.Coerce(int),
                vol.Optional(CONF_CLIENT_NAME_MAP, default={}): dict,
                vol.Optional(CONF_IGNORE_MACS, default=[]): list,
            }
        )
    },
    extra=vol.ALLOW_EXTRA,
)


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Handle YAML import."""
    if DOMAIN not in config:
        return True

    if hass.config_entries.async_entries(DOMAIN):
        _LOGGER.info("%s is already configured, skipping YAML import", DOMAIN)
        return True

    data = config[DOMAIN]
    await hass.config_entries.async_init(
        DOMAIN,
        context={"source": SOURCE_IMPORT},
        data=data,
    )
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up from a config entry."""
    coordinator = OpenWrtWifiDataCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    return unload_ok


@dataclass
class APConfig:
    name: str
    host: str
    username: str
    password: str
    scheme: str
    verify_ssl: bool
    interfaces: list[str]
    timeout: int

    @property
    def base_url(self) -> str:
        return f"{self.scheme}://{self.host}{UBUS_PATH}"


class OpenWrtWifiDataCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Coordinator for polling multiple OpenWrt APs."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self.session = aiohttp_client.async_get_clientsession(hass)
        self._config = _merge_config(entry)
        update_interval = timedelta(seconds=self._config[CONF_SCAN_INTERVAL])

        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=update_interval,
        )

    def _reload_config(self) -> None:
        self._config = _merge_config(self.entry)
        self.update_interval = timedelta(seconds=self._config[CONF_SCAN_INTERVAL])

    async def _async_update_data(self) -> dict[str, Any]:
        self._reload_config()

        aps = [_normalize_ap(ap) for ap in self._config[CONF_APS]]
        tasks = [self._fetch_ap_data(ap) for ap in aps]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        prev = self.data or {}
        prev_aps = prev.get("aps", {})

        aps_data: dict[str, Any] = {}
        all_clients: list[dict[str, Any]] = []
        by_ap: dict[str, int] = {}

        for ap, result in zip(aps, results):
            ap_id = ap.host
            if isinstance(result, Exception):
                _LOGGER.warning(
                    "Failed to update AP %s (%s): %s", ap.name, ap.host, result
                )
                prev_ap = prev_aps.get(ap_id, {})
                aps_data[ap_id] = {
                    ATTR_AP_NAME: ap.name,
                    ATTR_AP_IP: ap.host,
                    ATTR_INTERFACES: prev_ap.get(ATTR_INTERFACES, ap.interfaces),
                    ATTR_CLIENTS: prev_ap.get(ATTR_CLIENTS, []),
                    "available": False,
                }
            else:
                aps_data[ap_id] = {
                    ATTR_AP_NAME: ap.name,
                    ATTR_AP_IP: ap.host,
                    ATTR_INTERFACES: result[ATTR_INTERFACES],
                    ATTR_CLIENTS: result[ATTR_CLIENTS],
                    "available": True,
                }

            clients = aps_data[ap_id][ATTR_CLIENTS]
            by_ap[ap.name] = len(clients)
            if aps_data[ap_id]["available"]:
                all_clients.extend(clients)

        return {
            "aps": aps_data,
            "all": {
                ATTR_CLIENTS: all_clients,
                ATTR_BY_AP: by_ap,
            },
        }

    async def _fetch_ap_data(self, ap: APConfig) -> dict[str, Any]:
        client = UbusClient(self.session, ap)
        interfaces = ap.interfaces
        if not interfaces:
            interfaces = await client.list_hostapd_interfaces()

        clients: list[dict[str, Any]] = []
        for iface in interfaces:
            iface_clients = await client.get_clients(iface)
            clients.extend(
                _normalize_clients(
                    self.hass,
                    ap,
                    iface,
                    iface_clients,
                    self._config[CONF_CLIENT_NAME_MAP],
                    self._config[CONF_IGNORE_MACS],
                )
            )

        return {
            ATTR_INTERFACES: interfaces,
            ATTR_CLIENTS: clients,
        }


def _merge_config(entry: ConfigEntry) -> dict[str, Any]:
    data = dict(entry.data)
    options = dict(entry.options)
    merged = {
        CONF_APS: options.get(CONF_APS, data.get(CONF_APS, [])),
        CONF_SCAN_INTERVAL: options.get(
            CONF_SCAN_INTERVAL, data.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        ),
        CONF_CLIENT_NAME_MAP: options.get(
            CONF_CLIENT_NAME_MAP, data.get(CONF_CLIENT_NAME_MAP, {})
        ),
        CONF_IGNORE_MACS: options.get(
            CONF_IGNORE_MACS, data.get(CONF_IGNORE_MACS, [])
        ),
    }
    return merged


def _normalize_ap(ap: dict[str, Any]) -> APConfig:
    ap_clean = {**ap}
    for key in AP_KEYS:
        ap_clean.setdefault(key, None)
    return APConfig(
        name=ap_clean[CONF_AP_NAME],
        host=ap_clean[CONF_HOST],
        username=ap_clean[CONF_USERNAME],
        password=ap_clean[CONF_PASSWORD],
        scheme=ap_clean.get(CONF_SCHEME) or DEFAULT_SCHEME,
        verify_ssl=ap_clean.get(CONF_VERIFY_SSL, DEFAULT_VERIFY_SSL),
        interfaces=ap_clean.get(CONF_INTERFACES) or [],
        timeout=ap_clean.get(CONF_TIMEOUT) or DEFAULT_TIMEOUT,
    )


def _normalize_mac(mac: str | None) -> str:
    if not mac:
        return ""
    return mac.strip().lower()


def _device_name_from_mac(hass: HomeAssistant, mac: str) -> str | None:
    registry = async_get_device_registry(hass)
    mac = _normalize_mac(mac)
    if not mac:
        return None
    for device in registry.devices.values():
        if (CONNECTION_NETWORK_MAC, mac) in device.connections:
            return device.name_by_user or device.name
    return None


def _rssi_meta(rssi: int | float | None) -> dict[str, str | None]:
    if rssi is None:
        return {"rssi_level": None, "rssi_color": None}
    if rssi <= -81:
        return {"rssi_level": "bad", "rssi_color": "#5a1b1b"}
    if rssi <= -71:
        return {"rssi_level": "warn", "rssi_color": "#6b3f15"}
    if rssi <= -68:
        return {"rssi_level": "ok", "rssi_color": "#2f5b2f"}
    return {"rssi_level": "good", "rssi_color": "#1f4f2f"}


def _normalize_clients(
    hass: HomeAssistant,
    ap: APConfig,
    iface: str,
    clients_raw: dict[str, Any],
    client_name_map: dict[str, str],
    ignore_macs: list[str],
) -> list[dict[str, Any]]:
    normalized: list[dict[str, Any]] = []
    ignore_set = {_normalize_mac(m) for m in ignore_macs}
    map_norm = {_normalize_mac(k): v for k, v in client_name_map.items()}

    for mac, info in clients_raw.items():
        mac_norm = _normalize_mac(mac)
        if not mac_norm or mac_norm in ignore_set:
            continue

        raw_hostname = info.get("hostname") or info.get("name")
        mapped_name = map_norm.get(mac_norm)
        if mapped_name:
            hostname = mapped_name
        elif raw_hostname:
            hostname = raw_hostname
        else:
            device_name = _device_name_from_mac(hass, mac_norm)
            hostname = device_name or mac_norm

        rssi = (
            info.get("signal")
            or info.get("rssi")
            or info.get("rx_signal")
            or info.get("tx_signal")
        )

        rssi_meta = _rssi_meta(rssi)

        client_entry = {
            "mac": mac_norm,
            "hostname": hostname,
            "ifname": info.get("ifname") or iface,
            "rssi": rssi,
            "last_seen": dt_util.utcnow().isoformat(),
            ATTR_AP_NAME: ap.name,
            **rssi_meta,
        }

        if rssi is None:
            client_entry["rssi_html"] = "-"
        else:
            color = rssi_meta["rssi_color"] or "#2a2a2a"
            client_entry[
                "rssi_html"
            ] = f"<span style=\"background:{color};color:#fff;padding:0 6px;border-radius:3px;display:inline-block;min-width:48px;text-align:right;\">{rssi}</span>"

        normalized.append(client_entry)

    return normalized


class UbusClient:
    """Minimal ubus JSON-RPC client."""

    def __init__(self, session: aiohttp.ClientSession, ap: APConfig) -> None:
        self._session = session
        self._ap = ap
        self._ubus_session: str | None = None

    async def list_hostapd_interfaces(self) -> list[str]:
        response = await self._request({"method": "list", "params": ["hostapd.*"]})
        data = _extract_result_data(response)
        if not isinstance(data, dict):
            return []
        interfaces = []
        for key in data.keys():
            if key.startswith("hostapd."):
                interfaces.append(key.split("hostapd.", 1)[1])
        return interfaces

    async def get_clients(self, iface: str) -> dict[str, Any]:
        await self._ensure_login()
        payload = {
            "method": "call",
            "params": [
                self._ubus_session,
                f"hostapd.{iface}",
                "get_clients",
                {},
            ],
        }
        response = await self._request(payload, allow_reauth=True)
        data = _extract_result_data(response)
        if not isinstance(data, dict):
            return {}
        clients = data.get("clients")
        if isinstance(clients, dict):
            return clients
        if isinstance(data, dict):
            return data
        return {}

    async def _ensure_login(self) -> None:
        if self._ubus_session:
            return
        await self._login()

    async def _login(self) -> None:
        payload = {
            "method": "call",
            "params": [
                "00000000000000000000000000000000",
                "session",
                "login",
                {"username": self._ap.username, "password": self._ap.password},
            ],
        }
        response = await self._request(payload)
        data = _extract_result_data(response)
        if not isinstance(data, dict) or "ubus_rpc_session" not in data:
            raise RuntimeError("Failed to authenticate with ubus")
        self._ubus_session = data["ubus_rpc_session"]

    async def _request(
        self, payload: dict[str, Any], allow_reauth: bool = False
    ) -> dict[str, Any]:
        url = self._ap.base_url
        timeout = aiohttp.ClientTimeout(total=self._ap.timeout)
        ssl: bool | None
        if self._ap.scheme == "https":
            ssl = self._ap.verify_ssl
        else:
            ssl = None

        body = {
            "jsonrpc": "2.0",
            "id": 1,
            **payload,
        }

        try:
            async with self._session.post(
                url, json=body, timeout=timeout, ssl=ssl
            ) as resp:
                resp.raise_for_status()
                response = await resp.json()
        except (aiohttp.ClientError, asyncio.TimeoutError) as err:
            raise RuntimeError(f"HTTP error: {err}") from err

        if "error" in response:
            if allow_reauth and _is_auth_error(response["error"]):
                self._ubus_session = None
                await self._login()
                return await self._request(payload, allow_reauth=False)
            raise RuntimeError(f"Ubus error: {response['error']}")

        return response


def _extract_result_data(response: dict[str, Any]) -> Any:
    result = response.get("result")
    if isinstance(result, list) and len(result) >= 2:
        return result[1]
    return result


def _is_auth_error(error: dict[str, Any]) -> bool:
    message = str(error)
    return "Access denied" in message or "Permission denied" in message
