# ESPHome10 - Sonoff MS01 on ESP32-C6-Zero

This node is configured in [esphome10.yaml](/config/esphome/esphome10.yaml) and uses the shared device package [common/.device_esp32_c6_thread_ms01.yaml](/config/esphome/common/.device_esp32_c6_thread_ms01.yaml).

## What this setup does

- Runs on `ESP32-C6-Zero`
- Connects to Home Assistant over `Thread` using your existing `OpenThread` dataset
- Reads one `Sonoff MS01` soil sensor
- Publishes both raw sensor voltage and a moisture percentage derived from the MS01/Tasmota reference curve

## Default pin choice

The configuration uses `GPIO14` as the MS01 data pin. If your wiring or board access makes another free internal GPIO easier, change `ms01_data_pin` in [esphome10.yaml](/config/esphome/esphome10.yaml).

## Wiring

The MS01 plug uses a 4-pole 2.5 mm style connector, but only three signals are needed:

- `VCC` -> `ESP32-C6-Zero 3V3`
- `GND` -> `ESP32-C6-Zero GND`
- `DATA` -> `ESP32-C6-Zero GPIO14`

Important:

- The wire colors on a cut `2.5 mm 4-pole` extension cable are not reliably standardized.
- Before connecting to the ESP32, map the breakout cable conductors with a multimeter continuity test or by tracing them against a known Sonoff `AL010` adapter.
- Do not assume that red or white on the breakout cable matches Sonoff's internal sensor wiring.

Recommended extra parts:

- `4.7k` to `10k` resistor between `DATA` and `3V3`
- A female `2.5 mm 4-pole` extension cable or Sonoff `AL010` adapter

## Cable diagram

```text
Sonoff MS01
  |
  |  2.5 mm 4-pole female adapter / breakout
  |
  +-- VCC  ------------------------------->  ESP32-C6-Zero 3V3
  +-- GND  ------------------------------->  ESP32-C6-Zero GND
  +-- DATA ------------------------------->  ESP32-C6-Zero GPIO14
                 |
                 +--[ 4.7k to 10k ]------->  ESP32-C6-Zero 3V3
```

## Flashing

1. Connect the board to USB.
2. Validate the config in your normal ESPHome environment:

```bash
cd /config/esphome
esphome config esphome10.yaml
```

3. First flash over USB:

```bash
cd /config/esphome
esphome run esphome10.yaml
```

4. If the board does not enter download mode automatically:

```text
Hold BOOT
Tap RESET
Release BOOT
Start flashing again
```

5. After the first successful flash and Thread join, later updates can be sent OTA from ESPHome/Home Assistant.

## Calibration

The current moisture percentage uses the piecewise MS01/Tasmota curve from the upstream reference implementation rather than a simple linear voltage mapping.

This has proven to match your trusted Xiaomi plant sensor better than the initial linear calibration.

Use the raw voltage entity for validation:

1. Compare `Soil Voltage` against the reported `%`.
2. Compare the result with a trusted reference sensor placed in the same soil.
3. If you later want plant-specific calibration, the package can be switched back to a custom linear mapping based on measured dry and wet soil voltages.

## Home Assistant entities

Expected entities include:

- `${node_name} ${plant_name} Soil Voltage`
- `${plant_name} Jordfuktighet`
- Thread diagnostic text sensors
- Restart button
