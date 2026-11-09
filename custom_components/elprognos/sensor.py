"""HA adapter: statistics API, Nord Pool service and independent HA storage.

Recorder access uses HA's own abstraction and its executor, for MariaDB as well
as SQLite. The ledger is included in HA configuration backups (.storage).
"""
from __future__ import annotations

import asyncio
from datetime import UTC, datetime, timedelta
import logging

import voluptuous as vol

from homeassistant.components.recorder import get_instance
from homeassistant.components.recorder.statistics import statistics_during_period
from homeassistant.components.sensor import PLATFORM_SCHEMA, SensorEntity, SensorStateClass
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.storage import Store
from homeassistant.helpers.update_coordinator import CoordinatorEntity, DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util

from .model import forecast, merge_energy, number, parse_prices

LOGGER = logging.getLogger(__name__)
DOMAIN = "elprognos"
ENERGY = "sensor.utomhus_elmatare_elstolpen_forbrukad_energi"
OLD = "sensor.kvartbaserad_elkostnadsprognos"
FEES = ["handelsavgift", "spotpaslag", "certifikatsavgift", "overforingsavgift", "energiskatt"]
PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Optional("energy_entity", default=ENERGY): cv.entity_id,
    vol.Optional("legacy_entity", default=OLD): cv.entity_id,
    vol.Optional("area", default="SE3"): cv.string,
})

# Fixed entity IDs keep dashboard references predictable; unique IDs persist
# through recorder engine migration. No sensor replaces an existing entity.
SENSORS = [
    ("kostnadsprognos", "Kostnadsprognos", "cost_forecast", "SEK"),
    ("energiprognos", "Energiprognos", "energy_forecast", "kWh"),
    ("kostnad_hittills", "Rörlig kostnad hittills", "cost_so_far", "SEK"),
    ("energi_hittills", "Energi hittills", "energy_so_far", "kWh"),
    ("kostnad_aterstar", "Rörlig kostnad återstår", "cost_remaining", "SEK"),
    ("energi_aterstar", "Energi återstår", "energy_remaining", "kWh"),
    ("enkel_30d_kostnad", "Enkel 30-dagars kostnadsprognos", "simple_cost_forecast", "SEK"),
    ("enkel_30d_energi", "Enkel 30-dagars energiprognos", "simple_energy_forecast", "kWh"),
    ("scenario_lagt", "Lägre kostnadsscenario", "scenario_low", "SEK"),
    ("scenario_hogt", "Högre kostnadsscenario", "scenario_high", "SEK"),
    ("datatackning", "Datatäckning innevarande månad", "coverage", "%"),
    ("kanda_priser", "Andel framtida energi med publicerat pris", "known_future_price_percent", "%"),
    ("dygnsforbrukning_30d", "Medelförbrukning senaste 30 dygn", "daily_mean_30d", "kWh"),
    ("skillnad_befintlig", "Skillnad mot befintlig prognos", "legacy_difference", "SEK"),
]


