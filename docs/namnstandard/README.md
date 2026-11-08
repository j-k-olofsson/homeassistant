# Enhetlig namnsättning – aktuellt arbete

Start: 7 november 2026. HA 2026.11.0. Detta är en pågående migration i verifierade etapper. **Hela uppdraget är ännu inte färdigt.**

## Genomfört och verifierat

- **261 enhetsposter** har fått enhetligare namn.
- **7 173 entiteter** har fått enhetligare svenska funktionsnamn.
- Tidigare fullständiga namn har säkrats som alias för **7 774 entiteter**.
- **90 entitets-ID:n** har migrerats: 55 klimatgivare och 35 firmware-entiteter.
- **103 enhetsposter** har korrigerad områdestilldelning. Detta inkluderar nätverksrepresentationer av samma fysiska utrustning och betyder inte 103 separata fysiska produkter.
- Den globala slutjämförelsen omfattar alla **10 129 registerentiteter** och **1 066 enhetsposter**.
- Tekniska identiteter, enhetskopplingar, aktivering, döljning, enheter, klasser och etiketter har verifierats mot utgångsläget. De avsiktliga ID- och områdesändringarna finns i journalerna.
- För ID-migrationen har **1 773 historikposter** och **989 statistikpunkter** jämförts före och efter. 43 statistikdefinitioner följde med. Jämförelsen avser avgränsade perioder, inte varje historikrad sedan installationen skapades.
- Inga gamla av de 90 migrerade ID:na hittades i de kontrollerade aktiva YAML-källorna, registrerade kontrollpanelerna, hjälparkonfigurationerna, områdessensorerna eller favoriterna.
- Konfigurationskontrollen är godkänd: `valid`, utan fel eller varningar.

Det finns dessutom **111 tillståndsentiteter utan registerpost**. De är separat inventerade och måste vid behov ändras i sin källa; de kan inte hanteras som vanliga registerbyten.

Enhetsposter kan komma från flera integrationer för samma hårdvara. Vi har använt HA:s stödda lista över länkade enheter för att samordna OpenWrt-posternas namn med utrustningen de representerar. Länkningen bygger på gemensamma registrerade anslutningsidentiteter, inte på gissningar utifrån en IP-adress.

## Gemensam namnprincip

Visningsnamn skrivs på svenska med korrekt stavning. Produktnamn, värdnamn, protokoll och etablerade förkortningar behålls när de identifierar saken.

- Område: ett konsekvent namn på rummet eller platsen.
- Enhet: vad den är, med en meningsfull skillnad mellan flera enheter i samma område.
- Entitet: funktionen eller mätvärdet, exempelvis Temperatur, Luftfuktighet, Effekt eller Energi.
- Huvudfunktion: enhetens namn när det är entydigt.
- Flera mätpunkter: skillnader som Temperatur rum och Temperatur frysbox bevaras.
- Beräknade värden: ordet Beräknad skiljer dem från uppmätta värden. Powercalc-källor som delar enhet skiljs även efter den faktiska källans typ, exempelvis belysning respektive brytare.
- Hjälpare, skript och automationer: beskrivande svenska namn, med `–` som avskiljare när en funktion behöver en precisering.
- Kontrollpaneler: lokalt begripliga kortnamn eller dynamiska namndelar. Kartor över flera rum visar områdeskontext.

ID-principen är `domän.område_enhet_funktion`, med svenska ord i ASCII. Parent device används när det behövs för att skilja en del. Huvudentiteter får inget redundant funktionssuffix. Tekniska `unique_id`, enhets-UUID, nodnamn och protokolladresser behålls som identiteter.

Exempel: `sensor.sovrummet_klimatsensor_temperatur` och `sensor.koket_klimatsensor_luftfuktighet`.

