# Snabb Godnatt

Godnatt spelar en färdig lokal MP3 endast i `media_player.diegos_vackarklocka`.
AI och Piper körs i bakgrunden vid HA-start, på kvällen och efter användning
(med en minuts fördröjning så att aktuell uppspelning inte störs).

Hälsningen begränsas till 8–12 ord. För lång eller olämplig text ersätts av en
kort fullständig reservhälsning. Varianter för öppen dörr och okänt dörrläge får
två extra ord före hälsningen. Verandadörrens tillstånd läses vid uppspelningen;
inga aktuella husförhållanden får lagras i AI-hälsningen.

Varje MP3 innehåller 2 sekunders inledande tystnad i samma ljudström som talet.
Det skyddar första orden under Cast-högtalarens ljudstart. Separat `turn_on`
och fast väntan före TTS behövs därför inte. Cast/nätverket kan fortfarande
påverka starttiden; faktisk hörbar start och eventuell klippning måste bedömas
på högtalaren. Tystnadens längd styrs av ffmpeg-filtret i `__init__.py`.

Filer och manifest ligger i `/config/www/granny_goodnight`. En misslyckad
förberedelse ersätter inte en tidigare komplett uppsättning. Manifestet byts
atomiskt och äldre ljud behålls minst ett dygn för pågående uppspelningar.
`granny_goodnight.prepare` skapar nya filer utan ljuduppspelning.
`granny_goodnight.speak` spelar aktuell variant och returnerar text, dörrvariant
och tiden tills Cast bekräftar `playing` för just den begärda ljudfilen.
Detta bekräftar spelarens status, inte att ljudet hörs fysiskt. Otillgänglig
högtalare eller utebliven start inom 12 sekunder ger fel i spårningen samt en
beständig HA-notis med dörrläget och det uteblivna meddelandet. Notisen tas
bort vid nästa bekräftade uppspelning. Inga andra högtalare används.

Släckning med återförsök, upprepad IR-sändning och stopp av hissmusik ligger
kvar i Godnatt-automationens oberoende parallella grenar. Andra Granny-utrop
använder fortsatt `script.granny_broadcast`.

Verifiering: `python3 tools/test_granny_goodnight.py`, `ha core check` samt
kontroll av ljudfilernas inledande tystnad. Python-ändringar kräver HA-omstart.
