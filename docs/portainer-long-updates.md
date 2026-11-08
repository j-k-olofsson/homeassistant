# Uppdatering av stora images från HA

Installerat 2026-09-30 för HA 2026.9.4, pyportainer 1.0.45 och Portainer EE 2.45.1.

## Användning

Använd samma uppdateringsentiteter och knappar i Portainer-integrationen som
tidigare. `update.install`, knappen Återskapa och `portainer.recreate_container`
med `pull_image: true` hämtar imagen separat innan Portainers vanliga
återskapande körs. Det gäller alla integrationens miljöer, inklusive Frigg och
Fulla. Ingen automatisk uppdatering schemaläggs.

Inställningar i `packages/portainer_long_updates.yaml` (sekunder):

```yaml
portainer_long_updates:
  pull_timeout: 1800
  restart_timeout: 120
```

Ändringar kräver HA-omstart. En längre timeout som uttryckligen anges i
`portainer.recreate_container` används även för hämtningen. Återskapandet
har dessutom den vanliga integrationens egen timeout.

## Orsak och lösning

Portainers återskapande över agent använder en Docker-klient med 60 sekunders
HTTP-timeout. En stor hämtning gav HTTP 500 med
`Client.Timeout or context cancellation while reading body`. HA:s timeout på
10 eller 30 minuter ändrar inte denna gräns.

Det lokala tillägget `custom_components/portainer_long_updates` anpassar två
metoder i den laddade pyportainer-klienten. Hämtningen går via Portainers
strömmande Docker-proxy med en explicit timeout för hela svaret. Alla
JSON-rader kontrolleras för fel. En misslyckad, avbruten eller ofullständig
hämtning leder inte till återskapande. Efter lyckad hämtning används
Portainers befintliga återskapande med `PullImage: false`; Portainer hanterar
containerkonfiguration, nätverk och volymer som tidigare.

Vanliga omstarter får 120 sekunders klienttimeout i stället för HA:s 10.
Det ändrar inte Dockers stoppfrist eller Portainers interna tidsgräns för
andra operationer. Tillägget hanterar den verifierade begränsningen vid
image-hämtning, inte varje tänkbart containerfel.

API-nyckeln och HTTP-sessionen återanvänds från integrationen. Register väljs
efter värdnamn och ett register-ID skickas till Portainer, som själv hanterar
inloggningsuppgifterna. Installationen hade inga privata register; den grenen
har automatiserade tester men har inte verifierats mot ett privat register.

## Underhåll och återställning

Detta är en **lokal kompatibilitetslösning**, inte en officiell Portainer-fix.
Ingen fil i HA Core, pyportainer eller Portainers image ändras. Filerna i
`/config` finns kvar vid vanliga HA-uppdateringar och omstarter. Tillägget
gäller även nya klienter efter omladdning av Portainer-integrationen.

Interna klientfält används, så en framtida pyportainer-ändring kan kräva
anpassning. Metodsignaturerna kontrolleras vid start. Kontrollera loggen för
`custom_components.portainer_long_updates` efter större HA-uppdateringar.
En officiell rättning av Portainers timeout är att föredra när den finns.

Återställning: flytta `packages/portainer_long_updates.yaml` utanför
`packages` och starta om HA. Den inbyggda integrationens ursprungliga beteende
återställs. Katalogen `custom_components/portainer_long_updates` kan därefter
tas bort. Inga enhets-ID:n eller inloggningsuppgifter har ändrats.

## Tester

`tools/test_portainer_long_updates.py` testar HTTP-strömmar mot en lokal
testserver: lyckad hämtning, två endpoints, utebliven slutstatus, Docker-fel,
HTTP-fel, autentiseringsfel, timeout under svarets innehåll, avbrott,
sessions-timeout, register-ID och omstartens timeout.

Sätt `PORTAINER_SLOW_TEST=1` för regressionstestet som håller strömmen öppen
i 65 sekunder före slutförande. Alla 14 tester passerade, inklusive detta.
HA:s konfigurationskontroll passerade också.

Verifierat i drift efter HA-omstart 2026-09-30:

- Tillägget laddades med 1800 sekunders pull-timeout och 120 sekunders
  restart-timeout.
- Tillfälliga containrar på både Frigg (endpoint 14) och Fulla (15) visade
  en verklig tillgänglig uppdatering: gammal digest `sha256:d9e853e87e55`
  till ny `sha256:294b683cb724`.
- Vanliga `update.install` lyckades via HA på båda (12,2 respektive 12,8
  sekunder). Container-ID ändrades, ny digest verifierades och båda körde.
- Vanliga omstartsknappar lyckades på båda (cirka 10,3 sekunder).
  Container-ID bevarades och starttid ändrades.
- Testcontainrar, tillfälliga image-taggar och HA-testenheter togs bort.

Det långsamma 65-sekunderstestet använde en lokal HTTP-testserver. Driftproven
använde små riktiga images; ingen stor produktionsimage raderades för testet.

Källor för Portainer-begränsningen:

- https://github.com/portainer/portainer/blob/develop/api/docker/client/client.go
- https://github.com/portainer/portainer/blob/develop/api/docker/container.go

## Flera digests på samma image (2026-10-29)

`versions.py` rättar den inbyggda uppdateringsentitetens `installed_version`.
Om registrets fullständiga digest finns bland den körda imagens samtliga
`RepoDigests` används samma visningsversion som `latest_version`. Annars
används integrationens ursprungliga versionslogik. Det döljer inte en ny
image som bara hämtats: jämförelsen gäller containerns körda image.

Rättningen laddas vid HA-start och finns kvar efter uppdateringar. Om den
förväntade entitetsklassen eller egenskapen ändras loggas ett tydligt fel;
rättningen av långsamma hämtningar fortsätter fungera oberoende av detta.
Verifierad mot HA 2026.10.4. Vid officiell lösning kan versionsrättningen tas
bort separat. Ändringar i tillägget kräver HA-omstart.
