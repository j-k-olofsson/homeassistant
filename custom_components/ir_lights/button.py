"""Stateless remote-control buttons for infrared lights."""

import asyncio
from dataclasses import dataclass
from typing import override

from homeassistant.components.button import ButtonEntity
from homeassistant.components.infrared import InfraredEmitterConsumerEntity
from homeassistant.const import CONF_NAME
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType

from .const import CONF_EMITTER, CONF_UNIQUE_ID, INTER_PROFILE_DELAY
from .profiles import NECProfile, configured_profiles


@dataclass(frozen=True, slots=True)
class CommandSpec:
    """Describe one stateless remote button."""

    key: str
    name: str
    icon: str
    commands: tuple[tuple[NECProfile, int], ...]


def _command_specs(profiles: list[NECProfile]) -> list[CommandSpec]:
    """Build shared controls from the semantic union of all profiles."""
    specs: list[CommandSpec] = []

    brightness_down = tuple(
        (profile, profile.brightness_down)
        for profile in profiles
        if profile.brightness_down is not None
    )
    if brightness_down:
        specs.append(
            CommandSpec(
                "brightness_down",
                "Ljusstyrka minska",
                "mdi:brightness-5",
                brightness_down,
            )
        )
    brightness_up = tuple(
        (profile, profile.brightness_up)
        for profile in profiles
        if profile.brightness_up is not None
    )
    if brightness_up:
        specs.append(
            CommandSpec(
                "brightness_up",
                "Ljusstyrka öka",
                "mdi:brightness-7",
                brightness_up,
            )
        )

    mode_names = dict.fromkeys(
        mode for profile in profiles for mode in profile.modes
    )
    for mode in mode_names:
        specs.append(
            CommandSpec(
                f"mode_{mode.lower()}",
                f"Läge {mode}",
                "mdi:waveform",
                tuple(
                    (profile, profile.modes[mode])
                    for profile in profiles
                    if mode in profile.modes
                ),
            )
        )

    timer_names = dict.fromkeys(
        timer for profile in profiles for timer in profile.timers
    )
    for timer in timer_names:
        specs.append(
            CommandSpec(
                f"timer_{timer.lower()}",
                f"Timer {timer}",
                "mdi:timer-outline",
                tuple(
                    (profile, profile.timers[timer])
                    for profile in profiles
                    if timer in profile.timers
                ),
            )
        )
    return specs


async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Set up all optional command buttons for one IR light profile."""
    if discovery_info is None:
        return

    profiles = configured_profiles(discovery_info)
    async_add_entities(
        IRLightCommandButton(discovery_info, spec)
        for spec in _command_specs(profiles)
    )


class IRLightCommandButton(InfraredEmitterConsumerEntity, ButtonEntity):
    """A stateless command from the original infrared remote."""

    _attr_has_entity_name = False

    def __init__(
        self,
        config: DiscoveryInfoType,
        spec: CommandSpec,
    ) -> None:
        """Initialize the command button."""
        self._commands = spec.commands
        self._infrared_emitter_entity_id = config[CONF_EMITTER]
        self._attr_name = f"{config[CONF_NAME]} {spec.name}"
        self._attr_unique_id = f"{config[CONF_UNIQUE_ID]}_{spec.key}"
        self._attr_icon = spec.icon

    @override
    async def async_press(self) -> None:
        """Send the button's discrete infrared command."""
        for index, (profile, value) in enumerate(self._commands):
            await self._send_command(profile.command(value))
            if index < len(self._commands) - 1:
                await asyncio.sleep(INTER_PROFILE_DELAY)
