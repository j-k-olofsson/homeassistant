ESPHome 2026.1 upgrade progress

Updated:
- esphome02 (ESP8266) OTA ok
- esphome03 (ESP8266) OTA ok
- esphome05 (ESP8266) OTA ok
- esphome07 (ESP8266) OTA ok
- esphome08 (ESP8266) OTA ok
- esphome09 (ESP8266) OTA ok
- esphome20 (ESP8266) OTA ok
- esphome41 (ESP32 LED strip) OTA ok
- esphome43 (ESP32-C3 LED strip) OTA ok
- esphome54 (Shelly Dimmer 2) OTA ok
- esphome59 (Shelly Dimmer 2) OTA ok

- esphome21 OTA ok
- esphome23 OTA ok
- esphome24 OTA ok
- esphome25 OTA ok
- esphome26 OTA ok
- esphome27 OTA ok
- esphome28 OTA ok
- esphome29 OTA ok
- esphome30 OTA ok
- esphome31 OTA ok
- esphome32 OTA ok
- esphome40 OTA ok
- esphome42 OTA ok
- esphome44 OTA ok
- esphome46 OTA ok
- esphome47 OTA ok
- esphome48 OTA ok
- esphome49 OTA ok
- esphome50 OTA ok
- esphome51 OTA ok
- esphome52 OTA ok
- esphome56 OTA ok
- esphome57 OTA ok
- esphome58 OTA ok
- esphome60 OTA ok
- esphome61 OTA ok
- esphome63 OTA ok
- esphome71 OTA ok
- esphome73 OTA ok
- esphome75 OTA ok
- esphome76 OTA ok
- esphome80 OTA ok
- esphome81 OTA ok
- esphome83 OTA ok
- esphome84 OTA ok
- esphome89 OTA ok
- esphome90 OTA ok
- esphome93 OTA ok
- esphome94 OTA ok
- esphome95 OTA ok
- esphome98 OTA ok
- esphome74 OTA ok
Pending:
- All remaining devices

Notes:
- Migrated custom components to external_components (local path /config/esphome/external_components).
- Added external_components include for shelly_dallas in /config/esphome/common/.device_shelly_1_climate.yaml.
- Updated shelly_dallas set_timeout usage to const char* overload (pre-2026.7.0 fix).
- Moved unused external components to /config/esphome/archive/external_components_unused.
- Standardized secrets to /config/esphome/secrets.yaml with /config/esphome/common/secrets.yaml as a symlink.
- Archived legacy unused files to /config/esphome/archive/legacy_unused.
- Normalized ownership/permissions under /config/esphome (dirs 755, files 644, secrets 600).
