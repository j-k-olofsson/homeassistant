#include "veml6075_custom.h"

#include "esphome/core/helpers.h"
#include "esphome/core/log.h"

#include <algorithm>
#include <cmath>

namespace esphome {
namespace veml6075_custom {

static const char *const TAG = "veml6075_custom.sensor";

static const uint8_t VEML6075_REG_CONF = 0x00;
static const uint8_t VEML6075_REG_UVA = 0x07;
static const uint8_t VEML6075_REG_UVB = 0x09;
static const uint8_t VEML6075_REG_UVCOMP1 = 0x0A;
static const uint8_t VEML6075_REG_UVCOMP2 = 0x0B;
static const uint8_t VEML6075_REG_ID = 0x0C;

static constexpr float UVA_A_COEFF = 2.22f;
static constexpr float UVA_B_COEFF = 1.33f;
static constexpr float UVB_C_COEFF = 2.95f;
static constexpr float UVB_D_COEFF = 1.74f;
static constexpr float UVA_RESPONSE = 0.001461f;
static constexpr float UVB_RESPONSE = 0.002591f;

void VEML6075CustomComponent::setup() {
  ESP_LOGCONFIG(TAG, "Setting up VEML6075...");
  uint16_t id = 0;
  if (!this->read_word_(VEML6075_REG_ID, id)) {
    ESP_LOGE(TAG, "Failed to read device ID");
    this->mark_failed();
    return;
  }

  if ((id & 0x00FF) != 0x26) {
    ESP_LOGE(TAG, "Unexpected device ID: 0x%02X", id & 0xFF);
    this->mark_failed();
    return;
  }

  if (!this->write_configuration_()) {
    ESP_LOGE(TAG, "Failed to configure sensor");
    this->mark_failed();
    return;
  }
}

void VEML6075CustomComponent::dump_config() {
  ESP_LOGCONFIG(TAG, "VEML6075 Custom Sensor:");
  LOG_I2C_DEVICE(this);
  ESP_LOGCONFIG(TAG, "  Integration time: %u ms", this->integration_time_to_ms_());
  ESP_LOGCONFIG(TAG, "  High dynamic: %s", YESNO(this->high_dynamic_));
  LOG_UPDATE_INTERVAL(this);
  LOG_SENSOR("  UVA", "uW/cm^2", this->uva_sensor_);
  LOG_SENSOR("  UVB", "uW/cm^2", this->uvb_sensor_);
  LOG_SENSOR("  UVI", "index", this->uvi_sensor_);
}

void VEML6075CustomComponent::update() {
  uint16_t raw_uva = 0;
  uint16_t raw_uvb = 0;
  uint16_t raw_comp1 = 0;
  uint16_t raw_comp2 = 0;

  if (!this->read_word_(VEML6075_REG_UVA, raw_uva) ||
      !this->read_word_(VEML6075_REG_UVB, raw_uvb) ||
      !this->read_word_(VEML6075_REG_UVCOMP1, raw_comp1) ||
      !this->read_word_(VEML6075_REG_UVCOMP2, raw_comp2)) {
    ESP_LOGW(TAG, "Reading sensor data failed");
    this->status_set_warning();
    return;
  }

  this->status_clear_warning();

  const float comp1 = static_cast<float>(raw_comp1);
  const float comp2 = static_cast<float>(raw_comp2);
  float uva = static_cast<float>(raw_uva) - (UVA_A_COEFF * comp1) - (UVA_B_COEFF * comp2);
  float uvb = static_cast<float>(raw_uvb) - (UVB_C_COEFF * comp1) - (UVB_D_COEFF * comp2);

  uva = std::max(0.0f, uva);
  uvb = std::max(0.0f, uvb);

  float uvi = ((uva * UVA_RESPONSE) + (uvb * UVB_RESPONSE)) / 2.0f;
  uvi = std::max(0.0f, uvi);

  if (this->uva_sensor_ != nullptr) {
    this->uva_sensor_->publish_state(uva);
  }
  if (this->uvb_sensor_ != nullptr) {
    this->uvb_sensor_->publish_state(uvb);
  }
  if (this->uvi_sensor_ != nullptr) {
    this->uvi_sensor_->publish_state(uvi);
  }
}

bool VEML6075CustomComponent::write_configuration_() {
  uint16_t config = 0;
  config |= (static_cast<uint16_t>(this->integration_time_) & 0x07) << 4;
  config |= static_cast<uint16_t>(this->high_dynamic_) << 3;
  return this->write_byte_16(VEML6075_REG_CONF, config);
}

bool VEML6075CustomComponent::read_word_(uint8_t reg, uint16_t &value) {
  uint8_t buffer[2] = {0, 0};
  if (this->read_register(reg, buffer, sizeof(buffer)) != i2c::ERROR_OK) {
    return false;
  }
  value = encode_uint16(buffer[1], buffer[0]);
  return true;
}

uint16_t VEML6075CustomComponent::integration_time_to_ms_() const {
  switch (this->integration_time_) {
    case VEML6075_INTEGRATION_TIME_50MS:
      return 50;
    case VEML6075_INTEGRATION_TIME_100MS:
      return 100;
    case VEML6075_INTEGRATION_TIME_200MS:
      return 200;
    case VEML6075_INTEGRATION_TIME_400MS:
      return 400;
    case VEML6075_INTEGRATION_TIME_800MS:
      return 800;
  }
  return 100;
}

}  // namespace veml6075_custom
}  // namespace esphome
