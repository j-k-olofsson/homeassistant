
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const classes={};class HTMLElement{attachShadow(){return this.shadowRoot={};}}
const ctx={HTMLElement,customElements:{define:(name,klass)=>classes[name]=klass},window:{customCards:[]},console};
for(const path of ['/config/www/openwrt-network-map/openwrt-network-map.js','/config/www/thread-network-map/thread-network-map.js','/config/www/kuma-status/kuma-status-v5.js']){
 const code=fs.readFileSync(path,'utf8');new vm.Script(code,{filename:path});vm.runInNewContext(code,ctx);
}
const id='device_tracker.test',mac='aa:bb:cc:dd:ee:ff';
const state={entity_id:id,state:'home',attributes:{mac,host_name:'Host',connected_ap:'ap.test',signal_strength:-60}};
const Open=classes['openwrt-network-map-card'];const open=new Open();let calls=0;
open._hass={states:{[id]:state},formatEntityName:s=>{assert.strictEqual(s,state);calls++;return 'Modern Name';}};
assert.strictEqual(open._collectClients()[0].name,'Modern Name');assert(calls>0);
open._registryNames.set(mac,{name:'Mitt egna enhetsnamn'});assert.strictEqual(open._collectClients()[0].name,'Mitt egna enhetsnamn');
open._registryNames.clear();delete open._hass.formatEntityName;assert.strictEqual(open._collectClients()[0].name,'Host');
open._entityRegistry.set(id,{name:'Mitt entitetsnamn'});assert.strictEqual(open._collectClients()[0].name,'Mitt entitetsnamn');
console.log('OpenWrt: public formatter used; explicit registry names and fallback retained.');
const Thread=classes['thread-network-map'];const thread=new Thread();const addr='0011223344556677';
const ts={entity_id:'sensor.ext_address',state:addr,attributes:{}};
thread._hass={states:{[ts.entity_id]:ts},entities:{},devices:{},formatEntityName:s=>{assert.strictEqual(s,ts);return 'Modern Thread Name';}};
assert.strictEqual(thread.nameFor({ext_address:addr}),'Modern Thread Name');
thread._hass.entities[ts.entity_id]={device_id:'dev'};thread._hass.devices.dev={name_by_user:'Mitt Thread-namn',name:'Default'};
assert.strictEqual(thread.nameFor({ext_address:addr}),'Mitt Thread-namn');
assert.strictEqual(thread.nameFor({kind:'border_router',friendly_name:'Diagnostikens routernamn'}),'Diagnostikens routernamn');
thread._hass.devices={};thread._hass.entities={};delete thread._hass.formatEntityName;
assert.strictEqual(thread.nameFor({ext_address:addr}),addr.slice(0,8));
console.log('Thread: public formatter used; device override and diagnostic JSON names retained.');
const Kuma=classes['kuma-status-card'];const kuma=new Kuma();kuma.setConfig({entities:['sensor.monitor']});let renders=0;
kuma.render=()=>renders++;let name='Min tjänst Status';const ks={entity_id:'sensor.monitor',state:'up',attributes:{},last_changed:'fixed'};
const hass={states:{'sensor.monitor':ks},formatEntityName:s=>name,entities:{}};
kuma.hass=hass;assert.strictEqual(kuma.entityName(ks,ks.entity_id),'Min tjänst');assert.strictEqual(renders,1);
kuma.hass=hass;assert.strictEqual(renders,1);name='Nytt tjänstnamn Status';kuma.hass=hass;assert.strictEqual(renders,2);
assert.strictEqual(kuma.entityName(undefined,'sensor.missing'),'sensor.missing');delete hass.formatEntityName;hass.entities['sensor.monitor']={name:'Eget reservnamn Status'};
assert.strictEqual(kuma.entityName(ks,ks.entity_id),'Eget reservnamn');
console.log('Kuma: names refresh without state changes; explicit/fallback names and Status suffix handling retained.');
console.log('PASS: syntax and name-selection regressions for all three cards.');
