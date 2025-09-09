#!/bin/bash

OPENWRT_DEVICES=( 192.168.10.1 192.168.10.3 192.168.10.4
		  192.168.10.11 192.168.10.6 192.168.10.7
		  192.168.10.8 192.168.10.9 192.168.10.10
		  192.168.11.1 192.168.11.3 
		  192.168.12.1 192.168.12.3
		  192.168.13.1 )

for i in "${OPENWRT_DEVICES[@]}"
do
  echo "Backing up device: $i"
  ssh -o UserKnownHostsFile=/config/.ssh/known_hosts -o ConnectTimeout=30 root@$i -i /config/.ssh/id_openwrt 'umask go=; sysupgrade -b /tmp/backup-${HOSTNAME}-$(date +%F).tar.gz; ls /tmp/backup*'

  echo "Copying backup file from device: $i"
  scp -o UserKnownHostsFile=/config/.ssh/known_hosts -o ConnectTimeout=30 -i /config/.ssh/id_openwrt -T -O root@$i:'/tmp/backup-${HOSTNAME}-$(date +%F).tar.gz' /share/openwrt-backups

  echo "Removing backup file from device: $i"
  ssh -o UserKnownHostsFile=/config/.ssh/known_hosts -o ConnectTimeout=30 root@$i -i /config/.ssh/id_openwrt 'rm /tmp/backup-${HOSTNAME}-$(date +%F).tar.gz'

  echo "Done with device: $i"
  echo ""
done

# Remove files older then 14 days
find /share/openwrt-backups -type f -mtime +13 -delete
