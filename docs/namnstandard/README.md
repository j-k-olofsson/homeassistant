# Namnstandardisering – aktuell slutrapport 8 november 2026

> Senaste genomgång: **[Totalanalys 8 november 2026](TOTALANALYS.md)**. Ytterligare namn-/områdesjusteringar och en verifierad Powercalc-rättning är genomförda. Inventeringarna och statusfilen nedan är uppdaterade. Etappsiffrorna i den äldre redogörelsen beskriver tidigare omgångar.

> Senaste genomgång: **[Totalanalys 8 november 2026](TOTALANALYS.md)**. Ytterligare namn-/områdesjusteringar och en verifierad Powercalc-rättning är genomförda. Inventeringarna och statusfilen nedan är uppdaterade. Etappsiffrorna i den äldre redogörelsen beskriver tidigare omgångar.

Huvudmigrationen och de tre efterföljande restpunkterna är genomförda. Slider är borttagen efter användningskontroll. ESPHome09 heter **Blomlampa 3** och tillhör **Köket**, liksom dess fem länkade nätverksposter. Den oanvända WiFi-omskanningen är borttagen. Inga namnfrågor är uppskjutna.

Omstarterna visade separata driftproblem med autentisering och Cast-anslutningar. OpenAI är nu anslutet efter en separat nyckeländring. Slack avvisar sin oförändrade token med `token_revoked`, vilket hindrar `notify.flocken` från att registreras. [Aktuell rest-, drift- och underhållslista](RESTPUNKTER.md). Detta innebär att den aktuella driftkontrollen har dokumenterade avvikelser; namnarbetet rapporteras inte som en felfri kontroll av hela installationens drift.

## Omfattning sedan ursprunglig inventering

| Poster | Antal |
|---|---:|
| Granskade registerentiteter nu | 10 155 |
| Granskade enhetsposter nu | 1 071 |
| Entitets-ID:n ändrade netto bland kvarvarande entiteter | 9 753 |
| Ändrade egna entitetsnamn | 7 636 |
| Ändrade aliaslistor | 8 220 |
| Ändrade enhetsnamn | 301 |
| Ändrade områdestilldelningar på enhetsposter | 107 |
| Borttagna oanvända registerentiteter | 2 |

Antalen jämför oföränderliga registeridentiteter, inte summan av etappoperationer. Det finns också 111 källstyrda tillståndsentiteter utan registerpost. Flera enhetsposter kan representera samma fysiska hårdvara genom olika integrationer.

## Gemensam namnprincip

Området beskriver rummet, enheten saken och entiteten funktionen. Exempel: område Köket, enhet Blomlampa 3 och funktion Beräknad energi. Rums- och enhetsnamn upprepas inte i varje namnfält. Huvudfunktioner använder enhetens namn. Meningsfulla skillnader som mätpunkt, väderstreck och datakälla behålls; inga okända placeringar eller ägare har hittats på.

Svenska funktionsnamn används. Produktnamn, protokoll och kända värdnamn behålls där de identifierar källan. ID-principen är `domän.område_enhet_funktion` med gemener och ASCII. Föräldraenhet eller källprecisering läggs till när det behövs. HA:s globala standard för nygenererade ID:n är kvar. Ett namnbyte ändrar inte automatiskt ett befintligt ID.

