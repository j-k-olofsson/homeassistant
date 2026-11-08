# Granny: den nya Chromecast-gruppen är inkopplad

Google Home-gruppen `Granny utrop` har upptäckts som en vanlig Chromecast-grupp:

- MA/Cast-ID: `56862e31-51ae-420f-a85e-02ce6410ded3`
- MA-entitet i HA: `media_player.granny_utrop`
- Medlemmar: Kökets skärm och Ateljéns högtalare.

Det tidigare gruppmålet `media_player.grannys_hogtalare`, dess HA-gruppalias och
anrop utan angivet talmål mappas nu automatiskt till denna grupp. Det befintliga
urvalet i `granny_announce` hittar exakt en kandidat; den gamla MA-synkgruppen
utesluts. Inga ändringar av enskilda automationers gamla grupp-ID behövs.

Grupputrop skickas som en enda `tts.speak` till `media_player.granny_utrop`.
Det är vanlig Chromecast-gruppuppspelning, inte Sendspin eller utrop i följd.
Enskilda uttryckliga mål, exempelvis tvätt/disk till köket, använder fortsatt
sin fungerande vanliga Chromecast-väg. Reservröst och återförsök skickar talet
till samma destination och skapar inte separata rumsutrop.

Försignal är avstängd på den nya gruppen. Medlemsvolymerna för tal är 40 %.
Kontoret är inte medlem i den av användaren skapade Google Home-gruppen.

## Verifiering

- Gruppens provider är `chromecast`; dess enda utgång är native Chromecast.
- Urvalet kördes i riktiga HA-mallmotorn och gav enbart
  `media_player.granny_utrop`.
- Fyra routing/svarstester godkända.
- Fullständigt broadcastprov utan angivet talmål skickade exakt ett MA-utrop
  till `Granny utrop`. Ingen anropades via `granny_sync.speak` och inga individuella
  rumsutrop loggades för provet.
- Den fysiska gruppen, köket och ateljén rapporterade `playing`. Båda medlemmarna
  hade volym 40 % under talet och återfick sedan sina ursprungsvolymer.
- Användaren har fått en fråga om talet hördes samtidigt och tydligt i båda rum.
  Ingen lyssningsbekräftelse för detta prov finns ännu. Serverdata ensam
  bevisar inte hörbarhet eller exakt akustisk synk på plats.

Mätningar och säkerhetskopia: `backups/granny-native-sync-20261004/`.
Den tidigare blockeringen i `docs/granny-native-sync-20261003.md` gäller inte
längre eftersom den efterfrågade vanliga Cast-gruppen nu finns.
