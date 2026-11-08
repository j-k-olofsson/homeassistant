# HAGHS: analys av samtliga 180 misstänkta entiteter

Granskning 2026-10-12 13:05 CEST. Home Assistant 2026.10.1, HAGHS 2.3.0. Hälsopoäng 94 %, hårdvara 100 %, applikation 90 %.

Inga enheter, entiteter, etiketter, automationer eller integrationsinställningar har ändrats. Inga tjänster har anropats för uppdatering, omstart eller fysisk styrning. Endast denna analysrapport har skapats; tillfälligt analysunderlag finns i /tmp.

## Omfattning och metod

HAGHS räknar 180 entiteter, inte 180 fysiska enheter. Attributet zombie_entities är begränsat till 100. Alla 180 har rekonstruerats från aktuella tillstånd med integrationens installerade domänlista, tillstånd unknown/unavailable, 15 minuters resp. 60 minuters batterigräns, inaktiveringsfilter och haghs_ignore på entitet/enhet. De första 100 matchar exakt HAGHS-listan och totalsumma/domänfördelning matchar. Samtliga 180 finns i entitetsregistret; inga oregistrerade spökentiteter i detta urval. HA startade 11 oktober omkring 15:16 lokal tid; alla kandidater är äldre än karenstiderna. Tidsstämplar sedan denna start visar inte hur länge problemet funnits före omstarten.

Underlag: aktuell HA state machine via Supervisor (GET), registerfiler core.entity_registry/core.device_registry/core.config_entries (lästa), aktiv YAML och lagrade Lovelace-dashboarder, installerad integrationskod, aktuella core-loggar, Portainer GET /api/endpoints och /docker/containers/json?all=1 samt /docker/volumes på endpoint 14/15, Uptime Kuma GET /metrics. Behörighetsuppgifter har inte lagts i rapporten.

Register lästes från .storage, inte via live register-WebSocket. Exakta entitetsreferenser i aktiv YAML och Lovelace kontrollerades; enhets-ID:n i automationer/skript/paket kontrollerades separat. Dynamiska mål, externa system och alla indirekta referenser kan inte uteslutas genom dessa sökningar. Inga historikslutsatser dras från recorder; filtret är aktivt. restored=true betyder att HA återställt en registerpost utan att integrationen för närvarande levererar en aktiv entitet, men bevisar inte ensam att posten säkert kan raderas.

## Prioriterade förslag

1. Reparera skymningsgruppen: medlemslistan är tom och tre automationer använder den. Dagens önskade lampor måste väljas.
2. Reparera Powercalc-källan för hemmabions bordslampa. Källan *_old saknas och den nuvarande lampan har redan fungerande energisensorer; kontrollera vilken beräkning som ska behållas.
3. Kontrollera luftfuktaren (åtta flaggningar) och kontorets högtalare (sju flaggningar över tre integrationer). Luftfuktarens vattenlarm används av en aktiv automation.
4. Granska rensningskandidater i Portainer och Kuma: 64 containerposter saknar motsvarande container på sin tidigare värd. 27 Kuma-poster hör till tre monitor-ID:n som saknas i exporten. Detta gäller gamla HA-poster; Docker-volymer ska inte raderas. Fullas elva återställda endpointposter och fyra gamla volymposter kräver kontroll av ersatta identiteter.
5. Bekräfta ersatta högtalaridentiteter och flytta gamla referenser innan rensning: Ateljéns gamla Cast-player används av automation och gamla MA-player av skript. Mannis gamla MA-player har en fungerande fysisk Cast-motsvarighet.
6. Minska falska larm med entitetsvisa undantag eller inaktivering: tolv Docker-svarstider i Kuma är -1 från källan, sju certifikatssensorer hör till fungerande HTTP-monitorer och saknar därför TLS-certifikatdata, tre ONVIF-reglage läser inte aktuellt läge. Kontrollera även sju mått på push-monitorn och nio Portainer-disk/volymmått. Behåll drift-/backupstatus och märk inte hela fungerande enheter för att dölja isolerad diagnostik.
7. Felsök återstående mätfunktioner: Aqara ström/effekt, Max kartmetadata, OpenWrt nlbwmon och OpenUV-skyddsfönstret. De tillhör enheter/integrationer som i övrigt levererar värden.

## Fördelning

| Integration | Antal |
|---|---:|
| group | 1 |
| matter | 2 |
| openuv | 1 |
| portainer | 88 |
| uptime_kuma | 53 |
| roborock | 2 |
| music_assistant | 3 |
| vesync | 8 |
| powercalc | 2 |
| openwrt | 1 |
| cast | 2 |
| google_home | 14 |
| onvif | 3 |

## Alla entiteter med bedömning

### 1. `light.grupp_lampor_som_tands_vid_skymning`

- Integration: `group`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:30 CEST. Återställd post: nej.
- Enhet: ingen enhetskoppling.
- Bedömning: **Reparera**. Gruppens konfiguration har entities=[]. Används av tre automationer. Välj dagens avsedda lampor och fyll medlemslistan; radera inte gruppen utan att först ändra beroendena.
- Hittade direkta referenser: automations.yaml:227, automations.yaml:250, automations.yaml:278.

### 2. `sensor.taklampor_kokson_aktiv_strom`

