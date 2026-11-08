# Automatisk sortering av Inköpslogg

`packages/inkopslogg.yaml` aktiverar sortering för `todo.inkopslogg`.
Sorteringen flyttar befintliga poster med HA:s inbyggda metod för att ordna
att-göra-poster. Den gäller därför även i sidomenyns **Att göra**.

- Datumfältet (HA:s förfallodatum) sorteras med senaste datum överst.
- Poster utan datum visas överst tills ett datum anges.
- Vid samma datum visas senast skapade post först. Lokala listors UUID v1
  innehåller skapelsetiden. För andra typer av ID behålls ordningen vid lika datum.
- Datum i rubrik eller beskrivning tolkas inte.
- En manuell omordning ersätts av den automatiska sorteringen.

Integrationen prenumererar på liständringar, inklusive datumändringar utan
ändrat antal poster. En kontroll varje minut återansluter efter omladdning av
listintegrationen och försöker igen om ett tillfälligt fel har inträffat.
Inga konton, token, externa tjänster eller extra Python-paket behövs.

Kontroll: `docker exec homeassistant python /config/tools/test_todo_order.py`.
Konfigurationskontroll:
`docker exec homeassistant python -m homeassistant --script check_config --config /config`.

Återställning: ta bort `packages/inkopslogg.yaml` och starta om HA.
Den aktuella ordningen finns då kvar men sorteras inte längre automatiskt.
Ursprunglig lista och verifieringsunderlag finns i
`backups/inkopslogg_sortering_20261108/`. Skriv aldrig över en aktiv listas
lagringsfil; återställ listordning via HA:s API eller medan HA är stoppat.
