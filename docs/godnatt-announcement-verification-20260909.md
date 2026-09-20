# Godnatt: verifiering av meddelandevägen 2026-09-09

## Resultat

Godnatt går för närvarande direkt till HA Cast-entiteten, inte via MA.
`turn_on` startar mottagarappen (på Nest Hub kan det inkludera en bild).
`playing` för rätt URL bekräftar uppspelning, inte att första stavelsen hörs.
Tre sekunders nollprover löste inte användarens upplevda klippning.

MA har en tillgänglig, fristående spelare för samma fysiska enhet:
`media_player.diegos_vackarklocka_ma`, UUID
`a56bb45d-aa7e-3a34-132d-5baa281f1f23`. Ingen aktiv grupp eller synkning
fanns vid kontrollen. Native Chromecast är tillgängligt; Sendspin är avstängt.
Godnatt ska inte skickas till en grupp eller något annat rum.

Installerad MA-kod (`controllers/players/announcements.py`) förbereder
spelare och volym, inväntar ljuddata, skickar meddelandet och övervakar
start/slut innan tidigare tillstånd återställs. Renderern avkodar eventuell
startsignal och tal till samma PCM-klipp. Standardsignalen är 2,128 sekunder.
Detta är inte en garanti mot fysisk klippning eller Googles ljuddämpning.
HA Cast:s `async_play_media` använder Default Media Receiver; `announce`
är inte implementerat där som MA:s meddelandehantering.

## Jämförelseprov

Skapade `www/granny_goodnight/test_no_padding.flac` från en färdig öppen-
dörr-variant, med exakt tre sekunders tillagd tystnad borttagen. Talets egen
naturliga inledning behölls. FLAC 48 kHz.

Anropade HA:s `music_assistant.play_announcement`, endast på klockans
MA-entitet, volym 40 (samma som befintlig nivå):

- A: `use_pre_announce: false`, serviceanrop klart efter 9,72 s.
- B: `use_pre_announce: true`, serviceanrop klart efter 9,64 s.

Dessa tider inkluderar uppspelning och återställning och är INTE tid till
hörbar start. Samma tal användes i båda. Ingen Godnatt-automation utlöstes.
B gjordes efter A: mottagarens eventuella uppvärmning är en möjlig störfaktor.
Om endast B fungerar bör B även verifieras från normalt viloläge.
Lyssningsutfallet inväntas. Ingen permanent ändring av Godnatts ljudväg
har gjorts under denna verifiering.

## Rekommenderad riktning

För färdiga ljudfiler: HA `music_assistant.play_announcement` till den
fristående MA-spelaren, utan egna turn_on-steg eller tystnadspålägg.
För text: HA TTS till MA-spelarentiteten. Behåll den förberedda kön för
att undvika AI/TTS-väntan i Godnatt. Använd startsignal endast om lyssnings-
provet visar att den behövs; den ska ligga i samma ström som talet.

Om även B klipper: jämför den lokala ljudfilen och isolera TTS från Cast.
Om direktprov fungerar men Google-röstkommando klipper: kontrollera
Googles "Lower volume when listening". Det är en separat möjlig orsak,
inte en konstaterad diagnos.

## Primärkällor

- https://www.music-assistant.io/integration/announcements/
- https://www.music-assistant.io/faq/massannounce/
- https://www.music-assistant.io/player-support/google-cast/
- https://developers.google.com/cast/docs/media/messages
- https://support.google.com/googlehome/answer/7383040

## Beslut efter lyssning

Användaren föredrog tydligt B med pingla vid upprepat jämförelseprov.
Godnatt är ändrat till MA:s play_announcement med use_pre_announce=true,
volym 40, utan extra tystnad eller separat turn_on. Den befintliga kön
konverterades till FLAC 48 kHz utan de tre tillagda sekunderna. Tidigare
avsnitt ovan beskriver verifieringen före beslutet.

Användaren önskade därefter ett kort ljud med godnattkaraktär. En lokalt
syntetiserad, mjuk fallande tvåtonssignal på 1,2 sekunder ersätter nu
standardpinglan via anropets pre_announce_url. Signalen påverkar enbart
Godnatt; MA:s globala inställningar ändrades inte. Ett direkt MA-prov med
den egna signalen och opaddat tal slutfördes utan tjänstfel.
