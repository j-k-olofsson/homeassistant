# HAGHS: Portainer-rensning och ny analys

Granskning 2026-10-21 10:43 CEST. HAGHS 2.3.0.

## Genomförd rensning

18 Portainer-enhetsposter och 131 tillhörande entiteter har tagits bort via Home Assistants WebSocket-kommando config/device_registry/remove. Urvalet verifierades mot aktuell Portainer API-lista: endpoint 3 saknas; aktuella endpoint 14 (Tor) och 15 (Fulla) finns. Container- och volymlistor hämtades med GET, containrar inklusive stoppade (all=1). De borttagna posterna hade antingen ett endpoint som saknas eller en container som saknas på det endpoint som registrerat den.

131 entiteter: 123 hade unavailable och åtta var inaktiverade/utan aktuellt tillstånd. Ingen levererade ett fungerande tillstånd. 79 ingick i HAGHS zombieurval. Inga direkta referenser hittades i granskade automationer, skript, paket, configuration.yaml eller Lovelace, vare sig till entitetsnamn eller berörda enhets-ID:n. Dynamiska/externa referenser kan inte helt uteslutas.

Containrar, Docker-volymer, aktuella Portainer-värdar och övriga integrationers registerposter har inte ändrats. Entiteter raderades som del av enhetsborttagningen; aktiv .storage redigerades inte. HAGHS uppdaterades med homeassistant.update_entity för att få en färsk rapport.

Backup och maskinläsbar verifiering: `/homeassistant/backups/haghs_cleanup_20261021T083959Z`. Registren säkerhetskopierades före ändringen. WebSocket-snapshot före/efter, urvalslista, API-resultat och verifiering finns i katalogen. En senare kontroll bekräftar att exakt de avsedda 18 enheterna och 131 entiteterna försvunnit; inga av deras tillstånd finns kvar och inga andra registerposter saknas jämfört med före rensningen.

| Borttagen gammal bindning | Enhetsposter | Entiteter |
|---|---:|---:|
| Tidigare endpoint 3 saknas i Portainer | 10 | 25 |
| Container saknas på endpoint 14 | 4 | 68 |
| Container saknas på endpoint 15 | 4 | 38 |

## Nytt resultat

HAGHS: **182 → 103 zombies** (79 färre). Hälsopoängen är **91 → 91 %**, hårdvara 100 %, applikation 85 %. Färre zombies gav alltså ingen ändring av den avrundade totalpoängen i denna mätning.

HAGHS-attributet visar bara de första 100. Alla 103 har rekonstruerats med installerad kods domänfilter, aktuell konfiguration, unknown/unavailable, 15 minuters karens (60 för battery), inaktiveringsfilter och haghs_ignore på entitets-/enhetsnivå. De första 100 matchar exakt och totalsumma samt domänfördelning matchar. Aktuella entitets-/enhetsregister lästes via live WebSocket. Alla kandidater är registrerade; inga oregistrerade spökentiteter i detta urval.

| Integration | Antal | Bedömning |
|---|---:|---|
| Uptime Kuma | 47 | 27 gamla monitorposter, 7 certifikatmått på HTTP, 12 Docker-svarstider och 1 push-svarstid |
| Google Home | 14 | 13 återställda poster och en aktiv men otillgänglig device-sensor; blandning av gamla identiteter och upptäcktsproblem |
| Portainer | 9 | Saknade disk-/volymmått på aktuella värdar |
| VeSync | 8 | Luftfuktaren är helt otillgänglig |
| OpenWrt | 7 | 6 gamla AP-signalposter och 1 saknad nlbwmon-funktion |
| Music Assistant | 5 | 2 aktiva otillgängliga spelare och 3 återställda poster |
| Cast | 4 | Återställda äldre högtalar-/TV-/Cast-poster |
| ONVIF | 3 | Reglage utan inläsning av aktuellt läge |
| Matter | 2 | Saknad strömmätning samt återställd effektpost på fungerande dimmer |
| Powercalc | 2 | Båda beror på en källentitet som inte längre finns |
| Group | 1 | Tom skymningsgrupp med tre automationsberoenden |
| OpenUV | 1 | Skyddsfönster saknar värde, övriga UV-mått fungerar |

## Föreslagen fortsättning — ej genomförd

1. **Rensa gamla Kuma-poster och AP-signalsensorer: 33 zombies.** Kuma-monitor-ID 1, 7 och 36 saknas fortfarande i aktuell /metrics-export och har vardera nio återställda HA-poster. Kontrollera i Kuma att de avvecklats och inte är avsiktligt pausade före rensning. Sex SSID-signalsensorer på kontorets AP är återställda poster för stationsmått som installerad OpenWrt-kod inte skapar i AP-läge; de är tydliga kandidater för inaktivering/rensning. Behåll fungerande AP/SSID-enheter. Om dessa 33 tas bort och övrigt är oförändrat återstår 70.
2. **Undanta eller inaktivera 23 mått som saknar relevant tillstånd.** Sju Kuma-certifikatsensorer hör till HTTP-URL:er, tolv Docker-svarstider och en push-svarstid kommer som -1 från källan medan monitorstatus är up. Tre ONVIF-reglage saknar återläsning av aktuellt läge i installerad kod. Undanta endast de enskilda entiteter som behövs, eller inaktivera oanvända funktioner. Behåll drift-, backup- och kamerastatus. Efter både steg 1 och 2 skulle 47 zombies återstå, om tillstånden i övrigt är oförändrade.
3. **Reparera två konkreta konfigurationsfel.** Skymningsgruppen har entities=[] och används i tre automationer; välj dagens avsedda medlemslista. Powercalc för hemmabions bordslampa pekar fortfarande på light.bordslampa_vanster_old, som saknas i både register och state machine. light.bordslampa_vanster fungerar och har egna power/energy-sensorer. Bestäm vilken beräkning som ska behållas och ta hänsyn till energihistoriken.
4. **Granska gamla högtalar-/TV-identiteter.** Ateljén har fungerande media_player.ateljen och media_player.jbl_link_500_67aa69, men gamla MA-/Cast-ID:n används fortfarande i scripts.yaml:1103 respektive automations.yaml:1165. Flytta referenser före rensning. Mannis gamla MA-post har en fungerande Cast-motsvarighet. Gamla TVn och Chromecast5575/Huset har fyra återställda poster sammanlagt, men deras avveckling behöver bekräftas. Kontorets högtalare saknar tydlig fungerande ersättare och ska felsökas före radering.
5. **Återställ önskade funktioner före generella undantag.** Luftfuktarens åtta entiteter är unavailable; vattenlarmet används i en enhetsbaserad automation. Kontrollera ström/Wi-Fi och VeSync. Felsök önskad Aqara-mätning, nlbwmon och UV-skyddsfönster. De nio kvarvarande Portainer-måtten kan inaktiveras/undantas om statistiken inte behövs, men är inte gamla värdposter.

