import quickjs
from pathlib import Path
ctx=quickjs.Context()
ctx.eval('class HTMLElement {}; const customElements={get:()=>false,define:()=>{}};')
ctx.eval(Path('/config/www/compact-levels-card/compact-levels-card-v1.js').read_text())
print(ctx.eval('''
const card = Object.create(CompactLevelsCard.prototype);
const row={dataset:{},classList:{toggle(k,v){this[k]=v}},setAttribute(k,v){this[k]=v}};
const fill={style:{}}; const value={};
card.rows=[{item:{entity:'sensor.test',name:'Test',warning:10,good:20},row,fill,value}];
function check(n,text,critical,color){card.updateStates({'sensor.test':{state:n}});if(value.textContent!==text||row.classList.critical!==critical||fill.style.backgroundColor!==color)throw Error('Failed '+n);}
check('69','69 %',false,'#64b5c6');
check('15','15 %',false,'#e8b841');
check('0','0 %',true,'#e45b4f');
check('unavailable','—',false,'var(--disabled-text-color,#888)');
check('unknown','—',false,'var(--disabled-text-color,#888)');
check('101','—',false,'var(--disabled-text-color,#888)');
check('100','100 %',false,'#64b5c6');
if(fill.style.transform!=='scaleX(1)')throw Error('Scale');
'JS syntax and state changes verified: normal, low, zero, unavailable, recovery.'
'''))
