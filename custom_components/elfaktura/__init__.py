"""Authenticated invoice ledger API for the Elpris dashboard."""
import logging

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.helpers import config_validation as cv

from .store import InvoiceError, InvoiceStore, ITEMS, KINDS, normalize

DOMAIN = "elfaktura"
LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema({vol.Optional(DOMAIN): vol.Schema({})}, extra=vol.ALLOW_EXTRA)


async def respond(hass, connection, msg, operation, *args):
    try:
        result = await hass.async_add_executor_job(operation, *args)
    except InvoiceError as err:
        connection.send_error(msg["id"], err.code, str(err))
    except Exception:
        LOGGER.exception("Invoice operation failed")
        connection.send_error(msg["id"], "storage_error", "Fakturaregistret kunde inte uppdateras. Läs in listan igen innan du försöker på nytt.")
    else:
        connection.send_result(msg["id"], result)


@websocket_api.websocket_command({vol.Required("type"): "elfaktura/list", vol.Optional("include_archived", default=False): cv.boolean})
@websocket_api.async_response
async def ws_list(hass, connection, msg):
    await respond(hass, connection, msg, hass.data[DOMAIN].list, msg["include_archived"])


@websocket_api.websocket_command({vol.Required("type"): "elfaktura/get", vol.Required("invoice_id"): str})
@websocket_api.async_response
async def ws_get(hass, connection, msg):
    await respond(hass, connection, msg, hass.data[DOMAIN].get, msg["invoice_id"])


@websocket_api.websocket_command({vol.Required("type"): "elfaktura/validate", vol.Required("invoice"): dict})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_validate(hass, connection, msg):
    await respond(hass, connection, msg, normalize, msg["invoice"])


@websocket_api.websocket_command({vol.Required("type"): "elfaktura/save", vol.Required("invoice"): dict,
                                vol.Required("request_id"): str, vol.Optional("invoice_id"): str,
                                vol.Optional("expected_revision"): int, vol.Optional("reason", default=""): str})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save(hass, connection, msg):
    await respond(hass, connection, msg, hass.data[DOMAIN].save, msg["invoice"], connection.user.id,
                  msg["request_id"], msg.get("invoice_id"), msg.get("expected_revision"), msg["reason"])


@websocket_api.websocket_command({vol.Required("type"): "elfaktura/archive", vol.Required("invoice_id"): str,
                                vol.Required("expected_revision"): int, vol.Required("request_id"): str,
                                vol.Required("reason"): str})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_archive(hass, connection, msg):
    await respond(hass, connection, msg, hass.data[DOMAIN].archive, msg["invoice_id"], msg["expected_revision"],
                  connection.user.id, msg["request_id"], msg["reason"])


@websocket_api.websocket_command({vol.Required("type"): "elfaktura/export", vol.Required("format"): vol.In(["json", "csv"])})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_export(hass, connection, msg):
    await respond(hass, connection, msg, hass.data[DOMAIN].export, msg["format"])


async def async_setup(hass, config):
    store = InvoiceStore(hass.config.path(".storage", "elfaktura.sqlite3"))
    await hass.async_add_executor_job(store.initialize)
    hass.data[DOMAIN] = store
    for command in (ws_list, ws_get, ws_validate, ws_save, ws_archive, ws_export):
        websocket_api.async_register_command(hass, command)
    return True