## Skillnader mot analysen 12 oktober

Portainer-integrationen heter nu Portainer Tor och aktuellt endpoint 14 heter Tor. Roborocks kartentiteter finns inte längre i dagens zombieurval; inga åtgärder föreslås för dem. Push-monitorns upptids- och genomsnittsvärden finns nu; endast momentan svarstid flaggas. Sex gamla AP-signalsensorer och fyra gamla TV/Cast-poster behöver nu bedömas. Dagens jämförelse 182 → 103 avser tillstånden före/efter denna rensning, inte rapportens 180 den 12 oktober.

## Underlag och begränsningar

Live HA state machine och register; relevant core.config_entries; aktiv YAML, paket och lagrade Lovelace-paneler; aktuell Portainer API och Kuma metrics; installerad HAGHS/OpenWrt-kod samt tidigare verifierad integrationslogik för Kuma/ONVIF; aktuella core-loggar. Portainer visar återkommande avbrott/återanslutning av eventström på endpoint 14, men detta bevisar inte orsaken till saknad diskstatistik. Inga aktuella VeSync-fel syntes i det lästa loggutdraget; det utesluter inte nätverks- eller kontoproblem. Många last_changed ligger vid HA-start 20 oktober; dessa tider bevisar inte att problemen uppstod då. Ingen historisk otillgänglighet har beräknats från recorder.

## Alla 103 kvarvarande entiteter

### 1. `light.grupp_lampor_som_tands_vid_skymning`

- Integration: `group`. Tillstånd: `unavailable` sedan 2026-10-20 15:44:51 CEST. Återställd: nej.
- Enhet: ingen enhetskoppling.
- **Reparera.** Gruppens konfiguration har entities=[]. Används av tre automationer. Välj dagens avsedda lampor och fyll medlemslistan; radera inte gruppen utan att först ändra beroendena.
- Direkta entitetsreferenser i granskad YAML/Lovelace: automations.yaml:227, automations.yaml:250, automations.yaml:278.

### 2. `sensor.taklampor_kokson_aktiv_strom`

- Integration: `matter`. Tillstånd: `unknown` sedan 2026-10-20 15:45:00 CEST. Återställd: nej.
- Enhet: Taklampor.
- **Saknad mätdata.** Aktiv ström är unknown medan dimmer och energi fungerar. Sensorn refereras i Aqara-flashövervakningen. Kontrollera mätstöd/rapportering i dimmerns Matter-endpoint och firmware; behåll den om mätningen behövs. Undantag får inte ersätta felsökning av önskad mätfunktion.
- Direkta entitetsreferenser i granskad YAML/Lovelace: packages/aqara_taklampor_monitor.yaml:238.

