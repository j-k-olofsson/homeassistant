> Historisk förstudie före migrationen. [Aktuell arbetsstatus och genomförda ändringar](namnstandard/README.md).

# Namnstandard i Home Assistant 2026.11 – analys av installationen

Granskad 7 november 2026. Installerad version enligt `.HA_VERSION`: 2026.11.0. Ingen driftkonfiguration, namn, områdestilldelning, firmware eller entitets-ID har ändrats. Endast denna rapport och tillhörande granskningslistor har skapats.

## Bedömning

En riktad städning rekommenderas. Börja med 50 manuellt namngivna entiteter som använder den nya namnmodellen och innehåller enhets- eller områdeskontext. Granska också 93 enhetsposter vars namn upprepar det tilldelade området. Dessa grupper överlappar: antalen ska inte summeras till ett antal oberoende ändringar.

Det finns inte underlag för att skriva om hela konfigurationen. Befintliga entitets-ID:n bör behållas. De största förbättringarna ligger i namn och områdesmetadata samt två automationers sätt att formulera meddelanden.

## Principen

Varje del får sitt eget namn: område `Sovrummet`, enhet `Klimatsensor`, entitet `Luftfuktighet`. Gränssnittet kombinerar delarna efter sammanhanget. På ett kort kan man välja vilka namndelar som visas. Ett kortnamn som redan skrivits manuellt behålls. En huvudfunktion kan använda enhetens namn via inställningen **Main entity of the device**.

