# Elprognos V2 – parallell drift från 8 november 2026

> Nyare utvärdering och avgiftsavstämning: [analys 9 november 2026](elprognos-analys-20261109.md).

## Användning

Öppna **Elpris → Elprognos V2**, sökväg `/dashboard-elpris/prognos-v2`.
Den nya vyn visar befintlig kvartprognos, V2 och ett enkelt 30-dagarssnitt,
historikgrafer, scenarier, förbrukning och datatäckning. Befintliga vyer och
`packages/elkostnad_quarter.yaml` är bevarade.

V2 uppdateras var femtonde minut, men uppmätt energi avser senast avslutade
timme som recorder har hunnit sammanställa. `measured_until` anger gränsen.
Första kontrollen gav 30 kompletta dygns underlag och 100 % täckning för
månadens avslutade statistiktimmar. Detta är datatäckning, inte prognossäkerhet.

## Modell

1. Läs elmätarens energistatistik via HA:s recorder-API. Energi kommer från
   `sensor.utomhus_elmatare_elstolpen_forbrukad_energi`, i kWh. Effektsensorn
   används inte för att uppskatta förbrukad energi.
2. Bygg tim- och veckodagsprofil från de senaste 30 kompletta lokala dygnen.
   Dygnen viktas med exponentiell tidskonstant 14 dygn. Exakt veckodag används
   när minst tre observationer finns, annars vardag/helg och i sista hand alla
   motsvarande timmar. Ofullständiga dygn ingår inte i träningsunderlaget.
3. Anpassa profilens nivå till de senaste sju dygnen om minst fem är kompletta:
   uppmätt energi dividerad med profilens energi för dessa timmar. Faktorn
   begränsas till 0,5–2,0. Det gör modellen känsligare för ändrad drift utan att
   kasta bort 30-dagarsprofilen. Begränsningen är en modellregel, ingen fysisk lag.
4. Summera månadens uppmätta energi separat. Beräkna bara återstående energi
   med prognosprofilen. En saknad historiktimme uppskattas uttryckligen och
   sänker datatäckningen; `estimated_energy` anger mängden.
5. Hämta råa SE3-priser via befintliga tjänsten `nordpool.hourly`, SEK/MWh,
   och omvandla till SEK/kWh. Priser med faktiskt publicerade intervall används
   direkt. För övriga framtida intervall används en viktad timprisprofil från
   senaste 30 dygn. Framtida publicerade priser tränar inte den profilen.
6. Rörligt pris = `(spotpris + rörliga avgifter) × (1 + moms/100)`.
   Total månadskostnad = rörlig kostnad hittills + förväntad återstående rörlig
   kostnad + en fast månadsavgift.

Det enkla 30-dagarssnittet använder samma kostnadsunderlag och prisantagande
som V2 men jämn förbrukning över återstående timmar. Jämförelsen mellan dessa
två isolerar därför huvudsakligen förbrukningsmodellens inverkan.

Scenarierna kombinerar ±15 % framtida energi och ±30 % okänt rått spotpris,
med minst ±0,10 kr/kWh prisskillnad. Publicerade priser ändras inte mellan
scenarierna. Negativa priser hanteras med lägsta/högsta av kombinationerna.
Scenarierna är inte statistiska konfidensintervall.

## Avgifter och begränsningar

Nuvarande hjälpare används: handelsavgift, spotpåslag, certifikat,
överföringsavgift, energiskatt, moms och månadsavgifter elhandel+nät.
Vid start är de rörliga avgifterna tillsammans 0,8355 kr/kWh före moms,
momsen 25 % och den fasta månadsavgiften 734,64 kr.

Avgiftshjälparna antas innehålla belopp före moms; fast månadsavgift antas vara
slutbelopp inklusive eventuell moms. Detta behöver stämmas av mot avtal/faktura.
Effekttariff, särskilda tidsberoende nätavgifter, fakturarabatter och andra
avgifter utanför dessa hjälpare ingår inte. Ingen befintlig avgift har ändrats.

