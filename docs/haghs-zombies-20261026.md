# HAGHS-rensning 2026-10-26

Verifierat efter API-ändringar: 19 → 0 zombies, hälsopoäng 99 → 100 %.

14 oanvända statistikmått för Kuma-monitorerna 65 (Verifierade säkerhetskopior) och 66 (Diskhälsa och lagring) inaktiverades med disabled_by=user. Båda är push-monitorer. Aktuell /metrics exporterar svarstid -1 och saknar upptids- och genomsnittsmåtten för dessa monitorer. Båda statusentiteterna är fortsatt up efter ändringen. Inga monitorer raderades.

Två återställda Portainer-volymdrivrutinsentiteter raderades ur HA:s entitetsregister. De tillhör tidigare endpoint 15 Fulla, som saknas i aktuell endpoint-lista (endast 14 Tor finns). Volymanrop mot endpoint 15 ger 404. Detta bevisar att HA-bindningen är gammal, inte att volymernas data fysiskt har raderats. Inga Docker-resurser ändrades.

Den återställda Music Assistant-webbspelaren PWA (Chrome on Samsung SM-T835) raderades ur HA:s entitetsregister. Ingen aktuell integrationsentitet var inläst och inga direkta konfigurationsreferenser hittades. En ny webbläsarsession kan registrera spelaren igen.

Två Google Home-sensorer för Ateljéns alarm och timers behölls och fick enbart etiketten haghs_ignore. Detta är falsklarm: installerad sensor.py returnerar unavailable när inga alarm/timers är satta; attributen visar tomma listor och next_*_status=none. Enhetssensorn är tillgänglig och volym/DND har fungerande värden. Alarm/timerfunktionerna behålls.

Inga direkta entitets- eller enhetsreferenser för de 19 kandidaterna hittades i granskade YAML-filer i konfigurationsroten, packages och lagrade Lovelace-paneler. Dynamiska och externa referenser kan inte helt uteslutas.

Ändringarna utfördes via HA:s WebSocket-API; aktiv .storage redigerades inte. Före/efter-verifieringen bekräftar exakt tre borttagna entitetsposter samt exakt 16 ändrade disabled_by/labels. HAGHS uppdaterades explicit. Noll zombies inkluderar avsiktliga inaktiveringar och undantag och är inget fullständigt funktionstest.

Backup, källdata och verifiering: /config/backups/haghs_cleanup_20261026 (åtkomst begränsad till root).

## Exakta åtgärder

- `sensor.tor_mimer_verifierad_backup_svarstid`: disabled
- `sensor.diskhalsa_och_lagring_svarstid`: disabled
- `sensor.tor_mimer_verifierad_backup_upptid_1_dag`: disabled
- `sensor.diskhalsa_och_lagring_upptid_1_dag`: disabled
- `sensor.tor_mimer_verifierad_backup_upptid_30_dagar`: disabled
- `sensor.diskhalsa_och_lagring_upptid_30_dagar`: disabled
- `sensor.tor_mimer_verifierad_backup_upptid_365_dagar`: disabled
- `sensor.diskhalsa_och_lagring_upptid_365_dagar`: disabled
- `sensor.tor_mimer_verifierad_backup_svarstid_o_1_dag`: disabled
- `sensor.diskhalsa_och_lagring_svarstid_o_1_dag`: disabled
- `sensor.tor_mimer_verifierad_backup_svarstid_o_30_dagar`: disabled
- `sensor.diskhalsa_och_lagring_svarstid_o_30_dagar`: disabled
- `sensor.tor_mimer_verifierad_backup_svarstid_o_365_dagar`: disabled
- `sensor.diskhalsa_och_lagring_svarstid_o_365_dagar`: disabled
- `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_alarms_2`: haghs_ignore
- `sensor.google_home_ateljens_hogtalare_ateljens_hogtalare_timers_2`: haghs_ignore
- `sensor.ef4abfd89188cf4c457ab1d11945269ec83484ac5766f0d59171fc4e647ace49_volymdrivrutin_2`: removed
- `sensor.6733e369c5ba97b5d5633e88d4a71b8db760f05943cb6d19d41fce5eeb813487_volymdrivrutin_2`: removed
- `media_player.pwa_chrome_on_samsung_sm_t835`: removed