Migreringen tar bort ett inledande enhetsnamn ur äldre manuella entitetsnamn när det matchar. Den löser inte alla andra kombinationer. `friendly_name` behålls tills vidare som kompatibilitet, men är på väg att fasas ut. [Officiell beskrivning av namnändringen](https://www.home-assistant.io/blog/2026/11/03/naming-things-in-home-assistant/).

Namngivning ändrar inte befintligt entitets-ID. Formatet för nygenererade ID:n är en separat inställning. Undvik därför att använda **Recreate entity IDs** som del av denna städning. [Dokumentation om namngivning och ID-format](https://www.home-assistant.io/docs/configuration/customizing-entities/).

## Underlag och avgränsning

- Aktuella entitets-, enhets- och områdesregister i `.storage`.
- 10 129 registrerade entiteter; 3 374 aktiverade. 6 755 avstängda poster ingår i granskningslistorna men inte i de prioriterade antalen.
- 1 066 enhetsposter; 677 har minst en aktiverad entitet. 428 av dessa har ett område direkt på enhetsposten, 249 saknar det. Detta betyder inte att alla 249 ska få rum: många är tekniska eller virtuella objekt, och entiteter kan ha egen områdestilldelning.
- En avläsning av körande HA via `/api/states`: 3 485 tillstånd. Detta antal skiljer sig från registret eftersom även entiteter utan registerpost kan finnas och alla aktiverade registerposter inte nödvändigtvis har ett laddat tillstånd.
- Sju lagrade kontrollpaneler med totalt 25 vyer.
- 17 YAML-filer: huvudkonfiguration, automationer, skript, scener och 13 paket. Därtill riktade kontroller av ESPHome-källor.
- Namndelarna för fyra konkreta exempel verifierades i körande HA med `entity_name()`, `device_name()` och `area_name()` via mall-API:t.

Ingen visuell provning av kort i webbläsare har gjorts. Angivna risker gäller namndelarnas innehåll, inte ett påstående om att alla kort redan visar en viss sammansatt text. Dynamiska kort och entitetsval kan ge fler träffar än de statiska referenserna.

Sökningen jämför även svenska namnvarianter, exempelvis Sovrum/Sovrummet, Kök/Köket och Hemmabio/Bion. Träffar är granskningskandidater. De är inte automatiska ändringsbeslut eller ett uttömmande mått på alla semantiska upprepningar.

## Omfattning och prioritering

| Grupp | Antal | Bedömning |
|---|---:|---|
| Aktiverade entiteter med egna namn som innehåller områdes-/enhetskontext och använder nya namnmodellen | 50 | Prioritet 1. Cirka 1,5 % av aktiverade registerentiteter. |
| Av dessa: eget område i entitetsnamnet | 41 | Förkorta till funktion, exempelvis Temperatur eller Luftfuktighet. |
| Av dessa: enhetsnamn/basnamn i entitetsnamnet | 14 | Förkorta funktionen eller överväg huvudentitet. Fem ingår även i föregående rad. |
| Enhetsposter med aktiverade entiteter och eget område i namnet | 93 | Cirka 13,7 % av de 677 enhetsposterna. 64 olika kombinationer av område och befintligt namn. |
| Aktiverade entiteter på dessa 93 enhetsposter | 679 | Ett enhetsnamnbyte kan förbättra många namn utan separata entitetsändringar. |
| Enhetsposter med ett annat namngivet område än sitt tilldelade | 19 | Kontrollera faktisk placering och funktion först. Flerområdesstyrning kan vara avsiktlig. |
| Enhetsposter med områdesord i namnet men utan tilldelat område | 10 | Separat metadatafråga; omfattar även tekniska/virtuella objekt. |
| Statisk bred textsökning i aktiverade entitetsnamn | 384 | Innehåller de 50 prioriterade samt många legitima äldre integrationsnamn. Ska inte massändras. |

50-gruppen fördelas på Xiaomi BLE 26, ESPHome 20, Shelly 2, BTHome 1 och Battery Notes 1. Samtliga är aktiverade och inte dolda. 13 återfinns i statiskt identifierade kontrollpanelsreferenser; andra används bland annat indirekt genom områdets temperatursensor eller dynamiska val.

Enhetsposter motsvarar inte alltid separata fysiska produkter. Flera integrationer kan representera samma utrustning, och registret innehåller composite-/split-relationer. De 93 posterna får därför inte beskrivas som 93 fysiska produkter. Likadana namn är inte heller skäl att radera poster.

## Konkreta exempel

| Nuvarande område / enhet / entitet | Förslag efter kontroll |
|---|---|
| Sovrummet / Temp/Hum (Sovrum) / Sovrummet Fukt | Sovrummet / Klimatsensor / Luftfuktighet |
| Kontoret / Termostat (kontoret) / Kontoret Temp | Kontoret / Termostat / Temperatur |
| Sovrummet / Taklampor (sovrum) / Taklampor | Sovrummet / Taklampor / huvudentitet |
| Ateljén / Vattensensor (torkskåp) / Vattensensor Temp (Torkskåpet) | Ateljén / Vattensensor torkskåp / Temperatur |
| Bion / Temp/Hum (Hemmabio) / Bio Temp | Bion / Klimatsensor / Temperatur |

Exempelvis innehåller den första kombinationen rummet tre gånger om ett kort visar alla delarna. Den andra upprepar Kontoret både i enhet och entitet. Funktionen `entity_name()` i körande HA returnerade precis `Sovrummet Fukt` respektive `Kontoret Temp`: kontexten finns alltså fortfarande lagrad i själva entitetsnamnen.

Detaljer som `torkskåp`, `norra`, `södra`, `Diego` och `Manni` kan behövas för att skilja saker i samma område. De ska bedömas utifrån funktion och placering. En temperatur för en frysbox ska exempelvis inte få samma otydliga namn som rumstemperaturen på samma flerfunktionsenhet.

### Kontrollera dessa områdeskonflikter före namnbyten

- `Blomlampa 2 (verandan)` är tilldelad Köket, i flera enhetsposter.
- `Växtlampa frösådd (bion) [SHPLS]` är tilldelad Köket.
- `Taklampor (köket)` är tilldelad Entrén.
- Flera LED-strip-enhetsposter med rum i namnet är tilldelade Heimdal (HA).
- `Golvvärme (sovrum och kontor)` beskriver flera rum; en förenkling till enbart ett rum kan ta bort viktig betydelse.
- `Poolpump (utomhus)` i Poolen behöver inte vara ett fel: utomhus kan beskriva en bredare plats än området.

Kontrollera även entiteternas egna områden. Rapportens entitetsanalys använder explicit entitetsområde i första hand och annars enhetens område. Att flytta en enhet till ett annat område kan påverka områdesbaserad styrning och ska behandlas separat från ett rent namnbyte.

## Kontrollpaneler och mallar

I den statiska kontrollpanelsanalysen hittades 282 objekt med ett direkt `entity`-fält som motsvarar en registrerad entitet. 195 har ett eget textnamn, 27 ett strukturerat namnval och 60 saknar explicit namn. Detta är objekt, inte ett exakt antal kort: rader, underkort och andra konfigurationsdelar kan ingå.

Många kort är alltså redan anpassade. Behåll avsiktliga korttexter. Kontrollera särskilt Hem → Värme, Kameror och Verkstaden, Bio-panelen samt Friggan. Dynamiska `auto-entities` och det genererade `mini-media-player`-kortet måste bedömas utöver de fasta referenserna. Egna kort kan fortfarande använda kompatibilitetsnamn.

Två automationer läser namn från tillståndsobjekt:

- `automations.yaml:89`: växtmeddelandet använder `plant.name`.
- `automations.yaml:157` och `161`: batterimeddelandet använder `state.name`.

Därtill använder den dynamiska musikmallen i `.storage/lovelace.lovelace` `p.name` i kortnamnet. Dessa använder tillståndsobjektets namn och kan därför ge andra formuleringar än den nya gränssnittsvisningen. De är inte belagda driftfel. Vid en migration bör meddelandena byggas av valda delar med `entity_name()`, `device_name()` och `area_name()`, med skydd för saknad enhet/område och upprepningar.

`hissmusik_playlist.name` i skript är däremot ett namn i ett eget playlistobjekt; det ska inte ersättas som om det vore ett HA-entitetsnamn.

De breda 384 entitetsträffarna innehåller 184 poster med äldre namnmodell och 150 integrationsstyrda namn med den nya modellen. De senare domineras av OpenWrt, bland annat värdnamn som även används som entitetsnamn. Dessa är en separat teknisk granskning med lägre prioritet. Äldre namnmodell lagrar hela namnet avsiktligt; att korta det utan att förstå integrationens modell kan förlora kontext. [Utvecklardokumentationen om namnmodeller](https://contributors.home-assistant.io/core/entities/naming/).

## Föreslagen arbetsordning

1. Kontrollera konflikterna mellan rumsord och områdestilldelning. Avgör separat vilka metadataändringar som behövs.
2. Välj korta enhetsnamn för de 93 områdesupprepande posterna. Samordna poster som representerar samma utrustning. Bevara meningsfulla skillnader inom samma rum.
3. Gå igenom de 50 prioriterade entiteterna med CSV-förslagen. Förslagen är ett beslutsunderlag; huvudfunktion och flerfunktionssensorer måste bedömas per enhet.
4. Behåll entitets-ID:n och kontrollera valda kort samt växt- och batterimeddelandenas namnformatering efter varje mindre grupp.
5. Ta ESPHome-källorna som ett separat steg. Exempelvis har `esphome20.yaml` `node_friendly_name: Termostat (kontoret)`, medan gemensamma komponenter kan ge entiteter namn med `${node_name}`. Att ändra firmwarekällor kan påverka integrationsidentiteter beroende på hur namn används. Namn kan först justeras i HA utan firmwareutrullning; en senare källstädning behöver verifiera att samma entiteter återanvänds.

Registret i `.storage` har endast lästs. Eventuella framtida ändringar bör göras genom HA:s vanliga gränssnitt/API så att körande HA hanterar dem.

## Bilagor

- [Prioritet 1: 50 entiteter med konkreta förslag](ha-namnstandard-prioritet1-20261107.csv).
- [Enhetsträffar, inklusive avstängda poster och områdesavvikelser](ha-namnstandard-enheter-20261107.csv).
- [Breda entitetsträffar med bedömningskategori](ha-namnstandard-entiteter-20261107.csv).
- [Kontrollpanelsobjekt och explicita namn](ha-namnstandard-kort-20261107.csv).

CSV-filerna är ögonblicksbilder. Filtrera på aktiverad/antal aktiverade när aktuell drift prioriteras. Varken tidsuppskattning för genomförande eller fullständig visuell kontroll har gjorts.