- Integration: `matter`. Tillstånd: `unknown` sedan 2026-10-11 15:16:38 CEST. Återställd post: nej.
- Enhet: Taklampor.
- Bedömning: **Saknad mätdata**. Aktiv ström är unknown medan dimmer och energi fungerar. Sensorn refereras i Aqara-flashövervakningen. Kontrollera mätstöd/rapportering i dimmerns Matter-endpoint och firmware; behåll den om mätningen behövs. Undantag får inte ersätta felsökning av önskad mätfunktion.
- Hittade direkta referenser: packages/aqara_taklampor_monitor.yaml:238.

### 3. `binary_sensor.openuv_skyddsfonster`

- Integration: `openuv`. Tillstånd: `unknown` sedan 2026-10-11 15:16:42 CEST. Återställd post: nej.
- Enhet: OpenUV.
- Bedömning: **Saknat skyddsfönster**. Övriga UV-mått finns; max UV cirka 1,05. Skyddsfönstret är unknown. Saknade API-data eller uteblivet fönster vid lågt UV är möjliga orsaker, inte fastställda. Kontrollera skyddsfönsterhämtningen separat; inaktivera/undanta bara denna entitet om den inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 4. `sensor.frigg_atervinningsbar_containerdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-11 15:16:55 CEST. Återställd post: nej.
- Enhet: Frigg.
- Bedömning: **Saknad disk-/volymdata**. Aktiv entitet saknar diskstorleksdata. Övrig Portainer-övervakning fungerar. Volym-listorna saknar UsageData även för befintliga volymer. Kontrollera diskstatistik i Portainer/Docker API och integrationsmappningen. Inaktivera eller haghs_ignore på endast denna diagnostik om värdet inte kan levereras eller inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 5. `sensor.fulla_agent_atervinningsbar_containerdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-11 15:16:55 CEST. Återställd post: nej.
- Enhet: Fulla.
- Bedömning: **Saknad disk-/volymdata**. Aktiv entitet saknar diskstorleksdata. Övrig Portainer-övervakning fungerar. Volym-listorna saknar UsageData även för befintliga volymer. Kontrollera diskstatistik i Portainer/Docker API och integrationsmappningen. Inaktivera eller haghs_ignore på endast denna diagnostik om värdet inte kan levereras eller inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 6. `sensor.fulla_agent_total_storlek_pa_containerdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-11 15:16:55 CEST. Återställd post: nej.
- Enhet: Fulla.
- Bedömning: **Saknad disk-/volymdata**. Aktiv entitet saknar diskstorleksdata. Övrig Portainer-övervakning fungerar. Volym-listorna saknar UsageData även för befintliga volymer. Kontrollera diskstatistik i Portainer/Docker API och integrationsmappningen. Inaktivera eller haghs_ignore på endast denna diagnostik om värdet inte kan levereras eller inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 7. `sensor.fulla_agent_atervinningsbar_avbildningsdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-11 15:16:55 CEST. Återställd post: nej.
- Enhet: Fulla.
- Bedömning: **Saknad disk-/volymdata**. Aktiv entitet saknar diskstorleksdata. Övrig Portainer-övervakning fungerar. Volym-listorna saknar UsageData även för befintliga volymer. Kontrollera diskstatistik i Portainer/Docker API och integrationsmappningen. Inaktivera eller haghs_ignore på endast denna diagnostik om värdet inte kan levereras eller inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 8. `sensor.fulla_agent_total_storlek_pa_avbildningsdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-11 15:16:55 CEST. Återställd post: nej.
- Enhet: Fulla.
- Bedömning: **Saknad disk-/volymdata**. Aktiv entitet saknar diskstorleksdata. Övrig Portainer-övervakning fungerar. Volym-listorna saknar UsageData även för befintliga volymer. Kontrollera diskstatistik i Portainer/Docker API och integrationsmappningen. Inaktivera eller haghs_ignore på endast denna diagnostik om värdet inte kan levereras eller inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 9. `sensor.fulla_agent_total_storlek_pa_volymdiskanvandning`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-11 15:16:55 CEST. Återställd post: nej.
- Enhet: Fulla.
- Bedömning: **Saknad disk-/volymdata**. Aktiv entitet saknar diskstorleksdata. Övrig Portainer-övervakning fungerar. Volym-listorna saknar UsageData även för befintliga volymer. Kontrollera diskstatistik i Portainer/Docker API och integrationsmappningen. Inaktivera eller haghs_ignore på endast denna diagnostik om värdet inte kan levereras eller inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 10. `sensor.ha_esphome_config_share_volymstorlek`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: ha_esphome_config_share.
- Bedömning: **Saknad disk-/volymdata**. Aktiv entitet saknar diskstorleksdata. Övrig Portainer-övervakning fungerar. Volym-listorna saknar UsageData även för befintliga volymer. Kontrollera diskstatistik i Portainer/Docker API och integrationsmappningen. Inaktivera eller haghs_ignore på endast denna diagnostik om värdet inte kan levereras eller inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 11. `sensor.6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487_volymstorlek_2`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: 6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487.
- Bedömning: **Saknad disk-/volymdata**. Aktiv entitet saknar diskstorleksdata. Övrig Portainer-övervakning fungerar. Volym-listorna saknar UsageData även för befintliga volymer. Kontrollera diskstatistik i Portainer/Docker API och integrationsmappningen. Inaktivera eller haghs_ignore på endast denna diagnostik om värdet inte kan levereras eller inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 12. `sensor.ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49_volymstorlek_2`

- Integration: `portainer`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49.
- Bedömning: **Saknad disk-/volymdata**. Aktiv entitet saknar diskstorleksdata. Övrig Portainer-övervakning fungerar. Volym-listorna saknar UsageData även för befintliga volymer. Kontrollera diskstatistik i Portainer/Docker API och integrationsmappningen. Inaktivera eller haghs_ignore på endast denna diagnostik om värdet inte kan levereras eller inte används.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 13. `sensor.portainer_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Portainer.
- Bedömning: **Ej levererad certifikatdata**. Ingen certifikatsmetrik finns för denna monitor i aktuell export; dess övervakade URL använder HTTP och monitorns status är up. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 14. `sensor.uptime_via_caddy_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Uptime Kuma – direkt.
- Bedömning: **Ej levererad certifikatdata**. Ingen certifikatsmetrik finns för denna monitor i aktuell export; dess övervakade URL använder HTTP och monitorns status är up. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 15. `sensor.home_assistant_ui_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Home Assistant UI.
- Bedömning: **Ej levererad certifikatdata**. Ingen certifikatsmetrik finns för denna monitor i aktuell export; dess övervakade URL använder HTTP och monitorns status är up. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 16. `sensor.supervisor_health_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Supervisor Health.
- Bedömning: **Ej levererad certifikatdata**. Ingen certifikatsmetrik finns för denna monitor i aktuell export; dess övervakade URL använder HTTP och monitorns status är up. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 17. `sensor.core_api_wake_up_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Core API Wake-up.
- Bedömning: **Ej levererad certifikatdata**. Ingen certifikatsmetrik finns för denna monitor i aktuell export; dess övervakade URL använder HTTP och monitorns status är up. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 18. `sensor.glances_ui_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Glances UI.
- Bedömning: **Ej levererad certifikatdata**. Ingen certifikatsmetrik finns för denna monitor i aktuell export; dess övervakade URL använder HTTP och monitorns status är up. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 19. `sensor.ollama_api_certifikatets_utgangsdatum`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Ollama API.
- Bedömning: **Ej levererad certifikatdata**. Ingen certifikatsmetrik finns för denna monitor i aktuell export; dess övervakade URL använder HTTP och monitorns status är up. Detta visar inte ett utgånget certifikat. Inaktivera/haghs_ignore på sensorn om monitorn avsiktligt kör HTTP; om HTTPS och certifikatövervakning är avsedd, felsök URL och SSL-insamling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 20. `sensor.ollama_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Ollama Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 21. `sensor.caddy_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Caddy Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 22. `sensor.ha_test_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: HA (Test) Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 23. `sensor.esphome_test_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: ESPHome (Test) Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 24. `sensor.glances_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Glances Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 25. `sensor.portainer_agent_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Portainer Agent Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 26. `sensor.docker_socket_proxy_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Docker Socket Proxy Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 27. `sensor.glances_container_svarstid_2`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Glances Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 28. `sensor.open_webui_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Open webUI Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 29. `sensor.openwrt_backup_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: OpenWRT Backup Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 30. `sensor.portainer_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Portainer Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 31. `sensor.uptime_kuma_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Uptime-kuma Container.
- Bedömning: **Förväntat saknad svarstid**. Docker-monitorn finns och är up, men exportens monitor_response_time=-1. Integrationskoden omvandlar negativa svarstider till None/unknown. Inaktivera eller haghs_ignore på just svarstidssensorn; behåll statusövervakningen.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 32. `sensor.frigg_fulla_backup_och_diskhalsa_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Frigg → Fulla – backup och diskhälsa.
- Bedömning: **Begränsad push-metrik**. Monitor 62 är push och status up. Exporten ger svarstid -1 och saknar upptids-/genomsnittsmått för denna monitor. Kontrollera att pushjobbet levererar önskad mätdata och att exporten stöder statistiken. Undanta/inaktivera endast mått som inte är avsedda att finnas; behåll backupstatus.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 33. `sensor.frigg_fulla_backup_och_diskhalsa_upptid_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Frigg → Fulla – backup och diskhälsa.
- Bedömning: **Begränsad push-metrik**. Monitor 62 är push och status up. Exporten ger svarstid -1 och saknar upptids-/genomsnittsmått för denna monitor. Kontrollera att pushjobbet levererar önskad mätdata och att exporten stöder statistiken. Undanta/inaktivera endast mått som inte är avsedda att finnas; behåll backupstatus.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 34. `sensor.frigg_fulla_backup_och_diskhalsa_upptid_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Frigg → Fulla – backup och diskhälsa.
- Bedömning: **Begränsad push-metrik**. Monitor 62 är push och status up. Exporten ger svarstid -1 och saknar upptids-/genomsnittsmått för denna monitor. Kontrollera att pushjobbet levererar önskad mätdata och att exporten stöder statistiken. Undanta/inaktivera endast mått som inte är avsedda att finnas; behåll backupstatus.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 35. `sensor.frigg_fulla_backup_och_diskhalsa_upptid_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Frigg → Fulla – backup och diskhälsa.
- Bedömning: **Begränsad push-metrik**. Monitor 62 är push och status up. Exporten ger svarstid -1 och saknar upptids-/genomsnittsmått för denna monitor. Kontrollera att pushjobbet levererar önskad mätdata och att exporten stöder statistiken. Undanta/inaktivera endast mått som inte är avsedda att finnas; behåll backupstatus.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 36. `sensor.frigg_fulla_backup_och_diskhalsa_svarstid_o_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Frigg → Fulla – backup och diskhälsa.
- Bedömning: **Begränsad push-metrik**. Monitor 62 är push och status up. Exporten ger svarstid -1 och saknar upptids-/genomsnittsmått för denna monitor. Kontrollera att pushjobbet levererar önskad mätdata och att exporten stöder statistiken. Undanta/inaktivera endast mått som inte är avsedda att finnas; behåll backupstatus.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 37. `sensor.frigg_fulla_backup_och_diskhalsa_svarstid_o_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Frigg → Fulla – backup och diskhälsa.
- Bedömning: **Begränsad push-metrik**. Monitor 62 är push och status up. Exporten ger svarstid -1 och saknar upptids-/genomsnittsmått för denna monitor. Kontrollera att pushjobbet levererar önskad mätdata och att exporten stöder statistiken. Undanta/inaktivera endast mått som inte är avsedda att finnas; behåll backupstatus.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 38. `sensor.frigg_fulla_backup_och_diskhalsa_svarstid_o_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Frigg → Fulla – backup och diskhälsa.
- Bedömning: **Begränsad push-metrik**. Monitor 62 är push och status up. Exporten ger svarstid -1 och saknar upptids-/genomsnittsmått för denna monitor. Kontrollera att pushjobbet levererar önskad mätdata och att exporten stöder statistiken. Undanta/inaktivera endast mått som inte är avsedda att finnas; behåll backupstatus.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 39. `select.max_vald_karta`

- Integration: `roborock`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Max S6 MaxV.
- Bedömning: **Saknad kartmetadata**. Max är docked, har batteri 100 och status charging. Vald karta har två val men saknar current_map_data; nuvarande rum kräver dessutom kartans vacuum_room. Kontrollera kartfunktion och hämtning i integrationen/Roborock-appen. Kartval används på dashboarden. Undanta bara om unknown är förväntat och funktionen inte behövs.
- Hittade direkta referenser: .storage/lovelace.lovelace:396, .storage/lovelace.lovelace:2661.

### 40. `sensor.max_s6_maxv_nuvarande_rum`

- Integration: `roborock`. Tillstånd: `unknown` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Max S6 MaxV.
- Bedömning: **Saknad kartmetadata**. Max är docked, har batteri 100 och status charging. Vald karta har två val men saknar current_map_data; nuvarande rum kräver dessutom kartans vacuum_room. Kontrollera kartfunktion och hämtning i integrationen/Roborock-appen. Kartval används på dashboarden. Undanta bara om unknown är förväntat och funktionen inte behövs.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 41. `media_player.kontorets_hogtalare_ma`

- Integration: `music_assistant`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Kontorets högtalare.
- Bedömning: **Felsök högtalare/provider**. Kontorets MA-player är unavailable och gamla Cast-playern är restored/unavailable. Kontrollera fysisk högtalare och upptäckt, därefter MA-provider. Ingen grund att klassa den som säker dubblett ännu.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 42. `media_player.ateljens_hogtalare`

- Integration: `music_assistant`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:43 CEST. Återställd post: nej.
- Enhet: Ateljéns högtalare.
- Bedömning: **Sannolikt ersatt MA-post**. Gamla MA-spelaren är unavailable men media_player.ateljen är idle och nuvarande Cast-spelare är tillgänglig. scripts.yaml:1103 refererar det gamla ID:t. Bekräfta provider/identitet, flytta skriptreferensen och rensa överflödig player hos Music Assistant före HA-rensning.
- Hittade direkta referenser: scripts.yaml:1103.

### 43. `binary_sensor.levoit_luftfukare_300s_lagt_vatten`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:44 CEST. Återställd post: nej.
- Enhet: Lêvoit luftfukare 300S.
- Bedömning: **Felsök fysisk enhet/anslutning**. Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 44. `binary_sensor.levoit_luftfukare_300s_vattentanken_lyft`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:44 CEST. Återställd post: nej.
- Enhet: Lêvoit luftfukare 300S.
- Bedömning: **Felsök fysisk enhet/anslutning**. Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 45. `humidifier.levoit_luftfukare_300s`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:44 CEST. Återställd post: nej.
- Enhet: Lêvoit luftfukare 300S.
- Bedömning: **Felsök fysisk enhet/anslutning**. Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Hittade direkta referenser: .storage/lovelace.lovelace:1004.

### 46. `number.levoit_luftfukare_300s_dimniva`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:44 CEST. Återställd post: nej.
- Enhet: Lêvoit luftfukare 300S.
- Bedömning: **Felsök fysisk enhet/anslutning**. Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 47. `select.levoit_luftfukare_300s_niva_for_nattljus`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:44 CEST. Återställd post: nej.
- Enhet: Lêvoit luftfukare 300S.
- Bedömning: **Felsök fysisk enhet/anslutning**. Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 48. `switch.levoit_luftfukare_300s_visa`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:44 CEST. Återställd post: nej.
- Enhet: Lêvoit luftfukare 300S.
- Bedömning: **Felsök fysisk enhet/anslutning**. Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 49. `switch.levoit_luftfukare_300s_automatisk_avstangning`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:44 CEST. Återställd post: nej.
- Enhet: Lêvoit luftfukare 300S.
- Bedömning: **Felsök fysisk enhet/anslutning**. Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 50. `sensor.levoit_luftfukare_300s_luftfuktighet`

- Integration: `vesync`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:44 CEST. Återställd post: nej.
- Enhet: Lêvoit luftfukare 300S.
- Bedömning: **Felsök fysisk enhet/anslutning**. Alla åtta granskade entiteter plus firmware är unavailable. Luftfuktaren finns på dashboarden och används i automationen Kontrollera luftfuktare (automations.yaml:1311,1317). Kontrollera ström, Wi-Fi, online-status i VeSync och kontoanslutning. Återautentisera endast om konto-/integrationsstatus visar behov. Undanta hela enheten bara vid avsiktlig långtidsfrånkoppling.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 51. `sensor.bordslampa_hemmabion_power`

- Integration: `powercalc`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: nej.
- Enhet: ingen enhetskoppling.
- Bedömning: **Reparera källreferens**. Powercalc Bordslampa (hemmabion) pekar på light.bordslampa_vanster_old, som saknas i både aktuell state machine och register. light.bordslampa_vanster fungerar och har redan fungerande power-/energy-sensorer. Kontrollera fysisk identitet; återkoppla gamla beräkningen eller avveckla den dubbla beräkningen med hänsyn till energihistorik.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 52. `sensor.bordslampa_hemmabion_energy`

- Integration: `powercalc`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: nej.
- Enhet: ingen enhetskoppling.
- Bedömning: **Reparera källreferens**. Powercalc Bordslampa (hemmabion) pekar på light.bordslampa_vanster_old, som saknas i både aktuell state machine och register. light.bordslampa_vanster fungerar och har redan fungerande power-/energy-sensorer. Kontrollera fysisk identitet; återkoppla gamla beräkningen eller avveckla den dubbla beräkningen med hänsyn till energihistorik.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 53. `sensor.sovrummet_openwrt_one_router_sovrum_top_bandwidth_hosts`

- Integration: `openwrt`. Tillstånd: `unknown` sedan 2026-10-11 15:16:46 CEST. Återställd post: nej.
- Enhet: OpenWrt One - Router Sovrum.
- Bedömning: **Saknad nlbwmon-data**. Routerns övriga sensorer fungerar. Kod returnerar None när nlbwmon_top_hosts saknas/tomt; attributen innehåller ingen värdlista. Kontrollera nlbwmon-insamling och rpcd-behörigheter om funktionen behövs. Annars inaktivera/undanta just denna sensor.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 54. `media_player.jbl_link_500`

- Integration: `cast`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Ateljéns högtalare.
- Bedömning: **Sannolikt ersatt Cast-post**. Den gamla Cast-posten är restored. media_player.jbl_link_500_67aa69 har samma visningsnamn och är tillgänglig (off). Gamla ID:t används i automations.yaml:1165. Kontrollera enhetsidentitet och flytta automationen innan gammal post inaktiveras/rensas.
- Hittade direkta referenser: automations.yaml:1165.

### 55. `sensor.koket_taklampor_kokson_effekt`

- Integration: `matter`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Taklampor.
- Bedömning: **Sannolikt gammal mätentitet**. Effektposten är restored; lampan light.taklampor_kokson och energimätaren fungerar. Kontrollera om firmware/integrationen slutat exponera effektattributet. Inaktivera/rensa just den gamla effektposten när detta bekräftats; behåll Matter-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 56. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_device`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Ateljéns högtalare.
- Bedömning: **Sannolikt gammal Google Home-identitet**. Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 57. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Ateljéns högtalare.
- Bedömning: **Sannolikt gammal Google Home-identitet**. Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 58. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Ateljéns högtalare.
- Bedömning: **Sannolikt gammal Google Home-identitet**. Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 59. `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Ateljéns högtalare.
- Bedömning: **Sannolikt gammal Google Home-identitet**. Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 60. `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Ateljéns högtalare.
- Bedömning: **Sannolikt gammal Google Home-identitet**. Fem återställda poster hör till äldre Google Home-ID ca8acc58-…; aktuell device_2 har annat ID och visar adress. Bekräfta ersatt identitet och rensa/inaktivera gamla HA-poster. Fungerande Cast/MA talar emot att den fysiska högtalaren är borta.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 61. `media_player.verkstadens_hogtalare`

