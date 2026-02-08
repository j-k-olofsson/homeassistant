from __future__ import annotations

import asyncio
from dataclasses import dataclass
from datetime import timedelta
import logging
import re
from typing import Any

import aiohttp
import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, SOURCE_IMPORT
from homeassistant.const import CONF_HOST, CONF_PASSWORD, CONF_USERNAME
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.helpers import aiohttp_client, service
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
    CONF_DHCP_HOST,
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
_MAC_RE = re.compile(r"[0-9a-f]{2}(?::[0-9a-f]{2}){5}")

SERVICE_DISCONNECT_CLIENT = "disconnect_client"
SERVICE_ATTR_CLIENT_MAC = "client_mac"
SERVICE_ATTR_AP_IP = "ap_ip"
SERVICE_ATTR_INTERFACE = "interface"
SERVICE_ATTR_REASON = "reason"
SERVICE_ATTR_BAN_TIME = "ban_time"
SERVICE_ATTR_DEAUTH = "deauth"

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
    async def async_disconnect_client(call: ServiceCall) -> dict[str, Any] | None:
        raw_client_mac = call.data.get(SERVICE_ATTR_CLIENT_MAC)
        mac = _normalize_mac(raw_client_mac)
        ap_ip = call.data.get(SERVICE_ATTR_AP_IP)
        interface = call.data.get(SERVICE_ATTR_INTERFACE)
        reason = int(call.data.get(SERVICE_ATTR_REASON, 5))
        ban_time = int(call.data.get(SERVICE_ATTR_BAN_TIME, 0))
        deauth = bool(call.data.get(SERVICE_ATTR_DEAUTH, True))

        if not mac:
            _LOGGER.warning(
                "disconnect_client rejected: invalid client_mac payload=%r",
                raw_client_mac,
            )
            raise vol.Invalid("client_mac is required")
        _LOGGER.info(
            "disconnect_client request: mac=%s ap_ip=%s interface=%s reason=%s ban_time=%s deauth=%s",
            mac,
            ap_ip,
            interface,
            reason,
            ban_time,
            deauth,
        )

        extracted_entry_ids = await service.async_extract_config_entry_ids(hass, call)
        entry_ids = list(extracted_entry_ids)
        if not entry_ids:
            entry_ids = [entry.entry_id for entry in hass.config_entries.async_entries(DOMAIN)]

        response: dict[str, Any] = {}
        for entry_id in entry_ids:
            coordinator: OpenWrtWifiDataCoordinator | None = hass.data.get(DOMAIN, {}).get(entry_id)
            if coordinator is None:
                continue
            try:
                result = await coordinator.async_disconnect_client(
                    mac=mac,
                    ap_ip=ap_ip,
                    interface=interface,
                    reason=reason,
                    ban_time=ban_time,
                    deauth=deauth,
                )
            except Exception as err:  # pragma: no cover - runtime safety
                _LOGGER.warning("disconnect_client failed for entry %s: %s", entry_id, err)
                result = {"ok": False, "error": str(err)}
            response[entry_id] = result

        if len(entry_ids) == 1:
            return response.get(entry_ids[0])
        return response

    if not hass.services.has_service(DOMAIN, SERVICE_DISCONNECT_CLIENT):
        hass.services.async_register(
            DOMAIN,
            SERVICE_DISCONNECT_CLIENT,
            async_disconnect_client,
            supports_response=SupportsResponse.OPTIONAL,
        )

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
        leases_by_mac: dict[str, dict[str, str | None]] | None = None
        dhcp_host = self._config.get(CONF_DHCP_HOST) or ""
        if dhcp_host:
            dhcp_ap = next((ap for ap in aps if ap.host == dhcp_host), None)
            if dhcp_ap is None:
                _LOGGER.warning(
                    "DHCP host %s not found in AP list; falling back to per-AP leases",
                    dhcp_host,
                )
            else:
                try:
                    dhcp_client = UbusClient(self.session, dhcp_ap)
                    leases_by_mac = await dhcp_client.get_dhcp_leases()
                except Exception as err:
                    _LOGGER.warning(
                        "Failed to fetch DHCP leases from %s: %s",
                        dhcp_host,
                        err,
                    )

        results = await asyncio.gather(
            *[self._fetch_ap_data(ap, leases_by_mac) for ap in aps],
            return_exceptions=True,
        )

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

        # De-duplicate clients by MAC across all APs.
        # A station should only be shown on one AP; when duplicates occur,
        # keep the row with strongest RSSI (closest to 0).
        best_by_mac: dict[str, tuple[str, dict[str, Any]]] = {}
        for ap_id, ap_data in aps_data.items():
            for client in ap_data.get(ATTR_CLIENTS, []):
                mac = _normalize_mac(client.get("mac"))
                if not mac:
                    continue
                prev = best_by_mac.get(mac)
                if prev is None:
                    best_by_mac[mac] = (ap_id, client)
                    continue
                _, prev_client = prev
                if _rssi_value(client.get("rssi")) > _rssi_value(prev_client.get("rssi")):
                    best_by_mac[mac] = (ap_id, client)

        allowed_mac_by_ap: dict[str, set[str]] = {}
        for mac, (ap_id, _) in best_by_mac.items():
            allowed_mac_by_ap.setdefault(ap_id, set()).add(mac)

        all_clients = []
        by_ap = {}
        for ap_id, ap_data in aps_data.items():
            allowed = allowed_mac_by_ap.get(ap_id, set())
            filtered_clients = [
                client
                for client in ap_data.get(ATTR_CLIENTS, [])
                if _normalize_mac(client.get("mac")) in allowed
            ]
            ap_data[ATTR_CLIENTS] = filtered_clients
            by_ap[ap_data[ATTR_AP_NAME]] = len(filtered_clients)
            if ap_data["available"]:
                all_clients.extend(filtered_clients)

        return {
            "aps": aps_data,
            "all": {
                ATTR_CLIENTS: all_clients,
                ATTR_BY_AP: by_ap,
            },
        }

    async def _fetch_ap_data(
        self,
        ap: APConfig,
        leases_by_mac: dict[str, dict[str, str | None]] | None = None,
    ) -> dict[str, Any]:
        client = UbusClient(self.session, ap)
        interfaces = ap.interfaces
        if not interfaces:
            interfaces = await client.list_hostapd_interfaces()

        if leases_by_mac is None:
            leases_by_mac = await client.get_dhcp_leases()

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
                    leases_by_mac,
                )
            )

        return {
            ATTR_INTERFACES: interfaces,
            ATTR_CLIENTS: clients,
        }

    async def async_disconnect_client(
        self,
        mac: str,
        ap_ip: str | None = None,
        interface: str | None = None,
        reason: int = 5,
        ban_time: int = 0,
        deauth: bool = True,
    ) -> dict[str, Any]:
        self._reload_config()
        mac = _normalize_mac(mac)
        if not mac:
            raise RuntimeError("Invalid MAC address")

        aps = [_normalize_ap(ap) for ap in self._config[CONF_APS]]
        aps_by_ip = {ap.host: ap for ap in aps}

        # Build candidate AP/interface pairs from current state first.
        candidates: list[tuple[APConfig, str | None]] = []
        live_candidates: list[tuple[APConfig, str]] = []

        def add_candidate(dst: list[tuple[APConfig, str | None]], ap_cfg: APConfig, iface_name: str | None) -> None:
            item = (ap_cfg, iface_name)
            if item not in dst:
                dst.append(item)

        def add_live_candidate(ap_cfg: APConfig, iface_name: str) -> None:
            item = (ap_cfg, iface_name)
            if item not in live_candidates:
                live_candidates.append(item)

        if ap_ip:
            ap_cfg = aps_by_ip.get(ap_ip)
            if ap_cfg is None:
                _LOGGER.warning(
                    "disconnect_client: AP IP %s not found in configuration, falling back to MAC lookup",
                    ap_ip,
                )
            else:
                add_candidate(candidates, ap_cfg, interface)
        if not candidates:
            for ap_data in (self.data or {}).get("aps", {}).values():
                for sta in ap_data.get(ATTR_CLIENTS, []):
                    if _normalize_mac(sta.get("mac")) == mac:
                        ap_cfg = aps_by_ip.get(ap_data.get(ATTR_AP_IP))
                        if ap_cfg is not None:
                            add_candidate(candidates, ap_cfg, sta.get("ifname") or interface)
            # Fallback: try all APs if no match in current snapshot
            if not candidates:
                for ap_cfg in aps:
                    add_candidate(candidates, ap_cfg, interface)

        # Prefer AP/interface pairs where the MAC is confirmed present right now.
        for ap_cfg, hinted_iface in list(candidates):
            iface_candidates = []
            if hinted_iface:
                iface_candidates = [hinted_iface]
            elif interface:
                iface_candidates = [interface]
            else:
                iface_candidates = list(ap_cfg.interfaces or [])
                if not iface_candidates:
                    try:
                        iface_candidates = await UbusClient(
                            self.session, ap_cfg
                        ).list_hostapd_interfaces()
                    except Exception as err:  # pragma: no cover - runtime safety
                        _LOGGER.debug(
                            "Failed to list interfaces while locating client %s on %s: %s",
                            mac,
                            ap_cfg.host,
                            err,
                        )
                        iface_candidates = []

            for iface_name in dict.fromkeys(iface_candidates):
                try:
                    clients_now = await UbusClient(self.session, ap_cfg).get_clients(iface_name)
                except Exception as err:  # pragma: no cover - runtime safety
                    _LOGGER.debug(
                        "Failed to read clients for %s/%s while locating %s: %s",
                        ap_cfg.host,
                        iface_name,
                        mac,
                        err,
                    )
                    continue
                if _normalize_mac(mac) in {_normalize_mac(k) for k in clients_now.keys()}:
                    add_live_candidate(ap_cfg, iface_name)

        tried: list[str] = []
        last_error: Exception | None = None

        ordered_candidates: list[tuple[APConfig, str | None]] = []
        for ap_cfg, iface_name in live_candidates:
            add_candidate(ordered_candidates, ap_cfg, iface_name)
        for ap_cfg, iface_name in candidates:
            add_candidate(ordered_candidates, ap_cfg, iface_name)

        for ap_cfg, hinted_iface in ordered_candidates:
            if hinted_iface:
                iface_candidates = [hinted_iface]
            else:
                iface_candidates = ap_cfg.interfaces or []
                if not iface_candidates:
                    try:
                        iface_candidates = await UbusClient(
                            self.session, ap_cfg
                        ).list_hostapd_interfaces()
                    except Exception as err:  # pragma: no cover - runtime safety
                        last_error = err
                        continue

            for iface_name in dict.fromkeys(iface_candidates):
                tried.append(f"{ap_cfg.host}/{iface_name}")
                try:
                    client = UbusClient(self.session, ap_cfg)
                    ubus_result = await client.disconnect_client(
                        iface=iface_name,
                        mac=mac,
                        reason=reason,
                        ban_time=ban_time,
                        deauth=deauth,
                    )
                    _LOGGER.info(
                        "disconnect_client success: mac=%s ap=%s interface=%s method=%s",
                        mac,
                        ap_cfg.host,
                        iface_name,
                        ubus_result.get("method"),
                    )
                    await self.async_request_refresh()
                    return {
                        "ok": True,
                        "ap_name": ap_cfg.name,
                        "ap_ip": ap_cfg.host,
                        "interface": iface_name,
                        "mac": mac,
                        "ubus": ubus_result,
                        "tried": tried,
                    }
                except Exception as err:  # pragma: no cover - runtime safety
                    last_error = err
                    _LOGGER.debug(
                        "Disconnect attempt failed for %s/%s mac=%s: %s",
                        ap_cfg.host,
                        iface_name,
                        mac,
                        err,
                    )

        if last_error:
            raise RuntimeError(f"Disconnect failed after tries {tried}: {last_error}") from last_error
        raise RuntimeError(f"Disconnect failed after tries {tried}")


