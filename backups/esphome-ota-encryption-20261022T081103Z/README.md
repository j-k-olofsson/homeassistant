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
