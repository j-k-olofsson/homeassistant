# ESPHome host configuration

This folder contains the host-side ESPHome configs used by Home Assistant.

## Structure
- `esphomeXX.yaml`: per-device configs with substitutions and package includes.
- `common/`: shared packages (boards, device types, blueprints, sensors).
- `packages/`: HA voice/extra packages.
- `external_components/`: locally hosted external components (only `shelly_dallas` is active).
- `archive/`: archived/legacy files not in active use.
- `.esphome/`: build/cache output (safe to ignore).

## Secrets
- Single source of truth: `secrets.yaml` in this root.
- `common/secrets.yaml` is a symlink to `../secrets.yaml` so packages resolve secrets without duplication.
- `.gitignore` excludes both `secrets.yaml` paths.

## Conventions
- IPs are derived from `node_id` (e.g. `192.168.30.1${node_id}`).
- Device configs should include shared packages from `common/` instead of duplicating blocks.

## Validation
- Use HA/ESPHome add-on for validation and OTA.
- For bulk validation, run `esphome config` over `esphome*.yaml` (as done in prior upgrades).

## OTA encryption
- `common/.ota.yaml` is the shared OTA package, included by both `.base.yaml`
  (Wi-Fi) and `.base_thread.yaml` (Thread). Device files inherit it automatically.
- OTA requires encryption and inherits the existing `api.encryption.key` from
  the base package. No separate OTA key or OTA password is needed.
- Use ESPHome 2026.9.0 or newer to build and upload.
- Existing devices must already offer OTA encryption: their running firmware
  must be built with ESPHome 2026.9.0+ and have the API encryption key. Otherwise,
  first install an intermediate firmware with the former OTA configuration
  (`password: !secret OTA_PWD`, without `encryption:`), then install the final
  configuration from this tree. Do this as a temporary per-device configuration;
  keep the shared package encrypted. Serial installation is another option.
- Keep the existing `OTA_PWD` secret for intermediate updates to older devices.
  Do not add it to the final shared OTA package.
- The separate Home Assistant Voice package does not use these base packages
  and has no OTA password to replace.

Reference: https://esphome.io/components/ota/esphome/#enabling-encryption-on-an-existing-device

## Device-initiated API connections
- `common/.api.yaml` is the shared API behavior package for every active device.
  Both Wi-Fi and Thread base packages include it; the separate Voice package
  includes it directly. Keep this API setting separate from `common/.ota.yaml`.
- `api.outgoing_connection` lets the device connect back to Home Assistant when
  HA cannot initiate the usual connection. Existing API encryption keys and
  per-device API settings are preserved.
- The default delay is 60 seconds and the destination port is TCP 6054. The
  device learns HA's address from an initial encrypted HA connection; no fixed
  HA host address is configured in the shared package.
- Build with ESPHome 2026.10.0+ and use Home Assistant 2026.10.0+. The feature
  takes effect on each device after its next firmware build and upload.
- esphome42 and esphome43 use this shared package too; their temporary local
  test settings have been removed.

Reference: https://esphome.io/components/api/#outgoing-connections
