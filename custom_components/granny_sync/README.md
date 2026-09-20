# Synkroniserade Granny-utrop

`granny_sync.speak` används av `script.granny_broadcast` enbart när målet är
`media_player.grannys_hogtalare`. Enskilda mål, inklusive Diegos väckarklocka,
använder fortsatt vanlig `tts.speak`.

För varje utsändning läses gruppens ordinarie medlemslista från Music Assistant.
Offlineenheter filtreras bort, inklusive virtuella Sendspin-bryggor vars underliggande
Cast-enhet är offline. Gruppens dynamiska medlemskap uppdateras via MA:s API.
HA:s direkta Cast-status kontrolleras också eftersom MA kan ha ett föråldrat
tillgänglighetstillstånd. Efter det tysta testet kontrolleras att Cast-mottagarna
verkligen kör Sendspin; MA kan annars svälja startfel hos en gruppmedlem.
Ett tre sekunder långt tyst ljud skickas till samma synkgrupp före talet. En medlem
som uttryckligen namnges i ett Cast-beredskapsfel utesluts för denna utsändning,
den felande gruppströmmen stoppas och återstående grupp får ett nytt försök.
Den sparade medlemslistan ändras aldrig; nästa utsändning prövar medlemmarna igen.

Alla uppspelningar går till en enda Music Assistant-synkgrupp. Inga individuella
talutrop eller vanliga HA-mediaspelargrupper används som reserv. Samtidiga anrop
serialiseras. Okända fel och en helt otillgänglig grupp rapporteras som fel, inte
som lyckad uppspelning. Granny Broadcast kan ändå fortsätta till sina övriga kanaler.

En timeout kan fördröja utsändningen. Om ett nytt fel uppstår efter det tysta testet
kan hela meddelandet behöva startas om på den kvarvarande synkgruppen. Varken
nätverksavbrott under pågående tal eller hörbar synk kan garanteras av HA-spårningen.
Music Assistants egna regler för synkronisering och återställning av musik gäller.

Verifiering: `python3 /config/tools/test_granny_sync.py`, `ha core check`.
Tyst integrationstest: anropa tjänsten med gruppens `entity_id` och `test_only: true`.
Tjänstens svar redovisar medlemmar, uteslutna medlemmar och antal försök.
Ändringar av integrationens Python-kod kräver omstart av HA.
