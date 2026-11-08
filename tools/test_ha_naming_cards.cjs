const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = '/homeassistant';
const fixture = `${root}/backups/namnstandard_20261107/12-natverk-och-ovriga-namn/after`;
const devices = JSON.parse(fs.readFileSync(`${fixture}/devices.json`));
const areas = JSON.parse(fs.readFileSync(`${fixture}/areas.json`));
const byId = Object.fromEntries(devices.map(d => [d.id, d]));
const areaMap = Object.fromEntries(areas.map(a => [a.area_id, a]));
function load(file, tag) {
  const classes = new Map();
  const sandbox = { HTMLElement: class {}, window: {}, console,
    customElements: { define: (name, value) => classes.set(name, value) } };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, {filename:file});
  return classes.get(tag);
}
const OpenWrt = load(`${root}/www/openwrt-network-map/openwrt-network-map.js`, 'openwrt-network-map-card');
const Thread = load(`${root}/www/thread-network-map/thread-network-map.js`, 'thread-network-map');
const bedroom = byId['2bb9cb602ec800b2f183ceedd0f6b5fe'];
const kitchen = byId['92c0ad7e857b0256a132e4f8f7c32a40'];
assert(bedroom && kitchen);
assert.equal(bedroom.name_by_user, kitchen.name_by_user);
(async () => {
  const network = Object.create(OpenWrt.prototype);
  network._areaRegistry = new Map(areas.map(a => [a.area_id, a]));
  network._hass = {areas:areaMap, devices:byId, states:{}};
  assert.equal(network._deviceDisplayName(bedroom), 'Sovrummet LED-list östra');
  assert.equal(network._deviceDisplayName(kitchen), 'Köket LED-list östra');
  assert.equal(network._deviceDisplayName({name:'Köket Klimatsensor',area_id:'kok'}), 'Köket Klimatsensor');
  assert.equal(network._deviceDisplayName({name:'Fristående'}), 'Fristående');
  network._scheduleUpdate = () => {};
  network._hass.callWS = async ({type}) => type === 'config/device_registry/list'
    ? [bedroom,kitchen] : type === 'config/entity_registry/list' ? [] : areas;
  await network._loadDeviceRegistry();
  const macFor = d => d.connections.find(([kind]) => kind === 'mac')[1];
  for (const [index,device] of [bedroom,kitchen].entries()) {
    const id = `device_tracker.fixture_${index}`;
    network._hass.states[id] = {entity_id:id,state:'home',attributes:{
      mac:macFor(device),connected_ap:'fixture-ap',signal_strength:-50,
    }};
  }
  network._hass.formatEntityName = () => 'Fallback';
  const names = [...network._collectClients().values()].map(c => c.name).sort();
  assert.deepEqual(names,['Köket LED-list östra','Sovrummet LED-list östra']);
  network._hass.devices = {...byId,[bedroom.id]:{...bedroom,name_by_user:'LED-list uppdaterad'}};
  assert([...network._collectClients().values()].some(c => c.name === 'Sovrummet LED-list uppdaterad'));
  const thread = Object.create(Thread.prototype);
  thread._hass = {areas:areaMap,devices:byId,
    entities:{'sensor.any_id':{device_id:bedroom.id}},
    states:{'sensor.any_id':{state:'ABCDEF'}}};
  assert.equal(thread.nameFor({ext_address:'abcdef',kind:'thread'}),'Sovrummet LED-list östra');
  assert.equal(thread.deviceDisplayName({name:'Köket Klimatsensor',area_id:'kok'}),'Köket Klimatsensor');
  assert.equal(thread.deviceDisplayName({name:'Fristående'}),'Fristående');
  assert.equal(thread.deviceDisplayName(null),'');
  console.log('PASS: distinct areas, no repeated area, fallback names, registry lookup, live device rename, Thread address lookup independent of entity ID');
})().catch(err => {console.error(err);process.exitCode=1;});
