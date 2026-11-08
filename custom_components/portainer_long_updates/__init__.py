"""Keep native Portainer update controls usable for slow image pulls."""

import logging

import voluptuous as vol

from .client import install
from .versions import install as install_versions

DOMAIN = "portainer_long_updates"
LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema(
    {
        DOMAIN: vol.Schema(
            {
                vol.Optional("pull_timeout", default=1800): vol.All(
                    vol.Coerce(int), vol.Range(min=60, max=7200)
                ),
                vol.Optional("restart_timeout", default=120): vol.All(
                    vol.Coerce(int), vol.Range(min=10, max=600)
                ),
            }
        )
    },
    extra=vol.ALLOW_EXTRA,
)


async def async_setup(hass, config):
    """Apply once at startup, including future Portainer entry reloads."""
    options = config[DOMAIN]
    try:
        uninstall = install(**options)
    except (AttributeError, TypeError, ValueError):
        LOGGER.exception("Portainer client is incompatible with long image updates")
        return False
    try:
        uninstall_versions = install_versions()
    except (ImportError, AttributeError, TypeError, ValueError):
        LOGGER.exception(
            "Portainer digest correction is incompatible; native version detection remains active"
        )
        uninstall_versions = None
    else:
        LOGGER.info("Portainer version detection now checks all running-image digests")
    hass.data[DOMAIN] = {**options, "uninstall": uninstall, "uninstall_versions": uninstall_versions}
    LOGGER.info(
        "Native Portainer updates now stream image pulls (timeout %ss); "
        "restart requests allow %ss",
        options["pull_timeout"],
        options["restart_timeout"],
    )
    return True
