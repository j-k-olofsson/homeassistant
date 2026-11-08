const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root='/work/';
const DataRow=vm.runInNewContext(fs.readFileSync(root+'flex_table_datarow.js','utf8')+'\nDataRow;',{
 CellFormatters:class {},listify:o=>Array.isArray(o)?o:[o],console
});
const states=JSON.parse(fs.readFileSync(root+'wifi_states.json'));
const dashboard=JSON.parse(fs.readFileSync(root+'wifi_dashboard_proposed.json'));
const view=dashboard.views.find(v=>v.path==='wifi');let allIds=new Set(),total=0,tables=0;
for(const section of view.sections){
 const badges=section.cards.filter(c=>c.type==='heading').flatMap(c=>c.badges||[]);
 const wrappers=section.cards.filter(c=>c.type==='custom:auto-entities');
 for(const wrapper of wrappers){
  const entry=wrapper.filter.include[0].attributes.connected_ap_entry_id;
  const entities=states.filter(e=>e.entity_id.startsWith('device_tracker.')&&e.state==='home'&&e.attributes.connection_type==='wireless'&&e.attributes.connected_ap_entry_id===entry);
  const card=wrapper.card;
  for(const e of entities){
   assert(!allIds.has(e.entity_id),'client in two AP tables');allIds.add(e.entity_id);
   const row=new DataRow(e,false);row.get_raw_data(card.columns,card,{});row.render_data(card.columns);
   assert(!row.hidden);assert(row.data[0].content.includes(e.attributes.host_name||e.entity_id));
   assert(row.data[1].content.includes(e.attributes.ip||'-'));
   assert(row.data[2].content.includes(String(e.attributes.signal_strength)));
   assert.strictEqual(row.data[3].content,e.attributes.signal_strength);
   assert(/>2G<|>5G<|>6G</.test(row.data[0].content),'missing verified band marker');
  }
  const sensor=states.find(e=>e.entity_id===badges[tables%2]?.entity)||states.find(e=>badges.some(b=>b.entity===e.entity_id)&&e.attributes.wireless===entities.length);
  // Match the heading immediately preceding this specific wrapper.
  const idx=section.cards.indexOf(wrapper),heading=section.cards[idx-1];
  const countState=states.find(s=>s.entity_id===heading.badges[0].entity);
  assert.strictEqual(entities.length,countState.attributes.wireless,'tracker table and AP badge disagree');
  const edge={entity_id:'device_tracker.test',attributes:{host_name:'<img src=x onerror=alert(1)>',ip:'1.2.3.4',mac:'aabb'}};
  const row=new DataRow(edge,false);row.get_raw_data(card.columns,card,{});row.render_data(card.columns);
  assert(!row.data[0].content.includes('<img'));assert(row.data[0].content.includes('&lt;img'));
  assert(row.data[2].content.includes('>-<'));assert.strictEqual(row.data[3].content,-999);
  total+=entities.length;tables++;console.log(entry,entities.length,'rows: correct AP, fields, band, rendering and missing-value handling');
 }
}
assert.strictEqual(tables,6);assert.strictEqual(total,88);assert(!JSON.stringify(view).includes('openwrt_wifi_clients'));
console.log('PASS:',tables,'tables,',total,'unique clients; no obsolete integration references.');
