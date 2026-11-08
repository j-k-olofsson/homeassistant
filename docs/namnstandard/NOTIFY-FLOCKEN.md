# Varningen om notify.flocken – analys 8 november 2026

Spook rapporterar en okänd åtgärd i **Granny – skicka meddelande** (`script.granny_skicka_meddelande`): `notify.flocken`.

## Verifierad orsak

Slack-integrationen `flocken` står i `setup_retry`. Dess uppstart gör en `auth.test` mot Slack innan notistjänsten registreras. En separat läsande autentiseringskontroll med den sparade tokenen gav **`token_revoked`**. Därför finns ingen `notify.flocken` i HA:s tjänsteregister.

Integrationsdata, API-token, alternativ, integrationstitel och tjänstens konfigurerade namn är identiska med den privata kopian före namnändringarna. Skriptets Slack-anrop använder fortfarande samma tjänstenamn. Varningen blev synlig efter omstart under arbetet, när Slack-autentiseringen gjordes om. Någon ändring av namnet eller tokenen har inte orsakat ett felaktigt tjänste-ID. Det går inte att fastställa från HA vem som återkallade tokenen eller exakt när detta skedde.

## Åtgärd och verifiering

En giltig ersättningstoken för samma Slack-arbetsyta behöver anges i HA. Behåll integrationsposten och namnet `flocken` så att befintliga anrop fortsätter fungera. Därefter laddas integrationen om och följande kontrolleras:

1. Slack-integrationen är `loaded`.
2. `notify.flocken` finns åter i tjänsteregistret.
3. Spooks motsvarande varning försvinner efter omkontroll.

Ingen testnotis eller annan Slack-konversation har skickats. Varningen har inte dolts genom att ta bort Slack-kanalen eller ignorera Spook-ärendet. **Användaren har beslutat att ordna ny token i efterhand.** Felet är diagnostiserat; återställning av autentiseringen och kontroll av tjänsten/varningen är därför uppskjutna enligt detta besked.

Rådiagnostik och jämförelser finns i den privata mappen `/homeassistant/backups/namnstandard_20261108_restpunkter/notify_flocken/`. Den innehåller känsligt underlag och ska inte publiceras.

## Skydd för övriga flöden efter totalanalysen

Granny-skriptet kontrollerar nu att den befintliga Slack-integrationsposten är `loaded` innan Slack-grenen körs. Den uppskjutna, frånkopplade anslutningen ska därmed inte avbryta skriptets övriga delar eller dess svar till anropande automationer. Villkoret har verifierats med HA:s egen mallmotor utan meddelandeleverans. Tokenen är fortfarande ogiltig och Spooks varning har inte dolts. Vid omauktorisering ska befintlig integrationspost behållas; om posten ersätts helt behöver även dess fasta konfigurations-ID i villkoret uppdateras.
