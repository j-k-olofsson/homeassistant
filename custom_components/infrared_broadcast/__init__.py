"""Set up a virtual infrared emitter that broadcasts to physical emitters."""

import voluptuous as vol

from homeassistant.const import CONF_NAME, Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv, discovery
from homeassistant.helpers.typing import ConfigType

from .const import DEFAULT_NAME, DOMAIN

CONFIG_SCHEMA = vol.Schema(
    {
        DOMAIN: vol.Schema(
            {vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string}
        )
    },
    extra=vol.ALLOW_EXTRA,
)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up Infrared Broadcast from YAML."""
    hass.async_create_task(
        discovery.async_load_platform(
            hass,
            Platform.INFRARED,
            DOMAIN,
            config[DOMAIN],
            config,
        )
    )
    return True

