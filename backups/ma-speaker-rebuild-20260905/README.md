# Underlag för återbyggnad av Music Assistants spelare

Status: Återbyggnad slutförd via MA-administratörens API. Se verifierat resultat nedan.
MA-backup: a2839823 (Before MA speaker rebuild 2026-09-05).

## Grannys högtalare

Bevara de fysiska medlemmarna även när namn och spelar-ID ändras:

- JBL Link 500: up80c5f267aa69; MAC 80:C5:F2:67:AA:69; Cast [('caa9ad00-e837-41d0-6e79-5c674941e49b', 'JBL Link 500'), ('9842167e-772a-ad9d-6664-74077d0f77e6', 'Ateljéns högtalare')]
- Kökets skärm: up00f48d97d9b5; MAC 00:F4:8D:97:D9:B5; Cast [('0416fda2-3f4b-f8d8-8a46-572bce5e58bc', 'Kökets skärm')]
- Verkstadens högtalare: up6c47601a8736; MAC 6C:47:60:1A:87:36; Cast [('fbd9e291-c29e-c880-ebb2-3293f56f4e6b', 'Toalettens högtalare')]

Återskapa HA-målet media_player.grannys_hogtalare och verifiera samtliga medlemmar.

## Fortsatt arbete

1. Använd en MA-administratörstoken via ordinarie autentiserat API.
2. Stäng tillfälligt av spelarleverantörer, rensa sparade spelarposter med MA API.
3. Återaktivera Google Cast och nödvändiga inbyggda komponenter; låt Cast återupptäcka spelare.
4. Verifiera MAC/Cast UUID och aktuella namn; identifiera högtalare som fortfarande saknas.
5. Återskapa Granny-gruppen med samma fysiska medlemmar och rätt HA-entitets-ID.
6. Städa endast övergivna MA-entiteter i HA via entitetsregistrets API och uppdatera referenser.
7. Kontrollera automationer, gruppmedlemskap, musikleverantörer och bibliotek.

Godnatts direkta Cast-mål media_player.diegos_vackarklocka ska behållas.

## Verifierat resultat

- 58 gamla spelarinställningar ersatta av 33 aktuella poster inklusive underliggande protokoll.
- Google Cast aktivt. AirPlay, DLNA och HA-spelarimport avstängda. Inbyggda Sendspin/Universal Player-komponenter finns kvar; HA Voice återansluter via Sendspin.
- Grannys högtalare återskapad som syncgroup_rk7qfzy6, HA-ID media_player.grannys_hogtalare.
- Samma tre fysiska medlemmar: Ateljéns högtalare, Kökets skärm och enheten Cast kallar Toalettens högtalare (tidigare Verkstadens högtalare i MA).
- Synkprotokollet Sendspin över Cast aktiverat för de tre gruppmedlemmarna.
- MA-mediaentiteter döpta med suffix _ma; Granny behåller sitt befintliga ID. Föråldrade MA-entiteter städade.
- Berörd automation ändrad från media_player.jbl_link_500_2 till media_player.ateljens_hogtalare_ma. Tidigare exponeringsinställningar återförda på motsvarande nya ID.
- Duschens högtalare hittad med manuell Cast-upptäckt på 192.168.10.208.
- Kontorets JBL Link 20 ej återupptäckt; Cast-porten på tidigare IP 192.168.10.212 svarar inte.
- Musikleverantörer och andra icke-spelarleverantörer oförändrade.
- HA-konfigurationskontroll godkänd, automationer omladdade. Godnatt använder fortfarande endast Diegos väckarklocka.
- Ingen fysisk provuppspelning gjord.
