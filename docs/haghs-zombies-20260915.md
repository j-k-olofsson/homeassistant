# HAGHS: analys av 36 potentiella zombies

Granskning: 2026-09-15T11:31:55.080969+00:00. HAGHS 2.3.0. Sensor: `sensor.system_ha_global_health_score`. Antal: 36; fördelning light 3, sensor 18, binary_sensor 2, media_player 2, select 2, switch 7, number 2.

## Hur listan skapas

Detta är 36 entiteter, inte 36 enheter. HAGHS flaggar unknown/unavailable i valda domäner efter 15 minuter, eller 60 minuter för battery-klassen. Entitets- och enhetstaggar med haghs_ignore undantas, liksom inaktiverade entiteter. Områdestaggar kontrolleras inte. hidden_by undantar inte. Alla 36 finns i entitetsregistret; ingen är en oregistrerad ghost.

Konfigurationen använder ignore_labels=[haghs_ignore], ignore_patterns=[] och update_interval=60 sekunder. Prusa-XL, Prusa Buddy Cam, Prusas huvudströmbrytare och Poolvärmepump är taggade och ligger utanför listan. Poolvärmepumpens 30 unknown/unavailable-entiteter finns inte bland de 36. AP Poolens Public IP är en separat nätverksentitet.

## Rekommendation

Tre tydliga kvarlämnade poster kan rensas: sensor.ha_python_cast_test, sensor.nest_hub_ip_test och light.ir_ljus. Två ytterligare kandidater kräver kontroll: Silence On Demand-switch och den otillgängliga MA-dubbletten för HA Voice. Reparera den tomma skymningsgruppen och felsök BILRESA samt blomlampornas ESPHome-enhet. Undanta de fyra AP Public IP-sensorerna och fem programberoende diskmaskinskontrollerna på entitetsnivå. Övriga fall behöver funktionskontroll innan radering eller undantag.

## Alla 36 entiteter

### 1. `light.grupp_lampor_som_tands_vid_skymning`

- Tillstånd: `unavailable`. Plattform: `group`. Tillstånd sedan 2026-09-15T08:33:30.242427+00:00.
- Bedömning: **Reparera grupp**.
- Gruppens entities-lista är tom. Används i automations.yaml på raderna 227, 250 och 278. Återställ medlemmarna; radera inte utan att ändra automationerna.

### 2. `sensor.bilresa_dual_button_batteri`

- Tillstånd: `unavailable`. Plattform: `matter`. Tillstånd sedan 2026-09-15T08:33:38.162030+00:00.
- Bedömning: **Manuell felsökning**.
- BILRESA Matter-nod är unavailable, inklusive båda knapphändelserna. Battery Notes ger följdfel unknown. Historiken visar tidigare batterivärde 100 %; detta bevisar inte batteriets nivå idag. Kontrollera fysisk knapp, batterier och Thread/Matter-anslutning. Knappen används för poolpumpens automation.

### 3. `sensor.bilresa_dual_button_batterispanning`

- Tillstånd: `unavailable`. Plattform: `matter`. Tillstånd sedan 2026-09-15T08:33:38.162538+00:00.
- Bedömning: **Manuell felsökning**.
- BILRESA Matter-nod är unavailable, inklusive båda knapphändelserna. Battery Notes ger följdfel unknown. Historiken visar tidigare batterivärde 100 %; detta bevisar inte batteriets nivå idag. Kontrollera fysisk knapp, batterier och Thread/Matter-anslutning. Knappen används för poolpumpens automation.

### 4. `sensor.bilresa_dual_button_batterityp`

- Tillstånd: `unavailable`. Plattform: `matter`. Tillstånd sedan 2026-09-15T08:33:38.163047+00:00.
- Bedömning: **Manuell felsökning**.
- BILRESA Matter-nod är unavailable, inklusive båda knapphändelserna. Battery Notes ger följdfel unknown. Historiken visar tidigare batterivärde 100 %; detta bevisar inte batteriets nivå idag. Kontrollera fysisk knapp, batterier och Thread/Matter-anslutning. Knappen används för poolpumpens automation.

### 5. `binary_sensor.bilresa_dual_button_battery_plus_low`

