#!/usr/bin/env bash
set -euo pipefail

STATE_DIR="/config/frigg-monitor/state"
LOG_DIR="/config/frigg-monitor/logs"
STATE_FILE="${STATE_DIR}/state.env"
HOST_IP="192.168.10.200"
SSH_USER="friggmon"
SSH_KEY="/config/frigg-monitor/secrets/friggmon_ed25519"
SSH_OPTS=(
  -i "${SSH_KEY}"
  -o UserKnownHostsFile=/config/frigg-monitor/secrets/known_hosts
  -o BatchMode=yes
  -o StrictHostKeyChecking=yes
  -o ConnectTimeout=5
  -o ServerAliveInterval=2
  -o ServerAliveCountMax=1
)

mkdir -p "${STATE_DIR}" "${LOG_DIR}"
exec 9>"${STATE_DIR}/run.lock"
flock -n 9 || exit 0
find "$LOG_DIR" -type f -name "journal-*.log" -mtime +14 -delete

status="unknown"
last_boot_id=""
down_since=""
last_cursor=""

if [[ -f "${STATE_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${STATE_FILE}"
fi

ts_utc="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
ts_file="$(date -u +%Y%m%dT%H%M%SZ)"
now_epoch="$(date -u +%s)"

log_event() {
  local message="$1"
  printf '%s %s\n' "${ts_utc}" "${message}" | tee -a "${LOG_DIR}/events.log" >/dev/null
  logger -t frigg-monitor -- "${message}"
}

save_state() {
  cat > "${STATE_FILE}" <<EOF
status="${status}"
last_boot_id="${last_boot_id}"
down_since="${down_since}"
last_cursor="${last_cursor}"
EOF
}

sync_journal() {
  local remote_cmd
  local tmpfile

  tmpfile="$(mktemp)"
  if [[ -n "${last_cursor}" ]]; then
    remote_cmd="journalctl --utc --after-cursor='${last_cursor}' --show-cursor --no-pager -o short-iso"
  else
    remote_cmd="journalctl --utc -n 200 --show-cursor --no-pager -o short-iso"
  fi

  if ! ssh "${SSH_OPTS[@]}" "${SSH_USER}@${HOST_IP}" "bash -lc ${remote_cmd@Q}" > "${tmpfile}" 2>/dev/null; then
    rm -f "${tmpfile}"
    return 1
  fi

  if [[ -s "${tmpfile}" ]]; then
    awk '
      /^-- cursor: / { cursor=$3; next }
      { print }
      END {
        if (cursor != "") {
          printf "__CURSOR__ %s\n", cursor > "/dev/stderr"
        }
      }
    ' "${tmpfile}" >> "${LOG_DIR}/journal-$(date -u +%Y-%m-%d).log" 2> "${tmpfile}.cursor"

    if [[ -s "${tmpfile}.cursor" ]]; then
      last_cursor="$(awk '/^__CURSOR__/ {print $2}' "${tmpfile}.cursor" | tail -n 1)"
    fi
  fi

  rm -f "${tmpfile}" "${tmpfile}.cursor"
  return 0
}

remote_boot_id=""
if remote_boot_id="$(ssh "${SSH_OPTS[@]}" "${SSH_USER}@${HOST_IP}" 'cat /proc/sys/kernel/random/boot_id' 2>/dev/null)"; then
  if [[ "${status}" != "up" ]]; then
    if [[ -n "${down_since}" ]]; then
      log_event "frigg recovered after $((now_epoch - down_since))s of failed SSH checks"
    else
      log_event "frigg is reachable"
    fi
  fi

  if [[ -n "${last_boot_id}" && "${remote_boot_id}" != "${last_boot_id}" ]]; then
    bundle="${LOG_DIR}/bootchange-${ts_file}.log"
    ssh "${SSH_OPTS[@]}" "${SSH_USER}@${HOST_IP}" 'bash -lc '"'"'
      set -euo pipefail
      printf "# frigg boot change bundle\n"
      printf "Collected (UTC): "; date -u +"%Y-%m-%dT%H:%M:%SZ"
      printf "\n## Boot Facts\n"
      cat /proc/sys/kernel/random/boot_id
      uname -r
      who -b
      printf "\n"
      last -x -n 8
      printf "\n## kdump-config\n"
      kdump-config show 2>&1 || true
      printf "\n## Previous Boot Tail\n"
      journalctl -b -1 -n 250 --no-pager || true
      printf "\n## Recent Health Snapshots\n"
      for f in $(ls -1t /opt/admin/health/history | head -n 2); do
        printf "\n### %s\n" "$f"
        sed -n "1,180p" "/opt/admin/health/history/$f"
      done
    '"'"'' > "${bundle}" 2>&1 || true
    log_event "frigg boot id changed ${last_boot_id} -> ${remote_boot_id}; forensic bundle saved to ${bundle}"
  fi

  status="up"
  last_boot_id="${remote_boot_id}"
  down_since=""
  sync_journal || true
  save_state
  exit 0
fi

ping_ok=0
tcp22_ok=0
ping -c 1 -W 1 "${HOST_IP}" >/dev/null 2>&1 && ping_ok=1 || true
timeout 2 bash -lc ">/dev/tcp/${HOST_IP}/22" >/dev/null 2>&1 && tcp22_ok=1 || true

if [[ "${status}" != "down" ]]; then
  down_since="${now_epoch}"
  log_event "frigg became unreachable (ping=${ping_ok}, tcp22=${tcp22_ok})"
fi

status="down"
save_state
