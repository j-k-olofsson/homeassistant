# Marketplace: prov och bilvärme 2026-11-07

Användaren begärde installation av Bermuda, test av Adaptive Lighting på bordslampan i ateljén samt Scheduler med bilvärme vid ad hoc-tider, utan fast schema. Det tidigare uppdraget om sophämtning slutfördes samtidigt.

## Installerat och konfigurerat

- bermuda: 0.8.7
- adaptive_lighting: 1.32.0
- scheduler: 3.3.9
- waste_collection_schedule: 2.36.0
- Scheduler Card installerad och dess registrerade JavaScript-resurs verifierad med HTTP 200.

## Bermuda

- Ser elva aktiva mottagare från befintliga Bluetooth-proxyer. Ingen firmware eller Bluetooth-konfiguration ändrades.
- Valde två kända, egna temperaturgivare: ateljén och verandan. Inga okända mobiler eller slumpadresser valdes för spårning.
- Prov utan kalibrering. Verandans givare uppskattas till Verandan; ateljéns givare uppskattas till Köket. Detta visar att aktuell rumsbedömning behöver utvärderas och eventuellt kalibreras innan den används för automationer. Stationär placering har inte skrivits in som ett påstått mätresultat.
- Sensorkort och länk till integrationsinställningarna finns i Admin → Tester (`/ha-admin/tester`). Inga närvarostyrda automationer har skapats.

## Adaptive Lighting

- Endast `light.bordslampa_ateljen` ingår i profilen Ateljén – test.
- Färgtemperatur 2202–4000 K, anpassning var 90:e sekund, övergång 30 sekunder. Faktisk lampgräns är 2202 K.
- Adapt Brightness är avstängd och Sleep Mode är avstängd. Befintlig tändning och släckning behålls.
- Manuell färgstyrning respekteras: take_over_control/pause_changed, detect_non_ha_changes, adapt_only_on_bare_turn_on. Ingen egen färgtemperaturstyrning av andra lampor infördes.
- Verifierat serviceanrop med färganpassning och utan tändning av släckta lampor: bordslampan var redan på och gick från 2202 till 2506 K. Ljusstyrkan förblev 128/255. Aktiv profil och avstängd ljusstyrkeanpassning återlästes efter testet.
- Kontroller finns under Admin → Tester. Reglaget pausar anpassningen; det återställer inte automatiskt en tidigare färgtemperatur.
- Under jämförelsen ändrades också hönsbelysningens ljusstyrka 175→176 genom dess vanliga pågående styrning; inga kommandon till hönsbelysningen ingick i testet.

## Bilvärme: endast engångstider

- Installerade Scheduler och Scheduler Card.
- Ändrade befintliga `script.ange_starttid_for_bilvarmen`: datum/tid skapar nu en Scheduler-bokning med samma start- och slutdatum samt repeat_type=single. Inmatning i det förflutna eller för nära nu stoppas; sekunder avrundas uppåt till en hel minut. Datum hanteras i HA:s Europe/Stockholm.
- Lagt till `packages/bilvarme_scheduler.yaml` med `script.bilvarme_starta_en_gang`. Det gör ett enda konsoliderat anrop till `toyota.start_climate` med bilens senast valda inställningar. Det skickar inget extra startanrop om klimatet redan är aktivt och stoppar med tydligt fel om Toyota är otillgänglig.
- Bilfliken (`/lovelace/bill`) har knappen Välj starttid för bilvärmen och Scheduler-listan Bokade engångstider. Den vanliga lägg-till-knappen i Scheduler-kortet är dold; bokningsskriptet skapar konsekvent engångstider.
- Värmeflikens gamla datum-/Auto bilvärme-badges ersattes med Boka bilvärme. De gamla fristående bilhjälparna raderades inte; det finns ingen ny automation som lyssnar på dem.
- Ingen fast återkommande tid eller aktuell värmarstart har lagts in.

## Verifiering

- Testade bokningsskriptet med ett datum långt fram i tiden (2099-01-01), kontrollerade datum, klockslag, målskript och repeat_type=single och raderade testbokningen omedelbart. Använde det entity_id som Scheduler faktiskt returnerar.
- Separat ofarlig engångstimer skrev en unik INFO-loggrad. Verifierade exakt en sådan loggrad och att timern därefter raderade sig själv. Testet skickade inga Toyota-kommandon.
- Bilens klimat var off före och efter testerna. Verklig fjärrstart av bilen ingick inte och är därför inte verifierad av detta test.
- Slutkontroll: alla fyra integrationer loaded, konfiguration valid utan fel/varningar, reparationslista tom, inga kvarvarande Scheduler-bokningar. Befintliga integrationers laddningsstatus oförändrad från baslinjen.
- Dashboardkonfigurationer sparades via Lovelace-API och återlästes exakt. Ingen visuell webbläsargranskning har gjorts.
- Ingen Core-omstart behövdes. Script-konfigurationen laddades om via ordinarie tjänst.

## Underlag

Privata säkerhetskopior och före/efter-data: `backups/marketplace_trials_20261107/`. Slutresultat: `verification.json`, timertest: `scheduler_verification.json`. Sophämtningens migration beskrivs separat i `docs/waste-migration-20261107.md`.

## Uppdatering: laddning före bilvärme

Bilvärmens engångsstart har kompletterats med nätmatning en minut före vald värmestart och spärr mot laddkalenderns avstängning under uppvärmningen. Se `docs/bilvarme-laddning-20261107.md` för slutlig funktion, verifiering och begränsningar.
