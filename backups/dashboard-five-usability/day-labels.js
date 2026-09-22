(chart) => {
 const w=chart.w, g=w?.globals;
 if(!g||!Number.isFinite(g.minX)||!Number.isFinite(g.maxX)||g.maxX<=g.minX)return;
 const svg=chart.el.querySelector('svg.apexcharts-svg');if(!svg)return;
 svg.querySelector('.dashboard-day-labels')?.remove();
 const ns='http://www.w3.org/2000/svg';
 const group=document.createElementNS(ns,'g');group.setAttribute('class','dashboard-day-labels');group.setAttribute('pointer-events','none');group.setAttribute('transform',`translate(${g.translateX},${g.translateY})`);
 const fmt=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Stockholm',year:'numeric',month:'2-digit',day:'2-digit'});
 const today=fmt.format(new Date());
 const parts=t=>Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Stockholm',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(t).filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]));
 const midnight=(t,offset=0)=>{const p=parts(t);const desired=Date.UTC(p.year,p.month-1,p.day+offset);let guess=desired;for(let i=0;i<3;i++){const q=parts(guess);guess+=desired-Date.UTC(q.year,q.month-1,q.day,q.hour,q.minute,q.second);}return guess;};
 const tomorrow=fmt.format(midnight(Date.now(),1));
 const x=t=>(t-g.minX)/(g.maxX-g.minX)*g.gridWidth;
 const node=(tag,attrs)=>{const n=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));group.appendChild(n);return n;};
 for(let start=midnight(g.minX),count=0;start<g.maxX&&count<4;count++){
  const end=midnight(start,1),day=fmt.format(start),label=day===today?'Idag':day===tomorrow?'Imorgon':day;
  if(start>g.minX&&start<g.maxX)node('line',{x1:x(start),x2:x(start),y1:0,y2:g.gridHeight,stroke:'#bdcbd5','stroke-opacity':'.4','stroke-width':1,'stroke-dasharray':'3 4'});
  const cx=(x(Math.max(start,g.minX))+x(Math.min(end,g.maxX)))/2;
  if(Math.min(end,g.maxX)-Math.max(start,g.minX)>3600000){node('rect',{x:cx-35,y:2,width:70,height:17,rx:4,fill:'#213241','fill-opacity':'.92'});node('text',{x:cx,y:14,'text-anchor':'middle',fill:'#bdcbd5','font-size':11,'font-family':'inherit'}).textContent=label;}
  start=end;
 }
 svg.appendChild(group);
}