class ForecastCoordinator(DataUpdateCoordinator):
    def __init__(self, hass, config):
        super().__init__(hass, LOGGER, name=DOMAIN, update_interval=timedelta(minutes=15))
        self.config = config
        self.store = Store(hass, 1, "elprognos.ledger", atomic_writes=True)
        self.ledger = None
        self.initial = True
        self.price_attempts = {}

    async def load(self):
        self.ledger = await self.store.async_load() or {
            "hourly": {}, "fine": {}, "prices": {}, "tariffs": [],
            "price_days": {}, "snapshots": {},
        }
        # Refuse accidentally repurposing a ledger for a different meter/area.
        identity = {"energy_entity": self.config["energy_entity"], "area": self.config["area"]}
        if self.ledger.get("source", identity) != identity:
            raise ValueError("Ledger belongs to another meter or price area")
        self.ledger["source"] = identity

    def tariff(self, now):
        source = self.hass.states.get(self.config["energy_entity"])
        if source and source.attributes.get("unit_of_measurement") not in (None, "kWh"):
            raise UpdateFailed("The configured cumulative energy meter must use kWh")
        def read(entity):
            state = self.hass.states.get(entity)
            value = number(state.state) if state else None
            if value is None:
                raise UpdateFailed(f"Missing valid value for {entity}")
            return value

        components = {fee: read("input_number.elpris_" + fee) for fee in FEES}
        result = {
            "variable": sum(components.values()),
            "vat": read("input_number.elpris_moms"),
            "fixed": read("input_number.manadsavgifter_elhandel_nat"),
            "components_ex_vat": components,
        }
        for name in ("elnat", "elhandel"):
            state = self.hass.states.get("input_number.elpris_arsavgift_" + name)
            if state and (value := number(state.state)) is not None:
                result["annual_" + name + "_ex_vat"] = value
        tariffs = self.ledger["tariffs"]
        if not tariffs or any(tariffs[-1].get(k) != v for k, v in result.items()):
            tariffs.append({"start": now, **result})

    async def statistics(self, now):
        # Refresh overlapping rows; replacements make replay/restarts idempotent.
        # Initial query recovers outages within the retained history window.
        for period, seconds, key, initial_days in [
            ("hour", 3600, "hourly", 65), ("5minute", 300, "fine", 9)
        ]:
            start = now - (initial_days * 86400 if self.initial else 3 * 3600)
            rows = await get_instance(self.hass).async_add_executor_job(
                statistics_during_period, self.hass,
                datetime.fromtimestamp(start, UTC), datetime.fromtimestamp(now, UTC),
                {self.config["energy_entity"]}, period, None, {"change"},
            )
            merge_energy(self.ledger[key], rows.get(self.config["energy_entity"], []), seconds)
        self.initial = False

    async def prices(self, now):
        local = dt_util.as_local(datetime.fromtimestamp(now, UTC))
        today = local.date()
        wanted = [today, today + timedelta(days=1)]
        # Gradually heal any historical holes after an outage without fetching
        # 30 network requests on HA's startup path.
        wanted += [today - timedelta(days=n) for n in range(1, 32)]
        fetched = 0
        for day in wanted:
            key = day.isoformat()
            if self.ledger["price_days"].get(key):
                continue
            if now - self.price_attempts.get(key, 0) < 3600:
                continue
            if not self.hass.services.has_service("nordpool", "hourly"):
                break
            self.price_attempts[key] = now
            try:
                async with asyncio.timeout(30):
                    response = await self.hass.services.async_call(
                        "nordpool", "hourly",
                        {"date": key, "area": [self.config["area"]], "currency": "SEK"},
                        blocking=True, return_response=True,
                    )
                values = parse_prices(response or {}, self.config["area"])
                start = datetime.combine(day, datetime.min.time(), local.tzinfo)
                end = start + timedelta(days=1)
                expected = int((end.timestamp() - start.timestamp()) / 300)
                values = {t: v for t, v in values.items() if start.timestamp() <= int(t) < end.timestamp()}
                self.ledger["prices"].update(values)
                if len(values) == expected:
                    self.ledger["price_days"][key] = True
            except (TimeoutError, ValueError, KeyError, TypeError) as err:
                LOGGER.warning("Spot prices for %s unavailable (%s); using labelled estimates", key, type(err).__name__)
            except Exception:
                LOGGER.exception("Unable to fetch Nord Pool prices for %s", key)
            fetched += 1
            if fetched >= 3:
                break

    async def _async_update_data(self):
        now = int(dt_util.utcnow().timestamp())
        self.tariff(now)
        try:
            await self.statistics(now)
            await self.prices(now)
            data = forecast(self.ledger["hourly"], self.ledger["fine"],
                            self.ledger["prices"], self.ledger["tariffs"], now,
                            self.hass.config.time_zone)
        except ValueError as err:
            raise UpdateFailed(str(err)) from err
        old = self.hass.states.get(self.config["legacy_entity"])
        old_value = number(old.state) if old else None
        data["legacy_forecast"] = old_value
        data["legacy_difference"] = round(data["cost_forecast"] - old_value, 2) if old_value is not None else None
        data["comparison_note"] = "Skillnaden omfattar prognosmodell, uppmätt energi och prisunderlag; inte bara modellens träffsäkerhet"
        # Daily latest snapshots survive restart, for prospective comparison.
        day = dt_util.as_local(datetime.fromtimestamp(now, UTC)).date().isoformat()
        self.ledger["snapshots"][day] = data
        for key, days in [("hourly", 400), ("fine", 70), ("prices", 70)]:
            self.ledger[key] = {t: v for t, v in self.ledger[key].items() if int(t) >= now - days * 86400}
        self.ledger["price_days"] = {d: v for d, v in self.ledger["price_days"].items() if d >= (dt_util.now().date() - timedelta(days=70)).isoformat()}
        self.ledger["snapshots"] = {d: v for d, v in self.ledger["snapshots"].items() if d >= (dt_util.now().date() - timedelta(days=400)).isoformat()}
        await self.store.async_save(self.ledger)
        return data


class ForecastSensor(CoordinatorEntity, SensorEntity):
    _attr_should_poll = False
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(self, coordinator, suffix, name, key, unit):
        super().__init__(coordinator)
        self.key = key
        self._attr_name = "Elprognos V2 " + name
        self._attr_unique_id = "elprognos_v2_" + suffix
        self.entity_id = "sensor.elprognos_v2_" + suffix
        self._attr_native_unit_of_measurement = unit
        self._attr_suggested_display_precision = 0 if unit == "SEK" else 1
        self._attr_icon = "mdi:chart-line" if unit == "SEK" else "mdi:lightning-bolt"
        # These are forecasts and period totals, not cumulative energy meters.
        # Do not feed them into the energy dashboard as total_increasing sensors.

    @property
    def native_value(self):
        return (self.coordinator.data or {}).get(self.key)

    @property
    def extra_state_attributes(self):
        data = self.coordinator.data or {}
        if self.key == "cost_forecast":
            return {k: v for k, v in data.items() if k not in {s[2] for s in SENSORS}}
        return {k: data.get(k) for k in ["month", "measured_until", "complete_days"]}


async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    coordinator = ForecastCoordinator(hass, config)
    await coordinator.load()
    hass.data[DOMAIN] = coordinator
    async_add_entities([ForecastSensor(coordinator, *definition) for definition in SENSORS])

    async def started(_event=None):
        await coordinator.async_refresh()

    async def fee_changed(_event):
        # Helpers are restored one at a time during startup. Wait for the
        # started event instead of treating the partly restored set as a fault.
        if hass.is_running:
            await coordinator.async_request_refresh()

    # Capture changed tariffs promptly rather than waiting for the next poll.
    async_track_state_change_event(
        hass, ["input_number.elpris_" + fee for fee in FEES] +
        ["input_number.elpris_moms", "input_number.manadsavgifter_elhandel_nat",
         "input_number.elpris_arsavgift_elnat", "input_number.elpris_arsavgift_elhandel"], fee_changed,
    )

    if hass.is_running:
        hass.async_create_task(started())
    else:
        hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, started)
