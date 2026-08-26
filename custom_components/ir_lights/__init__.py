"""Set up infrared-controlled light profiles."""

import voluptuous as vol

from homeassistant.const import CONF_NAME, Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv, discovery
from homeassistant.helpers.typing import ConfigType

from .const import CONF_EMITTER, CONF_PROFILE, CONF_PROFILES, CONF_UNIQUE_ID, DOMAIN
from .profiles import PROFILES


def _validate_profile_selection(config: ConfigType) -> ConfigType:
    """Require exactly one legacy profile or one non-empty profile list."""
    if (CONF_PROFILE in config) == (CONF_PROFILES in config):
        raise vol.Invalid("Specify exactly one of profile or profiles")
    return config


LIGHT_SCHEMA = vol.All(
    vol.Schema(
        {
            vol.Required(CONF_NAME): cv.string,
            vol.Required(CONF_UNIQUE_ID): cv.string,
            vol.Optional(CONF_PROFILE): vol.In(PROFILES),
            vol.Optional(CONF_PROFILES): vol.All(
                cv.ensure_list,
                [vol.In(PROFILES)],
                vol.Length(min=1),
            ),
            vol.Required(CONF_EMITTER): cv.entity_id,
        }
    ),
    _validate_profile_selection,
)

CONFIG_SCHEMA = vol.Schema(
    {DOMAIN: vol.All(cv.ensure_list, [LIGHT_SCHEMA])},
    extra=vol.ALLOW_EXTRA,
)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up configured IR lights."""
    for light_config in config[DOMAIN]:
        for platform in (Platform.LIGHT, Platform.BUTTON):
            hass.async_create_task(
                discovery.async_load_platform(
                    hass,
                    platform,
                    DOMAIN,
                    light_config,
                    config,
                )
            )
    return True
