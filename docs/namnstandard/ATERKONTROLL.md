# Återkontroll 8 november 2026

Kontrollerad 2026-11-08T20:21:14.144755+01:00. Namn- och referenskontrollen är godkänd för 10155 registerentiteter och 1071 enhetsposter.

## Varningen är hanterad

Reparationslistans enda ärende gällde elprisautomationens tidigare saknade `notify.flocken`. Slack är nu anslutet och tjänsten åter registrerad. Det gamla ärendet avslutades genom HA:s reparationsflöde efter denna kontroll. Ärendet ignorerades inte.

Vid omauktoriseringen hade Slack fått ett nytt konfigurations-ID. Det tidigare fasta ID:t i mitt anslutningsvillkor skulle ha hoppat över Slack även när tjänsten fanns. Villkoret är nu dynamiskt via `config_entry_id('sensor.flocken')`. HA:s mallmotor verifierade: valt och anslutet = sant, ej valt = falskt, saknad profil = falskt. Ingen notis skickades som test.

## Kontroller

- Konfigurationen är giltig utan fel eller varningar från konfigurationskontrollen.
- Reparationslistan är tom. Inga okända aktiva entitetsreferenser eller åtgärder hittades; Slack är inte längre en uppskjuten åtgärd.
- De 81 automationernas på-/avlägen bevarades under kontrollen.
- Samtliga 25 tidigare aktiva Powercalc-poster är laddade. Roborocks batteri, effekt och energi är numeriska. Inga Powercalc-fel finns i den aktuella loggbufferten.
- Plant-, Powercalc- och korttesterna är godkända, och de lokala integrationernas bevakade kod är oförändrad.
- Utomhus-proxyns område, Bordslampans namn, borttagningen av Slider och avvecklingen av omskanningsskriptet är kontrollerade.

## Driftanmärkningar

PrusaLink saknar kontakt medan skrivarens huvudströmbrytare är av och förbrukningen är 0 W; det är förenligt med en avstängd skrivare. Loggen innehåller också tidigare eller återkommande anslutnings-/leverantörsmeddelanden från bland annat Bluetooth, Cast/Google Home och Toyota. En tom reparationslista betyder inte att alla sådana driftmeddelanden eller externa beroenden är borta. Ingen fysisk funktion har provkörts manuellt.

[Referenskontroll](aterkontroll-referenser.json) · [Status](status.json) · [Återställning](ATERSTALLNING.md)

## Säkerhetskopia

Fullständig säkerhetskopia **`43d06a4d`**, inklusive HA och MariaDB, är slutförd utan fel enligt Supervisor. Storlek: 6788270080 byte. Finns på platsen Backup. Den omfattar aktuell Slack-konfiguration och det dynamiska villkoret. Kopian är kontrollerad genom jobbresultat och innehållsmetadata, inte genom fullständig arkivprovning eller provåterställning.

Referensverktyget kontrollerar nu även bokstavliga `config_entry_attr`-hänvisningar. Det upptäcker det gamla, borttagna integrations-ID:t i före-kopian och hittar ingen sådan felaktig hänvisning i den rättade konfigurationen.
