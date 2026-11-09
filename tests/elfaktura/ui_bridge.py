"""JSON bridge used only by DOM tests, with a caller-supplied temporary DB."""
import importlib.util
import json
from pathlib import Path
import sys

spec = importlib.util.spec_from_file_location("invoice_store", Path(__file__).parents[2] / "custom_components/elfaktura/store.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
request = json.load(sys.stdin)
store = m.InvoiceStore(sys.argv[1])
store.initialize()
data = request["data"]
try:
    match request["command"]:
        case "list": result = store.list(data.get("include_archived", False))
        case "get": result = store.get(data["invoice_id"])
        case "save": result = store.save(data["invoice"], "ui-test-user", data["request_id"], data.get("invoice_id"), data.get("expected_revision"), data.get("reason", ""))
        case "archive": result = store.archive(data["invoice_id"], data["expected_revision"], "ui-test-user", data["request_id"], data["reason"])
        case "export": result = store.export(data["format"])
        case _: raise ValueError("Unknown test command")
    print(json.dumps({"result": result}))
except m.InvoiceError as err:
    print(json.dumps({"error": {"code": err.code, "message": str(err)}}))