- Tillstånd: `unknown`. Plattform: `battery_notes`. Tillstånd sedan 2026-09-15T08:33:43.617025+00:00.
- Bedömning: **Manuell felsökning**.
- BILRESA Matter-nod är unavailable, inklusive båda knapphändelserna. Battery Notes ger följdfel unknown. Historiken visar tidigare batterivärde 100 %; detta bevisar inte batteriets nivå idag. Kontrollera fysisk knapp, batterier och Thread/Matter-anslutning. Knappen används för poolpumpens automation.

### 6. `sensor.bilresa_dual_button_battery_plus`

- Tillstånd: `unknown`. Plattform: `battery_notes`. Tillstånd sedan 2026-09-15T08:33:43.650893+00:00.
- Bedömning: **Manuell felsökning**.
- BILRESA Matter-nod är unavailable, inklusive båda knapphändelserna. Battery Notes ger följdfel unknown. Historiken visar tidigare batterivärde 100 %; detta bevisar inte batteriets nivå idag. Kontrollera fysisk knapp, batterier och Thread/Matter-anslutning. Knappen används för poolpumpens automation.

### 7. `media_player.mannis_vackarklocka_ma`

- Tillstånd: `unavailable`. Plattform: `music_assistant`. Tillstånd sedan 2026-09-15T11:04:27.542765+00:00.
- Bedömning: **Felsök Music Assistant**.
- Mannis väckarklocka är unavailable. Underlaget räcker inte för att avgöra om spelaren är borttagen, avstängd eller felaktigt registrerad. Kontrollera fysisk Nest Hub och dess MA-provider före rensning.

### 8. `binary_sensor.openuv_skyddsfonster`

- Tillstånd: `unknown`. Plattform: `openuv`. Tillstånd sedan 2026-09-15T08:33:43.761250+00:00.
- Bedömning: **API-problem / valfritt undantag**.
- Övriga UV-sensorer har värden. Core-loggen säger missing data: from_time och missing data vid start. Skyddsfönstret saknar API-data. Felsök skyddsfönsterhämtningen; tagga bara denna entitet om funktionen inte används.

### 9. `light.blomlampor_bion`

- Tillstånd: `unavailable`. Plattform: `esphome`. Tillstånd sedan 2026-09-15T08:33:43.886851+00:00.
- Bedömning: **Manuell felsökning**.
- ESPHome-enheten Blomlampor (bion) har connectivity off. Ljuset är hidden_by integration, vilket inte undantar det. Powercalc-sensorerna ligger på samma enhet och är följdfel. Ljuset används av bioautomation och gruppen Alla blomlampor. Kontrollera ström, Wi-Fi och enhet; tagga enheten endast om frånkopplingen är avsiktlig.

### 10. `sensor.sovrummet_openwrt_one_router_sovrum_top_bandwidth_hosts`

- Tillstånd: `unknown`. Plattform: `openwrt`. Tillstånd sedan 2026-09-15T08:33:47.204827+00:00.
- Bedömning: **Felsök eller stäng av funktion**.
- Routern fungerar; Top Bandwidth Hosts är unknown utan extra attribut. nlbwmon-funktionen är aktiverad. Sensorn returnerar None när nlbwmon-data saknas. Kontrollera insamling/nlbwmon/rpcd om funktionen behövs, annars stäng av nlbwmon-sensorerna i integrationen. Orsaken är inte fastställd i loggarna.

### 11. `sensor.koket_openwrt_one_ap_koket_public_ip`

- Tillstånd: `unknown`. Plattform: `openwrt`. Tillstånd sedan 2026-09-15T08:33:48.291924+00:00.
- Bedömning: **Tagga entitet / inaktivera**.
- Public IP på en accesspunkt är unknown samtidigt som anslutning och övriga sensorer fungerar. Dessa AP:er saknar WAN i de aktuella entiteterna; gatewayns Public IP fungerar. Rekommenderat haghs_ignore på just Public IP-entiteten eller inaktivering om den inte används. Tagga inte hela AP-enheten.

### 12. `sensor.kontoret_openwrt_one_ap_kontoret_public_ip`

