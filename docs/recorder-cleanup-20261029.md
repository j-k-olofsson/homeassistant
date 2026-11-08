# Recorder: Kuma, OpenWrt och MariaDB, 29 oktober 2026

**Resultat:** alla tre åtgärder är genomförda och provade. Databasens rapporterade storlek minskade från **4 711,1 till 2 165,8 MiB (54,0 %)**. Den faktiska filkatalogen minskade med cirka **3,0 GB** vid ompackningen. Tio dagars historik och befintlig energi-/långtidsstatistik behålls.

## Utgångsläge och omfattning

Databasen är MariaDB 11.4.10, Home Assistant Core 2026.10.4. Recorder behåller tio dygn; det ändras inte i denna åtgärd. Databasmotor byts inte.

Före ändringarna uppmättes 4 711,1 MiB data och index, 8 230 345 tillståndsrader och 806 237 rader under föregående 24 timmar. De nya filtren omfattar 4 465 469 befintliga rader och 440 116 av dygnets rader (54,6 %). Av dygnets bortfiltrerade rader kommer 290 483 från Kuma och 149 633 från OpenWrt. Det är antal rader, inte en prognos om motsvarande procent minskad filstorlek.

Databasens storlek mäts som `information_schema.tables.data_length + index_length`, samma metod som SQL-sensorn till HAGHS. MiB är binära megabyte; HAGHS visar detta avrundat som MB/GB. Måttet är inte total storlek för hela MariaDB-appens filer, redo-loggar eller säkerhetskopior.

## Genomförda ändringar

### 1. Kuma

Recorder har kompletterats med svenska mönster för `upptid_30_dagar`, `upptid_365_dagar` och `svarstid_o_1_dag`, `svarstid_o_30_dagar`, `svarstid_o_365_dagar`. De engelska mönstren finns kvar. En registerbaserad lista identifierar dessutom samma aggregat via språkoberoende unique_id-suffix. Därmed fångas även befintliga manuellt namnändrade entiteter.

Listan omfattar 280 registrerade Kuma-aggregat; vissa tillhör inaktiva monitorer. Status, momentan svarstid och endygnsupptid har inte lagts till i de nya undantagen. Tidigare filter gäller fortfarande.

### 2. OpenWrt

Det tidigare prefixet `sensor.openwrt_*` träffade inte de verkliga entitetsnamnen. `recorder_excluded_entities.yaml` innehåller därför exakt de entitets-ID:n som tillhör plattformen OpenWrt: 3 067 registrerade sensorer, varav 153 är aktiverade i registret, samt 75 identifierade fasta nätverksenheters trackers.

Listan hämtas från registret och bygger inte på att visningsnamnen är engelska, svenska eller saknar å/ä/ö. Personkopplade trackers, mobiler, datorer och oidentifierade klienter behåller historik. Identifiering av fasta trackers använder registrerad tillverkare och tydliga enhetsnamn, inte enbart `is_wireless`; den uppgiften visade sig olämplig som enda klassificering.

Exkludering från recorder påverkar historik och framtida recorder-statistik för de valda sensorerna. Livevärden och automationer kan fortfarande använda entiteterna. Befintlig långtidsstatistik raderas inte av denna filterrensning.

Förnyad kontroll vid nya/omdöpta entiteter:

```sh
python3 /config/tools/recorder_filter_audit.py
```

Efter granskning kan listan uppdateras med `--write`. Kör därefter `ha core check` och starta om Core för att aktivera ändrade recorder-filter. Verktyget startar inte om eller rensar databasen själv.

### 3. Automatisk rensning och optimering

Det är viktigt att skilja två mekanismer:

- Home Assistants automatiska purge var redan aktiverad. Tiodagarsgränsen fungerade; `!secret` stoppade inte recorder.
- Det separata veckovisa OPTIMIZE-skriptet misslyckades sedan mars. En reguljäruttrycksbaserad läsning kunde inte tolka `db_url: !secret mariadb_db_url`.

Skriptet läser nu YAML-strukturen för just `recorder.db_url`, slår upp `!secret` i `secrets.yaml`, accepterar även en vanlig URL och avkodar URL-kodade inloggningsuppgifter. Övriga HA-taggar och kommenterade gamla `db_url`-rader stör inte läsningen. Hemligheter skrivs inte till loggen.

Alla felstadier loggas konsekvent och notifieringen fångar nu `ERROR:`, även konfigurations- och anslutningsfel. OPTIMIZE-resultat med felstatus räknas som fel. Loggning sker utan utmatningsbuffring. Den veckovisa körningen flyttas till söndag 04:45 lokal tid, efter den ordinarie nattliga rensningen 04:12. Databasens namngivna lås förhindrar samtidiga körningar av samma skript.

