# Sophämtning: migration till Waste Collection Schedule

Användaren har begärt installation och ersättning av befintlig hantering om Waste Collection Schedule saknas.

## Befintlig lösning

- Lokal kalender `calendar.sophamtning`, config-entry `e68032cdcc5d02f1799bcc2a08b61370`.
- ICS skapad 2023: återkommande måndag varannan vecka. Ingen adress eller leverantör i kalendern.
- Template-hjälparen `sensor.soptomning`, config-entry `00aa2b5819a44ae77a63ee083c87520c`, formaterar nästa start_time till Idag/Imorgon/I övermorgon/Om N dagar.
- Panelen använder sensorn i `custom:home-status-strip`.
- Nästa befintliga datum vid kontroll: 2026-11-09.

## Genomfört

- Sparat privat backup av kalender, config-entries, entity-registry och Marketplace-registry i `backups/waste_migration_20261107/`.
- Installerat Waste Collection Schedule 2.36.0 via Marketplaces ordinarie API, repository 254347436.
- NVAA-källan finns i installerad version och kräver street_address.
- Konfiguration kontrollerad och giltig. Ursprunglig kalender och sensor fungerar fortfarande och är oförändrade.

## Slutförd migration

Användaren bekräftade NVAA och angav adressen. NVAA gav exakt en adressmatch och rapporterade restavfall och matavfall den 9 november 2026. Rådata innehåller också slamtömning i vecka 15–16 2027; slamtömning används inte i sophämtningsindikatorn. Adress och råsvar finns endast i den privata backupkatalogen.

- Konfigurerade integrationen via dess ordinarie config-flow, config-entry `01M6TBGE7XWDFYRFKGP21V2328`.
- Skapade en inbyggd WCS-sensor med svenska texter och typfilter Restavfall/Matavfall. Ingen separat template-hjälpare behövs.
- Verifierade den nya kalenderns nästa datum och sensorns värde innan gamla poster togs bort.
- Raderade den gamla template-hjälparen och lokala kalendern via Home Assistants DELETE-API. Den gamla ICS-filen finns endast i backup.
- Den nya integrationens sensor och kalender fick de befintliga ID:na `sensor.soptomning` och `calendar.sophamtning` via register-API. Deras plattform och config-entry är nu Waste Collection Schedule. Det bevarar panelens koppling utan en mellanliggande hjälpare.
- Panelen visar fortfarande ”I övermorgon” vid kontrollen 7 november och den nya sensorns attribut anger Restavfall, Matavfall den 9 november. Reparationslistan var tom efter bytet.
- Ingen Core-omstart krävdes.

Underlag: `backups/waste_migration_20261107/after_cutover.json` och `cutover_actions.json`.
