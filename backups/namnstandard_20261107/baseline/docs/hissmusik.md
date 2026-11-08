# Hissmusik via Music Assistant

Uppdaterad och verifierad 2026-09-07.

## Uppspelning

- Enda uppspelningsmålet: `media_player.dassens_hogtalare_ma` (Google Cast-gruppen Dassens högtalare).
- Fasta listval enligt det tidigare schemat: `library://playlist/58` (Hissmusik, 34 spår) eller `library://playlist/59` (Motown & Soul (60s, 70s & 80s), 93 spår).
- Samtliga 127 listposter kontrollerades mot MA:s API: lokal filkälla, tillgängliga MP3-filer. Provuppspelning från båda gav `stream_type: local_file`.
- Gruppvolym 15 %, mute av, shuffle på, repeat all. Kön ersätts vid varje ny start. Ett återförsök behåller samma listval.
- MA:s Autoplay (tillägg av rekommenderade spår) stängdes av för just gruppens kö. Detta är en MA-inställning; YAML-anropet använder dessutom `radio_mode: false` och `repeat: all`.
- Hissmusik startar 05:30 måndag–fredag, 07:00 lördag–söndag och 20:00 alla dagar. Motown & Soul startar 08:00 alla dagar. Stopp 22:00. Tidszon Europe/Stockholm.
- Knappen `input_button.spela_hissmusik`, Google-kommandot och Kör åtgärder väljer lista efter aktuell HA-lokaltid: Motown & Soul 08:00–19:59, annars Hissmusik. Ett uttryckligt manuellt startkommando fungerar även utanför det automatiska spelschemat; då väljs Hissmusik. `script.hissmusik_starta` tar parametern `spellista: hissmusik` eller `spellista: motown` och använder Hissmusik som standard.
- Hissmusik och SCEN - Godnatt använder inga Spotify-anrop längre.

## Väckning och stopp

`music_assistant.play_media` väcker Cast-gruppen direkt. Test från `off` lyckades; separat startljud eller Spotify-väckning behövs inte.

`script.hissmusik_starta` väntar på tillgänglig grupp och gör högst tre startförsök. Varje försök stoppar tidigare uppspelning först, för att gammal `playing`-status inte ska räknas som framgång. Skriptet avslutas vid första lyckade start. Vid tre misslyckanden skapas en HA-notis och körningsspårningen markeras med fel.

`script.hissmusik_stoppa` avbryter startskriptet och stoppar gruppen. Både kl. 22 och Godnatt använder detta skript. Använd det även för ett manuellt fullständigt stopp medan ett startförsök pågår.

## Talmeddelanden

Verifierad väg: skicka TTS till **MA-gruppen**, så kan MA hantera avbrottet och återuppta befintlig kö. Exempel:

```yaml
action: tts.speak
target:
  entity_id: tts.piper
data:
  media_player_entity_id: media_player.dassens_hogtalare_ma
  message: Maten är klar.
  cache: false
```

För en färdig ljudfil används `music_assistant.play_announcement` med samma grupp som mål. Granny kan redan få `tts_media_player: media_player.dassens_hogtalare_ma` i anropet till `script.granny_broadcast`; då används dess TTS-gren till MA-gruppen.

Gruppens befintliga MA-inställningar behölls: Use Music Assistant Cast App = true, Flow Mode = true, HTTP profile = forced_content_length, output codec = FLAC.

**Googles egna utrop:** Användaren genomförde ett verkligt Google-utrop och bekräftade att det fungerar. Samma lokala MA-kö fortsatte spela; ingen ändring av Cast-app eller stopp observerades under utropet. Ingen särskild återstartsautomation behövs för den verifierade utropsvägen. Grannys standardmål är dessutom en annan, överlappande grupp och dess samspel med Dassens har inte verifierats här. En generell automatisk återstart vid idle/paused har inte lagts till, eftersom den även skulle kunna upphäva ett avsiktligt stopp. För extern återupptagning behövs en observerad meddelandesignal och kontroll att Hissmusik fortfarande ska vara aktiv; återuppta då befintlig kö, välj inte en ny spellista.

Referens: [Music Assistant announcements](https://www.music-assistant.io/integration/announcements/).

## Genomförd verifiering av grundfunktionen

- `ha core check`: godkänd.
- Jämförelse med säkerhetskopian: bara Hissmusik och SCEN - Godnatt ändrade i automationerna; befintliga skript oförändrade, två nya tillagda.
- Skript och automationer omladdade, Hissmusik fortsatt aktiverad.
- Start via den riktiga knappen: lyckades på första försöket.
- Manuell automationskörning från avstängd grupp: lyckades på första försöket.
- Båda listorna valda av det riktiga startskriptets slumpfunktion; båda spelade lokala filer.
- Köstatus kontrollerad: shuffle true, repeat all, gruppvolym 0.15; uppspelningspositionen ökade.
- Piper-meddelande via MA-gruppen: samma köpost återupptogs efter meddelandet.
- Stopp samt stopp under pågående start: gruppen stannade och startskriptet var av.
- Testmusiken stoppad efter både de automatiska kontrollerna och det användarbekräftade Google-utropet. Ingen fysisk hörselverifiering; uppspelning och återupptagning bekräftades via HA/MA.
- Klockslagen och felgrenen för tre misslyckade försök är konfigurationskontrollerade, inte framkallade i drift.

Säkerhetskopia: `backups/hissmusik_ma_20260907T104710Z/` (automationer, skript och tidigare MA-Autoplay-status).

## Resultat för externa utrop och Granny

Användaren preciserade att både Googles egna utrop och HA/Granny ska omfattas. Ett verkligt Google-utrop bekräftades fungera av användaren, och samma lokala kö fortsatte spela. MA/TTS till Dassens verifierades också med automatisk återupptagning av samma köpost.

Vid kontroll efter grundtesterna fanns `media_player.grannys_hogtalare` inte längre bland MA:s grupper och HA visade `unavailable`. Ingen borttagen grupp har återskapats. Grannys explicit valda mål `media_player.dassens_hogtalare_ma` använder MA/TTS-vägen. Grannys vanliga standardutrop kan däremot inte fungera normalt förrän dess saknade standardgrupp åtgärdats; det är inte verifierat som fungerande i denna ändring.

## Återställt schema

Efter användarens önskemål ersattes slumpvalet mellan listorna med fasta listval enligt säkerhetskopian av Spotify-automationen. Blandad låtordning inom respektive lista behålls. Det gamla trigger-ID:t `0900-alldays` hade faktiskt tiden 08:00; nu heter det `0800-alldays`.

Knappens tidigare fasta listval har ersatts med samma tidsstyrda listval som schemat. Alla starter via automationen använder `now().hour` i Home Assistants tidszon; enbart triggern kl. 22 kör stopp.
