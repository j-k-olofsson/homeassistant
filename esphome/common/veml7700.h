#include "esphome.h"
#include "Adafruit_VEML7700.h"

#define I2C_SDAa 01
#define I2C_SCLa 03

// Requires this lib installed: $ platformio lib --global install "Adafruit BusIO"
// based on https://github.com/adafruit/Adafruit_VEML7700/blob/master/examples/veml7700_test/veml7700_test.ino

class VEML7700CustomSensor : public PollingComponent, public Sensor
{
public:
    Adafruit_VEML7700 veml = Adafruit_VEML7700();

    Sensor *lux_sensor = new Sensor();
    Sensor *white_sensor = new Sensor();
    Sensor *als_sensor = new Sensor();

    VEML7700CustomSensor() : PollingComponent(10000) {}
    void setup() override
    {
        Wire.begin(I2C_SDAa, I2C_SCLa, 400000);
        veml.begin(&Wire);
        veml.setGain(VEML7700_GAIN_1);
        veml.setIntegrationTime(VEML7700_IT_800MS);
    }

    void update() override
    {
        float lux = veml.readLux();
        float white = veml.readWhite();
        float als = veml.readALS();
        // // ESP_LOGD("VEML7700", "The value of sensor lux is: %.0f", lux);
        // // ESP_LOGD("VEML7700", "The value of sensor white is: %.0f", white);
        // // ESP_LOGD("VEML7700", "The value of sensor ALS is: %.0f", als);
        lux_sensor->publish_state(lux);
        white_sensor->publish_state(white);
        als_sensor->publish_state(als);
    }
};
