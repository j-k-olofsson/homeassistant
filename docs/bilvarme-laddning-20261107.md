# Bilvärme med ladduttaget på före värmestart

Användaren begärde att laddningen ska aktiveras strax före bilvärmen för att göra nätström tillgänglig under uppvärmningen.

## Genomfört

- Befintlig laddstyrning är `switch.billaddare`, ett ESPHome-relä. Det finns ingen effektmätare på uttaget och ingen separat laddstartstjänst för bilen i den aktuella Toyota-konfigurationen.
- `script.ange_starttid_for_bilvarmen` behåller vald tid som värmestart men lägger Scheduler-starten en minut tidigare. Datum beräknas från den tidigare tiden, även över midnatt. Bokningen är fortfarande `repeat_type=single`.
- Datum/starttid måste anges minst två minuter framåt, eftersom ladduttaget ska aktiveras först.
- `script.bilvarme_starta_en_gang` kontrollerar Toyota och ladduttagets tillgänglighet, sparar reläets tidigare tillstånd och om laddkalendern då var aktiv.
- Intern sekvens `script.bilvarme_med_laddning` slår på uttaget, väntar högst 15 sekunder på reläets på-bekräftelse, väntar en minut och kontrollerar på-status igen innan det enda Toyota-klimatstartanropet skickas. Utebliven reläbekräftelse medför ingen värmestart.
- Strömmen hålls tillgänglig under bilens valda värmetid plus två minuters marginal. Toyota-anropsfel loggas; strömmen hålls ändå tillgänglig under denna period eftersom ett svarsfel inte säkert visar att kommandot aldrig nådde bilen.
- Kalenderautomationen Av/På Bil-laddning får inte slå av uttaget medan engångsstartskriptet körs. Efter uppvärmningen lämnas uttaget på om laddkalendern då är aktiv eller om uttaget ursprungligen var manuellt på. Annars slås det av. Om ett kalenderpass löpte ut under uppvärmningen hanteras avstängningen därmed vid avslut.
- Befintlig knapp och bokningslista finns kvar på bilfliken. Informationen förklarar att listans starttid är laddstarten och namnet anger värmestarten.

## Verifiering

- Konfiguration valid, utan fel eller varningar. Script och automationer laddades om via ordinarie tjänster. Ingen Core-omstart.
- Nio fall kördes med Home Assistants riktiga skriptmotor i en separat process med simulerade tjänster och tillstånd: normal start, manuellt påslaget uttag, aktiv laddkalender, kalenderpass som tar slut, fel från Toyota, utebliven reläbekräftelse, redan aktiv bilvärme, otillgängligt uttag samt kalenderns avstängningsspärr.
- I dessa isolerade tester ersattes endast bil-ID och väntetider för att kunna köra snabbt utan hårdvaruanrop. Produktionssekvensens minutsfördröjning kontrollerades separat.
- Live-test av en bokning för värmestart 2099-01-01 00:00 gav förberedelsestart 2098-12-31 23:59, samma start-/slutdatum för engångstimern och korrekt målskript. Testbokningen raderades omedelbart.
- Slutkontroll: inga bokningar kvar, ladduttag off, bilklimat off och tom reparationslista. Inga faktiska ladd- eller värmestarter gjordes under verifieringen.

## Praktisk begränsning

Reläets på-status bekräftar att uttaget är tillslaget, inte att bilen faktiskt tar en viss effekt. Toyota-statusen charge_complete kan gälla ett fullt batteri och används därför inte som ett krav på charging före värmestart. Ingen fysisk kabelanslutning eller energifördelning mellan nät och batteri kan bevisas med dagens sensorer. Faktiskt effektuttag vid nästa riktiga uppvärmning är inte testat.

Om Home Assistant startas om eller engångsskriptet manuellt avbryts mitt i uppvärmningen kan sekvensens avslutande återställning inte garanteras. Det finns ingen ny beständig återställningsmekanism för den situationen.

Backup och underlag: `backups/bilvarme_laddning_20261107/`. Isolerade testresultat: `isolated_test_results.json`; slutstatus: `verification.json`.
