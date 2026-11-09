"""Pure forecast calculations. All intervals are UTC epochs; calendars are local.

No SQL, HA imports, network access or hidden zero substitution. Missing history
is estimated explicitly. Historical tariff assumptions are reported separately.
"""
from __future__ import annotations

from collections import defaultdict
from datetime import datetime, timedelta
from math import exp, isfinite
from statistics import mean
from zoneinfo import ZoneInfo


def number(value):
    try:
        value = float(value)
        return value if isfinite(value) else None
    except (TypeError, ValueError):
        return None


def epoch(value):
    if isinstance(value, str):
        return int(datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp())
    value = float(value)
    return int(value / 1000 if value > 1e11 else value)


def month_bounds(now, tz):
    local = datetime.fromtimestamp(now, tz)
    first = local.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    following = (first.replace(day=28) + timedelta(days=4)).replace(day=1)
    return int(first.timestamp()), int(following.timestamp())


def parse_prices(response, area="SE3"):
    """Nord Pool's documented service response is SEK/MWh, excluding VAT."""
    if response.get("currency") != "SEK":
        raise ValueError("Expected SEK prices")
    result = {}
    for row in response.get("multiAreaEntries", []):
        value = number(row.get("entryPerArea", {}).get(area))
        start, end = epoch(row["deliveryStart"]), epoch(row["deliveryEnd"])
        if value is None or end <= start or (end - start) % 300:
            continue
        for stamp in range(start, end, 300):
            result[str(stamp)] = value / 1000
    return result


def energy_rows(rows, seconds):
    """Reject non-finite, negative and implausible increments, retain real zeros.

    A gap followed by a cumulative catch-up must not become a single hour's load.
    The delta at the first row is provided with its baseline by HA's statistics API.
    """
    result = {}
    previous = None
    for row in sorted(rows, key=lambda x: x["start"]):
        stamp = epoch(row["start"])
        value = number(row.get("change"))
        contiguous = previous is None or stamp - previous == seconds
        if value is not None and 0 <= value <= 40 * seconds / 3600 and contiguous:
            result[str(stamp)] = value
        previous = stamp
    return result


def merge_energy(existing, rows, seconds):
    """Upsert observed intervals; an empty/new recorder cannot erase the cache.

    Explicit invalid observations can invalidate an old interval. Absence after
    recorder purging, migration or a temporary outage cannot do so.
    """
    values = energy_rows(rows, seconds)
    for row in rows:
        stamp = str(epoch(row["start"]))
        if stamp not in values:
            existing.pop(stamp, None)
    existing.update(values)


class LoadProfile:
    """30 complete local days; recent days have a 14-day exponential time scale."""

    def __init__(self, hourly, cutoff, tz):
        self.tz = tz
        today = datetime.fromtimestamp(cutoff, tz).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        start = today - timedelta(days=30)
        by_day = defaultdict(list)
        for key, value in hourly.items():
            stamp = int(key)
            if start.timestamp() <= stamp < today.timestamp():
                local = datetime.fromtimestamp(stamp, tz)
                by_day[local.date()].append((stamp, value))
        self.days = []
        self.samples = []
        self.predictions = {}
        for day, values in sorted(by_day.items()):
            midnight = datetime.combine(day, datetime.min.time(), tz)
            expected = int(((midnight + timedelta(days=1)).timestamp() - midnight.timestamp()) / 3600)
            if len(values) != expected:
                continue
            age = (today.date() - day).days
            self.days.append((day, sum(v for _, v in values)))
            for stamp, value in values:
                local = datetime.fromtimestamp(stamp, tz)
                self.samples.append((local.weekday(), local.hour, exp(-age / 14), value))
        if len(self.days) < 7:
            raise ValueError(f"Only {len(self.days)} complete days; need at least 7")
        self.daily_mean = mean(v for _, v in self.days)
        # Retain the 30-day weekday/hour pattern while adapting its level to
        # the most recent complete week (e.g. pool/season changes).
        recent = {d for d, _ in self.days if (today.date() - d).days <= 7}
        recent_rows = [(int(t), v) for t, v in hourly.items()
                       if datetime.fromtimestamp(int(t), tz).date() in recent]
        predicted = sum(self.predict(t, "weighted") for t, _ in recent_rows)
        actual = sum(v for _, v in recent_rows)
        self.trend_factor = max(0.5, min(2.0, actual / predicted)) if len(recent) >= 5 and predicted > 0 else 1.0

    def predict(self, stamp, method="adaptive"):
        if method == "simple":
            return self.daily_mean / 24
        if method == "adaptive":
            return self.predict(stamp, "weighted") * self.trend_factor
        local = datetime.fromtimestamp(stamp, self.tz)
        key = (local.weekday(), local.hour)
        if key in self.predictions:
            return self.predictions[key]
        candidates = [s for s in self.samples if s[1] == local.hour]
        exact = [s for s in candidates if s[0] == local.weekday()]
        workday = [s for s in candidates if (s[0] < 5) == (local.weekday() < 5)]
        selected = exact if len(exact) >= 3 else workday or candidates
        value = sum(s[2] * s[3] for s in selected) / sum(s[2] for s in selected)
        self.predictions[key] = value
        return value


def tariff_at(tariffs, stamp):
    eligible = [t for t in tariffs if t["start"] <= stamp]
    return max(eligible, key=lambda t: t["start"]) if eligible else min(tariffs, key=lambda t: t["start"])


def rate(spot, tariff):
    return (spot + tariff["variable"]) * (1 + tariff["vat"] / 100)


