"""Select and retry a single sync group; never play messages to individual members."""

import logging

LOGGER = logging.getLogger(__name__)


class GroupReadinessError(RuntimeError):
    """A group member did not actually launch the synchronized Cast receiver."""

    def __init__(self, members):
        self.members = set(members)
        super().__init__("Sendspin receiver not ready for: " + ", ".join(members))


def eligible(player):
    """A virtual Sendspin bridge alone is not evidence its Cast device is online."""
    if not player or not player.get("available") or not player.get("enabled", True):
        return False
    if player.get("_cast_state") in ("unknown", "unavailable"):
        return False
    protocols = player.get("output_protocols", [])
    by_id = {p["output_protocol_id"]: p for p in protocols}
    return any(
        p.get("available")
        and (not p.get("derived_from") or by_id.get(p["derived_from"], {}).get("available"))
        for p in protocols
    )


def failed_members(error, players, candidates):
    """Only evict members explicitly named by a Cast readiness error."""
    if isinstance(error, GroupReadinessError):
        return error.members & set(candidates)
    messages = []
    seen = set()
    while error is not None and id(error) not in seen:
        seen.add(id(error))
        messages.append(str(error))
        error = error.__cause__ or error.__context__
    message = " ".join(messages)
    if "Cast app" not in message or "did not report ready" not in message:
        return set()
    return {
        pid for pid in candidates
        if any(
            name and name in message
            for name in (players[pid].get("name"), players[pid].get("display_name"))
        )
    }


async def broadcast(command, group_id, prepare, speak):
    """Rebuild membership from the saved preset for every announcement.

    Failed members are removed only from runtime membership. The preset remains
    intact, including over restarts. Only explicit readiness failures are retried;
    unknown errors must not cause arbitrary speakers to be removed.
    """
    config = await command("config/players/get", player_id=group_id)
    if config.get("provider") != "sync_group":
        raise RuntimeError("Granny requires a Music Assistant sync_group")
    values = config.get("values", {})
    # Config API returns ConfigEntry objects rather than the on-disk raw values.
    def value(key, default):
        v = values.get(key, default)
        return v.get("value", default) if isinstance(v, dict) else v
    if not value("dynamic_members", False):
        raise RuntimeError("Dynamic members must be enabled for the Granny sync group")
    preset = list(dict.fromkeys(value("group_members", [])))
    excluded = set()
    for attempt in range(len(preset) + 1):
        players = {p["player_id"]: p for p in await command("players/all")}
        candidates = [p for p in preset if p not in excluded and eligible(players.get(p))]
        if not candidates:
            raise RuntimeError("No ready speakers remain in the Granny sync group")
        # Prefer a member with an already selected protocol over a stale virtual bridge.
        candidates.sort(key=lambda p: not bool(players[p].get("active_output_protocol")))
        current = players[group_id].get("group_members", [])
        try:
            # Remove first: the old leader may be the member that failed readiness.
            remove = [p for p in current if p not in candidates]
            if remove:
                await command("players/cmd/set_members", target_player=group_id,
                              player_ids_to_remove=remove)
            await command("players/cmd/set_members", target_player=group_id,
                          player_ids_to_add=candidates)
            await prepare()
            # MA can swallow a follower's startup error. Check the actual Cast
            # receiver as well, before any spoken content is sent to the group.
            fresh = {p["player_id"]: p for p in await command("players/all")}
            not_ready = []
            for pid in candidates:
                p = fresh.get(pid, {})
                if not eligible(p):
                    not_ready.append(pid)
                elif "_cast_state" in p and any(
                    x.get("protocol_domain") == "sendspin" and x.get("derived_from")
                    for x in p.get("output_protocols", [])
                ) and not p.get("_cast_app_name", "").lower().startswith("sendspin"):
                    not_ready.append(pid)
            if not_ready:
                raise GroupReadinessError(not_ready)
            await speak()
            return {"members": candidates, "excluded": sorted(set(preset) - set(candidates)),
                    "attempts": attempt + 1}
        except Exception as error:
            failed = failed_members(error, players, candidates)
            if not failed:
                raise
            excluded.update(failed)
            LOGGER.warning("Granny sync: excluding %s for this announcement: %s",
                           ", ".join(players[p]["name"] for p in failed), error)
            # End the failed group stream before rebuilding. No individual playback.
            await command("players/cmd/stop", player_id=group_id)
    raise RuntimeError("Granny sync retry limit reached")
