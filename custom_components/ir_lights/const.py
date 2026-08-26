"""Constants for IR Lights."""

DOMAIN = "ir_lights"
CONF_EMITTER = "emitter"
CONF_PROFILE = "profile"
CONF_PROFILES = "profiles"
CONF_UNIQUE_ID = "unique_id"

# Prevent commands for different light families from overlapping in the same room.
INTER_PROFILE_DELAY = 0.2
