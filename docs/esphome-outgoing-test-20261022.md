# ESPHome: test av enhetsinitierad anslutning

Utfört 2026-10-22. Tider nedan är Europe/Stockholm (CEST).

Resultat: båda enheterna klarade testet med ESPHome 2026.10.0 och HA 2026.10.2.

| Enhet | Nät | Första återanslutning efter integrationsomladdning | Återanslutning efter omstart | Godkända styr-/återläsningsprov | Uppmätt svarstid |
|---|---|---:|---:|---:|---:|
| esphome43 | Wi-Fi / IPv4 | 60.0 s | 60.5 s | 7 | 0.27–0.29 s |
| esphome42 | Thread / IPv6 | 60.0 s | 60.5 s | 7 | 0.27–0.28 s |

Tiderna för återanslutning ovan mäts till första SYN-paketet från enheten. Svarstiderna är tid från HA-anrop till observerat bekräftat ljustillstånd, med polling cirka 250 ms; detta är inte en noggrann latensbenchmark.

## Genomförande och bevis

1. Sparade ursprunglig YAML, identitet, firmwareuppgifter, entitetsregisteranknytning och ljustillstånd. Verifierade normal anslutning HA → enhet:6053 och verklig styrning med återrapportering.
2. Lade till api.outgoing_connection i enbart esphome42.yaml och esphome43.yaml, byggde och laddade upp via krypterad OTA. Verifierade ny kompileringstid, normal HA-initierad anslutning och styrning igen.
3. Lade till två tillfälliga OUTPUT-regler i HA-värdens nätverksnamnrymd: blockera endast nya TCP SYN till respektive enhets adress på 6053, via iptables respektive ip6tables. Övrig trafik och OTA lämnades tillgänglig. En separat watchdog återställer reglerna efter högst 30 minuter; den avväpnades vid ordinarie städning.
4. Omladdade bara de två ESPHome-integrationsposterna för att stänga befintliga förbindelser. Direkta försök till port 6053 gav timeout och brandväggsräknarna ökade. Båda enheterna blev tillfälligt unavailable, varefter de själva anslöt till HA:6054. Paketfångsten visar SYN från enheten och HA återtog styrning och mottog tillstånd.
5. Startade om båda via deras befintliga interna restart-switch i webbservern med blockeringen kvar. Båda återanslöt själva till HA:6054; det verifierar att den inlärda HA-adressen överlevde omstart.
6. Observerade samma två etablerade anslutningar under 603.2 s (10:52:03–11:02:06), med 60 nätverks-/tillståndskontroller och upprepade verkliga styr-/återläsningsprov. Inga nya SYN-paket och inga unavailable-händelser för testenheterna under detta fönster. Ljustillståndet återställdes efter varje prov.
7. Tog bort båda blockeringsreglerna och laddade om just de två integrationerna för att även bryta de enhetsinitierade förbindelserna. Verifierade åter HA → enhet:6053, styrning, återrapportering och ytterligare minst två minuters observation i normalläge.

Övriga ESPHome-entiteter hade 0 registrerade övergångar i tillgänglighet under händelseövervakningen. Det är en kontroll av sidoeffekter, inte en fullständig funktionskontroll av alla enheter.

## Kvarvarande konfiguration

outgoing_connection är fortsatt aktiverat på de två testenheterna. Ingen gemensam basfil eller övrig enhetskonfiguration ändrades i detta test. Båda ljustillstånden är återställda till ursprunglig on/off, ljusstyrka, färg och effekt. Inga testregler finns kvar.

## Metodjusteringar

Kärnan stödde inte ss -K (RTNETLINK Invalid argument); detta stängde inga förbindelser. Metoden ersattes med kontrollerad omladdning av enbart de två integrationsposterna. Observatören korrigerades också för att känna igen IPv4-adresser presenterade som IPv4-mappad IPv6 av ss. De första anslutningarna behölls under korrigeringen; stabilitetsfönstret började först efter efterföljande omstart och lyckad verifiering. Första C6-bygget avbröts under verktygsinstallationen; ombyggnaden lyckades. Ett direkt diagnostikanrop under pågående Thread-OTA gav handshake-timeout; det ingår inte i stabilitetsmätningen.

## Begränsningar och underlag

Testet visar fungerande återanslutning och observerad stabilitet i detta tidsfönster, inte långtidsstabilitet eller förbättrad radiotäckning. Återrapporterade ljustillstånd verifierades över API:t; ingen fysisk ljusmätning utfördes. Nätverksblockeringen gjordes lokalt på HA-värden, inte genom ändring av routerns brandvägg. Den visar därför funktion i de testade trafikvägarna, inte att en annan framtida brandväggspolicy fungerar.

Backup, JSON-händelser, SYN-sammanställning, firmwareloggar och paketfångst: `/homeassistant/backups/esphome-outgoing-test-20261022T084117Z`. targets.json innehåller API-nycklar och ska hållas privat.
