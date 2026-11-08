class FeedbackControlCard extends HTMLElement {
 constructor(){
  super();this.attachShadow({mode:'open'});this.shadowRoot.innerHTML=`<style>
  :host{display:block;height:100%}ha-card{height:100%;min-height:118px;box-sizing:border-box;background:linear-gradient(145deg,#263a49,#1b2937);border:1px solid rgba(158,185,203,.20);border-radius:12px;overflow:hidden}
  button{position:relative;width:100%;min-height:116px;height:100%;padding:12px 4px;border:0;background:none;color:#eef4f8;display:grid;grid-template-rows:32px 16px 28px;align-content:center;justify-items:center;gap:4px;cursor:pointer;font:inherit;touch-action:manipulation;-webkit-user-select:none;user-select:none}
  button[aria-disabled=true]{cursor:default}button:focus-visible{outline:2px solid #64b5c6;outline-offset:-4px;border-radius:12px}ha-icon{--mdc-icon-size:32px;color:var(--state-icon-color,#44739e)}
  .name{font-size:12px;font-weight:500;line-height:16px}.info::after{content:'ⓘ';position:absolute;top:5px;right:6px;font-size:11px;color:#bdcbd5}.state{font-size:11px;color:#bdcbd5;line-height:14px;text-align:center;white-space:pre-line}.active ha-icon{color:#ffc107}.pending ha-icon{color:#64b5c6;animation:spin 1.4s linear infinite}.working ha-icon{color:#64b5c6;animation:robot 2s ease-in-out infinite}.error .state{color:#ffbf69}.fan ha-icon{animation:spin 3s linear infinite}.charging ha-icon{animation:charge 1.4s ease-in-out infinite}.led.active{box-shadow:inset 0 0 0 1000px rgba(255,193,7,.09)}
  .presence ha-icon{visibility:hidden}.presence::before{content:'';position:absolute;top:calc(50% - 44px);left:calc(50% - 18px);width:36px;height:36px;background:var(--state-icon-color,#44739e);-webkit-mask:url('/local/dashboard-icons/presence-off-v1.svg') center/36px no-repeat;mask:url('/local/dashboard-icons/presence-off-v1.svg') center/36px no-repeat}
  .presence.active::before{background:center/36px no-repeat url('/local/dashboard-icons/presence-on-v1.svg');mask:none;-webkit-mask:none}.presence.pending::before{display:none}.presence.pending ha-icon{visibility:visible}
  @keyframes spin{to{transform:rotate(360deg)}}@keyframes robot{0%,100%{transform:translateX(-5px) rotate(-10deg)}50%{transform:translateX(5px) rotate(10deg)}}@keyframes charge{0%,100%{transform:translateY(3px)}50%{transform:translateY(-3px)}}
  @media(prefers-reduced-motion:reduce){ha-icon{animation:none!important}}
  </style><ha-card><button type="button"><ha-icon></ha-icon><span class="name"></span><span class="state" role="status" aria-live="polite"></span></button></ha-card>`;
  const b=this.shadowRoot.querySelector('button');
  b.addEventListener('click',()=>{if(this.held){this.held=false;return;}this.change();});
  b.addEventListener('pointerdown',()=>{this.held=false;this.holdTimer=setTimeout(()=>{this.held=true;this.details();},550);});
  for(const event of ['pointerup','pointerleave','pointercancel'])b.addEventListener(event,()=>clearTimeout(this.holdTimer));
  b.addEventListener('contextmenu',e=>{e.preventDefault();clearTimeout(this.holdTimer);if(!this.held)this.details();this.held=true;});
 }
 setConfig(c){if(!c.entity)throw Error('entity krävs');this.config=c;this.render();}
 set hass(h){if(this.connection!==h.connection){if(this.connection){this.connection.removeEventListener('disconnected',this.onConnection);this.connection.removeEventListener('ready',this.onConnection);}this.connection=h.connection;this.onConnection=()=>this.render();this.connection?.addEventListener('disconnected',this.onConnection);this.connection?.addEventListener('ready',this.onConnection);}this._hass=h;if(this.pending&&h.states[this.config?.entity]?.state===this.pending.target){clearTimeout(this.timer);this.pending=null;this.error=null;}this.render();}
 getCardSize(){return 2;}getGridOptions(){return{columns:3,rows:'auto'};}
 details(){this.dispatchEvent(new CustomEvent('hass-more-info',{bubbles:true,composed:true,detail:{entityId:this.config.entity}}));}
 robotStatus(){
  if(this.config.kind!=='map')return null;
  const h=this._hass?.states||{},v=h['vacuum.max']?.state,s=h['sensor.max_status']?.state,r=h['binary_sensor.max_stadar']?.state;
  if(!v||!s||!r||['unknown','unavailable'].includes(v)||['unknown','unavailable','device_offline'].includes(s)||['unknown','unavailable'].includes(r))return{blocked:true,label:'Status saknas',moving:false};
  if(v==='paused'||s==='paused')return{blocked:true,label:'Pausad',moving:false};
  if(v==='returning'||['returning_home','docking'].includes(s))return{blocked:true,label:'Återvänder',moving:true};
  if(r==='on'||v==='cleaning'||['starting','cleaning','spot_cleaning','zoned_cleaning','segment_cleaning','robot_status_mopping','segment_mopping','zoned_mopping'].includes(s))return{blocked:true,label:'Städar',moving:true};
  if(['docked','idle'].includes(v)&&['charging','charging_complete','idle'].includes(s))return{blocked:false};
  return{blocked:true,label:['error','charging_problem'].includes(s)?'Kontrollera roboten':'Robot upptagen',moving:!['error','charging_problem','locked','shutting_down','updating'].includes(s)};
 }
 async change(){
  if(this.pending||this.robotStatus()?.blocked||this.connection?.connected===false)return;
  if(this.config.kind==='info'){this.details();return;}
  const e=this._hass?.states[this.config.entity],kind=this.config.kind;let target,domain,service,data={entity_id:this.config.entity};
  if(kind==='map'){
   target=e?.state==='Hela huset'?'Verandan':e?.state==='Verandan'?'Hela huset':null;
   if(!target||!e.attributes.options?.includes(target))return;domain='select';service='select_option';data.option=target;
  }else if(kind==='climate'){
   if(!['off','heat_cool'].includes(e?.state))return;target=e.state==='off'?'heat_cool':'off';domain='climate';service='set_hvac_mode';data.hvac_mode=target;
  }else{
   if(!['on','off'].includes(e?.state))return;target=e.state==='on'?'off':'on';domain=this.config.entity.split('.')[0];service=target==='on'?'turn_on':'turn_off';
  }
  const token={target};this.pending=token;this.error=null;this.render();
  this.timer=setTimeout(()=>{if(this.pending===token){this.pending=null;this.error='Ej bekräftat';this.render();}},kind==='map'?20000:45000);
  try{await this._hass.callService(domain,service,data);}catch(err){if(this.pending===token){clearTimeout(this.timer);this.pending=null;this.error='Kommandot misslyckades';this.render();}}
 }
 render(){
  if(!this.config)return;
  const e=this._hass?.states[this.config.entity],robot=this.robotStatus(),active=e?.state==='on'||e?.state==='heat_cool';
  const available=this.connection?.connected!==false&&e&&!['unknown','unavailable'].includes(e.state);const b=this.shadowRoot.querySelector('button');
  const spinning=(this.config.kind==='climate'||this.config.entity==='switch.poolpump_utomhus_esphome27_relay_state')&&active&&available,charging=this.config.kind==='charging'&&active&&this._hass?.states['sensor.sef_42h_charging_status']?.state==='charging';
  b.className=[active?'active':'',this.config.kind==='info'?'info':'',this.config.kind==='presence'?'presence':'',this.config.kind==='led'?'led':'',this.pending?'pending':robot?.moving?'working':spinning?'fan':charging?'charging':'',this.error?'error':''].join(' ');
  b.setAttribute('aria-disabled',String(!!this.pending||!!robot?.blocked||!available));b.setAttribute('aria-busy',String(!!this.pending));
  const base=this.config.kind==='info'?({'on':'På','off':'Av','closed':'Stängd','open':'Öppen','opening':'Öppnar','closing':'Stänger'}[e?.state]||e?.state):this.config.kind==='map'?e?.state:this.config.kind==='climate'?(active?'Värme/Kyla':'Av'):(active?'På':'Av');
  const label=!available?'Kontakt saknas':this.pending?(this.config.kind==='map'?'Växlar…':this.pending.target==='off'?'Stänger av…':'Aktiverar…'):robot?.blocked?robot.label:this.error||(!available?'Ej tillgänglig':base);
  this.shadowRoot.querySelector('.name').textContent=this.config.name||'Robotkarta';this.shadowRoot.querySelector('.state').textContent=label+(this.config.kind==='map'&&(robot?.blocked||this.pending)&&['Hela huset','Verandan'].includes(e?.state)?'\n'+e.state:'');
  this.shadowRoot.querySelector('ha-icon').setAttribute('icon',this.pending?'mdi:loading':this.config.icon||'mdi:robot-vacuum');
  b.title=(this.config.kind==='info'?'Tryck för detaljer. ':robot?.blocked?robot.label+' – kartbyte spärrat. Vald karta: '+(e?.state||'okänd')+'. ':this.pending?'Inväntar bekräftelse. ':'Tryck för att växla. ')+'Håll in för detaljer.';
 }
}
customElements.define('feedback-control-card',FeedbackControlCard);
