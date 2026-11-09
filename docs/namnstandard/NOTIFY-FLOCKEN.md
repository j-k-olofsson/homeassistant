# notify.flocken – åtgärdat 8 november 2026

Den tidigare tokenen avvisades av Slack med `token_revoked`. Efter ny autentisering är integrationen laddad och `notify.flocken` åter registrerad. Det kvarliggande reparationsärendet för elprisautomationen är avslutat genom HA:s ordinarie reparationsflöde efter verifiering.

Slack hade skapats som en ny integrationspost. Det fasta konfigurations-ID som tidigare användes i mitt anslutningsvillkor var därför inaktuellt. Villkoret hämtar nu kopplingen dynamiskt med `config_entry_id('sensor.flocken')` och kontrollerar att posten är laddad. Den valda och anslutna grenen ger sant; ej vald eller saknad profil ger falskt i HA:s mallmotor.

Ingen testnotis skickades. Leverans till Slack har inte provats manuellt; verifieringen omfattar autentiserad integration, registrerad tjänst, referenser och villkor. [Aktuell återkontroll](ATERKONTROLL.md).
