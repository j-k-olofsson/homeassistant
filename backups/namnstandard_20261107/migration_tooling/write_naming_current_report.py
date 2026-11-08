import json,pathlib,datetime,zoneinfo
P=pathlib.Path('/homeassistant');D=P/'docs/namnstandard';R=P/'backups/namnstandard_20261107';s=json.load(open(D/'status.json'));b=json.load(open(R/'checkpoint_backup_info.json'))['data'];tz=zoneinfo.ZoneInfo('Europe/Stockholm');when=datetime.datetime.fromisoformat(b['date']).astimezone(tz).strftime('%Y-%m-%d %H.%M')
text=f'''# Enhetlig namnsättning – aktuellt arbete

Start: 7 november 2026. HA 2026.11.0. Detta är en pågående migration i verifierade etapper. **Hela uppdraget är ännu inte färdigt.**

## Genomfört och verifierat

- **{s['device_names_changed_unique']:,} enhetsposter** har fått enhetligare namn.
- **{s['entity_names_changed_unique']:,} entiteter** har fått enhetligare svenska funktionsnamn.
- Tidigare fullständiga namn har säkrats som alias för **{s['aliases_secured_unique']:,} entiteter**.
- **{s['ids_changed']} entitets-ID:n** har migrerats: klimatgivarna på Toaletten som pilot, därefter övriga klimatgivare av samma typ.
- **{s['device_areas_changed_unique']} enhetsposter** har korrigerad områdestilldelning. Detta inkluderar nätverksrepresentationer av samma fysiska utrustning och betyder inte {s['device_areas_changed_unique']} separata fysiska produkter.
- Den globala slutjämförelsen omfattar alla **{s['registered_entities']:,} registerentiteter** och **{s['registered_devices']:,} enhetsposter**.
- Tekniska identiteter, enhetskopplingar, aktivering, döljning, enheter, klasser och etiketter har verifierats mot utgångsläget. De avsiktliga ID- och områdesändringarna finns i journalerna.
- För ID-migrationen har **{s['history_records_verified']:,} historikposter** och **{s['statistics_points_verified']:,} statistikpunkter** jämförts före och efter. {s['statistics_metadata_migrated']} statistikdefinitioner följde med. Jämförelsen avser avgränsade perioder, inte varje historikrad sedan installationen skapades.
- Inga gamla av de 55 migrerade ID:na hittades i de kontrollerade aktiva YAML-källorna, registrerade kontrollpanelerna, hjälparkonfigurationerna, områdessensorerna eller favoriterna.
- Konfigurationskontrollen är godkänd: `valid`, utan fel eller varningar.

Det finns dessutom **{s['state_entities_without_registry']} tillståndsentiteter utan registerpost**. De är separat inventerade och måste vid behov ändras i sin källa; de kan inte hanteras som vanliga registerbyten.

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

Vid jämförelsen mot utgångsläget hade {s['equivalent_explicit_google_exposure_false_additions']} entiteter fått ett uttryckligt `cloud.google_assistant.should_expose: false` där fältet tidigare saknades. Ingen annan optionsändring godtogs av slutjämförelsen. De var redan undantagna genom avstängning eller tidigare exponeringsinställningar/defaultfilter; ingen hade tidigare uttryckligt `true`. Dessa likvärdiga avmarkeringar har bevarats. Arbetsverktygen skriver inte detta fält.

## Bekräftade beslut från användaren

- Inga externa beroenden av HA-ID:n är kända.
- Blomlampa 2 är i Köket. Det gamla Verandan-suffixet har tagits bort.
- Taklamporna som låg i Entrén är i Köket. Området är korrigerat och namnet skiljer dem från andra kökslampor.
- LED-listerna tillhör rummen i sina namn. Områdena är korrigerade; rumsord tas bort ur själva enhetsnamnen medan väderstreck och andra särskiljande detaljer behålls.
- Frösåddslampan är inte aktiv. Dess driftstatus har inte ändrats.

## Kvarstående arbete

1. Klargör användningen av `input_number.slider` och placeringen för Blomlampa (ateljén)/ESPHome09, som nu är tilldelad Köket. Namn/placering för dessa har inte gissats.
2. Granska återstående automatiska namn, oklara generiska kontrollpanelshjälpare och de 111 entiteterna utan registerpost. Många native svenska namn och tekniska produkt-/värdnamn kan behållas; oförändrat betyder inte automatiskt fel.
3. Samordna integrationsposternas titlar, helperalternativens interna namn och återstående källnamn. En titeländring kan starta integrationens uppdateringslyssnare och behöver därför granskas per integration. ESPHome-firmwarekällor har inte generellt skrivits om eller laddats upp.
4. Förbered återstående ID-byten per sammanhängande grupp. Identifiera också globmönster, dynamiskt byggda namn, lokala JavaScript-standardvärden och integrationsspecifika källreferenser; exakta textsökningar räcker inte ensamma.
5. Hantera hjälpares konfigurationsposter via stödda flöden/API:n, kontrollpaneler, energiinställningar, röstexponering, historik/statistik och berörda egna komponenter tillsammans med respektive ID-byte. En olöst beroendetyp stoppar just den gruppen.
6. Verifiera samma tekniska identitet, inställningar, tillstånd, historik/statistik och användning efter varje grupp. Aktiverande funktionstester planeras efter sin faktiska effekt.
7. Avsluta med full inventeringsavstämning, kvarvarande referenser, visuell panelkontroll och ytterligare återställningspunkt. Först därefter är hela uppdraget färdigt.

Inga manuella funktionstester har tänt/släckt lampor, styrt lås eller startat värme/laddning. Ingen HA-omstart eller firmwareutrullning har gjorts. De nödvändiga källomladdningarna för ID-byten och meddelandemallar har gjorts separat och dokumenterats.

## Säkerhetskopior och underlag

- Fullständig kopia före ändringar: **22f83cfa**, cirka 6,2 GB, på nätverksplatsen Backup och som extra lokal kopia. Centrala filer har provlästs ur arkivet. En full återläsning till en startad HA-instans har inte provats.
- Ny kontrollpunkt: **{b['slug']}**, skapad {when} svensk tid, cirka {b['size_bytes']/1e9:.2f} GB. Den innehåller HA-konfiguration och MariaDB, inklusive databasen. Det är en delkopia; övriga appar finns i den fullständiga startkopian. Supervisor har rapporterat slutförd kopiering utan fel. Denna kontrollpunkt har inte provåterlästs.
- [Återställningsanvisning](ATERSTALLNING.md)
- [Aktuell status](status.json)
- [Alla registerentiteter med namn före/efter och status](hela-entitetsinventeringen.csv)
- [Alla enhetsposter](hela-enhetsinventeringen.csv)
- [Tillståndsentiteter utan registerpost](entiteter-utan-registerpost.csv)
- [Genomförd ID-karta](genomford-id-karta.csv)
- [ID-karta som JSON](id-karta.json)
- [Svensk funktionsordlista](namnordlista.json)

Etappfilerna visar exakt vilka ändringar som planerats. Verifieringsresultat och känsligare före-/efterkopior finns i den privata arbetsmappen `/homeassistant/backups/namnstandard_20261107/`.
'''
(D/'README.md').write_text(text.replace('10,129','10 129').replace('1,066','1 066'))
old=P/'docs/ha-namnstandard-20261107.md';v=old.read_text();note='> Historisk förstudie före migrationen. [Aktuell arbetsstatus och genomförda ändringar](namnstandard/README.md).\n\n'
if not v.startswith('> Historisk'):old.write_text(note+v)
a=D/'ATERSTALLNING.md';text=a.read_text();text+='''\n## Kontrollpunkt efter namnfasen och de första ID-bytena\n\n'''+f'''Backup-ID: `{b['slug']}`. Namn: **{b['name']}**. Skapad {when} svensk tid. Cirka {b['size_bytes']/1e9:.2f} GB på nätverksplatsen Backup.\n\nDenna delkopia innehåller HA-konfiguration och MariaDB inklusive databasen, vid den verifierade kontrollpunkten med 55 migrerade klimat-ID:n. Övriga appar ändrades inte i namnfasen och ingår i den fullständiga startkopian. Supervisor har rapporterat färdig backup utan fel; en faktisk återläsning har inte provats.\n\nID-etappernas mappar `08-id-pilot-toaletten` och `09-id-klimatsensorer` innehåller ID-kartor, berörda källfiler/paneler, historik-/statistikjämförelser och journaler. Vid återgång måste ID:n och deras beroenden återföras tillsammans. Verktyget för vanliga namnbyten ska inte användas som ensam återställning av ID-etapper. En säker full återgång till startläget finns i kopian `22f83cfa`; en återgång till den nya kontrollpunkten använder `{b['slug']}`.\n\n`13-natverkskort-kontext` innehåller före-/efterkopior av kartornas JavaScript och resursregistreringar. Återställ respektive skript och dess resursversion tillsammans, och ladda därefter om kontrollpanelen.\n'''
a.write_text(text)
status=s;status['checkpoint_backup']={'slug':b['slug'],'type':b['type'],'size_bytes':b['size_bytes'],'location':b['locations'],'restore_tested':False};status['network_card_context_tests']='passed';status['visual_browser_test']=False
(D/'status.json').write_text(json.dumps(status,ensure_ascii=False,indent=2)+'\n')
print('Report updated',s['entity_names_changed_unique'],s['device_names_changed_unique'],s['ids_changed'])
