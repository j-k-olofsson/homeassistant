# Hostdokumentation – `fulla`

Senast uppdaterad: 2025-10-19  
Sammanställd av: Codex (automatiserad systemsammanställning)

## Snabbfakta
- **Roll:** AI-/automationsnod med lokala GPU-resurser, backup av nätverksenheter samt filserver via Samba/NFS.
- **Chassi:** HP Compaq 8200 Elite SFF PC (stationär), firmware J01 v02.33 (2019-04-12).
- **Operativsystem:** Ubuntu 25.04 (Plucky Puffin), kernel 6.14.0-33-generic.
- **Primär administratör:** Kenneth Olofsson (tailscale: j.k.olofsson@gmail.com). Sekundär kontakt: Magnus Olofsson (tailscale: lusifer.d.woops@gmail.com).
- **Uptime vid sammanställning:** up 2 days, 1 hour, 50 minutes.

## Systemprofil
| Komponent | Specifikation |
|-----------|---------------|
| Modell | HP Compaq 8200 Elite SFF PC |
| CPU | Intel(R) Core(TM) i7-2600 @ 3.40 GHz (4C/8T, VT-x aktiverat) |
| RAM | 30 GiB installerat (4 GiB i bruk, 26 GiB tillgängligt) |
| GPU | NVIDIA GeForce RTX 5060 (8 GiB), drivrutin 580.76.05 |
| Firmware | BIOS J01 v02.33, daterad 2019-04-12 |
| System-ID | Machine ID: 0ef2d55510f4483ba6208df0f2643d53 |

### Operativsystem och tid
- `hostnamectl`: fulla (desktop).  
- `/etc/os-release`: Ubuntu 25.04 (Plucky Puffin), kodnamn `plucky`.  
- `timedatectl`: Lokal tid Europe/Stockholm (CEST, UTC+2). Systemklocka **inte** synkroniserad trots aktiv `systemd-timesyncd`. Kontrollera NTP-anslutning.

### Lagring
| Enhet | Typ | Monterad till | Storlek | Använd | Kommentar |
|-------|-----|---------------|---------|--------|-----------|
| /dev/sda2 | ext4 | `/` | 457 G | 47 G (11 %) | Systemdisk (Samsung SSD 870) |
| /dev/sdb1 | ext4 | `/mnt/1t` | 916 G | 64 G (8 %) | Sekundär lagring, label `Ledig disk 1TB` |
| /dev/sdc1 | ext4 | `/mnt/4t` | 3.6 T | 1.8 T (53 %) | Bulk-lagring, label `rippade-dvder` |
| /dev/sda1 | vfat | `/boot/efi` | 1 G | ~ | EFI-systempartition |
| Snap loop-devices | squashfs | `/snap/*` | 4–74 MiB | | Standard Ubuntu snaps |

`/etc/exports` delar både `/mnt/1t` och `/mnt/4t` mot `192.168.10.0/24` med `rw,sync,no_root_squash`. Säkerställ att endast betrodda klienter finns i detta subnet.

### Nätverk
- **Primär NIC:** `eno1` (UP) – 192.168.10.100/24, IPv6 link-local `fe80::ae16:2dff:fe04:99b2`.
- **VPN:** Tailscale `tailscaled` aktiv. IPs: 100.96.175.65 / fd7a:115c:a1e0::b501:af47. Version 1.88.3 (uppdatering till 1.88.4 finns).
- **Virtuella nät:** Docker bridges `docker0`, `admin_default`, `openwebui_default`, `composed_default`, `ai-stack-inc_default`.  
- **DNS:** systemd-resolved (127.0.0.53), lokal mDNS via avahi/systemd-networkd.

### Öppna portar (urklipp)
- `22/tcp` (SSH), `445/tcp` och `139/tcp` (Samba), `2049/tcp` (NFSv4), `111/tcp/udp` (rpcbind).
- `61208/tcp` (Glances web UI).
- `8000/tcp`, `9000/tcp`, `9443/tcp` (Portainer CE).
- `8080/tcp` (Open WebUI).
- `10300/tcp` (Wyoming Whisper server – host network).
- Flera Tailscale- och Docker-relaterade hjälpprocesser (random höga portar).

## Tjänster och bakgrundsprocesser
- `docker.service`, `containerd.service`: kör containerstackar (se nedan).
- `tailscaled.service`: Tailscale mesh-VPN; används för fjärradministration.
- `nmbd.service`, `smbd.service`: Samba-fildelning; se `/etc/samba/smb.conf` för delade kataloger (`/`, `/mnt/1t`, `/mnt/4t` tillgängliga med gäståtkomst – överväg att begränsa).
- `nfs-*` tjänster: NFS-server för samma kataloger. Säkerställ att klienter är härdande eftersom `no_root_squash` används.
- `smartmontools.service`: SMART-övervakning av diskar.
- `thermald.service`, `fwupd.service`, `unattended-upgrades.service`: temperaturkontroll, firmware och automatiska säkerhetsuppdateringar.

## Docker- och containeruppsättning
- **Docker version:** 28.2.2 (client/server), storage driver `overlay2`, root dir `/var/lib/docker`.
- **Plugins:** Buildx v0.29.1, Compose v2.40.0.
- **Aktiva containers:** 5 (samtliga kör). `docker ps` visar `glances`, `portainer`, `openwrt-backup`, `wyoming-whisper`, `openwebui`.
- **Docker-volymer:** `portainer_data`, `composed_postgres_data`, `mw-trainer_mw_data` (senare två används ej av aktuella Compose-filer men finns kvar).

