# HA-lagningar 2026-10-22

Fyra aktiva Spook-lagningar åtgärdade. HA:s aktuella repairs/list_issues svarar med tom lista efter ändringarna. Inga varningar ignorerades.

- Skymningsgruppen: tog bort saknade light.levoit_luftfukare_300s_night_light via gruppens options flow. light.grupp_sanglampor finns kvar. Luftfuktaren är avsiktligt offline och dess övriga entiteter ändrades inte. Nattlampan behöver läggas tillbaka med sitt faktiska entitets-ID om den återansluts och ska ingå igen.
- Grannys HA-högtalargrupp: ersatte borttagna media_player.jbl_link_500 med befintliga media_player.jbl_link_500_67aa69 (Ateljéns högtalare). Kökets skärm och inställningen hide_members behölls.
- granny_announce: tog bort den gamla specialmappningen från borttagna media_player.ateljens_hogtalare till media_player.ateljen. Den aktuella Ateljén-entiteten använder redan skriptets vanliga direkta routing. Native Chromecast-gruppurvalet behölls.
- Föräldralös statistik: exporterade metadata och samtliga tillgängliga timposter (4 259) samt femminutersposter (64) för de 39 rapporterade statistik-ID:na. Kontrollerade att alla saknades i aktuellt entitetsregister och state machine. Använde sedan Spooks ordinarie remove-reparation, som även kontrollerar att posterna fortfarande är övergivna. Efteråt finns ingen statistikmetadata för dessa ID:n.

Verifiering: HA:s konfigurationskontroll valid utan fel eller varningar; scripts reload lyckades; fyra befintliga tester i tools/test_granny_announce.py godkända. Båda gruppernas aktuella medlemslistor stämmer och grupperna är tillgängliga. Ingen testuppspelning eller fysisk lampstyrning utfördes.

Säkerhetskopior och API-resultat: /homeassistant/backups/repairs_20261022T080405Z . Konfigurationskopiorna innehåller känsliga integrationsuppgifter och är sparade med behörighet 600.
