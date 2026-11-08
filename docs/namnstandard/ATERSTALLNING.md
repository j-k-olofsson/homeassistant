# Återställning av namnfasen

## Full återställningspunkt före ändringar

- Namn i HA: **Före enhetlig namnsättning 2026-11-07**.
- Backup-ID: `22f83cfa`.
- Start: 7 november 2026 kl. 18.13 svensk tid.
- Typ: fullständig. HA 2026.11.0, samtliga 16 appar inklusive MariaDB, share, lokala appar, ssl och media.
- Storlek: 6 219 632 640 byte, cirka 6,2 GB.
- Ursprunglig lagringsplats: nätverksplatsen `Backup`.
- Extra kopia finns i den lokala `/backup`-mappen; den aktuella sökvägen står i den privata manifestfilen nedan. Arkivkopian ligger utanför konfigurationen för att undvika att den packas in i kommande konfigurationskopior.
- Krypterad: nej enligt Supervisor. Ingen separat dekrypteringsnyckel krävs för denna kopia. Arkivet innehåller hemligheter och ska hanteras som en fullständig systemkopia.

Arkivet har hämtats, SHA-256-beräknats och öppnats. Centrala YAML-filer och registren har provlästs ur det inre HA-arkivet till en separat mapp. Huvudkonfiguration, automationer och skript matchade återställningskopiorna före ändring. Detta verifierar läsbarhet av dessa delar; det är inte ett fullständigt prov där en återställd HA-instans startats. MariaDB-appens arkiv finns med, men någon återläsning av databasen till en server har inte gjorts.

Manifest och kontrollresultat finns under `/homeassistant/backups/namnstandard_20261107/full_backup_archive_manifest.json`.

Vid behov av exakt återgång används HA:s ordinarie återställning under **Inställningar → System → Säkerhetskopior**, med kopian ovan. En full återställning återför även andra data till tidpunkten före namnfasen. Läs [HA:s återställningsanvisningar](https://www.home-assistant.io/common-tasks/general/#restoring-a-backup) före genomförande. Ingen återställning har körts på den aktiva installationen.

## Separata återställningskopior och journaler

Privat arbetsmapp: `/homeassistant/backups/namnstandard_20261107/`.

- `baseline/`: YAML och `.storage` före ändring.
- `live_baseline/`: körande register, tillstånd och panelkonfigurationer före ändring.
- Varje namnetapp har `before/`, `after/`, `plan.json`, `journal.jsonl` och `verification.json`.
- `05-kort-och-namnmallar/`: före/efter-kopior av ändrade YAML-filer och paneler samt malltester.
- `checkpoint-after-names/`: slutkontroll efter namnfasen.
- `migration_tooling/`: kopior av skripten som skapade planer och verifierade arbetet.

Namnverktyget i `/homeassistant/tools/ha_naming_migration.py` kan återställa stödda namn- och aliasfält i en etapp med läget `rollback-names <etappnamn>`. Det vägrar om de berörda fälten ändrats sedan etappen, så senare överlappande ändringar måste hanteras först. Det ska bara köras vid avsedd återgång. Verktyget använder den befintliga Supervisor-token från miljön och skriver inte ut den.

API-återställningen återför namnfälten men kan inte återskapa HA:s interna `compat_name` exakt. För identiskt kompatibilitetsläge krävs den fullständiga återställningspunkten. `.storage` ska inte skrivas över medan HA kör.

För käll- och paneländringarna i etapp 05 finns före/efter-filer. Dessa återställs som en sammanhängande ändring: mallkonsumenter och panelmallar måste återföras innan `ha_namn.jinja` tas bort. Därefter laddas de två berörda automationerna om separat. Filernas aktuella innehåll måste först jämföras så att senare ändringar inte skrivs över.

Två avbrutna förkontroller finns kvar i arbetsmappen. Den första stoppade före någon namnändring när utökade registerfält saknades. Den andra återförde käll- och paneländringarna när en för strikt jämförelse räknade en mallvariabel som entitetsreferens. Båda korrigerades och motsvarande etapper kördes därefter med godkända slutkontroller.

## Kontrollpunkt efter namnfasen och de första ID-bytena

Backup-ID: `d59ec955`. Namn: **Kontrollpunkt namnsättning – svenska namn och 55 klimat-ID 2026-11-07**. Skapad 2026-11-07 18.55 svensk tid. Cirka 4.87 GB på nätverksplatsen Backup.

Denna delkopia innehåller HA-konfiguration och MariaDB inklusive databasen, vid den verifierade kontrollpunkten med 55 migrerade klimat-ID:n. Övriga appar ändrades inte i namnfasen och ingår i den fullständiga startkopian. Supervisor har rapporterat färdig backup utan fel; en faktisk återläsning har inte provats.

ID-etappernas mappar `08-id-pilot-toaletten` och `09-id-klimatsensorer` innehåller ID-kartor, berörda källfiler/paneler, historik-/statistikjämförelser och journaler. Vid återgång måste ID:n och deras beroenden återföras tillsammans. Verktyget för vanliga namnbyten ska inte användas som ensam återställning av ID-etapper. En säker full återgång till startläget finns i kopian `22f83cfa`; en återgång till den nya kontrollpunkten använder `d59ec955`.

`13-natverkskort-kontext` innehåller före-/efterkopior av kartornas JavaScript och resursregistreringar. Återställ respektive skript och dess resursversion tillsammans, och ladda därefter om kontrollpanelen.

## Etapp 14 efter kontrollpunkten

35 firmware-entiteter fick enhetliga ID:n efter kontrollpunkten `d59ec955`. Ingen firmware installerades. `14-id-firmware/` innehåller ID-karta, före-/efterregister och verifierad historikjämförelse. De berörda ID:na hade inga identifierade aktiva konfigurationsreferenser att skriva om. Återgång ska ändå göras som en ID-migration genom registret så att historikens metadata följer med; en registerfil får inte ensam skrivas över medan HA kör.