def _merge_config(entry: ConfigEntry) -> dict[str, Any]:
    data = dict(entry.data)
    options = dict(entry.options)
    merged = {
        CONF_APS: options.get(CONF_APS, data.get(CONF_APS, [])),
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
    normalized = str(mac).strip().lower().replace("-", ":")
    # Accept raw MAC and strings that contain a MAC token (e.g. table cell text)
    match = _MAC_RE.search(normalized)
    if not match:
        return ""
    return match.group(0)


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


def _rssi_value(rssi: Any) -> float:
    """Comparable RSSI score where larger is better (e.g. -50 > -80)."""
    try:
        return float(rssi)
    except (TypeError, ValueError):
        return -9999.0


def _normalize_clients(
    hass: HomeAssistant,
    ap: APConfig,
    iface: str,
    clients_raw: dict[str, Any],
    client_name_map: dict[str, str],
    ignore_macs: list[str],
    leases_by_mac: dict[str, dict[str, str | None]] | None = None,
) -> list[dict[str, Any]]:
    normalized: list[dict[str, Any]] = []
    ignore_set = {_normalize_mac(m) for m in ignore_macs}
    map_norm = {_normalize_mac(k): v for k, v in client_name_map.items()}

    for mac, info in clients_raw.items():
        mac_norm = _normalize_mac(mac)
        if not mac_norm or mac_norm in ignore_set:
            continue

        raw_hostname = info.get("hostname") or info.get("name")
        lease_info = (leases_by_mac or {}).get(mac_norm, {})
        lease_hostname = lease_info.get("hostname")
        lease_ip = lease_info.get("ip")
        mapped_name = map_norm.get(mac_norm)
        if mapped_name:
            hostname = mapped_name
        elif raw_hostname:
            hostname = raw_hostname
        elif lease_hostname:
            hostname = lease_hostname
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
            "ip": lease_ip,
            "ap_ip": ap.host,
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

    async def get_dhcp_leases(self) -> dict[str, dict[str, str | None]]:
        await self._ensure_login()
        leases_by_mac: dict[str, dict[str, str | None]] = {}

        for service in ("dhcp", "odhcpd", "luci-rpc"):
            for method in ("ipv4leases", "leases", "getDHCPLeases", "getHostHints"):
                payload = {
                    "method": "call",
                    "params": [
                        self._ubus_session,
                        service,
                        method,
                        {},
                    ],
                }
                try:
                    response = await self._request(payload, allow_reauth=True)
                except RuntimeError as err:
                    continue

                data = _extract_result_data(response)
                if not isinstance(data, dict):
                    continue

                leases = (
                    data.get("ipv4leases")
                    or data.get("leases")
                    or data.get("dhcp_leases")
                    or data.get("hosts")
                )
                if not isinstance(leases, list):
                    continue

                for lease in leases:
                    if not isinstance(lease, dict):
                        continue
                    mac = _normalize_mac(
                        lease.get("mac")
                        or lease.get("macaddr")
                        or lease.get("hwaddr")
                        or lease.get("address")
                    )
                    if not mac:
                        continue

                    ip = (
                        lease.get("ip")
                        or lease.get("address")
                        or lease.get("ipaddr")
                        or lease.get("addr")
                    )
                    hostname = (
                        lease.get("hostname")
                        or lease.get("name")
                        or lease.get("host")
                        or lease.get("hint")
                    )

                    existing = leases_by_mac.get(mac, {})
                    merged = {
                        "ip": existing.get("ip") or ip,
                        "hostname": existing.get("hostname") or hostname,
                    }
                    leases_by_mac[mac] = merged

        return leases_by_mac

    async def disconnect_client(
        self,
        iface: str,
        mac: str,
        reason: int = 5,
        ban_time: int = 0,
        deauth: bool = True,
    ) -> dict[str, Any]:
        await self._ensure_login()
        mac = _normalize_mac(mac)
        if not mac:
            raise RuntimeError("Invalid MAC address")

        base_params = {
            "addr": mac,
            "reason": int(reason),
            "deauth": bool(deauth),
        }
        if ban_time > 0:
            base_params["ban_time"] = int(ban_time)

        attempts: list[tuple[str, dict[str, Any]]] = [
            ("del_client", dict(base_params)),
            ("del_client", {**base_params, "mac": mac}),
            ("deauth", {"addr": mac, "reason": int(reason)}),
            ("deauth", {"sta": mac, "reason": int(reason)}),
        ]

        last_error: Exception | None = None
        for method, params in attempts:
            payload = {
                "method": "call",
                "params": [
                    self._ubus_session,
                    f"hostapd.{iface}",
                    method,
                    params,
                ],
            }
            try:
                response = await self._request(payload, allow_reauth=True)
                # ubus call result for "call" is usually [code, data]
                result = response.get("result")
                if (
                    isinstance(result, list)
                    and result
                    and isinstance(result[0], int)
                    and result[0] != 0
                ):
                    raise RuntimeError(
                        f"Ubus call failed code={result[0]} data={result[1] if len(result) > 1 else None}"
                    )
                return {
                    "method": method,
                    "params": params,
                    "result": _extract_result_data(response),
                }
            except RuntimeError as err:
                last_error = err
                _LOGGER.debug(
                    "Disconnect attempt failed (%s on %s/%s): %s",
                    method,
                    self._ap.host,
                    iface,
                    err,
                )

        if last_error:
            raise last_error
        raise RuntimeError("Failed to disconnect client")

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
