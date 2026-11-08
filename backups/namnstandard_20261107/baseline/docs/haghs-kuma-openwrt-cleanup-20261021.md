# Rensning av 27 Uptime Kuma-poster och sex OpenWrt-poster

Granskning och rensning: 2026-10-21 11:41 CEST.

## Resultat

Alla 33 granskade entiteter var unavailable med restored=true, utan aktiv dataleverans. De 27 Kuma-posterna hörde till monitor-ID 1, 7 och 36, som saknas i aktuell metrics-export (56 monitor-ID:n hittades). Detta styrker att de inte levereras till HA; det bevisar inte i sig om monitorerna är borttagna eller pausade i Kuma. Rensningen gäller enbart HA:s otillgängliga registerposter enligt uppdraget. Inga monitorer ändrades eller togs bort i Kuma.

De sex OpenWrt-signalsensorerna var återställda gamla stationsmått på kontorets AP. Installerad wireless.py skapar dessa mått endast om läget inte är ap/master/access point. De behövs alltså inte för övervakningen av AP/SSID i det aktuella läget. Inga AP-inställningar ändrades.

Ingen av de 33 hade direkta referenser i granskade automationer, skript, configuration.yaml, scenes.yaml, paket eller lagrade Lovelace-paneler. Sökning gjordes på entity_id, registry-ID och device-ID. Dynamiska eller externa referenser kan inte helt uteslutas.

De 33 entiteterna togs bort via config/entity_registry/remove. Aktiva .storage-filer redigerades inte. Inga enhetsposter eller andra entiteter togs bort. Tre gamla Kuma-enhetsposter har varsin kvarvarande integration-inaktiverad taggsensor; SSID-enheterna har vardera tre redan inaktiverade stationsmått. Dessa ligger utanför de 33 och påverkar inte HAGHS.

HAGHS uppdaterades via homeassistant.update_entity. **103 → 70 zombies**, hälsopoäng **91 → 91 %**. Exakt de avsedda 33 försvann ur entitetsregistret och samtliga saknas i state machine. Enhetsregistret har inga borttagna poster jämfört med före denna rensning.

Backup, urval, före-/efterbilder och verifiering: `/homeassistant/backups/haghs_kuma_openwrt_20261021T094017Z`. Katalogen innehåller säkerhetskopior av entitets- och enhetsregister, live-snapshots, urvalsgranskning och API-resultat.

## Kvarvarande zombies

| Integration | Antal |
|---|---:|
| uptime_kuma | 20 |
| google_home | 14 |
| portainer | 9 |
| vesync | 8 |
| music_assistant | 5 |
| cast | 4 |
| onvif | 3 |
| matter | 2 |
| powercalc | 2 |
| group | 1 |
| openuv | 1 |
| openwrt | 1 |

## Föreslagna nästa steg — ej genomförda

1. **Hantera 23 förväntade falsklarm på entitetsnivå.** Uptime Kuma har sju certifikatssensorer för HTTP-URL:er och 13 svarstidssensorer där källan ger -1 (tolv Docker och en push), medan monitorerna har fungerande status. ONVIF har tre reglage vars aktuella tillstånd inte läses tillbaka av implementationen. Inaktivera oanvända mått eller sätt haghs_ignore om reglagen/funktionerna ska finnas kvar. Behåll drift-, backup- och kamerastatus. Med oförändrade övriga tillstånd skulle detta minska 70 till 47.
2. **Reparera skymningsgruppen och två Powercalc-sensorer.** Gruppen har tom medlemslista men används i tre automationer. Välj önskade lampor. Powercalc pekar på light.bordslampa_vanster_old som saknas; den aktuella lampan har redan fungerande effekt- och energisensorer. Välj beräkning med hänsyn till energihistoriken.
3. **Granska äldre högtalar-/TV-identiteter och Google Home-poster (23 zombies).** Bekräfta ersatta enheter före rensning. Ateljéns aktuella Cast-/MA-spelare fungerar. scripts.yaml innehåller redan en uttrycklig omdirigering från media_player.ateljens_hogtalare till media_player.ateljen, så den referensen är inte ensam ett trasigt anrop; callers och automationens gamla Cast-mål behöver ändå granskas före rensning. Kontorets högtalare har ingen tydlig fungerande ersättare i underlaget.
4. **Felsök luftfuktaren (åtta zombies).** Den är otillgänglig över VeSync och dess vattenlarm används i en enhetsbaserad automation. Kontrollera ström, nätverk och VeSync-status innan radering/undantag.
5. **Bedöm nio Portainer-statistikmått separat.** De hör till aktuella värdar, men saknar disk-/volymdata. Felsök API-stöd eller inaktivera/undanta oanvänd diagnostik. Övriga funktioner: två Matter-mätposter, nlbwmon och OpenUV-skyddsfönster behöver funktionskontroll om de används.