- Integration: `cast`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Kontorets högtalare.
- Bedömning: **Kontrollera högtalare/identitet**. Kontorets gamla Cast-post är restored och MA-spelaren är också unavailable. Ingen tydlig aktuell Cast-ersättare med samma visningsnamn hittades. Kontrollera ström, nätverk och upptäckt samt om högtalaren flyttats/bytts ut. Radera inte på grundval av namnet verkstadens_hogtalare; registervisningsnamnet är Kontorets högtalare.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 62. `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_device`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Kontorets högtalare.
- Bedömning: **Felsök eller bekräfta borttagen enhet**. Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 63. `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_alarms`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Kontorets högtalare.
- Bedömning: **Felsök eller bekräfta borttagen enhet**. Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 64. `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_timers`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Kontorets högtalare.
- Bedömning: **Felsök eller bekräfta borttagen enhet**. Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 65. `switch.google_home_kontorets_hogtalare_kontorets_hogtalare_do_not_disturb`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Kontorets högtalare.
- Bedömning: **Felsök eller bekräfta borttagen enhet**. Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 66. `number.google_home_kontorets_hogtalare_kontorets_hogtalare_alarm_volume`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Kontorets högtalare.
- Bedömning: **Felsök eller bekräfta borttagen enhet**. Kontorets fem Google Home-poster är restored liksom gammal Cast; MA är unavailable. Kontrollera fysisk enhet och nätverksupptäckt. Om enheten avvecklats, rensa gamla poster i respektive integration; annars reparera anslutning.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 67. `media_player.mannis_vackarklocka_ma`