Misstanken om dubbel moms i den gamla kvartprognosen **bekräftades inte**.
För 8 november 20:30 svensk tid var råpriset 2,41774 kr/kWh och inköpssensorn
2,42 kr/kWh. Gammal kvartprissensor gav 4,06937 kr/kWh; V2:s råprisbaserade
beräkning ger 4,06655 kr/kWh. Skillnaden här förklaras av avrundning.
Nordpool-sensorn `sensor.nordpool` har en annan avgiftsmall och används därför
inte som V2:s faktiska totalpris. Den gamla prognosen lämnas som referens.

Historiska avgifter före V2-start finns inte säkert versionslagrade. Dessa
perioder räknas med startens avgifter och märks med `historical_tariff_energy`.
Efter start sparas observerade ändringar av hjälparna som en tidslinje. För
femminutersintervall som korsar en avgiftsändring används intervallets start.

Femminutersenergi används för kostnaden när samtliga tolv värden finns i en
timme och summan stämmer med timstatistiken inom max(0,05 kWh, 2 %).
Annars fördelas timmens energi jämnt inom timmen. Äldre energikostnad kan då
vara approximativ vid kvartpriser. `fine_energy_percent` visar andelen energi
med finare fördelning. Saknat historiskt råpris uppskattas och redovisas i
`missing_price_energy`. Ingen sådan lucka fanns i första månadskontrollen.

Nollförbrukning är giltig. Okända, negativa, icke-finita och orimliga positiva
energidifferenser förkastas; gränsen är 40 kW räknat över respektive intervall.
Ackumulerade hopp direkt efter ett statistikhål används inte som en enskild
timmes förbrukning. Mätarfel kan ändå kräva särskild granskning. Statistik mer
än tre timmar efter visas som otillgänglig prognos, inte som ett nytt nollvärde.

Väderjustering, separata lastplaner för bil/pool och maskininlärning är inte
aktiverade. Först behövs ett lämpligt temperaturunderlag och en oberoende
utvärdering av om tilläggen förbättrar prognosen. Modellen är deterministisk.

## Historiskt utvecklingstest

Underlaget är sparad timstatistik från ungefär maj–november 2026. Kompletta
månader juni, juli och oktober kunde utvärderas; augusti och september
uteslöts på grund av hål i energistatistiken. Prognoser gjordes vid gränsen
till dag 1, 7, 15 och 25, med endast energitimmar före prognosgränsen i
träningsunderlaget. Testet använder slutligt lagrad statistik, inte historiska
versioner eller exakta mottagningstider för den. Dag 1 saknar månadsbaslinje.

För de nio gemensamma tillfällena dag 7, 15 och 25:

| Modell | Medel absolut fel, kWh | Medel absolut procentfel |
|---|---:|---:|
| V2, veckoadapterad 30-dagarsprofil | 130,21 | 5,61 % |
| Viktad profil utan veckoadaptering | 165,35 | 6,68 % |
| Enkelt 30-dagarssnitt | 186,86 | 7,42 % |
| Jämförbar extrapolering av innevarande månads energi | 130,60 | 5,70 % |

V2 är inte bäst vid varje tillfälle. Det enkla 30-dagarssnittet var exempelvis
bättre i oktober, och månadsmodellen bättre i juni. Den nya veckoadapteringen
tillkom efter att den första profilen provats på samma data. Siffrorna är därför
ett utvecklingstest med litet urval, inte en oberoende verifiering av överlägsen
träffsäkerhet. Månadsbaslinjen här är en energimodell, inte ett historiskt test
av den gamla SQL-kostnadsprognosen.

Kostnadsprognoserna behöver följas prospektivt. Historiska kvartavgifter och
publiceringstidpunkter räcker inte för ett trovärdigt komplett kostnadsbacktest.

## Löpande jämförelse

Alla tre kostnadsprognoser syns i jämförelsevyn med en sjudygnsgraf. V2:s
energiprognos och enkelt 30-dagarssnitt visas separat. Nya sensorsystemet
ersätter inga källor i den befintliga energipanelen och styr inga laster.

