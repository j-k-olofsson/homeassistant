"""Append one comparison view through the live Lovelace API, preserving others.

Run inside HA container with SUPERVISOR_TOKEN forwarded by docker. Never edit
Lovelace storage behind the running instance.
"""
import asyncio
import copy
import json
import os
from pathlib import Path

import aiohttp

PREFIX = "sensor.elprognos_v2_"


def entity(suffix, name):
    return {"entity": PREFIX + suffix, "name": name}


def view():
    return {
        "title": "Elprognos V2", "path": "prognos-v2", "icon": "mdi:chart-line",
        "cards": [
            {"type": "markdown", "title": "Två prognoser – samma hem", "content":
             "V2 använder 30 kompletta dygns förbrukning, veckodag och timprofil. "
             "Nivån anpassas till senaste veckan. Månadens redan förbrukade energi "
             "räknas separat från återstående förbrukning. Den befintliga prognosen kör vidare.\n\n"
             "V2 räknar rått spotpris + dina avgifter, med moms en gång. Den använder "
             "uppmätt energi och en separat prisprognos för återstående månad. "
             "Skillnaden mellan gammal och ny prognos visar därför inte enbart modellens träffsäkerhet."},
            {"type": "entities", "title": "Månadens kostnad – jämför", "entities": [
                entity("kostnadsprognos", "V2: timprofil + senaste veckan"),
                {"entity": "sensor.kvartbaserad_elkostnadsprognos", "name": "Befintlig kvartprognos"},
                entity("enkel_30d_kostnad", "V2: enkelt 30-dagarssnitt"),
                entity("skillnad_befintlig", "V2 minus befintlig"),
                entity("scenario_lagt", "Lägre scenario"),
                entity("scenario_hogt", "Högre scenario"),
            ]},
            {"type": "history-graph", "title": "Hur prognoserna förändras", "hours_to_show": 168, "entities": [
                entity("kostnadsprognos", "V2"),
                {"entity": "sensor.kvartbaserad_elkostnadsprognos", "name": "Befintlig"},
                entity("enkel_30d_kostnad", "Enkelt 30-dagarssnitt"),
            ]},
            {"type": "entities", "title": "Förbrukning och rörlig kostnad", "entities": [
                entity("energi_hittills", "Energi hittills denna månad"),
                entity("kostnad_hittills", "Beräknad rörlig kostnad hittills"),
                entity("energi_aterstar", "Förväntad återstående energi"),
                entity("kostnad_aterstar", "Förväntad återstående rörlig kostnad"),
                entity("energiprognos", "V2: hela månadens energi"),
                entity("enkel_30d_energi", "Enkelt 30-dagarssnitt: månadsenergi"),
                entity("dygnsforbrukning_30d", "Genomsnitt per dygn, senaste 30 dygn"),
                {"entity": "input_number.manadsavgifter_elhandel_nat", "name": "Fast avgift, ingår en gång i totalprognosen"},
            ]},
            {"type": "entities", "title": "Underlag", "entities": [
                entity("datatackning", "Täckning för månadens energistatistik"),
                entity("kanda_priser", "Återstående energi med publicerat spotpris"),
            ]},
            {"type": "markdown", "title": "Så ska siffrorna läsas", "content":
             "Statistik till **{{ state_attr('sensor.elprognos_v2_kostnadsprognos', 'measured_until') }}**. "
             "Underlag: **{{ state_attr('sensor.elprognos_v2_kostnadsprognos', 'complete_days') }} kompletta dygn**.\n\n"
             "Publicerade priser används för de intervall där de finns. För övriga framtida intervall "
             "används en viktad prisprofil från de senaste 30 dygnen.\n\n"
             "Scenarierna varierar framtida förbrukning ±15 % och okända spotpriser ±30 % "
             "(minst ±0,10 kr/kWh). **De är inga statistiska garantier.**\n\n"
             "Kostnad hittills är beräknad, inte avstämd mot faktura. Före V2-start antas dagens "
             "avgifter; äldre förbrukning som bara finns per timme fördelas jämnt inom timmen. "
             "En eventuell effektavgift ingår inte. Saknad energi och prisdata uppskattas och "
             "redovisas i prognossensorns attribut."},
            {"type": "markdown", "title": "För- och nackdelar i det första testet", "content":
             "**V2:** underlag över månadsskiftet, uppmätt energi, timprofil och anpassning "
             "till senaste veckan. Kan släpa efter snabba beteende- och väderförändringar.\n\n"
             "**Enkelt 30-dagarssnitt:** lätt att förstå och stabilt, men reagerar långsamt på "
             "ändrad förbrukning.\n\n"
             "**Befintlig:** reagerar på innevarande månads data, men har litet underlag vid "
             "månadsskiftet och bygger senare på ett begränsat urval av kvartdata.\n\n"
             "Det historiska energitestet gav 5,6 % genomsnittligt absolut procentfel för V2, "
             "7,4 % för enkelt 30-dagarssnitt och 5,7 % för en jämförbar månadsmodell. "
             "Det omfattar bara nio jämförbara prognostillfällen i juni, juli och oktober. "
             "Augusti och september uteslöts på grund av datagap. V2 justerades under utvecklingen "
             "med dessa data; resultatet är ingen oberoende verifiering. "
             "Kostnadsprognosens träffsäkerhet behöver följas framåt. Väderjustering är ännu inte aktiverad."},
        ],
    }


async def main():
    async with aiohttp.ClientSession() as session:
        async with session.ws_connect("http://supervisor/core/websocket", max_msg_size=16*1024*1024) as ws:
            await ws.receive_json()
            await ws.send_json({"type": "auth", "access_token": os.environ["SUPERVISOR_TOKEN"]})
            assert (await ws.receive_json())["type"] == "auth_ok"
            async def call(id, typ, **kwargs):
                await ws.send_json({"id": id, "type": typ, **kwargs})
                value = await ws.receive_json()
                assert value.get("success"), value
                return value.get("result")
            original = await call(1, "lovelace/config", url_path="dashboard-elpris")
            assert not any(v.get("path") == "prognos-v2" for v in original.get("views", [])), "View already exists; review before replacing"
            out = Path("/config/backups/elprognos_v2_20261108")
            (out / "dashboard_api_before.json").write_text(json.dumps(original, ensure_ascii=False, indent=2))
            updated = copy.deepcopy(original)
            updated.setdefault("views", []).append(view())
            await call(2, "lovelace/config/save", url_path="dashboard-elpris", config=updated)
            verified = await call(3, "lovelace/config", url_path="dashboard-elpris")
            assert verified == updated
            assert verified["views"][:-1] == original["views"]
            (out / "dashboard_api_after.json").write_text(json.dumps(verified, ensure_ascii=False, indent=2))
            print("Comparison view saved and read back; all existing views preserved")


if __name__ == "__main__":
    asyncio.run(main())