`auto_purge: true`, `auto_repack: true` och `purge_keep_days: 10` är explicita. HA:s månatliga automatiska repack finns kvar. Veckokörningen är extra underhåll; på sikt kan den tas bort om den inbyggda funktionen räcker.

En separat kontrollåtgärd finns: `shell_command.ha_db_check_connection`. Den testar konfiguration och verklig databasanslutning utan att optimera tabeller.

Vid den stora engångsrensningen konstaterades också att MariaDB använde endast 128 MiB InnoDB-bufferpool och hade många fysiska läsningar. Värden har cirka 16 GiB RAM, varav omkring 11 GiB var tillgängligt. Bufferpoolen höjdes därför till 1 GiB via appens stödda `mariadb_server_args` (`--innodb_buffer_pool_size=1G`). Core stoppades före databasens omstart och startades därefter igen. Databasens hållbarhetsinställning `innodb_flush_log_at_trx_commit=1` behålls. Ursprungliga appinställningar finns i den privata backupkatalogen.

## Verifiering och mätresultat

Slutmätning: **29 oktober 2026 kl. 13:46, Europe/Stockholm**.

| Mätvärde | Före | Efter |
|---|---:|---:|
| Rapporterad databasstorlek, data + index | 4 711,1 MiB | 2 165,8 MiB |
| Tillståndsrader | 8 230 345 | 3 544 713 |
| Sparade tillståndsrader senaste 24 timmarna | 806 237 | 371 676 |
| Befintliga tillståndsrader för de nya undantagen | 4 465 469 | 0 |
| Långtidsstatistik, timrader | 4 897 596 | 4 898 560 |

Tillståndsraderna minskade med 56,9 %. Dygnets kvarvarande rader är 53,9 % färre, men detta är inte en mätning av ett helt nyproducerat dygn med de nya filtren: gammal filtrerad historik har rensats bort och mättillfällena skiljer cirka 49 minuter. Inventeringen före ingreppet ger ett beräknat bortfall om cirka 440 000 onödiga rader per dygn vid samma belastning.

Efter rensning men före ompackning rapporterade MariaDB fortfarande 4 567,6 MiB. Ompackningen var alltså avgörande för att återvinna utrymmet. Databasens faktiska filkatalog uppmättes till **5 303 906 304 byte före ompackning** och **2 317 541 376 byte efter**: cirka **2,99 GB frigjordes**. Detta avser databasens katalog, inte MariaDB:s gemensamma redo-loggar eller backupfiler.

Den kvarvarande rapporterade storleken består främst av:

| Tabell | Efter ompackning, inklusive index |
|---|---:|
| `states` | 843,8 MiB |
| `state_attributes` | 317,5 MiB |
| `statistics_short_term` | 363,1 MiB |
| `statistics` | 639,5 MiB |

Tabellmåtten baseras på MariaDB:s rapporterade data-/indexallokering och påverkas av ompackning och uppdaterad motorstatistik. Långtidsstatistikens radantal ökade endast med 964 normala nya timrader; dess ursprungliga tidsgräns i juli 2025 finns kvar.

Genomförda kontroller:

- Home Assistants fullständiga konfigurationskontroll godkändes före aktivering.
- YAML-läsningen testades med `!secret`, vanlig URL, kommenterad gammal `db_url`, annan `!include`, saknad hemlighet och URL-kodat lösenord.
- `shell_command.ha_db_check_connection` gav `CHECK OK` mot den verkliga databasen.
- Filterkontrollen hittade inga saknade avsedda undantag och inga oavsiktligt exkluderade skyddade trackers. De 16 identifierade energirelaterade sensorerna ligger utanför de nya undantagen.
- Under observationsperioden sparades 14 609 nya tillståndsrader, varav **noll** för de uttryckligen exkluderade entiteterna. Effekt, Nordpoolpris, elmätarenergi, timförbrukning, kvartpris, prognos, elkostnad och mobilnärvaro hade nya rader. Senaste skrivna raden var cirka fem sekunder gammal vid slutkontrollen.
- `recorder.purge` kördes med `keep_days: 10`, `apply_filter: true`, `repack: false`. Samma exkluderade entiteter rensades dessutom i mindre grupper via `recorder.purge_entities`. Loggen visar att purge slutförde sin avslutande städning. Inga filtrerade tillståndsrader återstod, och inga tillstånd eller femminutersstatistik återstod före den provkörda tiodagarsgränsen.
- Den reparerade veckokörningens verkliga åtgärd `shell_command.ha_db_optimize_tables` provkördes. **Alla fyra tabeller gav `status: OK`**, och skriptet avslutade med `Done: OPTIMIZE completed.` kl. 13:46:10 lokal tid.
- Loggsensorn uppdaterades och resultatnotifieringen kördes kl. 13:46:29. Notifieringens villkor provades även med konfigurationsfel, anslutningsfel, den gamla feltexten och en pågående körning.
- Debugloggningen återställdes. Tillfälligt provade I/O-kapacitetsvärden återställdes till ursprungliga 200/2 000. `innodb_flush_log_at_trx_commit=1` är oförändrat; den bestående prestandaändringen är bufferpoolen på 1 GiB.

