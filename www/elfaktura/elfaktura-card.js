/* Local HA custom card. Authenticated hass.callWS; no external libraries. */
const INVOICE_ITEMS = {
  energy: "Elenergi / spotkostnad", markup: "Rörliga påslag",
  trade_fixed: "Fast avgift elhandel", transmission: "Överföringsavgift",
  energy_tax: "Energiskatt", network_fixed: "Fast avgift elnät",
  power: "Effektavgift", other: "Övriga poster", discount: "Rabatt / korrigering",
};
const INVOICE_KINDS = {trade: "Elhandel", network: "Elnät", combined: "Samlingsfaktura"};
const money = value => new Intl.NumberFormat("sv-SE", {style: "currency", currency: "SEK"}).format(value / 100);
const energy = value => value === null ? "Ej angivet" : new Intl.NumberFormat("sv-SE", {maximumFractionDigits: 3}).format(value / 1000) + " kWh";
const decimal = (value, places = 2) => value === null || value === undefined ? "" : (value / 10 ** places).toFixed(places).replace(".", ",");
const uuid = () => typeof crypto.randomUUID === "function" ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));

function scaled(text, places, label, optional = false) {
  const clean = String(text).replace(/[\s\u00a0\u202f]/g, "");
  if (clean === "" && optional) return null;
  const match = clean.match(new RegExp(`^(-?)(\\d+)(?:[.,](\\d{1,${places}}))?$`));
  if (!match) throw new Error(`${label}: ange ett tal med högst ${places} decimaler, exempelvis ${places === 2 ? "1234,56" : "123,456"}.`);
  const amount = Number(match[2]) * 10 ** places + Number((match[3] || "").padEnd(places, "0"));
  if (!Number.isSafeInteger(amount) || amount > 100000000000) throw new Error(`${label}: beloppet är för stort.`);
  return match[1] === "-" ? -amount : amount;
}

class ElfakturaCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this._loaded = false;
    this._busy = false;
    this._editing = null;
    this._request = null;
    this._dirty = false;
  }
  setConfig(config) { this._config = config; }
  getCardSize() { return 12; }
  set hass(value) {
    const reconnect = this._hass && this._hass.connection !== value.connection;
    this._hass = value;
    if (!this._rendered) this.render();
    this.shadowRoot.querySelector("#form-fields").disabled = !value.user?.is_admin || this._busy;
    this.shadowRoot.querySelector("#readonly").hidden = Boolean(value.user?.is_admin);
    if (!this._loaded || reconnect) this.load();
  }
  connectedCallback() { if (this._hass && !this._loaded) this.load(); }
  field(id) { return this.shadowRoot.querySelector(`#${id}`); }
  message(text, error = false) {
    this.field("message").textContent = text;
    this.field("message").className = error ? "message error" : "message";
  }
  async api(type, data = {}) { return this._hass.callWS({type: `elfaktura/${type}`, ...data}); }
  render() {
    this._rendered = true;
    this.shadowRoot.innerHTML = `
      <style>
        :host {display:block;color:var(--primary-text-color);font:var(--paper-font-body1_-_font-family,inherit)}
        ha-card {padding:24px;max-width:1240px;margin:auto;box-sizing:border-box}
        h1 {font-size:26px;font-weight:500;margin:0 0 8px} h2 {font-size:20px;font-weight:500;margin:0 0 16px}
        p {line-height:1.55;margin:8px 0 16px} .muted,small {color:var(--secondary-text-color)}
        .layout {display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:28px}
        .grid {display:grid;grid-template-columns:1fr 1fr;gap:14px} .wide {grid-column:1/-1}
        fieldset {border:0;padding:0;margin:0;min-width:0} label {display:flex;flex-direction:column;gap:6px;font-size:14px}
        input,select,textarea {box-sizing:border-box;width:100%;min-height:44px;padding:10px 12px;border:1px solid var(--divider-color,#aaa);border-radius:8px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#222);font:inherit}
        input:focus-visible,select:focus-visible,textarea:focus-visible,button:focus-visible {outline:2px solid var(--primary-color);outline-offset:2px}
        textarea {min-height:80px;resize:vertical} input[type=checkbox] {width:20px;min-height:20px;margin:0}
        .check {flex-direction:row;align-items:center;gap:10px} .buttons {display:flex;flex-wrap:wrap;gap:10px;margin:18px 0}
        button {min-height:42px;border-radius:8px;padding:8px 15px;border:1px solid var(--divider-color,#aaa);background:var(--card-background-color,#fff);color:var(--primary-color);font:inherit;cursor:pointer}
        button.primary {background:var(--primary-color);color:var(--text-primary-color,#fff);border-color:var(--primary-color)}
        button.danger {color:var(--error-color,#b00020)} button:disabled {opacity:.5;cursor:default}
        .message {line-height:1.5;white-space:pre-wrap;margin:12px 0;color:var(--primary-color)} .error {color:var(--error-color,#b00020)}
        details {border-top:1px solid var(--divider-color);padding-top:14px;margin-top:16px} summary {cursor:pointer;font-weight:500;margin-bottom:14px;line-height:1.5}
        .balance {border-radius:8px;padding:12px;background:var(--secondary-background-color);line-height:1.6;margin:14px 0}
        .register {margin-top:28px;padding-top:24px;border-top:1px solid var(--divider-color)} .scroll {overflow:auto}
        table {border-collapse:collapse;width:100%;font-size:14px} th,td {text-align:left;padding:12px 10px;border-bottom:1px solid var(--divider-color);white-space:nowrap}
        th {font-weight:500;color:var(--secondary-text-color)} .number {text-align:right;font-variant-numeric:tabular-nums}
        .empty {padding:24px 0;color:var(--secondary-text-color)} .history-entry {padding:10px 0;border-bottom:1px solid var(--divider-color);line-height:1.5}
        [hidden] {display:none!important} .toolbar {display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px}
        @media(max-width:850px) {.layout {grid-template-columns:1fr} ha-card {padding:18px}}
        @media(max-width:440px) {.grid {grid-template-columns:1fr}.wide {grid-column:auto}}
      </style>
      <ha-card>
        <h1>Fakturautfall</h1>
        <p class="muted">Registrera fakturan för rätt förbrukningsperiod. Uppgifterna sparas som facit för uppföljning av elprognosen.</p>
        <p id="readonly" hidden>Du kan läsa registret. En administratör kan registrera och rätta fakturor.</p>
        <div id="message" class="message" role="status" aria-live="polite"></div>
        <form id="form">
          <fieldset id="form-fields">
            <div class="layout">
              <section>
                <h2 id="form-title">Ny faktura</h2>
                <div class="grid">
                  <label>Förbrukningsmånad (fyller periodens datum)<input id="month" type="month"></label>
                  <label>Fakturatyp<select id="invoice_kind"><option value="combined">Samlingsfaktura: elhandel + elnät</option><option value="trade">Elhandel</option><option value="network">Elnät</option></select></label>
                  <label>Leverantör<input id="supplier" required maxlength="100" autocomplete="organization"></label>
                  <label>Fakturanummer<input id="invoice_number" required maxlength="100" autocomplete="off"></label>
                  <label>Period från och med<input id="period_start" type="date" required min="2000-01-01" max="2100-12-31"></label>
                  <label>Period till och med<input id="period_end" type="date" required min="2000-01-01" max="2100-12-31"></label>
                  <label>Fakturadatum<input id="issue_date" type="date" required min="2000-01-01" max="2100-12-31"></label>
                  <label>Dokument<select id="document_type"><option value="invoice">Faktura</option><option value="credit">Kreditfaktura (negativa belopp)</option></select></label>
                  <label>Fakturerad förbrukning (kWh, valfritt)<input id="energy" inputmode="decimal" placeholder="Exempel: 1234,567"></label>
                  <label>Totalbelopp inklusive moms (kr)<input id="total" inputmode="decimal" required placeholder="Exempel: 3456,78"></label>
                  <label>Moms som ingår (kr, valfritt)<input id="vat" inputmode="decimal" placeholder="Lämna tomt om ej angivet"></label>
                  <label>Varav annat än periodens el (kr inkl. moms)<input id="non_period" inputmode="decimal" placeholder="Exempel: tidigare skuld eller påminnelseavgift"></label>
                  <label class="wide">Anteckning<textarea id="notes" maxlength="2000" placeholder="Avvikande period, rabatt eller annan upplysning"></textarea></label>
                  <label id="reason-label" class="wide" hidden>Orsak till rättelse / återaktivering<textarea id="reason" maxlength="500"></textarea></label>
                </div>
              </section>
              <section>
                <h2>Fakturans poster <small>– valfritt</small></h2>
                <p class="muted">Börja med period, förbrukning och totalbelopp. Du kan komplettera posterna senare.</p>
                <label>Detaljposternas belopp är<select id="line_basis"><option value="ex_vat">Exklusive moms</option><option value="incl_vat">Inklusive moms</option></select></label>
                <div class="grid" id="items" style="margin-top:14px"></div>
                <label class="check" style="margin-top:16px"><input id="details_complete" type="checkbox">Alla poster är fördelade och ska stämma med totalbeloppet</label>
                <div id="balance" class="balance" aria-live="polite"></div>
                <small>Rabatter och krediter anges med minustecken. Moms läggs till detaljsumman endast när posterna är exklusive moms.</small>
                <details><summary>Vilket belopp jämförs med prognosen?</summary>
                  <p>Fakturans totalbelopp minus det du anger som annat än periodens el. Detta avdrag ändrar inte den registrerade fakturans totalsumma.</p>
                  <p>Om samma kWh står på både elhandel och elnät är det samma förbrukning. Den ska inte summeras två gånger. En samlingsfaktura registreras som en post.</p>
                </details>
                <details id="history-block" hidden><summary>Versionshistorik</summary><div id="history"></div></details>
              </section>
            </div>
            <div class="buttons"><button class="primary" type="submit" id="save">Spara faktura</button><button type="button" id="new">Ny / rensa formulär</button><button type="button" class="danger" id="archive" hidden>Arkivera faktura</button></div>
          </fieldset>
        </form>
        <section class="register">
          <h2>Sparade fakturor</h2>
          <div class="toolbar"><button id="refresh" type="button">Uppdatera lista</button><button id="csv" type="button">Exportera CSV</button><button id="json" type="button">Exportera JSON med historik</button><label class="check"><input id="include-archived" type="checkbox">Visa även arkiverade</label></div>
          <div id="backup-warning" class="message error" hidden>Fakturorna är sparade, men den extra säkerhetskopian kunde inte uppdateras. Kontrollera lagringen innan du fortsätter.</div>
          <div class="scroll"><table><thead><tr><th>Förbrukningsperiod</th><th>Faktura / leverantör</th><th>Typ</th><th class="number">Förbrukning</th><th class="number">Total inkl. moms</th><th class="number">Periodens el</th><th></th></tr></thead><tbody id="rows"></tbody></table></div>
          <p id="empty" class="empty" hidden>Inga fakturor registrerade ännu. Fyll i den första fakturan ovan.</p>
        </section>
      </ha-card>`;
    for (const [key, label] of Object.entries(INVOICE_ITEMS)) {
      const el = document.createElement("label");
      el.textContent = `${label} (kr)`;
      const input = document.createElement("input");
      input.id = `item_${key}`; input.inputMode = "decimal"; input.placeholder = "Ej specificerat";
      el.append(input); this.field("items").append(el);
    }
    this.field("form").addEventListener("submit", event => {event.preventDefault(); this.save();});
    this.field("form").addEventListener("input", () => {this._dirty = true; this._request = null; this.balance();});
    this.field("form").addEventListener("change", () => {this._dirty = true; this._request = null; this.balance();});
    this.field("month").addEventListener("change", () => this.monthDates());
    this.field("new").onclick = () => { if (!this._dirty || confirm("Rensa osparade ändringar och börja med en ny faktura?")) this.reset(); };
    this.field("archive").onclick = () => this.archive();
    this.field("refresh").onclick = () => this.load();
    this.field("include-archived").onchange = () => this.load();
    this.field("csv").onclick = () => this.download("csv");
    this.field("json").onclick = () => this.download("json");
    this.reset();
  }
  reset() {
    this.field("form").reset();
    const now = new Date();
    const parts = Object.fromEntries(new Intl.DateTimeFormat("sv-SE", {timeZone: "Europe/Stockholm", year: "numeric", month: "2-digit", day: "2-digit"}).formatToParts(now).map(p => [p.type, p.value]));
    const today = `${parts.year}-${parts.month}-${parts.day}`;
    const [year, month] = today.split("-").map(Number);
    const previous = new Date(Date.UTC(year, month - 2, 1));
    this.field("month").value = `${previous.getUTCFullYear()}-${String(previous.getUTCMonth() + 1).padStart(2, "0")}`;
    this.field("issue_date").value = today;
    this.field("supplier").value = "Vattenfall";
    this.field("invoice_kind").value = "combined";
    this.field("line_basis").value = "ex_vat";
    this.monthDates();
    this._editing = null; this._request = null; this._dirty = false;
    this.field("reason-label").hidden = true; this.field("reason").required = false;
    this.field("archive").hidden = true; this.field("history-block").hidden = true;
    this.field("form-title").textContent = "Ny faktura";
    this.field("save").textContent = "Spara faktura";
    this.balance();
  }
  monthDates() {
    const value = this.field("month").value;
    if (!/^\d{4}-\d{2}$/.test(value)) return;
    const [y, m] = value.split("-").map(Number);
    this.field("period_start").value = `${value}-01`;
    this.field("period_end").value = `${value}-${new Date(Date.UTC(y, m, 0)).getUTCDate()}`;
  }
  payload() {
    const items = {};
    for (const [key, label] of Object.entries(INVOICE_ITEMS)) {
      const value = scaled(this.field(`item_${key}`).value, 2, label, true);
      if (value !== null) items[key] = value;
    }
    return {
      supplier: this.field("supplier").value, invoice_number: this.field("invoice_number").value,
      invoice_kind: this.field("invoice_kind").value, document_type: this.field("document_type").value,
      period_start: this.field("period_start").value, period_end: this.field("period_end").value,
      issue_date: this.field("issue_date").value, energy_wh: scaled(this.field("energy").value, 3, "Förbrukning", true),
      total_cents: scaled(this.field("total").value, 2, "Totalbelopp"), vat_cents: scaled(this.field("vat").value, 2, "Moms", true),
      non_period_cents: scaled(this.field("non_period").value, 2, "Annat än periodens el", true) ?? 0,
      line_basis: this.field("line_basis").value, details_complete: this.field("details_complete").checked,
      notes: this.field("notes").value, items,
    };
  }
  balance() {
    try {
      const p = this.payload();
      const sum = Object.values(p.items).reduce((a, b) => a + b, 0) + (p.line_basis === "ex_vat" ? p.vat_cents ?? 0 : 0);
      const difference = p.total_cents - sum;
      this.field("balance").textContent = `Detaljsumma inkl. angiven moms: ${money(sum)} · Skillnad mot total: ${money(difference)}\nPeriodens elkostnad för jämförelse: ${money(p.total_cents - p.non_period_cents)}`;
    } catch (_) {
      this.field("balance").textContent = "Ange totalbelopp för att se summeringen. Detaljposter kan lämnas tomma.";
    }
  }
  async load() {
    if (this._loading) return;
    this._loading = true;
    try {
      const result = await this.api("list", {include_archived: this.field("include-archived").checked});
      this._loaded = true;
      this.field("backup-warning").hidden = result.backup_ok;
      this.field("csv").disabled = !this._hass.user?.is_admin;
      this.field("json").disabled = !this._hass.user?.is_admin;
      const rows = this.field("rows"); rows.replaceChildren();
      this.field("empty").hidden = result.invoices.length > 0;
      for (const r of result.invoices) {
        const tr = document.createElement("tr");
        const texts = [r.period_start + " – " + r.period_end, `${r.invoice_number} · ${r.supplier}${r.status === "archived" ? " (arkiverad)" : ""}`,
          INVOICE_KINDS[r.invoice_kind], energy(r.energy_wh), money(r.total_cents), money(r.comparison_total_cents)];
        for (const [i, value] of texts.entries()) {const td = document.createElement("td"); td.textContent = value; if (i >= 3) td.className = "number"; tr.append(td);}
        const td = document.createElement("td"); const button = document.createElement("button");
        button.type = "button"; button.textContent = "Öppna"; button.onclick = () => this.open(r.id); td.append(button); tr.append(td); rows.append(tr);
      }
    } catch (err) {this.message(err.message || "Fakturaregistret kunde inte hämtas. Försök uppdatera listan.", true);}
    finally {this._loading = false;}
  }
  async open(id) {
    if (this._busy) return;
    if (this._dirty && !confirm("Öppna fakturan och lämna osparade ändringar?")) return;
    try {
      const result = await this.api("get", {invoice_id: id});
      const r = result.invoice;
      this.reset(); this._editing = r;
      for (const key of ["supplier", "invoice_number", "invoice_kind", "document_type", "period_start", "period_end", "issue_date", "line_basis", "notes"]) this.field(key).value = r[key];
      this.field("month").value = r.period_start.slice(0, 7);
      this.field("energy").value = decimal(r.energy_wh, 3);
      this.field("total").value = decimal(r.total_cents);
      this.field("vat").value = decimal(r.vat_cents);
      this.field("non_period").value = decimal(r.non_period_cents);
      this.field("details_complete").checked = r.details_complete;
      for (const key of Object.keys(INVOICE_ITEMS)) this.field(`item_${key}`).value = decimal(r.items[key]);
      this.field("reason-label").hidden = false; this.field("reason").required = true;
      this.field("archive").hidden = r.status === "archived";
      this.field("form-title").textContent = `Faktura ${r.invoice_number} · version ${r.revision}`;
      this.field("save").textContent = r.status === "archived" ? "Återaktivera och spara" : "Spara rättelse";
      const history = this.field("history"); history.replaceChildren();
      for (const entry of result.history) {
        const div = document.createElement("div"); div.className = "history-entry";
        const description = document.createElement("div");
        const action = entry.action === "archive" ? "Arkiverad" : entry.revision === 1 ? "Registrerad" : "Rättad / återaktiverad";
        description.textContent = `Version ${entry.revision} · ${action} · ${new Date(entry.at).toLocaleString("sv-SE")}`;
        const reason = document.createElement("div"); reason.textContent = entry.reason;
        const info = document.createElement("small"); info.textContent = `${entry.invoice.period_start} – ${entry.invoice.period_end} · ${energy(entry.invoice.energy_wh)} · ${money(entry.invoice.total_cents)}`;
        div.append(description, reason, info); history.append(div);
      }
      this.field("history-block").hidden = false;
      this.balance(); this.message("Fakturan är inläst. Ange en ändringsorsak om du vill rätta eller återaktivera den.");
      this.field("form-title").scrollIntoView({behavior: "smooth", block: "start"});
    } catch (err) {this.message(err.message || "Fakturan kunde inte öppnas.", true);}
  }
  busy(value) {
    this._busy = value;
    this.field("form-fields").disabled = value || !this._hass.user?.is_admin;
  }
  async save() {
    if (this._busy || !this._hass.user?.is_admin || !this.field("form").reportValidity()) return;
    try {
      const invoice = this.payload();
      this._request ||= uuid();
      const data = {invoice, request_id: this._request};
      if (this._editing) Object.assign(data, {invoice_id: this._editing.id, expected_revision: this._editing.revision, reason: this.field("reason").value});
      this.busy(true);
      const result = await this.api("save", data);
      this.reset(); await this.load();
      this.message(`Faktura ${result.invoice.invoice_number} är sparad, version ${result.invoice.revision}.${result.backup_ok ? "" : " Den extra säkerhetskopian kunde inte uppdateras."}`, !result.backup_ok);
    } catch (err) {this.message(err.message || "Sparandet kunde inte bekräftas. Uppdatera listan innan du försöker igen.", true);}
    finally {this.busy(false);}
  }
  async archive() {
    if (this._busy || !this._editing || !this._hass.user?.is_admin) return;
    const reason = prompt("Varför ska fakturan arkiveras? Den behålls med sin historik men tas bort från aktivt utfall.");
    if (!reason?.trim()) return;
    if (this._dirty && !confirm("Osparade ändringar sparas inte. Arkivera den sparade versionen?")) return;
    try {
      this.busy(true);
      const result = await this.api("archive", {invoice_id: this._editing.id, expected_revision: this._editing.revision, request_id: uuid(), reason});
      this.reset(); await this.load();
      this.message(`Fakturan är arkiverad. Den kan öppnas och återaktiveras via Visa även arkiverade.${result.backup_ok ? "" : " Den extra säkerhetskopian kunde inte uppdateras."}`, !result.backup_ok);
    } catch (err) {this.message(err.message || "Fakturan kunde inte arkiveras.", true);}
    finally {this.busy(false);}
  }
  async download(format) {
    try {
      const file = await this.api("export", {format});
      const url = URL.createObjectURL(new Blob([file.content], {type: file.mime}));
      const a = document.createElement("a"); a.href = url; a.download = file.filename; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {this.message(err.message || "Exporten kunde inte hämtas.", true);}
  }
}
if (!customElements.get("elfaktura-card")) customElements.define("elfaktura-card", ElfakturaCard);
window.customCards = window.customCards || [];
if (!window.customCards.some(c => c.type === "elfaktura-card")) window.customCards.push({type: "elfaktura-card", name: "Fakturautfall", description: "Manuellt fakturaregister för elhandel och elnät"});
