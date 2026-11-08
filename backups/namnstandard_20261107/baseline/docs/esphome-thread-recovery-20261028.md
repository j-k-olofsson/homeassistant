# ESPHome Thread: återställning 2026-10-28

Slutkontroll: 2026-10-28T08:52:34+01:00.

Alla sex aktiva Thread-enheter uppgraderades från ESPHome 2026.10.0 till 2026.10.1. Tillfälliga `openthread.use_address`-värden med verifierade interna mesh-local IPv6-adresser användes för återställningen. API-identiteten kontrollerades före varje enhets uppgradering. OTA utfördes krypterat, en enhet i taget.

Före återställningen annonserades IPv6-adresser via mDNS/SRP som gav timeout för OTA, API och webbserver i anslutningsproven. Interna mesh-local-adresser fungerade. Efter uppgradering och omstart fungerar DNS-vägen igen. DNS-adresserna behövde inte bytas.

| Enhet | Version efter uppgradering | IPv6 via DNS/mDNS | Krypterat API | OTA-port 3232 |
|---|---|---|---|---|
| esphome42 | 2026.10.1 | `fd58:1d15:b4f6:1:9ba6:6485:96b:c122` | OK | Öppen |
| esphome45 | 2026.10.1 | `fd58:1d15:b4f6:1:d6bb:8c94:37a5:b3e4` | OK | Öppen |
| esphome46 | 2026.10.1 | `fd58:1d15:b4f6:1:883f:63fa:3b60:4a07` | OK | Öppen |
| esphome47 | 2026.10.1 | `fd58:1d15:b4f6:1:da90:2de:b235:4dc6` | OK | Öppen |
| esphome49 | 2026.10.1 | `fd58:1d15:b4f6:1:3e7b:2005:62a0:b24c` | OK | Öppen |
| esphome58 | 2026.10.1 | `fd58:1d15:b4f6:1:776f:4bc0:effb:919b` | OK | Öppen |

En fullständig extra installation på esphome45 gjordes efter återställning till DNS, med `esphome upload /config/esphome/esphome45.yaml --device OTA`. Även denna OTA-överföring var krypterad och lyckades. Firmware för detta prov kompilerades med återställd DNS-konfiguration.

Samtliga sex YAML-filer verifierades byte för byte mot kopiorna från före åtgärden, och samtliga slutkonfigurationer validerades med ESPHome 2026.10.1. Paketfilernas `${node_name}.local` används igen. Befintlig ändring av night_brightness för esphome49 bevarades.

Observationen visar ett adress-/nåbarhetsproblem under 2026.10.0, inte ett kompileringsfel eller enbart misslyckad namnuppslagning. Den visar inte säkert att 2026.10.1 innehåller en specifik rättning: enheterna startades också om vid uppgraderingen, så ett tillfälligt nätverkstillstånd kan ha återställts. Ingen nedgradering eller separat omstart med 2026.10.0 testades.

Kopior före ändringen, versions- och anslutningsresultat samt OTA-loggar finns i `/config/backups/esphome-thread-recovery-20261028/`. Inga hemliga nycklar har lagts i rapporten.
