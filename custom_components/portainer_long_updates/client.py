"""Stream pulls through Portainer before using its native recreation API.

Portainer's agent-backed recreation client has a 60-second HTTP timeout.
The Docker proxy can stream a pull without that limit. Never recreate after
an incomplete/failed pull. Do not store registry credentials or progress bodies.
"""

import asyncio
import base64
from datetime import timedelta
from functools import wraps
import inspect
import json
import logging
from urllib.parse import urlsplit

from aiohttp import ClientError, ClientTimeout
from pyportainer import Portainer
from pyportainer.exceptions import (
    PortainerAuthenticationError,
    PortainerConnectionError,
)
from yarl import URL

LOGGER = logging.getLogger(__name__)


def registry_id(image, registries):
    """Select a matching registry; Portainer itself resolves its credentials."""
    first, separator, remainder = image.partition("/")
    explicit = bool(separator and ("." in first or ":" in first or first == "localhost"))
    host = first.lower() if explicit else "docker.io"
    repository = remainder if explicit else image
    if host in {"index.docker.io", "registry-1.docker.io"}:
        host = "docker.io"
    matches = []
    for registry in registries:
        address = registry.get("URL", "")
        parsed = urlsplit(address if "://" in address else "//" + address)
        registry_host = parsed.netloc.lower()
        if registry_host in {"index.docker.io", "registry-1.docker.io"} or registry.get("Type") == 1:
            registry_host = "docker.io"
        if registry_host == host and registry.get("Authentication"):
            preferred = bool(registry.get("Username") and repository.startswith(registry["Username"] + "/"))
            matches.append((preferred, registry["Id"]))
    return max(matches, key=lambda item: item[0])[1] if matches else None


async def stream_pull(client, endpoint_id, image, timeout):
    """Consume and validate the entire Docker JSON-lines response."""
    registries = await client._request("registries")
    headers = {"X-API-Key": client._api_key}
    selected = registry_id(image, registries)
    if selected is not None:
        headers["X-Registry-Auth"] = base64.b64encode(
            json.dumps({"registryId": selected}).encode()
        ).decode()
    url = URL.build(
        scheme=client._api_scheme,
        host=client._api_host,
        port=client._api_port,
        path=f"{client._api_base_path}/api/endpoints/{endpoint_id}/docker/images/create",
    )
    if client._session is None:
        raise PortainerConnectionError("HA Portainer session is unavailable")
    complete = False
    LOGGER.info("Pulling %s on endpoint %s (timeout %ss)", image, endpoint_id, timeout)
    try:
        async with client._session.post(
            url,
            params={"fromImage": image},
            headers=headers,
            timeout=ClientTimeout(total=timeout, connect=30, sock_read=None),
        ) as response:
            if response.status == 401:
                raise PortainerAuthenticationError("Portainer rejected the image pull")
            response.raise_for_status()
            async for line in response.content:
                if not line.strip():
                    continue
                event = json.loads(line)
                if event.get("error") or event.get("errorDetail"):
                    detail = event.get("error") or event["errorDetail"].get("message")
                    raise PortainerConnectionError(f"Image pull failed: {detail}")
                if event.get("status", "").startswith("Status:"):
                    complete = True
    except (TimeoutError, ClientError, ValueError) as error:
        raise PortainerConnectionError(
            f"Image pull did not complete for {image}: {type(error).__name__}: {error}"
        ) from error
    if not complete:
        raise PortainerConnectionError(f"Image pull ended without success for {image}")
    LOGGER.info("Image pull completed for %s on endpoint %s", image, endpoint_id)


def install(pull_timeout=1800, restart_timeout=120):
    """Adapt the shared client class without copying the native integration.

New clients created by a config-entry reload inherit the same behavior.
The returned cleanup function is used by tests; removal in HA requires restart.
"""
    original_recreate = Portainer.container_recreate
    original_restart = Portainer.restart_container
    if getattr(original_recreate, "_ha_long_updates", False):
        raise ValueError("Portainer long updates are already installed")
    for name in ("endpoint_id", "container_id", "timeout", "pull_image"):
        if name not in inspect.signature(original_recreate).parameters:
            raise TypeError(f"Unsupported Portainer container_recreate signature: {name}")
    for name in ("endpoint_id", "container_id"):
        if name not in inspect.signature(original_restart).parameters:
            raise TypeError(f"Unsupported Portainer restart_container signature: {name}")

    @wraps(original_recreate)
    async def recreate(self, endpoint_id, container_id, timeout=timedelta(minutes=5), *, pull_image=False):
        # Serialize per endpoint, including pull_image=False, to avoid overlapping
        # recreation requests or concurrent changes to the same local image tag.
        if not hasattr(self, "_ha_long_update_locks"):
            self._ha_long_update_locks = {}
        lock = self._ha_long_update_locks.setdefault(endpoint_id, asyncio.Lock())
        async with lock:
            if pull_image:
                try:
                    container = await self.inspect_container(endpoint_id, container_id, raw=True)
                    reference = container["Config"]["Image"]
                    await stream_pull(
                        self, endpoint_id, reference, max(pull_timeout, timeout.total_seconds())
                    )
                except Exception:
                    LOGGER.exception(
                        "Pull failed on endpoint %s for container %s; recreation was not started",
                        endpoint_id, container_id,
                    )
                    raise
            return await original_recreate(
                self, endpoint_id, container_id, timeout=timeout, pull_image=False
            )

    @wraps(original_restart)
    async def restart(self, endpoint_id, container_id):
        return await self._request(
            f"endpoints/{endpoint_id}/docker/containers/{container_id}/restart",
            method="POST",
            timeout=restart_timeout,
        )

    recreate._ha_long_updates = True
    Portainer.container_recreate = recreate
    Portainer.restart_container = restart

    def uninstall():
        Portainer.container_recreate = original_recreate
        Portainer.restart_container = original_restart

    return uninstall
