import logging
import requests
from datetime import timedelta
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from .const import DOMAIN
from homeassistant.components.sensor import SensorEntity

SCAN_INTERVAL = timedelta(minutes=180)

_LOGGER = logging.getLogger(__name__)

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback):
    try:
        _LOGGER.debug(f"Setting up entry {entry.entry_id} with data: {entry.data}")

        # Create an instance of coordinator and first update
        coordinator = BensinpriserDataUpdateCoordinator(hass, entry.data.get("lan"), entry.data.get("station"))
        await coordinator.async_config_entry_first_refresh()

        # Add sensor entity
        sensor_name = f"{entry.data.get('lan')}_{entry.data.get('station')}"
        async_add_entities([BensinpriserSensor(coordinator, sensor_name)])

        # Debug
        _LOGGER.debug(f"Added sensor {sensor_name}")
        _LOGGER.debug(f"Coordinator data: {coordinator.data}")
        _LOGGER.debug(f"Coordinator last update success: {coordinator.last_update_success}")

        # Save coordinator in hass.data
        if DOMAIN not in hass.data:
            hass.data[DOMAIN] = {}
        
        hass.data[DOMAIN][entry.entry_id] = coordinator

        _LOGGER.debug(f"Successfully set up entry {entry.entry_id}")
        return True

    except Exception as e:
        _LOGGER.error(f"Error setting up entry {entry.entry_id}: {e}")
        return False

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry):
    hass.data[DOMAIN].pop(entry.entry_id)
    return True

class BensinpriserDataUpdateCoordinator(DataUpdateCoordinator):
    def __init__(self, hass: HomeAssistant, lan: str, station: str):
        self.lan = lan
        self.station = station
        super().__init__(hass, _LOGGER, name=DOMAIN, update_interval=SCAN_INTERVAL)

    async def _async_update_data(self):
        try:
            url = f"https://henrikhjelm.se/api/getdata.php?lan={self.lan}"
            _LOGGER.debug(f"Fetching data from URL: {url}")
            response = await self.hass.async_add_executor_job(requests.get, url)
            response.raise_for_status()
            data = response.json()  # Convert response to JSON
            _LOGGER.debug(f"Data fetched: {data}")
            if self.station in data:
                return data[self.station]
            else:
                raise UpdateFailed(f"Station {self.station} not found in data")
        except Exception as e:
            raise UpdateFailed(f"Error fetching data: {e}")

class BensinpriserSensor(SensorEntity):
    def __init__(self, coordinator: BensinpriserDataUpdateCoordinator, name: str):
        super().__init__()
        _LOGGER.debug(f"Creating BensinpriserSensor: {name}")
        self.coordinator = coordinator
        self._name = name
        self._state = self.coordinator.data
        self._attr_extra_state_attributes = {}

    @property
    def name(self):
        return self._name

    @property
    def state(self):
        return self._state

    @property
    def unit_of_measurement(self):
        return "kr/l"

    async def async_update(self):
        _LOGGER.debug(f"Updating BensinpriserSensor: {self._name}")
        await self.coordinator.async_request_refresh()
        data = self.coordinator.data

        _LOGGER.debug(f"Data received for update: {data}")
        try:
            self._state = data
            self._attr_extra_state_attributes = {}
            
        except Exception as e:
            _LOGGER.error(f"Error updating BensinpriserSensor {self._name}: {e}")

        _LOGGER.debug(f"Updated BensinpriserSensor {self._name} to state: {self._state}")

    @property
    def extra_state_attributes(self):
        return self._attr_extra_state_attributes

    @property
    def unique_id(self):
        return f"{self.coordinator.lan}_{self.coordinator.station}"

    @property
    def available(self):
        return self.coordinator.last_update_success and self.coordinator.data is not None

    @property
    def should_poll(self):
        return True

    @property
    def icon(self):
        return "mdi:gas-station"