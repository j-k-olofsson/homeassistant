"""Deterministic bedtime checks, evaluated immediately before speech."""

FALLBACK = "Godnatt och sov sött!"
CHECKS = (
    ("binary_sensor.shelly_blu_door_window_2a6d_window", "off", {"on"},
     "Stäng verandans dörrar.", "Kontrollera att verandans dörrar är stängda."),
    ("cover.honsluckan_esphome75_cover", "closed", {"open", "opening", "closing"},
     "Stäng hönshusets lucka.", "Kontrollera att hönshusets lucka är stängd."),
    ("lock.ytterdorren", "locked", {"unlocked", "unlocking", "locking", "open"},
     "Lås entrédörren.", "Kontrollera att entrédörren är låst."),
)


def checks_message(get_state):
    problems = []
    for entity, expected, actionable, instruction, unknown in CHECKS:
        state = get_state(entity)
        if state != expected:
            problems.append(instruction if state in actionable else unknown)
    return (" ".join(problems), False) if problems else (FALLBACK, True)
