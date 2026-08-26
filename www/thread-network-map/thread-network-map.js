class ThreadNetworkMap extends HTMLElement {
  setConfig(config) {
    this.config = { entity: "sensor.thread_matter_topology", ...config };
    this._zoom = 1;
    this._filter = "all";
    this._selected = null;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
  }

  getCardSize() { return 8; }
  getGridOptions() { return { columns: "full", rows: 8, min_rows: 5 }; }

  nameFor(node) {
    const hass = this._hass;
    const addr = (node.ext_address || "").toLowerCase();
    if (node.kind === "border_router")
      return node.friendly_name || node.hostname || `${node.vendor_name || ""} ${node.model_name || ""}`.trim() || "Border Router";

    for (const [entityId, state] of Object.entries(hass.states || {})) {
      if (String(state.state).toLowerCase() !== addr) continue;
      const reg = hass.entities?.[entityId];
      const dev = reg?.device_id && hass.devices?.[reg.device_id];
      return dev?.name_by_user || dev?.name || state.attributes.friendly_name || addr.slice(0, 8);
    }
    if (node.kind === "matter" && node.node_id != null) {
      const needle = `DEVICEID_${Number(node.node_id).toString(16).toUpperCase()}-`;
      for (const dev of Object.values(hass.devices || {})) {
        if ((dev.identifiers || []).some(i => i[0] === "matter" && String(i[1]).toUpperCase().startsWith(needle)))
          return dev.name_by_user || dev.name;
      }
    }
    return addr ? `${addr.slice(0, 8)}…` : String(node.id);
  }

  roleLabel(node) {
    if (node.kind === "border_router") return "Border router";
    if (node.role === "sleepy_end_device") return "Sleepy end device";
    if (node.role === "reed") return "REED";
    if (node.kind === "matter") return `Matter · ${node.role || "Thread"}`;
    return node.role || "Thread router";
  }

  render() {
    const state = this._hass.states[this.config.entity];
    if (!state) {
      this.shadowRoot.innerHTML = `<ha-card><div class="error">Entiteten ${this.config.entity} saknas</div></ha-card>`;
      return;
    }
    const nodes = state.attributes.nodes || [];
    const links = state.attributes.connections || state.attributes.child_links || [];
    const visible = nodes.filter(n => this._filter === "all" || n.kind === this._filter);
    const ids = new Set(visible.map(n => String(n.id)));
    const shownLinks = links.filter(l => ids.has(String(l.source)) && ids.has(String(l.target)));
    const width = 1200, height = 680, cx = width / 2, cy = height / 2;
    const border = visible.filter(n => n.kind === "border_router");
    const other = visible.filter(n => n.kind !== "border_router");
    const positions = new Map();
    border.forEach((n, i) => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / Math.max(border.length, 1);
      positions.set(String(n.id), [cx + Math.cos(a) * 205, cy + Math.sin(a) * 205]);
    });
    other.forEach((n, i) => {
      const a = -Math.PI / 2 + i * 2 * Math.PI / Math.max(other.length, 1);
      const r = 290 + (i % 2) * 45;
      positions.set(String(n.id), [cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    });
    const color = n => n.available === false ? "#ef5350" : n.kind === "border_router" ? "#03a9d9" : n.kind === "matter" ? "#7cb342" : "#16b8ad";
    const lines = shownLinks.map(l => {
      const a = positions.get(String(l.source)), b = positions.get(String(l.target));
      if (!a || !b) return "";
      const c = l.lqi >= 3 ? "#18b8ad" : l.lqi === 2 ? "#e5a11a" : l.lqi != null ? "#ef5350" : "#607076";
      return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c}" stroke-width="${l.lqi ? 3 : 1.5}" opacity=".72"><title>RSSI ${l.rssi ?? "–"} dBm · LQI ${l.lqi ?? "–"}</title></line>`;
    }).join("");
    const dots = visible.map(n => {
      const [x, y] = positions.get(String(n.id));
      const label = this.nameFor(n), meta = this.roleLabel(n);
      const selected = String(this._selected) === String(n.id);
      return `<g class="node${selected ? " selected" : ""}" data-node="${this.escape(n.id)}" transform="translate(${x} ${y})"><circle r="${n.kind === "border_router" ? 25 : 15}" fill="#172125" stroke="${color(n)}" stroke-width="${selected ? 7 : 4}"/><circle r="4" fill="${color(n)}"/><text y="${n.kind === "border_router" ? 42 : 32}" text-anchor="middle">${this.escape(label)}</text><text class="meta" y="${n.kind === "border_router" ? 57 : 47}" text-anchor="middle">${this.escape(meta)}</text><title>${this.escape(label)}\n${this.escape(meta)}\n${n.ext_address || ""}</title></g>`;
    }).join("");
    const counts = {
      matter: nodes.filter(n => n.kind === "matter").length,
      esp: nodes.filter(n => n.kind === "thread_unknown").length,
      br: nodes.filter(n => n.kind === "border_router").length
    };
    this.shadowRoot.innerHTML = `<style>
      ha-card{overflow:hidden;background:var(--ha-card-background,var(--card-background-color));min-height:700px}.head{display:flex;align-items:center;gap:10px;padding:18px 18px 8px}.title{font-size:20px;font-weight:600}.sub{color:var(--secondary-text-color);font-size:12px;margin-top:4px}.stats{margin-left:auto;text-align:right}.buttons{display:flex;gap:7px;padding:8px 18px 12px;border-bottom:1px solid var(--divider-color)}button{border:1px solid var(--divider-color);background:transparent;color:var(--primary-text-color);border-radius:18px;padding:7px 13px;cursor:pointer}button.active{border-color:var(--primary-color);color:var(--primary-color)}.zoom{margin-left:auto}.map{position:relative;height:610px;overflow:hidden;background:radial-gradient(circle at center,rgba(20,184,173,.07),transparent 60%)}svg{width:100%;height:100%;transform:scale(var(--zoom));transition:transform .15s}line{stroke-linecap:round}.node{cursor:pointer}.node:hover circle{filter:brightness(1.35)}text{fill:var(--primary-text-color);font:12px sans-serif;font-weight:600;pointer-events:none}.meta{fill:var(--secondary-text-color);font-size:10px;font-weight:400}.error{padding:24px}.legend{padding:0 18px 12px;color:var(--secondary-text-color);font-size:11px}.details{position:absolute;z-index:5;top:16px;right:16px;width:min(420px,calc(100% - 32px));max-height:560px;overflow:auto;box-sizing:border-box;padding:18px;border:1px solid var(--divider-color);border-radius:16px;background:var(--card-background-color);box-shadow:0 8px 28px rgba(0,0,0,.38)}.detail-head{display:flex;gap:10px;align-items:flex-start;margin-bottom:14px}.detail-name{font-size:19px;font-weight:600;flex:1}.close{border:0;padding:2px 8px;font-size:22px}.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 18px}.detail-item{font-size:12px;color:var(--secondary-text-color);overflow-wrap:anywhere}.detail-item strong{display:block;margin-top:3px;color:var(--primary-text-color);font-size:14px;font-weight:500}.links-title{margin:18px 0 8px;font-weight:600}.link-row{display:grid;grid-template-columns:1fr auto;gap:12px;padding:8px 0;border-top:1px solid var(--divider-color);font-size:13px}.link-meta{color:var(--secondary-text-color);text-align:right}@media(max-width:650px){.details{top:auto;bottom:12px;right:12px;width:calc(100% - 24px);max-height:85%}}
    </style><ha-card><div class="head"><div><div class="title">Thread-topologi</div><div class="sub">Livevy från Matter Servers sammanslagna Thread-graf</div></div><div class="stats"><b>${nodes.length}</b> noder · ${links.length} länkar<div class="sub">${counts.matter} Matter · ${counts.esp} övriga Thread · ${counts.br} BR</div></div></div><div class="buttons"><button data-filter="all">Alla</button><button data-filter="matter">Matter</button><button data-filter="thread_unknown">ESPHome/övriga</button><button data-filter="border_router">Border routers</button><span class="zoom"><button data-zoom="out">−</button><button data-zoom="reset">⛶</button><button data-zoom="in">＋</button></span></div><div class="legend">Turkos = övrig Thread/ESPHome · grön = Matter · blå = border router · röd = otillgänglig · klicka på en nod för detaljer</div><div class="map"><svg viewBox="0 0 ${width} ${height}" style="--zoom:${this._zoom}">${lines}${dots}</svg><div class="details" hidden></div></div></ha-card>`;
    this.shadowRoot.querySelectorAll("[data-filter]").forEach(b => { b.classList.toggle("active", b.dataset.filter === this._filter); b.onclick = () => { this._filter = b.dataset.filter; this.render(); }; });
    this.shadowRoot.querySelectorAll("[data-zoom]").forEach(b => b.onclick = () => { this._zoom = b.dataset.zoom === "in" ? Math.min(1.6, this._zoom + .15) : b.dataset.zoom === "out" ? Math.max(.65, this._zoom - .15) : 1; this.render(); });
    this.shadowRoot.querySelectorAll("[data-node]").forEach(g => g.onclick = event => { event.stopPropagation(); this._selected = g.dataset.node; this.render(); });
    this.renderDetails(nodes, links);
  }

  renderDetails(nodes, links) {
    const panel = this.shadowRoot.querySelector(".details");
    const node = nodes.find(n => String(n.id) === String(this._selected));
    if (!node) { panel.hidden = true; return; }
    const peers = links.filter(l => String(l.source) === String(node.id) || String(l.target) === String(node.id)).map(l => {
      const peerId = String(l.source) === String(node.id) ? l.target : l.source;
      const peer = nodes.find(n => String(n.id) === String(peerId));
      return { link: l, peer, name: peer ? this.nameFor(peer) : peerId };
    }).sort((a,b) => a.name.localeCompare(b.name, "sv"));
    const available = node.available == null ? "Okänd" : node.available ? "Tillgänglig" : "Ej tillgänglig";
    const seen = node.last_seen ? new Date(node.last_seen).toLocaleString("sv-SE") : "–";
    panel.innerHTML = `<div class="detail-head"><div class="detail-name">${this.escape(this.nameFor(node))}</div><button class="close" title="Stäng">×</button></div><div class="detail-grid"><div class="detail-item">Typ<strong>${this.escape(this.roleLabel(node))}</strong></div><div class="detail-item">Status<strong>${available}</strong></div><div class="detail-item">Extended address<strong>${this.escape(node.ext_address || "–")}</strong></div><div class="detail-item">Nod-ID<strong>${this.escape(node.node_id ?? node.id ?? "–")}</strong></div><div class="detail-item">Tillverkare<strong>${this.escape(node.vendor_name || "–")}</strong></div><div class="detail-item">Modell<strong>${this.escape(node.model_name || "–")}</strong></div><div class="detail-item">Hostname<strong>${this.escape(node.hostname || "–")}</strong></div><div class="detail-item">IPv4<strong>${this.escape(node.ipv4 || "–")}</strong></div><div class="detail-item">Senast sedd<strong>${seen}</strong></div><div class="detail-item">Antal länkar<strong>${peers.length}</strong></div></div><div class="links-title">Direkta Thread-länkar</div>${peers.length ? peers.map(p => `<div class="link-row"><span>${this.escape(p.name)}<br><span class="sub">${this.escape(p.peer ? this.roleLabel(p.peer) : "Okänd nod")}</span></span><span class="link-meta">RSSI ${p.link.rssi ?? "–"} dBm<br>LQI ${p.link.lqi ?? "–"} · ${this.escape(p.link.strength || "–")}</span></div>`).join("") : `<div class="sub">Inga rapporterade länkar</div>`}`;
    panel.hidden = false;
    panel.querySelector(".close").onclick = () => { this._selected = null; this.render(); };
  }

  escape(value) { return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
}

customElements.define("thread-network-map", ThreadNetworkMap);
window.customCards = window.customCards || [];
window.customCards.push({ type: "thread-network-map", name: "Thread Network Map", description: "Grafisk topologi för alla Thread-noder" });
