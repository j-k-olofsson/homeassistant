# Återställning efter namnstandardisering

Använd Home Assistants säkerhetskopierings-/återställningsfunktion i Inställningar → System → Säkerhetskopior, eller återställningsflödet vid onboarding om HA inte startar. Återställning skriver över nuvarande läge och ska endast göras när den behövs. Spara först en kopia av det dåvarande läget om möjligt.

## Kontrollpunkter

| Kopia | Innehåll / läge |
|---|---|
| `22f83cfa` | Full kopia före namnändringar 7 november. HA, MariaDB och övriga inkluderade appar/data. |
| `d59ec955` | Delkopia HA + MariaDB före etapp 14 den 7 november. |
| `d1a7d04b` | Full kopia 8 november före slutetapperna. |
| `8dc2d539` | Full kopia av det färdiga namnsystemet 8 november: HA + MariaDB + 15 övriga appar och inkluderade mappar. |

**Återställ HA-konfigurationen och MariaDB från samma kontrollpunkt.** ID-ändringar och recorderhistorik hör ihop. Att bara kopiera tillbaka en registerfil medan HA kör är inte en säker återställning. Vid full återställning används även apparnas/dataområdenas sparade läge. Följ HA:s aktuella återställningsdialog och se till att återställnings-/krypteringsnyckel finns om dialogen kräver den.

Startkopian och kopian före slutetapperna finns på säkerhetskopieringsplatsen Backup och som extra lokala arkiv:

- `/backup/namnstandard_fore_20261107_22f83cfa.tar`
- `/backup/namnstandard_fore_slutforande_20261108_d1a7d04b.tar`

Centrala konfigurations-/registerfiler har provlästs. SHA- och arkivmanifest för kopian före slutförandet finns i den privata arbetsmappen. En full provåterställning till en separat körande instans har inte gjorts. Återställning av originalkopian tar bort alla efterföljande namnändringar; `d1a7d04b` återgår till läget före slutetapperna, inte till slutrapportens namn.

De privata etappmapparna innehåller före-filer och ID-kartor för felsökning av en avgränsad etapp. Använd dem inte som instruktion att klistra in äldre `.storage`-filer i en körande installation. Arbetsverktygens interna återställning kräver rätt etapp, databasläge och stoppkontroll.

## Verifierad slutkopia `8dc2d539`

Supervisor avslutade jobbet till 100 % utan fel. Kopian finns på platsen Backup och dessutom som `/backup/namnstandard_slutford_20261108_8dc2d539.tar` (filrättighet 600). Storlek: 6716313600 byte.

SHA-256: `3fecc51d62ef09d5d45b59142b2f5cae0474449fe3e652d8ba2ed9acba7bc104`.

Konfiguration, skript, entitetsregister, integrationsregister och båda ändrade Plant-källfilerna har lästs ur det hämtade arkivet. De 10 150 registeridentiteterna och granskade namnfälten stämmer med slutgranskningen. Arkivet innehåller MariaDB. Detta är en arkiv-/innehållskontroll; ingen full provåterställning har gjorts. Slutrapportens efterföljande metadata om själva säkerhetskopian skrevs efter kopieringstillfället.

## Uppföljning av restpunkterna 8 november 2026

- **`d381dcba`**: fullständig kopia före borttagning av Slider/omskanning och flytten av ESPHome09:s namnsättning till Köket.
- **`d8d4fa67`**: fullständig kopia efter verifierad uppföljning, inklusive HA, MariaDB och övriga inkluderade appar/mappar. Supervisor avslutade jobbet till 100 % utan fel. Storlek: 6765025280 byte. Finns på säkerhetskopieringsplatsen Backup.

Dessa två kopior är verifierade genom Supervisors slutförda jobb och innehållsmetadata. De har inte hämtats som extra lokala arkiv eller provåterställts. Den tidigare extra lokala kopian `8dc2d539` finns kvar och är arkivkontrollerad. Återställ alltid HA och MariaDB från samma kontrollpunkt.

Den avslutande uppföljningskopian innehåller den aktuella, fungerande OpenAI-konfigurationen efter separat nyckeländring. Slack-tokenen avvisas fortfarande av Slack med `token_revoked` vid denna kontrollpunkt; en lokal återställning återaktiverar inte en token som tjänsten har återkallat.

## Totalanalys 8 november 2026

- **`59002a41`**: fullständig kopia före den nya totalanalysens justeringar.
- **`1d3fbbdc`**: fullständig kopia efter verifierade namn-, områdes-, referens- och Powercalc-rättningar samt Slacks anslutningsvillkor. Innehåller HA och MariaDB; storlek 6762598400 byte. Supervisor rapporterar 100 % slutfört utan fel. Finns på Backup.

Dessa kopior är kontrollerade via jobbresultat och innehållsmetadata. De har inte hämtats som extra lokala arkiv eller provåterställts. Återställ HA och MariaDB från samma kontrollpunkt. Den återkallade Slack-tokenen behöver fortfarande ersättas separat; den blir inte giltig genom lokal återställning.
