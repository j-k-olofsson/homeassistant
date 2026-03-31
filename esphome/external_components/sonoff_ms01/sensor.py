"""
sensor.py — Sonoff MS01 sensor platform
========================================
Defines the YAML schema and the Python-side code-generation function that
wires the C++ component together.

The component outputs only the raw ADC voltage from the sensor. Moisture
percentage conversion is intentionally left to the YAML layer so it can be
easily tuned per plant and soil type.
"""

import esphome.codegen as cg
import esphome.config_validation as cv
from esphome.components import sensor
from esphome import pins
from esphome.const import (
    CONF_ID,
    CONF_PIN,
    UNIT_VOLT,
    DEVICE_CLASS_VOLTAGE,
    STATE_CLASS_MEASUREMENT,
)
from esphome.core import CORE
from . import sonoff_ms01_ns, SonoffMS01Component

CONF_VOLTAGE = "voltage"


def _validate_platform_requirements(config):
    if not CORE.is_esp32:
        raise cv.Invalid(
            "sonoff_ms01 requires an ESP32 because it uses the RMT peripheral.\n"
            "Add an `esp32:` section with the ESP-IDF framework."
        )

    if CORE.using_arduino:
        raise cv.Invalid(
            "sonoff_ms01 requires the ESP-IDF framework on ESP32 because it uses "
            "the RMT driver API.\n"
            "Update your `esp32:` section to use `framework: {type: esp-idf}`."
        )

    return config


CONFIG_SCHEMA = cv.All(
    cv.Schema(
        {
            cv.GenerateID(): cv.declare_id(SonoffMS01Component),
            cv.Required(CONF_PIN): pins.internal_gpio_input_pin_schema,
            cv.Required(CONF_VOLTAGE): sensor.sensor_schema(
                unit_of_measurement=UNIT_VOLT,
                device_class=DEVICE_CLASS_VOLTAGE,
                state_class=STATE_CLASS_MEASUREMENT,
                accuracy_decimals=4,
                icon="mdi:sine-wave",
            ),
        }
    ).extend(cv.polling_component_schema("60s")),
    _validate_platform_requirements,
)


async def to_code(config):
    var = cg.new_Pvariable(config[CONF_ID])
    await cg.register_component(var, config)

    pin = await cg.gpio_pin_expression(config[CONF_PIN])
    cg.add(var.set_pin(pin))

    sens = await sensor.new_sensor(config[CONF_VOLTAGE])
    cg.add(var.set_voltage_sensor(sens))

    if CORE.is_esp32:
        try:
            from esphome.components.esp32 import include_builtin_idf_component

            include_builtin_idf_component("esp_driver_rmt")
        except ImportError:
            pass
