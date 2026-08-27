(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  if(!['promotion-history.html','promotion-order-detail.html'].includes(file))return;
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const planMap={'均衡推广':'自定义推广组合','起步推广':'养歌启动包','加强推广':'养歌加强包'};
  const goalMap={'增加歌曲播放':'提升播放曝光','提升热度 / 冲榜':'头部热度冲刺'};
  const setText=(el,value)=>{if(el&&el.textContent!==value)el.textContent=value};

  function ensureStyle(){
    if($('#promotion-orders-polish-style'))return;
    const style=document.createElement('style');
    style.id='promotion-orders-polish-style';
    style.textContent=`
      .star-page-promotion-history .effect-label{display:none!important}
      .star-page-promotion-history .effect{min-width:104px;padding:8px 10px}
      .star-page-promotion-history .effect-value{margin-top:0;font-size:13px}
      .star-page-promotion-history .orders-head span:last-child{text-align:right}
      .star-page-promotion-order-detail .head-copy p{display:none!important}
      .star-page-promotion-order-detail .section-head p,
      .star-page-promotion-order-detail .project .service,
      .star-page-promotion-order-detail .expected-label{display:none!important}
      .star-page-promotion-order-detail .expected{margin-top:9px;padding:0;border:0;background:transparent}
      .star-page-promotion-order-detail .expected-value{margin-top:0;font-size:15px;line-height:1.45}
      .star-page-promotion-order-detail .project{padding:16px 0}
      .star-page-promotion-order-detail .project-name{font-size:13px}
      .star-page-promotion-order-detail .project-note{display:none}
      .star-page-promotion-order-detail .result-btn{margin-top:9px}
    `;
    document.head.appendChild(style);
  }

  function replaceTextNodes(root,re){
    if(!root)return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
    while((node=walker.nextNode())){
      const next=node.nodeValue.replace(re,'');
      if(next!==node.nodeValue)node.nodeValue=next;
    }
  }

  function applyHistory(){
    ensureStyle();
    const input=$('#searchInput');if(input&&input.placeholder!=='搜索歌曲 / 音乐人 / 订单号')input.placeholder='搜索歌曲 / 音乐人 / 订单号';
    const heads=$$('.orders-head span');
    setText(heads[1],'推广内容');
    setText(heads[3],'操作');
    try{
      if(typeof orders!=='undefined')orders.forEach(o=>{if(planMap[o.plan])o.plan=planMap[o.plan]});
    }catch(e){}
    $$('.order').forEach(row=>{
      row.querySelectorAll('.effect-label').forEach(el=>el.style.display='none');
      row.querySelectorAll('.effect-value').forEach(el=>replaceTextNodes(el,/预计\s*\+?/g));
      const plan=row.querySelector('.plan');
      if(plan)Object.entries(planMap).forEach(([from,to])=>{if(plan.textContent.includes(from))setText(plan,plan.textContent.replace(from,to))});
    });
    const countText=$('#countText')?.textContent||'';
    const n=Number((countText.match(/\d+/)||[])[0]||0);
    const pager=$('.footer .pager');if(pager&&n<=10)pager.style.display='none';
  }

  function projectName(text){
    const raw=String(text||'').trim();
    const parts=raw.split(' · ');
    if(parts.length<2)return raw;
    let platform=parts.shift();const service=parts.join(' · ');
    if(platform==='网易云')platform='网易云音乐';
    if(/^[A-Za-z]/.test(platform))return `${platform} ${service}`;
    return `${platform}${service}`;
  }

  function applyDetail(){
    ensureStyle();
    setText($('.meta-label'),'推广方式');
    setText($('.timeline h2'),'订单进度');
    const plan=$('#planName');if(plan&&planMap[plan.textContent.trim()])setText(plan,planMap[plan.textContent.trim()]);
    $$('.goal-tag').forEach(tag=>{const t=tag.textContent.trim();if(goalMap[t])setText(tag,goalMap[t])});
    const count=$$('.project').length;setText($('#projectCount'),`${count} 项`);
    $$('.project').forEach(project=>{
      const name=project.querySelector('.project-name');if(name)setText(name,projectName(name.textContent));
      const service=project.querySelector('.service');if(service)service.style.display='none';
      const label=project.querySelector('.expected-label');if(label)label.style.display='none';
      const value=project.querySelector('.expected-value strong');if(value)setText(value,value.textContent.replace(/^\+\s*/,''));
      const note=project.querySelector('.project-note');
      if(note){
        const important=/异常|失败|退款|调整|补充|需要|需/.test(note.textContent);
        note.style.display=important?'block':'none';
      }
      const btn=project.querySelector('.result-btn');
      if(btn){const m=btn.textContent.match(/\d+/);setText(btn,m?`查看执行结果 · ${m[0]} 条`:'查看执行结果')}
    });
    const orderStatus=$('#orderStatus');
    setText($('#paidLabel'),orderStatus?.classList.contains('pending')?'仍需支付':'另行支付');
    const deduct=$('#deduct');
    if(deduct){
      const nums=(deduct.textContent.match(/[\d,.]+/g)||[]).join('').replace(/,/g,'');
      const row=deduct.closest('.bill-row');if(row&&Number(nums||0)===0)row.style.display='none';
    }
    $$('.info-row').forEach(row=>{const v=row.querySelector('strong')?.textContent.trim();if(!v||v==='—'||v==='-')row.style.display='none'});
    const resultSub=$('#resultSub');
    if(resultSub&&resultSub.textContent){
      const current=resultSub.textContent;
      const countMatch=current.match(/(\d+) 条记录/);
      const base=current.replace(/ · \d+ 条记录$/,'');
      const next=projectName(base)+(countMatch?` · ${countMatch[1]} 条记录`:'');
      setText(resultSub,next);
    }
  }

  function apply(){
    if(file==='promotion-history.html')applyHistory();
    else applyDetail();
  }

  apply();
  setTimeout(apply,220);
  setTimeout(apply,500);

  if(file==='promotion-history.html'){
    const target=$('#orders');
    if(target){let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;applyHistory()})}).observe(target,{childList:true,subtree:true})}
  }else{
    const projects=$('#projects');
    if(projects){let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;applyDetail()})}).observe(projects,{childList:true,subtree:true})}
    const resultSub=$('#resultSub');
    if(resultSub)new MutationObserver(()=>applyDetail()).observe(resultSub,{childList:true,subtree:true,characterData:true});
  }
})();
