#!/bin/bash
set -euo pipefail
(crontab -l 2>/dev/null | sed '\|/config/frigg-monitor/monitor.sh|d'; echo '* * * * * /bin/bash /config/frigg-monitor/monitor.sh >>/config/frigg-monitor/logs/cron.log 2>&1') | crontab -
pgrep -x crond >/dev/null || crond -b
