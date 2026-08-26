"""Virtual infrared emitter that fans commands out to all physical emitters."""

import asyncio
import logging
from typing import override

from homeassistant.components.infrared import (
    InfraredCommand,
    InfraredEmitterEntity,
    async_get_emitters,
    async_send_command,
)
from homeassistant.const import CONF_NAME, EVENT_STATE_CHANGED, STATE_UNAVAILABLE
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.typing import ConfigType, DiscoveryInfoType

from .const import DEFAULT_NAME, DOMAIN, ENTITY_ID

_LOGGER = logging.getLogger(__name__)

# Two unsynchronised IR carriers can corrupt each other when their coverage overlaps.
# A NEC frame is roughly 70 ms; this guard interval also covers API/queue latency.
INTER_EMITTER_DELAY = 0.2


async def async_setup_platform(
    hass: HomeAssistant,
    config: ConfigType,
    async_add_entities: AddEntitiesCallback,
    discovery_info: DiscoveryInfoType | None = None,
) -> None:
    """Set up the broadcast emitter."""
    if discovery_info is None:
        return
    async_add_entities(
        [InfraredBroadcastEmitter(discovery_info.get(CONF_NAME, DEFAULT_NAME))]
    )


class InfraredBroadcastEmitter(InfraredEmitterEntity):
    """Forward every infrared command to all non-broadcast emitters."""

    _attr_has_entity_name = False
    _attr_should_poll = False
    _attr_unique_id = "infrared_broadcast_all_emitters"

    def __init__(self, name: str) -> None:
        """Initialize the broadcast emitter."""
        self._attr_name = name
        self.entity_id = ENTITY_ID

    def _physical_emitters(self) -> list[str]:
        """Return all available physical emitter entity IDs."""
        registry = er.async_get(self.hass)
        emitters: list[str] = []

        for entity_id in async_get_emitters(self.hass):
            if entity_id == self.entity_id:
                continue

            registry_entry = registry.async_get(entity_id)
            if registry_entry is not None and registry_entry.platform == DOMAIN:
                continue

            state = self.hass.states.get(entity_id)
            if state is None or state.state == STATE_UNAVAILABLE:
                continue

            emitters.append(entity_id)

        return sorted(emitters)

    @property
    @override
    def available(self) -> bool:
        """Return whether at least one physical emitter is available."""
        return bool(self._physical_emitters())

    @override
    async def async_added_to_hass(self) -> None:
        """Track physical emitter availability changes."""
        await super().async_added_to_hass()
        self.async_on_remove(
            self.hass.bus.async_listen(EVENT_STATE_CHANGED, self._state_changed)
        )

    @callback
    def _state_changed(self, event: Event[EventStateChangedData]) -> None:
        """Refresh availability when an infrared entity changes."""
        entity_id = event.data["entity_id"]
        if entity_id.startswith("infrared.") and entity_id != self.entity_id:
            self.async_write_ha_state()

    @override
    async def async_send_command(self, command: InfraredCommand) -> None:
        """Send sequentially to avoid collisions in overlapping IR coverage."""
        emitters = self._physical_emitters()
        if not emitters:
            raise HomeAssistantError("No physical infrared emitters are available")

        successes = 0
        for index, entity_id in enumerate(emitters):
            try:
                await async_send_command(
                    self.hass,
                    entity_id,
                    command,
                    context=self._context,
                )
            except Exception as error:  # noqa: BLE001 - continue through other emitters
                _LOGGER.warning("IR broadcast failed via %s: %s", entity_id, error)
            else:
                successes += 1

            if index < len(emitters) - 1:
                await asyncio.sleep(INTER_EMITTER_DELAY)

        if successes == 0:
            raise HomeAssistantError(
                f"Infrared broadcast failed through all {len(emitters)} emitters"
            )

        _LOGGER.info(
            "IR broadcast sent sequentially through %d of %d emitters",
            successes,
            len(emitters),
        )