Automationsschemana är aktiverade och inlästa. Ordinarie purge kör nästa gång **30 oktober 04:12**, och veckounderhållet **1 november 04:45**, lokal tid. Dessa framtida tidsutlösningar har ännu inte inträffat; verifieringen ovan avser konfiguration, verkligt körda underhållsåtgärder och notifiering.

## Rekommenderad fortsättning

1. Behåll MariaDB och tio dagars historik tills en hel tiodagarsperiod har gått med de nya filtren, och mät därefter igen. **Cirka 2,1 GiB är redan en rimlig storleksordning för denna installation**, med tio dagars detaljhistorik och bevarad långtidsstatistik. Utöver borttagna tillståndsrader kommer gammal femminutersstatistik för exkluderade sensorer att fasas ut när den når åldersgränsen. Långtidsstatistik ligger kvar. Någon exakt framtida storlek på 1,9 GB kan inte utlovas.
2. Sänk inte till fem dygn utan att först ändra närvarosimuleringen, som använder sju dygn, och bedöma prognosens underlag. En viss GB-gräns i HAGHS är inte ett krav på databasens storlek.
3. Nästa mindre besparing är att granska återstående OpenWrt-trackers och diagnosticerande klock-/signal-/Portainer-sensorer. Oidentifierade klienter bör klassificeras innan mer närvarohistorik tas bort. Exempel på mindre brus är `sensor.honsbelysning_esphome56_lokal_tid`, som före ändringen skapade 8 614 rader per dygn. Behåll `sensor.power_consumed`, elpriset och energisensorerna som elberäkningarna behöver.
4. Rätta dygnsräknarens tidszonsuttryck. Det påverkar övervakningen, inte vilka rader recorder faktiskt sparar. Rapportens före-/eftermätningar använder redan epoch-tid och korrekt 24-timmarsintervall.
5. Inför ett eventuellt SQLite-byte: gör gärna elberäkningarna mindre databasberoende först. Löpande kostnadsberäkning och en månadsvis utility_meter kan minska behovet av MariaDB-specifik SQL. Prova och jämför på samma underlag innan befintliga beräkningar ersätts.
6. Välj därefter om nyttan av enklare SQLite-drift överväger arbetet med att bevara energi-/statistikhistoriken. Att fortsätta med MariaDB är ett rimligt alternativ när filtreringen och underhållet fungerar. Gör ingen skarp konvertering innan en kopia har provats och återställning samt historikkontinuitet har verifierats.

Inventeringen hittade 1 001 lagrade långtidsstatistikserier. 336 av dem hör till nu exkluderade entiteter och omfattar 412 349 timrader vid inventeringen. Dessa har lämnats kvar. Att radera dem skulle vara en separat gallring av gammal statistik; hela långtidsstatistikdelen är endast cirka 589 MiB före ompackning, så den är inte huvudorsaken till de tidigare 4 711 MiB.

## Bedömning inför SQLite

SQLite är Home Assistants rekommenderade standard och skulle förenkla databasdriften. Ett byte är inte nödvändigt bara för att minska de onödiga rader som nu har filtrerats. Samma sensoruppdateringar hade annars fortsatt fylla SQLite.

Ett byte behöver hantera följande konkreta beroenden i denna installation:

