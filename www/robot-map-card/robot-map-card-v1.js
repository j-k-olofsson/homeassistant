class RobotMapCard extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'});this.shadowRoot.innerHTML=`<style>
 :host{display:block;height:100%}ha-card{height:100%;min-height:118px;box-sizing:border-box;background:linear-gradient(145deg,#263a49,#1b2937);border:1px solid rgba(158,185,203,.20);border-radius:12px;overflow:hidden}
 button{width:100%;min-height:116px;height:100%;padding:12px 4px;border:0;background:none;color:#eef4f8;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;font:inherit}button:disabled{cursor:wait}button:focus-visible{outline:2px solid #64b5c6;outline-offset:-4px;border-radius:12px}ha-icon{--mdc-icon-size:32px;color:var(--state-icon-color,#44739e)}.name{font-size:12px;font-weight:500}.state{font-size:11px;color:#bdcbd5;line-height:1.3}.busy ha-icon{color:#64b5c6;animation:spin 1.4s linear infinite}.error .state{color:#ffbf69}@keyframes spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.busy ha-icon{animation:none}}
 </style><ha-card><button type="button"><ha-icon icon="mdi:robot-vacuum"></ha-icon><span class="name">Robotkarta</span><span class="state" role="status" aria-live="polite"></span></button></ha-card>`;this.shadowRoot.querySelector('button').addEventListener('click',()=>this.change());}
 setConfig(c){if(!c.entity)throw Error('entity krävs');this.config=c;this.render();}
 set hass(h){this._hass=h;if(this.pending&&h.states[this.config?.entity]?.state===this.pending){this.pending=null;this.error=null;clearTimeout(this.timer);}this.render();}
 getCardSize(){return 2;}
 getGridOptions(){return {columns:3,rows:'auto'};}
 async change(){
  if(this.pending)return;
  const e=this._hass?.states[this.config.entity];const target=e?.state==='Hela huset'?'Verandan':e?.state==='Verandan'?'Hela huset':null;
  if(!target||!e.attributes.options?.includes(target))return;
  this.pending=target;this.error=null;this.render();
  this.timer=setTimeout(()=>{if(this.pending===target){this.pending=null;this.error='Ej bekräftat';this.render();}},20000);
  try{await this._hass.callService('select','select_option',{entity_id:this.config.entity,option:target});}
  catch(err){if(this.pending===target){clearTimeout(this.timer);this.pending=null;this.error='Kunde inte växla';this.render();}}
 }
 render(){
  const e=this._hass?.states[this.config?.entity];const available=['Hela huset','Verandan'].includes(e?.state);
  const b=this.shadowRoot.querySelector('button');b.disabled=!!this.pending||!available;b.className=this.pending?'busy':this.error?'error':'';
  b.setAttribute('aria-busy',String(!!this.pending));b.title=this.pending?'Växlar till '+this.pending:this.error?'Kartbytet bekräftades inte. Kontrollera robotens anslutning.':'Växla robotens karta';
  this.shadowRoot.querySelector('.state').textContent=this.pending?'Växlar…':this.error|| (available?e.state:'Ej tillgänglig');
  this.shadowRoot.querySelector('ha-icon').setAttribute('icon',this.pending?'mdi:loading':'mdi:robot-vacuum');
 }
}
customElements.define('robot-map-card',RobotMapCard);
