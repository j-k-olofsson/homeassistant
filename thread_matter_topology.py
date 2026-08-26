#!/usr/bin/env python3

import base64
import ipaddress
import json
import os
import socket
import ssl
import struct
import sys
import urllib.error
import urllib.request

HOST = "core-matter-server"
PORT = 5580
PATH = "/ws"

sock = None
buf = b""


def fail(message):
    print(message, file=sys.stderr)
    sys.exit(1)


def read_exact(n):
    global buf

    while len(buf) < n:
        chunk = sock.recv(65536)
        if not chunk:
            raise EOFError("WebSocket closed")
        buf += chunk

    result, buf = buf[:n], buf[n:]
    return result


def read_frame():
    header = read_exact(2)
    b1, b2 = header

    fin = bool(b1 & 0x80)
    opcode = b1 & 0x0F
    masked = bool(b2 & 0x80)
    length = b2 & 0x7F

    if length == 126:
        length = struct.unpack("!H", read_exact(2))[0]
    elif length == 127:
        length = struct.unpack("!Q", read_exact(8))[0]

    mask = read_exact(4) if masked else None
    payload = read_exact(length)

    if masked:
        payload = bytes(
            byte ^ mask[i % 4]
            for i, byte in enumerate(payload)
        )

    return fin, opcode, payload


def send_frame(opcode, payload):
    if isinstance(payload, str):
        payload = payload.encode("utf-8")

    mask = os.urandom(4)
    length = len(payload)

    header = bytes([0x80 | opcode])

    if length < 126:
        header += bytes([0x80 | length])
    elif length < 65536:
        header += bytes([0x80 | 126])
        header += struct.pack("!H", length)
    else:
        header += bytes([0x80 | 127])
        header += struct.pack("!Q", length)

    masked_payload = bytes(
        byte ^ mask[i % 4]
        for i, byte in enumerate(payload)
    )

    sock.sendall(header + mask + masked_payload)


def send_text(text):
    send_frame(0x1, text)


def receive_text():
    fragments = []
    collecting = False

    while True:
        fin, opcode, payload = read_frame()

        if opcode == 0x9:
            send_frame(0xA, payload)
            continue

        if opcode == 0x8:
            raise EOFError("Matter Server closed WebSocket")

        if opcode == 0x1:
            fragments = [payload]
            collecting = True

            if fin:
                return b"".join(fragments).decode("utf-8")

            continue

        if opcode == 0x0 and collecting:
            fragments.append(payload)

            if fin:
                return b"".join(fragments).decode("utf-8")


def matter_command(message_id, command, args):
    send_text(json.dumps({
        "message_id": message_id,
        "command": command,
        "args": args
    }, separators=(",", ":")))

    while True:
        message = json.loads(receive_text())

        if message.get("message_id") != message_id:
            continue

        if "error_code" in message:
            raise RuntimeError(
                "Matter Server error: " + json.dumps(message)
            )

        return message.get("result")


def first_ipv4(addresses):
    for address in addresses or []:
        try:
            ip = ipaddress.ip_address(address)
            if ip.version == 4:
                return str(ip)
        except ValueError:
            pass

    return None


def get_cast_info(ip):
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE

    urls = [
        f"https://{ip}:8443/setup/eureka_info?params=device_info,name",
        f"http://{ip}:8008/setup/eureka_info?params=device_info,name"
    ]

    for url in urls:
        try:
            request = urllib.request.Request(
                url,
                headers={"content-type": "application/json"}
            )

            with urllib.request.urlopen(
                request,
                timeout=4,
                context=context if url.startswith("https") else None
            ) as response:
                status = json.loads(
                    response.read().decode("utf-8")
                )

            device_info = status.get("device_info", {})

            return {
                "friendly_name":
                    device_info.get("name")
                    or status.get("name"),
                "model_name":
                    device_info.get("model_name"),
                "manufacturer":
                    device_info.get("manufacturer"),
                "cast_uuid":
                    device_info.get("ssdp_udn")
                    or status.get("ssdp_udn")
            }

        except (
            urllib.error.HTTPError,
            urllib.error.URLError,
            OSError,
            ValueError
        ):
            continue

    return None


