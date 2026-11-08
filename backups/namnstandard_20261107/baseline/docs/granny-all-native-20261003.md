# Alla Granny Broadcast-utrop via vanlig Chromecast

Användaren begärde att alla utrop via Granny ska använda den fungerande vägen,
inte bara tvätt/disk eller utrop som uttryckligen riktas till köket.

## Aktiv lösning

`granny_broadcast` använder det köade skriptet `granny_announce` för alla
befintliga talanrop. De befintliga automationerna använder antingen kökets
MA-spelare eller Granny-gruppen; anrop utan mål använder också Granny-gruppen.

Gruppmålet expanderas nu till:

- `media_player.kokets_skarm_ma`
- `media_player.ateljen` (den nuvarande ateljéspelaren)
- `media_player.kontorets_hogtalare_ma`

Tillgängliga gruppmedlemmar får tal via vanlig `tts.speak` till varje MA-spelare.
Alla tre spelarnas sparade `preferred_output_protocol` är deras vanliga
Chromecast-protokoll, inte Sendspin-bryggorna. Meddelandevolymen är 40 %,
minimum 25 %, maximum 65 %. Försignal är avstängd, som för det tidigare
Granny-grupputropet. Music Assistant hanterar tillfällig volym och återställning.

`granny_announce_player` sköter två försök och reservröst separat per högtalare.
Felnotiser har egna ID:n per spelare, så ett lyckat utrop i ett rum inte tar bort
ett annat rums felnotis. Fel hos en spelare stoppar inte följande spelare.
Offlinegruppmedlemmar hoppas över med en varning i loggen; om hela gruppen är
borta skapas en synlig felnotis. Enskilda offline-mål får fortsatt vänta och
försöka igen. Äldre köks- och ateljé-ID:n mappas till nuvarande MA-entiteter.

Inga Granny Broadcast-skript anropar längre `granny_sync.speak`. Den äldre
integrationen och musikgruppen finns kvar men används inte för Granny-utrop.
Grupputrop skickas sekventiellt och är därför inte synkroniserade mellan rummen.

De fasta tvätt-/disktexterna, tysta timmar, textkanaler och AI-fallback är kvar.

## Verifiering

- `ha core check`: godkänd. Skripten omladdade.
- Tre regressionstester godkända: inga Granny-talvägar till synkservicen,
  egna återförsök/felnotiser per spelare och korrekt broadcast-svar.
- Gruppmålets filtrering kördes i HA:s riktiga mallmotor: köket och ateljén
  valdes; det fortfarande otillgängliga kontoret hoppades över.
- Fullständigt liveprov via `granny_broadcast` till gruppmålet skickade två
  individuella utrop. MA loggade kökets och ateljéns uppspelning och att
  ateljéns Sendspin-app inte längre var aktiv. Båda spelarna rapporterade
  uppspelning med volym 40 %; deras ursprungsvolymer 50 respektive 24 % återkom.
- De tre sparade protokollvalen lästes tillbaka: inga `spb_`-utgångar.
- Användarens tidigare lyssningsbekräftelse gäller vanlig Chromecast i köket.
  Det senaste gruppprovet är ännu inte separat lyssningsbekräftat i ateljén.

Underlag och återställningskopior: `backups/granny-all-native-20261003/`.