### 3. `sensor.frigg_atervinningsbar_containerdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-21 06:22:55 CEST. Återställd: nej.
- Enhet: Tor.
- **Saknad statistik på aktuell värd.** Tillhör aktuella endpoint 14 (Tor) eller 15 (Fulla). Entiteten är aktiv men mätvärdet unknown. Övriga containrar rapporterar och berörda volymer finns kvar i Portainer. Detta är ingen kvarlämnad värdpost. Kontrollera stöd för disk-/volymstatistik i Docker/Portainer API. Om måttet inte behövs: inaktivera eller haghs_ignore på just sensorn. Radera inte enheten eller volymen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 4. `sensor.fulla_agent_atervinningsbar_containerdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-21 06:22:55 CEST. Återställd: nej.
- Enhet: Fulla.
- **Saknad statistik på aktuell värd.** Tillhör aktuella endpoint 14 (Tor) eller 15 (Fulla). Entiteten är aktiv men mätvärdet unknown. Övriga containrar rapporterar och berörda volymer finns kvar i Portainer. Detta är ingen kvarlämnad värdpost. Kontrollera stöd för disk-/volymstatistik i Docker/Portainer API. Om måttet inte behövs: inaktivera eller haghs_ignore på just sensorn. Radera inte enheten eller volymen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 5. `sensor.fulla_agent_total_storlek_pa_containerdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-21 06:22:55 CEST. Återställd: nej.
- Enhet: Fulla.
- **Saknad statistik på aktuell värd.** Tillhör aktuella endpoint 14 (Tor) eller 15 (Fulla). Entiteten är aktiv men mätvärdet unknown. Övriga containrar rapporterar och berörda volymer finns kvar i Portainer. Detta är ingen kvarlämnad värdpost. Kontrollera stöd för disk-/volymstatistik i Docker/Portainer API. Om måttet inte behövs: inaktivera eller haghs_ignore på just sensorn. Radera inte enheten eller volymen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 6. `sensor.fulla_agent_atervinningsbar_avbildningsdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-21 06:22:55 CEST. Återställd: nej.
- Enhet: Fulla.
- **Saknad statistik på aktuell värd.** Tillhör aktuella endpoint 14 (Tor) eller 15 (Fulla). Entiteten är aktiv men mätvärdet unknown. Övriga containrar rapporterar och berörda volymer finns kvar i Portainer. Detta är ingen kvarlämnad värdpost. Kontrollera stöd för disk-/volymstatistik i Docker/Portainer API. Om måttet inte behövs: inaktivera eller haghs_ignore på just sensorn. Radera inte enheten eller volymen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 7. `sensor.fulla_agent_total_storlek_pa_avbildningsdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-21 06:22:55 CEST. Återställd: nej.
- Enhet: Fulla.
- **Saknad statistik på aktuell värd.** Tillhör aktuella endpoint 14 (Tor) eller 15 (Fulla). Entiteten är aktiv men mätvärdet unknown. Övriga containrar rapporterar och berörda volymer finns kvar i Portainer. Detta är ingen kvarlämnad värdpost. Kontrollera stöd för disk-/volymstatistik i Docker/Portainer API. Om måttet inte behövs: inaktivera eller haghs_ignore på just sensorn. Radera inte enheten eller volymen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 8. `sensor.fulla_agent_total_storlek_pa_volymdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-21 06:22:55 CEST. Återställd: nej.
- Enhet: Fulla.
- **Saknad statistik på aktuell värd.** Tillhör aktuella endpoint 14 (Tor) eller 15 (Fulla). Entiteten är aktiv men mätvärdet unknown. Övriga containrar rapporterar och berörda volymer finns kvar i Portainer. Detta är ingen kvarlämnad värdpost. Kontrollera stöd för disk-/volymstatistik i Docker/Portainer API. Om måttet inte behövs: inaktivera eller haghs_ignore på just sensorn. Radera inte enheten eller volymen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 9. `sensor.ha_esphome_config_share_volymstorlek`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-21 06:22:55 CEST. Återställd: nej.
- Enhet: ha_esphome_config_share.
- **Saknad statistik på aktuell värd.** Tillhör aktuella endpoint 14 (Tor) eller 15 (Fulla). Entiteten är aktiv men mätvärdet unknown. Övriga containrar rapporterar och berörda volymer finns kvar i Portainer. Detta är ingen kvarlämnad värdpost. Kontrollera stöd för disk-/volymstatistik i Docker/Portainer API. Om måttet inte behövs: inaktivera eller haghs_ignore på just sensorn. Radera inte enheten eller volymen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 10. `sensor.6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487_volymstorlek_2`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-21 06:22:55 CEST. Återställd: nej.
- Enhet: 6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487.
- **Saknad statistik på aktuell värd.** Tillhör aktuella endpoint 14 (Tor) eller 15 (Fulla). Entiteten är aktiv men mätvärdet unknown. Övriga containrar rapporterar och berörda volymer finns kvar i Portainer. Detta är ingen kvarlämnad värdpost. Kontrollera stöd för disk-/volymstatistik i Docker/Portainer API. Om måttet inte behövs: inaktivera eller haghs_ignore på just sensorn. Radera inte enheten eller volymen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 11. `sensor.ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49_volymstorlek_2`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-21 06:22:55 CEST. Återställd: nej.
- Enhet: ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49.
- **Saknad statistik på aktuell värd.** Tillhör aktuella endpoint 14 (Tor) eller 15 (Fulla). Entiteten är aktiv men mätvärdet unknown. Övriga containrar rapporterar och berörda volymer finns kvar i Portainer. Detta är ingen kvarlämnad värdpost. Kontrollera stöd för disk-/volymstatistik i Docker/Portainer API. Om måttet inte behövs: inaktivera eller haghs_ignore på just sensorn. Radera inte enheten eller volymen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 12. `binary_sensor.openuv_skyddsfonster`

- Integration: `openuv`. Tillstånd: `unknown` sedan 2026-10-20 15:45:04 CEST. Återställd: nej.
- Enhet: OpenUV.
- **Saknat skyddsfönster.** Övriga UV-mått finns; dagens max UV är 0.7081. Skyddsfönstret är unknown. Saknade API-data eller uteblivet fönster vid lågt UV är möjliga orsaker, inte fastställda. Kontrollera skyddsfönsterhämtningen separat; inaktivera/undanta bara denna entitet om den inte används.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 13. `media_player.kontorets_hogtalare_ma`

- Integration: `music_assistant`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Kontorets högtalare.
- **Felsök högtalare/provider.** Kontorets MA-player är unavailable och gamla Cast-playern är restored/unavailable. Kontrollera fysisk högtalare och upptäckt, därefter MA-provider. Ingen grund att klassa den som säker dubblett ännu.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 14. `media_player.ateljens_hogtalare`

- Integration: `music_assistant`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Ateljéns högtalare.
- **Sannolikt ersatt MA-post.** Gamla MA-spelaren är unavailable men media_player.ateljen är idle och nuvarande Cast-spelare är tillgänglig. scripts.yaml:1103 refererar det gamla ID:t. Bekräfta provider/identitet, flytta skriptreferensen och rensa överflödig player hos Music Assistant före HA-rensning.
- Direkta entitetsreferenser i granskad YAML/Lovelace: scripts.yaml:1103.

### 15. `sensor.portainer_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Portainer.
- **Ej levererad certifikatdata.** Ingen certifikatsmetrik finns för denna monitor i aktuell export; flera monitorer använder HTTP. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 16. `sensor.uptime_via_caddy_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Uptime Kuma – direkt.
- **Ej levererad certifikatdata.** Ingen certifikatsmetrik finns för denna monitor i aktuell export; flera monitorer använder HTTP. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 17. `sensor.home_assistant_ui_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Home Assistant UI.
- **Ej levererad certifikatdata.** Ingen certifikatsmetrik finns för denna monitor i aktuell export; flera monitorer använder HTTP. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 18. `sensor.supervisor_health_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Supervisor Health.
- **Ej levererad certifikatdata.** Ingen certifikatsmetrik finns för denna monitor i aktuell export; flera monitorer använder HTTP. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 19. `sensor.core_api_wake_up_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Core API Wake-up.
- **Ej levererad certifikatdata.** Ingen certifikatsmetrik finns för denna monitor i aktuell export; flera monitorer använder HTTP. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 20. `sensor.glances_ui_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Glances UI.
- **Ej levererad certifikatdata.** Ingen certifikatsmetrik finns för denna monitor i aktuell export; flera monitorer använder HTTP. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 21. `sensor.ollama_api_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Ollama API.
- **Ej levererad certifikatdata.** Ingen certifikatsmetrik finns för denna monitor i aktuell export; flera monitorer använder HTTP. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 22. `sensor.ollama_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Ollama Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 23. `sensor.caddy_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Caddy Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 24. `sensor.ha_test_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: HA (Test) Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 25. `sensor.esphome_test_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: ESPHome (Test) Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 26. `sensor.glances_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Glances Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 27. `sensor.portainer_agent_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Portainer Agent Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 28. `sensor.docker_socket_proxy_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Docker Socket Proxy Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 29. `sensor.glances_container_svarstid_2`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Glances Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 30. `sensor.open_webui_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Open webUI Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 31. `sensor.openwrt_backup_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: OpenWRT Backup Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 32. `sensor.portainer_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Portainer Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 33. `sensor.uptime_kuma_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Uptime-kuma Container.
- **Förväntat saknad svarstid.** Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 34. `sensor.frigg_fulla_backup_och_diskhalsa_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Tor → Fulla – backup och diskhälsa.
- **Förväntat saknad push-svarstid.** Kuma-monitor 62 är push och up. Exporten anger monitor_response_time=-1, vilket integrationen gör till unknown. Upptids- och genomsnittsvärden finns nu, till skillnad från analysen 12 oktober. Inaktivera eller haghs_ignore på just momentan svarstid; behåll backupstatus och fungerande statistik.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 35. `binary_sensor.levoit_luftfukare_300s_lagt_vatten`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Lêvoit luftfukare 300S.
- **Felsök fysisk enhet/anslutning.** Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 36. `binary_sensor.levoit_luftfukare_300s_vattentanken_lyft`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Lêvoit luftfukare 300S.
- **Felsök fysisk enhet/anslutning.** Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 37. `humidifier.levoit_luftfukare_300s`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Lêvoit luftfukare 300S.
- **Felsök fysisk enhet/anslutning.** Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: .storage/lovelace.lovelace:1004.

