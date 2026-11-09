"""Versioned invoice ledger in its own SQLite database, independent of recorder.

Money uses integer öre, energy integer Wh. Each mutation and its audit record
commit together. Optimistic revisions and request IDs protect concurrent edits
and retries. An atomically replaced SQLite backup is made after each commit.
"""
from __future__ import annotations

import csv
from contextlib import closing, contextmanager
from datetime import UTC, date, datetime
import hashlib
import io
import json
import logging
import os
from pathlib import Path
import sqlite3
from threading import RLock
from uuid import UUID, uuid4

LOGGER = logging.getLogger(__name__)
ITEMS = {
    "energy": "Elenergi / spotkostnad",
    "markup": "Rörliga påslag",
    "trade_fixed": "Fast avgift elhandel",
    "transmission": "Överföringsavgift",
    "energy_tax": "Energiskatt",
    "network_fixed": "Fast avgift elnät",
    "power": "Effektavgift",
    "other": "Övriga poster",
    "discount": "Rabatt / korrigering",
}
KINDS = {"trade": "Elhandel", "network": "Elnät", "combined": "Samlingsfaktura"}


class InvoiceError(ValueError):
    def __init__(self, code, message):
        super().__init__(message)
        self.code = code


def fail(message, code="invalid_invoice"):
    raise InvoiceError(code, message)


def text(value, name, maximum=200, required=True):
    if not isinstance(value, str):
        fail(f"{name} måste vara text.")
    value = value.strip()
    if (required and not value) or len(value) > maximum:
        fail(f"Kontrollera {name.lower()} (högst {maximum} tecken).")
    if any(ord(c) < 32 and c not in "\n\t" for c in value):
        fail(f"Ogiltiga tecken i {name.lower()}.")
    return value


def integer(value, name, nullable=False):
    if value is None and nullable:
        return None
    if type(value) is not int or abs(value) > 100_000_000_000:
        fail(f"Kontrollera {name.lower()}.")
    return value


def day(value, name):
    try:
        result = date.fromisoformat(value)
        if not 2000 <= result.year <= 2100 or result.isoformat() != value:
            raise ValueError
    except (ValueError, TypeError):
        fail(f"Kontrollera {name.lower()}.")
    return value


def identity(value, name):
    try:
        return str(UUID(value))
    except (ValueError, TypeError, AttributeError):
        fail(f"Ogiltigt {name}.")