Den senaste prognosen varje lokalt datum sparas med tidsstämpel, V2, enkel
modell, gammal prognos, scenarios och kvalitet. Dessa dagssnapshots behålls
400 dagar oberoende av recorders tio dagars detaljhistorik. De är underlag för
senare uppföljning; ingen full månad med V2 finns ännu. Jämför framför allt
prognoser från samma tidpunkt mot slutlig energi och avstämd kostnad. Lägre
belopp eller mindre variation innebär inte automatiskt högre träffsäkerhet.

Rimliga kontrollpunkter: efter sju dygn och efter första hela månaden, december
2026. November är en delvis efterkonstruerad startmånad. Ingen påminnelse eller
extern notifiering är skapad.

## Databasmigration och drift

`custom_components/elprognos/` innehåller en lokal sensorintegration. Den läser
recorder genom `statistics_during_period` i recorders egen executor och använder
ingen MariaDB-specifik SQL, numeriska metadata-ID:n eller databasadress.

Eget underlag sparas atomiskt i `.storage/elprognos.ledger`:

- Timenergi, upp till 400 dagar.
- Tillgänglig femminutersenergi och råa spotpriser, upp till 70 dagar.
- Avgiftstidslinje samt dagliga prognossnapshots, upp till 400 dagar för snapshots.
- Identitet för elmätare och elområde, för att hindra oavsiktlig återanvändning.

Det gör 30-dagarsunderlaget oberoende av tio dagars detaljhistorik och minskar
beroendet av en framtida recorder-konvertering. HA-konfigurationsbackup ska
innehålla integrationen, paketet och denna lagringsfil. Vid SQLite-byte ska
både konfiguration och ledger följa med; detta ersätter inte migration av
energipanelens historiska statistik. Integrationens HA-API-anrop kan behöva
anpassas vid framtida HA-versionsändringar även om databasmotorn är densamma.
En tom eller ny recorder raderar inte äldre observationer ur V2:s egen ledger.
Nya eller uttryckligen rättade observationer uppdaterar motsvarande intervall.

## Filer och verifiering

- `packages/elprognos_v2.yaml`: separat aktivering.
- `custom_components/elprognos/model.py`: beräkningsmotor utan HA-/databasberoende.
- `custom_components/elprognos/sensor.py`: HA-adapter och fjorton sensorer.
- `tests/elprognos/test_model.py`: beteendetester för tidsgränser, negativa
  priser, datagap, nollvärden, avgiftsändring, persistens och prognosunderlag.
- `tools/elprognos_backtest.py`: upprepningsbart historiskt energitest.
- `tools/elprognos_prepare.py`: engångsbootstrap; vägrar skriva över befintlig ledger.
- `tools/elprognos_dashboard.py`: engångstillägg via HA:s Lovelace-API.
- `tools/test_elprognos_sqlite.py`: isolerat test med HA:s riktiga recorder/SQLite.

Privata mätunderlag, ursprunglig dashboard och oförändrat äldre prognospaket
finns i `backups/elprognos_v2_20261108/`. Resultat från slutkontrollen sparas
som `live_verification.json` och `restart_verification.json` där.

Verifierat: 18 automatiska beteendetester, godkänd `ha core check`, verklig
recorder-läsning från en isolerad temporär SQLite-databas med 1 007 timsteg,
samt tillgängliga sensorer, kostnads-/energibalanser och sparad ledger i drift.
SQLite-testet är inte en konvertering av produktionsdatabasen.

Återgång: ta bort enbart paketet `elprognos_v2.yaml` och starta om HA. Ta bort
enbart vyn med sökvägen `prognos-v2` genom Lovelace, inte genom att skriva över
hela dashboarden från en gammal kopia. Behåll ledger och integrationens filer
som arkiv tills eventuell felsökning är klar. Befintlig prognos fortsätter då
som tidigare. Ingen återställning av produktionsdatabasen behövs för detta.
