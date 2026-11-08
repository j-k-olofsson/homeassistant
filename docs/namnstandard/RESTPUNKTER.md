# Restpunkter efter uppföljningen 8 november 2026

Alla tidigare uppskjutna namnfrågor är åtgärdade:

| Objekt | Resultat |
|---|---|
| Slider / `input_number.slider` | Inga användare hittades i granskade aktiva källor, automationer eller kontrollpaneler. Borttagen med HA:s hjälpar-API. |
| Blomlampa (ateljén) / ESPHome09 | Heter nu **Blomlampa 3**, område **Köket**, inklusive fem länkade nätverksposter. 29 ID:n och beroenden uppdaterade. Lampans sparade Alexa-ID behålls av kompatibilitetsskäl. |
| `scan_wifi` | Ingen automation eller kontrollpanel anropade omskanningsskriptet. Skriptet är borttaget, liksom åtgärden i en arkiverad ESPHome-källa, två cachedefinitioner för avstängda noder och fyra inaktuella exponeringsposter. Ingen firmware har laddats upp. |

Historiska spår, registertombstones, säkerhetskopior och tidigare etappjournaler sparas som dokumentation; de är inga aktiva anrop.

## Separata driftavvikelser som blev synliga vid omstart

- **Slack / `notify.flocken`:** Slack svarar `token_revoked`. Token, integrationsdata, alternativ och tjänstenamn stämmer exakt med kopian före namnändringarna. HA kan därför inte registrera notistjänsten och Spook varnar för anropet i Granny-skriptet. **Uppskjutet enligt användarens besked:** ny giltig token ordnas i efterhand. Därefter återstår att ladda om integrationen och verifiera tjänsten och varningen utan testmeddelande. Ingen notis har skickats av felsökningen.
- **OpenAI/ChatGPT:** det tidigare autentiseringsfelet är avhjälpt; integrationen är nu ansluten. API-nyckeln ändrades separat under arbetet. Namnverktyget har inte ändrat den.
- **Cast-väckarklockorna för Diego och Manni:** återanslöt inte i slutkontrollen efter omstart, även med återställda namn. Diegos beräknade effekt/energi påverkas också av källans tillgänglighet. Kontrollera enheternas anslutning och Cast-upptäckt separat. Se slutkontrollens aktuella lista om någon har återkommit.

## Framtida underhåll

Plants lokala register-ID-rättning behöver kontrolleras vid framtida integrationsuppdatering. Test: `python3 tools/test_ha_naming_plant.py`. Detta är underhåll, ingen kvarstående namnfråga.

## Senaste totalanalysen

Den tidigare felaktiga proxyplaceringen är korrigerad till Utomhus enligt användarens besked. Dubbel Ateljén-namngivning, generiska övervaknings-/backupnamn och Powercalcs felaktiga batterikälla är åtgärdade. Tre helt vilande Powercalc-poster är arkiverade. Slack har en anslutningskontroll i Granny medan tokenfrågan är uppskjuten. PrusaLink saknade anslutning vid den nya avstämningen.

Powercalc har nu också en lokal rättning som behöver granskas vid integrationsuppdatering, tillsammans med Plants befintliga rättning. Läsverktyget bevakar dessa kodfiler. [Fullständig totalanalys](TOTALANALYS.md).