def normalize(data):
    if not isinstance(data, dict):
        fail("Fakturan saknar uppgifter.")
    expected = {"supplier", "invoice_number", "invoice_kind", "document_type", "issue_date",
                "period_start", "period_end", "energy_wh", "total_cents", "vat_cents",
                "non_period_cents", "line_basis", "details_complete", "items", "notes"}
    if set(data) - expected:
        fail("Formuläret innehåller okända fält. Uppdatera sidan.")
    result = {
        "supplier": text(data.get("supplier"), "Leverantör", 100),
        "invoice_number": text(data.get("invoice_number"), "Fakturanummer", 100),
        "invoice_kind": data.get("invoice_kind"),
        "document_type": data.get("document_type", "invoice"),
        "issue_date": day(data.get("issue_date"), "Fakturadatum"),
        "period_start": day(data.get("period_start"), "Periodens startdatum"),
        "period_end": day(data.get("period_end"), "Periodens slutdatum"),
        "energy_wh": integer(data.get("energy_wh"), "Förbrukning", nullable=True),
        "total_cents": integer(data.get("total_cents"), "Fakturans totalbelopp"),
        "vat_cents": integer(data.get("vat_cents"), "Moms", nullable=True),
        "non_period_cents": integer(data.get("non_period_cents", 0), "Belopp utanför periodens elkostnad"),
        "line_basis": data.get("line_basis", "ex_vat"),
        "details_complete": data.get("details_complete", False),
        "notes": text(data.get("notes", ""), "Anteckning", 2000, required=False),
        "items": {},
    }
    if not isinstance(result["invoice_kind"], str) or result["invoice_kind"] not in KINDS:
        fail("Välj elhandel, elnät eller samlingsfaktura.")
    if result["document_type"] not in ("invoice", "credit"):
        fail("Välj faktura eller kreditfaktura.")
    if result["period_end"] < result["period_start"]:
        fail("Periodens slutdatum får inte vara före startdatumet.")
    if result["line_basis"] not in ("ex_vat", "incl_vat"):
        fail("Ange om detaljposterna är exklusive eller inklusive moms.")
    if type(result["details_complete"]) is not bool:
        fail("Kontrollera om detaljposterna är kompletta.")
    sign = -1 if result["document_type"] == "credit" else 1
    for key in ("total_cents", "energy_wh", "vat_cents"):
        value = result[key]
        if value is not None and value * sign < 0:
            fail("Kreditfakturor anges med negativa belopp och eventuell negativ förbrukning; vanliga fakturor med positiva.")
    if result["vat_cents"] is not None and abs(result["vat_cents"]) > abs(result["total_cents"]):
        fail("Momsbeloppet kan inte överstiga totalbeloppet.")
    lines = data.get("items", {})
    if not isinstance(lines, dict) or set(lines) - set(ITEMS):
        fail("Kontrollera fakturans detaljposter.")
    result["items"] = {k: integer(v, ITEMS[k]) for k, v in lines.items() if v is not None}
    if result["details_complete"]:
        if result["line_basis"] == "ex_vat" and result["vat_cents"] is None:
            fail("Ange momsbeloppet när kompletta detaljposter är exklusive moms.")
        total = sum(result["items"].values())
        if result["line_basis"] == "ex_vat":
            total += result["vat_cents"]
        if total != result["total_cents"]:
            fail("Detaljposternas summa, inklusive moms, stämmer inte med fakturans totalbelopp.", "total_mismatch")
    return result


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def kronor(cents):
    return ("-" if cents < 0 else "") + f"{abs(cents)//100},{abs(cents)%100:02d}"


