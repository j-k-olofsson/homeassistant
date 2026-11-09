"""Exercise the real recorder API against an isolated temporary SQLite DB.

Run with the HA container's Python. This creates a separate HomeAssistant
instance with only recorder, no device integrations, in a temporary directory.
It never opens the production database or production configuration.
"""
import asyncio
from datetime import UTC, datetime, timedelta
import importlib.util
from pathlib import Path
import tempfile

from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntries
from homeassistant import loader
from homeassistant.helpers.recorder import DATA_RECORDER, RecorderData
from homeassistant.setup import async_setup_component
from homeassistant.components.recorder import get_instance
from homeassistant.components.recorder.models import StatisticMeanType
from homeassistant.components.recorder.statistics import async_add_external_statistics, statistics_during_period

spec = importlib.util.spec_from_file_location("model", Path("/config/custom_components/elprognos/model.py"))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


async def main():
    with tempfile.TemporaryDirectory(prefix="elprognos-sqlite-test-") as temporary:
        hass = HomeAssistant(temporary)
        loader.async_setup(hass)
        hass.data[DATA_RECORDER] = RecorderData()
        hass.config_entries = ConfigEntries(hass, {})
        await hass.config_entries.async_initialize()
        try:
            assert await async_setup_component(hass, "recorder", {
                "recorder": {"db_url": "sqlite:///" + temporary + "/test.db", "auto_purge": False}
            })
            await hass.async_start()
            await asyncio.wait_for(hass.data[DATA_RECORDER].db_connected, 30)
            recorder = get_instance(hass)
            await recorder.async_block_till_done()
            end = datetime.now(UTC).replace(minute=0, second=0, microsecond=0)
            start = end - timedelta(days=42)
            data = [{"start": start + timedelta(hours=i), "state": 1000+i, "sum": float(i)}
                    for i in range(42*24)]
            statistic_id = "elprognos_test:energy"
            async_add_external_statistics(hass, {
                "source": "elprognos_test", "statistic_id": statistic_id,
                "name": "Isolated test meter", "unit_of_measurement": "kWh",
                "unit_class": "energy", "mean_type": StatisticMeanType.NONE, "has_sum": True,
            }, data)
            # Imports are paged: one queue barrier can precede a continuation
            # batch. Wait for the complete import instead of racing that batch.
            async with asyncio.timeout(30):
                while True:
                    await recorder.async_block_till_done()
                    result = await recorder.async_add_executor_job(
                        statistics_during_period, hass, start + timedelta(hours=1), end,
                        {statistic_id}, "hour", None, {"change"},
                    )
                    if len(result.get(statistic_id, [])) == 42*24-1:
                        break
                    await asyncio.sleep(0.05)
            values = {}
            m.merge_energy(values, result[statistic_id], 3600)
            assert len(values) == 42*24-1, len(values)
            assert all(v == 1 for v in values.values()), set(values.values())
            # The model consumes native seconds as well as WebSocket milliseconds.
            websocket_rows = [{**r, "start": r["start"]*1000} for r in result[statistic_id]]
            assert m.energy_rows(websocket_rows, 3600) == values
            forecast = m.forecast(values, {},
                                  {str(int(start.timestamp())+i*300): 1 for i in range(42*24*12)},
                                  [{"start": int(start.timestamp()), "variable": .5, "vat": 25, "fixed": 100}],
                                  int(end.timestamp()))
            assert forecast["coverage"] == 100, forecast
            print("PASS: real HA recorder on isolated SQLite, 1007 hourly increments, native/API timestamp parity and complete forecast")
        finally:
            await hass.async_stop()


if __name__ == "__main__":
    asyncio.run(main())
