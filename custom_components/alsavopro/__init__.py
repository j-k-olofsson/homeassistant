"""Alsavo Pro pool heat pump integration."""
import logging
from datetime import timedelta

import async_timeout
from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.update_coordinator import (
    DataUpdateCoordinator,
)

from homeassistant.const import (
    CONF_PASSWORD,
    CONF_IP_ADDRESS,
    CONF_PORT,
    CONF_NAME,
    Platform, # Import Platform enum for better type hinting and clarity
)

from .AlsavoPyCtrl import AlsavoPro
from .const import (
    DOMAIN,
    SERIAL_NO,
)

_LOGGER = logging.getLogger(__name__)

# Define platforms to be set up
PLATFORMS: list[Platform] = [Platform.SENSOR, Platform.CLIMATE]


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the Alsavo Pro component."""
    # This function is largely unused in modern integrations but required.
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the Alsavo Pro heater from a config entry."""
    name = entry.data.get(CONF_NAME)
    serial_no = entry.data.get(SERIAL_NO)
    ip_address = entry.data.get(CONF_IP_ADDRESS)
    port_no = entry.data.get(CONF_PORT)
    password = entry.data.get(CONF_PASSWORD)

    data_handler = AlsavoPro(name, serial_no, ip_address, port_no, password)
    # The first update is done within the coordinator's first refresh
    data_coordinator = AlsavoProDataCoordinator(hass, data_handler)

    # Perform the first refresh to catch any connection issues early
    await data_coordinator.async_config_entry_first_refresh()

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = data_coordinator

    # --- CHANGED SECTION ---
    # The old `async_forward_entry_setup` is deprecated.
    # The new `async_forward_entry_setups` (plural) handles all platforms at once.
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    # --- END CHANGED SECTION ---

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    # --- CHANGED SECTION ---
    # The old `async_forward_entry_unload` is also deprecated.
    # The new `async_forward_entry_unloads` (plural) unloads all platforms at once.
    # It returns True if all platforms were unloaded successfully.
    return await hass.config_entries.async_forward_entry_unloads(entry, PLATFORMS)
    # --- END CHANGED SECTION ---


class AlsavoProDataCoordinator(DataUpdateCoordinator):
    """Class to manage fetching Alsavo Pro data from the device."""

    def __init__(self, hass: HomeAssistant, data_handler: AlsavoPro):
        """Initialize my coordinator."""
        super().__init__(
            hass,
            _LOGGER,
            name="AlsavoPro",
            update_interval=timedelta(seconds=15),
        )
        self.data_handler = data_handler

    async def _async_update_data(self):
        """Fetch data from API endpoint.

        This is the place to pre-process the data to lookup tables
        so entities can quickly look up their data.
        """
        _LOGGER.debug("Starting data update from Alsavo Pro device")
        try:
            # Note: The timeout is handled by the coordinator.
            async with async_timeout.timeout(10):
                await self.data_handler.update()
                _LOGGER.debug("Data update successful")
                return self.data_handler
        except Exception as ex:
            # The coordinator will automatically log the exception and handle retries.
            _LOGGER.error("Error communicating with Alsavo Pro device: %s", ex)
            # Re-raise the exception to be caught by the DataUpdateCoordinator
            raise