class InvoiceStore:
    def __init__(self, path):
        self.path = Path(path)
        self.backup_path = self.path.with_name("elfaktura.backup.sqlite3")
        self.lock = RLock()
        self.backup_ok = True

    @contextmanager
    def connect(self):
        connection = sqlite3.connect(self.path, timeout=15)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys=ON")
        connection.execute("PRAGMA synchronous=FULL")
        try:
            with connection:
                yield connection
        finally:
            connection.close()

    def initialize(self):
        with self.lock:
            self.path.parent.mkdir(parents=True, exist_ok=True)
            with self.connect() as conn:
                if conn.execute("PRAGMA quick_check").fetchone()[0] != "ok":
                    raise RuntimeError("Invoice database integrity check failed; preserve database and restore a verified copy")
                version = conn.execute("PRAGMA user_version").fetchone()[0]
                if version not in (0, 1):
                    raise RuntimeError("Unsupported invoice database schema")
                conn.executescript("""
                    CREATE TABLE IF NOT EXISTS invoices (
                        id TEXT PRIMARY KEY, supplier_key TEXT NOT NULL,
                        invoice_number TEXT NOT NULL, revision INTEGER NOT NULL,
                        status TEXT NOT NULL CHECK(status IN ('active','archived')),
                        created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
                        payload TEXT NOT NULL,
                        UNIQUE(supplier_key, invoice_number)
                    );
                    CREATE TABLE IF NOT EXISTS revisions (
                        invoice_id TEXT NOT NULL REFERENCES invoices(id),
                        revision INTEGER NOT NULL, action TEXT NOT NULL,
                        at TEXT NOT NULL, user_id TEXT NOT NULL,
                        reason TEXT NOT NULL, payload TEXT NOT NULL,
                        PRIMARY KEY(invoice_id,revision)
                    );
                    CREATE TABLE IF NOT EXISTS requests (
                        request_id TEXT PRIMARY KEY, fingerprint TEXT NOT NULL,
                        response TEXT NOT NULL
                    );
                    PRAGMA user_version=1;
                """)
            os.chmod(self.path, 0o600)
            self._backup()

    def _backup(self):
        temporary = self.backup_path.with_suffix(".tmp")
        try:
            temporary.unlink(missing_ok=True)
            with self.connect() as source, closing(sqlite3.connect(temporary)) as target:
                source.backup(target)
            os.chmod(temporary, 0o600)
            os.replace(temporary, self.backup_path)
            self.backup_ok = True
        except (sqlite3.Error, OSError):
            self.backup_ok = False
            LOGGER.exception("Invoice committed but extra SQLite backup could not be updated")
            try:
                temporary.unlink(missing_ok=True)
            except OSError:
                pass

    @staticmethod
    def record(row):
        payload = json.loads(row["payload"])
        return {**payload, "id": row["id"], "revision": row["revision"], "status": row["status"],
                "created_at": row["created_at"], "updated_at": row["updated_at"],
                "comparison_total_cents": payload["total_cents"] - payload["non_period_cents"]}

    def list(self, include_archived=False):
        with self.lock, self.connect() as conn:
            rows = conn.execute("SELECT * FROM invoices" + ("" if include_archived else " WHERE status='active'")).fetchall()
            records = sorted((self.record(row) for row in rows), key=lambda r: (r["period_start"], r["issue_date"], r["invoice_number"]), reverse=True)
            return {"invoices": records, "backup_ok": self.backup_ok, "schema_version": 1}

    def get(self, invoice_id):
        invoice_id = identity(invoice_id, "faktura-ID")
        with self.lock, self.connect() as conn:
            row = conn.execute("SELECT * FROM invoices WHERE id=?", (invoice_id,)).fetchone()
            if row is None:
                fail("Fakturan finns inte.", "not_found")
            history = [dict(r) for r in conn.execute(
                "SELECT revision,action,at,reason,payload FROM revisions WHERE invoice_id=? ORDER BY revision DESC", (invoice_id,)
            )]
            for entry in history:
                entry["invoice"] = json.loads(entry.pop("payload"))
            return {"invoice": self.record(row), "history": history, "backup_ok": self.backup_ok}

    def _mutation(self, action, data, actor, request_id, invoice_id=None, expected_revision=None, reason=""):
        request_id = identity(request_id, "begärans-ID")
        payload = normalize(data) if action == "save" else None
        if invoice_id is not None:
            invoice_id = identity(invoice_id, "faktura-ID")
            if type(expected_revision) is not int or expected_revision < 1:
                fail("Läs in fakturan igen innan den ändras.", "conflict")
            reason = text(reason, "Ändringsorsak", 500)
        elif action != "save":
            fail("Ange fakturan som ska arkiveras.")
        fingerprint = hashlib.sha256(canonical({"action": action, "data": payload, "id": invoice_id,
                                               "expected_revision": expected_revision, "reason": reason}).encode()).hexdigest()
        with self.lock, self.connect() as conn:
            conn.execute("BEGIN IMMEDIATE")
            replay = conn.execute("SELECT * FROM requests WHERE request_id=?", (request_id,)).fetchone()
            if replay:
                if replay["fingerprint"] != fingerprint:
                    fail("Begäran har ändrats. Läs in formuläret igen.", "conflict")
                return {"invoice": json.loads(replay["response"]), "replayed": True, "backup_ok": self.backup_ok}
            at = datetime.now(UTC).isoformat()
            if invoice_id:
                row = conn.execute("SELECT * FROM invoices WHERE id=?", (invoice_id,)).fetchone()
                if row is None:
                    fail("Fakturan finns inte.", "not_found")
                if row["revision"] != expected_revision:
                    fail("Fakturan har ändrats i en annan session. Läs in den igen innan du sparar.", "conflict")
                revision, created_at = row["revision"] + 1, row["created_at"]
                if action == "archive":
                    if row["status"] == "archived":
                        fail("Fakturan är redan arkiverad.")
                    payload = json.loads(row["payload"])
            else:
                invoice_id, revision, created_at = str(uuid4()), 1, at
            status = "archived" if action == "archive" else "active"
            try:
                conn.execute("""INSERT INTO invoices VALUES(?,?,?,?,?,?,?,?)
                    ON CONFLICT(id) DO UPDATE SET supplier_key=excluded.supplier_key,
                    invoice_number=excluded.invoice_number, revision=excluded.revision,
                    status=excluded.status, updated_at=excluded.updated_at,payload=excluded.payload""",
                    (invoice_id, payload["supplier"].casefold(), payload["invoice_number"].casefold(),
                     revision, status, created_at, at, canonical(payload)))
            except sqlite3.IntegrityError:
                fail("Det fakturanumret finns redan för leverantören. Öppna och rätta den befintliga posten.", "duplicate_invoice")
            conn.execute("INSERT INTO revisions VALUES(?,?,?,?,?,?,?)",
                         (invoice_id, revision, action, at, actor, reason or "Registrerad", canonical(payload)))
            invoice = {**payload, "id": invoice_id, "revision": revision, "status": status,
                       "created_at": created_at, "updated_at": at,
                       "comparison_total_cents": payload["total_cents"] - payload["non_period_cents"]}
            conn.execute("INSERT INTO requests VALUES(?,?,?)", (request_id, fingerprint, canonical(invoice)))
            conn.commit()
            self._backup()
            return {"invoice": invoice, "replayed": False, "backup_ok": self.backup_ok}

    def save(self, data, actor, request_id, invoice_id=None, expected_revision=None, reason=""):
        return self._mutation("save", data, actor, request_id, invoice_id, expected_revision, reason)

    def archive(self, invoice_id, expected_revision, actor, request_id, reason):
        return self._mutation("archive", None, actor, request_id, invoice_id, expected_revision, reason)

    def export(self, format):
        if format not in ("json", "csv"):
            fail("Välj JSON eller CSV.")
        with self.lock, self.connect() as conn:
            if format == "json":
                revisions = [dict(row) for row in conn.execute("SELECT * FROM revisions ORDER BY at,invoice_id,revision")]
                for entry in revisions:
                    entry["invoice"] = json.loads(entry.pop("payload"))
                content = json.dumps({"schema_version": 1, "currency": "SEK", "money_unit": "ore", "energy_unit": "Wh",
                                      "invoices": self.list(True)["invoices"], "revisions": revisions}, ensure_ascii=False, indent=2)
                return {"filename": "elfakturor.json", "content": content, "mime": "application/json"}
            output = io.StringIO()
            fields = ["leverantor", "fakturanummer", "typ", "dokument", "period_fran", "period_till", "fakturadatum",
                      "kwh", "total_inkl_moms_kr", "moms_kr", "utanfor_perioden_kr", "jamforelsebelopp_kr",
                      "posternas_momsbas", "detaljer_kompletta", "status", "revision", "anteckning"] + list(ITEMS)
            writer = csv.DictWriter(output, fields, delimiter=";")
            writer.writeheader()
            def safe(value):
                value = str(value)
                return "'" + value if value.startswith(("=", "+", "-", "@", "\t", "\r")) else value
            for r in self.list(True)["invoices"]:
                writer.writerow({
                    "leverantor": safe(r["supplier"]), "fakturanummer": safe(r["invoice_number"]), "typ": KINDS[r["invoice_kind"]],
                    "dokument": r["document_type"], "period_fran": r["period_start"], "period_till": r["period_end"],
                    "fakturadatum": r["issue_date"], "kwh": "" if r["energy_wh"] is None else str(r["energy_wh"]/1000).replace(".", ","),
                    "total_inkl_moms_kr": kronor(r["total_cents"]), "moms_kr": "" if r["vat_cents"] is None else kronor(r["vat_cents"]),
                    "utanfor_perioden_kr": kronor(r["non_period_cents"]), "jamforelsebelopp_kr": kronor(r["comparison_total_cents"]),
                    "posternas_momsbas": r["line_basis"], "detaljer_kompletta": r["details_complete"], "status": r["status"],
                    "revision": r["revision"], "anteckning": safe(r["notes"]),
                    **{k: kronor(r["items"][k]) if k in r["items"] else "" for k in ITEMS},
                })
            return {"filename": "elfakturor.csv", "content": "\ufeff" + output.getvalue(), "mime": "text/csv;charset=utf-8"}
