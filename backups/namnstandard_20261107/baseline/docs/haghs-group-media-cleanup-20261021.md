# Skymningsgrupp och högtalar-/TV-rensning

Utfört 2026-10-21 13:17 CEST.

## Resultat

HAGHS **68 → 44 zombies**, totalpoäng **92 → 95 %**. Luftfuktarens åtta avsiktligt frånkopplade poster ingår fortfarande och har lämnats orörda.

## Återställd grupp

light.grupp_lampor_som_tands_vid_skymning uppdaterades via HA:s options flow. Gruppen är nu tillgänglig och on. Medlemmar i sparad konfiguration och state-attribut:

- light.grupp_sanglampor
- light.levoit_luftfukare_300s_night_light

Sänglamporna fungerar. Nattlampans gamla ID finns inte som aktuell entitet. Det är med i gruppkonfigurationen men kan styras först när integrationen åter levererar denna entitet. Om ett annat ID skapas vid återanslutning behöver det bytas i gruppen. Ingen påhittad ersättningsentitet har skapats. Inga ljuskommandon skickades; gruppens on-tillstånd kommer från befintliga medlemstillstånd.

## Genomförd mediarensning

Av 23 tidigare flaggade poster är **22 borttagna och en inaktiverad**. Alla nio gamla media_player-poster är borta. Av de 14 Google Home-posterna är 13 borta, medan sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_device återskapades när integrationen laddades om. Google levererar fortfarande den kontoposten. Den inaktiverades därför med disabled_by=user för bestående avveckling i HA, utan ändring av Google-kontot.

Två spelare fanns kvar i Music Assistant och togs bort vid källan med players/remove: upf3ea6c7e (otillgängliga Kontoret) och up0ba23cfe (gamla Ateljén). Övriga gamla MA-ID:n fanns inte i MA:s aktuella spelarlista. MA/HA tog automatiskt även bort de två spelarnas Favoritmarkera nuvarande låt-knappar och två MA-enhetsposter. Totalt försvann alltså 24 entiteter: 22 zombies och två tillhörande knappar. Kontroll av register före/efter visar exakt dessa 24 entiteter och de två MA-enheterna som borttagna.

Music Assistant uppdaterade automatiskt Grannys högtalare när Kontorets otillgängliga spelare togs bort. Gruppen finns kvar med medlemmarna up1a2803a2 och upb2965530.

Automation Återställ ljudvolymer ändrades från media_player.jbl_link_500 till fungerande media_player.jbl_link_500_67aa69. YAML verifierades och automationerna laddades om utan fel. Inget volymkommando eller testuppspelning skickades. Skriptets befintliga kompatibilitetsmappning från gamla MA-ID:t till media_player.ateljen behölls.

Aktuella Ateljén-spelare är fortsatt tillgängliga: Cast är off och MA idle. Backup av HA-register, automationsfil och MA settings.json samt maskinläsbara API-resultat finns i `/homeassistant/backups/haghs_group_media_20261021T111238Z`.

## Kvarvarande 44 zombies

| Integration | Antal | Bedömning |
|---|---:|---|
| Uptime Kuma | 20 | Sju certifikatmått på HTTP och 13 svarstider där källan ger -1. |
| Portainer | 9 | Disk-/volymstatistik saknas på aktuella värdar. |
| VeSync/luftfuktare | 8 | Avsiktligt offline, lämnas orörd. |
| ONVIF | 3 | Reglage utan återläsning av tillstånd. |
| Matter | 2 | Strömmätning och gammal effektpost för dimmern. |
| OpenUV | 1 | Skyddsfönster saknar värde. |
| OpenWrt | 1 | Top Bandwidth Hosts saknar nlbwmon-data. |

## Rekommenderat nästa steg

Hantera de 23 tidigare genomgångna falsklarmen: inaktivera de 20 irrelevanta/icke levererade Kuma-måtten och sätt haghs_ignore på ONVIF-reglage som används, eller inaktivera dem om de inte behövs. Behåll statusövervakningen för tjänster, backup och kamera. Med oförändrade övriga tillstånd skulle 21 zombies återstå, varav åtta är luftfuktaren; 13 återstår att bedöma när den avsiktligt frånkopplade luftfuktaren räknas bort.

Därefter kan de nio Portainer-måtten granskas för API-stöd eller inaktivering av onödig diagnostik. Matter, OpenWrt och OpenUV behöver funktionskontroll om mätningarna önskas. Dessa återstående poster har inte ändrats i detta uppdrag.

## Borttagna entiteter

