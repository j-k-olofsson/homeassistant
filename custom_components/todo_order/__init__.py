"""Keep selected local to-do lists in reverse date order using native moves."""

import asyncio
from datetime import datetime, time, timedelta
import logging
from uuid import UUID

import voluptuous as vol

from homeassistant.components.todo.const import DATA_COMPONENT, TodoListEntityFeature
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED, EVENT_HOMEASSISTANT_STOP
from homeassistant.core import callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import (
    async_track_state_change_event,
    async_track_time_interval,
)
from homeassistant.util import dt as dt_util

DOMAIN = "todo_order"
LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema(
    {DOMAIN: vol.Schema({vol.Required("entity_ids"): [cv.entity_id]})},
    extra=vol.ALLOW_EXTRA,
)


def sort_key(item):
    """Undated first, then descending due date; newest local UUID breaks ties."""
    due = item.due
    if due is None:
        stamp = 0
    elif isinstance(due, datetime):
        stamp = dt_util.as_timestamp(due)
    else:
        stamp = dt_util.as_timestamp(datetime.combine(due, time(), dt_util.DEFAULT_TIME_ZONE))
    try:
        uid = UUID(item.uid)
        created = uid.time if uid.version == 1 else 0
    except (ValueError, TypeError, AttributeError):
        created = 0
    return (due is None, stamp, created)


class ListOrder:
    """Subscribe to every item change, including edits with unchanged counts."""

    def __init__(self, hass, entity_id):
        self.hass = hass
        self.entity_id = entity_id
        self.entity = None
        self.unsubscribe = None
        self.task = None
        self.dirty = False

    @callback
    def bind(self, _event=None):
        entity = self.hass.data[DATA_COMPONENT].get_entity(self.entity_id)
        if entity is not self.entity:
            if self.unsubscribe:
                self.unsubscribe()
                self.unsubscribe = None
            self.entity = entity
            if entity:
                if not entity.supported_features & TodoListEntityFeature.MOVE_TODO_ITEM:
                    LOGGER.error("%s does not support reordering", self.entity_id)
                    self.entity = None
                    return
                self.unsubscribe = entity.async_subscribe_updates(self.changed)
        if self.entity:
            self.changed()

    @callback
    def changed(self, _items=None):
        self.dirty = True
        if self.task is None or self.task.done():
            self.task = self.hass.async_create_task(self.run())

    async def run(self):
        try:
            while self.dirty:
                self.dirty = False
                await asyncio.sleep(0.3)
                entity = self.entity
                if entity is None:
                    return
                # Re-read before every move so simultaneous edits are preserved.
                for _ in range(200):
                    if entity is not self.entity:
                        break
                    items = list(entity.todo_items or [])
                    ordered = sorted(items, key=sort_key, reverse=True)
                    mismatch = next(
                        (i for i, (a, b) in enumerate(zip(items, ordered)) if a.uid != b.uid),
                        None,
                    )
                    if mismatch is None:
                        break
                    await entity.async_move_todo_item(
                        ordered[mismatch].uid,
                        ordered[mismatch - 1].uid if mismatch else None,
                    )
                else:
                    LOGGER.warning("Sort limit reached for %s; retrying next minute", self.entity_id)
                    self.dirty = False
        except asyncio.CancelledError:
            raise
        except Exception:
            LOGGER.exception("Unable to order %s; retrying next minute", self.entity_id)

    @callback
    def stop(self, _event=None):
        if self.unsubscribe:
            self.unsubscribe()
            self.unsubscribe = None
        if self.task:
            self.task.cancel()


async def async_setup(hass, config):
    """Sort on startup and updates; reconnect after list integration reloads."""
    orders = [ListOrder(hass, entity_id) for entity_id in config[DOMAIN]["entity_ids"]]
    hass.data[DOMAIN] = orders
    for order in orders:
        async_track_state_change_event(hass, [order.entity_id], order.bind)
        async_track_time_interval(hass, order.bind, timedelta(minutes=1))
        hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, order.stop)
        if hass.is_running:
            order.bind()
        else:
            hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, order.bind)
    return True