- Tillstånd: `unknown`. Plattform: `openwrt`. Tillstånd sedan 2026-09-15T08:33:50.065377+00:00.
- Bedömning: **Tagga entitet / inaktivera**.
- Public IP på en accesspunkt är unknown samtidigt som anslutning och övriga sensorer fungerar. Dessa AP:er saknar WAN i de aktuella entiteterna; gatewayns Public IP fungerar. Rekommenderat haghs_ignore på just Public IP-entiteten eller inaktivering om den inte används. Tagga inte hela AP-enheten.

### 13. `sensor.friggan_asus_lyra_map_ac2200_ap_friggan_public_ip`

- Tillstånd: `unknown`. Plattform: `openwrt`. Tillstånd sedan 2026-09-15T08:33:54.345397+00:00.
- Bedömning: **Tagga entitet / inaktivera**.
- Public IP på en accesspunkt är unknown samtidigt som anslutning och övriga sensorer fungerar. Dessa AP:er saknar WAN i de aktuella entiteterna; gatewayns Public IP fungerar. Rekommenderat haghs_ignore på just Public IP-entiteten eller inaktivering om den inte används. Tagga inte hela AP-enheten.

### 14. `sensor.blomlampa_trappan_energy_power`

- Tillstånd: `unavailable`. Plattform: `powercalc`. Tillstånd sedan 2026-09-15T08:34:46.486989+00:00.
- Bedömning: **Manuell felsökning**.
- ESPHome-enheten Blomlampor (bion) har connectivity off. Ljuset är hidden_by integration, vilket inte undantar det. Powercalc-sensorerna ligger på samma enhet och är följdfel. Ljuset används av bioautomation och gruppen Alla blomlampor. Kontrollera ström, Wi-Fi och enhet; tagga enheten endast om frånkopplingen är avsiktlig.

### 15. `sensor.blomlampa_trappan_energy`

- Tillstånd: `unavailable`. Plattform: `powercalc`. Tillstånd sedan 2026-09-15T08:34:46.487024+00:00.
- Bedömning: **Manuell felsökning**.
- ESPHome-enheten Blomlampor (bion) har connectivity off. Ljuset är hidden_by integration, vilket inte undantar det. Powercalc-sensorerna ligger på samma enhet och är följdfel. Ljuset används av bioautomation och gruppen Alla blomlampor. Kontrollera ström, Wi-Fi och enhet; tagga enheten endast om frånkopplingen är avsiktlig.

### 16. `sensor.poolen_tp_link_eap225_outdoor_v3_ap_poolen_public_ip`

- Tillstånd: `unknown`. Plattform: `openwrt`. Tillstånd sedan 2026-09-15T08:33:55.764534+00:00.
- Bedömning: **Tagga entitet / inaktivera**.
- Public IP på en accesspunkt är unknown samtidigt som anslutning och övriga sensorer fungerar. Dessa AP:er saknar WAN i de aktuella entiteterna; gatewayns Public IP fungerar. Rekommenderat haghs_ignore på just Public IP-entiteten eller inaktivering om den inte används. Tagga inte hela AP-enheten.

### 17. `select.siemens_016050395510002818_programs`

- Tillstånd: `unavailable`. Plattform: `home_connect_alt`. Tillstånd sedan 2026-09-15T10:53:44.870951+00:00.
- Bedömning: **Kontrollera programlista**.
- Diskmaskinen är connected on, power on och operationstate Run. Programs har options []. Koden kräver en tillgänglig programlista och aktiv fjärrstyrning. Fjärrstyrningen är on. Kontrollera om programlistan återkommer när diskningen avslutats; vid kvarstående tom lista felsök Home Connect Alt. Ingen grund för att radera denna entitet.

### 18. `select.siemens_016050395510002818_bsh_common_option_startinrelative`

- Tillstånd: `unavailable`. Plattform: `home_connect_alt`. Tillstånd sedan 2026-09-15T10:53:41.461543+00:00.
- Bedömning: **Tagga entitet**.
- Starttid och fyra programval är unavailable, medan deras läsvärden fungerar och maskinen kör. Koden gör kontroller tillgängliga endast när respektive alternativ är tillgängligt. Behåll kontrollerna; rekommenderat haghs_ignore på dessa fem entiteter, inte hela diskmaskinen.

