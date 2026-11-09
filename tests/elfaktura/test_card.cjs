/* DOM + real temporary SQLite backend. No HA or production records changed.
 * Set ELFAKTURA_DOM_MODULE to a linkedom module installation (0.18.12 tested).
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const {spawnSync} = require('node:child_process');
const {webcrypto} = require('node:crypto');
const {parseHTML} = require(process.env.ELFAKTURA_DOM_MODULE || '/tmp/elfaktura-ui-test/dom/node_modules/linkedom');
const root = path.resolve(__dirname, '../..');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'elfaktura-dom-'));
const {window, document} = parseHTML('<html><body></body></html>');
// linkedom omits these native browser form methods/properties.
Object.defineProperty(window.HTMLSelectElement.prototype, 'value', {
  get() {return (Array.from(this.querySelectorAll('option')).find(o => o.hasAttribute('selected')) || this.querySelector('option'))?.getAttribute('value') || '';},
  set(v) {for (const o of this.querySelectorAll('option')) {if (o.getAttribute('value') === v) o.setAttribute('selected', ''); else o.removeAttribute('selected');}}
});
window.HTMLElement.prototype.reset = function() {
  for (const i of this.querySelectorAll('input,textarea')) {i.value = i.getAttribute('value') || ''; i.checked = i.hasAttribute('checked');}
  for (const s of this.querySelectorAll('select')) s.value = s.querySelector('option')?.getAttribute('value') || '';
};
window.HTMLElement.prototype.reportValidity = () => true;
window.HTMLElement.prototype.scrollIntoView = () => {};
const context = vm.createContext({window, document, HTMLElement: window.HTMLElement, customElements: window.customElements,
  crypto: webcrypto, console, setTimeout, Blob, URL, Intl, Date, confirm: () => true, prompt: () => 'Arkiverad i UI-test',
});
vm.runInContext(fs.readFileSync(path.join(root, 'www/elfaktura/elfaktura-card.js'), 'utf8') + '\nglobalThis.parseAmount = scaled;', context);
const card = document.createElement('elfaktura-card');
document.body.append(card);
async function api(type, data = {}) {
  const process = spawnSync('python3', [path.join(root, 'tests/elfaktura/ui_bridge.py'), path.join(temporary, 'test.sqlite3')], {
    input: JSON.stringify({command: type.split('/').pop(), data}), encoding: 'utf8'
  });
  assert.equal(process.status, 0, process.stderr);
  const response = JSON.parse(process.stdout);
  if (response.error) throw response.error;
  return response.result;
}
async function waitLoaded() {for (let i=0; i<50 && !card._loaded; i++) await new Promise(r => setTimeout(r, 5)); assert(card._loaded);}
async function main() {
  assert.equal(context.parseAmount('1 234,56', 2, 'kr'), 123456);
  assert.equal(context.parseAmount('-0,01', 2, 'kr'), -1);
  assert.equal(context.parseAmount('1234,567', 3, 'kWh'), 1234567);
  assert.equal(context.parseAmount('', 2, 'kr', true), null);
  assert.throws(() => context.parseAmount('1.234,56', 2, 'kr'));
  card.setConfig({type: 'custom:elfaktura-card'});
  card.hass = {user: {is_admin: true}, connection: {}, callWS: ({type, ...data}) => api(type, data)};
  await waitLoaded();
  assert.equal(card.field('empty').hidden, false);
  const f = (id, value) => card.field(id).value = value;
  f('supplier', 'Vattenfall <img src=x onerror=alert(1)>');
  f('invoice_number', 'UI-001'); f('total', '1250,00'); f('vat', '250,00'); f('energy', '1234,567');
  f('item_energy', '1000,00'); card.field('details_complete').checked = true;
  await card.save();
  let records = (await api('list')).invoices;
  assert.equal(records.length, 1, card.field('message').textContent);
  const id = records[0].id;
  assert.equal(records[0].energy_wh, 1234567);
  assert.equal(records[0].total_cents, 125000);
  assert.equal(card.shadowRoot.querySelector('img'), null);
  assert(card.field('rows').textContent.includes('<img src=x'));
  assert(card.field('message').textContent.includes('är sparad'));
  await card.open(id);
  f('notes', 'Kontrollerad mot fakturan'); f('reason', 'Lade till kommentar');
  await card.save();
  assert.equal((await api('get', {invoice_id:id})).history.length, 2);
  f('supplier', records[0].supplier); f('invoice_number', 'UI-001'); f('total', '1250,00');
  await card.save();
  assert.equal((await api('list')).invoices.length, 1);
  assert(card.field('message').textContent.includes('finns redan'));
  await card.open(id);
  await card.archive();
  assert.equal((await api('list')).invoices.length, 0);
  card.field('include-archived').checked = true;
  await card.load();
  await card.open(id);
  assert.equal(card.field('save').textContent, 'Återaktivera och spara');
  f('reason', 'Återaktivering efter test');
  await card.save();
  assert.equal((await api('list')).invoices.length, 1);
  assert.equal((await api('get', {invoice_id:id})).history.length, 4);
  await card.open(id); f('total', '1250,01'); f('reason', 'Test av obalans');
  await card.save();
  assert(card.field('message').textContent.includes('stämmer inte'));
  assert.equal((await api('get', {invoice_id:id})).invoice.total_cents, 125000);
  const exported = JSON.parse((await api('export', {format:'json'})).content);
  assert.equal(exported.revisions.length, 4);
  // HA state pushes must not replace unsaved form inputs.
  f('notes', 'Osparad text');
  card.hass = {...card._hass};
  assert.equal(card.field('notes').value, 'Osparad text');
  card.hass = {...card._hass, user:{is_admin:false}};
  assert.equal(card.field('form-fields').disabled, true);
  console.log('PASS: DOM form + real temporary SQLite: Swedish amounts, save, edit, duplicate, archive/restore, balancing, audit/export, safe text rendering, draft preservation and read-only mode');
}
main().catch(error => {console.error(error); process.exitCode = 1;}).finally(() => fs.rmSync(temporary, {recursive:true, force:true}));
