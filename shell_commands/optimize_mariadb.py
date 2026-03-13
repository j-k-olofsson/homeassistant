#!/usr/bin/env python3
"""Weekly MariaDB table optimization for Home Assistant recorder tables."""

from __future__ import annotations

import datetime as dt
import pathlib
import re
import sys
from urllib.parse import parse_qs, urlparse

import MySQLdb


CONFIG_PATH = pathlib.Path("/config/configuration.yaml")
LOG_PATH = pathlib.Path("/config/log/db_optimize.log")
LOCK_NAME = "ha_db_optimize_tables_lock"
LOCK_WAIT_SECONDS = 0
TABLES = (
    "states",
    "state_attributes",
    "statistics_short_term",
    "statistics",
)


def log(msg: str) -> None:
    ts = dt.datetime.now(dt.UTC).strftime("%Y-%m-%d %H:%M:%S UTC")
    line = f"[{ts}] {msg}"
    print(line)


def read_db_url() -> str:
    text = CONFIG_PATH.read_text(encoding="utf-8")
    match = re.search(r"^\s*db_url:\s*(\S+)\s*$", text, flags=re.MULTILINE)
    if not match:
        raise RuntimeError("Could not find recorder db_url in configuration.yaml")
    return match.group(1).strip().strip("'\"")


def parse_mysql_conn(db_url: str) -> dict:
    parsed = urlparse(db_url)
    if parsed.scheme not in ("mysql", "mysql+pymysql", "mysql+mysqldb"):
        raise RuntimeError(f"Unsupported db_url scheme: {parsed.scheme}")

    query = parse_qs(parsed.query or "")
    charset = (query.get("charset") or ["utf8mb4"])[0]

    return {
        "host": parsed.hostname or "core-mariadb",
        "port": parsed.port or 3306,
        "user": parsed.username or "",
        "passwd": parsed.password or "",
        "db": (parsed.path or "/homeassistant").lstrip("/") or "homeassistant",
        "charset": charset,
        "autocommit": True,
    }


def main() -> int:
    try:
        db_url = read_db_url()
        conn_args = parse_mysql_conn(db_url)
    except Exception as err:  # pragma: no cover
        log(f"ERROR: {err}")
        return 1

    try:
        conn = MySQLdb.connect(**conn_args)
    except Exception as err:
        log(f"ERROR: Could not connect to MariaDB: {err}")
        return 1

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT GET_LOCK(%s, %s)", (LOCK_NAME, LOCK_WAIT_SECONDS))
            lock_row = cur.fetchone()
            if not lock_row or lock_row[0] != 1:
                log("SKIP: Another optimize job is already running.")
                return 0

            log(f"Start OPTIMIZE on database '{conn_args['db']}'")
            for table in TABLES:
                sql = f"OPTIMIZE TABLE `{table}`"
                log(f"Running: {sql}")
                cur.execute(sql)
                rows = cur.fetchall()
                for row in rows:
                    # row format: (Table, Op, Msg_type, Msg_text)
                    log(f"Result {table}: {row}")

            cur.execute("SELECT RELEASE_LOCK(%s)", (LOCK_NAME,))
            log("Done: OPTIMIZE completed.")
        return 0
    except Exception as err:
        log(f"ERROR: OPTIMIZE failed: {err}")
        return 1
    finally:
        try:
            conn.close()
        except Exception:
            pass


if __name__ == "__main__":
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    # Keep stdout/stderr for shell redirection in shell_command.
    sys.exit(main())
