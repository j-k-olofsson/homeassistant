# Granny: inbyggda Music Assistant-meddelanden, 2026-09-20

## Ändringen

Granny Broadcast anropar nu det köade HA-skriptet `script.granny_announce`,
som skickar `tts.speak` direkt till Music Assistant-entiteter. HA:s TTS skickar
`announce: true`; Music Assistant 2.10.4 hanterar avbrott, återställning och volym.
Ingen egen paus, återstart, tyst förberedelse eller ombyggnad av synkgruppen ingår.
Music Assistants befintliga inställning för startsignal gäller fortfarande.

Standardmålet och det äldre anropsvärdet `media_player.grannys_hogtalare`
betyder nu utsändning till följande MA-spelare:

- `media_player.ateljens_hogtalare`
- `media_player.kokets_skarm_ma`
- `media_player.kontorets_hogtalare_ma`

Otillgängliga spelare hoppas över. Om spelarna redan hör till en spelande eller
pausad MA-grupp, enligt deras `active_queue`, väljs den gruppen en gång.
Medlemmarnas egna tillstånd kan vara `idle` även när gruppen spelar.
Inaktiva uttryckligen angivna övriga grupper expanderas till sina medlemmar.
Separata spelare garanteras inte tala exakt samtidigt. Ett utrop till en aktiv
grupp kan höras även i dess övriga rum, enligt MA:s gruppbeteende.

Nio automationer använde tidigare kökets Cast-entitet direkt; dessa använder nu
MA-entiteten. Det äldre köks-ID:t mappas också för kompatibilitet i hjälpskriptet.
Den tidigare `granny_sync`-integrationen är borttagen från YAML-konfigurationen.
Dess filer finns kvar men används inte av Granny Broadcast. Redan registrerad
service kan finnas kvar i den pågående HA-processen fram till nästa omstart.
Scripts och automationer har laddats om; ingen HA-omstart behövdes för ändringen.

Ett befintligt fel upptäcktes vid helhetsprovet: Granny returnerade en sträng via
`response_variable`, medan HA kräver en dictionary. Svaret är nu
`{"final_message": "..."}`. Det omkörda helhetsprovet med `return_response`
slutfördes utan fel.

## Verifiering

- `ha core check`: godkänt efter senaste ändringen.
- `docker exec homeassistant python /config/tools/test_granny_announce.py`:
  åtta tester godkända (separata köer, aktiva/pausade grupper, idle-medlemmar,
  otillgängliga spelare, äldre köks-ID och direkt native TTS).
- Mallens målval kördes även i den riktiga HA-mallmotorn.
- Köket, pågående uppspelning av ett 180 sekunders lågmält syntetiskt testljud:
  native TTS slutfördes, samma media-ID återkom i `playing`, spelpositionen
  ökade och volymen återställdes till 0,12.
- Köket, redan pausad uppspelning: meddelandet slutfördes utan att starta
  uppspelningen. MA rapporterade efteråt `idle`, med samma media-ID och position
  kvar; exakt statusordet `paused` bevaras alltså inte av den inbyggda funktionen.
- Fullständig `script.granny_broadcast`, endast kanalen `tts`, standardmål:
  MA-loggen bekräftade annonsering till både köket och ateljén. Kökets pågående
  testljud återupptogs och volymen återställdes. Kontoret var otillgängligt.
- Testköerna var tomma före provningen. Testljud, testköer och tillfälliga
  volymändringar har städats bort. Köket och ateljén var åter `idle`, volym 0,5.

Maskinell verifiering bekräftar rapporterad uppspelning och återställning;
den ersätter inte en mänsklig lyssning av exempelvis första stavelsen.

## Separat begränsning i den gamla synkgruppen

Ett försök att starta vanlig uppspelning på den befintliga Granny-synkgruppen
misslyckades innan något meddelande skickades: gruppen rapporterade `playing`
men positionen låg kvar på noll under provets 45 sekunders väntan.
MA loggade `Player Kökets skärm can not be grouped with Ateljéns högtalare (Cast)`.
Den sparade medlemslistan innehåller även det gamla bridge-ID:t
`spb_80c5f267aa69`, medan nuvarande ateljéspelare heter `up0ba23cfe`.
Detta konstaterar inte ensamt orsaken till gruppens uppspelningsproblem.

Återupptagning för just den synkgruppen är därför inte verifierad på enheterna.
Ingen ändring av MA:s sparade musikgrupp eller protokollinställningar gjordes.
Grannys nya standardväg använder separata MA-spelare när gruppen inte spelar,
och kräver inte att denna äldre synkgrupp startas.

## Underlag och återställning

Säkerhetskopior av de tre ändrade konfigurationsfilerna och mätningar finns i
`backups/granny-native-20260920/`. `live-test.json` och
`broadcast-live-test.json` är godkända; `group-live-test.json` dokumenterar
begränsningen ovan. Gruppmusikprovet skickade inget meddelande.

Referens: https://www.music-assistant.io/integration/announcements/
