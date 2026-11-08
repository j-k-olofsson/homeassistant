# Granny: ett enda synkroniserat Chromecast-utrop

Denna ändring ersätter den sekventiella lösningen i
`docs/granny-all-native-20261003.md`. Användaren kräver samtidig uppspelning
mellan rummen. Separata utrop i följd är inte acceptabla.

## Genomförda ändringar

- `granny_announce` skickar nu högst ett talanrop till ett Chromecast-mål.
  Loopen med separata rumsutrop är borttagen.
- Det äldre Granny-gruppmålet ska mappas till en riktig Google Cast-grupp med
  namnet `Granny utrop` eller `Grannys högtalare` som MA exponerar. Kontroll av
  `active_queue` som UUID utesluter den äldre MA-gruppen `syncgroup_rk7qfzy6`.
- Om en sådan grupp saknas skapas en tydlig HA-felnotis. Inga individuella
  flerrumsutrop eller Sendspin-utrop används som dold reserv.
- Enskilda mål, inklusive kökets tvätt-/diskutrop, använder fortsatt den
  lyssningsbekräftade vanliga Chromecast-vägen.
- De två försöken och reservrösten behåller samma destination.

## Återstående val

Inventeringen visar tre befintliga vanliga Cast-grupper: `Alla högtalare`,
`Verandans högtalare` och `Dassens högtalare`. Ingen har exakt Grannys medlemslista.
`Alla högtalare` omfattar köket, ateljén, duschen och verandans två enheter.
Den används inte utan användarens uttryckliga val eftersom det utökar rummen.

Användaren har fått två alternativ: skapa `Granny utrop` i Google Home med
Grannys högtalare, eller uttryckligen använda den större gruppen `Alla högtalare`.
Gruppskapande görs i Google Home på telefon/surfplatta enligt Googles dokumentation:
https://support.google.com/googlehome/answer/7174267?hl=en

Så länge valet eller den nya gruppen saknas är Granny-grupputrop blockerade med
felnotis, medan textkanaler och enskilda köksutrop fortsätter. Uppdraget att ge
hörbart synkroniserat grupputrop är därför ännu inte slutfört.

## Verifiering

`ha core check` godkänd, skript omladdade, fyra regressionstester godkända.
Grupplokaliseringen kördes i riktiga HA-mallmotorn och returnerade en tom lista,
vilket stämmer med MA-inventeringen. Ingen talprovning till en utökad grupp har
utförts utan användarens val.

Säkerhetskopior: `backups/granny-native-sync-20261003/`.
