"""Infrared remote-control profiles for battery-powered lights."""

from collections.abc import Mapping
from dataclasses import dataclass, field
from typing import Any

from infrared_protocols.commands.nec import NECCommand

from .const import CONF_PROFILE, CONF_PROFILES


@dataclass(frozen=True, slots=True)
class NECProfile:
    """Describe all known commands for one NEC light family."""

    address: int
    power_on: int
    power_off: int
    brightness_up: int | None = None
    brightness_down: int | None = None
    modes: dict[str, int] = field(default_factory=dict)
    timers: dict[str, int] = field(default_factory=dict)

    def command(self, value: int) -> NECCommand:
        """Create an encoded NEC command for this profile."""
        return NECCommand(address=self.address, command=value)


PROFILES: dict[str, NECProfile] = {
    # ESPHome dump values:
    #   ON  command 0xAF50 -> command byte 0x50, inverse byte 0xAF
    #   OFF command 0xA05F -> command byte 0x5F, inverse byte 0xA0
    #   DOWN 0xBF40, UP 0xB54A
    #   SL 0xC03F, FL 0xC43B, BF 0xCF30, Light 0xC53A
    #   2H 0xDF20, 4H 0xD02F, 6H 0xD52A, 8H 0xD32C
    "tea_lights_93cb": NECProfile(
        address=0x93CB,
        power_on=0x50,
        power_off=0x5F,
        brightness_down=0x40,
        brightness_up=0x4A,
        modes={
            "SL": 0x3F,
            "FL": 0x3B,
            "BF": 0x30,
            "Light": 0x3A,
        },
        timers={
            "2H": 0x20,
            "4H": 0x2F,
            "6H": 0x2A,
            "8H": 0x2C,
        },
    ),
    # ESPHome dump values:
    #   ON 0xBA45, OFF 0xB847, DIM DOWN 0xF30C, DIM UP 0xA15E
    #   Candle 0xE916, Light 0xF20D
    #   2H 0xBB44, 4H 0xBC43, 6H 0xF807, 8H 0xF609
    # Candle is exposed through the shared semantic SL control.
    "taper_candles_ff00": NECProfile(
        address=0xFF00,
        power_on=0x45,
        power_off=0x47,
        brightness_down=0x0C,
        brightness_up=0x5E,
        modes={
            "SL": 0x16,
            "Light": 0x0D,
        },
        timers={
            "2H": 0x44,
            "4H": 0x43,
            "6H": 0x07,
            "8H": 0x09,
        },
    ),
}


def configured_profiles(config: Mapping[str, Any]) -> list[NECProfile]:
    """Resolve the configured legacy profile or ordered profile collection."""
    profile_ids = config.get(CONF_PROFILES)
    if profile_ids is None:
        profile_ids = [config[CONF_PROFILE]]
    return [PROFILES[profile_id] for profile_id in profile_ids]
