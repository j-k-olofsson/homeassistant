# HACS/Marketplace: användningsgranskning 2026-11-06

Granskad Home Assistant Core 2026.11.0. Inventering hämtad från körande API samt marketplace.repositories: **32 installerade paket, 18 integrationer och 14 kontrollpanelstillägg**.

## Resultat

**Ursprunglig bedömning: två möjliga avinstallationskandidater, SpotifyPlus och Watchman, under förutsättning att de inte används manuellt.** Båda har tillfälligt inaktiverats var för sig och återaktiverats. AI Agent HA behöver besked om manuell användning; aktuell sparad historik och en egen panel gör att noll entiteter inte kan användas som frånvarobevis. AlsavoPro är redan avstängd men har kvar poolpanelreferenser.

Vid den ursprungliga granskningen avinstallerades inget paket och ingen Core-omstart gjordes. Efter användarens besked har AI Agent HA, SpotifyPlus och Watchman avinstallerats; se åtgärdsloggen nedan.

## Metod och gränser

- Baslinje via körande API: konfigurationsposter, 9 970 registerentiteter, 1 067 enheter, 3 449 aktuella tillstånd, tjänster, komponenter och reparationslista.
- Sökning i aktuella YAML-filer, paket, blueprints, lagrade paneler, hjälpardata och andra integrationers data/options. Loggerinställningar, recorder-undantag och gamla säkerhetskopior räknas inte som funktionell användning.
- Kontroll av dynamiska kortfilter, pollen-kortets genererade sensornamn, Plant/OpenPlantbook och fristående paneler/tjänster. Sökning även efter tjänsteanrop i lokal egen kod och lokala webbfiler.
- Alla åtta panelkonfigurationer kunde läsas via API. Alla 26 lokala registrerade JavaScript-resurser svarade HTTP 200. Detta verifierar åtkomst och konfigurationsreferenser, inte visuell rendering i en webbläsare.
- Inaktivering via config_entries/disable, en integration i taget. Verifierade not_loaded/user och återställning till loaded/disabled_by=null. Cirka en minuts observation per integration. Reparationer, loggfel, giltig konfiguration och andra integrationers laddning jämfördes.
- En kort period utan nya lagningar kan inte bevisa att en sällan använd funktion, extern API-klient eller manuell användning saknas. Kända konsumenter inaktiverades inte bara för att återskapa ett redan bevisat beroende.

## Integrationer

| Integration | Bedömning och belägg |
|---|---|
| ai_agent_ha | Fristående AI-panel och sex tjänster; sparad historik uppdaterad 6 november. Inga automationsreferenser. Besked om manuell användning behövs; inte klassad som oanvänd. |
| nordpool | Elpris-/billaddningsskript, kontrollpanel och två template-konfigurationer använder sensorn. |
| spotifyplus | Möjlig avinstallationskandidat om manuell användning saknas. Ingen referens i aktiva automationer, skript, paket, paneler eller andra integrationers inställningar. Testad och återställd. |
| plant | Sex växter används i automationer och växtpanelen. |
| watchman | Möjlig avinstallationskandidat om rapporterna inte används manuellt. Kör egna kontroller men inga aktiva konfigurationskonsumenter hittades. Testad och återställd; frånvaro av konsumenter visar inte att rapporterna är onyttiga. |
| google_home | Diegos alarmsensor används i morgonautomation och IR-ljuspaket. |
| powercalc | Energi-panelen använder poolpump och duschgolvvärme. 28 laddade instanser; en användarinaktiverad och en ignorerad upptäckt är inte tecken på att hela integrationen är oanvänd. |
| presence_simulation | Paket med start/stopp, schema och egen switch. Behåll. |
| swemail | En template-konfiguration använder postutdelningssensorn. |
| battery_notes | Batteribytesautomation/blueprint och dynamiskt batterikort använder integrationen. Äldre individuella poster med not_loaded ska inte förväxlas med en oanvänd central integration. |
| pollenprognos | Pollenprognos-kortet på huvudpanelen använder integration pp / staden Stockholm och bygger sensornamn dynamiskt. Noll direkta entity_id-träffar är missvisande. |
| spook | Aktiv reparationskontroll och systemstatistik. Behåll som verifieringsverktyg även om egna sensorer saknar direkta referenser. |
| openplantbook | Plant använder OpenPlantbook för växtdata; beroende via kod och after_dependencies. |
| toyota | Bilpanel, batteri-/platsautomationer och laddningsskript använder Toyota. Laddad vid aktuell kontroll. |
| home_connect_alt | Disk-/tvättautomationer och paneler använder integrationens enheter och tjänster. |
| openwrt | Routerns nätstatusautomationer och dynamiska klientlistor i adminpanelen använder integrationen. |
| alsavopro | Redan användarinaktiverad, men 26 referensrader i poolpanelen och medvetet undantag i Watchman. Kan inte bedömas som överflödig utan besked om poolvärmepumpen. |
| haghs | Global hälsopoäng används i sex delar/referensrader i adminpanelen. |

## Kontrollpanelstillägg

Alla 14 har användning i sparade aktuella paneler. Resursregistrering ensam användes inte som bevis.

