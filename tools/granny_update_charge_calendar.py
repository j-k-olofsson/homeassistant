#!/usr/bin/env python3
"""Utility to rewrite a local Home Assistant calendar with Granny's charge plan."""

from __future__ import annotations

import argparse
import json
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable, List, Tuple

try:
    from zoneinfo import ZoneInfo  # Python 3.9+
except Exception:  # pragma: no cover
    ZoneInfo = None  # type: ignore[assignment]


CONFIG_DIR = Path("/config")
STORAGE_DIR = CONFIG_DIR / ".storage"
DEFAULT_HEADER = [
    "BEGIN:VCALENDAR",
    "PRODID:-//homeassistant.io//local_calendar 1.0//EN",
    "VERSION:2.0",
]
DEFAULT_FOOTER = ["END:VCALENDAR"]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Update local calendar with AI plan")
    parser.add_argument("--calendar", required=True, help="Calendar entity_id")
    parser.add_argument("--window-start", required=True, help="ISO datetime (inclusive)")
    parser.add_argument("--window-end", required=True, help="ISO datetime (exclusive)")
    parser.add_argument("--plan", required=True, help="JSON payload from AI task")
    return parser.parse_args()


def get_calendar_path(entity_id: str) -> Path:
    if "." not in entity_id:
        raise ValueError(f"Unexpected calendar entity_id: {entity_id}")
    _, calendar_name = entity_id.split(".", 1)
    filename = f"local_calendar.{calendar_name}.ics"
    return STORAGE_DIR / filename


def read_calendar(path: Path) -> Tuple[List[str], List[List[str]], List[str]]:
    if not path.exists():
        return DEFAULT_HEADER.copy(), [], DEFAULT_FOOTER.copy()

    lines = path.read_text(encoding="utf-8").splitlines()
    header: List[str] = []
    footer: List[str] = []
    events: List[List[str]] = []
    buffer: List[str] = []
    in_event = False
    events_started = False

    for raw_line in lines:
        line = raw_line.rstrip()
        if line == "BEGIN:VEVENT":
            in_event = True
            events_started = True
            buffer = [line]
            continue
        if line == "END:VEVENT" and in_event:
            buffer.append(line)
            events.append(buffer)
            buffer = []
            in_event = False
            continue
        if in_event:
            buffer.append(line)
        else:
            if events_started:
                footer.append(line)
            else:
                header.append(line)

    if not header:
        header = DEFAULT_HEADER.copy()
    if not footer:
        footer = DEFAULT_FOOTER.copy()

    return header, events, footer


def parse_ics_datetime(line: str, local_tz) -> datetime | None:
    if ":" not in line:
        return None
    prefix, value = line.split(":", 1)
    value = value.strip()

    if not value:
        return None

    tz = local_tz

    if ";TZID=" in prefix:
        tz_name = prefix.split(";TZID=")[-1]
        if ZoneInfo is not None:
            try:
                tz = ZoneInfo(tz_name)
            except Exception:
                tz = local_tz

    if value.endswith("Z"):
        naive_fmt = "%Y%m%dT%H%M%SZ"
        dt = datetime.strptime(value, naive_fmt).replace(tzinfo=timezone.utc)
        return dt.astimezone(local_tz)

    fmt = "%Y%m%dT%H%M%S" if len(value) == 15 else "%Y%m%dT%H%M"
    dt = datetime.strptime(value, fmt).replace(tzinfo=tz)
    return dt.astimezone(local_tz)


def event_timerange(event: Iterable[str], local_tz) -> Tuple[datetime | None, datetime | None]:
    start_line = next((line for line in event if line.startswith("DTSTART")), None)
    end_line = next((line for line in event if line.startswith("DTEND")), None)
    start_dt = parse_ics_datetime(start_line, local_tz) if start_line else None
    end_dt = parse_ics_datetime(end_line, local_tz) if end_line else None
    return start_dt, end_dt


def should_keep_event(
    event: List[str], window_start: datetime, window_end: datetime, local_tz
) -> bool:
    start_dt, end_dt = event_timerange(event, local_tz)
    if start_dt is None or end_dt is None:
        return True
    # Keep events that do not overlap the cleanup window
    if end_dt <= window_start:
        return True
    if start_dt >= window_end:
        return True
    return False


def fold_line(text: str) -> List[str]:
    """Fold a long ICS line to 75 characters with continuation."""
    encoded = text.encode("utf-8")
    max_len = 75
    if len(encoded) <= max_len:
        return [text]

    lines: List[str] = []
    current = bytearray()
    for byte in encoded:
        current.append(byte)
        if len(current) >= max_len:
            lines.append(current.decode("utf-8"))
            current = bytearray(b" ")
    if len(current) > 0:
        lines.append(current.decode("utf-8"))
    return lines