### 38. `number.levoit_luftfukare_300s_dimniva`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Lêvoit luftfukare 300S.
- **Felsök fysisk enhet/anslutning.** Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 39. `select.levoit_luftfukare_300s_niva_for_nattljus`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Lêvoit luftfukare 300S.
- **Felsök fysisk enhet/anslutning.** Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 40. `switch.levoit_luftfukare_300s_visa`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Lêvoit luftfukare 300S.
- **Felsök fysisk enhet/anslutning.** Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 41. `switch.levoit_luftfukare_300s_automatisk_avstangning`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Lêvoit luftfukare 300S.
- **Felsök fysisk enhet/anslutning.** Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 42. `switch.honshuset_tapo_c200c_autofokus`

- Integration: `onvif`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Tapo C200C.
- **Förväntat unknown från implementationen.** ONVIFSwitch läser aldrig tillbaka reglagets tillstånd; _attr_is_on sätts först vid ett kommando. Kamera är idle och rörelsesensorer fungerar. Därför är detta inte bevis för offlinekamera. haghs_ignore på endast dessa reglage om de behövs; inaktivera oanvända reglage, särskilt torkare. Inga provkommandon rekommenderas enbart för HAGHS-poäng.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 43. `switch.honshuset_tapo_c200c_ir_lampa`

- Integration: `onvif`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Tapo C200C.
- **Förväntat unknown från implementationen.** ONVIFSwitch läser aldrig tillbaka reglagets tillstånd; _attr_is_on sätts först vid ett kommando. Kamera är idle och rörelsesensorer fungerar. Därför är detta inte bevis för offlinekamera. haghs_ignore på endast dessa reglage om de behövs; inaktivera oanvända reglage, särskilt torkare. Inga provkommandon rekommenderas enbart för HAGHS-poäng.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 44. `switch.honshuset_tapo_c200c_torkare`

- Integration: `onvif`. Tillstånd: `unknown` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Tapo C200C.
- **Förväntat unknown från implementationen.** ONVIFSwitch läser aldrig tillbaka reglagets tillstånd; _attr_is_on sätts först vid ett kommando. Kamera är idle och rörelsesensorer fungerar. Därför är detta inte bevis för offlinekamera. haghs_ignore på endast dessa reglage om de behövs; inaktivera oanvända reglage, särskilt torkare. Inga provkommandon rekommenderas enbart för HAGHS-poäng.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 45. `sensor.levoit_luftfukare_300s_luftfuktighet`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:05 CEST. Återställd: nej.
- Enhet: Lêvoit luftfukare 300S.
- **Felsök fysisk enhet/anslutning.** Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 46. `sensor.sovrummet_openwrt_one_router_sovrum_top_bandwidth_hosts`

- Integration: `openwrt`. Tillstånd: `unknown` sedan 2026-10-20 15:45:06 CEST. Återställd: nej.
- Enhet: OpenWrt One - Router Sovrum.
- **Saknad nlbwmon-data.** Routerns övriga sensorer fungerar. Kod returnerar None när nlbwmon_top_hosts saknas/tomt; attributen innehåller ingen värdlista. Kontrollera nlbwmon-insamling och rpcd-behörigheter om funktionen behövs. Annars inaktivera/undanta just denna sensor.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 47. `sensor.bordslampa_hemmabion_power`

- Integration: `powercalc`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:14 CEST. Återställd: nej.
- Enhet: ingen enhetskoppling.
- **Reparera källreferens.** Powercalc Bordslampa (hemmabion) pekar på light.bordslampa_vanster_old, som saknas i både aktuell state machine och register. light.bordslampa_vanster fungerar och har redan fungerande power-/energy-sensorer. Kontrollera fysisk identitet; återkoppla gamla beräkningen eller avveckla den dubbla beräkningen med hänsyn till energihistorik.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 48. `sensor.bordslampa_hemmabion_energy`

- Integration: `powercalc`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:14 CEST. Återställd: nej.
- Enhet: ingen enhetskoppling.
- **Reparera källreferens.** Powercalc Bordslampa (hemmabion) pekar på light.bordslampa_vanster_old, som saknas i både aktuell state machine och register. light.bordslampa_vanster fungerar och har redan fungerande power-/energy-sensorer. Kontrollera fysisk identitet; återkoppla gamla beräkningen eller avveckla den dubbla beräkningen med hänsyn till energihistorik.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 49. `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_device`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: nej.
- Enhet: Kontorets högtalare.
- **Felsök eller bekräfta borttagen enhet.** Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 50. `media_player.jbl_link_500`

