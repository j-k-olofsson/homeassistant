# Thread-migrationsplan

## Målbild

Migrera fristående, nätmatade ESPHome-enheter till ESP32-C6-Zero över Thread när samma funktion kan behållas utan Wi-Fi. Prioritera alltid nätmatade enheter eftersom de blir stabila Thread-routrar.

## Aktuell status

- `esphome42` är migrerad till ESP32-C6-Zero över Thread.
- `esphome58` och `esphome46` är förberedda för ESP32-C6-Zero över Thread med LED-data på `GPIO3`.
- `esphome10` och `esphome99` är borttagna från ESPHome och Home Assistant.
- `esphome90` är en Wi-Fi-baserad ESP32 D1 mini och ska behållas som Salt (verkstan).

## Prioritering

1. `esphome58` – LEDstrip (korridoren), enkel C6-profil och nätmatad.
2. `esphome46` – LEDstrip (ateljé norra), nätmatad och behåller scenstyrning via `input_select.light_scene`.
3. `esphome45`, `esphome47`, `esphome49`, `esphome50`, `esphome51`, `esphome52` – samma typ av fönster-LEDstrip som `esphome46`.
4. `esphome48` – samma kategori, men 150 LED innebär större ström- och minnesbehov.
5. `esphome43` – enkel LEDstrip på ESP32-C3.
6. `esphome40`, `esphome44` – LEDstrippar med väckningsljus; portera den äldre NeopixelBus-logiken först.
7. `esphome71`, `esphome73`, `esphome98` – fristående sensorer som kräver ny C6-pinmappning.
8. `esphome75`, `esphome93` – tekniskt möjliga, men styr lucka respektive markis och ska migreras först efter fler stabila Thread-enheter.

## Behåll Wi-Fi

- `esphome74`: Bluetooth-proxy.
- `esphome76`: IR-gateway.
- `esphome89`: ESP32-kamera.
- `esphome94`: RF-brygga.
- `esphome95`: elmätare.
- Inbyggda Sonoff- och Shelly-enheter: `esphome02`–`32`, `54`–`63`, `80`, `81`, `83`, `84`. De är anpassade för befintlig nätspänningshårdvara och bör inte ersättas med lösa C6-kort.

## Migrationsrutin

1. Bygg och flasha C6 via USB.
2. Anslut LED-datasignalen till C6 `GPIO3` och dela jord med LED-stripens nätaggregat.
3. Låt den gamla Wi-Fi-integrationen vara kvar i Home Assistant tills C6-noden annonseras med samma `node_name`.
4. Välj **Migrera befintlig enhet** när Home Assistant visar namnkonflikten; då behålls entiteter och historik medan MAC-adressen byts.
5. Kontrollera att noden får Thread-adress och rollen `router` eller `leader`, och bekräfta sedan LED-funktionerna.
