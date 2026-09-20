"""One synchronized MA announcement; preserve independently playing MA queues."""

import logging

LOGGER = logging.getLogger(__name__)


def config_value(config, key, default=None):
    value = config.get('values', {}).get(key, default)
    return value.get('value', default) if isinstance(value, dict) else value


def current_item_id(queue):
    return (queue.get('current_item') or {}).get('queue_item_id')


async def broadcast(command, group_id, speak, *, inspect_only=False):
    """Let MA synchronize audio and restore only queues it cannot restore itself.

    No warm-up audio, regrouping or individual announcement fallback. The group's
    own queue is restored by MA's native announcement handler. Independent queues
    are paused before the group captures their speakers and resumed via the MA
    queue API (player play commands can redirect to the announcement group).
    """
    config = await command('config/players/get', player_id=group_id)
    if config.get('provider') != 'sync_group':
        raise RuntimeError('Granny requires a Music Assistant sync group')
    members = list(dict.fromkeys(config_value(config, 'group_members', [])))
    players = {p['player_id']: p for p in await command('players/all')}
    ready = [pid for pid in members if players.get(pid, {}).get('available')]
    if not ready:
        raise RuntimeError('No available speakers in the Granny sync group')
    queues = {q['queue_id']: q for q in await command('player_queues/all')}
    # Include the active group as a possible owner of a member's music queue.
    sources = list(dict.fromkeys(
        players[pid].get('active_source') for pid in ready
    ))
    restore = {
        qid: current_item_id(queues[qid]) for qid in sources
        if qid != group_id and qid in queues
        and queues[qid].get('state') == 'playing'
        and current_item_id(queues[qid])
    }
    result = {'members': ready, 'unavailable': [p for p in members if p not in ready],
              'resume_queues': list(restore), 'restored_queues': []}
    if inspect_only:
        return result
    paused = []
    restore_errors = []
    announcement_started = False
    try:
        for qid in restore:
            # Record before awaiting: an error can arrive after a pause took effect.
            paused.append(qid)
            await command('player_queues/pause', queue_id=qid)
        announcement_started = True
        await speak()  # Exactly one TTS/announcement call, targeting the sync group.
    finally:
        if paused:
            if announcement_started:
                # A completed group announcement retains its session briefly.
                # Native group power OFF dissolves even an already-idle session.
                # STOP alone is ignored by MA when the group reports idle.
                try:
                    await command('players/cmd/power', player_id=group_id, powered=False)
                except Exception as error:
                    LOGGER.error('Granny could not release group %s: %s', group_id, error)
                    restore_errors.append(group_id)
            try:
                fresh = {q['queue_id']: q for q in await command('player_queues/all')}
            except Exception as error:
                # A failed read must not prevent best-effort restoration after a
                # failed announcement. Resume uses MA's saved item and position.
                LOGGER.warning('Could not check Granny queue state: %s', error)
                fresh = {qid: {**queue, "state": "paused"}
                         for qid, queue in queues.items()}
            for qid in paused:
                queue = fresh.get(qid)
                if not queue or current_item_id(queue) != restore[qid]:
                    LOGGER.warning('Granny: queue %s changed; leaving it untouched', qid)
                    continue
                if queue.get('state') == 'playing':
                    continue
                try:
                    await command('player_queues/resume', queue_id=qid, fade_in=False)
                    result['restored_queues'].append(qid)
                except Exception as error:
                    restore_errors.append(qid)
                    LOGGER.error('Granny could not resume queue %s: %s', qid, error)
    if restore_errors:
        raise RuntimeError('Could not resume MA queues: ' + ', '.join(restore_errors))
    return result
