# HAGHS: luftfuktarundantag och rensning av återstående funktionsposter

Utfört 2026-10-21 13:35 CEST. **HAGHS 44 → 29 zombies; totalpoäng 95 → 98 %.** Kvar finns enbart 20 Uptime Kuma-sensorer och nio Portainer-sensorer.

## Genomförda åtgärder

Luftfuktarens VeSync-enhet cb4859e1895848029726ebf30c1551bc fick etiketten haghs_ignore via config/device_registry/update. Befintliga etiketter bevarades. HAGHS ignorerar enhetens åtta nu flaggade entiteter. Etiketten stänger inte av luftfuktaren eller dess automationer. När den åter tas i bruk kan etiketten tas bort om dess tillgänglighet åter ska påverka HAGHS.

En gammal återställd Matter-post har raderats:

- sensor.koket_taklampor_kokson_effekt

Sex aktiva integrationsentiteter har **inaktiverats**, inte registerraderats:

- sensor.taklampor_kokson_aktiv_strom
- binary_sensor.openuv_skyddsfonster
- switch.honshuset_tapo_c200c_autofokus
- switch.honshuset_tapo_c200c_ir_lampa
- switch.honshuset_tapo_c200c_torkare
- sensor.sovrummet_openwrt_one_router_sovrum_top_bandwidth_hosts

Detta är den bestående hanteringen av aktiva entiteter som annars skapas igen av integrationerna. Endast berörda reglage/mätfunktioner avvecklades; ingen hel ONVIF-, Matter-, OpenUV- eller OpenWrt-integration togs bort. Kameran är fortsatt idle och dimmern light.taklampor_kokson är off (tillgänglig). Inga fysiska kommandon skickades.

Strömsensorn förekommer som text i Aqara-flashövervakningens loggmeddelande i packages/aqara_taklampor_monitor.yaml:238. Efter inaktivering ger den läsningen unknown, vilket sensorn också gav före åtgärden. Det påverkar loggens strömfält, inte automationens ljusstyrning. Ingen sådan konfigurationsfil ändrades. De andra sex posterna hade inga direkta referenser i granskad aktiv YAML/Lovelace.

Alla ändringar gjordes via Home Assistants API. HAGHS uppdaterades efteråt. Backup, före-/efterbilder och resultat: `/homeassistant/backups/haghs_final_cleanup_20261021T113320Z`. Säkerhetskopierat: core.entity_registry, core.device_registry, core.label_registry och core.config_entries. Aktiv .storage har inte redigerats direkt.

## Uptime Kuma: vad är de 20 posterna?

De är mätentiteter i Home Assistant, inte 20 gamla fysiska enheter eller trasiga tjänster. En färsk metrics-export visar status 1 (up) för samtliga berörda monitorer.

- **Sju certifikatsensorer** hör till HTTP-adresser, som inte har TLS-certifikat att mäta. Sensorn blir unknown. Om HTTP är avsiktligt är sensorn onödig. Om HTTPS avses bör monitoradressen och certifikatövervakningen korrigeras i stället.
- **Tolv Docker-svarstider** kommer från monitorer av typen docker. Kuma anger -1 i stället för en uppmätt svarstid; HA-koden omvandlar negativa värden till unknown. Statusövervakningen fungerar ändå.
- **En push-svarstid** hör till Tor → Fulla – backup och diskhälsa. Push-monitorn är up men lämnar -1 som momentan svarstid. Backupstatus och annan statistik kan behållas utan denna sensor.

**Kan de tas bort?** Ja, just mätentiteterna kan avvecklas. Rekommenderad åtgärd är inaktivering i HA, eftersom aktiva integrationer kan återskapa raderade registerposter. Detta tar inte bort monitorerna i Kuma och stoppar inte tjänsterna. Behåll statusentiteterna. Inga av de 20 har ändrats i detta uppdrag.