| Paket | Exempel på faktisk användning |
|---|---|
| flex-table-card | `.storage/lovelace.ha_admin:903` – flex-table-card |
| apexcharts-card | `.storage/lovelace.lovelace:114` – apexcharts-card |
| battery-state-card | `.storage/lovelace.ha_admin:344` – battery-state-card |
| lovelace-auto-entities | `.storage/lovelace.lovelace:878` – auto-entities |
| pollenprognos-card | `.storage/lovelace.lovelace:2336` – pollenprognos-card |
| lovelace-card-mod | `.storage/lovelace.lovelace:102` – card_mod |
| config-template-card | `.storage/lovelace.dashboard_elpris:183` – config-template-card |
| mini-graph-card | `.storage/lovelace.dashboard_elpris:188` – mini-graph-card |
| lovelace-meteogram-card | `.storage/lovelace.lovelace:2753` – meteogram-card |
| ha-weather-forecast-card | `.storage/lovelace.lovelace:45` – weather-forecast-card |
| gauge-card-pro | `.storage/lovelace.lovelace:2378` – gauge-card-pro |
| custom-brand-icons | `.storage/lovelace.lovelace:2554` – phu: |
| kiosk-mode | `.storage/lovelace.dashboard_hemmabio:166` – kiosk_mode |
| advanced-camera-card | `.storage/lovelace.lovelace:1999` – advanced-camera-card |

## Inaktiveringstester

### spotifyplus

- Testfönster 18:13:00–18:14:12 Europe/Stockholm.
- Inaktivering utan omstart: {'require_restart': False}.
- Under inaktivering: {'issues': []}. Konfigurationskontroll: {'http': 200, 'body': {'result': 'valid', 'errors': None, 'warnings': None}}.
- Andra konfigurationsposters ändrade laddningsstatus: [].
- Nya loggfel jämfört med baslinjen: [].
- Återställning: loaded, disabled_by=None.

### watchman

- Testfönster 18:14:20–18:15:23 Europe/Stockholm.
- Inaktivering utan omstart: {'require_restart': False}.
- Under inaktivering: {'issues': []}. Konfigurationskontroll: {'http': 200, 'body': {'result': 'valid', 'errors': None, 'warnings': None}}.
- Andra konfigurationsposters ändrade laddningsstatus: [].
- Nya loggfel jämfört med baslinjen: [].
- Återställning: loaded, disabled_by=None.

## Övriga fynd

- **openwrt_wifi_clients** finns lokalt men ingår inte i de 32 Marketplace-installationerna. Konfigurationsposten är redan användarinaktiverad, alla sju registerentiteter är avstängda och inga funktionella referenser hittades i aktuell konfiguration. Stark kandidat för separat lokal avveckling. Endast loggnivå och recorder-undantag finns kvar; gamla panelbackuper innehåller tidigare disconnect_client-anrop.
- **temperature_feels_like** finns lokalt och har en katalogpost men markeras inte som installerad i Marketplace-registret. Den används aktivt via packages/feels_like.yaml och sensorn i huvudpanelen. Komponenten laddas som temperature_feels_like.sensor. Behåll; avsaknad av config-entry eller top-level-komponent är inte ett giltigt oanvändningsbevis.
- **AlsavoPro** är redan avstängd; därför upprepades ingen inaktivering och pumpen startades inte för prov. Poolpanelen finns kvar. Besked om fortsatt användning behövs före avveckling.
- Watchmans befintliga 2 982 saknade/okända/otillgängliga entiteter ska inte tolkas som 2 982 aktuella fel. Verktyget läser även gamla .storage/lovelace*.bak-filer och räknar bland annat normala okända knapptillstånd. Den enda saknade åtgärden openwrt_wifi_clients.disconnect_client hittades endast i panelbackuper. Inställningarna har inte ändrats inom denna granskning.
- Egna Granny-/IR-/Portainer-komponenter och Spooks medföljande hjälpkomponenter räknas inte som egna Marketplace-paket. Ingen slutsats om oanvändning drogs enbart från att de saknar egna installationsposter.

## Underlag

Privata baslinjer, inventering, paneldata och före/under/efter-filer finns i backups/marketplace_audit_20261106/. Katalogen har rättighet 0700. Råunderlaget kan innehålla hem-/enhetsdata och ska inte publiceras.

Marketplace ersätter HACS och migrerar dess innehåll i 2026.11 enligt [Home Assistants dokumentation](https://www.home-assistant.io/integrations/marketplace). Den skiljer också avinstallation av filer från borttagning av konfigurerade integrationer.

## Genomförd avinstallation efter användarens besked

Användaren bekräftade att AI Agent HA, SpotifyPlus och Watchman inte används och begärde borttagning.

- Sparade konfiguration/register, installerade komponentfiler samt AI-historik och Watchman-rapport i en privat backup: `backups/marketplace_remove_20261106/`.
- Tog bort de tre konfigurationsposterna via Home Assistants ordinarie DELETE-API och avinstallerade deras repository via `marketplace/repository/uninstall`. Komponentmapparna togs bort av Marketplace.
- Konfigurationskontroll gav `valid`, utan fel eller varningar. Marketplace skapade tre förväntade omstartslagningar.
- Startade om Home Assistant Core för att slutföra avinstallationen och ta bort den gamla AI-panelen ur minnet.
- Efter omstart: Home Assistant `RUNNING`, samtliga tre saknas bland konfigurationsposter, registerentiteter, tjänster, laddade komponenter och installerade Marketplace-paket. AI-panelen är borta. Marketplace har nu 29 installerade paket.
- Reparationslistan är tom.
- Avstämning mot baslinjen: PrusaLink ändrades från `loaded` till `setup_retry` med `Cannot connect`. Skrivarens entiteter var redan `unavailable` före avinstallationen och är fortsatt otillgängliga. Ingen skrivarkonfiguration eller strömstyrning ändrades. Övriga kvarvarande konfigurationsposters laddningsstatus matchar baslinjen.
- AI-historik och äldre rapportdata har säkerhetskopierats och inte raderats som separat datarensning.
- AlsavoPro och den lokala `openwrt_wifi_clients` har inte avinstallerats; användarens besked avsåg de tre namngivna integrationerna.

Verifieringsunderlag finns i `backups/marketplace_remove_20261106/verification.json`.