def build_event_lines(
    slot: dict,
    local_tz,
    summary_text: str,
    plan_status: str,
    plan_summary: str,
) -> List[str]:
    start = datetime.fromisoformat(slot["start"])
    end = datetime.fromisoformat(slot["end"])
    if start.tzinfo is None:
        start = start.replace(tzinfo=local_tz)
    else:
        start = start.astimezone(local_tz)
    if end.tzinfo is None:
        end = end.replace(tzinfo=local_tz)
    else:
        end = end.astimezone(local_tz)

    dtstamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    start_str = start.strftime("%Y%m%dT%H%M%S")
    end_str = end.strftime("%Y%m%dT%H%M%S")

    energy = slot.get("energy_kwh")
    cost = slot.get("cost_sek")
    price = slot.get("price_sek_kwh")
    source = slot.get("source")

    description_parts = []
    if plan_summary:
        description_parts.append(plan_summary)
    if energy is not None:
        description_parts.append(f"Energi ≈ {float(energy):.2f} kWh")
    if cost is not None:
        description_parts.append(f"Kostnad ≈ {float(cost):.2f} SEK")
    if price is not None:
        description_parts.append(f"Pris ≈ {float(price):.3f} SEK/kWh")
    if source:
        description_parts.append(f"Källa: {source}")
    if plan_status:
        description_parts.append(f"Status: {plan_status}")

    description = " | ".join(description_parts)
    description = description.replace("\n", " ").strip()

    lines: List[str] = [
        "BEGIN:VEVENT",
        f"DTSTAMP:{dtstamp}",
        f"UID:{uuid.uuid4()}",
        f"DTSTART:{start_str}",
        f"DTEND:{end_str}",
        f"SUMMARY:{summary_text}",
        f"CREATED:{dtstamp}",
    ]

    if description:
        lines.extend(fold_line(f"DESCRIPTION:{description}"))

    lines.append("SEQUENCE:0")
    lines.append("END:VEVENT")
    return lines


def write_calendar(path: Path, header: List[str], events: List[List[str]], footer: List[str]) -> None:
    all_lines: List[str] = []
    all_lines.extend([line for line in header if line])
    for idx, event in enumerate(events):
        if idx > 0:
            all_lines.append("")
        all_lines.extend(event)
    if footer:
        all_lines.append("")
        all_lines.extend([line for line in footer if line])

    text = "\n".join(all_lines)
    if not text.endswith("\n"):
        text += "\n"
    path.write_text(text, encoding="utf-8")


def main() -> int:
    args = parse_args()
    local_tz = datetime.now().astimezone().tzinfo
    if local_tz is None:
        local_tz = timezone.utc

    window_start = datetime.fromisoformat(args.window_start)
    window_end = datetime.fromisoformat(args.window_end)
    if window_start.tzinfo is None:
        window_start = window_start.replace(tzinfo=local_tz)
    else:
        window_start = window_start.astimezone(local_tz)
    if window_end.tzinfo is None:
        window_end = window_end.replace(tzinfo=local_tz)
    else:
        window_end = window_end.astimezone(local_tz)

    try:
        plan = json.loads(args.plan)
    except json.JSONDecodeError as err:
        print(f"Invalid plan JSON: {err}", file=sys.stderr)
        return 2

    schedule: list = plan.get("schedule") or []
    plan_status: str = str(plan.get("status", ""))
    plan_summary: str = str(plan.get("summary", ""))

    calendar_path = get_calendar_path(args.calendar)
    calendar_path.parent.mkdir(parents=True, exist_ok=True)

    header, events, footer = read_calendar(calendar_path)
    kept_events = [
        event for event in events if should_keep_event(event, window_start, window_end, local_tz)
    ]

    new_events: List[List[str]] = []
    summary_text = "Bil-laddning (Granny-plan)"
    for slot in sorted(schedule, key=lambda item: item.get("start", "")):
        try:
            new_events.append(
                build_event_lines(slot, local_tz, summary_text, plan_status, plan_summary)
            )
        except Exception as err:  # pragma: no cover - defensive
            print(f"Skipping slot due to error: {err}", file=sys.stderr)

    final_events = kept_events + new_events
    final_events.sort(
        key=lambda block: (event_timerange(block, local_tz)[0] or datetime.max.replace(tzinfo=local_tz))
    )

    write_calendar(calendar_path, header, final_events, footer)

    print(
        f"Calendar {args.calendar} updated: removed {len(events) - len(kept_events)} "
        f"events, added {len(new_events)} events."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
