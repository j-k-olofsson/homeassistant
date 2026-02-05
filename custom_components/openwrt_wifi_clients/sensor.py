from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import EntityCategory
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from . import OpenWrtWifiDataCoordinator
from .const import (
    ATTR_AP_IP,
    ATTR_AP_NAME,
    ATTR_BY_AP,
    ATTR_CLIENTS,
    ATTR_INTERFACES,
    CONF_APS,
    DOMAIN,
)


def _entry_aps(entry: ConfigEntry) -> list[dict[str, Any]]:
    options = entry.options
    data = entry.data
    return options.get(CONF_APS, data.get(CONF_APS, []))


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities
) -> None:
    coordinator: OpenWrtWifiDataCoordinator = hass.data[DOMAIN][entry.entry_id]

    entities: list[SensorEntity] = []
    for ap in _entry_aps(entry):
        ap_name = ap.get("name") or ap.get(ATTR_AP_NAME)
        ap_ip = ap.get("host") or ap.get(ATTR_AP_IP)
        if not ap_name or not ap_ip:
            continue
        entities.append(OpenWrtApSensor(coordinator, ap_name, ap_ip))

    entities.append(OpenWrtAllClientsSensor(coordinator))
    async_add_entities(entities)


class OpenWrtApSensor(CoordinatorEntity[OpenWrtWifiDataCoordinator], SensorEntity):
    _attr_has_entity_name = True

    def __init__(
        self, coordinator: OpenWrtWifiDataCoordinator, ap_name: str, ap_ip: str
    ) -> None:
        super().__init__(coordinator)
        self._ap_name = ap_name
        self._ap_ip = ap_ip
        self._attr_unique_id = f"{DOMAIN}_{ap_ip}_clients"
        self._attr_name = f"{ap_name} Wi-Fi Clients"

    @property
    def available(self) -> bool:
        ap = self._ap_data
        if not ap:
            return False
        return ap.get("available", False)

    @property
    def native_value(self) -> int:
        ap = self._ap_data
        if not ap:
            return 0
        return len(ap.get(ATTR_CLIENTS, []))

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        ap = self._ap_data or {}
        return {
            ATTR_AP_NAME: ap.get(ATTR_AP_NAME, self._ap_name),
            ATTR_AP_IP: ap.get(ATTR_AP_IP, self._ap_ip),
            ATTR_INTERFACES: ap.get(ATTR_INTERFACES, []),
            ATTR_CLIENTS: ap.get(ATTR_CLIENTS, []),
        }

    @property
    def _ap_data(self) -> dict[str, Any] | None:
        return self.coordinator.data.get("aps", {}).get(self._ap_ip)


class OpenWrtAllClientsSensor(
    CoordinatorEntity[OpenWrtWifiDataCoordinator], SensorEntity
):
    _attr_has_entity_name = True
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, coordinator: OpenWrtWifiDataCoordinator) -> None:
        super().__init__(coordinator)
        self._attr_unique_id = f"{DOMAIN}_all_clients"
        self._attr_name = "All Wi-Fi Clients"

    @property
    def available(self) -> bool:
        aps = self.coordinator.data.get("aps", {})
        return any(ap.get("available") for ap in aps.values())

    @property
    def native_value(self) -> int:
        all_data = self.coordinator.data.get("all", {})
        return len(all_data.get(ATTR_CLIENTS, []))

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        all_data = self.coordinator.data.get("all", {})
        return {
            ATTR_BY_AP: all_data.get(ATTR_BY_AP, {}),
            ATTR_CLIENTS: all_data.get(ATTR_CLIENTS, []),
        }
