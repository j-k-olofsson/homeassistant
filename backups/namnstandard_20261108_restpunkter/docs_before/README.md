# Enhetlig namnsättning – slutförd 8 november 2026

Arbetet är slutfört med de två restpunkter som användaren uttryckligen har skjutit upp. Home Assistant är igång. Alla 10 150 registerentiteter och 1 070 enhetsposter har ingått i slutavstämningen. Därutöver finns 111 källstyrda tillståndsentiteter utan registerpost.

## Resultat

| Förändring sedan ursprunglig inventering 7 november | Unika poster |
|---|---:|
| Ändrade entitets-ID:n, netto | 9 719 |
| Ändrade egna entitetsnamn | 7 635 |
| Ändrade aliaslistor | 8 221 |
| Ändrade enhetsnamn | 288 |
| Ändrade områdestilldelningar på enhetsposter | 103 |

Antalen jämför samma oföränderliga registeridentitet före och efter. Etappoperationer summeras inte: en post kan ha preciserats flera gånger. Under arbetet tillkom 21 entiteter och 4 enhetsposter; de ingår också i slutgranskningen. Flera enhetsposter kan representera samma hårdvara genom olika integrationer.

## Namnprincip för fortsatt användning

HA 2026.11 sätter samman namndelar efter sammanhanget. Området ligger i områdesregistret, enhetsnamnet beskriver saken och entitetsnamnet dess funktion. Därför undviks upprepade rums- och enhetsnamn i dessa fält. En enhet kan exempelvis heta Klimatsensor, tillhöra Sovrummet och ha funktionen Temperatur. Meningsfulla skillnader som östra/västra, mätpunkt och datakälla bevaras. Ett avstånd till en annan Bermuda-mätpunkt får även den mätpunktens område som precisering.

Huvudfunktioner använder enhetens namn. Svenska funktionsnamn används; produktnamn, protokoll, förkortningar och kända värdnamn behålls när de identifierar källan. Beräknad effekt/energi skiljs från uppmätta värden. Delade och virtuella resurser får sammanhang där det behövs; ingen okänd placering eller ägare har hittats på.

För ID:n används `domän.område_enhet_funktion` med gemener och ASCII. Föräldraenhet och källprecisering tas med när det behövs för entydighet. HA:s globala standard för nya ID:n är kvar. Namnbyte ändrar inte automatiskt ett befintligt ID. Gamla namn bevaras som alternativa alias där lämpligt; ordningen för primärt alias är bevarad. `null` i aliasunderlaget betyder HA:s beräknade standardnamn.

