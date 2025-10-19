# Frigg Host Documentation

## Overview
- Hostname `frigg` runs home automation, observability, and AI workloads on a single Ubuntu 24.04.3 LTS system.
- Primary roles: reverse proxy (Caddy), Home Assistant + ESPHome build node, Ollama model server, and supporting utilities (Glances, Portainer agent).
- Time zone: `Europe/Stockholm`. All services assume local Swedish time for scheduling and logs.

## Hardware Summary
- **Chassis / Board:** ASUS TUF GAMING B650-E WIFI (UEFI 3035, 2024-09-05).
- **CPU:** AMD Ryzen 9 7900 (12 cores / 24 threads, boost up to ~5.5 GHz).
- **Memory:** 32 GiB installed (≈30 GiB usable).
- **Primary Storage:** 1 TB Kingston SKC3000S NVMe (`nvme0n1`) with EFI partition (`/boot/efi`) and root (`/`).
- **GPU:** Exposed to Docker via `gpus: all` for Ollama workloads.

## Operating System & Base Services
- Ubuntu 24.04.3 LTS, kernel `6.8.0-85-generic`.
- System management commands:
  - Package updates: `sudo apt update && sudo apt full-upgrade`.
  - Firmware handled via ASUS UEFI (ensure RAID/VMD disabled for NVMe updates).
- Host monitoring:
  - `glances` web UI on `https://frigg:61208`.
  - `portainer_agent` available at TCP `9001` for Portainer managers.

## Networking
- **Primary LAN:** `eno1` static `192.168.10.200/24`.
- **Remote access:** Tailscale (`tailscale0`) address `100.97.175.60`.
- **Docker bridge networks:**
  - `edge`: shared across stacks for services fronted by Caddy.
  - `*_default`: per-stack internal bridges (`admin_default`, `ha_default`, `ollama_default`).
- Caddy terminates TLS and reverse-proxies internal services; vhost definitions reside in `/opt/admin/data/caddy`.

## Storage Layout
- Root filesystem: `/` on `nvme0n1p2` (ext4, ≈953 GiB).
- Key data directories under `/opt`:
  - `/opt/admin/data` – Caddy config + runtime state.
  - `/opt/ha/data` – Home Assistant configuration and ESPHome build cache.
  - `/opt/ollama/data/current` – Ollama models and server state.
  - `/opt/archive` – date-stamped snapshots of historical stacks/logs.
  - `/opt/backup` – auxiliary backups (e.g., `wyoming-whisper` models).

## Container Platform
- Docker Engine `28.5.1` (build `e180ab8`); compose files kept alongside each stack.
- Global command pattern (run from stack directory):
  - `docker compose pull`
  - `docker compose up -d`
  - `docker compose logs -f <service>`
- All production stacks join the shared `edge` network for reverse proxying.

### Admin Stack (`/opt/admin/compose`)
- Services:
  - `caddy` (`caddy:2.8.4`) – listens on `80/443/2019`, mounts `/opt/admin/data/caddy`.
  - `glances` (`nicolargo/glances:latest-full`) – exposes `61208-61209`.
  - `portainer_agent` (`portainer/agent:2.33.2`) – exposes `9001`, mounts Docker socket and volumes.
- Configuration via `.env` in the same directory; LAN-restricted vhosts use `LAN_CIDR` + `HOME_DOMAIN`.

### Home Automation Stack (`/opt/ha/compose`)
- Services:
  - `ha` (`ghcr.io/home-assistant/home-assistant:stable`) – bound to `58123/tcp`, uses `/opt/ha/data/config`.
  - `esphome` (`ghcr.io/esphome/esphome:latest`) – dashboard on `58124/tcp`.
    - SMB share `//192.168.10.2/config` mapped read-only to `/config/projects`.
    - YAML configs consumed through `/config/esphome` (symlink to `projects/esphome`).
    - Local SSD cache: `/opt/ha/data/esphome/.esphome-local`, exported via `ESPHOME_DATA_DIR` and `ESPHOME_STORAGE_DIR`.
- Environment stored in `/opt/ha/compose/.env`. SMB credentials currently live in clear text; consider migrating to a credentials file for improved hygiene.
- To rebuild after compose changes: `docker compose up -d --force-recreate esphome`.

### Ollama Stack (`/opt/ollama/compose`)
- Single service `ollama` (`ollama/ollama:latest`):
  - Exposed on `11434/tcp` for REST and gRPC.
  - GPU passthrough (`gpus: all`); adjust via `NVIDIA_VISIBLE_DEVICES` in `.env`.
  - Persistent data: `/opt/ollama/data/current`.
- Shares the `edge` network so models can be proxied via Caddy if desired.

### Archived & Legacy Stacks
- `/opt/archive/*-legacy-*` directories store frozen compose bundles and logs (timestamped 2025-10-18). Use as reference or rollback material; they are not actively deployed.

## Monitoring & Observability
- Caddy access/error logs: `/opt/admin/data/caddy/logs` (if enabled via Caddyfile snippets).
- Home Assistant diagnostics: `/opt/ha/data/config/home-assistant.log`.
- ESPHome build cache and binary artefacts: `/opt/ha/data/esphome/.esphome-local`.
- Docker health:
  - `docker ps` for runtime status.
  - `docker stats` for resource usage peek.

## Maintenance Notes
- **System updates:** run monthly (`apt`), reboot if kernel updated.
- **Container refresh:** quarterly or alongside upstream releases (`docker compose pull && docker compose up -d` per stack). Validate via `docker compose ps`.
- **Backups:**
  - Snapshot critical directories (`/opt/ha/data`, `/opt/admin/data`, `/opt/ollama/data`) before major upgrades.
  - SMB-mounted configs originate from `192.168.10.2` – ensure HA server backups cover that share.
- **Secrets hygiene:** review `.env` files for credentials; migrate to Docker secrets or CIFS credentials files when feasible.
- **Documentation upkeep:** revise this README when stack topology or hardware changes (e.g., additional services, storage expansion, kernel upgrades).

## Quick Reference Commands
- Start/stop stacks:
  - `cd /opt/<stack>/compose && docker compose up -d`
  - `cd /opt/<stack>/compose && docker compose down`
- View logs:
  - `docker compose logs -f <service>`
  - `journalctl -u docker.service` (host-level)
- Health checks:
  - `curl -f https://frigg/healthz` (if Caddy health endpoint configured)
  - `docker inspect --format '{{.State.Health.Status}}' <container>`

---
Maintainers: keep a change log of significant modifications (hardware swaps, new services, credentials rotation) and mirror updates into both automation (`git` repos, if any) and this README.
