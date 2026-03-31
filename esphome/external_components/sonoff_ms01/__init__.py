"""
Sonoff MS01 Soil Moisture Sensor — ESPHome External Component
=============================================================
Declares the component namespace and C++ class for code generation.
Platform configuration (pins, sensors) lives in sensor.py.

Requirements:
  - ESP32 (any variant with RMT peripheral: original, S2, S3, C3, C6 …)
  - ESP-IDF framework  (NOT Arduino)
  - One free RMT RX channel at poll time (channel is borrowed briefly each read)
"""

import esphome.codegen as cg

MULTI_CONF = True

sonoff_ms01_ns = cg.esphome_ns.namespace("sonoff_ms01")

SonoffMS01Component = sonoff_ms01_ns.class_(
    "SonoffMS01Component", cg.PollingComponent
)
