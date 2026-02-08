from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.config_entries import ConfigFlowResult
import homeassistant.helpers.config_validation as cv

from .constants import DOMAIN
from .coordinator import new_ubus_client

_LOGGER = logging.getLogger(__name__)


def _build_schema(defaults: dict[str, Any] | None = None) -> vol.Schema:
    defaults = defaults or {}
    return vol.Schema(
        {
            vol.Required("id", default=defaults.get("id", "")): cv.string,
            vol.Required("address", default=defaults.get("address", "")): cv.string,
            vol.Required("username", default=defaults.get("username", "")): cv.string,
            vol.Optional("password", default=defaults.get("password", "")): cv.string,
            vol.Required("https", default=defaults.get("https", False)): cv.boolean,
            vol.Required(
                "verify_cert", default=defaults.get("verify_cert", False)
            ): cv.boolean,
            vol.Optional("port", default=defaults.get("port", 0)): cv.positive_int,
            vol.Optional("path", default=defaults.get("path", "/ubus")): cv.string,
            vol.Required("interval", default=defaults.get("interval", 30)): cv.positive_int,
            vol.Required("wps", default=defaults.get("wps", False)): cv.boolean,
            vol.Optional("wan_devices", default=defaults.get("wan_devices", "")): cv.string,
            vol.Optional(
                "wifi_devices", default=defaults.get("wifi_devices", "")
            ): cv.string,
            vol.Optional(
                "mesh_devices", default=defaults.get("mesh_devices", "")
            ): cv.string,
        }
    )


class OpenWrtConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    async def async_step_reauth(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self.async_step_user(user_input)

    async def _validate_connection(self, user_input: dict[str, Any]) -> None:
        ubus = new_ubus_client(self.hass, user_input)
        await ubus.api_list()

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            _LOGGER.debug("User input: %s", user_input)
            try:
                await self.async_set_unique_id(user_input["address"])
                self._abort_if_unique_id_configured()
                await self._validate_connection(user_input)
            except PermissionError:
                errors["base"] = "invalid_auth"
            except ConnectionError:
                errors["base"] = "cannot_connect"
            except Exception:  # pragma: no cover - defensive logging
                _LOGGER.exception("Unexpected exception while validating OpenWrt configuration")
                errors["base"] = "unknown"
            else:
                title = f"{user_input['id']} - {user_input['address']}"
                return self.async_create_entry(title=title, data=user_input)

        return self.async_show_form(
            step_id="user",
            data_schema=_build_schema(user_input),
            errors=errors,
        )

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        entry = self._get_reconfigure_entry()
        errors: dict[str, str] = {}

        if user_input is not None:
            _LOGGER.debug("Reconfigure input for %s: %s", entry.entry_id, user_input)
            try:
                await self._validate_connection(user_input)
            except PermissionError:
                errors["base"] = "invalid_auth"
            except ConnectionError:
                errors["base"] = "cannot_connect"
            except Exception:  # pragma: no cover - defensive logging
                _LOGGER.exception("Unexpected exception while reconfiguring OpenWrt entry")
                errors["base"] = "unknown"
            else:
                for existing_entry in self._async_current_entries():
                    if (
                        existing_entry.entry_id != entry.entry_id
                        and existing_entry.unique_id == user_input["address"]
                    ):
                        errors["base"] = "already_configured"
                        break

                if not errors:
                    title = f"{user_input['id']} - {user_input['address']}"
                    return self.async_update_reload_and_abort(
                        entry,
                        unique_id=user_input["address"],
                        title=title,
                        data=user_input,
                        reason="reconfigure_successful",
                    )

        defaults = entry.data
        return self.async_show_form(
            step_id="reconfigure",
            data_schema=_build_schema(defaults),
            errors=errors,
        )