### Stack: Admin (`/opt/admin/compose/docker-compose.yml`)
| Tjänst | Image | Portar | Volymer / Konfiguration | Notering |
|--------|-------|--------|-------------------------|----------|
| `glances` | `${GLANCES_IMAGE}` (senast `nicolargo/glances:latest-full`) | 61208/tcp (web UI) | Kräver `TZ` variabel. | Webbaserad systemmonitor. |
| `portainer` | `${PORTAINER_IMAGE}` (behöver uppdaterad version vid behov) | 8000, 9000, 9443 | Volymer: `../portainer/data`, `/var/run/docker.sock`. | Portainer CE GUI för containerhantering. |
| `openwrt-backup` | `${OPENWRT_BACKUP_IMAGE}` (aktuellt `alpine:3.20`) | – | Mountar `../openwrt-backup/{jobs,secrets,data}` samt `/etc/localtime`. | Kör cron (`3:15 dagligen`) som exekverar `/job/run-all.sh` för att säkerhetskopiera OpenWRT-enheter; loggar till `/var/log/openwrt-backup.log`. |

**Miljövariabler:** definieras externt (ingen `.env` i katalogen). Se till att `TZ` m.m. exporteras innan `docker compose up -d`.

### Stack: Wyoming Whisper (`/opt/wyoming-whisper/docker-compose.yml`)
- Kör `lscr.io/linuxserver/faster-whisper:gpu` med `network_mode: host` och `gpus: all`.
- Modellspec: `WHISPER_MODEL=medium-int8`, språk `sv`, `WHISPER_THREADS=8`, rate-limit 2.
- Volym: `./data:/config` (cache, modeller).
- Hälsokontroll testar port `10300`. Kontrollera att `nvidia-container-toolkit` fungerar för GPU-pass-through.

### Stack: Open WebUI (`/opt/openwebui/docker-compose.yml`)
- Image `ghcr.io/open-webui/open-webui:main`.
- Portvidarebefordran `8080:8080`.
- Volym `./data:/app/backend/data` (databas, uploads, inställningar).
- Miljövariabel `_BASE_URL=http://.home.arpa:11434` (justera för Ollama/LLM-backend vid behov).

### Övrigt
- Docker-nät `ai-stack-inc_default` och volym `composed_postgres_data` antyder tidigare stackar. Dokumentera därefter om de återaktiveras.
- Loggar finns under `/var/lib/docker/containers/<container-id>/<container-id>-json.log`. Rotera vid behov.

## Fildelning och backup
- **Samba:** Se `/etc/samba/smb.conf`. Delar `disk500G` (rot), `disk1T`, `disk4T` med `guest ok = yes`. Rekommenderas att begränsa gäståtkomst och definiera autentiserade konton.
- **NFS:** `/etc/exports` exponerar `/mnt/1t` och `/mnt/4t` till hela LAN-subnetet med skrivåtkomst och `no_root_squash`. Bedöm risk och eventuella brandväggsregler.
- **OpenWRT-backup:**  
  - Cron: `15 3 * * * PARALLEL=${PARALLEL:-4} /job/run-all.sh`.  
  - Jobbdefinitioner samt värdlista i `/opt/admin/openwrt-backup/jobs/{hosts.txt,nodes.txt}`.  
  - SSH-nycklar i `../secrets` (ägare root i container – håll behörigheter 600).

## Övervakning och fjärråtkomst
- **Glances:** `http://<host>:61208` (okrypterat). Använd reverse proxy eller VPN (Tailscale) för säker åtkomst.
- **Portainer CE:** `https://<host>:9443` (TLS). Alternativt `http://<host>:9000` för legacy-UI.
- **Tailscale:** Använd `tailscale status`, `tailscale ping <nod>` för nätdiagnostik. Uppdatera med `sudo tailscale update` (kräver lokal admin).
- **SMART:** `sudo smartctl -H /dev/sdX` – automatiska e-postlarm ej konfigurerade (överväg att lägga till).

## Kända avvikelser och rekommendationer
1. **Tidssynk:** `timedatectl` visar `System clock synchronized: no`. Kör `sudo systemctl restart systemd-timesyncd` och kontrollera brandvägg/NTP.
2. **Samba gästdelningar:** Breda `guest ok = yes` på `/` kan innebära hög risk. Definiera autentisering eller begränsa nätåtkomst.
3. **Tailscale-version:** 1.88.3 – uppdatering finns (`tailscale update`).
4. **OpenWRT-backup loggrotering:** Säkerställ att `/var/log/openwrt-backup.log` roteras för att undvika okontrollerad tillväxt.

## Underhållschecklista
- `sudo apt update && sudo apt upgrade` (månatligen eller via `unattended-upgrades` loggar i `/var/log/unattended-upgrades/`).
- `docker image prune -a` efter bekräftelse för att frigöra utrymme.
- Kontrollera SMART-status (`sudo smartctl -t short /dev/sdX`).
- Validera backupkörningar genom att inspektera `/opt/admin/openwrt-backup/data` samt loggen.
- Sätt upp regelbunden snapshot/backup av `/opt/*` kataloger (Compose-filer och persistenta data).

## Nyttiga kommandon
- Systeminfo:  
  ```bash
  hostnamectl
  lscpu
  free -h
  lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT
  ```
- Docker/Compose:  
  ```bash
  cd /opt/admin/compose && docker compose pull && docker compose up -d
  docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
  docker logs -f openwrt-backup
  ```
- Nätverk:  
  ```bash
  ip -brief address
  ss -tulpn | grep LISTEN
  tailscale status
  ```

## Ändringshistorik
- 2025-10-19: Första automatiserade dokumentationen genererad i `/opt/README.md`.

