
const fs=require('fs'),assert=require('assert'),vm=require('vm');
const path='/config/www/mini-media-player/mini-media-player-v1.16.12-ha202611.js';const source=fs.readFileSync(path,'utf8');new vm.Script(source);
const start=source.indexOf('get name(){'),end=source.indexOf('get groupCount(){',start);assert(start>0&&end>start);
const getter=source.slice(start,end);const player=Function('return ({'+getter+'})')();const entity={entity_id:'media_player.test',attributes:{}};
player.entity=entity;player._entityId=entity.entity_id;let calls=0;
player.hass={formatEntityName:s=>{assert.strictEqual(s,entity);calls++;return 'Mitt spelarnamn';}};
assert.strictEqual(player.name,'Mitt spelarnamn');assert.strictEqual(calls,1);
player.hass={entities:{'media_player.test':{name:'Eget reservnamn'}}};assert.strictEqual(player.name,'Eget reservnamn');
player.hass={};assert.strictEqual(player.name,'media_player.test');
const controls=JSON.parse(fs.readFileSync('/config/backups/mini_media_compat_20261106_100857/editor_controls_before.json'));
assert.strictEqual(controls.length,3);
for(const [label,opening] of controls){assert(source.includes(opening+label+'</ha-switch>'),'lost label/binding/handler: '+label);}
assert(!source.includes('ha-formfield'));assert(!source.includes('friendly_name'));
console.log('PASS: JavaScript syntax, HA name formatter, registry fallback, and all three editor labels with original bindings/events.');