De tre tomma på aktiva mätvärden Kuma-enheterna och deras inaktiverade taggsensorer kan granskas för kosmetisk registerstädning, men detta sänker inte HAGHS-antalet. Detsamma gäller redan inaktiverade stationsmått på SSID-enheterna. Ingen sådan extra rensning har gjorts.

## Borttagna 33 entiteter

### uptime_kuma

- `sensor.openwrt_backup_svarstid`
- `sensor.openwrt_backup_senaste_korning_svarstid`
- `sensor.wyoming_whisper_container_svarstid`
- `sensor.openwrt_backup_status`
- `sensor.openwrt_backup_senaste_korning_status`
- `sensor.wyoming_whisper_container_status`
- `sensor.openwrt_backup_monitortyp`
- `sensor.openwrt_backup_senaste_korning_monitortyp`
- `sensor.wyoming_whisper_container_monitortyp`
- `sensor.openwrt_backup_upptid_1_dag`
- `sensor.openwrt_backup_senaste_korning_upptid_1_dag`
- `sensor.wyoming_whisper_container_upptid_1_dag`
- `sensor.openwrt_backup_upptid_30_dagar`
- `sensor.openwrt_backup_senaste_korning_upptid_30_dagar`
- `sensor.wyoming_whisper_container_upptid_30_dagar`
- `sensor.openwrt_backup_upptid_365_dagar`
- `sensor.openwrt_backup_senaste_korning_upptid_365_dagar`
- `sensor.wyoming_whisper_container_upptid_365_dagar`
- `sensor.openwrt_backup_svarstid_o_1_dag`
- `sensor.openwrt_backup_senaste_korning_svarstid_o_1_dag`
- `sensor.wyoming_whisper_container_svarstid_o_1_dag`
- `sensor.openwrt_backup_svarstid_o_30_dagar`
- `sensor.openwrt_backup_senaste_korning_svarstid_o_30_dagar`
- `sensor.wyoming_whisper_container_svarstid_o_30_dagar`
- `sensor.openwrt_backup_svarstid_o_365_dagar`
- `sensor.openwrt_backup_senaste_korning_svarstid_o_365_dagar`
- `sensor.wyoming_whisper_container_svarstid_o_365_dagar`

### openwrt

- `sensor.ssid_olofsson_wifi_2_4_ghz_signal`
- `sensor.ssid_olofsson_guest_2_4_ghz_signal`
- `sensor.ssid_olofsson_iot_2_4_ghz_signal`
- `sensor.ssid_olofsson_wifi_5_ghz_signal`
- `sensor.ssid_olofsson_guest_5_ghz_signal`
- `sensor.ssid_olofsson_iot_5_ghz_signal`


## Senare verifiering

Ny kontroll efter mer än en minut: de 33 entiteterna har inte återkommit, varken i register eller state machine. Exakt samma 33 saknas; inga andra entiteter eller enheter har försvunnit. HAGHS rapporterar fortsatt 70 zombies och 91 % totalpoäng.