- Integration: `cast`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Ateljéns högtalare.
- **Sannolikt ersatt Cast-post.** Den gamla Cast-posten är restored. media_player.jbl_link_500_67aa69 har samma visningsnamn och är tillgänglig (off). Gamla ID:t används i automations.yaml:1165. Kontrollera enhetsidentitet och flytta automationen innan gammal post inaktiveras/rensas.
- Direkta entitetsreferenser i granskad YAML/Lovelace: automations.yaml:1165.

### 51. `sensor.koket_taklampor_kokson_effekt`

- Integration: `matter`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Taklampor.
- **Sannolikt gammal mätentitet.** Effektposten är restored; lampan light.taklampor_kokson och energimätaren fungerar. Kontrollera om firmware/integrationen slutat exponera effektattributet. Inaktivera/rensa just den gamla effektposten när detta bekräftats; behåll Matter-enheten.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 52. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_device`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Google Home Ateljéns högtalare.
- **Sannolikt gammal Google Home-identitet.** Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 53. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Google Home Ateljéns högtalare.
- **Sannolikt gammal Google Home-identitet.** Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 54. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Google Home Ateljéns högtalare.
- **Sannolikt gammal Google Home-identitet.** Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 55. `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Google Home Ateljéns högtalare.
- **Sannolikt gammal Google Home-identitet.** Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 56. `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Google Home Ateljéns högtalare.
- **Sannolikt gammal Google Home-identitet.** Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 57. `media_player.verkstadens_hogtalare`

- Integration: `cast`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Kontorets högtalare.
- **Kontrollera högtalare/identitet.** Kontorets gamla Cast-post är restored och MA-spelaren är också unavailable. Ingen tydlig aktuell Cast-ersättare med samma visningsnamn hittades. Kontrollera ström, nätverk och upptäckt samt om högtalaren flyttats/bytts ut. Radera inte på grundval av namnet verkstadens_hogtalare; registervisningsnamnet är Kontorets högtalare.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 58. `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_alarms`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Kontorets högtalare.
- **Felsök eller bekräfta borttagen enhet.** Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 59. `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_timers`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Kontorets högtalare.
- **Felsök eller bekräfta borttagen enhet.** Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 60. `switch.google_home_kontorets_hogtalare_kontorets_hogtalare_do_not_disturb`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Kontorets högtalare.
- **Felsök eller bekräfta borttagen enhet.** Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 61. `number.google_home_kontorets_hogtalare_kontorets_hogtalare_alarm_volume`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Kontorets högtalare.
- **Felsök eller bekräfta borttagen enhet.** Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 62. `media_player.mannis_vackarklocka_ma`

- Integration: `music_assistant`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Mannis väckarklocka.
- **Sannolikt gammal MA-post.** MA-posten är restored, medan media_player.nesthubf174_5 (Mannis väckarklocka) är tillgänglig. Kontrollera aktuell MA-provider/player och ersättnings-ID. Reparera kopplingen eller rensa gammal player hos MA; fysisk väckarklocka behöver inte vara trasig.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 63. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms_2`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Ateljéns högtalare.
- **Delvis fungerande Google Home-enhet.** Fyra kontrollposter är restored/unavailable men device_2 visar 192.168.10.205. Ateljéns aktuella Cast och MA fungerar. Kontrollera stöd för larm, timer, DND och larmvolym på denna modell samt lokal autentisering/upptäckt. Inaktivera eller haghs_ignore på oanvända funktioner efter kontroll; undanta inte hela den fungerande högtalaren.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 64. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers_2`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Ateljéns högtalare.
- **Delvis fungerande Google Home-enhet.** Fyra kontrollposter är restored/unavailable men device_2 visar 192.168.10.205. Ateljéns aktuella Cast och MA fungerar. Kontrollera stöd för larm, timer, DND och larmvolym på denna modell samt lokal autentisering/upptäckt. Inaktivera eller haghs_ignore på oanvända funktioner efter kontroll; undanta inte hela den fungerande högtalaren.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 65. `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb_2`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Ateljéns högtalare.
- **Delvis fungerande Google Home-enhet.** Fyra kontrollposter är restored/unavailable men device_2 visar 192.168.10.205. Ateljéns aktuella Cast och MA fungerar. Kontrollera stöd för larm, timer, DND och larmvolym på denna modell samt lokal autentisering/upptäckt. Inaktivera eller haghs_ignore på oanvända funktioner efter kontroll; undanta inte hela den fungerande högtalaren.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 66. `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume_2`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Ateljéns högtalare.
- **Delvis fungerande Google Home-enhet.** Fyra kontrollposter är restored/unavailable men device_2 visar 192.168.10.205. Ateljéns aktuella Cast och MA fungerar. Kontrollera stöd för larm, timer, DND och larmvolym på denna modell samt lokal autentisering/upptäckt. Inaktivera eller haghs_ignore på oanvända funktioner efter kontroll; undanta inte hela den fungerande högtalaren.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 67. `sensor.openwrt_backup_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 68. `sensor.openwrt_backup_senaste_korning_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 69. `sensor.wyoming_whisper_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Wyoming Whisper Container.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 70. `sensor.openwrt_backup_status`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 71. `sensor.openwrt_backup_senaste_korning_status`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 72. `sensor.wyoming_whisper_container_status`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Wyoming Whisper Container.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 73. `sensor.openwrt_backup_monitortyp`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 74. `sensor.openwrt_backup_senaste_korning_monitortyp`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 75. `sensor.wyoming_whisper_container_monitortyp`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Wyoming Whisper Container.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 76. `sensor.openwrt_backup_upptid_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 77. `sensor.openwrt_backup_senaste_korning_upptid_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 78. `sensor.wyoming_whisper_container_upptid_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Wyoming Whisper Container.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 79. `sensor.openwrt_backup_upptid_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 80. `sensor.openwrt_backup_senaste_korning_upptid_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 81. `sensor.wyoming_whisper_container_upptid_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Wyoming Whisper Container.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 82. `sensor.openwrt_backup_upptid_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 83. `sensor.openwrt_backup_senaste_korning_upptid_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 84. `sensor.wyoming_whisper_container_upptid_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Wyoming Whisper Container.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 85. `sensor.openwrt_backup_svarstid_o_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 86. `sensor.openwrt_backup_senaste_korning_svarstid_o_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 87. `sensor.wyoming_whisper_container_svarstid_o_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Wyoming Whisper Container.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 88. `sensor.openwrt_backup_svarstid_o_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 89. `sensor.openwrt_backup_senaste_korning_svarstid_o_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 90. `sensor.wyoming_whisper_container_svarstid_o_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Wyoming Whisper Container.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 91. `sensor.openwrt_backup_svarstid_o_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 92. `sensor.openwrt_backup_senaste_korning_svarstid_o_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 93. `sensor.wyoming_whisper_container_svarstid_o_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Wyoming Whisper Container.
- **Stark rensningskandidat.** Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 94. `media_player.gamla_tvn`

