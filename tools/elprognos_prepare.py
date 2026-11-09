"""Run once inside the HA container before enabling the V2 sensor platform.

Read existing statistics, query raw spot through the configured Nord Pool
service, then create ONLY the new integration's previously nonexistent store.
No credentials are written; legacy configuration and statistics are untouched.
"""
import asyncio
from datetime import UTC, datetime, timedelta
import importlib.util
import json
import os
from pathlib import Path
from zoneinfo import ZoneInfo

import aiohttp

ROOT = Path("/config")
OUT = ROOT / "backups/elprognos_v2_20261108"
spec = importlib.util.spec_from_file_location("forecast_model", ROOT / "custom_components/elprognos/model.py")
model = importlib.util.module_from_spec(spec)
spec.loader.exec_module(model)


async def main():
    target = ROOT / ".storage/elprognos.ledger"
    assert not target.exists(), "Refusing to overwrite an existing ledger"
    now = int(datetime.now(UTC).timestamp())
    tz = ZoneInfo("Europe/Stockholm")
    hourly = json.loads((OUT / "statistics_hour.json").read_text())
    sources = json.loads((OUT / "sources.json").read_text())
    hourly = model.energy_rows(hourly["sensor.utomhus_elmatare_elstolpen_forbrukad_energi"], 3600)
    read = lambda entity: float(sources[entity]["state"])
    tariff = {"start": now,
              "variable": sum(read("input_number.elpris_" + fee) for fee in ["handelsavgift", "spotpaslag", "certifikatsavgift", "overforingsavgift", "energiskatt"]),
              "vat": read("input_number.elpris_moms"),
              "fixed": read("input_number.manadsavgifter_elhandel_nat")}
    ledger = {"hourly": hourly, "fine": {}, "prices": {}, "tariffs": [tariff],
              "snapshots": {}, "price_days": {},
              "source": {"energy_entity": "sensor.utomhus_elmatare_elstolpen_forbrukad_energi", "area": "SE3"}}
    headers = {"Authorization": "Bearer " + os.environ["SUPERVISOR_TOKEN"]}
    cache = OUT / "raw_price_days.json"
    raw = json.loads(cache.read_text()) if cache.exists() else {}
    async with aiohttp.ClientSession(headers=headers, timeout=aiohttp.ClientTimeout(total=45)) as s:
        async with s.ws_connect("http://supervisor/core/websocket", max_msg_size=32*1024*1024) as ws:
            await ws.receive_json()
            await ws.send_json({"type": "auth", "access_token": os.environ["SUPERVISOR_TOKEN"]})
            assert (await ws.receive_json())["type"] == "auth_ok"
            await ws.send_json({"id": 1, "type": "recorder/statistics_during_period",
                               "start_time": datetime.fromtimestamp(now - 9*86400, UTC).isoformat(),
                               "period": "5minute", "statistic_ids": [ledger["source"]["energy_entity"]], "types": ["change"]})
            response = await ws.receive_json()
            assert response["success"], response
            ledger["fine"] = model.energy_rows(response["result"].get(ledger["source"]["energy_entity"], []), 300)
        today = datetime.fromtimestamp(now, tz).date()
        for offset in range(-1, 33):
            day = today - timedelta(days=offset)
            key = day.isoformat()
            if key not in raw:
                async with s.post("http://supervisor/core/api/services/nordpool/hourly?return_response",
                                  json={"date": key, "area": ["SE3"], "currency": "SEK"}) as r:
                    response = await r.json()
                    assert r.status == 200, (key, r.status)
                raw[key] = response["service_response"]
                cache.write_text(json.dumps(raw))
            values = model.parse_prices(raw[key])
            midnight = datetime.combine(day, datetime.min.time(), tz)
            following = midnight + timedelta(days=1)
            expected = int((following.timestamp() - midnight.timestamp()) / 300)
            assert len(values) == expected, (key, len(values), expected)
            ledger["prices"].update(values)
            ledger["price_days"][key] = True
            print("Spot", key, len(values), flush=True)
    result = model.forecast(ledger["hourly"], ledger["fine"], ledger["prices"], ledger["tariffs"], now)
    (OUT / "dry_run.json").write_text(json.dumps(result, ensure_ascii=False, indent=2))
    (OUT / "seed_ledger.json").write_text(json.dumps(ledger))
    payload = {"version": 1, "minor_version": 1, "key": "elprognos.ledger", "data": ledger}
    # Exclusive creation guards against concurrent startup/another preparation.
    with target.open("x") as stream:
        json.dump(payload, stream)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
