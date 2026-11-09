"""Add one invoice view/resource through HA APIs, preserving existing content.

Run in HA container with SUPERVISOR_TOKEN passed from the environment.
"""
import asyncio
import copy
import json
import os
from pathlib import Path

import aiohttp

OUT = Path("/config/backups/elfaktura_20261109")
RESOURCE = "/local/elfaktura/elfaktura-card.js?v=20261109-1"
VIEW = {"title": "Fakturautfall", "path": "fakturautfall", "icon": "mdi:receipt-text-check-outline",
        "type": "panel", "cards": [{"type": "custom:elfaktura-card"}]}


async def main():
    async with aiohttp.ClientSession() as session:
        async with session.ws_connect("http://supervisor/core/websocket", max_msg_size=16*1024*1024) as ws:
            await ws.receive_json()
            await ws.send_json({"type": "auth", "access_token": os.environ["SUPERVISOR_TOKEN"]})
            assert (await ws.receive_json())["type"] == "auth_ok"
            async def call(mid, command, **kwargs):
                await ws.send_json({"id": mid, "type": command, **kwargs})
                while True:
                    result = await ws.receive_json()
                    if result.get("id") == mid:
                        assert result.get("success"), result
                        return result.get("result")
            original = await call(1, "lovelace/config", url_path="dashboard-elpris")
            resources = await call(2, "lovelace/resources")
            assert not any(v.get("path") == "fakturautfall" for v in original.get("views", [])), "Invoice view already exists; review instead of replacing"
            OUT.mkdir(exist_ok=True, mode=0o700)
            (OUT / "dashboard_api_before.json").write_text(json.dumps(original, ensure_ascii=False, indent=2))
            (OUT / "resources_api_before.json").write_text(json.dumps(resources, ensure_ascii=False, indent=2))
            existing = next((r for r in resources if r["url"].split("?")[0] == RESOURCE.split("?")[0]), None)
            if existing:
                assert existing["url"] == RESOURCE and existing["type"] == "module"
            else:
                await call(3, "lovelace/resources/create", url=RESOURCE, res_type="module")
            updated = copy.deepcopy(original)
            updated.setdefault("views", []).append(VIEW)
            await call(4, "lovelace/config/save", url_path="dashboard-elpris", config=updated)
            verified = await call(5, "lovelace/config", url_path="dashboard-elpris")
            assert verified == updated
            assert verified["views"][:-1] == original["views"]
            final_resources = await call(6, "lovelace/resources")
            assert all(item in final_resources for item in resources)
            (OUT / "dashboard_api_after.json").write_text(json.dumps(verified, ensure_ascii=False, indent=2))
            (OUT / "resources_api_after.json").write_text(json.dumps(final_resources, ensure_ascii=False, indent=2))
            print("PASS: Fakturautfall view and local card resource added; all previous views/resources preserved")


if __name__ == "__main__":
    asyncio.run(main())
