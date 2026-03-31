/**
 * sonoff_ms01.h — Sonoff MS01 Soil Moisture Sensor driver
 */

#pragma once

#include "esphome/core/component.h"
#include "esphome/core/hal.h"
#include "esphome/components/sensor/sensor.h"

#ifdef USE_ESP_IDF
#include "esp_idf_version.h"
#if ESP_IDF_VERSION_MAJOR < 5
#error "sonoff_ms01 requires ESP-IDF v5+."
#endif
#include "driver/gpio.h"
#include "driver/rmt_rx.h"
#include <atomic>
#endif

namespace esphome {
namespace sonoff_ms01 {

class SonoffMS01Component : public PollingComponent {
 public:
  void set_pin(InternalGPIOPin *pin) { pin_ = pin; }
  void set_voltage_sensor(sensor::Sensor *sensor) { voltage_sensor_ = sensor; }

  void setup() override;
  void loop() override;
  void update() override;

  float get_setup_priority() const override { return setup_priority::DATA; }

 protected:
#ifdef USE_ESP_IDF
  bool allocate_rmt_();
  void release_rmt_();
  bool start_read_();
  bool decode_and_publish_();

  static bool IRAM_ATTR rmt_rx_done_cb_(
      rmt_channel_handle_t channel,
      const rmt_rx_done_event_data_t *edata,
      void *user_ctx);

  rmt_channel_handle_t rx_channel_{nullptr};
  rmt_symbol_word_t symbols_[64];
  bool retried_{false};

  enum class State : uint8_t {
    IDLE,
    WAITING,
    DONE,
  };

  std::atomic<State> state_{State::IDLE};
  volatile size_t num_symbols_{0};
  uint32_t deadline_ms_{0};
#endif

  InternalGPIOPin *pin_{nullptr};
  sensor::Sensor *voltage_sensor_{nullptr};
};

}  // namespace sonoff_ms01
}  // namespace esphome