- Integration: `cast`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Gamla TVn.
- **Kontrollera gammal TV/Cast-identitet.** Posten är restored/unavailable. Gamla TVn respektive Chromecast5575/Huset har gamla poster i både Cast och Music Assistant. Inga direkta YAML/Lovelace-referenser hittades. Bekräfta om den fysiska enheten/gruppen avvecklats eller fått nytt ID. Rensa därefter gammal player i källintegrationen och HA, eller reparera upptäckten om den fortfarande används. Namnet ensamt räcker inte som bevis för radering.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 95. `media_player.gamla_tvn_2`

- Integration: `music_assistant`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Gamla TVn.
- **Kontrollera gammal TV/Cast-identitet.** Posten är restored/unavailable. Gamla TVn respektive Chromecast5575/Huset har gamla poster i både Cast och Music Assistant. Inga direkta YAML/Lovelace-referenser hittades. Bekräfta om den fysiska enheten/gruppen avvecklats eller fått nytt ID. Rensa därefter gammal player i källintegrationen och HA, eller reparera upptäckten om den fortfarande används. Namnet ensamt räcker inte som bevis för radering.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 96. `media_player.chromecast5575`

- Integration: `music_assistant`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Huset.
- **Kontrollera gammal TV/Cast-identitet.** Posten är restored/unavailable. Gamla TVn respektive Chromecast5575/Huset har gamla poster i både Cast och Music Assistant. Inga direkta YAML/Lovelace-referenser hittades. Bekräfta om den fysiska enheten/gruppen avvecklats eller fått nytt ID. Rensa därefter gammal player i källintegrationen och HA, eller reparera upptäckten om den fortfarande används. Namnet ensamt räcker inte som bevis för radering.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 97. `media_player.chromecast5575_2`

- Integration: `cast`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: Chromecast5575.
- **Kontrollera gammal TV/Cast-identitet.** Posten är restored/unavailable. Gamla TVn respektive Chromecast5575/Huset har gamla poster i både Cast och Music Assistant. Inga direkta YAML/Lovelace-referenser hittades. Bekräfta om den fysiska enheten/gruppen avvecklats eller fått nytt ID. Rensa därefter gammal player i källintegrationen och HA, eller reparera upptäckten om den fortfarande används. Namnet ensamt räcker inte som bevis för radering.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 98. `sensor.ssid_olofsson_wifi_2_4_ghz_signal`

- Integration: `openwrt`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: SSID OLOFSSON_WIFI (2.4 GHz).
- **Tydlig gammal AP-signalpost.** Sex signalentiteter på kontorets AP är restored/unavailable. Installerad wireless.py skapar stationsmått bara när mode inte är ap/master/access point. AP:n är ansluten och har 20 klienter. Inaktivera eller rensa dessa gamla signalentiteter; behåll AP:n och SSID-funktionerna. Inga direkta referenser hittades. Fyra mått per SSID finns i registret, varav de övriga tre redan är inaktiverade av integrationen; dessa kan granskas samtidigt.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 99. `sensor.ssid_olofsson_guest_2_4_ghz_signal`

- Integration: `openwrt`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: SSID OLOFSSON_GUEST (2.4 GHz).
- **Tydlig gammal AP-signalpost.** Sex signalentiteter på kontorets AP är restored/unavailable. Installerad wireless.py skapar stationsmått bara när mode inte är ap/master/access point. AP:n är ansluten och har 20 klienter. Inaktivera eller rensa dessa gamla signalentiteter; behåll AP:n och SSID-funktionerna. Inga direkta referenser hittades. Fyra mått per SSID finns i registret, varav de övriga tre redan är inaktiverade av integrationen; dessa kan granskas samtidigt.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 100. `sensor.ssid_olofsson_iot_2_4_ghz_signal`

- Integration: `openwrt`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: SSID OLOFSSON_IOT (2.4 GHz).
- **Tydlig gammal AP-signalpost.** Sex signalentiteter på kontorets AP är restored/unavailable. Installerad wireless.py skapar stationsmått bara när mode inte är ap/master/access point. AP:n är ansluten och har 20 klienter. Inaktivera eller rensa dessa gamla signalentiteter; behåll AP:n och SSID-funktionerna. Inga direkta referenser hittades. Fyra mått per SSID finns i registret, varav de övriga tre redan är inaktiverade av integrationen; dessa kan granskas samtidigt.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 101. `sensor.ssid_olofsson_wifi_5_ghz_signal`

- Integration: `openwrt`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: SSID OLOFSSON_WIFI (5 GHz).
- **Tydlig gammal AP-signalpost.** Sex signalentiteter på kontorets AP är restored/unavailable. Installerad wireless.py skapar stationsmått bara när mode inte är ap/master/access point. AP:n är ansluten och har 20 klienter. Inaktivera eller rensa dessa gamla signalentiteter; behåll AP:n och SSID-funktionerna. Inga direkta referenser hittades. Fyra mått per SSID finns i registret, varav de övriga tre redan är inaktiverade av integrationen; dessa kan granskas samtidigt.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 102. `sensor.ssid_olofsson_guest_5_ghz_signal`

