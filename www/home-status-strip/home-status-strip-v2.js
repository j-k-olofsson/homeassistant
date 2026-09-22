class HomeStatusStrip extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'});}
 setConfig(config){
  this.config=config;
  this.shadowRoot.innerHTML=`<style>
  :host{display:block}ha-card{padding:4px 12px;background:linear-gradient(120deg,#29434a,#1e3039);border:1px solid rgba(158,185,203,.20);border-radius:12px;box-sizing:border-box}
  .items{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:2px 22px}
  button{border:0;background:none;display:inline-flex;align-items:center;gap:7px;padding:6px 0;min-height:32px;font:inherit;font-size:12px;color:var(--primary-text-color);cursor:pointer;white-space:nowrap}
  button:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:4px}
  ha-icon{--mdc-icon-size:20px;color:var(--indicator,#8da6b6);display:inline-block;transform-origin:center}
  .attention{--indicator:#e8b841}.good{--indicator:#66bb6a}.unknown{--indicator:#e8b841;color:var(--secondary-text-color)}
  .change ha-icon{animation:status-change .65s ease-in-out 2}
  .moving ha-icon{animation:status-change 1.5s ease-in-out infinite}
  @keyframes status-change{0%,100%{transform:rotate(0)}25%{transform:rotate(-14deg)}75%{transform:rotate(14deg)}}
  @media(prefers-reduced-motion:reduce){.change ha-icon,.moving ha-icon{animation:none}}
  </style><ha-card><div class="items"></div></ha-card>`;
  const items=this.shadowRoot.querySelector('.items');
  this.rows=config.entities.map(item=>{
   const row=document.createElement('button');row.type='button';row.innerHTML='<ha-icon></ha-icon><span></span>';
   row.addEventListener('click',()=>this.dispatchEvent(new CustomEvent('hass-more-info',{bubbles:true,composed:true,detail:{entityId:item.entity}})));
   row.addEventListener('animationend',()=>row.classList.remove('change'));
   items.appendChild(row);return {item,row,icon:row.querySelector('ha-icon'),label:row.querySelector('span'),last:null};
  });if(this._hass)this.update(this._hass.states);
 }
 static describe(kind,state){
  const s=state?.state;const a=state?.attributes||{};const lower=(s||'').toLowerCase();
  const names={post:'Post',waste:'Hämtning',lock:'Ytterdörr',door:'Veranda',cover:'Lucka'};
  if(!s||['unknown','unavailable'].includes(s))return {text:names[kind]+' · status saknas',icon:'mdi:help-circle-outline',tone:'unknown'};
  if(kind==='post'||kind==='waste')return {text:names[kind]+' '+lower,icon:kind==='post'?'mdi:email-outline':'mdi:trash-can-outline',tone:(lower==='idag'||kind==='waste'&&lower==='imorgon')?'attention':'',notify:lower==='idag'||kind==='waste'&&lower==='imorgon'};
  if(kind==='lock')return {text:({locked:'Låst',unlocked:'Olåst',locking:'Låser',unlocking:'Låser upp',jammed:'Låsfel'})[s]||'Lås · '+s,icon:s==='locked'?'mdi:lock-outline':'mdi:lock-open-outline',tone:s==='locked'?'good':'attention',moving:['locking','unlocking'].includes(s)};
  if(kind==='door')return {text:'Veranda '+lower,icon:lower==='stängd'?'mdi:door-sliding':'mdi:door-sliding-open',tone:lower==='stängd'?'':'attention',notify:true};
  return {text:'Lucka '+({open:'öppen',closed:'stängd',opening:'öppnas',closing:'stängs'}[s]||s),icon:s==='closed'?'mdi:garage':'mdi:garage-open',tone:'',moving:!a.assumed_state&&['opening','closing'].includes(s),assumed:!!a.assumed_state};
 }
 set hass(h){this._hass=h;if(this.rows)this.update(h.states);}
 update(states){this.rows.forEach(r=>{
  const state=states[r.item.entity];const d=HomeStatusStrip.describe(r.item.kind,state);
  const key=JSON.stringify(d);if(r.last===key)return;
  const changed=r.last!==null;r.last=key;
  r.row.className=d.tone||'';
  if(d.moving)r.row.classList.add('moving');
  else if(changed&&d.notify)r.row.classList.add('change');
  r.icon.setAttribute('icon',d.icon);r.label.textContent=d.text;
  r.row.title=d.text+(d.assumed?' · Rapporterat/antaget läge, inte bekräftat av lägesgivare':'')+' · Visa information';
  r.row.setAttribute('aria-label',r.row.title);
 });}
 getCardSize(){return 1;}
 getGridOptions(){return {columns:'full'};}
}
if(!customElements.get('home-status-strip'))customElements.define('home-status-strip',HomeStatusStrip);
