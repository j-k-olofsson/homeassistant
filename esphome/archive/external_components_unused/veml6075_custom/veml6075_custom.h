#pragma once

#include "esphome/components/i2c/i2c.h"
#include "esphome/components/sensor/sensor.h"
#include "esphome/core/component.h"

namespace esphome {
namespace veml6075_custom {

enum VEML6075IntegrationTime : uint8_t {
  VEML6075_INTEGRATION_TIME_50MS = 0,
  VEML6075_INTEGRATION_TIME_100MS = 1,
  VEML6075_INTEGRATION_TIME_200MS = 2,
  VEML6075_INTEGRATION_TIME_400MS = 3,
  VEML6075_INTEGRATION_TIME_800MS = 4,
};

class VEML6075CustomComponent : public PollingComponent, public i2c::I2CDevice {
 public:
  void set_uva_sensor(sensor::Sensor *sensor) { this->uva_sensor_ = sensor; }
  void set_uvb_sensor(sensor::Sensor *sensor) { this->uvb_sensor_ = sensor; }
  void set_uvi_sensor(sensor::Sensor *sensor) { this->uvi_sensor_ = sensor; }
  void set_high_dynamic(bool high_dynamic) { this->high_dynamic_ = high_dynamic; }
  void set_integration_time(VEML6075IntegrationTime integration_time) {
    this->integration_time_ = integration_time;
  }

  void setup() override;
  void dump_config() override;
  void update() override;

 protected:
  bool write_configuration_();
  bool read_word_(uint8_t reg, uint16_t &value);
  uint16_t integration_time_to_ms_() const;

  sensor::Sensor *uva_sensor_{nullptr};
  sensor::Sensor *uvb_sensor_{nullptr};
  sensor::Sensor *uvi_sensor_{nullptr};
  VEML6075IntegrationTime integration_time_{VEML6075_INTEGRATION_TIME_100MS};
  bool high_dynamic_{false};
};

}  // namespace veml6075_custom
}  // namespace esphome