def forecast(hourly, fine, prices, tariffs, now, timezone="Europe/Stockholm"):
    tz = ZoneInfo(timezone)
    if not hourly or not tariffs:
        raise ValueError("Energy statistics or tariff missing")
    cutoff = min(int(now // 3600 * 3600), max(int(t) for t in hourly) + 3600)
    if now - cutoff > 3 * 3600:
        raise ValueError("Energy statistics more than three hours old")
    first, following = month_bounds(now, tz)
    if cutoff < first:
        raise ValueError("Waiting for statistics through the start of this month")
    profile = LoadProfile(hourly, cutoff, tz)
    current = tariff_at(tariffs, now)
    # Use only prices for elapsed intervals for unknown future prices.
    # Published tomorrow prices are used as known prices, never as training data.
    train_start = cutoff - 30 * 86400
    price_samples = defaultdict(list)
    all_spots = []
    for key, spot in prices.items():
        stamp = int(key)
        if train_start <= stamp < cutoff:
            local = datetime.fromtimestamp(stamp, tz)
            weight = exp(-(cutoff - stamp) / 86400 / 14)
            price_samples[local.hour].append((weight, spot))
            all_spots.append((weight, spot))
    if not all_spots:
        raise ValueError("No historical spot prices")

    def estimated_spot(stamp):
        selected = price_samples.get(datetime.fromtimestamp(stamp, tz).hour) or all_spots
        return sum(w * p for w, p in selected) / sum(w for w, _ in selected)

    actual_energy = actual_cost = estimated_energy = fine_energy = missing_price_energy = 0.0
    historical_tariff_energy = 0.0
    observed_hours = 0
    for hour in range(first, cutoff, 3600):
        measured = hourly.get(str(hour))
        if measured is None:
            measured = profile.predict(hour)
            estimated_energy += measured
        else:
            observed_hours += 1
        actual_energy += measured
        fine_values = [fine.get(str(t)) for t in range(hour, hour + 3600, 300)]
        # Require agreement with the authoritative hourly total before using
        # fine allocation; never silently add two representations of the energy.
        use_fine = all(v is not None for v in fine_values) and abs(sum(fine_values) - measured) < max(0.05, measured * 0.02)
        if use_fine:
            fine_energy += measured
        for index, stamp in enumerate(range(hour, hour + 3600, 300)):
            kwh = fine_values[index] if use_fine else measured / 12
            spot = prices.get(str(stamp))
            if spot is None:
                spot = estimated_spot(stamp)
                missing_price_energy += kwh
            tariff = tariff_at(tariffs, stamp)
            if stamp < tariffs[0]["start"]:
                historical_tariff_energy += kwh
            actual_cost += kwh * rate(spot, tariff)

    remaining_energy = remaining_cost = simple_energy = simple_cost = known_energy = 0.0
    # Scenarios combine +/-15% future consumption and +/-30% unknown raw spot.
    # They are illustrative scenarios, not confidence intervals.
    low_cost = high_cost = 0.0
    for stamp in range(cutoff, following, 900):
        kwh = profile.predict(stamp) / 4
        simple_kwh = profile.predict(stamp, "simple") / 4
        spot = prices.get(str(stamp))
        known = spot is not None
        if not known:
            spot = estimated_spot(stamp)
        else:
            known_energy += kwh
        price = rate(spot, current)
        remaining_energy += kwh
        remaining_cost += kwh * price
        simple_energy += simple_kwh
        simple_cost += simple_kwh * price
        spread = 0 if known else max(abs(spot) * 0.30, 0.10)
        variants = [kwh * load * rate(spot + price_shift, current)
                    for load in (0.85, 1.15) for price_shift in (-spread, spread)]
        low_cost += min(variants)
        high_cost += max(variants)
    total_hours = (cutoff - first) / 3600
    total_cost = actual_cost + remaining_cost + current["fixed"]
    return {
        "cost_forecast": round(total_cost, 2),
        "energy_forecast": round(actual_energy + remaining_energy, 2),
        "cost_so_far": round(actual_cost, 2),
        "energy_so_far": round(actual_energy, 2),
        "cost_remaining": round(remaining_cost, 2),
        "energy_remaining": round(remaining_energy, 2),
        "simple_cost_forecast": round(actual_cost + simple_cost + current["fixed"], 2),
        "simple_energy_forecast": round(actual_energy + simple_energy, 2),
        "scenario_low": round(actual_cost + low_cost + current["fixed"], 2),
        "scenario_high": round(actual_cost + high_cost + current["fixed"], 2),
        "coverage": round(100 * observed_hours / total_hours, 2) if total_hours else 100,
        "fine_energy_percent": round(100 * fine_energy / actual_energy, 2) if actual_energy else 100,
        "estimated_energy": round(estimated_energy, 3),
        "missing_price_energy": round(missing_price_energy, 3),
        "historical_tariff_energy": round(historical_tariff_energy, 3),
        "known_future_price_percent": round(100 * known_energy / remaining_energy, 2) if remaining_energy else 100,
        "daily_mean_30d": round(profile.daily_mean, 3),
        "recent_week_factor": round(profile.trend_factor, 4),
        "complete_days": len(profile.days),
        "fixed_fee": current["fixed"],
        "variable_fee_ex_vat": current["variable"],
        "vat_percent": current["vat"],
        "calculated_at": datetime.fromtimestamp(now, tz).isoformat(),
        "measured_until": datetime.fromtimestamp(cutoff, tz).isoformat(),
        "month": datetime.fromtimestamp(now, tz).strftime("%Y-%m"),
        "model": "30 dygns veckodags-/timprofil, recency 14 dygn, nivå anpassad till senaste veckan",
        "price_assumption": "Publicerade spotpriser; annars viktad timprofil senaste 30 dygn",
        "cost_quality": "Beräknad kostnad; historiska avgifter antagna före installation; ingen effekttariff",
    }
