from __future__ import annotations

from homeassistant.const import CONF_HOST, CONF_PASSWORD, CONF_USERNAME

DOMAIN = "openwrt_wifi_clients"

PLATFORMS = ["sensor"]

DEFAULT_SCAN_INTERVAL = 30
DEFAULT_TIMEOUT = 8
DEFAULT_SCHEME = "http"
DEFAULT_VERIFY_SSL = True

CONF_APS = "aps"
CONF_AP_NAME = "name"
CONF_CLIENT_NAME_MAP = "client_name_map"
CONF_IGNORE_MACS = "ignore_macs"
CONF_INTERFACES = "interfaces"
CONF_SCAN_INTERVAL = "scan_interval"
CONF_SCHEME = "scheme"
CONF_VERIFY_SSL = "verify_ssl"
CONF_TIMEOUT = "timeout"

AP_KEYS = {
    CONF_AP_NAME,
    CONF_HOST,
    CONF_USERNAME,
    CONF_PASSWORD,
    CONF_SCHEME,
    CONF_VERIFY_SSL,
    CONF_INTERFACES,
    CONF_TIMEOUT,
}

# Attribute keys
ATTR_AP_NAME = "ap_name"
ATTR_AP_IP = "ap_ip"
ATTR_INTERFACES = "interfaces"
ATTR_CLIENTS = "clients"
ATTR_BY_AP = "by_ap"

# Ubus
UBUS_PATH = "/ubus"

# HA device registry
CONNECTION_NETWORK_MAC = "mac"
