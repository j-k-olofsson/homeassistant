# OpenWrt-inloggning och uppgraderingar, 2026-10-20

Återställd integrationsanvändare: `homeassistant` på 192.168.10.1, .3, .4, .5, .6, .7, .8, .10 och .12. Lösenordet är det gemensamma lösenord som ägaren angav; det återges inte i denna dokumentation.

Användaren fanns kvar efter uppgraderingen till OpenWrt 25.12.6. Däremot saknades `/usr/share/rpcd/acl.d/homeassistant.json`. Tidigare bevarandelistor nämnde på flera enheter `hass.json`, vilket är en annan ACL-fil.

Kontot, lösenordet och RPC/LuCI-behörigheterna har återställts med provisioneringsskriptet från installerad OpenWrt-integration 2.5.3. Befintliga root-konton och andra ACL-filer har inte ändrats. Bara rpcd behövde startas om, inte enheterna eller nätverket.

Följande explicita poster har lagts till i varje enhets `/etc/sysupgrade.conf`, med befintliga poster bevarade:

- `/etc/passwd`
- `/etc/group`
- `/etc/shadow`
- `/etc/shells`
- `/etc/config/rpcd`
- `/etc/config/luci`
- `/usr/share/rpcd/acl.d/homeassistant.json`
- `/etc/sysupgrade.conf`

Detta gäller uppgraderingar som **bevarar inställningar**. Välj fortsatt ”Keep settings”/”Behåll inställningar”; en fabriksåterställning eller `sysupgrade -n` återställer inte dessa filer. Firmware måste fortfarande innehålla uhttpd/ubus/rpcd-paketen som integrationen behöver.

Verifiering: ny inloggning via ubus som homeassistant, rätt ACL-grupp, `system.board` och `system.info` på alla nio enheter. Dessutom `sysupgrade -l` samt faktisk säkerhetskopia med `sysupgrade -b`, vars arkivinnehåll kontrollerats för alla ovanstående filer och giltig ACL-JSON.

Home Assistants nio OpenWrt-konfigurationer har uppdaterats genom ordinarie återautentiseringsflöde; befintliga alternativ och enhets-/entitets-ID behålls. Även de sex aktuella OpenWrt-enheterna i Wi-Fi Clients-integrationen har fått samma konto via dess alternativflöde.

Enheten som tidigare använde 192.168.10.9 är enligt ägaren nu 192.168.30.9 och kör inte OpenWrt. Den ingår inte i återställningen.

Skyddade säkerhetskopior och administrativa kontrollskript finns i `/config/backups/openwrt-user-20261020/`. Arkiven innehåller känsliga konfigurationsuppgifter och har filrättighet 0600; katalogen har 0700. Kontrollskripten kräver lösenord i miljövariabel och lagrar inte det nya lösenordet i källkod. Återställning av hela användarregister bör bara göras för att ångra just denna ändring, inte efter senare kontoändringar.

Slutkontroll: alla nio OpenWrt-konfigurationer och Wi-Fi Clients-integrationen är inlästa (`loaded`). Inga OpenWrt-reparationsärenden återstår. CPU, minne och drifttid rapporterar värden för samtliga nio enheter. Andra enskilda entiteter kan fortfarande vara okända/otillgängliga; ingen fullständig funktionskontroll av alla tilläggsfunktioner har gjorts.
