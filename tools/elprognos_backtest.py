"""Retrospective energy tests using only data available at each forecast origin.

No claims about historical cost accuracy: old quarter prices/fees and day-ahead
publication times are not available with sufficient fidelity for that test.
"""
from datetime import datetime, timedelta
import importlib.util
import json
from pathlib import Path
from statistics import mean
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "backups/elprognos_v2_20261108"
spec = importlib.util.spec_from_file_location("forecast_model", ROOT / "custom_components/elprognos/model.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


def run():
    tz = ZoneInfo("Europe/Stockholm")
    source = json.loads((OUT / "statistics_hour.json").read_text())["sensor.utomhus_elmatare_elstolpen_forbrukad_energi"]
    hourly = m.energy_rows(source, 3600)
    rows = []
    for month in range(6, 11):
        first = datetime(2026, month, 1, tzinfo=tz)
        following = (first.replace(day=28) + timedelta(days=4)).replace(day=1)
        first_ts, end_ts = int(first.timestamp()), int(following.timestamp())
        all_hours = list(range(first_ts, end_ts, 3600))
        if not all(str(t) in hourly for t in all_hours):
            rows.append({"month": first.strftime("%Y-%m"), "skipped": "Incomplete hourly energy history"})
            continue
        actual = sum(hourly[str(t)] for t in all_hours)
        for day in [1, 7, 15, 25]:
            cutoff = int(first.replace(day=day).timestamp())
            available = {t: v for t, v in hourly.items() if int(t) < cutoff}
            try:
                profile = m.LoadProfile(available, cutoff, tz)
            except ValueError as err:
                rows.append({"month": first.strftime("%Y-%m"), "day": day, "skipped": str(err)})
                continue
            so_far = sum(hourly[str(t)] for t in range(first_ts, cutoff, 3600))
            estimates = {
                method: so_far + sum(profile.predict(t, method) for t in range(cutoff, end_ts, 3600))
                for method in ["adaptive", "weighted", "simple"]
            }
            # Comparable month-to-date extrapolation, no prior month history.
            if cutoff > first_ts:
                estimates["month_only"] = so_far / ((cutoff-first_ts)/3600) * len(all_hours)
            rows.append({
                "month": first.strftime("%Y-%m"), "day": day, "actual_kwh": round(actual, 2),
                "training_complete_days": len(profile.days),
                "predicted_kwh": {k: round(v, 2) for k, v in estimates.items()},
                "absolute_error_kwh": {k: round(abs(v-actual), 2) for k, v in estimates.items()},
                "absolute_error_percent": {k: round(100*abs(v-actual)/actual, 2) for k, v in estimates.items()},
            })
    summary = {}
    # Exclude day 1 for fair comparison with the month-only baseline.
    common = [r for r in rows if not r.get("skipped") and r["day"] != 1]
    for method in ["adaptive", "weighted", "simple", "month_only"]:
        errors = [r["absolute_error_kwh"][method] for r in common]
        percentages = [r["absolute_error_percent"][method] for r in common]
        summary[method] = {"forecasts": len(errors), "mae_kwh": round(mean(errors), 2), "mape_percent": round(mean(percentages), 2)} if errors else {}
    result = {"scope": "Energy only; Jun-Oct 2026, origins day 1/7/15/25 at local midnight", "summary_common_origins": summary, "rows": rows}
    (OUT / "backtest.json").write_text(json.dumps(result, ensure_ascii=False, indent=2))
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    run()