HA:s befintliga inställning för nygenererade ID:n är standardvärdet och har lämnats kvar. Befintliga ID:n behöver behandlas separat från denna inställning. [HA:s namn- och ID-dokumentation](https://www.home-assistant.io/docs/configuration/customizing-entities/).

## Genomförda etapper

| Etapp | Innehåll |
|---|---|
| 01 | Klimat- och plantsensorernas enhets- och funktionsnamn |
| 02 | ESPHome-namn i HA, med huvudfunktioner och särskilda mätpunkter bevarade |
| 03 | Shelly, BTHome, vitvaror, batteriinformation, kamera och termostater |
| 04 | Hjälpare, grupper, skript, automationer och mallentiteter |
| 05 | Källnamn, meddelandemallar och kontrollpanelernas namnval |
| 06 | Växtövervakning och tydligt åtskild beräknad energi/effekt |
| 07 | Bekräftade rumsplaceringar och namn för berörda kökslampor/LED-lister |
| 08 | Fem klimat-ID:n på Toaletten, inklusive historik-/statistikverifiering |
| 09 | Ytterligare 50 klimat-ID:n och deras beroenden |
| 10 | Samordning av länkade nätverksposters namn och områden |
| 11 | Mobil- och nätverksfunktioner enligt svensk ordlista, i 26 grupper om högst 250 namn |
| 12 | Tydliga router-/accesspunktsnamn och återstående kända funktionsnamn |
| 13 | Områdeskontext i OpenWrt- och Thread-kartornas etiketter |
| 14 | 35 firmware-ID:n, med identitets-/historikverifiering och utan firmwareinstallation |

Varje namnetapp har förkontroll, ändringsjournal, registerjämförelse, kontroll av målens tillgänglighet och konfigurationskontroll. ID-etapperna har dessutom jämförelser av historik, statistik och beroenden. Antal operationer i etappfilerna inkluderar alias och kan överlappa; totalsiffrorna ovan avser unika poster.

### Beroenden som uppdaterats

- Hem och Friggan: referenser till de nya klimat-ID:na.
- Hem: tio termostatkort med område/enhet som namn, förtydligade korttexter och en uppdaterad dynamisk musikmall.
- HA–Admin: förtydligade korttexter.
- Sju generiska termostat-/hygrostatkopplingar: deras sensorkällor följde ID-bytena genom integrationernas registerlyssnare. De sparade alternativen kontrollerades efteråt.
- Områdenas temperatur-/fuktgivare och två favoriter: uppdaterade till nya ID:n.
- Två automationer som använder de berörda klimatgivarna: deras källreferenser uppdaterades och de laddades om separat. Ursprungligt på-/avläge bevarades.
- Växt- och batterimeddelanden: använder `custom_templates/ha_namn.jinja`, som bygger namn från område, enhet och funktion. De två automationerna laddades om separat när de inte körde.
- Namn/alias i nio YAML-filer: uppdaterade där källans identitet var stabil. Styrvillkor och åtgärder ändrades inte av namnstädningen.

Kartkomponenterna läste tidigare rena enhetsnamn. De visar nu exempelvis `Sovrummet LED-list östra` respektive `Köket LED-list östra`. JavaScript-syntax, namnlogik och adressering oberoende av entitets-ID har testats med verkliga registerdata och kontrollerade exempel. Resursversionerna har uppdaterats och levererade skript kontrollerats. Ingen visuell webbläsarprovning har gjorts. **Ladda om berörda kontrollpaneler för att läsa in de nya skripten.**

### Övrig registeravvikelse som har kontrollerats

Vid jämförelsen mot utgångsläget hade 152 entiteter fått ett uttryckligt `cloud.google_assistant.should_expose: false` där fältet tidigare saknades. Ingen annan optionsändring godtogs av slutjämförelsen. De var redan undantagna genom avstängning eller tidigare exponeringsinställningar/defaultfilter; ingen hade tidigare uttryckligt `true`. Dessa likvärdiga avmarkeringar har bevarats. Arbetsverktygen skriver inte detta fält.

## Bekräftade beslut från användaren

- Inga externa beroenden av HA-ID:n är kända.
- Blomlampa 2 är i Köket. Det gamla Verandan-suffixet har tagits bort.
- Taklamporna som låg i Entrén är i Köket. Området är korrigerat och namnet skiljer dem från andra kökslampor.
- LED-listerna tillhör rummen i sina namn. Områdena är korrigerade; rumsord tas bort ur själva enhetsnamnen medan väderstreck och andra särskiljande detaljer behålls.
- Frösåddslampan är inte aktiv. Dess driftstatus har inte ändrats.
- Slider och Blomlampa (ateljén)/ESPHome09 utreds senare enligt användarens besked. De blockerar inte övrig migration. De och motsvarande länkade enhetsposter är spärrade för fortsatt namn-/ID-ändring i arbetsverktygen tills de har utretts.

## Kvarstående arbete

1. **Restpunkter enligt användaren:** `input_number.slider` har okänt syfte. Blomlampa (ateljén)/ESPHome09 har oklar placering och är tilldelad Köket. Dessa utreds senare och blockerar inte övrigt arbete. Namn och identiteter behålls tills vidare.
2. Granska återstående automatiska namn, oklara generiska kontrollpanelshjälpare och de 111 entiteterna utan registerpost. Många native svenska namn och tekniska produkt-/värdnamn kan behållas; oförändrat betyder inte automatiskt fel.
3. Samordna integrationsposternas titlar, helperalternativens interna namn och återstående källnamn. En titeländring kan starta integrationens uppdateringslyssnare och behöver därför granskas per integration. ESPHome-firmwarekällor har inte generellt skrivits om eller laddats upp.
4. Förbered återstående ID-byten per sammanhängande grupp. Identifiera också globmönster, dynamiskt byggda namn, lokala JavaScript-standardvärden och integrationsspecifika källreferenser; exakta textsökningar räcker inte ensamma.
5. Hantera hjälpares konfigurationsposter via stödda flöden/API:n, kontrollpaneler, energiinställningar, röstexponering, historik/statistik och berörda egna komponenter tillsammans med respektive ID-byte. En olöst beroendetyp stoppar just den gruppen.
6. Verifiera samma tekniska identitet, inställningar, tillstånd, historik/statistik och användning efter varje grupp. Aktiverande funktionstester planeras efter sin faktiska effekt.
7. Avsluta med full inventeringsavstämning, kvarvarande referenser, visuell panelkontroll och ytterligare återställningspunkt. Först därefter är hela uppdraget färdigt.

Inga manuella funktionstester har tänt/släckt lampor, styrt lås eller startat värme/laddning. Ingen HA-omstart eller firmwareutrullning har gjorts. De nödvändiga källomladdningarna för ID-byten och meddelandemallar har gjorts separat och dokumenterats.

Sju ytterligare firmware-ID-förslag har identifierade äldre exponeringsposter som behöver hanteras separat innan just de ID:na byts. De ingår inte i de 90 genomförda bytena. Övriga exkluderingar och förslag finns i [firmwareplanen](id-plan-14-firmware.json).

## Säkerhetskopior och underlag

- Fullständig kopia före ändringar: **22f83cfa**, cirka 6,2 GB, på nätverksplatsen Backup och som extra lokal kopia. Centrala filer har provlästs ur arkivet. En full återläsning till en startad HA-instans har inte provats.
- Ny kontrollpunkt: **d59ec955**, skapad 2026-11-07 18.55 svensk tid, cirka 4.87 GB. Den innehåller HA-konfiguration och MariaDB, inklusive databasen. Det är en delkopia; övriga appar finns i den fullständiga startkopian. Supervisor har rapporterat slutförd kopiering utan fel. Denna kontrollpunkt har inte provåterlästs.
- [Återställningsanvisning](ATERSTALLNING.md)
- [Aktuell status](status.json)
- [Restpunkter som utreds senare](RESTPUNKTER.md)
- [Alla registerentiteter med namn före/efter och status](hela-entitetsinventeringen.csv)
- [Alla enhetsposter](hela-enhetsinventeringen.csv)
- [Tillståndsentiteter utan registerpost](entiteter-utan-registerpost.csv)
- [Genomförd ID-karta](genomford-id-karta.csv)
- [ID-karta som JSON](id-karta.json)
- [Svensk funktionsordlista](namnordlista.json)

Etappfilerna visar exakt vilka ändringar som planerats. Verifieringsresultat och känsligare före-/efterkopior finns i den privata arbetsmappen `/homeassistant/backups/namnstandard_20261107/`.

Kontrollpunkten `d59ec955` skapades före etapp 14. De efterföljande 35 firmware-ID-bytena har separata före-/efterkopior, ID-karta och verifieringsjournal i `14-id-firmware/`.
