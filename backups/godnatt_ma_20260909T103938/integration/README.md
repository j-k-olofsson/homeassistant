# Snabb Godnatt

Endast `media_player.diegos_vackarklocka` används. Dörrsensorn Verandan läses
vid varje anrop, så aktuell varning väljs även när ljudet förberetts tidigare.

Fyra olika AI-hälsningar med 8–12 ord förbereds med Piper (Cloud som reserv).
Varje hälsning har tre ljudfiler: stängd, öppen och okänd dörrstatus. Kön lagras
atomiskt i `www/granny_goodnight/queue.json`. Efter bekräftad uppspelningsstart
förbrukas hälsningen och kön fylls på i bakgrunden. De senaste tolv använda
texterna och alla köade texter utesluts från ny generering. Vid misslyckad
uppspelning behålls hälsningen för återförsök. En tom kö ger ett uttryckligt fel;
AI-generering läggs inte i vägen för uppspelningen. `granny_goodnight.prepare`
fyller kön, med högst åtta genereringsförsök per anrop.

Cast-mottagaren startas med `media_player.turn_on` innan filen laddas.
Varje MP3 har tre sekunders inledande tystnad i samma ljudström som talet.
`playing` för exakt begärd URL måste bekräftas inom tolv sekunder, inklusive
start av mottagaren. Detta mäter spelarstatus, inte hörbar start: klippning
måste verifieras genom lyssning. Otillgänglig spelare och utebliven start ger
fel i spårningen och en beständig HA-notis med det uteblivna meddelandet.

Kvälls- och startautomationen fyller också kön. Släckning, IR-sändning och
stopp av hissmusik ligger i Godnatt-automationens oberoende parallella grenar.

Tester: `tools/test_granny_goodnight.py` med vanlig Python, samt
`tools/test_granny_goodnight_playback.py` och `tools/test_granny_goodnight_queue.py`
i HA:s Python-miljö. Konfiguration kontrolleras med `ha core check`.
Python-ändringar kräver HA-omstart.
