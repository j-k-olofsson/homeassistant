"""Light entities controlled through a Home Assistant infrared emitter."""

import asyncio
from typing import Any, override

from homeassistant.components.infrared import InfraredEmitterConsumerEntity
from homeassistant.components.light import ColorMode, LightEntity
from homeassistant.const import CONF_NAME
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType

from .const import CONF_EMITTER, CONF_UNIQUE_ID, INTER_PROFILE_DELAY
from .profiles import NECProfile, configured_profiles


async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Set up an IR light from discovery data."""
    if discovery_info is None:
        return
    async_add_entities([IRLight(discovery_info)])


class IRLightBaseEntity(Entity):
    """Common metadata for an IR-controlled light."""

    _attr_has_entity_name = False

    def __init__(self, config: DiscoveryInfoType) -> None:
        """Initialize common entity metadata."""
        self._attr_name = config[CONF_NAME]
        self._attr_unique_id = config[CONF_UNIQUE_ID]


class IRLight(IRLightBaseEntity, InfraredEmitterConsumerEntity, LightEntity):
    """An assumed-state light backed by an infrared command profile."""

    _attr_assumed_state = True
    _attr_color_mode = ColorMode.ONOFF
    _attr_supported_color_modes = {ColorMode.ONOFF}

    def __init__(self, config: DiscoveryInfoType) -> None:
        """Initialize the IR light."""
        super().__init__(config)
        self._infrared_emitter_entity_id = config[CONF_EMITTER]
        self._profiles: list[NECProfile] = configured_profiles(config)
        self._attr_is_on = False

    async def _send_profile_commands(self, attribute: str) -> None:
        """Send one semantic command for every configured light family."""
        for index, profile in enumerate(self._profiles):
            await self._send_command(profile.command(getattr(profile, attribute)))
            if index < len(self._profiles) - 1:
                await asyncio.sleep(INTER_PROFILE_DELAY)

    @override
    async def async_turn_on(self, **kwargs: Any) -> None:
        """Send the profile's discrete ON command."""
        await self._send_profile_commands("power_on")
        self._attr_is_on = True
        self.async_write_ha_state()

    @override
    async def async_turn_off(self, **kwargs: Any) -> None:
        """Send the profile's discrete OFF command."""
        await self._send_profile_commands("power_off")
        self._attr_is_on = False
        self.async_write_ha_state()
