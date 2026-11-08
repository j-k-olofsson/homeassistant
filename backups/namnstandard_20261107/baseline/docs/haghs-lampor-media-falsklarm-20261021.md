# Lampåtgärd, historisk skymningsgrupp och genomgång av kvarvarande poster

Granskat 2026-10-21 11:54 CEST.

## Genomförd ändring

Powercalc-posten Bordslampa (hemmabion), entry 01K271KNYG87RP1E67XDMEETK8, har inaktiverats via config_entries/disable. Den avsåg en gammal IKEA LED2201G8 med Zigbee-ID och pekade på light.bordslampa_vanster_old, som saknas. Dagens Matter-lampa har modell LED2405G8 och egen fungerande Powercalc-post Bordslampa vänster. Att använda den gamla modellprofilen på nya lampan skulle inte vara en korrekt reparation.

De gamla två sensorposterna och deras statistik har inte raderats. Efter inaktivering är sensorerna disabled_by=config_entry och undantas från HAGHS. Nuvarande sensor.bordslampa_vanster_power rapporterar 0,32 W och sensor.bordslampa_vanster_energy fortsätter med cirka 0,1413 kWh vid kontrollen. HAGHS: 70 → 68 zombies och 91 → 92 %. Ingen fysisk ljusstyrning eller ändring av automationer har gjorts.

Backup: `/homeassistant/backups/haghs_light_repair_20261021T094950Z`. Den innehåller konfigurations-/entitets-/enhetsregister, energipreferenser, live före/efter och API-resultat. Endast den gamla Powercalc-konfigurationsposten har inaktiverats. Luftfuktaren lämnas orörd eftersom användaren bekräftat att den är bortplockad.

## Historik för skymningsgruppen

Användaren vill fundera på medlemslistan. Gruppen har därför lämnats oförändrad med entities=[]. Två äldre registerkopior visar samma tidigare lista:

- .storage/core.config_entries.NEW, filtid 25 november 2024.
- .storage/core.config_entries.BACKUP, filtid 7 januari 2025.

Gruppens sparade modified_at i båda kopiorna är 31 oktober 2024 08:52 CET. Medlemmar:

1. light.grupp_sanglampor — fortfarande aktiv. Undergruppens medlemmar är light.shellyplug_s_083a8dc17eb4 och light.shellyplug_s_083a8dc17e39, samma lista i äldre och aktuell konfiguration.
2. light.levoit_luftfukare_300s_night_light — finns inte längre i aktuellt register/state machine.

Detta är historiskt underlag, inte ett antagande om dagens önskade beteende. Automationerna släcker gruppen vid dagsljus, tänder vid skymning och begär rött på natten. Shelly-pluggar kan bara slå av/på och ändrar inte lampfärg, så rött kan inte garanteras för dessa medlemmar. Ingen återställning gjordes utan användarens val.

## Nio media_player-poster

En åtta sekunder lång mDNS-sökning läste annonser för _googlecast._tcp.local utan uppspelnings- eller volymkommandon. Ateljéns aktuella JBL Link 500 annonserades på 192.168.10.205 med Cast-ID bb9d9db811131ba619b4362bd919b660. Mannis Nest Hub annonserades på 192.168.10.213 med ID 721a89d6fc3f406d050eea545ac83fc4. Kontorets JBL Link 20 och de gamla TV/Cast-ID:na syntes inte i denna korta sökning. Frånvaro under en sådan sökning bevisar inte att enheten är avvecklad.