- Integration: `openwrt`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: SSID OLOFSSON_GUEST (5 GHz).
- **Tydlig gammal AP-signalpost.** Sex signalentiteter på kontorets AP är restored/unavailable. Installerad wireless.py skapar stationsmått bara när mode inte är ap/master/access point. AP:n är ansluten och har 20 klienter. Inaktivera eller rensa dessa gamla signalentiteter; behåll AP:n och SSID-funktionerna. Inga direkta referenser hittades. Fyra mått per SSID finns i registret, varav de övriga tre redan är inaktiverade av integrationen; dessa kan granskas samtidigt.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

### 103. `sensor.ssid_olofsson_iot_5_ghz_signal`

- Integration: `openwrt`. Tillstånd: `unavailable` sedan 2026-10-20 15:45:13 CEST. Återställd: ja.
- Enhet: SSID OLOFSSON_IOT (5 GHz).
- **Tydlig gammal AP-signalpost.** Sex signalentiteter på kontorets AP är restored/unavailable. Installerad wireless.py skapar stationsmått bara när mode inte är ap/master/access point. AP:n är ansluten och har 20 klienter. Inaktivera eller rensa dessa gamla signalentiteter; behåll AP:n och SSID-funktionerna. Inga direkta referenser hittades. Fyra mått per SSID finns i registret, varav de övriga tre redan är inaktiverade av integrationen; dessa kan granskas samtidigt.
- Direkta entitetsreferenser i granskad YAML/Lovelace: inga hittade.

## Borttagna poster

### Fulla — `ee5b2dbd8277019c8cebff9bff2c3703`

Orsak: Tidigare endpoint 3 saknas i Portainer. 21 entiteter.

- `binary_sensor.fulla_status`
- `button.fulla_rensa_oanvanda_avbildningar`
- `button.fulla_rensa_oanvanda_volymer`
- `sensor.fulla_api_version`
- `sensor.fulla_kernel_version`
- `sensor.fulla_operativsystem`
- `sensor.fulla_operativsystemets_version`
- `sensor.fulla_docker_version`
- `sensor.fulla_arkitektur`
- `sensor.fulla_antal_behallare`
- `sensor.fulla_behallare_som_kors`
- `sensor.fulla_behallare_stoppade`
- `sensor.fulla_behallare_pausade`
- `sensor.fulla_antal_avbildningar`
- `sensor.fulla_totalt_minne`
- `sensor.fulla_totalt_cpu`
- `sensor.fulla_atervinningsbar_containerdiskanvandning`
- `sensor.fulla_total_storlek_pa_containerdiskanvandning`
- `sensor.fulla_atervinningsbar_avbildningsdiskanvandning`
- `sensor.fulla_total_storlek_pa_avbildningsdiskanvandning`
- `sensor.fulla_total_storlek_pa_volymdiskanvandning`

### uptime-kuma — `cdbc12982cf26b88bd3ae9ac7608f421`

Orsak: Tidigare endpoint 3 saknas i Portainer. 0 entiteter.


### diun — `5edc0817ef564818d732dd6b47b45208`

Orsak: Tidigare endpoint 3 saknas i Portainer. 0 entiteter.


### portainer — `ff7f5a238726f9af51877692e87f7adb`

Orsak: Tidigare endpoint 3 saknas i Portainer. 0 entiteter.


### glances — `84e4c4b846439589aa9f56db2c442c09`

Orsak: Tidigare endpoint 3 saknas i Portainer. 0 entiteter.


### openwrt-backup — `17149d20cbece12fd7c0003515efb38e`

Orsak: Tidigare endpoint 3 saknas i Portainer. 0 entiteter.


### wyoming-whisper — `1315dc3a9b93cc84fdfc63077958c7e1`

Orsak: Tidigare endpoint 3 saknas i Portainer. 0 entiteter.


### 6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487 — `c5e62156ade4c152da1d02d3cf09c5a2`

Orsak: Tidigare endpoint 3 saknas i Portainer. 2 entiteter.

- `sensor.6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487_volymdrivrutin`
- `sensor.6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487_volymstorlek`

### ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49 — `51c82eb6b64cdea5f2bdf6cce0f9c0bc`

Orsak: Tidigare endpoint 3 saknas i Portainer. 2 entiteter.

- `sensor.ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49_volymdrivrutin`
- `sensor.ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49_volymstorlek`

### wyoming-whisper-old — `9deae7e659046968aaf7d8361a482d46`

Orsak: Tidigare endpoint 3 saknas i Portainer. 0 entiteter.


### diun — `fff7910bbade62b13bd6735a7c995827`

Orsak: Container saknas på endpoint 14. 17 entiteter.

- `binary_sensor.diun_status`
- `button.diun_starta_om_container`
- `button.diun_pausa_container`
- `button.diun_ateruppta_container`
- `button.diun_aterskapa_containern`
- `button.diun_doda_container`
- `event.diun_docker_handelse`
- `sensor.diun_bild`
- `sensor.diun_avbildning_version`
- `sensor.diun_avbildning_skapad`
- `sensor.diun_tillstand`
- `sensor.diun_minnesgrans`
- `sensor.diun_minnesanvandning`
- `sensor.diun_minnesanvandning_i_procent`
- `sensor.diun_cpu_anvandning_totalt`
- `switch.diun_behallare`
- `update.diun_avbildningsuppdatering_tillganglig`

### uptime-kuma — `edd16be8faed13c0302c327f91b6d0d6`

Orsak: Container saknas på endpoint 15. 0 entiteter.


### wyoming-whisper — `113682b0edec52bf1588759156ea5f77`

Orsak: Container saknas på endpoint 15. 21 entiteter.

