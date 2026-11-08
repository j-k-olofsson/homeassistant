# HA health check, 2026-09-19

Read-only diagnostics plus fixes for stale HA HTTP port references. No HA restart or OS upgrade performed.

## Verified

- HAOS 18.2, boot slot B; inactive slot A contains 18.3.
- Home Assistant Core 2026.9.3 running; Supervisor 2026.09.2 healthy and supported.
- Supervisor resolution: no issues, unhealthy conditions, or unsupported conditions.
- `ha core check` passed.
- 15 of 16 apps started. SSH port 22222 Configurator is stopped with manual boot configured.
- Ethernet 192.168.10.2 and VLAN 30 address 192.168.30.2 connected; host and Supervisor internet checks passed.
- HA HTTP port 80 configured in `.storage/http` and reported by Supervisor.
- Internal URL is `http://192.168.10.2`; existing trusted proxy includes Frigg 192.168.10.200/32.
- HTTP 200 on both LAN addresses and eir.local; port 8123 refused connections on both LAN addresses.
- Nabu Casa external URL returned HTTP 200; remote UI entity on.
- Recorder writes current: latest database state was 4.3 seconds old at measurement.
- Disk free 364.4 GB. Core approximately 1.1 GB RAM and 1.58% CPU at measurement.
- Last successful automatic backup reported 2026-09-19 10:00:43 UTC.
- Matter Server receives live measurements; OpenThread Border Router reached router role.

## Port corrections

- `tools/trigger_granny_plan.sh`: default URL and help changed from port 8123 to implicit port 80. Shell syntax check passed.
- `tools/granny_plan.env`: commented URL example updated.
- Frigg 192.168.10.200, `/opt/admin/data/caddy/conf.d/ha.caddy`: upstream changed from `192.168.10.2:8123` to `192.168.10.2:80`.
- Caddy configuration validated, then reloaded. `https://ha.home.arpa` changed from HTTP 502 to HTTP 200. Certificate validation passed from Frigg and Fulla; WebSocket handshake through Caddy succeeded.
- Caddy backup: `/opt/admin/data/caddy/conf.d/ha.caddy.bak-20260919-port80` on Frigg.
- Fulla 192.168.10.100, Uptime Kuma monitor 11 (Home Assistant UI) and monitor 13 (Core API Wake-up): URLs changed to `http://192.168.10.2` and `http://192.168.10.2/api/`.
- Kuma database backed up using SQLite backup API to `/home/diego/kuma-before-ha-port80-20260919.db` on Fulla. Container stopped during a guarded transaction changing only these two URLs, then restarted.
- Both monitors subsequently reported status 1 (up); Kuma container running and healthy.
- No old port references remained in Kuma monitor URLs/ports, reviewed active server config files, the 16 HA app option sets, or searched ESPHome YAML and local automation/custom component sources.
- Port 8123 in `frigg-esphome-migration/docker-compose.yml` belongs to the separate test HA container (host port 58123), so was retained. Historical auth client IDs and backup files were retained.

## Remaining findings

- Snapshot: 2385 entities, 95 unavailable and 179 unknown. These are entity counts, not device counts, and do not establish a regression without a prior baseline.
- Unavailable entities by integration: AlsavoPro 30, Home Connect Alt 15, Google Home 13, VeSync 9, Music Assistant 6, ESPHome 6, Powercalc 4, Cast 3, PrusaLink 3, automation 3, group 1, OpenRGB 1, Matter 1.
- AlsavoPro repeatedly times out; some Chromecast speakers also report connection failures.
- OpenWrt WiFi Clients warns that DHCP host 192.168.10.1 is missing from the AP list and falls back to per-AP leases.
- Three unavailable presence-simulation automations require separate investigation.
- Live Repairs has an unignored warning for `automation.aterstall_ljudvolymer`, referencing deleted `media_player.ateljens_hogtalare_ma`; another orphaned-statistics warning is ignored.
- 262 integration entries loaded; 22 not loaded, including four explicitly user-disabled entries. Reasons for the other unloaded entries were not established.
- Additional logs include a template-loop warning in the unavailable-entity count sensor and an obsolete ESPHome app option `status_use_ping`.

## Scope limits

No ESPHome firmware changes are required for native API communication due solely to HA's HTTP port change. Hardcoded HA HTTP URLs on devices, browser bookmarks, mobile app settings, external routers/firewalls, or firmware not represented in the available configuration still require checking where used. Physical actuation, audio playback, and every individual device were not tested.