- Integration: `music_assistant`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Mannis väckarklocka.
- Bedömning: **Sannolikt gammal MA-post**. MA-posten är restored, medan media_player.nesthubf174_5 (Mannis väckarklocka) är tillgänglig. Kontrollera aktuell MA-provider/player och ersättnings-ID. Reparera kopplingen eller rensa gammal player hos MA; fysisk väckarklocka behöver inte vara trasig.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 68. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms_2`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Ateljéns högtalare.
- Bedömning: **Delvis fungerande Google Home-enhet**. Fyra kontrollposter är restored/unavailable men device_2 visar 192.168.10.205. Ateljéns aktuella Cast och MA fungerar. Kontrollera stöd för larm, timer, DND och larmvolym på denna modell samt lokal autentisering/upptäckt. Inaktivera eller haghs_ignore på oanvända funktioner efter kontroll; undanta inte hela den fungerande högtalaren.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 69. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers_2`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Ateljéns högtalare.
- Bedömning: **Delvis fungerande Google Home-enhet**. Fyra kontrollposter är restored/unavailable men device_2 visar 192.168.10.205. Ateljéns aktuella Cast och MA fungerar. Kontrollera stöd för larm, timer, DND och larmvolym på denna modell samt lokal autentisering/upptäckt. Inaktivera eller haghs_ignore på oanvända funktioner efter kontroll; undanta inte hela den fungerande högtalaren.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 70. `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb_2`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Ateljéns högtalare.
- Bedömning: **Delvis fungerande Google Home-enhet**. Fyra kontrollposter är restored/unavailable men device_2 visar 192.168.10.205. Ateljéns aktuella Cast och MA fungerar. Kontrollera stöd för larm, timer, DND och larmvolym på denna modell samt lokal autentisering/upptäckt. Inaktivera eller haghs_ignore på oanvända funktioner efter kontroll; undanta inte hela den fungerande högtalaren.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 71. `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume_2`