### 19. `switch.siemens_016050395510002818_dishcare_dishwasher_option_hygieneplus`

- Tillstånd: `unavailable`. Plattform: `home_connect_alt`. Tillstånd sedan 2026-09-15T10:53:41.460612+00:00.
- Bedömning: **Tagga entitet**.
- Starttid och fyra programval är unavailable, medan deras läsvärden fungerar och maskinen kör. Koden gör kontroller tillgängliga endast när respektive alternativ är tillgängligt. Behåll kontrollerna; rekommenderat haghs_ignore på dessa fem entiteter, inte hela diskmaskinen.

### 20. `switch.siemens_016050395510002818_dishcare_dishwasher_option_halfload`

- Tillstånd: `unavailable`. Plattform: `home_connect_alt`. Tillstånd sedan 2026-09-15T10:53:41.461235+00:00.
- Bedömning: **Tagga entitet**.
- Starttid och fyra programval är unavailable, medan deras läsvärden fungerar och maskinen kör. Koden gör kontroller tillgängliga endast när respektive alternativ är tillgängligt. Behåll kontrollerna; rekommenderat haghs_ignore på dessa fem entiteter, inte hela diskmaskinen.

### 21. `switch.siemens_016050395510002818_dishcare_dishwasher_option_variospeedplus`

- Tillstånd: `unavailable`. Plattform: `home_connect_alt`. Tillstånd sedan 2026-09-15T10:53:41.461951+00:00.
- Bedömning: **Tagga entitet**.
- Starttid och fyra programval är unavailable, medan deras läsvärden fungerar och maskinen kör. Koden gör kontroller tillgängliga endast när respektive alternativ är tillgängligt. Behåll kontrollerna; rekommenderat haghs_ignore på dessa fem entiteter, inte hela diskmaskinen.

### 22. `switch.siemens_016050395510002818_dishcare_dishwasher_option_brilliancedry`

- Tillstånd: `unavailable`. Plattform: `home_connect_alt`. Tillstånd sedan 2026-09-15T10:53:41.461319+00:00.
- Bedömning: **Tagga entitet**.
- Starttid och fyra programval är unavailable, medan deras läsvärden fungerar och maskinen kör. Koden gör kontroller tillgängliga endast när respektive alternativ är tillgängligt. Behåll kontrollerna; rekommenderat haghs_ignore på dessa fem entiteter, inte hela diskmaskinen.

### 23. `switch.siemens_016050395510002818_dishcare_dishwasher_option_silenceondemand`

- Tillstånd: `unavailable`. Plattform: `home_connect_alt`. Tillstånd sedan 2026-09-15T08:34:46.412928+00:00.
- Bedömning: **Villkorad rensningskandidat**.
- Silence On Demand-switch är restored true, medan motsvarande binary_sensor fungerar. Ingen direkt referens hittad i granskad YAML, dashboardlagring eller integrationskonfiguration. Kontrollera stöd när maskinen är idle och programlistan finns. Kan rensas om denna skrivbara kontroll inte längre skapas; annars inaktivera/tagga den.

### 24. `sensor.ha_python_cast_test`

- Tillstånd: `unavailable`. Plattform: `command_line`. Tillstånd sedan 2026-09-15T08:34:46.413097+00:00.
- Bedömning: **Tydlig rest – kan rensas**.
- restored true, ingen aktiv definition eller direkt referens hittad i granskad YAML, dashboardlagring eller integrationskonfiguration. De två command_line-testsensorerna saknas i dagens konfiguration. IR-gruppen saknas också; dagens IR-script använder light.varmeljus som fungerar. Jag kan rensa dessa tre registerposter via HA och verifiera resultatet.

### 25. `sensor.nest_hub_ip_test`

- Tillstånd: `unavailable`. Plattform: `command_line`. Tillstånd sedan 2026-09-15T08:34:46.413110+00:00.
- Bedömning: **Tydlig rest – kan rensas**.
- restored true, ingen aktiv definition eller direkt referens hittad i granskad YAML, dashboardlagring eller integrationskonfiguration. De två command_line-testsensorerna saknas i dagens konfiguration. IR-gruppen saknas också; dagens IR-script använder light.varmeljus som fungerar. Jag kan rensa dessa tre registerposter via HA och verifiera resultatet.

