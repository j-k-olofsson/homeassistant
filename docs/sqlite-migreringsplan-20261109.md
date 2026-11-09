# MariaDB → SQLite: föreslagen migrationsplan för Heimdal

Bedömning 9 november 2026. Detta är en plan; ingen konvertering eller ändring
av aktiv databas har gjorts i samband med denna bedömning.

## Rekommendation

Behåll MariaDB som aktiv recorder under förberedelser och provmigration.
Konvertera och verifiera en konsekvent kopia. Genomför sedan ett slutligt
byte under ett servicefönster. Bevara MariaDB som fryst återgångspunkt och
historiskt arkiv tills drift och återställningsväg är godkända.

SQLite är HA:s rekommenderade standard, men HA stöder inte dataflytt mellan
motorer. Att bara ta bort `recorder.db_url` skapar inte en konvertering.
[Källa: Recorder](https://www.home-assistant.io/integrations/recorder/).

## Kontrollerat nuläge

- HA Core 2026.11.0, MariaDB 11.4.10.
- Databasschema 53 i både källan och installerade recorder-modeller.
- MariaDB rapporterar 2 260,6 MiB data + index. Detta är inte storleken på alla
  appfiler eller en prognos för SQLite-filens storlek.
- Cirka 328 GB ledigt på värden.
- Recorder har tio dagars historik, auto_purge och auto_repack aktiverade.
- `home-assistant_v2.db` är en tom fil, inte en tidigare historik som kan återtas.
- Egna tabeller `keep_stat_ids` och `granny_profiles` finns kvar och behöver
  dokumenteras/arkiveras eller överföras separat om de har konsumenter.

## Parallell drift

En HA-installations recorder skriver till en databas i taget. Två installerade
motorer innebär inte att nya tillstånd och statistik speglas mellan dem.

Säkert parallellt arbete är MariaDB i produktion och en isolerad SQLite-kopia
för tester. Kopian är en ögonblicksbild; en äldre sådan kan inte bli skarp
utan en ny slutlig konvertering eller en separat verifierad deltaöverföring.
Den enklare slutliga konverteringen rekommenderas här.

En separat full HA-kopia måste vara isolerad från produktionsenheter, MQTT,
externa tjänster, hostens styrgränssnitt och skrivbara produktionsmappar.
Det räcker inte att stänga av några synliga automationer: integrationer kan
utföra åtgärder även av andra skäl. Kör testet utan åtkomst till verkliga
aktorer och utan delad recorder-databas.

Efter skarpt byte kan MariaDB-filerna behållas, men MariaDB är då ett fryst
arkiv och återgångspunkt, inte en uppdaterad reservdatabas.

## Beroenden som måste hanteras

| Del | Åtgärd |
|---|---|
| Energipanel och all långtidsstatistik | Konvertera befintliga serier, metadata, enheter, summor, nollställningsuppgifter, tidsstämplar och referenser. Bevara ID:n. |
| Detaljhistorik och femminutersstatistik | Konvertera alla befintliga recorder-tabeller och relationer; ingen oavsiktlig gallring ingår. |
| Äldre kvartprognos | Porta `packages/elkostnad_quarter.yaml` från MariaDB till SQLite med samma modell och identitet. Jämför på samma frysta underlag och beräkningstidpunkt. |
| Äldre SQL-kostnad | Porta UI-frågan som använder `homeassistant.statistics`, metadata-ID 223/320 och MariaDB-datumfunktioner. Slå upp statistikserier via deras namn. Hårdkodade 1 300 kr är ett separat beräkningsproblem som ska dokumenteras; ändra inte modell och lagring samtidigt utan egen jämförelse. |
| DB-storlek och dygnsräknare | Ersätt information_schema och MariaDB:s tidsuttryck; kontrollera HAGHS-kopplingen och dashboardreferenser. |
| V2 | Ingen MariaDB-specifik SQL. Bevara egen ledger och verifiera statistik-API, prisinhämtning, tariffhistorik och befintliga prognosidentiteter. |
| Fakturautfall | Bevara `.storage/elfaktura.sqlite3` och `.storage/elfaktura.backup.sqlite3`, integration, kort och dashboard. Databasen ska inte konverteras. Verifiera samtliga tio fakturor och revisionshistorik. |
| Hjälpare och avgiftsautomationer | Bevara register och återställningsdata, inklusive årsavgifter och aktuella värden. |
| Närvarosimulering | Verifiera att den får sina sju dagars historik. Behåll tio dagars retention. |
| MariaDB-underhåll | Stäng av OPTIMIZE-jobb, loggsensor och notifieringar vid bytet. Behåll ursprungliga filer för återgång. |
| Övriga MariaDB-klienter | Inventera anslutningar, scripts och externa värdar. En kort kontroll av aktiva anslutningar utesluter inte sällan körda jobb. |

V2:s tidigare test mot en isolerad SQLite-recorder visar att dess API-anrop
fungerar där. Det är inte ett test av konvertering av hela produktionsdatabasen.

## Etapp 1: säkerhetskopiering och jämförelseunderlag

1. Ta en fullständig HA-backup som uttryckligen omfattar MariaDB-appen och
   HA-konfigurationen. Säkerställ åtkomst till krypterings-/återställningsnyckel.
2. Ta även en separat konsekvent MariaDB-export med alla aktuella tabeller.
   Kontrollera lagringsmotorer innan transaktionsbaserad export väljs.
3. Spara konfiguration, register, hjälparvärden, energiinställningar, SQL-frågor,
   dashboards och egna databaser/ledger från samma dokumenterade kontrollpunkt.
4. Lägg en verifierad kopia utanför värden och prova återställning isolerat.
5. Spara tabellantal, datointervall, metadata och centrala API-resultat mot den
   frysta källkopian. Jämför aldrig en fryst SQLite-fil mot en MariaDB som
   fortsatt ta emot nya rader utan att först avgränsa samma underlag.

## Etapp 2: provkonvertering

- Välj och granska en konverterare för exakt installerad HA-/schemaversion.
  Lås verktygsversionen. En generell SQL-dump kan inte importeras rakt av.
- Kör mot en separat källkopia och en ny SQLite-fil, inte mot produktion.
- Skapa schema från rätt recorder-modeller. Kontrollera äldre kvarvarande
  kolumner mot dessa så att inga data hoppas över utan redovisning.
- Bevara primärnycklar, metadatareferenser, tidigare-tillståndslänkar,
  binära kontext-ID:n, text/Unicode, NULL och numeriska värden.
- Kontrollera även schemaversion, index, nycklar och nya insättningar.
- Stoppa automatisk rensning/ompackning i testmiljön under jämförelsen.
  Produktionsinställningarna är fortsatt oförändrade.
- Mät konvertering, indexbygge, verifiering, start och återställning. Använd
  mätningen för att bestämma ett servicefönster med marginal.

En enkel statisk ögonblicksbild ger inte ett flera veckor långt liveprestandatest.
Flera tester kan använda färska kopior medan produktionen fortsätter, men
slutligt skrivbeteende måste också kontrolleras efter det skarpa bytet.

## Etapp 3: acceptanskriterier före skarp drift

- Samtliga förväntade recorder-tabeller och rader finns enligt den frysta källan.
- Typanpassad innehållsjämförelse, inte bara radantal eller databasstorlek.
- SQLite `PRAGMA integrity_check` och `foreign_key_check` godkända.
- Statistikseriernas identiteter, enheter, tidsspann och ackumulerade värden stämmer.
- Energisummor för januari–oktober, dygn och viktiga månadsskiften är likvärdiga
  mellan käll- och mål-API. Befintliga luckor ska bevaras/redovisas, inte döljas.
- Svenska tidsgränser och sommar-/vintertid är verifierade i portad SQL.
- Kvartprognos och övriga SQL-sensorer ger samma avrundade resultat med samma
  underlag och tidpunkt. Inga numeriska ID:n antas från en ny tom databas.
- Fakturor, versioner och V2-ledger stämmer före/efter.
- Energipanel, statistik-/historikkort, HAGHS och närvarohistorik fungerar.
- En verklig återställning av provmiljön har gått igenom.

## Etapp 4: slutlig överföring under servicefönster

1. Frys HA-versionen; uppgradera inte HA eller databasmotor under arbetet.
2. Stoppa Core ordnat och stoppa andra skrivare till källdatabasen. Appen som
   kör MariaDB kan behöva vara igång för export. Hindra automatiska starter.
3. Ta den slutliga konsekventa kopian och egna lagringsfiler efter stoppet.
4. Upprepa den provade konverteringen från denna kopia. Använd inte den gamla
   provfilen som skarp historik; den saknar nya data sedan provet.
5. Verifiera resultatet innan start. Placera SQLite på lokal disk.
6. Aktivera portad SQL och SQLite-övervakning, avaktivera MariaDB-underhållet.
7. Ta bort enbart recorder.db_url för standardfilen, alternativt ange avsedd
   SQLite-adress. Behåll filter, tio dagar, commit_interval och övriga avsedda
   recorder-inställningar. Hantera den befintliga tomma standardfilen separat.
8. Starta Core och verifiera nya skrivningar, korrekt statistik, centrala
   funktioner och loggar. Kontrollera även efter första hela statistiktimmen
   och efter nattens rensning.

Under Core-stoppet körs inte dess automationer och alla tillståndshändelser
samlas inte in. Ackumulerad energi kan ofta återfås från mätaren efteråt,
men det garanterar inte exakt kvartfördelning eller återspelning av alla
händelser. Historik fram till stoppet ska däremot finnas i den verifierade
slutkopian. Servicefönstret ska väljas med detta i åtanke.

## Återgång och efterkontroll

Ha tydliga kriterier för direkt återgång: recorder-fel, felaktiga energi-/
statistikvärden, brutna kritiska funktioner eller otillräcklig driftprestanda.
Efter start på SQLite skrivs nya data bara där. Spara därför alltid SQLite
konsekvent innan en återgång; att peka om till gamla MariaDB återför inte nya
rader automatiskt. Efter längre drift krävs separat provad återkonvertering/
överföring, eller ett uttryckligt beslut att behålla den perioden som arkiv.

En full återställning av äldre HA-backup kan också backa nya fakturor och
V2-snapshots. Säkerhetskopiera dessa aktuella egna filer innan återgång och
hantera dem som en egen del av återställningsplanen.

Behåll MariaDB-kopia och konfiguration orörda minst tills en hel tiodagarscykel,
backup samt efterkontroller gått bra, gärna några veckor. De kan därefter
arkiveras långsiktigt. Avinstallation av MariaDB/phpMyAdmin görs först när
alla klienter och återställningsbehov är avklarade.