- Integration: `google_home`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Google Home Ateljéns högtalare.
- Bedömning: **Delvis fungerande Google Home-enhet**. Fyra kontrollposter är restored/unavailable men device_2 visar 192.168.10.205. Ateljéns aktuella Cast och MA fungerar. Kontrollera stöd för larm, timer, DND och larmvolym på denna modell samt lokal autentisering/upptäckt. Inaktivera eller haghs_ignore på oanvända funktioner efter kontroll; undanta inte hela den fungerande högtalaren.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 72. `sensor.openwrt_backup_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 73. `sensor.openwrt_backup_senaste_korning_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 74. `sensor.wyoming_whisper_container_svarstid`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Wyoming Whisper Container.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 75. `sensor.openwrt_backup_status`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 76. `sensor.openwrt_backup_senaste_korning_status`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 77. `sensor.wyoming_whisper_container_status`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Wyoming Whisper Container.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 78. `sensor.openwrt_backup_monitortyp`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 79. `sensor.openwrt_backup_senaste_korning_monitortyp`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 80. `sensor.wyoming_whisper_container_monitortyp`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Wyoming Whisper Container.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 81. `sensor.openwrt_backup_upptid_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 82. `sensor.openwrt_backup_senaste_korning_upptid_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 83. `sensor.wyoming_whisper_container_upptid_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Wyoming Whisper Container.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 84. `sensor.openwrt_backup_upptid_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 85. `sensor.openwrt_backup_senaste_korning_upptid_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 86. `sensor.wyoming_whisper_container_upptid_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Wyoming Whisper Container.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 87. `sensor.openwrt_backup_upptid_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 88. `sensor.openwrt_backup_senaste_korning_upptid_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 89. `sensor.wyoming_whisper_container_upptid_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Wyoming Whisper Container.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 90. `sensor.openwrt_backup_svarstid_o_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 91. `sensor.openwrt_backup_senaste_korning_svarstid_o_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 92. `sensor.wyoming_whisper_container_svarstid_o_1_dag`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Wyoming Whisper Container.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 93. `sensor.openwrt_backup_svarstid_o_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 94. `sensor.openwrt_backup_senaste_korning_svarstid_o_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 95. `sensor.wyoming_whisper_container_svarstid_o_30_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Wyoming Whisper Container.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 96. `sensor.openwrt_backup_svarstid_o_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 97. `sensor.openwrt_backup_senaste_korning_svarstid_o_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: OpenWRT-backup – Senaste körning.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 98. `sensor.wyoming_whisper_container_svarstid_o_365_dagar`