| Entitet | Typ |
|---|---|
| `sensor.portainer_certifikatets_utgangsdatum` | Certifikat på HTTP |
| `sensor.uptime_via_caddy_certifikatets_utgangsdatum` | Certifikat på HTTP |
| `sensor.home_assistant_ui_certifikatets_utgangsdatum` | Certifikat på HTTP |
| `sensor.supervisor_health_certifikatets_utgangsdatum` | Certifikat på HTTP |
| `sensor.core_api_wake_up_certifikatets_utgangsdatum` | Certifikat på HTTP |
| `sensor.glances_ui_certifikatets_utgangsdatum` | Certifikat på HTTP |
| `sensor.ollama_api_certifikatets_utgangsdatum` | Certifikat på HTTP |
| `sensor.ollama_container_svarstid` | Docker-svarstid −1 |
| `sensor.caddy_container_svarstid` | Docker-svarstid −1 |
| `sensor.ha_test_container_svarstid` | Docker-svarstid −1 |
| `sensor.esphome_test_container_svarstid` | Docker-svarstid −1 |
| `sensor.glances_container_svarstid` | Docker-svarstid −1 |
| `sensor.portainer_agent_container_svarstid` | Docker-svarstid −1 |
| `sensor.docker_socket_proxy_container_svarstid` | Docker-svarstid −1 |
| `sensor.glances_container_svarstid_2` | Docker-svarstid −1 |
| `sensor.open_webui_container_svarstid` | Docker-svarstid −1 |
| `sensor.openwrt_backup_container_svarstid` | Docker-svarstid −1 |
| `sensor.portainer_container_svarstid` | Docker-svarstid −1 |
| `sensor.uptime_kuma_container_svarstid` | Docker-svarstid −1 |
| `sensor.frigg_fulla_backup_och_diskhalsa_svarstid` | Push-svarstid −1 |

## Portainer: vad är de nio posterna?

Detta är diagnostik för aktuella endpoints **14 Tor** och **15 Fulla**, båda online enligt Portainers API. De ska skiljas från tidigare borttagna gamla värd-/containerposter.

Sex mått gäller sammanlagd diskstatistik: en återvinningsbar containerstorlek för Tor och fem container-/avbildnings-/volymmått för Fulla. Tre mått gäller storleken på enskilda volymer. HA får för närvarande inget värde för dessa nio sensorentiteter; det bevisar inte att värden eller volymer saknas fysiskt.

**Kan de tas bort?** Ja, dessa HA-mått kan avvecklas om statistiken inte behövs. Inaktivering är lämpligare än registerradering. Att inaktivera en sensor tar inte bort containrar, avbildningar eller volymer och påverkar inte deras drift. Om diskstatistiken önskas bör tillgången till dessa mått i Docker/Portainer och integrationsmappningen felsökas. Inga av de nio har ändrats i detta uppdrag.

| Entitet | Mått |
|---|---|
| `sensor.frigg_atervinningsbar_containerdiskanvandning` | Tor: återvinningsbar containerdisk |
| `sensor.fulla_agent_atervinningsbar_containerdiskanvandning` | Fulla: sammanlagd diskstatistik |
| `sensor.fulla_agent_total_storlek_pa_containerdiskanvandning` | Fulla: sammanlagd diskstatistik |
| `sensor.fulla_agent_atervinningsbar_avbildningsdiskanvandning` | Fulla: sammanlagd diskstatistik |
| `sensor.fulla_agent_total_storlek_pa_avbildningsdiskanvandning` | Fulla: sammanlagd diskstatistik |
| `sensor.fulla_agent_total_storlek_pa_volymdiskanvandning` | Fulla: sammanlagd diskstatistik |
| `sensor.ha_esphome_config_share_volymstorlek` | Enskild volymstorlek |
| `sensor.6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487_volymstorlek_2` | Enskild volymstorlek |
| `sensor.ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49_volymstorlek_2` | Enskild volymstorlek |

## Referenskontroll och nästa steg

Inga direkta referenser till de 29 kvarvarande entiteterna hittades i granskade automationer, skript, configuration.yaml, paket eller lagrade Lovelace-paneler. Dynamiska och externa referenser kan inte helt uteslutas.

Rekommendation: **inaktivera de 20 Kuma-måtten och de nio Portainer-måtten**, om den saknade statistiken inte behövs. Låt fungerande statusövervakning vara kvar. Då skulle de nuvarande 29 flaggningarna försvinna; om inget annat ändras återstår inga rapporterade zombies. Detta är ännu ett förslag, inte en genomförd ändring. Noll zombies bevisar inte att alla funktioner fungerar; vissa funktioner har avsiktligt undantagits eller inaktiverats.

När luftfuktaren återansluts: kontrollera att nattlampan återkommer som light.levoit_luftfukare_300s_night_light, eftersom det ID:t nu ingår i skymningsgruppen. Om integrationen skapar ett annat ID behöver gruppmedlemmen uppdateras.
