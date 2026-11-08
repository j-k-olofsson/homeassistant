# Databaskontroll 31 oktober 2026

Kontroll cirka kl. 11:58, Europe/Stockholm. Databasen fungerar fortsatt och skrivmängden ligger tydligt under nivån före åtgärderna. Ingen ny rensning, ompackning eller konfigurationsändring genomfördes vid denna kontroll.

| Mätvärde | Före åtgärder, 29 oktober | Efter åtgärder, 29 oktober | 31 oktober |
|---|---:|---:|---:|
| Rapporterad storlek, data + index | 4 711 MiB | 2 166 MiB | **2 317 MiB** |
| Tillståndsrader | 8 230 345 | 3 544 713 | **3 670 572** |
| Sparade rader senaste 24 timmarna | 806 237 | 371 676 | **344 738** |
| Rader för de uttryckliga undantagen | 4 465 469 | 0 | **0** |
| Timrader i långtidsstatistik | 4 897 596 | 4 898 560 | **4 927 449** |

Storleken är nu cirka **2,26 GiB**, 151 MiB eller 7 % över nivån direkt efter ompackningen. Den är fortfarande cirka 51 % lägre än före åtgärden. Skrivmängden senaste dygnet är cirka **57 % lägre** än den ursprungliga dygnsmätningen. De olika dygnsmätningarna avser olika tidsfönster och belastning, men dagens fönster ligger helt efter filterändringen.

Den måttliga storleksökningen ger tillsammans med övriga kontroller inget tecken på att den tidigare överregistreringen har återkommit. Storlek efter en ompackning och löpande allokering i en aktiv databas behöver följas över en hel historikperiod. Cirka 361 GB är ledigt på värden.

## Verifierat idag

- Registerkontrollen hittar inga saknade avsedda undantag och inga oavsiktligt exkluderade skyddade trackers. Inga nya filterlistor behöver genereras enligt kontrollen.
- De exkluderade entiteterna har fortfarande noll sparade tillståndsrader.
- Äldsta tillståndet är 21 oktober 03:12:00 UTC. Det matchar tiodagarsgränsen från nattens automatiska purge den 31 oktober kl. 04:12 svensk tid. Även femminutersstatistikens åldersgräns har flyttats fram.
- Nya tillstånd når databasen med några sekunders fördröjning. Effekt, elmätarenergi, Nordpoolpris, kvartpris, timförbrukning och båda elkostnadssensorerna har nya historikrader.
- Långtidsstatistiken fortsätter växa och dess ursprungliga tidsgräns i juli 2025 finns kvar.
- Inga recorder-/SQL-fel hittades i det granskade utdraget med de senaste 2 000 loggraderna. Detta är inte en genomgång av samtliga loggar sedan den 29 oktober.
- Bufferpoolen är fortsatt 1 GiB och `innodb_flush_log_at_trx_commit=1` är oförändrat.
- HAGHS visar 99 poäng och inga varningar för databasstorlek, CPU, RAM, I/O eller diskbrist.

Kuma registrerar nu cirka **18 700 rader/dygn**, jämfört med cirka 309 000 före åtgärden. OpenWrt registrerar cirka **62 900**, jämfört med cirka 212 000. Avsiktligt kvarvarande närvaro- och annan historik står för de återstående raderna.

## Veckounderhåll

Veckoptimeringen är aktiverad. Den senaste lyckade körningen är provkörningen den 29 oktober kl. 13:46, där samtliga fyra tabeller gav `OK`. Första ordinarie schemalagda körning efter lagningen är **1 november kl. 04:45 svensk tid** och har alltså ännu inte inträffat vid dagens kontroll.

## Separata fynd

HAGHS-poängavdraget beror på fem otillgängliga entiteter: tre för vattensensorn i torkskåpet och två SEF-42H-felsensorer. Det är inte en databasvarning; orsakerna till deras otillgänglighet har inte utretts här.

Elkostnad och prognos uppdateras, men deras fasta påslag skiljer sig: den äldre SQL-frågan lägger till **1 300 kr**, medan `input_number.nordpool_monthly_fee`, som prognosen använder, är **734,64 kr**. De aktuella värdena är 4 531 respektive 4 175 kr. Beräkningsunderlagen behöver stämmas av innan siffrorna jämförs direkt; avvikelsen visar inte ett databasfel. Ingen avgift eller beräkningslogik ändrades vid kontrollen.

## Bedömning

Behåll nuvarande databas och tio dagars historik. Kontrollera resultatet av veckokörningen efter den 1 november och gör nästa jämförelse efter **8 november**, när en hel tiodagarsperiod har passerat med filtren. Dagens mätning ger inget akut skäl att byta till SQLite eller korta historiken ytterligare. Migrationens beroenden finns i [den tidigare rapporten](recorder-cleanup-20261029.md).

Mätunderlag: `/config/backups/recorder_cleanup_20261029/followup_20261031.json` och `followup_20261031_log_check.json`.
