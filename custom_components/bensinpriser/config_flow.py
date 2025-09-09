import voluptuous as vol
import requests
from homeassistant import config_entries
from homeassistant.core import callback
from .const import DOMAIN
import logging

LANS = [
    "blekinge-lan", "dalarnas-lan", "gavleborgs-lan", "gotlands-lan",
    "hallands-lan", "jamtlands-lan", "jonkoping-lan", "kalmar-lan",
    "kronobergs-lan", "norrbottens-lan", "orebro-lan", "ostergotlands-lan",
    "skane-lan", "sodermanlands-lan", "stockholms-lan", "uppsala-lan",
    "varmlands-lan", "vasterbottens-lan", "vasternorrlands-lan",
    "vastmanlands-lan", "vastra-gotalands-lan"
]

_LOGGER = logging.getLogger(__name__)

def get_stations(lan):
    try:
        response = requests.get(f"https://henrikhjelm.se/api/getdata.php?lan={lan}")
        response.raise_for_status()
        data = response.json()
        _LOGGER.debug(f"Data fetched for lan {lan}: {data}")
        stations = list(data.keys())
        _LOGGER.debug(f"Stations for lan {lan}: {stations}")
        return stations
    except Exception as e:
        _LOGGER.error(f"Error fetching stations for lan {lan}: {e}")
        return []

class BensinpriserConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input=None):
        errors = {}
        if user_input is not None:
            self.lan = user_input["lan"]
            return await self.async_step_station()

        data_schema = vol.Schema({
            vol.Required("lan"): vol.In(LANS)
        })

        return self.async_show_form(step_id="user", data_schema=data_schema, errors=errors)

    async def async_step_station(self, user_input=None):
        errors = {}
        if user_input is not None:
            return self.async_create_entry(title=f"Bensinpriser {self.lan} {user_input['station']}", data={"lan": self.lan, "station": user_input["station"]})

        stations = await self.hass.async_add_executor_job(get_stations, self.lan)
        if not stations:
            errors["base"] = "no_stations"
            return self.async_show_form(step_id="station", data_schema=vol.Schema({vol.Required("station"): vol.In([])}), errors=errors)

        data_schema = vol.Schema({
            vol.Required("station"): vol.In(stations)
        })

        return self.async_show_form(step_id="station", data_schema=data_schema, errors=errors)