- Integration: `uptime_kuma`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Wyoming Whisper Container.
- Bedömning: **Stark rensningskandidat**. Monitor-ID 1, 7 eller 36 saknas i aktuell /metrics-export. Gamla OpenWRT-backup, senaste körning och Wyoming Whisper Container har vardera nio återställda entiteter. Exportfrånvaro visar inte säkert om monitorn raderats eller är pausad; kontrollera i Kuma. Rensa/inaktivera kvarlämnade HA-poster efter bekräftelse. Nuvarande Whisper-monitor ID 6 är up.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 99. `binary_sensor.fulla_status`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 100. `binary_sensor.diun_status`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 101. `binary_sensor.wyoming_whisper_status`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 102. `sensor.fulla_antal_behallare`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 103. `sensor.fulla_behallare_som_kors`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 104. `sensor.fulla_behallare_stoppade`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 105. `sensor.fulla_behallare_pausade`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 106. `sensor.fulla_antal_avbildningar`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 107. `sensor.fulla_atervinningsbar_containerdiskanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 108. `sensor.fulla_total_storlek_pa_containerdiskanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 109. `sensor.fulla_atervinningsbar_avbildningsdiskanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 110. `sensor.fulla_total_storlek_pa_avbildningsdiskanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 111. `sensor.fulla_total_storlek_pa_volymdiskanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: Fulla.
- Bedömning: **Sannolikt ersatt endpointpost**. Gammal Fulla-post är restored samtidigt som Fulla via endpoint 15 har fungerande containersensorer och nya endpointposter. Jämför unique_id/endpointbindning och flytta eventuella referenser före inaktivering/rensning av gamla entiteter. Behåll den aktuella Fulla-enheten.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 112. `sensor.diun_bild`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 113. `sensor.diun_avbildning_version`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 114. `sensor.diun_avbildning_skapad`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 115. `sensor.diun_tillstand`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 116. `sensor.diun_minnesgrans`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 117. `sensor.diun_minnesanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 118. `sensor.diun_minnesanvandning_i_procent`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 119. `sensor.diun_cpu_anvandning_totalt`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 120. `sensor.wyoming_whisper_bild`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 121. `sensor.wyoming_whisper_avbildning_version`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 122. `sensor.wyoming_whisper_avbildning_skapad`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 123. `sensor.wyoming_whisper_tillstand`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 124. `sensor.wyoming_whisper_halsa`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 125. `sensor.wyoming_whisper_minnesgrans`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 126. `sensor.wyoming_whisper_minnesanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 127. `sensor.wyoming_whisper_minnesanvandning_i_procent`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 128. `sensor.wyoming_whisper_cpu_anvandning_totalt`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 129. `sensor.6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487_volymdrivrutin`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: 6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487.
- Bedömning: **Sannolikt gammal volymentitet**. Volymen finns fortfarande i Docker API, men denna gamla sensor är restored och en ny storlekssensor med _2 finns (unknown). Behåll volymen. Kontrollera gamla/new unique_id och inaktivera/rensa endast ersatta HA-poster; felsök separat varför storleksdata saknas.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 130. `sensor.6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487_volymstorlek`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: 6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487.
- Bedömning: **Sannolikt gammal volymentitet**. Volymen finns fortfarande i Docker API, men denna gamla sensor är restored och en ny storlekssensor med _2 finns (unknown). Behåll volymen. Kontrollera gamla/new unique_id och inaktivera/rensa endast ersatta HA-poster; felsök separat varför storleksdata saknas.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 131. `sensor.ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49_volymdrivrutin`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49.
- Bedömning: **Sannolikt gammal volymentitet**. Volymen finns fortfarande i Docker API, men denna gamla sensor är restored och en ny storlekssensor med _2 finns (unknown). Behåll volymen. Kontrollera gamla/new unique_id och inaktivera/rensa endast ersatta HA-poster; felsök separat varför storleksdata saknas.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 132. `sensor.ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49_volymstorlek`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49.
- Bedömning: **Sannolikt gammal volymentitet**. Volymen finns fortfarande i Docker API, men denna gamla sensor är restored och en ny storlekssensor med _2 finns (unknown). Behåll volymen. Kontrollera gamla/new unique_id och inaktivera/rensa endast ersatta HA-poster; felsök separat varför storleksdata saknas.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 133. `switch.diun_behallare`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: diun.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 134. `switch.wyoming_whisper_behallare`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 135. `sensor.wyoming_whisper_old_bild`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 136. `sensor.wyoming_whisper_old_avbildning_version`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 137. `sensor.wyoming_whisper_old_avbildning_skapad`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 138. `sensor.wyoming_whisper_old_tillstand`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 139. `sensor.wyoming_whisper_old_halsa`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 140. `sensor.wyoming_whisper_old_minnesgrans`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 141. `sensor.wyoming_whisper_old_minnesanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 142. `sensor.wyoming_whisper_old_minnesanvandning_i_procent`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 143. `sensor.wyoming_whisper_old_cpu_anvandning_totalt`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 144. `switch.wyoming_whisper_old_behallare`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper-old.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 145. `binary_sensor.whisper_analysis_gpu_status`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 146. `sensor.whisper_analysis_gpu_bild`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 147. `sensor.whisper_analysis_gpu_avbildning_version`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 148. `sensor.whisper_analysis_gpu_avbildning_skapad`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 149. `sensor.whisper_analysis_gpu_tillstand`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 150. `sensor.whisper_analysis_gpu_minnesgrans`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 151. `sensor.whisper_analysis_gpu_minnesanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 152. `sensor.whisper_analysis_gpu_minnesanvandning_i_procent`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 153. `sensor.whisper_analysis_gpu_cpu_anvandning_totalt`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 154. `switch.whisper_analysis_gpu_behallare`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-gpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 155. `binary_sensor.whisper_analysis_cpu_status`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 156. `sensor.whisper_analysis_cpu_bild`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 157. `sensor.whisper_analysis_cpu_avbildning_version`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 158. `sensor.whisper_analysis_cpu_avbildning_skapad`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 159. `sensor.whisper_analysis_cpu_tillstand`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 160. `sensor.whisper_analysis_cpu_minnesgrans`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 161. `sensor.whisper_analysis_cpu_minnesanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 162. `sensor.whisper_analysis_cpu_minnesanvandning_i_procent`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 163. `sensor.whisper_analysis_cpu_cpu_anvandning_totalt`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 164. `switch.whisper_analysis_cpu_behallare`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-cpu.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 165. `binary_sensor.whisper_analysis_offline_status`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 166. `sensor.whisper_analysis_offline_bild`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 167. `sensor.whisper_analysis_offline_avbildning_version`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 168. `sensor.whisper_analysis_offline_avbildning_skapad`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 169. `sensor.whisper_analysis_offline_tillstand`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 170. `sensor.whisper_analysis_offline_minnesgrans`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 171. `sensor.whisper_analysis_offline_minnesanvandning`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 172. `sensor.whisper_analysis_offline_minnesanvandning_i_procent`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 173. `sensor.whisper_analysis_offline_cpu_anvandning_totalt`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 174. `switch.whisper_analysis_offline_behallare`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: whisper-analysis-offline.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 175. `switch.honshuset_tapo_c200c_autofokus`