try:
    sock = socket.create_connection(
        (HOST, PORT),
        timeout=15
    )

    key = base64.b64encode(
        os.urandom(16)
    ).decode()

    request = (
        f"GET {PATH} HTTP/1.1\r\n"
        f"Host: {HOST}:{PORT}\r\n"
        "Upgrade: websocket\r\n"
        "Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        "Sec-WebSocket-Version: 13\r\n"
        "\r\n"
    )

    sock.sendall(request.encode())

    while b"\r\n\r\n" not in buf:
        chunk = sock.recv(4096)
        if not chunk:
            fail("No HTTP response from Matter Server")
        buf += chunk

    headers, buf = buf.split(
        b"\r\n\r\n",
        1
    )

    if b"101 Switching Protocols" not in headers:
        fail(
            "Matter Server refused WebSocket connection: "
            + headers.decode(errors="replace")
        )

    server_info = json.loads(receive_text())

    if server_info.get("schema_version", 0) < 13:
        fail("Matter Server schema 13 or newer required")

    topology = matter_command(
        "topology",
        "get_network_topology",
        {"refresh": False}
    ) or {}

    border_routers = matter_command(
        "border-routers",
        "get_thread_border_routers",
        {}
    ) or []

    br_by_address = {}

    for br in border_routers:
        ext = br.get("extAddressHex")

        if ext:
            br_by_address[ext.lower()] = br

    output_nodes = []

    for node in topology.get("nodes", []):

        if node.get("network_type") != "thread":
            continue

        ext = node.get("ext_address")

        item = {
            "id": node.get("id"),
            "kind": node.get("kind"),
            "role": node.get("role")
        }

        if node.get("node_id") is not None:
            item["node_id"] = node["node_id"]

        if ext:
            ext = ext.lower()
            item["ext_address"] = ext

        if node.get("available") is not None:
            item["available"] = node["available"]

        if node.get("last_seen") is not None:
            item["last_seen"] = node["last_seen"]

        br = br_by_address.get(ext)

        if br:
            ipv4 = first_ipv4(br.get("addresses"))

            if ipv4:
                item["ipv4"] = ipv4

            if br.get("hostname"):
                item["hostname"] = br["hostname"]

            if br.get("vendorName"):
                item["vendor_name"] = br["vendorName"]

            if br.get("modelName"):
                item["model_name"] = br["modelName"]

            if (
                ipv4
                and br.get("vendorName") == "Google Inc."
            ):
                cast = get_cast_info(ipv4)

                if cast:
                    if cast.get("friendly_name"):
                        item["friendly_name"] = \
                            cast["friendly_name"]

                    if cast.get("cast_uuid"):
                        item["cast_uuid"] = \
                            cast["cast_uuid"]

        output_nodes.append(item)

    connections = []

    for link in topology.get("connections", []):
        if link.get("network") != "thread":
            continue

        source = str(link.get("source"))
        target = str(link.get("target"))

        radio = link.get("source_to_target") or {}

        connections.append({
            "source": source,
            "target": target,
            "strength": radio.get("strength") or link.get("strength"),
            "lqi": radio.get("lqi"),
            "rssi": radio.get("rssi"),
            "path_cost": link.get("path_cost")
        })

    output = {
        "count": len(output_nodes),
        "collected_at": topology.get("collected_at"),
        "nodes": output_nodes,
        "connections": connections,
        # Kept for the existing Markdown card.
        "child_links": [
            link for link in connections
            if any(
                str(node.get("id")) in (link["source"], link["target"])
                and node.get("role") == "sleepy_end_device"
                for node in topology.get("nodes", [])
            )
        ]
    }

    print(json.dumps(
        output,
        ensure_ascii=False,
        separators=(",", ":")
    ))

finally:
    if sock is not None:
        try:
            sock.close()
        except Exception:
            pass