| Område | Vad som behöver hanteras |
|---|---|
| Energi och långtidsstatistik | Före åtgärden fanns 4 897 596 timrader med statistik sedan 28 juli 2025. Behåll metadata, statistic_id, enheter, tidsstämplar, medel-/sumvärden och nollställningsinformation. Kontrollera kontinuitet för importenergi, beräknad kostnad och de elva underförbrukarna i energipanelen. |
| Vanlig historik | Tillstånd, attribut, händelser och femminutersstatistik för de senaste tio dygnen behöver antingen flyttas med en verifierad speciallösning eller uttryckligen lämnas i ett arkiv. En ny tom SQLite visar inte automatiskt den gamla MariaDB-historiken. |
| Elkostnad t.o.m. idag | UI-konfigurerad SQL använder `homeassistant.statistics`, MariaDB:s datumfunktioner och hårdkodade metadata-ID:n 320 (Nordpool) och 223 (effekt). Skriv om till SQLite och slå upp statistic_id i stället för att anta att samma numeriska ID gäller i en ny databas. Kontrollera även fast avgift 1 300 kr och resultat mot tidigare månadssumma. Frågan använder timstatistik och bör också valideras mot den kvartupplösning som prognospaketet använder. |
| Kvartbaserad elkostnadsprognos | `packages/elkostnad_quarter.yaml` har uttrycklig MariaDB-adress och funktionerna `UNIX_TIMESTAMP`, `DATE_FORMAT`, `LAST_DAY`, `DAYOFMONTH` och `NOW`. Skriv om och jämför samma indata i båda motorerna, inklusive månadsskifte och sommar-/vintertid. Prognosen använder femminutersdata och detaljhistorik som bara behålls i tio dagar; den extrapolerar till månaden och räknar inte på ett komplett sparat kvartunderlag för hela månaden. |
| Databasövervakning | SQL för `sensor.ha_db_size_mb` använder `information_schema`. Byt till SQLite-anpassad mätning. Ta bort HAGHS `db_sensor`-override om integrationens inbyggda SQLite-mätning ska användas. Bevara entitets-ID:n eller uppdatera berörda kort i HA-adminpanelen. |
| Dygnsräknare | `sensor.ha_states_rows_24h` använder `UNIX_TIMESTAMP(UTC_TIMESTAMP() - INTERVAL 1 DAY)`. MariaDB-sessionen ligger en timme före UTC vid kontrollen; uttrycket räknar därför ungefär 25 timmar. Använd epoch-tid direkt vid rättning, och SQLite-motsvarighet vid byte. Rapportens dygnssiffror använder korrekt rullande 86 400 sekunder. |
| Underhåll och backup | Avveckla MariaDB:s OPTIMIZE-skript, schemaläggning, loggsensor och notifiering vid ett fullständigt byte. Säkerställ att HA-backup inkluderar SQLite. Behåll verifierad MariaDB-backup tills återställning och jämförelser är klara. phpMyAdmin är installerat och blir överflödigt om MariaDB tas bort. |
| Egna tabeller | `keep_stat_ids` har tre rader (timförbrukning, Nordpool, effekt). `granny_profiles` finns men är tom. Inga aktuella referenser hittades i granskad YAML/Python-kod. Dokumentera eller arkivera dem; de är inte standardtabeller i recorder. Inga extra vyer, triggers, rutiner eller databas-events hittades för schemat med den använda databasbehörigheten. |
| Funktioner som läser historik | Presence Simulation är konfigurerad med sju dagars tillbakablick. OpenPlantbook och AI Agent HA kan läsa recorder via HA:s API. De behöver normalt inte SQL-översättning, men en tom ny databas saknar underlag. Kontrollera även historikgrafer, energi-/statistikkort och återställda ackumulator-/hjälparvärden. |
| Klienter utanför HA | MariaDB är exponerad på port 3306. Lokala konfigurationsfiler och installerade appar har granskats, men externa klienter på andra värdar kan inte uteslutas med denna inventering. Kontrollera dem innan MariaDB stängs av. |

Home Assistant stöder inte automatisk migration av recorder-data mellan databasmotorer. Att bara ta bort `db_url` är därför ett byte till en ny historikdatabas, inte en migration av den befintliga historiken. En eventuell specialkonvertering behöver först provas på en kopia med validering av radantal, metadata, energisummor och viktiga datumintervall.

Källor: [Recorder](https://www.home-assistant.io/integrations/recorder/), [Purge](https://www.home-assistant.io/actions/recorder.purge/), [SQL](https://www.home-assistant.io/integrations/sql/), [History](https://www.home-assistant.io/integrations/history/).

## Säkerhetskopia och underlag

`/config/backups/recorder_cleanup_20261029/` innehåller ursprungliga ändrade konfigurationsfiler, register-/mätkontroller och en komprimerad SQL-export före rensning på cirka **579 MiB**. Exporten gjordes med `--single-transaction --quick --hex-blob`; både export och komprimering avslutades med kod 0 och gzip-integriteten kontrollerades. Backupen lagras lokalt med begränsad åtkomst och finns kvar för återställning. Den är inte en offsite-backup, och någon fullständig provåterställning har inte gjorts.
