#!/usr/bin/env python3
"""Weekly MariaDB table optimization for Home Assistant recorder tables."""

from __future__ import annotations

import datetime as dt
import argparse
import pathlib
import sys
from urllib.parse import parse_qs, urlparse, unquote

import yaml


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
    print(line, flush=True)


def read_db_url() -> str:
    # Inspect only recorder.db_url; other HA tags (!include etc.) need not
    # be constructed, and commented/other integrations' db_url cannot match.
    def child(node: yaml.Node, key: str) -> yaml.Node:
        if not isinstance(node, yaml.MappingNode):
            raise ValueError("Expected YAML mapping")
        matches = [value for name, value in node.value if name.value == key]
        if len(matches) != 1:
            raise ValueError(f"Expected exactly one {key} setting")
        return matches[0]

    root = yaml.compose(CONFIG_PATH.read_text(encoding="utf-8"))
    node = child(child(root, "recorder"), "db_url")
    if not isinstance(node, yaml.ScalarNode):
        raise ValueError("recorder.db_url must be a scalar")
    if node.tag == "!secret":
        secrets = yaml.safe_load(
            (CONFIG_PATH.parent / "secrets.yaml").read_text(encoding="utf-8")
        )
        value = secrets[node.value]
    elif node.tag == "tag:yaml.org,2002:str":
        value = node.value
    else:
        raise ValueError("Unsupported recorder.db_url YAML tag")
    if not isinstance(value, str) or not value:
        raise ValueError("recorder.db_url must resolve to a nonempty string")
    return value


def parse_mysql_conn(db_url: str) -> dict:
    parsed = urlparse(db_url)
    if parsed.scheme not in ("mysql", "mysql+pymysql", "mysql+mysqldb"):
        raise RuntimeError(f"Unsupported db_url scheme: {parsed.scheme}")

    query = parse_qs(parsed.query or "")
    charset = (query.get("charset") or ["utf8mb4"])[0]

    return {
        "host": parsed.hostname or "core-mariadb",
        "port": parsed.port or 3306,
        "user": unquote(parsed.username or ""),
        "passwd": unquote(parsed.password or ""),
        "db": unquote((parsed.path or "/homeassistant").lstrip("/")),
        "charset": charset,
        "autocommit": True,
        "connect_timeout": 15,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check config and connection without optimizing")
    args = parser.parse_args()
    try:
        db_url = read_db_url()
        conn_args = parse_mysql_conn(db_url)
    except Exception as err:
        log(f"ERROR: OPTIMIZE failed: configuration ({type(err).__name__})")
        return 1

    try:
        import MySQLdb
        conn = MySQLdb.connect(**conn_args)
    except Exception as err:
        log(f"ERROR: OPTIMIZE failed: database connection ({type(err).__name__})")
        return 1

    try:
        with conn.cursor() as cur:
            if args.check:
                cur.execute("SELECT DATABASE(), VERSION()")
                db, version = cur.fetchone()
                log(f"CHECK OK: recorder connection to '{db}', MariaDB {version}; no tables changed.")
                return 0
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
                    if row[2] == "error":
                        raise RuntimeError(f"OPTIMIZE returned an error for {table}")

            cur.execute("SELECT RELEASE_LOCK(%s)", (LOCK_NAME,))
            log("Done: OPTIMIZE completed.")
        return 0
    except Exception as err:
        log(f"ERROR: OPTIMIZE failed: table maintenance ({type(err).__name__})")
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
