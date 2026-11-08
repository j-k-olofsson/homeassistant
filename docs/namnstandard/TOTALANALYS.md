# Totalanalys av namn och beroenden – 8 november 2026

Avstämning: 2026-11-08T13:40:44.102911+01:00. Alla 10155 registerentiteter och 1071 enhetsposter har inventerats igen, tillsammans med aktiva YAML-källor, lagrade konfigurationer och kontrollpaneler. De tre använda automationsblueprintarna kontrollerades med sina faktiska indata. Gamla etappjournaler och historiska loggar är dokumentation, inte aktiva referenser.

## Justeringar som genomförts

| Fynd | Åtgärd och verifiering |
|---|---|
| Powercalc valde en binär batterivarning som numerisk batterikälla | Uppslaget skiljer nu mellan `sensor` och `binary_sensor`, föredrar enhetens egen integration och avvisar tvetydiga alternativ. Verifierat med riktiga registerdata och regressionstester. Roborocks batteri är numeriskt och beräknad effekt/energi är åter tillgängliga. |
| Dubbelt Ateljén i Bordslampa ateljen | Enheten heter Bordslampa, tillhör Ateljén och 16 ID:n samt berörda beroenden är uppdaterade. |
| Bluetooth-proxy blandades ihop med styrd utrustning | Tio virtuella proxyposter har konsekventa namn som skiljer deras roll från den fysiska utrustningen. LED-stjärnornas proxy flyttades från Köket till Utomhus enligt användarens besked. Fyra avståndssensorers hänvisningar till Utomhus är kontrollerade och var redan rätt. |
| Två generiska Ping-enheter | Namnen visar de verkliga övervakade adresserna 192.168.10.2 och 192.168.10.200. 22 funktionsnamn har förenklats. ID:n med monitor 10/15 behålls som stabila källidentiteter. |
| Två olika Backup-poster | Säkerhetskopiering och Backup-lagring skiljer nu hanteraren från lagringsanslutningen. Lagringsplatsens tekniska namn Backup är oförändrat. |
| Powercalc-poster med gamla interna namn | Fyra aktiva profilers titlar/interna namn följer deras verkliga källenheter. |
| Tre laddade Powercalc-poster med borttagna källor | Alla sex tillhörande sensorer var redan avstängda av användaren, och inga aktiva konsumenter hittades. Integrationsposterna har också arkiverats/inaktiverats. Historik, unika identiteter och parametrar finns kvar. En fjärde redan inaktiverad post med en gammal ljuskälla är tydligt arkivmärkt. |
| Slack-fel kunde avbryta andra flöden via Granny | Slack-grenen körs bara när dess befintliga integrationspost är `loaded`. Villkoret är verifierat i HA. Det gör inte tokenen giltig, men den kända frånkopplingen avbryter inte skriptets övriga delar. Tjänsten och varningen kvarstår som uppskjuten autentiseringsfråga. |

Totalt i denna omgång: 15 enhetsnamn, 22 funktionsnamn, 16 ID:n, åtta integrationstitlar, tre ytterligare arkiverade integrationsposter och en roll-/områdeskorrigering. Det är etappantal; de ska inte läggas direkt till kumulativa inventeringstal eftersom samma post kan ha justerats tidigare.

## Slutkontroll

- HA-konfigurationen är giltig utan fel eller varningar från konfigurationskontrollen.
- Inga okända aktiva entitetsreferenser eller åtgärder återstår i den utökade referenskontrollen, förutom den uttryckligen uppskjutna Slack-åtgärden.
- Alla aktiva Powercalc-integrationer som var laddade före övergången är fortsatt laddade. Inga tidigare tillgängliga Powercalc-värden försämrades.
- Roborocks numeriska batterivärde, beräknade effekt och beräknade energi har verifierats i körande HA. Ingen förbrukningshistorik har fabricerats för den tidigare felperioden.
- 238 historikposter och 46 statistikpunkter för de bytta ID:na jämfördes inom fasta perioder före/efter. Statistikmetadata följde med. Övrig historik har inte skrivits om.
- Ursprungliga på-/avlägen för 81 automationer är bevarade. Hjälparnas aktuella värden och externa autentiseringsuppgifter är oförändrade i slutjämförelsen.
- Testerna för Powercalc-uppslag, Plant och de egna nätverkskorten är godkända. Ingen firmware har laddats upp, ingen testnotis har skickats och inga fysiska styråtgärder har provkörts manuellt.

[Maskinläsbar referenskontroll](totalanalys-referenskontroll.json). Även URL-kodade och regex-escapade gamla ID:n har sökts i 99 aktiva filer utan fynd: [kompletterande kontroll](totalanalys-kodade-referenser.json). Dynamiska körvägar kan inte bevisas fullständigt genom statisk granskning; kontrollen ersätter inte varje framtida användnings- eller hårdvaruscenario.

## Avsiktliga likheter och undantag

Likadana enhetsnamn är ofta flera representationer av samma utrustning i OpenWrt, Cast, Google Home och Music Assistant. Dessa ska inte döpas till olika fysiska saker. Tekniska värdnamn, MAC-adresser, firmware-nodnamn, `unique_id`, UUID och skriptens tjänstenamn är stabila identiteter. Visningsnamn kan följa svensk namnprincip även när en sådan identitet behålls.

Powercalcs `sensor.dummy` är en intern platsmarkör för tre giltiga enhetsbaserade profiler, inte en saknad fysisk sensor. Arkiverade poster och gamla uttryckliga exponeringsundantag för borttagna entiteter är inga aktiva anrop. De behandlas separat i läsverktygen.

## Kvarstående drift och framtida underhåll

Slack-tokenen är återkallad och ska ersättas av användaren i efterhand enligt tidigare besked. PrusaLink saknar anslutning vid avstämningen. Cast-väckarklockornas anslutning var redan otillgänglig före denna omgång; tidigare kontroll kunde inte nå deras Cast-portar. Sådana uppkopplings-/behörighetsfrågor löses inte genom fler namnbyten.

Plant och Powercalc innehåller lokala rättningar. Uppdateringar kan skriva över dem. `ha_naming_audit.py` bevakar nu filernas kontrollsummor och signalerar ändringar som behöver granskas. Detta är en granskningssignal vid uppdatering, inte ett förbud mot officiella rättningar. Testa då beteendet med `python3 tools/test_ha_naming_plant.py` och `python3 tools/test_ha_naming_powercalc.py`. [Powercalc-rättning](powercalc-batterikalla.patch).

För en bredare framtida referensgranskning finns `tools/ha_configuration_audit.py`, som använder en aktuell tjänste-/tillståndsinventering, skiljer inaktiva poster från aktiva beroenden och löser indata till använda blueprints. Kod och metadata är läsande; den ändrar inga namn.

Rapporterade framtida kompatibilitetsvarningar för tredjepartsintegrationer, bland annat Toyota/Nordpool, finns i den privata logginventeringen. De har inte döljts eller föranlett en oplanerad programuppgradering.

## Säkerhetskopior

Fullständig kopia före denna omgång: `59002a41`, inklusive HA och MariaDB. Fullständig slutkopia **`1d3fbbdc`**, inklusive HA och MariaDB, är slutförd utan fel enligt Supervisor. Den finns på Backup och omfattar 6762598400 byte. Denna nya kopia har kontrollerats genom jobbresultat och innehållsmetadata, inte genom arkivprovning eller full provåterställning. En full återställning till separat körande HA har inte provats. [Återställningsanvisning](ATERSTALLNING.md).
