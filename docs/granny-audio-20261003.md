# Granny: fortsatt tyst tal efter första åtgärden

Användaren bekräftade att tvättutropet 2026-10-03 kl. 10:43 svensk tid inte
hördes, även om högtalaren gick in i uppspelningsläge. Den tidigare verifieringen
med `playing`, volymändring och tjänstesvar var därför otillräcklig för att
bekräfta hörbart tal.

## Underlag

- Tvättautomationen och det nya fasta meddelandet kördes korrekt.
- MA loggade ett utrop och startade Sendspin Cast-appen i köket.
- Den faktiska TTS-filen från utropet hämtades: 37 160 byte MP3, 3,60 sekunder,
  22 050 Hz mono. FFmpegs volumedetect gav medelnivå −12,0 dB och topp 0,0 dB.
  Filen innehåller ljud; tystnaden beror inte på en tom eller tyst TTS-fil.
- Kökets MA-spelare hade `volume_muted: false`, volym 50 %, ingen aktiv grupp,
  men använde `spb_00f48d97d9b5` (Sendspin över Cast).

## Pågående korrigering

Kökets föredragna MA-utgång har bytts från Sendspin-bryggan till vanlig Chromecast:
`0416fda2-3f4b-f8d8-8a46-572bce5e58bc`.

Samma tvättmeddelande skickades igen genom `script.granny_broadcast` till samma
MA-entitet. MA loggade utropet och att Sendspin-appen därefter inte längre var
aktiv. Själva TV-kanalen, texter, återförsök och reservröst är bevarade.

Användaren bad om ett nytt prov och bekräftade därefter att tvättmeddelandet
hördes. Vanlig Chromecast till kökets MA-spelare är därmed verifierad även
genom lyssning. Både tvätt- och diskautomationerna använder denna spelare.
Protokollvalet har lästs tillbaka från MA och är sparat.

Den kvarvarande synkgruppens Sendspin-väg är inte lyssningsverifierad av denna
bekräftelse. Bekräftelsen gäller kökets enskilda utrop, inklusive tvätt och disk.

Säkerhetskopia av köksinställningarna och den aktuella TTS-filen finns i
`backups/granny-audio-20261003/`.
