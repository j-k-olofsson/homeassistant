#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/granny_plan.env"

if [[ -f "${ENV_FILE}" ]]; then
  # Källa lokala miljövariabler om filen finns
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
fi

ENTITY_ID="${1:-automation.sef_42h_plan_charging}"
BASE_URL="${HA_BASE_URL:-http://eir.local:8123}"
TOKEN="${HA_TOKEN:-}"
LOG_LINES="${HA_LOG_LINES:-150}"

if [[ -z "${TOKEN}" ]]; then
  cat <<'EOF' >&2
Sätt miljövariabeln HA_TOKEN till din Long-Lived Access Token innan du kör skriptet, t.ex.:
  export HA_TOKEN="din-token-här"

Valfria variabler:
  HA_BASE_URL   (standard http://eir.local:8123)
  HA_LOG_LINES  (antal rader från ha core logs, standard 150)
EOF
  exit 1
fi

JSON_PAYLOAD=$(printf '{"entity_id":"%s"}' "${ENTITY_ID}")

echo "Trigger automation ${ENTITY_ID} via ${BASE_URL} ..."
curl -sf \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "${JSON_PAYLOAD}" \
  "${BASE_URL}/api/services/automation/trigger" >/dev/null
echo "Automation skickad."

echo
echo "Senaste ${LOG_LINES} rader från ha core logs (filtrerat på granny_car_charge_plan):"
ha core logs -n "${LOG_LINES}" | grep -n "granny_car_charge_plan" || true
