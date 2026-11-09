# Fakturautfall – manuellt fakturaregister i Home Assistant

Vyn finns under **Elpris → Fakturautfall**, sökväg
`/dashboard-elpris/fakturautfall`. Ingen testfaktura har sparats i det riktiga
registret. Funktionen har separat lagring och ändrar inte elprognosen eller
recorders historikgränser.

## Registrera en faktura

1. Välj förbrukningsmånad. Periodens från- och tilldatum fylls i automatiskt
   och kan ändras om fakturan avser en annan period.
2. Välj **Elhandel**, **Elnät** eller **Samlingsfaktura**. En samlingsfaktura
   registreras en gång; separat elhandel och elnät registreras var för sig.
3. Ange leverantör, fakturanummer, fakturadatum och totalbelopp inklusive moms.
   Ange fakturerad kWh om den finns. Förbrukningsperioden styr vilken tid
   utfallet hör till; fakturadatum och registreringsdatum är separata uppgifter.
4. Ange moms och detaljposter om du vill. Markera om posterna är **exklusive**
   eller **inklusive moms**. Detaljposterna är valfria.
5. Om samtliga poster är fördelade, kryssa för detta. Då måste summan stämma
   på öret. Moms läggs bara till detaljsumman när posterna är exklusive moms.
6. Om totalbeloppet inkluderar exempelvis en tidigare skuld eller en
   påminnelseavgift, ange den delen som **annat än periodens el**, inklusive
   eventuell moms. Jämförelsebeloppet blir fakturans total minus denna del;
   själva fakturabeloppet ändras inte.
7. Välj **Spara faktura**. Den sparade fakturan visas i listan nedanför.

Belopp kan anges med decimalcomma eller decimalpunkt. Mellanslag som
tusentalsavskiljare accepteras, exempelvis `1 234,56`. Belopp har högst två
decimaler och kWh högst tre. Tom förbrukning eller moms betyder att uppgiften
saknas, inte att den är noll. Negativa rabatter kan anges bland detaljposterna.
För en kreditfaktura väljs dokumenttypen och belopp/förbrukning anges negativt.

Samma kWh kan stå på både elhandel och elnät. Registret lagrar värdena per
faktura och summerar inte dessa som två olika förbrukningar. Totalbeloppet,
jämförelsebeloppet och eventuell moms sparas var för sig.

## Rätta, arkivera och exportera

Öppna en faktura i listan, rätta uppgifterna och ange en ändringsorsak.
Tidigare versioner behålls med tidpunkt, användar-ID och orsak. Om någon annan
hunnit rätta fakturan måste den läsas in på nytt före sparandet.

Arkivering behåller fakturan och dess historik men tar bort den från aktivt
utfall. Via **Visa även arkiverade** kan den öppnas och återaktiveras med orsak.
Permanent radering finns inte i inmatningsvyn.

- **CSV** ger samtliga aktuella poster, även arkiverade, för kalkylprogram.
  Status och momsbasis framgår. Fakturatext som skulle kunna tolkas som en
  kalkylbladsformel skyddas med apostrof.
- **JSON med historik** ger aktuella poster och fullständiga tidigare
  versioner. Belopp anges i heltalsöre och energi i Wh i exportens schema.

HA-inloggning krävs. Inloggade användare kan läsa registret; administratörer
kan validera, skriva, arkivera och exportera. Rättigheterna kontrolleras även
på servern.

## Lagring och säkerhetskopiering

Fakturorna ligger i en **egen SQLite-databas**, inte i recorder:

- `.storage/elfaktura.sqlite3`: register, versionshistorik och återförsöksskydd.
- `.storage/elfaktura.backup.sqlite3`: extra konsistent SQLite-kopia som
  uppdateras efter varje lyckad ändring genom SQLite:s backup-API och atomiskt
  filbyte.

Fakturaposten och dess versionshistorik skrivs i samma transaktion. Pengar
lagras i heltalsöre, inte flyttal. Dubblettkontroll görs för leverantör och
fakturanummer oavsett om typen är elhandel, elnät eller samlingsfaktura.
Begärans-ID förhindrar dubbla skrivningar vid återförsök. En misslyckad extra
backup ger varning; en redan genomförd fakturaregistrering räknas fortfarande
som sparad.

Fakturor gallras inte av recorders tio dagars historikgräns. HA-backup som
omfattar konfigurationen ska innehålla båda databasfilerna, integrationskoden,
paketet, dashboardkonfigurationen och den lokala kortfilen. Den extra kopian
är lokal och ersätter inte HA:s vanliga säkerhetskopiering utanför värden.

Ett framtida byte av recorder från MariaDB till SQLite berör inte detta
register. Vid flytt av hela HA ska filerna följa med konfigurationen.

För återställning av registret: stoppa Core, bevara befintliga filer, kontrollera
en vald säkerhetskopias SQLite-integritet och återställ den som
`.storage/elfaktura.sqlite3`. Återställ även motsvarande extra kopia. Starta
sedan Core och kontrollera fakturor och versioner i vyn. En återställning av
hela HA ska göras enligt HA:s vanliga backupflöde.

## Koppling till prognosuppföljningen

Registret är lagringen av manuellt angivet facit. Det skriver inte över
prognoser och används inte automatiskt som träningsdata. Historiska
prognossimuleringar och jämförelser kan läsa period, kWh, jämförelsebelopp och
detaljposter härifrån. En komplett automatisk månadsanalys är en separat
funktion; den skapas inte genom att bara registrera en faktura.

## Filer och verifiering

- `custom_components/elfaktura/`: egen integration, validering och SQLite-lagring.
- `packages/elfaktura.yaml`: aktivering av integrationen.
- `www/elfaktura/elfaktura-card.js`: lokalt gränssnitt utan externa bibliotek.
- `tools/elfaktura_dashboard.py`: tillägg av en vy och en resurs via HA:s API.
- `tests/elfaktura/test_store.py`: 21 tester av belopp, moms, krediter,
  samtidiga ändringar, dubbletter, revisionshistorik, återförsök, export,
  återöppning och återställning av temporära databaser.
- `tests/elfaktura/test_card.cjs`: DOM-test av det riktiga kortet mot en riktig
  temporär SQLite-databas via `ui_bridge.py`. Testmiljön använder linkedom
  0.18.12; kortet i HA har inget sådant beroende. Detta är ett DOM-/flödestest,
  inte en visuell webbläsargranskning.

Godkänd `ha core check`, Python-/JavaScript-syntaxkontroll och serverns
administratörsspärrar har också kontrollerats. I drift verifierades läsning,
validering och export samt att ett felaktigt sparförsök avvisades utan att
skapa någon faktura. Databasens `quick_check` gav `ok`.

Underlag och kopior av tidigare dashboard/resurser finns privat under
`backups/elfaktura_20261109/`. Verktyget kontrollerade att alla befintliga vyer
och resurser fanns kvar efter tillägget.

För att avaktivera: ta bort paketet `elfaktura.yaml` och starta om Core. Ta
bort enbart vyn `fakturautfall` och den specifika kortresursen genom HA:s
dashboardhantering. Bevara databasfilerna som arkiv; skriv inte över hela
Elpris-dashboarden med en äldre kopia.
