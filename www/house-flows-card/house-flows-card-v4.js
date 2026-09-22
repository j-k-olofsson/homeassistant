class HouseFlowsCard extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'});}
 setConfig(c){
  this.config=c;
  this.shadowRoot.innerHTML=`<style>
  :host{display:block}ha-card{padding:8px 12px;box-sizing:border-box}
  .title{font-size:12px;font-weight:500;margin-bottom:10px;color:var(--secondary-text-color)}
  button{font:inherit;color:var(--primary-text-color);display:grid;grid-template-columns:52px minmax(20px,1fr) max-content;gap:10px;align-items:center;width:100%;background:none;border:0;height:24px;padding:0;text-align:left;cursor:pointer}
  button:focus-visible{outline:2px solid var(--primary-color)}
  .name{font-size:12px;display:flex;align-items:center;gap:6px}ha-icon{--mdc-icon-size:19px;color:var(--flow)}
  .track{position:relative;height:20px;margin:0 4px}
  .track:before{content:'';position:absolute;top:9px;left:0;right:0;height:2px;background:var(--flow);opacity:.3}
  .dot{position:absolute;top:7px;left:0;width:6px;height:6px;border-radius:50%;background:var(--flow);box-shadow:0 0 5px var(--flow);animation:flow var(--duration,5s) linear infinite;animation-direction:var(--direction,normal)}
  .dot.second{animation-delay:calc(var(--duration,5s) * -.5)}
  .value{text-align:right;font-size:13px;font-variant-numeric:tabular-nums;white-space:nowrap}.detail{display:inline;font-size:10px;color:var(--secondary-text-color);margin-left:6px}
  .still .dot{display:none}.missing .track:before{background:var(--disabled-text-color);opacity:.4}
  @keyframes flow{from{left:0;transform:translateX(-50%)}to{left:100%;transform:translateX(-50%)}}
  @media(prefers-reduced-motion:reduce){.dot{animation:none;left:50%}.dot.second{display:none}}
  </style><ha-card></ha-card>`;
  const card=this.shadowRoot.querySelector('ha-card');
  this.rows=[['power','El','mdi:transmission-tower','#64b5c6'],['download','Ned','mdi:download','#66b7ff'],['upload','Upp','mdi:upload','#be9aee']].map(([key,name,icon,color])=>{
   const row=document.createElement('button');row.type='button';row.style.setProperty('--flow',color);
   row.innerHTML=`<span class="name"><ha-icon></ha-icon><span></span></span><span class="track"><i class="dot"></i></span><span class="value"><span class="number"></span><span class="detail"></span></span>`;
   row.querySelector('ha-icon').setAttribute('icon',icon);row.querySelector('.name span').textContent=name;
   row.addEventListener('click',()=>this.dispatchEvent(new CustomEvent('hass-more-info',{bubbles:true,composed:true,detail:{entityId:this.config[key]}})));
   card.appendChild(row);return {key,row,number:row.querySelector('.number'),detail:row.querySelector('.detail')};
  });if(this._hass)this.update(this._hass.states);
 }
 set hass(h){this._hass=h;if(this.rows)this.update(h.states);}
 static reading(state,factor=1){const raw=state?.state;const n=Number(raw);return raw!==undefined&&raw!==''&&Number.isFinite(n)?n*factor:null;}
 static duration(value,max){return 8-6.5*Math.min(1,Math.log1p(Math.max(0,value))/Math.log1p(max));}
 update(states){
  const wan=states[this.config.connection]?.state;
  this.rows.forEach(({key,row,number,detail})=>{
   const sensor=states[this.config[key]];let value=HouseFlowsCard.reading(sensor);
   const power=key==='power';
   if(power){const unit=sensor?.attributes?.unit_of_measurement;if(unit==='W'&&value!==null)value/=1000;else if(unit!=='kW')value=null;}
   else{if(value!==null)value*=this.config.rate_factor??1;if(value!==null&&value<0)value=null;if(wan!=='on')value=null;}
   const valid=value!==null;const magnitude=valid?Math.abs(value):0;const active=valid&&magnitude>0;
   row.classList.toggle('still',!active);row.classList.toggle('missing',!valid);
   row.style.setProperty('--duration',HouseFlowsCard.duration(power?magnitude*1000:magnitude,power?16000:500).toFixed(2)+'s');
   row.style.setProperty('--direction',key==='download'||power&&value<0?'reverse':'normal');
   number.textContent=valid?magnitude.toLocaleString('sv-SE',{minimumFractionDigits:1,maximumFractionDigits:1})+(power?' kW':' Mbit/s'):'—';
   detail.textContent=!valid?(power?'Värde saknas':wan==='off'?'WAN frånkopplad':'Trafikdata saknas'):power?(value<0?'→ Elnät':'→ Hem'):(magnitude/500*100).toLocaleString('sv-SE',{maximumFractionDigits:1})+' %';
   row.title=power?'Visa elhistorik':'Abonnemang 500 Mbit/s per riktning · Visa trafikhistorik';
   row.setAttribute('aria-label',(power?'El':key==='download'?'Nedladdning':'Uppladdning')+': '+number.textContent+', '+detail.textContent);
  });
 }
 getCardSize(){return 2;}
 getGridOptions(){return {columns:12,min_columns:9};}
}
if(!customElements.get('house-flows-card'))customElements.define('house-flows-card',HouseFlowsCard);