### 26. `light.ir_ljus`

- Tillstånd: `unavailable`. Plattform: `group`. Tillstånd sedan 2026-09-15T08:34:46.413145+00:00.
- Bedömning: **Tydlig rest – kan rensas**.
- restored true, ingen aktiv definition eller direkt referens hittad i granskad YAML, dashboardlagring eller integrationskonfiguration. De två command_line-testsensorerna saknas i dagens konfiguration. IR-gruppen saknas också; dagens IR-script använder light.varmeljus som fungerar. Jag kan rensa dessa tre registerposter via HA och verifiera resultatet.

### 27. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms`

- Tillstånd: `unavailable`. Plattform: `google_home`. Tillstånd sedan 2026-09-15T08:34:46.413173+00:00.
- Bedömning: **Google Home – felsök eller inaktivera**.
- Alla fyra är restored true. Ateljéns Google Home device-sensor har IP och Cast/MA-spelarna fungerar. Koden skapar alarm/timer-entiteter bara för enheter med auth_token och available vid setup. Återställda entiteter tyder på att funktionerna inte skapades vid start; exakt skäl är inte fastställt. Felsök lokal autentisering/tillgänglighet och ladda därefter om Google Home. Om funktionerna inte används, inaktivera eller tagga dessa entiteter; radera inte högtalaren.

### 28. `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers`

- Tillstånd: `unavailable`. Plattform: `google_home`. Tillstånd sedan 2026-09-15T08:34:46.413185+00:00.
- Bedömning: **Google Home – felsök eller inaktivera**.
- Alla fyra är restored true. Ateljéns Google Home device-sensor har IP och Cast/MA-spelarna fungerar. Koden skapar alarm/timer-entiteter bara för enheter med auth_token och available vid setup. Återställda entiteter tyder på att funktionerna inte skapades vid start; exakt skäl är inte fastställt. Felsök lokal autentisering/tillgänglighet och ladda därefter om Google Home. Om funktionerna inte används, inaktivera eller tagga dessa entiteter; radera inte högtalaren.

### 29. `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb`

- Tillstånd: `unavailable`. Plattform: `google_home`. Tillstånd sedan 2026-09-15T08:34:46.413197+00:00.
- Bedömning: **Google Home – felsök eller inaktivera**.
- Alla fyra är restored true. Ateljéns Google Home device-sensor har IP och Cast/MA-spelarna fungerar. Koden skapar alarm/timer-entiteter bara för enheter med auth_token och available vid setup. Återställda entiteter tyder på att funktionerna inte skapades vid start; exakt skäl är inte fastställt. Felsök lokal autentisering/tillgänglighet och ladda därefter om Google Home. Om funktionerna inte används, inaktivera eller tagga dessa entiteter; radera inte högtalaren.

### 30. `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume`

- Tillstånd: `unavailable`. Plattform: `google_home`. Tillstånd sedan 2026-09-15T08:34:46.413211+00:00.
- Bedömning: **Google Home – felsök eller inaktivera**.
- Alla fyra är restored true. Ateljéns Google Home device-sensor har IP och Cast/MA-spelarna fungerar. Koden skapar alarm/timer-entiteter bara för enheter med auth_token och available vid setup. Återställda entiteter tyder på att funktionerna inte skapades vid start; exakt skäl är inte fastställt. Felsök lokal autentisering/tillgänglighet och ladda därefter om Google Home. Om funktionerna inte används, inaktivera eller tagga dessa entiteter; radera inte högtalaren.

### 31. `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_device`

- Tillstånd: `unavailable`. Plattform: `google_home`. Tillstånd sedan 2026-09-15T08:34:46.413440+00:00.
- Bedömning: **Google Home – felsök eller inaktivera**.
- Alla fem är restored true, även Google Home device-sensorn. Cast- och MA-spelarna för kontoret fungerar. Detta är ett problem i Google Home-vyn/upptäckten, inte bevis för att högtalaren är borta. Kontrollera upptäckt, enhets-ID, IP och lokal autentisering. Inaktivera gamla poster om de visar sig ersatta; annars reparera eller tagga oanvända funktioner.

