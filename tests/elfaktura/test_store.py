"""Accounting integrity tests on temporary SQLite files, never real invoices."""
import copy
from concurrent.futures import ThreadPoolExecutor
import importlib.util
import json
from pathlib import Path
import shutil
import sqlite3
import tempfile
import unittest
from unittest.mock import patch
from uuid import uuid4

spec = importlib.util.spec_from_file_location("invoice_store", Path(__file__).parents[2] / "custom_components/elfaktura/store.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


def invoice(**changes):
    return {"supplier": "Vattenfall", "invoice_number": "2026-001", "invoice_kind": "combined",
            "document_type": "invoice", "issue_date": "2026-11-03", "period_start": "2026-10-01",
            "period_end": "2026-10-31", "energy_wh": 1234567, "total_cents": 125000,
            "vat_cents": 25000, "non_period_cents": 0, "line_basis": "ex_vat",
            "details_complete": True, "items": {"energy": 70000, "network_fixed": 30000}, "notes": "", **changes}


class StoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.path = Path(self.tmp.name) / "invoice.sqlite3"
        self.store = m.InvoiceStore(self.path)
        self.store.initialize()

    def tearDown(self):
        self.tmp.cleanup()

    def save(self, data=None, **kwargs):
        return self.store.save(data or invoice(), "test-user", str(uuid4()), **kwargs)["invoice"]

    def test_roundtrip_exact_money_and_period(self):
        saved = self.save()
        self.assertEqual(self.store.get(saved["id"])["invoice"]["total_cents"], 125000)
        self.assertEqual(saved["energy_wh"], 1234567)
        self.assertEqual(saved["period_start"], "2026-10-01")
        self.assertEqual(saved["issue_date"], "2026-11-03")

    def test_partial_details_and_missing_energy_are_not_zero(self):
        saved = self.save(invoice(details_complete=False, energy_wh=None, vat_cents=None, items={}))
        self.assertIsNone(saved["energy_wh"])
        self.assertIsNone(saved["vat_cents"])
        self.assertEqual(saved["items"], {})

    def test_no_double_vat_when_details_include_vat(self):
        saved = self.save(invoice(line_basis="incl_vat", items={"energy": 125000}))
        self.assertEqual(saved["total_cents"], 125000)

    def test_full_details_must_balance_to_ore(self):
        with self.assertRaisesRegex(m.InvoiceError, "stämmer inte"):
            self.save(invoice(total_cents=125001))
        self.assertEqual(self.store.list()["invoices"], [])

    def test_missing_vat_cannot_claim_complete_ex_vat_breakdown(self):
        with self.assertRaises(m.InvoiceError):
            self.save(invoice(vat_cents=None))

    def test_discount_line_and_credit_invoice(self):
        saved = self.save(invoice(total_cents=112500, vat_cents=22500,
                                  items={"energy": 100000, "discount": -10000}))
        credit = self.save(invoice(invoice_number="CREDIT-001", document_type="credit", total_cents=-12500,
                                   vat_cents=-2500, energy_wh=-100000, items={"energy": -10000}))
        self.assertEqual(credit["total_cents"], -12500)
        self.assertEqual(len(self.store.list()["invoices"]), 2)

    def test_invoice_sign_cannot_accidentally_be_negative(self):
        with self.assertRaises(m.InvoiceError):
            self.save(invoice(total_cents=-125000, details_complete=False))

    def test_duplicate_is_blocked_across_invoice_kinds(self):
        self.save()
        with self.assertRaisesRegex(m.InvoiceError, "finns redan"):
            self.save(invoice(invoice_kind="trade", supplier=" vattenfall "))

    def test_two_bills_retain_same_energy_without_summing_it(self):
        self.save(invoice(invoice_kind="trade"))
        self.save(invoice(invoice_kind="network", invoice_number="NETWORK-002"))
        self.assertEqual([r["energy_wh"] for r in self.store.list()["invoices"]], [1234567, 1234567])

    def test_correction_requires_reason_and_preserves_prior_revision(self):
        saved = self.save()
        with self.assertRaises(m.InvoiceError):
            self.save(invoice(notes="Rättelse"), invoice_id=saved["id"], expected_revision=1)
        changed = self.save(invoice(energy_wh=1200000), invoice_id=saved["id"], expected_revision=1, reason="Avläst på nytt")
        self.assertEqual(changed["revision"], 2)
        history = self.store.get(saved["id"])["history"]
        self.assertEqual(history[1]["invoice"]["energy_wh"], 1234567)
        self.assertEqual(history[0]["invoice"]["energy_wh"], 1200000)

    def test_stale_revision_cannot_overwrite(self):
        saved = self.save()
        self.save(invoice(notes="Första ändringen"), invoice_id=saved["id"], expected_revision=1, reason="Kontroll")
        with self.assertRaisesRegex(m.InvoiceError, "annan session"):
            self.save(invoice(notes="Gammalt formulär"), invoice_id=saved["id"], expected_revision=1, reason="Kontroll")
        self.assertEqual(self.store.get(saved["id"])["invoice"]["notes"], "Första ändringen")

    def test_concurrent_edits_only_one_wins(self):
        saved = self.save()
        def update(note):
            try:
                self.save(invoice(notes=note), invoice_id=saved["id"], expected_revision=1, reason="Samtidig ändring")
                return "saved"
            except m.InvoiceError as err:
                return err.code
        with ThreadPoolExecutor(max_workers=2) as executor:
            outcomes = list(executor.map(update, ["A", "B"]))
        self.assertEqual(sorted(outcomes), ["conflict", "saved"])

    def test_request_replay_does_not_duplicate_write(self):
        request_id = str(uuid4())
        a = self.store.save(invoice(), "test-user", request_id)
        b = self.store.save(invoice(), "test-user", request_id)
        self.assertTrue(b["replayed"])
        self.assertEqual(a["invoice"], b["invoice"])
        self.assertEqual(len(self.store.get(a["invoice"]["id"])["history"]), 1)

    def test_reused_request_with_changed_data_is_rejected(self):
        request_id = str(uuid4())
        self.store.save(invoice(), "test-user", request_id)
        with self.assertRaisesRegex(m.InvoiceError, "Begäran har ändrats"):
            self.store.save(invoice(notes="Nytt innehåll"), "test-user", request_id)

    def test_archive_and_restore_keep_audit(self):
        saved = self.save()
        self.store.archive(saved["id"], 1, "test-user", str(uuid4()), "Dubblett av annan faktura")
        self.assertEqual(self.store.list()["invoices"], [])
        self.assertEqual(len(self.store.list(True)["invoices"]), 1)
        restored = self.save(invoice(), invoice_id=saved["id"], expected_revision=2, reason="Arkiverades av misstag")
        self.assertEqual(restored["status"], "active")
        self.assertEqual(len(self.store.get(saved["id"])["history"]), 3)

    def test_other_period_amount_only_changes_comparison_total(self):
        saved = self.save(invoice(non_period_cents=5000))
        self.assertEqual(saved["total_cents"], 125000)
        self.assertEqual(saved["comparison_total_cents"], 120000)

    def test_database_reopen_and_backup_restore(self):
        saved = self.save()
        reopened = m.InvoiceStore(self.path)
        reopened.initialize()
        self.assertEqual(reopened.get(saved["id"])["invoice"], saved)
        restored_path = Path(self.tmp.name) / "restored" / "invoice.sqlite3"
        restored_path.parent.mkdir()
        shutil.copy2(self.store.backup_path, restored_path)
        restored = m.InvoiceStore(restored_path)
        restored.initialize()
        self.assertEqual(restored.get(saved["id"])["invoice"], saved)

    def test_backup_failure_does_not_lose_or_falsely_reject_committed_invoice(self):
        with patch.object(m.os, "replace", side_effect=OSError("Simulated backup error")), self.assertLogs(m.LOGGER, level="ERROR"):
            result = self.store.save(invoice(), "test-user", str(uuid4()))
        self.assertFalse(result["backup_ok"])
        self.assertEqual(len(self.store.list()["invoices"]), 1)
        self.assertEqual(self.store.get(result["invoice"]["id"])["invoice"]["total_cents"], 125000)

    def test_exports_preserve_revisions_and_are_spreadsheet_safe(self):
        saved = self.save(invoice(invoice_number="=1+1", notes="=HYPERLINK(1)"))
        json_data = json.loads(self.store.export("json")["content"])
        self.assertEqual(json_data["revisions"][0]["invoice"]["invoice_number"], "=1+1")
        csv = self.store.export("csv")["content"]
        self.assertIn("'=1+1", csv)
        self.assertIn("'=HYPERLINK(1)", csv)

    def test_bad_dates_unknown_fields_and_floating_money_rejected(self):
        for changes in [{"period_start": "2026-02-30"}, {"period_end": "2025-01-01"},
                        {"total_cents": 123.45}, {"total_cents": True}, {"total_cents": float("nan")},
                        {"unexpected": 1}, {"energy_wh": "123"}]:
            with self.subTest(changes=changes), self.assertRaises(m.InvoiceError):
                self.save(invoice(**changes))

    def test_identity_validation(self):
        with self.assertRaises(m.InvoiceError):
            self.store.get("../../somewhere")


if __name__ == "__main__":
    unittest.main()