| Zombie | Bedömning | Så verifierar du |
|---|---|---|
| media_player.jbl_link_500 | Gammal Ateljén-Cast med ID 9842167e-…; nuvarande media_player.jbl_link_500_67aa69 har annat ID och är tillgänglig. | Bekräfta JBL på .205 i Google Home och testa nuvarande Cast-mål. Automation Återställ ljudvolymer använder det gamla ID:t; byt referens före rensning. |
| media_player.ateljens_hogtalare | Gammal MA-player up0ba23cfe, unavailable. media_player.ateljen / up1a2803a2 är idle. | Öppna båda i MA och jämför provider och målenhet/IP. Prova uppspelning via den aktuella. Skriptet har redan omdirigering från gamla ID:t till media_player.ateljen; bevara/justera kompatibilitet efter behov. |
| media_player.verkstadens_hogtalare | Namnet är missvisande: registervisningsnamn Kontorets högtalare, JBL Link 20, unavailable/restored. | Kontrollera den fysiska Link 20, ström, Google Home, IP och Cast-ID abc85c69-…. Om kvar: reparera upptäckt. Om avvecklad/ersatt: granska referenser och rensa gamla poster. |
| media_player.kontorets_hogtalare_ma | MA-posten för samma modell är också unavailable. | Kontrollera MA-provider/underliggande spelare efter fysisk kontroll. Samtidigt fel i Cast/Google Home talar för att fysisk anslutning/upptäckt behöver kontrolleras. |
| media_player.mannis_vackarklocka_ma | Återställd MA-post, men Cast-motsvarigheten media_player.nesthubf174_5 är tillgänglig och har exakt samma Cast-ID. | Bekräfta Nest Hub .213 och kontrollera om MA-playern är inaktiverad, saknar provider eller ersatts av annan player. Reparera MA eller rensa enbart gammal MA-post. Ta inte bort fungerande Cast-enheten. |
| media_player.gamla_tvn | Återställd Cast-post, Chromecast-ID 9ab1f3cc-…. Ingen match i kort mDNS-sökning. | Kontrollera om den gamla fysiska Chromecast-enheten finns kvar, rätt HDMI-ingång/ström och samma ID i Google Home. |
| media_player.gamla_tvn_2 | MA-post med samma ID som ovan. | Om gamla Chromecast-enheten är avvecklad kan båda posterna rensas efter referenskontroll. Den fungerande Nya TVn har annat ID och är inte automatisk bekräftelse på att gamla TVn är borttagen. |
| media_player.chromecast5575_2 | Återställd Cast-post, ID 29e402d4-…. Ingen match i kort mDNS-sökning. | Identifiera den fysiska enheten i Google Home via modell och ID; använd inte enbart namnet. |
| media_player.chromecast5575 | MA-posten heter Huset men har samma Chromecast-ID som Chromecast5575_2. | Kontrollera i MA provider och målenhet för Huset. Modell i registret är Chromecast, så namnet Huset bevisar inte att det är en högtalargrupp. |

Börja med Google Home-appen: hitta fysisk enhet, bekräfta IP och enhetsidentitet där de visas. Slå på avsiktligt avstängda enheter och vänta på upptäckt. Testa därefter uppspelning manuellt från den aktuella spelaren i Cast respektive MA. Jämför ID:n inom samma integration; Google Home-integrationens interna ID:n behöver inte vara samma som Cast-ID:n. Innan rensning: kontrollera automationer, skript, grupper, scener, paneler och MA-spelargrupper. Rensa överflödig provider/player i MA först om den är källan; bara HA-radering kan annars återskapa posten.

## Fjorton Google Home-poster på högtalarna

Dessa är extra funktioner, inte fjorton extra fysiska högtalare. Fem hör till en äldre Ateljén-identitet ca8acc58-…, fyra är funktioner på aktuell Ateljén-identitet 110757ee-… vars device_2-sensor visar .205, och fem hör till Kontorets identitet a6dd13cb-….

Ateljéns gamla fem: jämför enhetsidentitet i kontot; rensa om ersatt. Ateljéns aktuella fyra: kontrollera om JBL-modellen och Google Home-integrationen levererar larm/timer/DND/larmvolym. Fungerande Cast/MA bevisar inte att dessa lokala API-funktioner fungerar. Inaktivera oanvända funktioner, eller reparera lokal API/auth/upptäckt om de behövs. Kontorets fem: kontrollera först fysisk Link 20 och nätverket; radera inte enbart för att den är offline. Nuvarande Google Home-kod nekar enhetsborttagning om Google fortfarande listar enheten; gör i så fall kontrollerna i Google Home-kontot och följ integrationens stöd.

| Entitet | Grupp |
|---|---|
| `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_device` | Kontoret: fysisk enhet/upptäckt |
| `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_device` | Ateljén: äldre identitet |
| `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms` | Ateljén: äldre identitet |
| `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers` | Ateljén: äldre identitet |
| `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb` | Ateljén: äldre identitet |
| `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume` | Ateljén: äldre identitet |
| `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_alarms` | Kontoret: fysisk enhet/upptäckt |
| `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_timers` | Kontoret: fysisk enhet/upptäckt |
| `switch.google_home_kontorets_hogtalare_kontorets_hogtalare_do_not_disturb` | Kontoret: fysisk enhet/upptäckt |
| `number.google_home_kontorets_hogtalare_kontorets_hogtalare_alarm_volume` | Kontoret: fysisk enhet/upptäckt |
| `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms_2` | Ateljén: aktuell identitets extrafunktion |
| `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers_2` | Ateljén: aktuell identitets extrafunktion |
| `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb_2` | Ateljén: aktuell identitets extrafunktion |
| `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume_2` | Ateljén: aktuell identitets extrafunktion |