Källor: [HA:s rekommendationer om namn och ID-format](https://www.home-assistant.io/docs/configuration/customizing-entities/) och [lanseringen av 2026.11](https://www.home-assistant.io/blog/2026/11/04/release-202611/).

## Beroenden och kontroller

Migrationen gjordes i små API-etapper och en samordnad slutetapp. Slutetappen uppdaterade 978 ID:n, 30 aktiva källfiler och 19 lagrade konfigurationer. Den sista textkontrollen rättade dessutom två ID-hänvisningar i felmeddelanden. Automationskällor, skript, mallar, hjälpare, energiinställningar, personkopplingar, favoriter och kontrollpaneler har följt med. Dynamiska urval, recorder-globbar, egna kort och integrationsspecifika referenser ingick. 166 integrationstitlar samordnades i slutetappen; den fysiska Shelly-tvåkanalsenhetens titel preciserades därefter. Hundra tidigare globmatchade recorder-undantag bevarades uttryckligen under de nya ID:na.

HA:s vanliga register-API användes för ID-byten. Lagrade konfigurationer som krävde en gemensam övergång skrevs endast medan HA-kärnan var verifierat stoppad; den startades därefter igen. Avbrutna försök återställdes och räknas inte som genomförda ändringar.

Slutkontrollen visar:

- Giltig HA-konfiguration utan fel eller varningar.
- Samma registeridentiteter, tekniska inställningar, enhetskopplingar, aktivering, döljning och etiketter i slutjämförelsen. Avsiktliga namn-/ID-/områdesändringar är dokumenterade.
- Ursprungliga på-/avlägen för 81 automationer återställda.
- Inga nytillkomna integrationsstartfel eller tillgänglighetsregressioner i slutjämförelsen.
- Inga föråldrade migrerade ID-referenser i den avslutande kontrollen av inventerade aktiva källor och lagrade konfigurationer. [Kontrollresultat](slutlig-referenskontroll.json).
- Historik och statistik jämförda i ID-etapperna. Enbart slutetappen jämförde 213 681 historikposter och 6 339 statistikpunkter; 307 statistikdefinitioner följde med. Jämförelserna avser avgränsade tidsperioder, inte installationens alla historikrader.
- Egna OpenWrt-/Thread-korts namnlogik och adressering samt Plants sju registeruppslag har klarat regressionstester.

Detta är konfigurations-, referens- och tillståndskontroller. Ingen visuell webbläsarprovning eller manuell aktivering av lampor, lås, värme eller laddning har gjorts. Det ger inte en garanti för varje framtida automationsgren eller okänd extern konsument. **Ladda om redan öppna kontrollpaneler så att nya referenser och kortversioner läses in.**

## Avsiktligt bevarade identiteter

113 register-ID:n har dokumenterade kompatibilitets- eller restpunktsskäl. [Fullständig lista](id-kompatibilitetsundantag.json). Visningsnamn kan vara enhetliga även när ett ID behöver vara stabilt.

Google Assistant har 36 exponerade entiteter. Alexa är globalt avstängt men har 41 sparade exponeringar. Dessa externa identiteter har bevarats; sju äldre temperatur-ID:n återställdes med sina beroenden. ESPHome-importer, Music Assistant-spelaridentitet och Schedulers fasta arbetsdagsreferens behölls också. Sophämtningskalenderns ID behölls eftersom historik-API:ts jämförelse inte var identisk efter ett provbyte: en inledande gränsrad skiljde sig i text. Dess namn är Sophämtning NVAA.

Tekniska `unique_id`, UUID, protokolladresser, firmware-nodnamn, värdnamn, enumvärden, skriptens tjänstenamn/YAML-nycklar och kontrollpanelernas URL:er är stabila identiteter. Ett skripts tjänstenamn kan därför skilja sig från dess nya entitets-ID; tjänsteanrop och `target.entity_id` har hanterats var för sig. Även 108 äldre kända enheters tracker-källnycklar behölls; visningsnamn samordnades där exakt MAC-koppling fanns. Historiska loggtexter, spår och säkerhetskopior har inte skrivits om.

## Restpunkter och underhåll

Endast Slider (`input_number.slider`) och Blomlampa (ateljén)/ESPHome09 med länkade poster är uppskjutna enligt användaren. [Restpunkter](RESTPUNKTER.md).

Plant har en lokal rättning i sju konstruktorgrenar: befintligt registrerat ID används innan härledda sensorer fångar sin källa. Kontrollera rättningen vid en framtida uppdatering av Plant; integrationens uppdatering kan skriva över lokal kod. [Lokal Plant-rättning](plant-registeridentitet.patch). Test: `python3 tools/test_ha_naming_plant.py`. Korttest: `node tools/test_ha_naming_cards.cjs`.

ESPHome-källornas firmware-nodnamn har bevarats och ingen firmware har laddats upp. WiFi-omskanningsskriptets namnmatchning och noduppslag är anpassade till nya ID:n. De nodspecifika scan_wifi-API-åtgärder som saknades redan före migrationen skapas inte av namnändringen; den befintliga funktionsbegränsningen kvarstår tills firmwarefrågan hanteras separat.

För framtida kontroll finns `python3 tools/ha_naming_audit.py`. Det är ett läsande verktyg som söker föråldrade ID-referenser och visar nya eller ändrade registerposter jämfört med granskningsmanifestet. Det byter inga namn. Manifestet ska uppdateras först efter saklig granskning av kommande ändringar.

## Inventering och återställning

- [Alla registerentiteter före/efter](hela-entitetsinventeringen.csv)
- [Alla enhetsposter före/efter](hela-enhetsinventeringen.csv)
- [Källstyrda entiteter utan registerpost](entiteter-utan-registerpost.csv)
- [Genomförd ID-karta CSV](genomford-id-karta.csv) / [JSON](id-karta.json)
- [Maskinläsbar status](status.json)
- [Säkerhetskopior och återställning](ATERSTALLNING.md)

Startkopian är **22f83cfa**. Den fullständiga kopian före slutetapperna är **d1a7d04b**. Dessa omfattar HA och MariaDB; centrala filer har provlästs ur arkiven. Den fullständiga slutkopian **8dc2d539** är skapad utan fel på Backup och extra lokalt; arkivet är provläst och det sparade namnregistret stämmer med slutgranskningen. Detaljer och SHA-256 finns i återställningsanvisningen och statusfilen. Ingen fullständig provåterställning till en körande separat HA-instans har gjorts.

Etappplaner finns här i dokumentmappen. Privata före-/efterkopior, verifieringar och journaler finns under `/homeassistant/backups/namnstandard_20261107/` och `/homeassistant/backups/namnstandard_20261108/`. De kan innehålla känslig konfiguration och ska inte publiceras.
