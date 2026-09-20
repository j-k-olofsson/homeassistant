# Snabb Godnatt

Godnatt använder `music_assistant.play_announcement` till
`media_player.diegos_vackarklocka_ma`, den fristående MA-spelaren för Diegos
väckarklocka. UUID kontrolleras före anropet. Grupperad spelare avvisas så att
MA inte kan skicka meddelandet vidare till andra högtalare.

`use_pre_announce: true` använder samma meddelandeväg som jämförelseprov B.
`pre_announce_url` väljer en egen 1,2 sekunders mjuk, fallande godnattsignal
i `www/granny_goodnight/bedtime_chime.wav`, syntetiserad lokalt. MA sammanfogar signal och tal i samma ljudström och sköter
spelarstatus samt volym/återställning. Volymen under meddelandet är 40, som i
lyssningsprovet. Inga separata turn_on-anrop, fördröjningar eller tillagda
tysta sekunder används. Talet lagras som FLAC 48 kHz.

Godnatt kontrollerar verandans dörrsensor, hönsluckan och ytterdörrens lås
precis före uppläsning. Endast off/closed/locked godkänns. Då läses exakt
”Godnatt och sov sött!” upp. Annars räknas samtliga åtgärder upp utan
hälsning; okända lägen kräver kontroll. Automationen avslutar efter
släckning och musikstopp och avbryter när kontrollerna inte godkänts.

Ingen AI eller slump används. Piper (Cloud som reserv) förbereder tal som
FLAC 48 kHz. Exakta meddelanden återanvänds från fixed_*.json; tidigare
AI-kö ignoreras. Start och klockan 18 förbereder den fasta godnattfrasen.

MA-anropets timeout är 60 sekunder och inkluderar uppspelning/återställning.
Svaret `service_seconds` är INTE tid till hörbar start. Upplevd klippning
kan bara verifieras genom lyssning. Fel ger HA-notis med det uteblivna
meddelandet med det uteblivna meddelandet.

Släckning, IR-sändning och stopp av hissmusik körs i Godnatt-automationens
övriga parallella grenar. Ändringen berör endast Godnatts ljudväg.

Tester: `tools/test_granny_goodnight.py` med vanlig Python, samt
`tools/test_granny_goodnight_playback.py` och `tools/test_granny_goodnight_queue.py`
i HA:s Python-miljö. `ha core check` kontrollerar konfigurationen.