## Alla 23 poster från tidigare punkt 1

Rekommendationen gäller hantering, inte generell radering. Aktiva integrationer kan återskapa posterna om de bara raderas.

| Entitet | Varför flaggad och rekommenderad hantering |
|---|---|
| `sensor.portainer_certifikatets_utgangsdatum` | HTTP-URL, ingen TLS-certifikatsmätning; status up. Inaktivera sensorn om HTTP är avsiktligt. Om HTTPS avses, korrigera monitorn och behåll certifikatövervakning. |
| `sensor.uptime_via_caddy_certifikatets_utgangsdatum` | HTTP-URL, ingen TLS-certifikatsmätning; status up. Inaktivera sensorn om HTTP är avsiktligt. Om HTTPS avses, korrigera monitorn och behåll certifikatövervakning. |
| `sensor.home_assistant_ui_certifikatets_utgangsdatum` | HTTP-URL, ingen TLS-certifikatsmätning; status up. Inaktivera sensorn om HTTP är avsiktligt. Om HTTPS avses, korrigera monitorn och behåll certifikatövervakning. |
| `sensor.supervisor_health_certifikatets_utgangsdatum` | HTTP-URL, ingen TLS-certifikatsmätning; status up. Inaktivera sensorn om HTTP är avsiktligt. Om HTTPS avses, korrigera monitorn och behåll certifikatövervakning. |
| `sensor.core_api_wake_up_certifikatets_utgangsdatum` | HTTP-URL, ingen TLS-certifikatsmätning; status up. Inaktivera sensorn om HTTP är avsiktligt. Om HTTPS avses, korrigera monitorn och behåll certifikatövervakning. |
| `sensor.glances_ui_certifikatets_utgangsdatum` | HTTP-URL, ingen TLS-certifikatsmätning; status up. Inaktivera sensorn om HTTP är avsiktligt. Om HTTPS avses, korrigera monitorn och behåll certifikatövervakning. |
| `sensor.ollama_api_certifikatets_utgangsdatum` | HTTP-URL, ingen TLS-certifikatsmätning; status up. Inaktivera sensorn om HTTP är avsiktligt. Om HTTPS avses, korrigera monitorn och behåll certifikatövervakning. |
| `sensor.ollama_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.caddy_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.ha_test_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.esphome_test_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.glances_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.portainer_agent_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.docker_socket_proxy_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.glances_container_svarstid_2` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.open_webui_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.openwrt_backup_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.portainer_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.uptime_kuma_container_svarstid` | Docker-monitor up; svarstid -1 från Kuma omvandlas till unknown. Inaktivera svarstidssensorn eller haghs_ignore. Behåll containerns statusövervakning. |
| `sensor.frigg_fulla_backup_och_diskhalsa_svarstid` | Push-monitor up; momentan svarstid -1 från Kuma. Inaktivera svarstid eller haghs_ignore om sensorn ska finnas kvar. Behåll backupstatus och fungerande statistik. |
| `switch.honshuset_tapo_c200c_autofokus` | Tillstånd läses inte tillbaka i ONVIFSwitch; unknown före kommando är inte offlinekamera. Behåll och haghs_ignore om reglaget används; annars inaktivera. Verifiera funktionsstöd i kamerans app/ONVIF. |
| `switch.honshuset_tapo_c200c_ir_lampa` | Tillstånd läses inte tillbaka i ONVIFSwitch; unknown före kommando är inte offlinekamera. Behåll och haghs_ignore om reglaget används; annars inaktivera. Verifiera funktionsstöd i kamerans app/ONVIF. |
| `switch.honshuset_tapo_c200c_torkare` | Tillstånd läses inte tillbaka i ONVIFSwitch; unknown före kommando är inte offlinekamera. Inaktivera torkare om kameran saknar den funktionen. |

Alla 20 Kuma-monitorer i detta urval hade status 1 (up) i färsk metrics-export. Samtliga sju certifikatsensorer hade HTTP-URL; samtliga 13 svarstider hade -1. Tapo-kameran var idle och rörelsesensorn rapporterade off. Inga av dessa 23 har ändrats under detta uppdrag.