- `button.ateljens_hogtalare_favoritmarkera_nuvarande_lat`
- `button.kontorets_hogtalare_favoritmarkera_nuvarande_lat`
- `media_player.ateljens_hogtalare`
- `media_player.chromecast5575`
- `media_player.chromecast5575_2`
- `media_player.gamla_tvn`
- `media_player.gamla_tvn_2`
- `media_player.jbl_link_500`
- `media_player.kontorets_hogtalare_ma`
- `media_player.mannis_vackarklocka_ma`
- `media_player.verkstadens_hogtalare`
- `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume`
- `number.google_home_ateljens_hogtalare_ateljens_hogtalare_alarm_volume_2`
- `number.google_home_kontorets_hogtalare_kontorets_hogtalare_alarm_volume`
- `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms`
- `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms_2`
- `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_device`
- `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers`
- `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers_2`
- `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_alarms`
- `sensor.google_home_kontorets_hogtalare_kontorets_hogtalare_timers`
- `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb`
- `switch.google_home_ateljens_hogtalare_ateljens_hogtalare_do_not_disturb_2`
- `switch.google_home_kontorets_hogtalare_kontorets_hogtalare_do_not_disturb`

## Kvarvarande entiteter

- `sensor.taklampor_kokson_aktiv_strom` (matter)
- `sensor.frigg_atervinningsbar_containerdiskanvandning` (portainer)
- `sensor.fulla_agent_atervinningsbar_containerdiskanvandning` (portainer)
- `sensor.fulla_agent_total_storlek_pa_containerdiskanvandning` (portainer)
- `sensor.fulla_agent_atervinningsbar_avbildningsdiskanvandning` (portainer)
- `sensor.fulla_agent_total_storlek_pa_avbildningsdiskanvandning` (portainer)
- `sensor.fulla_agent_total_storlek_pa_volymdiskanvandning` (portainer)
- `sensor.ha_esphome_config_share_volymstorlek` (portainer)
- `sensor.6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487_volymstorlek_2` (portainer)
- `sensor.ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49_volymstorlek_2` (portainer)
- `binary_sensor.openuv_skyddsfonster` (openuv)
- `sensor.portainer_certifikatets_utgangsdatum` (uptime_kuma)
- `sensor.uptime_via_caddy_certifikatets_utgangsdatum` (uptime_kuma)
- `sensor.home_assistant_ui_certifikatets_utgangsdatum` (uptime_kuma)
- `sensor.supervisor_health_certifikatets_utgangsdatum` (uptime_kuma)
- `sensor.core_api_wake_up_certifikatets_utgangsdatum` (uptime_kuma)
- `sensor.glances_ui_certifikatets_utgangsdatum` (uptime_kuma)
- `sensor.ollama_api_certifikatets_utgangsdatum` (uptime_kuma)
- `sensor.ollama_container_svarstid` (uptime_kuma)
- `sensor.caddy_container_svarstid` (uptime_kuma)
- `sensor.ha_test_container_svarstid` (uptime_kuma)
- `sensor.esphome_test_container_svarstid` (uptime_kuma)
- `sensor.glances_container_svarstid` (uptime_kuma)
- `sensor.portainer_agent_container_svarstid` (uptime_kuma)
- `sensor.docker_socket_proxy_container_svarstid` (uptime_kuma)
- `sensor.glances_container_svarstid_2` (uptime_kuma)
- `sensor.open_webui_container_svarstid` (uptime_kuma)
- `sensor.openwrt_backup_container_svarstid` (uptime_kuma)
- `sensor.portainer_container_svarstid` (uptime_kuma)
- `sensor.uptime_kuma_container_svarstid` (uptime_kuma)
- `sensor.frigg_fulla_backup_och_diskhalsa_svarstid` (uptime_kuma)
- `binary_sensor.levoit_luftfukare_300s_lagt_vatten` (vesync)
- `binary_sensor.levoit_luftfukare_300s_vattentanken_lyft` (vesync)
- `humidifier.levoit_luftfukare_300s` (vesync)
- `number.levoit_luftfukare_300s_dimniva` (vesync)
- `select.levoit_luftfukare_300s_niva_for_nattljus` (vesync)
- `switch.levoit_luftfukare_300s_visa` (vesync)
- `switch.levoit_luftfukare_300s_automatisk_avstangning` (vesync)
- `switch.honshuset_tapo_c200c_autofokus` (onvif)
- `switch.honshuset_tapo_c200c_ir_lampa` (onvif)
- `switch.honshuset_tapo_c200c_torkare` (onvif)
- `sensor.levoit_luftfukare_300s_luftfuktighet` (vesync)
- `sensor.sovrummet_openwrt_one_router_sovrum_top_bandwidth_hosts` (openwrt)
- `sensor.koket_taklampor_kokson_effekt` (matter)

## Slutlig verifiering

Ytterligare omladdning av Google Home bekräftar att 22 borttagna zombieposter förblir borta och att Kontorets återstående device-sensor förblir inaktiverad och saknas i state machine. Skymningsgruppen har båda önskade medlemmarna och är tillgänglig. HAGHS rapporterar fortsatt 44 zombies och 95 %.