### 32. `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_alarms`

- Tillstånd: `unavailable`. Plattform: `google_home`. Tillstånd sedan 2026-09-15T08:34:46.413452+00:00.
- Bedömning: **Google Home – felsök eller inaktivera**.
- Alla fem är restored true, även Google Home device-sensorn. Cast- och MA-spelarna för kontoret fungerar. Detta är ett problem i Google Home-vyn/upptäckten, inte bevis för att högtalaren är borta. Kontrollera upptäckt, enhets-ID, IP och lokal autentisering. Inaktivera gamla poster om de visar sig ersatta; annars reparera eller tagga oanvända funktioner.

### 33. `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_timers`

- Tillstånd: `unavailable`. Plattform: `google_home`. Tillstånd sedan 2026-09-15T08:34:46.413464+00:00.
- Bedömning: **Google Home – felsök eller inaktivera**.
- Alla fem är restored true, även Google Home device-sensorn. Cast- och MA-spelarna för kontoret fungerar. Detta är ett problem i Google Home-vyn/upptäckten, inte bevis för att högtalaren är borta. Kontrollera upptäckt, enhets-ID, IP och lokal autentisering. Inaktivera gamla poster om de visar sig ersatta; annars reparera eller tagga oanvända funktioner.

### 34. `switch.google_home_kontorets_hogtalare_kontorets_hogtalare_do_not_disturb`

- Tillstånd: `unavailable`. Plattform: `google_home`. Tillstånd sedan 2026-09-15T08:34:46.413476+00:00.
- Bedömning: **Google Home – felsök eller inaktivera**.
- Alla fem är restored true, även Google Home device-sensorn. Cast- och MA-spelarna för kontoret fungerar. Detta är ett problem i Google Home-vyn/upptäckten, inte bevis för att högtalaren är borta. Kontrollera upptäckt, enhets-ID, IP och lokal autentisering. Inaktivera gamla poster om de visar sig ersatta; annars reparera eller tagga oanvända funktioner.

### 35. `number.google_home_kontorets_hogtalare_kontorets_hogtalare_alarm_volume`

- Tillstånd: `unavailable`. Plattform: `google_home`. Tillstånd sedan 2026-09-15T08:34:46.413489+00:00.
- Bedömning: **Google Home – felsök eller inaktivera**.
- Alla fem är restored true, även Google Home device-sensorn. Cast- och MA-spelarna för kontoret fungerar. Detta är ett problem i Google Home-vyn/upptäckten, inte bevis för att högtalaren är borta. Kontrollera upptäckt, enhets-ID, IP och lokal autentisering. Inaktivera gamla poster om de visar sig ersatta; annars reparera eller tagga oanvända funktioner.

### 36. `media_player.home_assistant_voice_096460_ma`

- Tillstånd: `unavailable`. Plattform: `music_assistant`. Tillstånd sedan 2026-09-15T11:09:33.283527+00:00.
- Bedömning: **Music Assistant – sannolik dubblett**.
- Denna MA-spelare (unique_id up442a44cc) är unavailable samtidigt som media_player.ha_voice_pe_096460_media_player är idle och den underliggande ESPHome-spelaren är idle. Loggen visar att båda MA-spelarna registrerades 13:09:33 lokal loggtid idag. Kontrollera provider och avsedd spelare i MA. Kan rensas i MA och därefter HA om den är en överflödig providerpost. Att bara radera HA-posten kan göra att den återkommer.

## Underlag och begränsningar

Läst aktuell HA state machine via Supervisor API, core.entity_registry, core.device_registry, core.label_registry och relevanta core.config_entries. Granskat HAGHS coordinator.py (_is_ignored och _calc_zombies), Google Home setup-kod, OpenWrt-sensorer/koordinator, Home Connect Alt tillgänglighetsvillkor, aktiv YAML, dashboardlagring och integrationsreferenser. Loggar hämtades med ha core logs --lines 5000; de gamla home-assistant.log.old/.1 är från 2025 och användes inte som aktuellt underlag.