- Integration: `onvif`. Tillstånd: `unknown` sedan 2026-10-11 15:57:56 CEST. Återställd post: nej.
- Enhet: Tapo C200C.
- Bedömning: **Förväntat unknown från implementationen**. ONVIFSwitch läser aldrig tillbaka reglagets tillstånd; _attr_is_on sätts först vid ett kommando. Kamera är idle och rörelsesensorer fungerar. Därför är detta inte bevis för offlinekamera. haghs_ignore på endast dessa reglage om de behövs; inaktivera oanvända reglage, särskilt torkare. Inga provkommandon rekommenderas enbart för HAGHS-poäng.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 176. `switch.honshuset_tapo_c200c_ir_lampa`

- Integration: `onvif`. Tillstånd: `unknown` sedan 2026-10-11 15:57:56 CEST. Återställd post: nej.
- Enhet: Tapo C200C.
- Bedömning: **Förväntat unknown från implementationen**. ONVIFSwitch läser aldrig tillbaka reglagets tillstånd; _attr_is_on sätts först vid ett kommando. Kamera är idle och rörelsesensorer fungerar. Därför är detta inte bevis för offlinekamera. haghs_ignore på endast dessa reglage om de behövs; inaktivera oanvända reglage, särskilt torkare. Inga provkommandon rekommenderas enbart för HAGHS-poäng.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 177. `switch.honshuset_tapo_c200c_torkare`

