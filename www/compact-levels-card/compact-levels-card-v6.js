class CompactLevelsCard extends HTMLElement {
  constructor() { super(); this.attachShadow({mode: 'open'}); }
  setConfig(config) {
    if (!Array.isArray(config.entities) || !config.entities.length) throw new Error('entities required');
    this.config = config;
    this._order = null;
    this.shadowRoot.innerHTML = `<style>
      :host{display:block;height:100%;box-sizing:border-box}ha-card{background:linear-gradient(145deg,#263a49,#1b2937) !important;border:1px solid rgba(158,185,203,.20);border-radius:12px;min-height:118px;padding:8px 10px;box-sizing:border-box;height:100%;display:flex;flex-direction:column;justify-content:space-between}
      button{flex-shrink:0;display:grid;grid-template-columns:90px minmax(20px,1fr) 40px;align-items:center;gap:8px;width:100%;height:20px;padding:0;border:0;background:none;color:var(--primary-text-color);font:inherit;font-size:11px;text-align:left;cursor:pointer}
      button:focus-visible{outline:2px solid var(--primary-color);outline-offset:1px}
      .name{white-space:nowrap}.value{text-align:right;font-variant-numeric:tabular-nums}
      .track{height:6px;background:var(--divider-color,#444);border-radius:4px;overflow:hidden}
      .fill{height:100%;width:100%;transform-origin:left;transform:scaleX(0);border-radius:4px;transition:transform 1.2s ease,background-color 1.2s ease}
      .critical .value::before{content:"!";display:inline-block;color:#e45b4f;font-weight:bold;margin-right:3px;animation:low-level 2s ease-in-out infinite}
      @keyframes low-level{0%,30%,100%{transform:rotate(0deg)}10%{transform:rotate(-20deg)}20%{transform:rotate(20deg)}}
      @media(prefers-reduced-motion:reduce){.fill{transition:none}.critical .value::before{animation:none}}
    </style><ha-card></ha-card>`;
    const card = this.shadowRoot.querySelector('ha-card');
    this.rows = config.entities.map(item => {
      const row = document.createElement('button'); row.type = 'button';
      row.innerHTML = '<span class="name"></span><span class="track"><span class="fill" style="display:block"></span></span><span class="value"></span>';
      row.querySelector('.name').textContent = item.name;
      row.addEventListener('click', () => this.dispatchEvent(new CustomEvent('hass-more-info',{bubbles:true,composed:true,detail:{entityId:item.entity}})));
      card.appendChild(row);
      return {item,row,fill:row.querySelector('.fill'),value:row.querySelector('.value')};
    });
    if (this._hass) this.updateStates(this._hass.states);
  }
  set hass(hass) { if(this.connection!==hass.connection){if(this.connection){this.connection.removeEventListener('disconnected',this.onConnection);this.connection.removeEventListener('ready',this.onConnection);}this.connection=hass.connection;this.onConnection=()=>this.updateStates(this._hass.states);this.connection?.addEventListener('disconnected',this.onConnection);this.connection?.addEventListener('ready',this.onConnection);}this._hass = hass; this.updateStates(hass.states); }
  updateStates(states) {
    if (!this.rows) return;
    this.rows.forEach(({item,row,fill,value}) => {
      const state = states[item.entity];
      const raw = this.connection?.connected===false ? 'unavailable' : state ? state.state : 'unavailable';
      if (row.dataset.last === raw) return;
      row.dataset.last = raw;
      const n = Number(raw);
      const valid = raw !== '' && Number.isFinite(n) && n >= 0 && n <= 100;
      const critical = valid && n < item.warning;
      const color = !valid ? 'var(--disabled-text-color,#888)' : critical ? '#e45b4f' : n < item.good ? '#e8b841' : '#64b5c6';
      value.textContent = valid ? Math.round(n) + ' %' : '—';
      fill.style.transform = 'scaleX(' + (valid ? n / 100 : 0) + ')';
      fill.style.backgroundColor = color;
      row.classList.toggle('critical', critical);
      const status = !valid ? (this.connection?.connected===false?'kontakt saknas':'värde saknas') : critical ? 'kritiskt låg nivå' : n < item.good ? 'låg nivå' : '';
      row.setAttribute('aria-label', item.name + ': ' + value.textContent + (status ? ', ' + status : ''));
      row.title = item.name + ': ' + value.textContent + (status ? ' · ' + status : '') + ' · Visa historik';
    });
    const sorted = this.rows.map((entry, index) => {
      const raw = states[entry.item.entity]?.state;
      const n = Number(raw);
      const valid = raw !== undefined && raw !== '' && Number.isFinite(n) && n >= 0 && n <= 100;
      return {entry, index, level: valid ? n : Infinity};
    }).sort((a, b) => (a.level - b.level) || (a.index - b.index));
    const order = sorted.map(x => x.index).join(',');
    if (order !== this._order) {
      const focused = this.shadowRoot.activeElement;
      const card = this.shadowRoot.querySelector('ha-card');
      sorted.forEach(x => card.appendChild(x.entry.row));
      this._order = order;
      if (focused) focused.focus({preventScroll: true});
    }
  }
  getCardSize() { return 2; }
  getGridOptions() { return {columns:12,min_columns:9}; }
}
if (!customElements.get('compact-levels-card')) customElements.define('compact-levels-card', CompactLevelsCard);
