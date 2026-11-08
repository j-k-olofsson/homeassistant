"""Integration-style tests using a real HTTP stream, without touching containers.

Run with pytest. PORTAINER_SLOW_TEST=1 adds a 65-second regression test.
"""

import asyncio
import base64
from datetime import timedelta
import importlib.util
import json
import os
from pathlib import Path

from aiohttp import ClientSession, ClientTimeout, web
from pyportainer import Portainer
from pyportainer.exceptions import PortainerAuthenticationError, PortainerConnectionError
import pytest
import pytest_asyncio

SPEC = importlib.util.spec_from_file_location(
    "long_updates_client",
    Path(__file__).resolve().parents[1] / "custom_components/portainer_long_updates/client.py",
)
FIX = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(FIX)


@pytest_asyncio.fixture
async def api(monkeypatch):
    state = {"recreated": [], "pulls": [], "registries": [], "delay": 0, "status": 200,
             "events": [{"status": "Status: Downloaded newer image for test/image:latest"}]}

    async def registries(request):
        return web.json_response(state["registries"])

    async def inspect_container(request):
        return web.json_response({"Config": {"Image": "test/image:latest"}})

    async def pull(request):
        assert request.headers["X-API-Key"] == "test-key"
        state["pulls"].append((request.match_info["endpoint"], dict(request.query), dict(request.headers)))
        if state["status"] != 200:
            return web.Response(status=state["status"])
        response = web.StreamResponse(headers={"Content-Type": "application/json"})
        await response.prepare(request)
        await response.write(b'{"status":"Downloading"}\n')
        await asyncio.sleep(state["delay"])
        try:
            for event in state["events"]:
                await response.write(json.dumps(event).encode() + b"\n")
            await response.write_eof()
        except (ConnectionError, RuntimeError):
            pass  # Expected when testing client timeout/cancellation.
        return response

    async def original(self, endpoint_id, container_id, timeout=timedelta(minutes=5), *, pull_image=False):
        state["recreated"].append((endpoint_id, container_id, pull_image))
        return "recreated"

    app = web.Application()
    app.router.add_get("/api/registries", registries)
    app.router.add_get("/api/endpoints/{endpoint}/docker/containers/{container}/json", inspect_container)
    app.router.add_post("/api/endpoints/{endpoint}/docker/images/create", pull)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "127.0.0.1", 0)
    await site.start()
    port = site._server.sockets[0].getsockname()[1]
    monkeypatch.setattr(Portainer, "container_recreate", original)
    uninstall = FIX.install(pull_timeout=0.05)
    async with ClientSession(timeout=ClientTimeout(total=0.2)) as session:
        client = Portainer(f"http://127.0.0.1:{port}", "test-key", session=session, max_retries=0)
        yield client, state
    uninstall()
    await runner.cleanup()


@pytest.mark.asyncio
async def test_native_update_path_and_both_endpoints(api):
    client, state = api
    for endpoint in (14, 15):
        assert await client.container_recreate(endpoint, "container", pull_image=True) == "recreated"
    assert state["recreated"] == [(14, "container", False), (15, "container", False)]
    assert [p[0] for p in state["pulls"]] == ["14", "15"]
    assert state["pulls"][0][1] == {"fromImage": "test/image:latest"}


@pytest.mark.asyncio
async def test_no_pull_preserves_native_behavior(api):
    client, state = api
    await client.container_recreate(14, "container", pull_image=False)
    assert not state["pulls"]
    assert state["recreated"] == [(14, "container", False)]


@pytest.mark.asyncio
@pytest.mark.parametrize("events", [[{"error": "no space left on device"}], [], [{"errorDetail": {"message": "denied"}}]])
async def test_failed_or_incomplete_pull_never_recreates(api, events):
    client, state = api
    state["events"] = events
    with pytest.raises(PortainerConnectionError):
        await client.container_recreate(14, "container", pull_image=True)
    assert not state["recreated"]


@pytest.mark.asyncio
@pytest.mark.parametrize("status,error", [(500, PortainerConnectionError), (401, PortainerAuthenticationError)])
async def test_http_error_never_recreates(api, status, error):
    client, state = api
    state["status"] = status
    with pytest.raises(error):
        await client.container_recreate(14, "container", pull_image=True)
    assert not state["recreated"]


@pytest.mark.asyncio
async def test_timeout_covers_body_and_never_recreates(api):
    client, state = api
    state["delay"] = 0.15
    with pytest.raises(PortainerConnectionError):
        await client.container_recreate(14, "container", timeout=timedelta(seconds=0.05), pull_image=True)
    assert not state["recreated"]


@pytest.mark.asyncio
async def test_pull_overrides_session_timeout(api):
    client, state = api
    state["delay"] = 0.3  # Session timeout is only 0.2 seconds.
    await client.container_recreate(14, "container", timeout=timedelta(seconds=1), pull_image=True)
    assert state["recreated"] == [(14, "container", False)]


@pytest.mark.asyncio
async def test_registry_credentials_stay_in_portainer(api):
    client, state = api
    state["registries"] = [{"Id": 7, "Type": 1, "URL": "docker.io", "Authentication": True}]
    await client.container_recreate(14, "container", pull_image=True)
    auth = state["pulls"][0][2]["X-Registry-Auth"]
    assert json.loads(base64.b64decode(auth)) == {"registryId": 7}


def test_registry_matching():
    registries = [{"Id": 1, "Type": 1, "URL": "docker.io", "Authentication": True},
                  {"Id": 2, "Type": 3, "URL": "https://ghcr.io", "Authentication": True}]
    assert FIX.registry_id("ollama/ollama:latest", registries) == 1
    assert FIX.registry_id("ghcr.io/org/repo:latest", registries) == 2
    assert FIX.registry_id("evilghcr.io/org/repo:latest", registries) is None
    assert FIX.registry_id("localhost:5000/repo@sha256:abc", registries) is None


@pytest.mark.asyncio
async def test_restart_uses_configured_timeout(api, monkeypatch):
    client, state = api
    async def request(uri, **kwargs):
        assert uri == "endpoints/14/docker/containers/container/restart"
        assert kwargs == {"method": "POST", "timeout": 120}
    monkeypatch.setattr(client, "_request", request)
    await client.restart_container(14, "container")


@pytest.mark.asyncio
async def test_cancellation_does_not_recreate(api):
    client, state = api
    state["delay"] = 0.1
    task = asyncio.create_task(client.container_recreate(14, "container", pull_image=True))
    await asyncio.sleep(0.03)
    task.cancel()
    with pytest.raises(asyncio.CancelledError):
        await task
    assert not state["recreated"]


@pytest.mark.asyncio
@pytest.mark.skipif(not os.environ.get("PORTAINER_SLOW_TEST"), reason="Enable the 65-second regression test explicitly")
async def test_pull_longer_than_portainer_60_second_limit(api):
    client, state = api
    state["delay"] = 65
    await client.container_recreate(14, "container", timeout=timedelta(seconds=90), pull_image=True)
    assert state["recreated"] == [(14, "container", False)]
