import esphome.codegen as cg
from esphome.components import i2c, sensor
import esphome.config_validation as cv
from esphome.const import CONF_ID, CONF_INTEGRATION_TIME, STATE_CLASS_MEASUREMENT

DEPENDENCIES = ["i2c"]
AUTO_LOAD = ["sensor"]

CONF_UVA = "uva"
CONF_UVB = "uvb"
CONF_UVI = "uvi"
CONF_HIGH_DYNAMIC = "high_dynamic"

veml6075_custom_ns = cg.esphome_ns.namespace("veml6075_custom")

VEML6075CustomComponent = veml6075_custom_ns.class_(
    "VEML6075CustomComponent", cg.PollingComponent, i2c.I2CDevice
)

VEML6075IntegrationTime = veml6075_custom_ns.enum("VEML6075IntegrationTime")
INTEGRATION_TIMES = {
    "50ms": VEML6075IntegrationTime.VEML6075_INTEGRATION_TIME_50MS,
    "100ms": VEML6075IntegrationTime.VEML6075_INTEGRATION_TIME_100MS,
    "200ms": VEML6075IntegrationTime.VEML6075_INTEGRATION_TIME_200MS,
    "400ms": VEML6075IntegrationTime.VEML6075_INTEGRATION_TIME_400MS,
    "800ms": VEML6075IntegrationTime.VEML6075_INTEGRATION_TIME_800MS,
}

UVA_SCHEMA = sensor.sensor_schema(
    unit_of_measurement="uW/cm^2",
    accuracy_decimals=0,
    state_class=STATE_CLASS_MEASUREMENT,
)
UVB_SCHEMA = sensor.sensor_schema(
    unit_of_measurement="uW/cm^2",
    accuracy_decimals=0,
    state_class=STATE_CLASS_MEASUREMENT,
)
UVI_SCHEMA = sensor.sensor_schema(
    unit_of_measurement="UV index",
    accuracy_decimals=2,
    state_class=STATE_CLASS_MEASUREMENT,
)

CONFIG_SCHEMA = cv.Schema(
    {
        cv.GenerateID(): cv.declare_id(VEML6075CustomComponent),
        cv.Optional(CONF_HIGH_DYNAMIC, default=False): cv.boolean,
        cv.Optional(CONF_INTEGRATION_TIME, default="100ms"): cv.enum(
            INTEGRATION_TIMES, lower=True
        ),
        cv.Required(CONF_UVA): UVA_SCHEMA,
        cv.Required(CONF_UVB): UVB_SCHEMA,
        cv.Required(CONF_UVI): UVI_SCHEMA,
    }
).extend(cv.polling_component_schema("10s")).extend(i2c.i2c_device_schema(0x10))


async def to_code(config):
    var = cg.new_Pvariable(config[CONF_ID])
    await cg.register_component(var, config)
    await i2c.register_i2c_device(var, config)

    uva = await sensor.new_sensor(config[CONF_UVA])
    cg.add(var.set_uva_sensor(uva))

    uvb = await sensor.new_sensor(config[CONF_UVB])
    cg.add(var.set_uvb_sensor(uvb))

    uvi = await sensor.new_sensor(config[CONF_UVI])
    cg.add(var.set_uvi_sensor(uvi))

    cg.add(var.set_high_dynamic(config[CONF_HIGH_DYNAMIC]))
    cg.add(var.set_integration_time(config[CONF_INTEGRATION_TIME]))
