#!/bin/bash

curl --location 'http://'$1'/ubus' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "call",
    "params": [
	"00000000000000000000000000000000",
	"session",
        "login",
        {
            "username": "hass",
            "password": "i3gpwd"
        }
    ]
}'