Begärd historik för nio dagar gav senaste registrerade händelse för dessa entiteter 2026-09-07 och saknade båda MA-spelarna. Recorder har aktivt filter. Historiken är därför kompletterande och frånvaro av senare händelser bevisar inte att en entitet varit trasig hela perioden. Tidigare healthy-värden används enbart som belägg för tidigare funktion. Loggtiderna ligger två timmar före/efter UTC-formatering beroende på lokal loggvisning: start 10:33 lokal loggtid motsvarar 08:33 UTC i state machine.

Inga entiteter har raderats, inaktiverats eller taggats under analysen. Registerrensning bör göras via HA:s API; aktiv .storage ska inte redigeras direkt. Att radera en entitet som en aktiv integration fortfarande skapar ger ingen bestående rensning.

## Genomförda åtgärder och verifiering

2026-09-15T11:36:06.785632+00:00 UTC: Tre registerposter rensade via HA WebSocket API och nio entiteter taggade med haghs_ignore. Övriga befintliga taggar bevarades. HAGHS uppdaterades via homeassistant.update_entity. Verifierat igen efter väntan: alla tre saknas i register och state machine; alla nio har undantagstaggen och saknas i zombielistan. Antal 36 → 24, global hälsopoäng 94 → 97. Senaste HAGHS-rapport: 2026-09-15T11:34:54.000035+00:00.

Backup och maskinläsbar verifiering: `/homeassistant/backups/haghs_cleanup_20260915T113453Z`.

Borttagna:
- `sensor.ha_python_cast_test`
- `sensor.nest_hub_ip_test`
- `light.ir_ljus`

Taggade:
- `sensor.koket_openwrt_one_ap_koket_public_ip`
- `sensor.kontoret_openwrt_one_ap_kontoret_public_ip`
- `sensor.friggan_asus_lyra_map_ac2200_ap_friggan_public_ip`
- `sensor.poolen_tp_link_eap225_outdoor_v3_ap_poolen_public_ip`
- `select.siemens_016050395510002818_bsh_common_option_startinrelative`
- `switch.siemens_016050395510002818_dishcare_dishwasher_option_hygieneplus`
- `switch.siemens_016050395510002818_dishcare_dishwasher_option_halfload`
- `switch.siemens_016050395510002818_dishcare_dishwasher_option_variospeedplus`
- `switch.siemens_016050395510002818_dishcare_dishwasher_option_brilliancedry`

Kvarvarande 24:
- `light.grupp_lampor_som_tands_vid_skymning`
- `sensor.bilresa_dual_button_batteri`
- `sensor.bilresa_dual_button_batterispanning`
- `sensor.bilresa_dual_button_batterityp`
- `binary_sensor.bilresa_dual_button_battery_plus_low`
- `sensor.bilresa_dual_button_battery_plus`
- `media_player.mannis_vackarklocka_ma`
- `binary_sensor.openuv_skyddsfonster`
- `light.blomlampor_bion`
- `sensor.sovrummet_openwrt_one_router_sovrum_top_bandwidth_hosts`
- `sensor.blomlampa_trappan_energy_power`
- `sensor.blomlampa_trappan_energy`
- `select.siemens_016050395510002818_programs`
- `switch.siemens_016050395510002818_dishcare_dishwasher_option_silenceondemand`
- `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms`
- `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers`
- `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb`
- `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume`
- `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_device`
- `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_alarms`
- `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_timers`
- `switch.google_home_kontorets_hogtalare_kontorets_hogtalare_do_not_disturb`
- `number.google_home_kontorets_hogtalare_kontorets_hogtalare_alarm_volume`
- `media_player.home_assistant_voice_096460_ma`

Skymningsgruppens enda säkerhetskopior med medlemmar är från 2024; gruppen är redan tom i kopior från mars 2026. De gamla medlemslistorna är därför inte tillräckligt underlag för att välja dagens lampor. Gruppen behöver en aktuell medlemslista från användaren. Inga fysiska enheter har styrts eller kopplats om.

Även en andra uttryckligen begärd HAGHS-uppdatering gav 24 zombies och poäng 97. Oförändrade sensorattribut kan behålla samma last_reported när koordinatorn inte publicerar identiska data igen.
