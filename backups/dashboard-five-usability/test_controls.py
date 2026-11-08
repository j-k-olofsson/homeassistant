from pathlib import Path
import quickjs
q=quickjs.Context()
q.eval('''
var nodes={},timers=[],events=[];
function setTimeout(f){timers.push(f);return timers.length-1}function clearTimeout(i){timers[i]=null}
class CustomEvent{constructor(type,options){this.type=type;this.detail=options.detail}}
class HTMLElement{attachShadow(){this.shadowRoot={querySelector:s=>nodes[s]||(nodes[s]={addEventListener(){},setAttribute(){}})}}dispatchEvent(e){events.push(e)}}
var customElements={define(n,c){globalThis.Card=c}};
function assert(t,m){if(!t)throw Error(m)}
''')
q.eval(Path('/homeassistant/www/feedback-control-card/feedback-control-card-v1.js').read_text())
q.eval('''
var c=new Card(),calls=[];
c.setConfig({entity:'select.map',kind:'map'});
function h(map='Hela huset',v='docked',s='charging',r='off'){return{states:{'select.map':{state:map,attributes:{options:['Hela huset','Verandan']}},'vacuum.max':{state:v},'sensor.max_status':{state:s},'binary_sensor.max_stadar':{state:r}},callService:async(...a)=>calls.push(a)}}
c.hass=h();c.change();c.change();assert(calls.length===1&&c.pending.target==='Verandan','pending / double tap');
assert(nodes['.state'].textContent==='Växlar…','immediate feedback');
c.hass=h();assert(!!c.pending,'no early confirmation');c.hass=h('Verandan');assert(!c.pending,'confirmed');
c.change();assert(c.pending.target==='Hela huset','reverse');timers[c.timer]();assert(!c.pending&&c.error==='Ej bekräftat','timeout');
for(const [v,s,r] of [['cleaning','cleaning','on'],['paused','paused','off'],['returning','returning_home','off'],['idle','segment_cleaning','off'],['idle','mapping','off'],['unavailable','device_offline','unavailable']]){
 c.hass=h('Hela huset',v,s,r);let n=calls.length;c.change();assert(calls.length===n&&c.robotStatus().blocked,'block '+s);
 if(['cleaning','returning_home','segment_cleaning','mapping'].includes(s))assert(c.robotStatus().moving,'motion '+s);
}
c.hass=h();assert(!c.robotStatus().blocked,'available again');
c._hass.callService=async()=>{throw Error('network')};c.change();
''')
while q.execute_pending_job():pass
q.eval("assert(!c.pending&&c.error==='Kommandot misslyckades','service error');c.details();assert(events[0].type==='hass-more-info','details')")
q.eval('''
for(const [kind,entity,state,target,domain,service] of [['climate','climate.car','off','heat_cool','climate','set_hvac_mode'],['climate','climate.car','heat_cool','off','climate','set_hvac_mode'],['charging','switch.charger','off','on','switch','turn_on'],['led','light.led','on','off','light','turn_off'],['presence','input_boolean.presence','off','on','input_boolean','turn_on']]){
 c=new Card();c.setConfig({kind,entity});c.hass={states:{[entity]:{state}},callService:async(...a)=>calls.push(a)};c.change();assert(c.pending.target===target,'target '+kind);let call=calls[calls.length-1];assert(call[0]===domain&&call[1]===service,'service '+kind);c.hass={...c._hass,states:{[entity]:{state:target}}};assert(!c.pending,'confirmed '+kind);
}
''')
while q.execute_pending_job():pass
print('PASS: feedback, double taps, both map directions, cleaning/pause/return/mapping/offline locks, motion, recovery, timeout, errors, details, and control targets. No device actions sent.')
