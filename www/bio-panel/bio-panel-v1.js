// NSPanel layout, using Home Assistant's native tile controls.
class BioPanelCard extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this.cards=[]; }
  setConfig(config) {
    if (!Array.isArray(config.cards) || config.cards.length !== 5) throw new Error('Bio-panelen kräver fem kort.');
    this.config=config;
    this.renderCards();
  }
  set hass(hass) { this._hass=hass; this.cards.forEach(card=>card.hass=hass); }
  getCardSize() { return 8; }
  async renderCards() {
    const helpers=await window.loadCardHelpers();
    this.shadowRoot.innerHTML=`<style>
      :host {display:block;background:#101216;color:#F1F3F5;
        --primary-text-color:#F1F3F5;--secondary-text-color:#B8BEC8;
        --primary-background-color:#101216;--card-background-color:#1C2026;
        --ha-card-background:#1C2026;--ha-card-border-color:#343A43;
        --ha-card-border-radius:12px;--ha-card-box-shadow:none;
        --state-light-active-color:#E6B875;--state-switch-active-color:#86B8A0;
        --amber-color:#E6B875;--green-color:#86B8A0;--disabled-color:#A6AFBC;
        --primary-color:#E6B875;--accent-color:#E6B875;--control-height:48px;
      }
      .panel {box-sizing:border-box;width:100%;max-width:480px;height:min(100dvh,480px);
        min-height:300px;margin:auto;padding:12px;display:grid;gap:8px;
        grid-template-rows:0.82fr 1fr 1fr;}
      .top {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;min-height:0;}
      @media (max-height:420px) {.panel {padding:8px;gap:6px;grid-template-rows:0.82fr 1fr 1fr;} .top {gap:6px;}}
      hui-tile-card {display:block;min-width:0;min-height:0;height:100%;}
    </style><div class="panel"><div class="top"></div></div>`;
    const panel=this.shadowRoot.querySelector('.panel'),top=this.shadowRoot.querySelector('.top');
    this.cards=this.config.cards.map((config,index)=>{
      const card=helpers.createCardElement(config);
      if(this._hass)card.hass=this._hass;
      (index<3?top:panel).append(card);
      // Wait for the native card to render before applying this dashboard's sizing.
      customElements.whenDefined('hui-tile-card').then(async()=>{
        await card.updateComplete;
        const style=document.createElement('style');
        style.textContent=`ha-card {height:100%;box-sizing:border-box;border:1px solid #343A43;
          background:#1C2026;border-radius:12px;box-shadow:none;--ha-tile-icon-size:48px;
          --ha-tile-info-primary-font-size:16px;--ha-tile-info-secondary-font-size:14px;}
          ha-card:active {border-color:#E6B875;}
          ha-tile-container {height:100%;box-sizing:border-box;}
          ha-tile-info {min-width:0;} hui-card-features {--feature-height:48px;}`;
        card.shadowRoot.append(style);
        const container=card.shadowRoot.querySelector('ha-tile-container');
        await container.updateComplete;
        const compact=document.createElement('style');
        compact.textContent='@media (max-height:420px) {.content {min-height:44px !important;} .content.vertical {padding:2px 6px !important; gap:0 !important;} ::slotted([slot="features"]) {padding:0 8px 8px !important;}}';
        container.shadowRoot.append(compact);
      });
      return card;
    });
  }
}
customElements.define('bio-panel-card',BioPanelCard);
