"""Behavioural checks: calendar boundaries, missing data, tariffs and replay."""
import importlib.util
from datetime import datetime, timedelta
from pathlib import Path
import unittest
from zoneinfo import ZoneInfo

spec = importlib.util.spec_from_file_location("model", Path(__file__).parents[2] / "custom_components/elprognos/model.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
TZ = ZoneInfo("Europe/Stockholm")


def stamp(text):
    return int(datetime.fromisoformat(text).replace(tzinfo=TZ).timestamp())


def fixture(day="2026-11-15T12:00:00", spot=1):
    now = stamp(day)
    first, following = m.month_bounds(now, TZ)
    hourly = {str(t): 1.0 for t in range(first - 40*86400, now, 3600)}
    fine = {str(t): 1/12 for t in range(first, now, 300)}
    prices = {str(t): spot for t in range(first - 40*86400, following, 300)}
    tariffs = [{"start": first - 50*86400, "variable": .5, "vat": 25, "fixed": 100}]
    return hourly, fine, prices, tariffs, now


class ForecastTests(unittest.TestCase):
    def test_constant_load_and_cost_conservation(self):
        args = fixture()
        data = m.forecast(*args)
        self.assertEqual(data["energy_forecast"], 30*24)
        self.assertEqual(data["cost_forecast"], 30*24*1.5*1.25+100)
        self.assertAlmostEqual(data["cost_so_far"]+data["cost_remaining"]+100, data["cost_forecast"])
        self.assertEqual(data["coverage"], 100)

    def test_first_hour_of_new_month_uses_prior_month_history(self):
        data = m.forecast(*fixture("2026-11-01T00:30:00"))
        self.assertEqual(data["energy_so_far"], 0)
        self.assertEqual(data["energy_forecast"], 30*24)
        self.assertEqual(data["coverage"], 100)

    def test_dst_october_25_hour_day(self):
        data = m.forecast(*fixture("2026-10-28T12:00:00"))
        self.assertEqual(data["energy_forecast"], 31*24+1)
        self.assertEqual(data["complete_days"], 30)

    def test_dst_march_23_hour_day(self):
        data = m.forecast(*fixture("2026-03-15T12:00:00"))
        self.assertEqual(data["energy_forecast"], 31*24-1)

    def test_february_and_leap_year(self):
        self.assertEqual(m.forecast(*fixture("2028-02-15T12:00:00"))["energy_forecast"], 29*24)
        self.assertEqual(m.forecast(*fixture("2027-02-15T12:00:00"))["energy_forecast"], 28*24)

    def test_negative_prices_and_scenario_order(self):
        data = m.forecast(*fixture(spot=-2))
        self.assertLess(data["cost_forecast"], 0)
        self.assertLessEqual(data["scenario_low"], data["cost_forecast"])
        self.assertGreaterEqual(data["scenario_high"], data["cost_forecast"])

    def test_missing_energy_is_visible_estimate(self):
        hourly, fine, prices, tariffs, now = fixture()
        first, _ = m.month_bounds(now, TZ)
        del hourly[str(first + 3600)]
        data = m.forecast(hourly, fine, prices, tariffs, now)
        self.assertLess(data["coverage"], 100)
        self.assertEqual(data["estimated_energy"], 1)

    def test_real_zero_is_not_missing(self):
        self.assertEqual(m.energy_rows([{"start": 100000, "change": 0}], 3600), {"100000": 0})
        self.assertIsNone(m.number("unavailable"))
        self.assertIsNone(m.number("nan"))

    def test_gaps_and_meter_resets(self):
        rows = [{"start": 0, "change": 1}, {"start": 7200, "change": 2},
                {"start": 10800, "change": -100}, {"start": 14400, "change": 1}]
        self.assertEqual(m.energy_rows(rows, 3600), {"0": 1, "14400": 1})

    def test_missing_price_is_visible(self):
        hourly, fine, prices, tariffs, now = fixture()
        first, _ = m.month_bounds(now, TZ)
        del prices[str(first)]
        data = m.forecast(hourly, fine, prices, tariffs, now)
        self.assertGreater(data["missing_price_energy"], 0)

    def test_future_prices_not_used_as_training(self):
        hourly, fine, prices, tariffs, now = fixture()
        prices = {t: v for t, v in prices.items() if int(t) < now}
        a = m.forecast(hourly, fine, prices, tariffs, now)
        # One published future quarter affects just that quarter, not the
        # inferred price for the rest of the month.
        prices[str(now)] = 101
        b = m.forecast(hourly, fine, prices, tariffs, now)
        self.assertAlmostEqual(b["cost_forecast"] - a["cost_forecast"], 100*.25*1.25)

    def test_tariff_change_only_affects_its_intervals(self):
        hourly, fine, prices, tariffs, now = fixture()
        first, _ = m.month_bounds(now, TZ)
        old = m.forecast(hourly, fine, prices, tariffs, now)
        tariffs.append({"start": now, "variable": 1.5, "vat": 25, "fixed": 100})
        new = m.forecast(hourly, fine, prices, tariffs, now)
        self.assertEqual(new["cost_so_far"], old["cost_so_far"])
        self.assertGreater(new["cost_remaining"], old["cost_remaining"])

    def test_stale_statistics_refused(self):
        hourly, fine, prices, tariffs, now = fixture()
        with self.assertRaisesRegex(ValueError, "three hours"):
            m.forecast(hourly, fine, prices, tariffs, now + 4*3600)

    def test_replay_and_json_roundtrip_identical(self):
        import json
        args = fixture()
        restored = json.loads(json.dumps(args))
        self.assertEqual(m.forecast(*args), m.forecast(*restored))

    def test_migration_to_empty_recorder_preserves_rolling_history(self):
        args = fixture()
        before = m.forecast(*args)
        m.merge_energy(args[0], [], 3600)
        m.merge_energy(args[1], [], 300)
        self.assertEqual(m.forecast(*args), before)

    def test_explicit_invalid_revision_invalidates_cached_interval(self):
        existing = {"0": 2, "3600": 1}
        m.merge_energy(existing, [{"start": 0, "change": -5}], 3600)
        self.assertEqual(existing, {"3600": 1})

    def test_raw_price_units_and_vat_once(self):
        response = {"currency": "SEK", "multiAreaEntries": [{"deliveryStart": "2026-11-01T00:00:00Z", "deliveryEnd": "2026-11-01T00:15:00Z", "entryPerArea": {"SE3": 1000}}]}
        values = m.parse_prices(response)
        self.assertEqual(len(values), 3)
        self.assertEqual(m.rate(next(iter(values.values())), {"variable": .5, "vat": 25}), 1.875)

    def test_recent_week_adapts_without_using_future_load(self):
        hourly, _, _, _, now = fixture()
        today = datetime.fromtimestamp(now, TZ).replace(hour=0)
        week_start = int((today - timedelta(days=7)).timestamp())
        for t in hourly:
            if week_start <= int(t) < today.timestamp():
                hourly[t] = 2
        profile = m.LoadProfile(hourly, now, TZ)
        self.assertGreater(profile.trend_factor, 1)
        # A changed future reading cannot influence a complete-day profile.
        old = profile.predict(now + 3600)
        hourly[str(now + 3600)] = 30
        self.assertEqual(m.LoadProfile(hourly, now, TZ).predict(now + 3600), old)


if __name__ == "__main__":
    unittest.main()
