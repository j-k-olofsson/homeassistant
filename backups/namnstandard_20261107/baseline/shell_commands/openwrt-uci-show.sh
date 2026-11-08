#!/bin/bash

# TBD
# - Remove all @host & @domain from downloaded files
# dhcp.@host[
# dhcp.@domain[
# - Rename current devices ip-address with generic string eg. $i -> 111.222.333.444
# sed 's/192.168.10.1/111.222.333.444/g'

OPENWRT_DEVICES=( 192.168.10.1 192.168.10.3 192.168.10.4
		  192.168.10.5 192.168.10.6 192.168.10.7
		  192.168.10.8 192.168.10.9 192.168.10.10
		  192.168.11.1 192.168.11.3 
		  192.168.12.1 192.168.12.3
		  192.168.13.1 )

for i in "${OPENWRT_DEVICES[@]}"
do
  echo "Exporting uci show for device: $i"
  ssh -o UserKnownHostsFile=/config/.ssh/known_hosts root@$i -i /config/.ssh/id_openwrt 'uci show' | grep -v '^dhcp.@host' | grep -v '^dhcp.@domain' | sed "s/$i/111.222.333.444/g" > uci-show-$i.txt

  echo "Done with device: $i"
  echo ""
done

