/* OpenWrt Network Map for Home Assistant
 * A dependency-free Lovelace card that visualizes OpenWrt device_tracker
 * entities as a live gateway -> AP -> Wi-Fi client topology.
 */

const SVG_NS = "http://www.w3.org/2000/svg";

class OpenWrtNetworkMapCard extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
    this._hass = undefined;
    this._config = {};
    this._rendered = false;
    this._registryNames = new Map();
    this._entityRegistry = new Map();
    this._deviceEntities = new Map();
    this._registryLoading = false;
    this._selected = undefined;
    this._filterAp = "all";
    this._weakOnly = false;
    this._showLabels = false;
    this._search = "";
    this._transform = { x: 0, y: 0, k: 1 };
    this._pan = undefined;
    this._scheduled = false;
  }

  setConfig(config) {
    this._config = {
      title: "Wi-Fi-topologi",
      gateway_name: "Gateway",
      weak_threshold: -67,
      poor_threshold: -75,
      show_labels: false,
      ap_aliases: {},
      ...config,
    };
    this._showLabels = Boolean(this._config.show_labels);
    if (this._rendered) this._scheduleUpdate();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._rendered) this._renderShell();
    if (!this._registryLoading && this._registryNames.size === 0) {
      this._loadDeviceRegistry();
    }
    this._scheduleUpdate();
  }

  getCardSize() {
    return 10;
  }

  getGridOptions() {
    return { columns: 12, rows: 10, min_columns: 6, min_rows: 6 };
  }

  connectedCallback() {
    if (!this._rendered) this._renderShell();
  }

  _renderShell() {
    this._rendered = true;
    this._root.innerHTML = `
      <ha-card>
        <div class="header">
          <div>
            <div class="title"></div>
            <div class="subtitle">Livevy från OpenWRTs enhets-trackers</div>
          </div>
          <div class="summary"></div>
        </div>
        <div class="toolbar">
          <select class="ap-filter" aria-label="Filtrera accesspunkt"></select>
          <button class="weak-toggle" type="button" title="Visa bara svaga länkar">Svaga länkar</button>
          <button class="labels-toggle" type="button" title="Visa eller dölj klientnamn">Etiketter</button>
          <label class="search-wrap">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <input class="search" type="search" placeholder="Sök namn eller MAC…" />
          </label>
          <span class="spacer"></span>
          <button class="zoom-out icon-button" type="button" title="Zooma ut">−</button>
          <button class="fit icon-button" type="button" title="Anpassa grafen">⛶</button>
          <button class="zoom-in icon-button" type="button" title="Zooma in">+</button>
        </div>
        <div class="legend">
          <span><i class="excellent"></i>utmärkt ≥ −55</span>
          <span><i class="good"></i>bra</span>
          <span><i class="weak"></i>svag</span>
          <span><i class="poor"></i>dålig ≤ <b class="poor-value"></b></span>
          <span><i class="logical"></i>logisk uplink</span>
        </div>
        <div class="canvas">
          <svg role="img" aria-label="Wi-Fi-nätverkets topologi">
            <g class="viewport"></g>
          </svg>
          <div class="empty" hidden>Inga anslutna Wi-Fi-klienter hittades.</div>
          <div class="details" hidden></div>
        </div>
      </ha-card>
      <style>
        :host { display:block; }
        ha-card { overflow:hidden; }
        .header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; padding:18px 20px 10px; }
        .title { font-size:22px; font-weight:500; color:var(--primary-text-color); }
        .subtitle { margin-top:3px; font-size:13px; color:var(--secondary-text-color); }
        .summary { text-align:right; font-size:13px; color:var(--secondary-text-color); white-space:nowrap; }
        .summary strong { color:var(--primary-text-color); font-size:19px; font-weight:500; }
        .toolbar { display:flex; align-items:center; gap:8px; padding:8px 16px 10px; flex-wrap:wrap; }
        .toolbar button, .toolbar select, .search-wrap { height:36px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:18px; background:var(--card-background-color); color:var(--primary-text-color); }
        .toolbar button { padding:0 14px; cursor:pointer; font:inherit; }
        .toolbar button.active { color:var(--primary-color); border-color:var(--primary-color); background:color-mix(in srgb, var(--primary-color) 12%, transparent); }
        .toolbar select { min-width:170px; padding:0 30px 0 13px; font:inherit; }
        .search-wrap { display:flex; align-items:center; min-width:220px; padding:0 11px; }
        .search-wrap ha-icon { --mdc-icon-size:19px; color:var(--secondary-text-color); }
        .search { width:100%; border:0; outline:0; background:transparent; color:var(--primary-text-color); padding:0 0 0 7px; font:inherit; }
        .spacer { flex:1; }
        .toolbar .icon-button { width:36px; padding:0; font-size:19px; }
        .legend { display:flex; gap:15px; flex-wrap:wrap; padding:0 20px 10px; color:var(--secondary-text-color); font-size:12px; }
        .legend span { display:flex; align-items:center; gap:5px; }
        .legend i { width:20px; height:3px; display:inline-block; border-radius:2px; }
        .legend .excellent { background:#13b8a6; }
        .legend .good { background:#54a65a; }
        .legend .weak { background:#d79922; }
        .legend .poor { background:#d34f4f; }
        .legend .logical { border-top:2px dashed var(--secondary-text-color); height:0; border-radius:0; opacity:.65; }
        .canvas { position:relative; height:min(74vh, 940px); min-height:560px; border-top:1px solid var(--divider-color); background:radial-gradient(circle at 50% 25%, color-mix(in srgb, var(--primary-color) 7%, transparent), transparent 46%); overflow:hidden; touch-action:none; }
        svg { width:100%; height:100%; display:block; cursor:grab; user-select:none; }
        svg.panning { cursor:grabbing; }
        svg .node { cursor:pointer; }
        svg .gateway-label { font-size:17px; font-weight:600; }
        svg .ap-label { font-size:16px; font-weight:600; paint-order:stroke; stroke:var(--card-background-color); stroke-width:5px; }
        svg .ap-count { font-size:12px; fill:var(--secondary-text-color); paint-order:stroke; stroke:var(--card-background-color); stroke-width:4px; }
        svg .client-label { font-size:12px; paint-order:stroke; stroke:var(--card-background-color); stroke-width:4px; stroke-linejoin:round; }
        svg line { transition:opacity .15s ease; }
        svg .client-node { transition:opacity .15s ease; }
        .empty { position:absolute; inset:0; display:grid; place-items:center; color:var(--secondary-text-color); }
        .empty[hidden] { display:none; }
        .details { position:absolute; z-index:5; top:16px; right:16px; width:min(390px, calc(100% - 32px)); box-sizing:border-box; padding:17px; border:1px solid var(--divider-color); border-radius:16px; background:var(--card-background-color); box-shadow:0 8px 28px rgba(0,0,0,.32); }
        .detail-header { display:flex; align-items:flex-start; gap:10px; margin-bottom:14px; }
        .detail-title-wrap { min-width:0; flex:1; }
        .detail-name { font-size:18px; font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .detail-quality { display:inline-flex; align-items:center; gap:6px; margin-top:5px; font-size:12px; color:var(--secondary-text-color); }
        .detail-quality i { width:9px; height:9px; border-radius:50%; background:var(--quality-color); }
        .close-details { width:32px; height:32px; border:0; border-radius:50%; background:transparent; color:var(--secondary-text-color); cursor:pointer; font-size:21px; }
        .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:11px 16px; }
        .detail-item { color:var(--secondary-text-color); font-size:12px; }
        .detail-item strong { display:block; margin-top:2px; color:var(--primary-text-color); font-size:14px; font-weight:500; }
        .detail-actions { display:flex; gap:8px; margin-top:16px; }
        .detail-actions button { flex:1; border:1px solid var(--divider-color); border-radius:18px; padding:9px 12px; background:transparent; color:var(--primary-text-color); cursor:pointer; font:inherit; }
        .detail-actions .disconnect { border-color:var(--error-color, #db4437); color:var(--error-color, #db4437); }
        .detail-actions button:disabled { opacity:.45; cursor:not-allowed; }
        .action-status { min-height:17px; margin-top:9px; color:var(--secondary-text-color); font-size:12px; }
        .action-status.error { color:var(--error-color, #db4437); }
        @media (max-width: 800px) {
          .canvas { height:68vh; min-height:500px; }
          .search-wrap { order:10; width:100%; }
          .details { top:auto; bottom:12px; right:12px; width:calc(100% - 24px); max-height:calc(100% - 24px); overflow:auto; }
        }
      </style>`;

    this._root.querySelector(".title").textContent = this._config.title || "Wi-Fi-topologi";
    this._root.querySelector(".poor-value").textContent = `${this._config.poor_threshold ?? -75} dBm`;
    this._bindControls();
  }

  _bindControls() {
    this._root.querySelector(".ap-filter").addEventListener("change", (event) => {
      this._filterAp = event.target.value;
      this._selected = undefined;
      this._updateGraph();
    });
    this._root.querySelector(".weak-toggle").addEventListener("click", () => {
      this._weakOnly = !this._weakOnly;
      this._updateGraph();
    });
    this._root.querySelector(".labels-toggle").addEventListener("click", () => {
      this._showLabels = !this._showLabels;
      this._updateGraph();
    });
    this._root.querySelector(".search").addEventListener("input", (event) => {
      this._search = event.target.value.trim().toLowerCase();
      this._updateGraph();
    });
    this._root.querySelector(".zoom-in").addEventListener("click", () => this._zoom(1.2));
    this._root.querySelector(".zoom-out").addEventListener("click", () => this._zoom(1 / 1.2));
    this._root.querySelector(".fit").addEventListener("click", () => {
      this._transform = { x: 0, y: 0, k: 1 };
      this._applyTransform();
    });

    const svg = this._root.querySelector("svg");
    svg.addEventListener("wheel", (event) => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
      this._zoom(factor, event.offsetX, event.offsetY);
    }, { passive: false });
    svg.addEventListener("pointerdown", (event) => {
      if (event.target.closest?.(".node")) return;
      svg.setPointerCapture(event.pointerId);
      svg.classList.add("panning");
      this._pan = { sx: event.clientX, sy: event.clientY, x: this._transform.x, y: this._transform.y };
    });
    svg.addEventListener("pointermove", (event) => {
      if (!this._pan) return;
      this._transform.x = this._pan.x + event.clientX - this._pan.sx;
      this._transform.y = this._pan.y + event.clientY - this._pan.sy;
      this._applyTransform();
    });
    const stopPan = () => {
      this._pan = undefined;
      svg.classList.remove("panning");
    };
    svg.addEventListener("pointerup", stopPan);
    svg.addEventListener("pointercancel", stopPan);
  }

  _scheduleUpdate() {
    if (this._scheduled || !this._hass || !this._rendered) return;
    this._scheduled = true;
    requestAnimationFrame(() => {
      this._scheduled = false;
      this._updateGraph();
    });
  }

  async _loadDeviceRegistry() {
    if (!this._hass?.callWS) return;
    this._registryLoading = true;
    try {
      const [devices, entities] = await Promise.all([
        this._hass.callWS({ type: "config/device_registry/list" }),
        this._hass.callWS({ type: "config/entity_registry/list" }),
      ]);
      this._entityRegistry = new Map((entities || []).map((entity) => [entity.entity_id, entity]));
      this._deviceEntities = new Map();
      for (const entity of entities || []) {
        if (!entity.device_id) continue;
        if (!this._deviceEntities.has(entity.device_id)) this._deviceEntities.set(entity.device_id, []);
        this._deviceEntities.get(entity.device_id).push(entity);
      }
      const candidates = new Map();
      for (const device of devices || []) {
        const macs = (device.connections || [])
          .filter((connection) => String(connection[0]).toLowerCase() === "mac")
          .map((connection) => this._normalizeMac(connection[1]))
          .filter(Boolean);
        if (!macs.length) continue;
        const name = String(device.name_by_user || device.name || "").trim();
        if (!this._usefulName(name)) continue;
        let score = device.name_by_user ? 100 : 20;
        if (device.model && !/tracked device|unknown/i.test(device.model)) score += 25;
        if (!/openwrt|tracked device/i.test(`${device.manufacturer || ""} ${device.model || ""}`)) score += 15;
        if (!/\.home\.arpa$|\.local$/i.test(name)) score += 5;
        for (const mac of macs) {
          if (!candidates.has(mac) || candidates.get(mac).score < score) {
            candidates.set(mac, { name, score, deviceId: device.id });
          }
        }
      }
      this._registryNames = candidates;
      this._scheduleUpdate();
    } catch (err) {
      console.warn("OpenWrt Network Map: kunde inte läsa enhetsregistret", err);
    } finally {
      this._registryLoading = false;
    }
  }

  _collectClients() {
    const clients = new Map();
    const ipByMac = new Map();
    for (const state of Object.values(this._hass?.states || {})) {
      if (!state.entity_id.startsWith("device_tracker.")) continue;
      const attr = state.attributes || {};
      const mac = this._normalizeMac(attr.mac);
      const ip = attr.ip_address || attr.ip || attr.ipv4_address;
      if (mac && ip) ipByMac.set(mac, String(ip));
    }
    for (const state of Object.values(this._hass?.states || {})) {
      if (!state.entity_id.startsWith("device_tracker.")) continue;
      const attr = state.attributes || {};
      if (state.state !== "home" || !attr.connected_ap || attr.signal_strength == null) continue;
      const mac = this._normalizeMac(attr.mac) || state.entity_id;
      const registry = this._registryNames.get(mac);
      const entityMeta = this._entityRegistry.get(state.entity_id);
      const deviceId = entityMeta?.device_id || registry?.deviceId;
      const related = this._deviceEntities.get(deviceId) || [];
      const disconnectMeta = related
        .filter((entity) => entity.entity_id.startsWith("button.") && /disconnect device/i.test(entity.original_name || ""))
        .sort((a, b) => Number(b.config_entry_id === entityMeta?.config_entry_id) - Number(a.config_entry_id === entityMeta?.config_entry_id))[0];
      const fallbackName = this._cleanFriendlyName(attr.friendly_name || attr.host_name || mac, mac);
      const name = registry?.name || fallbackName || mac;
      const client = {
        id: `client:${mac}`,
        entityId: state.entity_id,
        deviceId,
        mac,
        name,
        ap: String(attr.connected_ap),
        rssi: Number(attr.signal_strength),
        iface: attr.interface || "–",
        ip: ipByMac.get(mac) || attr.ip_address || attr.ip || "–",
        connection: attr.connection_type || "wireless",
        rxRate: this._asNumber(attr.rx_rate),
        txRate: this._asNumber(attr.tx_rate),
        rxBytes: this._asNumber(attr.rx_bytes),
        txBytes: this._asNumber(attr.tx_bytes),
        lastSeen: attr.last_seen,
        initiallySeen: attr.initially_seen,
        disconnectEntity: disconnectMeta?.entity_id,
        disconnectAvailable: Boolean(disconnectMeta?.entity_id && this._hass.states[disconnectMeta.entity_id]),
      };
      const previous = clients.get(mac);
      if (!previous || (client.lastSeen || "") >= (previous.lastSeen || "")) clients.set(mac, client);
    }
    return [...clients.values()].sort((a, b) => a.name.localeCompare(b.name, "sv"));
  }

  _updateGraph() {
    if (!this._hass || !this._rendered) return;
    this._root.querySelector(".title").textContent = this._config.title;
    this._root.querySelector(".weak-toggle").classList.toggle("active", this._weakOnly);
    this._root.querySelector(".labels-toggle").classList.toggle("active", this._showLabels);

    const allClients = this._collectClients();
    if (this._selected) {
      this._selected = allClients.find((client) => client.id === this._selected.id);
    }
    const allAps = [...new Set(allClients.map((client) => client.ap))]
      .sort((a, b) => this._apName(a).localeCompare(this._apName(b), "sv"));
    this._updateApSelect(allAps);

    const weakThreshold = Number(this._config.weak_threshold ?? -67);
    let clients = allClients.filter((client) => this._filterAp === "all" || client.ap === this._filterAp);
    if (this._weakOnly) clients = clients.filter((client) => client.rssi <= weakThreshold);

    const weakCount = allClients.filter((client) => client.rssi <= weakThreshold).length;
    this._root.querySelector(".summary").innerHTML = `<strong>${allClients.length}</strong> klienter · ${allAps.length} AP<br>${weakCount} svaga länkar`;
    this._root.querySelector(".empty").hidden = clients.length > 0;
    this._draw(clients, allAps);
    this._renderDetails();
  }

  _updateApSelect(aps) {
    const select = this._root.querySelector(".ap-filter");
    const signature = aps.join("|");
    if (select.dataset.signature === signature) return;
    select.dataset.signature = signature;
    select.textContent = "";
    select.appendChild(new Option("Alla accesspunkter", "all"));
    for (const ap of aps) select.appendChild(new Option(this._apName(ap), ap));
    if (this._filterAp !== "all" && !aps.includes(this._filterAp)) this._filterAp = "all";
    select.value = this._filterAp;
  }

  _draw(clients, allAps) {
    const svg = this._root.querySelector("svg");
    const viewport = this._root.querySelector(".viewport");
    viewport.textContent = "";

    const visibleAps = (this._filterAp === "all" ? allAps : allAps.filter((ap) => ap === this._filterAp))
      .filter((ap) => clients.some((client) => client.ap === ap));
    if (!visibleAps.length) return;

    const cols = Math.min(3, visibleAps.length);
    const rows = Math.ceil(visibleAps.length / cols);
    const cellW = 520;
    const cellH = 455;
    const width = Math.max(900, cols * cellW);
    const height = 125 + rows * cellH;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const positions = new Map();
    const gateway = { id: "gateway", x: width / 2, y: 62, name: this._config.gateway_name || "Gateway" };
    positions.set(gateway.id, gateway);

    visibleAps.forEach((ap, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      positions.set(`ap:${ap}`, {
        id: `ap:${ap}`,
        ap,
        name: this._apName(ap),
        x: col * cellW + cellW / 2,
        y: 125 + row * cellH + 210,
      });
    });

    // Infrastructure links first, so client links and nodes stay legible.
    for (const ap of visibleAps) {
      const apNode = positions.get(`ap:${ap}`);
      viewport.appendChild(this._line(gateway, apNode, {
        color: "var(--secondary-text-color)", width: 1.4, dashed: true, opacity: 0.36,
        title: `${gateway.name} → ${apNode.name}: logisk uplink (fysisk port ännu ej kartlagd)`,
      }));
    }

    const clientPositions = [];
    for (const ap of visibleAps) {
      const apNode = positions.get(`ap:${ap}`);
      const apClients = clients.filter((client) => client.ap === ap);
      apClients.forEach((client, index) => {
        const point = this._radialPoint(index, apClients.length);
        const node = { ...client, x: apNode.x + point.x, y: apNode.y + point.y };
        clientPositions.push(node);
        viewport.appendChild(this._line(apNode, node, {
          color: this._quality(client.rssi).color,
          width: this._linkWidth(client.rxRate, client.txRate),
          opacity: this._nodeOpacity(client),
          title: `${client.name}: ${client.rssi} dBm · RX ${this._formatRate(client.rxRate)} · TX ${this._formatRate(client.txRate)}`,
        }));
      });
    }

    viewport.appendChild(this._gatewayNode(gateway));
    for (const ap of visibleAps) {
      const apNode = positions.get(`ap:${ap}`);
      const count = clients.filter((client) => client.ap === ap).length;
      viewport.appendChild(this._apNode(apNode, count));
    }
    for (const client of clientPositions) viewport.appendChild(this._clientNode(client));
    this._applyTransform();
  }

  _radialPoint(index, total) {
    const rings = [8, 12, 18, 24];
    const radii = [82, 132, 184, 228];
    let remaining = index;
    let ring = 0;
    while (ring < rings.length - 1 && remaining >= rings[ring]) {
      remaining -= rings[ring];
      ring += 1;
    }
    const before = rings.slice(0, ring).reduce((sum, value) => sum + value, 0);
    const inRing = Math.min(rings[ring], Math.max(1, total - before));
    const angle = -Math.PI / 2 + (remaining / inRing) * Math.PI * 2 + ring * 0.19;
    return { x: Math.cos(angle) * radii[ring], y: Math.sin(angle) * radii[ring] };
  }

  _gatewayNode(node) {
    const group = this._svg("g", { class: "node gateway-node", tabindex: "0" });
    group.appendChild(this._svg("circle", { cx: node.x, cy: node.y, r: 38, fill: "var(--primary-color)", stroke: "var(--card-background-color)", "stroke-width": 5 }));
    const icon = this._svg("text", { x: node.x, y: node.y + 7, "text-anchor": "middle", "font-size": 25, fill: "var(--text-primary-color, #fff)" });
    icon.textContent = "↔";
    group.appendChild(icon);
    group.appendChild(this._text(node.x, node.y + 58, node.name, "gateway-label"));
    group.appendChild(this._title(`${node.name}\nLogisk rot för Wi-Fi-topologin`));
    return group;
  }

  _apNode(node, count) {
    const group = this._svg("g", { class: "node ap-node", tabindex: "0" });
    group.appendChild(this._svg("circle", { cx: node.x, cy: node.y, r: 33, fill: "var(--card-background-color)", stroke: "var(--primary-color)", "stroke-width": 4 }));
    const icon = this._svg("text", { x: node.x, y: node.y + 7, "text-anchor": "middle", "font-size": 24, fill: "var(--primary-color)" });
    icon.textContent = "⌁";
    group.appendChild(icon);
    group.appendChild(this._text(node.x, node.y + 52, node.name, "ap-label"));
    group.appendChild(this._text(node.x, node.y + 70, `${count} klienter`, "ap-count"));
    group.appendChild(this._title(`${node.name}\n${count} visade klienter\nKlicka för att filtrera på denna AP`));
    group.addEventListener("click", (event) => {
      event.stopPropagation();
      this._filterAp = this._filterAp === node.ap ? "all" : node.ap;
      this._root.querySelector(".ap-filter").value = this._filterAp;
      this._updateGraph();
    });
    return group;
  }

  _clientNode(client) {
    const quality = this._quality(client.rssi);
    const opacity = this._nodeOpacity(client);
    const selected = this._selected?.id === client.id;
    const group = this._svg("g", { class: "node client-node", tabindex: "0", opacity });
    group.appendChild(this._svg("circle", {
      cx: client.x, cy: client.y, r: selected ? 20 : 16,
      fill: "var(--card-background-color)", stroke: quality.color,
      "stroke-width": selected ? 6 : 4,
    }));
    group.appendChild(this._svg("circle", { cx: client.x, cy: client.y, r: 5, fill: quality.color }));
    if (this._showLabels || client.rssi <= Number(this._config.weak_threshold ?? -67) || this._matchesSearch(client)) {
      group.appendChild(this._text(client.x + 23, client.y + 4, this._truncate(client.name, 27), "client-label", "start"));
    }
    group.appendChild(this._title(`${client.name}\n${client.mac}\n${client.rssi} dBm (${quality.label})\n${this._apName(client.ap)} · ${client.iface}\nRX ${this._formatRate(client.rxRate)} · TX ${this._formatRate(client.txRate)}`));
    group.addEventListener("click", (event) => {
      event.stopPropagation();
      this._selected = client;
      this._updateGraph();
    });
    group.addEventListener("dblclick", (event) => {
      event.stopPropagation();
      this._openMoreInfo(client.entityId);
    });
    return group;
  }

  _line(source, target, options) {
    const line = this._svg("line", {
      x1: source.x, y1: source.y, x2: target.x, y2: target.y,
      stroke: options.color, "stroke-width": options.width,
      "stroke-dasharray": options.dashed ? "8 7" : undefined,
      opacity: options.opacity ?? 0.8, "stroke-linecap": "round",
    });
    line.appendChild(this._title(options.title || ""));
    return line;
  }

  _renderDetails() {
    const details = this._root.querySelector(".details");
    const client = this._selected;
    if (!client) {
      details.hidden = true;
      details.textContent = "";
      return;
    }
    details.hidden = false;
    const quality = this._quality(client.rssi);
    details.innerHTML = `
      <div class="detail-header">
        <div class="detail-title-wrap">
          <div class="detail-name"></div>
          <div class="detail-quality"><i></i><span></span></div>
        </div>
        <button class="close-details" type="button" title="Stäng">×</button>
      </div>
      <div class="detail-grid">
        <div class="detail-item">AP<strong class="d-ap"></strong></div>
        <div class="detail-item">RSSI<strong class="d-rssi"></strong></div>
        <div class="detail-item">IP-adress<strong class="d-ip"></strong></div>
        <div class="detail-item">MAC-adress<strong class="d-mac"></strong></div>
        <div class="detail-item">RX-länk<strong class="d-rx"></strong></div>
        <div class="detail-item">TX-länk<strong class="d-tx"></strong></div>
        <div class="detail-item">Interface<strong class="d-iface"></strong></div>
        <div class="detail-item">Senast sedd<strong class="d-seen"></strong></div>
        <div class="detail-item">Mottaget<strong class="d-rx-bytes"></strong></div>
        <div class="detail-item">Skickat<strong class="d-tx-bytes"></strong></div>
      </div>
      <div class="detail-actions">
        <button class="open-more" type="button">Öppna i HA</button>
        <button class="disconnect" type="button">Koppla från</button>
      </div>
      <div class="action-status"></div>`;
    details.style.setProperty("--quality-color", quality.color);
    details.querySelector(".detail-name").textContent = client.name;
    details.querySelector(".detail-quality span").textContent = `${quality.label} länk`;
    details.querySelector(".d-ap").textContent = this._apName(client.ap);
    details.querySelector(".d-rssi").textContent = `${client.rssi} dBm (${quality.label})`;
    details.querySelector(".d-ip").textContent = client.ip || "–";
    details.querySelector(".d-mac").textContent = client.mac;
    details.querySelector(".d-rx").textContent = this._formatRate(client.rxRate);
    details.querySelector(".d-tx").textContent = this._formatRate(client.txRate);
    details.querySelector(".d-iface").textContent = client.iface;
    details.querySelector(".d-seen").textContent = this._formatTime(client.lastSeen);
    details.querySelector(".d-rx-bytes").textContent = this._formatBytes(client.rxBytes);
    details.querySelector(".d-tx-bytes").textContent = this._formatBytes(client.txBytes);
    details.querySelector(".close-details").addEventListener("click", () => {
      this._selected = undefined;
      this._updateGraph();
    });
    details.querySelector(".open-more").addEventListener("click", () => this._openMoreInfo(client.entityId));
    const disconnect = details.querySelector(".disconnect");
    disconnect.disabled = !client.disconnectAvailable;
    disconnect.title = client.disconnectAvailable
      ? "Koppla från klienten från nuvarande AP"
      : "Den officiella OpenWRT-frånkopplingsknappen är inte aktiv för denna klient";
    disconnect.addEventListener("click", () => this._disconnectClient(client));
  }

  async _disconnectClient(client) {
    if (!client.disconnectAvailable || !client.disconnectEntity) return;
    const confirmed = window.confirm(
      `Koppla från ${client.name} från ${this._apName(client.ap)}?\n\nKlienten väljer själv vilken accesspunkt den därefter ansluter till och kan välja samma AP igen.`
    );
    if (!confirmed) return;
    const status = this._root.querySelector(".action-status");
    const button = this._root.querySelector(".disconnect");
    button.disabled = true;
    status.classList.remove("error");
    status.textContent = "Skickar frånkoppling…";
    try {
      await this._hass.callService("button", "press", { entity_id: client.disconnectEntity });
      status.textContent = "Frånkopplad. Väntar på att klienten väljer accesspunkt…";
    } catch (err) {
      console.error("OpenWrt Network Map: frånkopplingen misslyckades", err);
      status.classList.add("error");
      status.textContent = "Frånkopplingen misslyckades. Kontrollera OpenWRT-integrationen.";
      button.disabled = false;
    }
  }

  _openMoreInfo(entityId) {
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }));
  }

  _nodeOpacity(client) {
    if (!this._search) return 0.92;
    return this._matchesSearch(client) ? 1 : 0.12;
  }

  _matchesSearch(client) {
    if (!this._search) return false;
    return `${client.name} ${client.mac} ${client.ap} ${client.iface}`.toLowerCase().includes(this._search);
  }

  _quality(rssi) {
    const weak = Number(this._config.weak_threshold ?? -67);
    const poor = Number(this._config.poor_threshold ?? -75);
    if (rssi >= -55) return { label: "utmärkt", color: "#13b8a6" };
    if (rssi > weak) return { label: "bra", color: "#54a65a" };
    if (rssi > poor) return { label: "svag", color: "#d79922" };
    return { label: "dålig", color: "#d34f4f" };
  }

  _linkWidth(rx, tx) {
    const rate = Math.max(rx || 0, tx || 0);
    return Math.min(5.5, Math.max(1.5, 1.25 + Math.log10(rate + 1) * 0.65));
  }

  _formatRate(value) {
    if (value == null || !Number.isFinite(value)) return "–";
    // OpenWRT commonly reports hostapd rates in kbit/s.
    if (value >= 1000) return `${(value / 1000).toFixed(value >= 100000 ? 0 : 1)} Mbit/s`;
    return `${Math.round(value)} kbit/s`;
  }

  _formatBytes(value) {
    if (value == null || !Number.isFinite(value)) return "–";
    const units = ["B", "KiB", "MiB", "GiB", "TiB"];
    let amount = value;
    let unit = 0;
    while (amount >= 1024 && unit < units.length - 1) {
      amount /= 1024;
      unit += 1;
    }
    return `${amount.toFixed(unit === 0 || amount >= 100 ? 0 : 1)} ${units[unit]}`;
  }

  _formatTime(value) {
    if (!value) return "–";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat("sv-SE", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(date);
  }

  _apName(ap) {
    if (this._config.ap_aliases?.[ap]) return this._config.ap_aliases[ap];
    const replacements = { koket: "Köket", kallaren: "Källaren", honshuset: "Hönshuset", kontoret: "Kontoret", verkstaden: "Verkstaden", friggan: "Friggan", poolen: "Poolen" };
    let value = String(ap).replace(/\.(home\.arpa|local)$/i, "").replace(/^ap[_-]?/i, "").replace(/[_-]+/g, " ");
    value = value.split(" ").map((part) => replacements[part.toLowerCase()] || `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(" ");
    return `AP ${value}`;
  }

  _cleanFriendlyName(value, mac) {
    let name = String(value || "").trim();
    const words = name.split(/\s+/);
    if (words.length % 2 === 0) {
      const half = words.length / 2;
      if (words.slice(0, half).join(" ").toLowerCase() === words.slice(half).join(" ").toLowerCase()) name = words.slice(0, half).join(" ");
    }
    if (!this._usefulName(name)) return mac;
    return name;
  }

  _usefulName(name) {
    if (!name) return false;
    if (/^(tracked device|unknown|esp device|shelly iot device)$/i.test(name)) return false;
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(name)) return false;
    if (/^[0-9a-f]{2}([:_-][0-9a-f]{2}){5}$/i.test(name)) return false;
    return true;
  }

  _normalizeMac(value) {
    const match = String(value || "").toLowerCase().replace(/-/g, ":").match(/[0-9a-f]{2}(?::[0-9a-f]{2}){5}/);
    return match ? match[0] : "";
  }

  _asNumber(value) {
    if (value == null || value === "") return undefined;
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
  }

  _truncate(value, max) {
    const text = String(value);
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  }

  _zoom(factor, cx, cy) {
    const old = this._transform.k;
    const next = Math.min(4, Math.max(0.45, old * factor));
    if (cx != null && cy != null) {
      this._transform.x = cx - ((cx - this._transform.x) * next) / old;
      this._transform.y = cy - ((cy - this._transform.y) * next) / old;
    }
    this._transform.k = next;
    this._applyTransform();
  }

  _applyTransform() {
    const viewport = this._root.querySelector(".viewport");
    if (!viewport) return;
    const { x, y, k } = this._transform;
    viewport.setAttribute("transform", `translate(${x} ${y}) scale(${k})`);
  }

  _svg(tag, attributes = {}) {
    const element = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attributes)) {
      if (value != null) element.setAttribute(key, String(value));
    }
    return element;
  }

  _text(x, y, value, className, anchor = "middle") {
    const text = this._svg("text", { x, y, class: className, "text-anchor": anchor, fill: "var(--primary-text-color)" });
    text.textContent = value;
    return text;
  }

  _title(value) {
    const title = this._svg("title");
    title.textContent = value;
    return title;
  }
}

customElements.define("openwrt-network-map-card", OpenWrtNetworkMapCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "openwrt-network-map-card",
  name: "OpenWRT Network Map",
  description: "Live Wi-Fi-topologi från OpenWRT device trackers",
  preview: true,
});

console.info("%c OPENWRT-NETWORK-MAP %c 1.1.0 ", "color:white;background:#1976d2;font-weight:bold", "color:#1976d2;background:white");