- `binary_sensor.wyoming_whisper_status`
- `button.wyoming_whisper_starta_om_container`
- `button.wyoming_whisper_pausa_container`
- `button.wyoming_whisper_ateruppta_container`
- `button.wyoming_whisper_aterskapa_containern`
- `button.wyoming_whisper_doda_container`
- `event.wyoming_whisper_docker_handelse`
- `sensor.wyoming_whisper_bild`
- `sensor.wyoming_whisper_avbildning_version`
- `sensor.wyoming_whisper_avbildning_skapad`
- `sensor.wyoming_whisper_tillstand`
- `sensor.wyoming_whisper_halsa`
- `sensor.wyoming_whisper_minnesgrans`
- `sensor.wyoming_whisper_minnesanvandning`
- `sensor.wyoming_whisper_minnesanvandning_i_procent`
- `sensor.wyoming_whisper_cpu_anvandning_totalt`
- `switch.wyoming_whisper_behallare`
- `update.wyoming_whisper_avbildningsuppdatering_tillganglig`
- `binary_sensor.wyoming_whisper_out_of_memory`
- `sensor.wyoming_whisper_started`
- `sensor.wyoming_whisper_restart_count`

### openwrt-backup — `e79836da4aec2f714c31ce10db795f05`

Orsak: Container saknas på endpoint 15. 0 entiteter.


### wyoming-whisper-old — `276ad2298ff12687826353653331aaa4`

Orsak: Container saknas på endpoint 15. 17 entiteter.

- `button.wyoming_whisper_old_starta_om_container`
- `button.wyoming_whisper_old_pausa_container`
- `button.wyoming_whisper_old_ateruppta_container`
- `button.wyoming_whisper_old_aterskapa_containern`
- `button.wyoming_whisper_old_doda_container`
- `event.wyoming_whisper_old_docker_handelse`
- `sensor.wyoming_whisper_old_bild`
- `sensor.wyoming_whisper_old_avbildning_version`
- `sensor.wyoming_whisper_old_avbildning_skapad`
- `sensor.wyoming_whisper_old_tillstand`
- `sensor.wyoming_whisper_old_halsa`
- `sensor.wyoming_whisper_old_minnesgrans`
- `sensor.wyoming_whisper_old_minnesanvandning`
- `sensor.wyoming_whisper_old_minnesanvandning_i_procent`
- `sensor.wyoming_whisper_old_cpu_anvandning_totalt`
- `switch.wyoming_whisper_old_behallare`
- `update.wyoming_whisper_old_avbildningsuppdatering_tillganglig`

### whisper-analysis-gpu — `c73e3e00e09bbe7307bbbe9d36a994a8`

Orsak: Container saknas på endpoint 14. 17 entiteter.

- `binary_sensor.whisper_analysis_gpu_status`
- `button.whisper_analysis_gpu_starta_om_container`
- `button.whisper_analysis_gpu_pausa_container`
- `button.whisper_analysis_gpu_ateruppta_container`
- `button.whisper_analysis_gpu_aterskapa_containern`
- `button.whisper_analysis_gpu_doda_container`
- `event.whisper_analysis_gpu_docker_handelse`
- `sensor.whisper_analysis_gpu_bild`
- `sensor.whisper_analysis_gpu_avbildning_version`
- `sensor.whisper_analysis_gpu_avbildning_skapad`
- `sensor.whisper_analysis_gpu_tillstand`
- `sensor.whisper_analysis_gpu_minnesgrans`
- `sensor.whisper_analysis_gpu_minnesanvandning`
- `sensor.whisper_analysis_gpu_minnesanvandning_i_procent`
- `sensor.whisper_analysis_gpu_cpu_anvandning_totalt`
- `switch.whisper_analysis_gpu_behallare`
- `update.whisper_analysis_gpu_avbildningsuppdatering_tillganglig`

### whisper-analysis-cpu — `ae9544648d8d0bb5c159050d24c35188`

Orsak: Container saknas på endpoint 14. 17 entiteter.

- `binary_sensor.whisper_analysis_cpu_status`
- `button.whisper_analysis_cpu_starta_om_container`
- `button.whisper_analysis_cpu_pausa_container`
- `button.whisper_analysis_cpu_ateruppta_container`
- `button.whisper_analysis_cpu_aterskapa_containern`
- `button.whisper_analysis_cpu_doda_container`
- `event.whisper_analysis_cpu_docker_handelse`
- `sensor.whisper_analysis_cpu_bild`
- `sensor.whisper_analysis_cpu_avbildning_version`
- `sensor.whisper_analysis_cpu_avbildning_skapad`
- `sensor.whisper_analysis_cpu_tillstand`
- `sensor.whisper_analysis_cpu_minnesgrans`
- `sensor.whisper_analysis_cpu_minnesanvandning`
- `sensor.whisper_analysis_cpu_minnesanvandning_i_procent`
- `sensor.whisper_analysis_cpu_cpu_anvandning_totalt`
- `switch.whisper_analysis_cpu_behallare`
- `update.whisper_analysis_cpu_avbildningsuppdatering_tillganglig`

### whisper-analysis-offline — `c62d3a65989a2cbf10fb49cc874eb9c7`

Orsak: Container saknas på endpoint 14. 17 entiteter.

- `binary_sensor.whisper_analysis_offline_status`
- `button.whisper_analysis_offline_starta_om_container`
- `button.whisper_analysis_offline_pausa_container`
- `button.whisper_analysis_offline_ateruppta_container`
- `button.whisper_analysis_offline_aterskapa_containern`
- `button.whisper_analysis_offline_doda_container`
- `event.whisper_analysis_offline_docker_handelse`
- `sensor.whisper_analysis_offline_bild`
- `sensor.whisper_analysis_offline_avbildning_version`
- `sensor.whisper_analysis_offline_avbildning_skapad`
- `sensor.whisper_analysis_offline_tillstand`
- `sensor.whisper_analysis_offline_minnesgrans`
- `sensor.whisper_analysis_offline_minnesanvandning`
- `sensor.whisper_analysis_offline_minnesanvandning_i_procent`
- `sensor.whisper_analysis_offline_cpu_anvandning_totalt`
- `switch.whisper_analysis_offline_behallare`
- `update.whisper_analysis_offline_avbildningsuppdatering_tillganglig`

