# mypy: disable-error-code="attr-defined"
from __future__ import annotations

import logging

from ..base import (
    WifiCredentials,
    WpsStatus,
)
from .exceptions import *

_LOGGER = logging.getLogger(__name__)
UBUS_JSONRPC_VERSION = "2.0"
UBUS_ID_AUTH = 1
UBUS_ID_CALL = 2


class UbusWirelessMixin:
    """Wireless methods for UbusClient."""

    async def get_wps_status(self) -> WpsStatus:
        """Get WPS status from the first wireless interface."""
        if self.packages.wireless is False:
            return WpsStatus()

        try:
            wireless_data = await self._call("network.wireless", "status")
            for radio_data in wireless_data.values():
                if not isinstance(radio_data, dict):
                    continue
                for iface in radio_data.get("interfaces", []):
                    iface_name = iface.get("ifname", "")
                    if iface_name:
                        try:
                            result = await self._call(
                                f"hostapd.{iface_name}",
                                "wps_status",
                            )
                            return WpsStatus(
                                enabled=result.get("pbc_status", "") == "Active",
                                status=result.get("pbc_status", "Disabled"),
                            )
                        except UbusError:
                            continue
        except UbusError:
            pass

        return WpsStatus()

    async def set_wps(self, enabled: bool) -> bool:
        """Enable or disable WPS."""
        try:
            wireless_data = await self._call("network.wireless", "status")
            for radio_data in wireless_data.values():
                if not isinstance(radio_data, dict):
                    continue
                for iface in radio_data.get("interfaces", []):
                    iface_name = iface.get("ifname", "")
                    if iface_name:
                        method = "wps_start" if enabled else "wps_cancel"
                        await self._call(f"hostapd.{iface_name}", method)
                        return True
        except UbusError as err:
            _LOGGER.exception("Failed to set WPS: %s", err)
        return False

    async def set_wireless_enabled(self, interface: str, enabled: bool) -> bool:
        """Enable or disable a wireless radio via UCI."""
        try:
            action = "0" if enabled else "1"  # disabled=0 means enabled
            await self._call(
                "uci",
                "set",
                {
                    "config": "wireless",
                    "section": interface,
                    "values": {"disabled": action},
                },
            )
            await self._call("uci", "commit", {"config": "wireless"})
            await self._call("network.wireless", "notify")
            self._last_full_poll = 0
            return True
        except UbusError:
            return False

    async def get_wifi_credentials(self) -> list[WifiCredentials]:
        """Get wifi credentials via UCI."""
        try:
            uci = await self._call("uci", "get", {"config": "wireless"})
            if not uci or "values" not in uci:
                return []

            creds = []
            for key, val in uci["values"].items():
                if isinstance(val, dict) and val.get(".type") == "wifi-iface":
                    if val.get("mode") == "ap":
                        ssid = val.get("ssid")
                        key_val = val.get("key")
                        if ssid:
                            creds.append(
                                WifiCredentials(
                                    iface=key,
                                    ssid=ssid,
                                    encryption=val.get("encryption", "none"),
                                    key=key_val or "",
                                    hidden=bool(int(val.get("hidden", 0))),
                                )
                            )
            return creds
        except Exception as err:
            _LOGGER.debug("Failed to get wifi credentials via ubus: %s", err)
            return []

    async def trigger_wps_push(self, interface: str) -> bool:
        """Trigger WPS push button on a specific wireless interface via ubus."""
        try:
            # 1. Try direct guess: hostapd.interface
            obj = f"hostapd.{interface}"
            await self._call(obj, "wps_push")
            return True
        except Exception:
            try:
                # 2. List objects and find matching hostapd interface
                objects = await self._list_objects()
                for obj in objects:
                    if obj.startswith("hostapd.") and interface in obj:
                        await self._call(obj, "wps_push")
                        return True
                return False
            except Exception as err:
                _LOGGER.debug(
                    "Failed to trigger WPS push via ubus for %s: %s", interface, err
                )
                return False
