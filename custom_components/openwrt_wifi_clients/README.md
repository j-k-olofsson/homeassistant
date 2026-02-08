# OpenWrt Wi-Fi Clients (Home Assistant Custom Integration)

Poll OpenWrt access points via ubus and expose sensors for Wi-Fi client counts and details.

## Requirements on OpenWrt
Enable ubus JSON-RPC over HTTP(S):

1. Install packages:
   - `rpcd-mod-file`
   - `uhttpd-mod-ubus`
2. Ensure `uhttpd` serves the ubus endpoint at `/ubus`.
3. Create or use an existing ubus user with permissions to call `hostapd.*`.

You can verify access with curl:

```bash
curl -s -X POST http://<ap>/ubus \
  -d '{"jsonrpc":"2.0","id":1,"method":"call","params":["00000000000000000000000000000000","session","login",{"username":"root","password":"YOURPASS"}]}'
```

The response should include `ubus_rpc_session`.

## Installation
1. Copy the `openwrt_wifi_clients` directory into:
   - `/config/custom_components/openwrt_wifi_clients/`
2. Restart Home Assistant.

## Add via UI (Config Flow)
1. Go to **Settings → Devices & Services → Add Integration**.
2. Search for **OpenWrt Wi-Fi Clients**.
3. Configure global settings (scan interval, optional name mappings).
4. Add each AP and finish.

## YAML Import (optional)
Add to `configuration.yaml`:

```yaml
openwrt_wifi_clients:
  scan_interval: 30
  # Optional: use this AP/router for DHCP lease lookups (IP/hostname mapping)
  dhcp_host: "192.168.10.1"
  client_name_map:
    "AA:BB:CC:DD:EE:FF": "Carolas iPhone"
    "11:22:33:44:55:66": "Roborock"
  ignore_macs:
    - "FF:FF:FF:FF:FF:FF"
  aps:
    - name: "AP-192.168.10.1"
      host: "192.168.10.1"
      username: "root"
      password: !secret ap_192_168_10_1_password
      scheme: "http"
      verify_ssl: true
    - name: "AP-192.168.10.4"
      host: "192.168.10.4"
      username: "root"
      password: !secret ap_192_168_10_4_password
      scheme: "http"
      verify_ssl: true
    - name: "AP-192.168.10.5"
      host: "192.168.10.5"
      username: "root"
      password: !secret ap_192_168_10_5_password
      scheme: "http"
      verify_ssl: true
    - name: "AP-192.168.10.6"
      host: "192.168.10.6"
      username: "root"
      password: !secret ap_192_168_10_6_password
      scheme: "http"
      verify_ssl: true
    - name: "AP-192.168.10.7"
      host: "192.168.10.7"
      username: "root"
      password: !secret ap_192_168_10_7_password
      scheme: "http"
      verify_ssl: true
    - name: "AP-192.168.10.8"
      host: "192.168.10.8"
      username: "root"
      password: !secret ap_192_168_10_8_password
      scheme: "http"
      verify_ssl: true
    - name: "AP-192.168.10.9"
      host: "192.168.10.9"
      username: "root"
      password: !secret ap_192_168_10_9_password
      scheme: "http"
      verify_ssl: true
    - name: "AP-192.168.10.10"
      host: "192.168.10.10"
      username: "root"
      password: !secret ap_192_168_10_10_password
      scheme: "http"
      verify_ssl: true
```

Note: passwords should be stored in `secrets.yaml`.

## Sensors
Per AP:
- `sensor.<ap_name>_wifi_clients` (auto-generated entity_id)
  - State: number of clients
  - Attributes: `ap_name`, `ap_ip`, `interfaces`, `clients`

Aggregated:
- `sensor.openwrt_wifi_clients_all`
  - State: total clients (available APs only)
  - Attributes: `by_ap`, `clients`

Each client object:
- `mac`, `hostname`, `ip`, `ifname`, `rssi`, `last_seen`, `ap_name`

## Troubleshooting
- Verify ubus endpoint:
  - `curl -s http://<ap>/ubus` (should respond with JSON-RPC error, not 404)
- Check HA logs with debug level:

```yaml
logger:
  default: info
  logs:
    custom_components.openwrt_wifi_clients: debug
```

- Common issues:
  - Wrong credentials or missing ubus permissions
  - `uhttpd-mod-ubus` not installed or `/ubus` not exposed
  - HTTPS with invalid certs (set `verify_ssl: false` if needed)

## RSSI color thresholds (Lovelace)
The current WiFi table color mapping in `ha_admin` uses these thresholds:

- `rssi <= -75`: red (`bad`)
- `-75 < rssi <= -67`: amber (`warn`)
- `rssi > -67`: green (`ok/good`)

These thresholds are currently defined in the Lovelace dashboard config file:

- `/config/.storage/lovelace.ha_admin`

Look for the `custom:flex-table-card` `modify` expressions that contain:

- `Number(x.rssi) <= -75`
- `Number(x.rssi) <= -67`
