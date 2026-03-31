#include "sonoff_ms01.h"

#include "esp_log.h"
#include "esp_rom_sys.h"
#include "esphome/core/log.h"

static const char *const TAG = "sonoff_ms01";

#ifdef USE_ESP_IDF

namespace esphome {
namespace sonoff_ms01 {

void SonoffMS01Component::setup() {
  const gpio_num_t gpio = static_cast<gpio_num_t>(pin_->get_pin());

  gpio_config_t io_conf = {};
  io_conf.pin_bit_mask = 1ULL << gpio;
  io_conf.mode = GPIO_MODE_INPUT_OUTPUT_OD;
  io_conf.pull_up_en = GPIO_PULLUP_ENABLE;
  io_conf.pull_down_en = GPIO_PULLDOWN_DISABLE;
  io_conf.intr_type = GPIO_INTR_DISABLE;
  gpio_config(&io_conf);

  gpio_set_level(gpio, 1);

  ESP_LOGCONFIG(TAG, "Sonoff MS01 on GPIO%d, poll every %.0f s", gpio,
                static_cast<double>(get_update_interval()) / 1000.0);
}

void SonoffMS01Component::update() {
  if (state_.load(std::memory_order_relaxed) != State::IDLE) {
    ESP_LOGW(TAG, "Previous read still in progress - skipping this cycle");
    return;
  }

  retried_ = false;
  if (!this->start_read_()) {
    ESP_LOGE(TAG, "Failed to start MS01 read");
  }
}

bool SonoffMS01Component::start_read_() {
  if (!allocate_rmt_()) {
    return false;
  }

  rmt_receive_config_t rx_conf{};
  rx_conf.signal_range_min_ns = 1'000;
  rx_conf.signal_range_max_ns = 1'000'000;

  esp_err_t err = rmt_receive(rx_channel_, symbols_, sizeof(symbols_), &rx_conf);
  if (err != ESP_OK) {
    ESP_LOGW(TAG, "rmt_receive() failed: %s - aborting read", esp_err_to_name(err));
    release_rmt_();
    return false;
  }

  const gpio_num_t gpio = static_cast<gpio_num_t>(pin_->get_pin());
  gpio_set_level(gpio, 0);
  esp_rom_delay_us(450);
  gpio_set_level(gpio, 1);

  state_.store(State::WAITING, std::memory_order_relaxed);
  deadline_ms_ = millis() + 20;
  return true;
}

void SonoffMS01Component::loop() {
  switch (state_.load(std::memory_order_relaxed)) {
    case State::IDLE:
      return;

    case State::WAITING:
      if (millis() > deadline_ms_) {
        ESP_LOGW(TAG, "Timeout - no response from MS01 (symbols captured before timeout: %u)",
                 (unsigned) num_symbols_);
        release_rmt_();
        state_.store(State::IDLE, std::memory_order_relaxed);

        if (!retried_) {
          retried_ = true;
          if (!this->start_read_()) {
            ESP_LOGE(TAG, "Retry start failed");
          }
          return;
        }
        retried_ = false;
      }
      return;

    case State::DONE:
      release_rmt_();
      state_.store(State::IDLE, std::memory_order_relaxed);

      if (!decode_and_publish_()) {
        if (!retried_) {
          retried_ = true;
          if (!this->start_read_()) {
            ESP_LOGE(TAG, "Retry start after failed decode failed");
          }
          return;
        }
      }

      retried_ = false;
      return;
  }
}

bool IRAM_ATTR SonoffMS01Component::rmt_rx_done_cb_(
    rmt_channel_handle_t,
    const rmt_rx_done_event_data_t *edata,
    void *user_ctx) {
  auto *self = static_cast<SonoffMS01Component *>(user_ctx);
  self->num_symbols_ = edata->num_symbols;
  self->state_.store(State::DONE, std::memory_order_relaxed);
  return false;
}

bool SonoffMS01Component::allocate_rmt_() {
  rmt_rx_channel_config_t rx_cfg{};
  rx_cfg.gpio_num = static_cast<gpio_num_t>(pin_->get_pin());
  rx_cfg.clk_src = RMT_CLK_SRC_DEFAULT;
  rx_cfg.resolution_hz = 1'000'000;
  rx_cfg.mem_block_symbols = 64;

  esp_err_t err = rmt_new_rx_channel(&rx_cfg, &rx_channel_);
  if (err != ESP_OK) {
    ESP_LOGW(TAG, "Could not allocate RMT RX channel: %s", esp_err_to_name(err));
    rx_channel_ = nullptr;
    return false;
  }

  rmt_rx_event_callbacks_t cbs{};
  cbs.on_recv_done = &SonoffMS01Component::rmt_rx_done_cb_;
  rmt_rx_register_event_callbacks(rx_channel_, &cbs, this);

  rmt_enable(rx_channel_);
  return true;
}

void SonoffMS01Component::release_rmt_() {
  if (rx_channel_ == nullptr) {
    return;
  }

  rmt_disable(rx_channel_);
  rmt_del_channel(rx_channel_);
  rx_channel_ = nullptr;
}

bool SonoffMS01Component::decode_and_publish_() {
  const size_t n = num_symbols_;
  static constexpr size_t DATA_OFFSET = 2;
  static constexpr size_t BITS = 40;
  static constexpr size_t MIN_SYMBOLS = DATA_OFFSET + BITS;

  ESP_LOGD(TAG, "RMT captured %u symbols", n);

  if (n < MIN_SYMBOLS) {
    ESP_LOGW(TAG, "Too few RMT symbols: got %u, need at least %u", n, MIN_SYMBOLS);
    return false;
  }

  uint8_t data[5] = {};

  for (size_t i = 0; i < BITS; i++) {
    const rmt_symbol_word_t &sym = symbols_[DATA_OFFSET + i];

    if (sym.level0 != 0 || sym.duration0 < 20 || sym.duration0 > 100) {
      ESP_LOGW(TAG, "Unexpected framing on bit[%u]: level0=%u dur0=%u",
               i, sym.level0, sym.duration0);
      return false;
    }

    const bool bit = (sym.duration1 >= 40);
    data[i / 8] |= static_cast<uint8_t>(bit ? 1U : 0U) << (7U - (i % 8U));
  }

  const uint8_t calc = static_cast<uint8_t>(
      (data[0] + data[1] + data[2] + data[3]) & 0xFFU);

  if (data[4] != calc) {
    const uint8_t recovered = data[4] ^ 0x01U;
    if (recovered != calc) {
      ESP_LOGW(TAG, "Checksum failed: calculated 0x%02X, received 0x%02X",
               calc, data[4]);
      return false;
    }
    data[4] = recovered;
  }

  const int32_t raw = (static_cast<int32_t>(data[0]) << 8) | data[1];
  const float voltage = static_cast<float>(raw) / 10000.0f;

  ESP_LOGD(TAG, "raw=%d voltage=%.4f V", raw, voltage);
  voltage_sensor_->publish_state(voltage);
  return true;
}

}  // namespace sonoff_ms01
}  // namespace esphome

#else

namespace esphome {
namespace sonoff_ms01 {

void SonoffMS01Component::setup() {
  ESP_LOGE(TAG, "sonoff_ms01 requires the ESP-IDF framework.");
  this->mark_failed();
}

void SonoffMS01Component::loop() {}
void SonoffMS01Component::update() {}

}  // namespace sonoff_ms01
}  // namespace esphome

#endif