Tidigare namn finns kvar som alternativa alias där lämpligt. Primär aliasordning är bevarad. `null` i aliasunderlaget betyder HA:s beräknade standardnamn. [HA:s namn- och ID-dokumentation](https://www.home-assistant.io/docs/configuration/customizing-entities/) och [2026.11-lanseringen](https://www.home-assistant.io/blog/2026/11/04/release-202611/).

## Beroenden och verifiering

Automationer, skript, mallar, kontrollpaneler, hjälpare, energiinställningar, favoriter, personkopplingar och egna kort har följt med respektive ID-byte. Även dynamiska urval och recorder-globbar granskades. Hundra tidigare globmatchade recorder-undantag bevarades uttryckligen under nya ID:n. Huvudmigrationens sista etapp uppdaterade 978 ID:n, 30 källfiler och 19 lagrade konfigurationer; uppföljningen ändrade ytterligare 29 ID:n och tog bort två oanvända entiteter.

ID:n ändrades via HA:s register-API. Lagrade integrationsreferenser och gamla ESPHome-cachedefinitioner skrevs endast medan HA-kärnan var verifierat stoppad. Avbrutna försök återställdes och räknas inte som genomförda ändringar. OpenWrts spårningsentiteter kan efter omstart associeras med en annan accesspunkts registerpost för samma klient. Sådana förflyttningar har bara godtagits när samma MAC och identifierare verifierats; alla sex poster för Blomlampa 3 har samordnade namn och område. Identifierar- och anslutningslistor jämförs som mängder.

HA:s aktuella konfigurationskontroll är giltig utan fel eller varningar. De ursprungliga på-/avlägena för 81 automationer är bevarade. Röstexponeringen är bevarad. Kvarvarande driftavvikelser finns i statusfilen och restlistan. Den slutliga referenskontrollen och den separata WiFi-/Slider-kontrollen ligger länkade nedan.

Historik och statistik jämfördes inom fasta perioder för ID-etapperna. Enbart huvudmigrationens sista etapp jämförde 213 681 historikposter och 6 339 statistikpunkter. Uppföljningens egna jämförelser finns i den privata verifieringsjournalen. Detta är inte en kontroll av varje historikrad sedan installationen skapades.

Egna OpenWrt-/Thread-korts namnlogik och adressering samt Plants sju registeruppslag har klarat regressionstester. ESPHome09:s ändrade källa klarar ESPHomes konfigurationsvalidering. Ingen firmware har laddats upp och inga fysiska funktioner har aktiverats manuellt som test. Ingen visuell webbläsarprovning eller full provåterställning till en separat HA-instans har gjorts. **Ladda om öppna kontrollpaneler för att läsa in uppdaterade referenser och kort.**

## Bevarade identiteter och underhåll

83 kvarvarande register-ID:n har dokumenterade kompatibilitetsskäl. Det omfattar Google Assistant, sparad Alexa-exponering, ESPHome-importer, Music Assistant, Schedulers arbetsdagssensor och sophämtningskalendern. Blomlampa 3:s ljusentitet behåller därför `light.blomlampa_ateljen_esphome09_light`; visningsnamnet och området är uppdaterade. Alexa är globalt avstängt men dess sparade externa identiteter har behållits.

Tekniska `unique_id`, UUID, firmware-nodnamn, värdnamn, enumvärden, skriptens YAML-nycklar/tjänstenamn och kontrollpanelernas URL:er är stabila identiteter. Ett skripts tjänstenamn kan skilja sig från dess entitets-ID; tjänsteanrop och `target.entity_id` har behandlats var för sig. Historiska loggar, registertombstones, spår och säkerhetskopior har inte skrivits om.

Plant har en [lokal rättning](plant-registeridentitet.patch) som låter befintliga registrerade ID:n styra härledda sensorkällor. Kontrollera den vid framtida integrationsuppdatering. Test: `python3 tools/test_ha_naming_plant.py`. Korttest: `node tools/test_ha_naming_cards.cjs`.

För framtida namn-/referenskontroll finns `python3 tools/ha_naming_audit.py`. Det är ett läsande verktyg som rapporterar nya eller ändrade registerposter och föråldrade referenser. Granskningsmanifestet ska uppdateras först efter saklig granskning av nya ändringar.

## Underlag och säkerhetskopior

- [Alla registerentiteter före/efter](hela-entitetsinventeringen.csv)
- [Alla enhetsposter före/efter](hela-enhetsinventeringen.csv)
- [Borttagna oanvända entiteter](borttagna-entiteter.csv)
- [Tillståndsentiteter utan registerpost](entiteter-utan-registerpost.csv)
- [ID-karta CSV](genomford-id-karta.csv) / [JSON](id-karta.json)
- [Kompatibilitetsundantag](id-kompatibilitetsundantag.json)
- [Slutlig referenskontroll](slutlig-referenskontroll.json)
- [Kontroll av borttagen funktion och hjälpare](restpunkter-referenskontroll.json)
- [Analys av notify.flocken-varningen](NOTIFY-FLOCKEN.md)
- [Aktuell status och verifiering](status.json)
- [Återställningsanvisning och säkerhetskopior](ATERSTALLNING.md)

Startkopian är `22f83cfa`. Den arkivkontrollerade slutkopian före uppföljningen är `8dc2d539`. Ny fullständig kopia före restpunkternas åtgärder är `d381dcba`. Den fullständiga uppföljningskopian **`d8d4fa67`** är nu slutförd utan fel enligt Supervisor och finns på Backup. Innehållsmetadata bekräftar HA och MariaDB; denna kopia har inte arkivprovats eller provåterställts. HA och MariaDB ska återställas från samma kontrollpunkt.

Privata före-/efterkopior, avbrutna/återställda försök och verifieringsjournaler finns under `/homeassistant/backups/namnstandard_20261107/`, `/homeassistant/backups/namnstandard_20261108/` och `/homeassistant/backups/namnstandard_20261108_restpunkter/`. De kan innehålla känslig konfiguration och ska inte publiceras.