- Integration: `onvif`. Tillstånd: `unknown` sedan 2026-10-11 15:57:56 CEST. Återställd post: nej.
- Enhet: Tapo C200C.
- Bedömning: **Förväntat unknown från implementationen**. ONVIFSwitch läser aldrig tillbaka reglagets tillstånd; _attr_is_on sätts först vid ett kommando. Kamera är idle och rörelsesensorer fungerar. Därför är detta inte bevis för offlinekamera. haghs_ignore på endast dessa reglage om de behövs; inaktivera oanvända reglage, särskilt torkare. Inga provkommandon rekommenderas enbart för HAGHS-poäng.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 178. `binary_sensor.wyoming_whisper_out_of_memory`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 179. `sensor.wyoming_whisper_started`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

### 180. `sensor.wyoming_whisper_restart_count`

- Integration: `portainer`. Tillstånd: `unavailable` sedan 2026-10-11 15:16:54 CEST. Återställd post: ja.
- Enhet: wyoming-whisper.
- Bedömning: **Stark rensningskandidat**. Alla containrar lästes med all=1. Denna container saknas på sitt tidigare endpoint: DIUN och whisper-analysis-* på Frigg 14; wyoming-whisper och wyoming-whisper-old på Fulla 15. HA-posten är restored. Kontrollera om någon funktion/referens ska flyttas till nuvarande tjänst; rensa därefter gamla HA-poster. Starta inte de gamla containrarna för att få grön HAGHS.
- Hittade direkta referenser: inga i granskad aktiv YAML/Lovelace; detta bevisar inte att entiteten är oanvänd.

