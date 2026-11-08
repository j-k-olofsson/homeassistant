#!/usr/bin/env python3
# Kör: python3 /config/tools/entity_usage_verify.py \
#        --entities /config/entities_db.csv \
#        --last /config/last_seen_30d.csv \
#        --unavail /config/unavail_10d.csv

import argparse, csv, os, re
from pathlib import Path

CONFIG = Path("/config")

def load_set(csv_path, key):
    s = set()
    if not csv_path: return s
    with open(csv_path, newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for row in r:
            val = row.get(key)
            if val:
                s.add(val.strip())
    return s

def load_map(csv_path, key, cols):
    d = {}
    if not csv_path: return d
    with open(csv_path, newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for row in r:
            k = row.get(key)
            if k:
                d[k.strip()] = {c: row.get(c, "") for c in cols}
    return d

def scan_files_for_entities(entities):
    # Bygg regex som bara matchar exakta entity_id med word boundary
    # (domain.object_id där object_id kan innehålla _ och siffror)
    by_entity_used = {e: {"files": set()} for e in entities}
    # Skanna bara textfiler som sannolikt innehåller config
    exts = {".yaml",".yml",".json",".txt"}
    skip_suffix = (".db",".db-shm",".db-wal",".log",".png",".jpg",".jpeg",".gz",".zip",".tar",".tgz",".lz4",
                   ".mp3",".mp4",".ogg",".wav",".pdf",".woff",".woff2",".ttf",".otf",".bin",".pyc",".so",".dll",".exe")

    # För snabb lookup:
    # Grupp entiteter per domain för snabbare filtning
    per_domain = {}
    for e in entities:
        if "." in e:
            d = e.split(".",1)[0]
            per_domain.setdefault(d, set()).add(e)

    for root, dirs, files in os.walk(CONFIG):
        if "/.git" in root:
            continue
        for fn in files:
            p = Path(root) / fn
            low = fn.lower()
            if any(low.endswith(s) for s in skip_suffix):
                continue
            if not (p.suffix.lower() in exts or ".storage" in p.parts):
                continue
            try:
                text = p.read_text(encoding="utf-8", errors="ignore")
            except Exception:
                continue

            # Grov domänfiltrering för att minska falska positiva
            # Testa bara entiteter för domäner som faktiskt finns i filen som text "domain."
            present_domains = set()
            for d in per_domain.keys():
                if d + "." in text:
                    present_domains.add(d)
            if not present_domains:
                continue

            for d in present_domains:
                for e in per_domain[d]:
                    # Exakt match (word boundary före och efter)
                    # Tillåt t.ex.  sensor.x | "sensor.x" | 'sensor.x' | sensor.x,
                    if re.search(rf'(?<![a-z0-9_\.]){re.escape(e)}(?![a-z0-9_\.])', text):
                        by_entity_used[e]["files"].add(str(p.relative_to(CONFIG)))

    return by_entity_used

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--entities", required=True)
    ap.add_argument("--last")
    ap.add_argument("--unavail")
    args = ap.parse_args()

    entities = load_set(args.entities, "entity_id")
    last_map = load_map(args.last, "entity_id", ["last_seen_utc"])
    unavail_map = load_map(args.unavail, "entity_id", ["unavail_days"])

    candidates = set(last_map.keys()) | set(unavail_map.keys())
    # Endast kandidater som faktiskt finns i DB-listan
    candidates &= entities

    print(f"Totala entiteter i DB-listan: {len(entities)}")
    print(f"Kandidater (ålder/unavail): {len(candidates)}")

    usage = scan_files_for_entities(candidates)

    # Skriv två filer: kandidater som används vs ej
    out_used = CONFIG / "candidates_in_use.csv"
    out_safe = CONFIG / "candidates_safe_to_disable.csv"

    used_rows, safe_rows = [], []
    for e in sorted(candidates):
        files = sorted(usage.get(e, {}).get("files", []))
        row = {
            "entity_id": e,
            "used_anywhere": "yes" if files else "no",
            "used_in_files": ";".join(files),
            "last_seen_utc": last_map.get(e, {}).get("last_seen_utc",""),
            "unavail_days":  unavail_map.get(e, {}).get("unavail_days",""),
        }
        if files:
            used_rows.append(row)
        else:
            safe_rows.append(row)

    for path, rows in [(out_used, used_rows), (out_safe, safe_rows)]:
        with path.open("w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=["entity_id","used_anywhere","used_in_files","last_seen_utc","unavail_days"])
            w.writeheader()
            w.writerows(rows)
        print(f"Wrote {path} ({len(rows)} rows)")

if __name__ == "__main__":
    main()
