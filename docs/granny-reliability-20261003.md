# Granny: återställda talutrop, 2026-10-03

## Orsaker och åtgärder

- Kökets, gamla ateljéspelarens och kontorets MA-inställningar hade absolut
  meddelandevolym 10 %, minimum 1 %, maximum 10 %. Musikvolym 50 % höjde alltså
  inte talet. Meddelandevolymen är nu 40 %, med gränser 25–65 %, för köket,
  kontoret och den nuvarande ateljéspelaren. Detta är permanenta MA-inställningar.
- Granny-gruppen innehöll den gamla ateljéspelaren `up0ba23cfe`, Cast-ID
  `9842167e-772a-ad9d-6664-74077d0f77e6`. Samma fysiska JBL Link 500, MAC
  `80:C5:F2:67:AA:69`, har nu Cast-ID `bb9d9db8-1113-1ba6-19b4-362bd919b660`
  och MA-spelare `up1a2803a2` (HA: `media_player.ateljen`). Gruppmedlemmen är
  ersatt med den nuvarande spelaren. Kontoret och köket behålls i gruppen.
- TTS-reserven pekade på obefintliga `tts.cloud`; rätt entitet är
  `tts.home_assistant_cloud`, inställd på svenska, SofieNeural. Piper är fortsatt
  förstahandsval, med sv_SE-lisa-medium. En oanvänd TTS-entitet får ha tillstånd
  `unknown`; det betyder inte att den saknas.
- `granny_announce` köar hela operationen, gör högst två försök med tre sekunders
  mellanrum och använder molnrösten vid det andra försöket när den finns.
  Högtalaren får upp till 15 sekunder att bli tillgänglig per försök.
- `granny_speak_attempt` kontrollerar tom text och att rösten finns och är
  tillgänglig. Detta behövs eftersom HA annars kan hoppa över en saknad
  TTS-entitet med bara en varning och utan undantag. Ett dictionary-svar med
  `success: true` lämnas endast när talsteget har slutförts.
- Två misslyckade försök ger notisen `granny_speech_failed` och en felrad i
  systemloggen. Broadcast fortsätter till övriga valda kanaler. Notisen tas bort
  efter nästa lyckade talsteg. Detta är tjänsteverifiering, inte ett akustiskt
  kvitto på att någon hörde talet.
- AI-fel tillåts nu gå vidare till fallbacktext. Det nya fältet `message`
  skickar exakt text till alla kanaler och hoppar över AI-anropet.

## Tydliga färdigmeddelanden

Tvätt: ”Tvätten är klar. Du kan ta ut den ur tvättmaskinen nu.”

Disk: ”Diskmaskinen är klar. Disken är ren och kan plockas ur.”

Båda använder `message`, samma fallbacktext och humor 0. De befintliga
program_finished-utlösarna och kanalerna TTS/kök samt TV är bevarade.

## Verifiering och begränsningar

- `ha core check`: godkänd. Skript och automationer är omladdade.
- Två routing/svarstester och nio tester av synkgruppens köåterställning godkända.
- Live broadcast i köket returnerade exakt testtext utan AI-anrop. MA rapporterade
  `playing`; meddelandevolym 40 % observerades och ursprungsvolym 50 % återkom.
- Felprov med en saknad primärröst utlöste reservrösten. Molnröstens TTS-tidstämpel
  ändrades och MA loggade utropet till köket.
- Tom taltext gav synlig felnotis efter två försök. Ett separat fullständigt
  broadcastprov med ett obefintligt högtalarmål levererade fortfarande sin
  HA-textnotis. Testnotiserna städades bort.
- Riktad provider-omladdning nekades av MA-tokenens behörigheter. Music Assistant
  startades om via Supervisor. Dassens pågående musikkö sparades före omstarten,
  samma aktuella köpost kontrollerades och kön återupptogs efteråt. Den rapporterade
  `playing` efter återställningen.
- Fullständigt grupputrop slutfördes till nuvarande ateljéspelare och köket.
  `granny_sync.speak` rapporterade båda som medlemmar och kontoret som otillgängligt.
  Ingen individuell flerrumsreserv eller tyst förberedelse har lagts till.
- Kontorets högtalare är fortfarande offline i MA. Den hoppas över vid grupputrop;
  direkt nätverksprov till den provade adressen 192.168.10.204 gav timeout.
- Ingen mänsklig lyssningsbekräftelse finns ännu. Uppspelningsdata och serverlogg
  verifierar systemets beteende men garanterar inte hörbarheten på plats.

Underlag, säkerhetskopior och mätningar: `backups/granny-reliability-20261003/`.
MA-inställningarna finns säkerhetskopierade före ändring. Övriga redan pågående
konfigurationsändringar har bevarats.

Music Assistants dokumenterade beteende för meddelandevolym och grupper:
https://www.music-assistant.io/integration/announcements/
