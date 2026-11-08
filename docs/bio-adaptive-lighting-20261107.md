# Bio: adaptiv färgtemperatur med bevarat nattljus

Användaren godkände Adaptive Lighting på båda bordslamporna i bion, med bevarat rött nattljus och prioritet för bioläget.

## Funktion

- Egen Adaptive Lighting-profil Bio, config-entry `01M6TKDJ7FKCE2Q0VGF7Y08GH9`, med endast `light.bordslampa_vanster` och `light.bordslampa_hoger`. Profilen i ateljén ändrades inte.
- Färgtemperatur 2200–4000 K och 30 sekunders normala övergångar. Adapt Brightness avstängd: befintliga automationer behåller ljusstyrkan.
- Adaptiv färgtemperatur används bara i DAY, DAWN och DUSK när `switch.grupp_hemmabio` är off.
- Befintlig automation `1769682852305` / `automation.bordslampor_hemmabio` stänger först av profilen, utför sina befintliga ljuskommandon och synkroniserar sedan profilen. Hela den befintliga choose-strukturen är oförändrad.
- NIGHT behåller rött [255,0,0] på 15 %, och bio_on släcker båda lamporna. Bio_off återställer aktuellt läge. Den tio minuter långa morgonövergången NIGHT→DAY avslutas innan profilen återaktiveras.
- Ny hjälprutin och skyddsautomation i `packages/bio_adaptive_lighting.yaml`. Skyddet stänger av profilen i natt-/bioläge och andra ljusscener, även vid manuell profilaktivering. I NIGHT återställs rött på redan tända lampor; det tänder inte släckta lampor. I bioläge släcks de två lamporna.
- Sleep Mode är konfigurerat med rött som ytterligare reserv i nattläge, men huvudprofilen ska vara avstängd då.
- Nya kontroller och beskrivning finns under Admin → Tester → Bio – adaptivt ljus.

## Verifiering

- Tretton isolerade tester med Home Assistants riktiga skriptmotor och simulerade tjänster/tillstånd: DAY, DAWN, DUSK, rött NIGHT, bio på, bio av på natten, bio av på dagen, hela morgonövergången före adaptiv anpassning, manuell profilaktivering under NIGHT, nattspärr med släckta lampor, manuell profilaktivering under bio, PARTY utan färgöverskrivning och uppstart i DAY. Tidsfördröjningar kortades endast i testkopian.
- Jämförelse av parsed YAML bekräftade att den gamla automationens ursprungliga ljuslogik är oförändrad; bara avstängning och efterföljande synkronisering lades runt den.
- Konfigurationskontroll: valid, utan fel eller varningar. Script och automationer laddades om när de var inaktiva. Ingen Core-omstart krävdes.
- Live-kontroll i aktuellt DAY med bion av: båda lamporna anpassade färgtemperaturen från 3003 till 3039 K vid första avläsningen under övergången. Båda behöll brightness 63/255 och tillstånd on. Profilen var on och ljusstyrkeanpassningen off.
- Reparationslistan var tom efter ändringen. Dashboardkonfigurationen återlästes exakt via Lovelace-API.
- Hela husets ljusscen och hemmabions reläer ändrades inte för att testa natt-/bioläge live. Dessa fall verifierades isolerat, medan den fysiska daganpassningen verifierades på lamporna.

Backup och testunderlag: `backups/bio_adaptive_20261107/`. Slutresultat: `verification.json`; isolerade tester: `isolated_results.json`.
