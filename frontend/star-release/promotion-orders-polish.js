(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  if(!['promotion-history.html','promotion-order-detail.html'].includes(file))return;
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const planMap={'均衡推广':'自定义推广组合','起步推广':'养歌启动包','加强推广':'养歌加强包'};
  const goalMap={'增加歌曲播放':'提升播放曝光','提升热度 / 冲榜':'头部热度冲刺'};

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
    const input=$('#searchInput');if(input)input.placeholder='搜索歌曲 / 音乐人 / 订单号';
    const heads=$$('.orders-head span');
    if(heads[1])heads[1].textContent='推广内容';
    if(heads[3])heads[3].textContent='操作';
    try{
      if(typeof orders!=='undefined')orders.forEach(o=>{if(planMap[o.plan])o.plan=planMap[o.plan]});
    }catch(e){}
    $$('.order').forEach(row=>{
      row.querySelectorAll('.effect-label').forEach(el=>el.style.display='none');
      row.querySelectorAll('.effect-value').forEach(el=>replaceTextNodes(el,/预计\s*\+?/g));
      const plan=row.querySelector('.plan');
      if(plan)Object.entries(planMap).forEach(([from,to])=>{if(plan.textContent.includes(from))plan.textContent=plan.textContent.replace(from,to)});
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
    const metaLabel=$('.meta-label');if(metaLabel)metaLabel.textContent='推广方式';
    const timelineTitle=$('.timeline h2');if(timelineTitle)timelineTitle.textContent='订单进度';
    const plan=$('#planName');if(plan&&planMap[plan.textContent.trim()])plan.textContent=planMap[plan.textContent.trim()];
    $$('.goal-tag').forEach(tag=>{const t=tag.textContent.trim();if(goalMap[t])tag.textContent=goalMap[t]});
    const count=$$('.project').length;const projectCount=$('#projectCount');if(projectCount)projectCount.textContent=`${count} 项`;
    $$('.project').forEach(project=>{
      const name=project.querySelector('.project-name');if(name)name.textContent=projectName(name.textContent);
      const service=project.querySelector('.service');if(service)service.style.display='none';
      const label=project.querySelector('.expected-label');if(label)label.style.display='none';
      const value=project.querySelector('.expected-value strong');if(value)value.textContent=value.textContent.replace(/^\+\s*/,'');
      const note=project.querySelector('.project-note');
      if(note){
        const important=/异常|失败|退款|调整|补充|需要|需/.test(note.textContent);
        note.style.display=important?'block':'none';
      }
      const btn=project.querySelector('.result-btn');
      if(btn){const m=btn.textContent.match(/\d+/);btn.textContent=m?`查看执行结果 · ${m[0]} 条`:'查看执行结果'}
    });
    const orderStatus=$('#orderStatus');const paidLabel=$('#paidLabel');
    if(paidLabel)paidLabel.textContent=orderStatus?.classList.contains('pending')?'仍需支付':'另行支付';
    const deduct=$('#deduct');
    if(deduct){
      const nums=(deduct.textContent.match(/[\d,.]+/g)||[]).join('').replace(/,/g,'');
      const row=deduct.closest('.bill-row');if(row&&Number(nums||0)===0)row.style.display='none';
    }
    $$('.info-row').forEach(row=>{const v=row.querySelector('strong')?.textContent.trim();if(!v||v==='—'||v==='-')row.style.display='none'});
    const resultSub=$('#resultSub');
    if(resultSub&&resultSub.textContent){
      resultSub.textContent=projectName(resultSub.textContent.replace(/ · \d+ 条记录$/,''))+(resultSub.textContent.match(/(\d+) 条记录/)?.[1]?` · ${resultSub.textContent.match(/(\d+) 条记录/)[1]} 条记录`:'');
    }
  }

  function apply(){
    if(file==='promotion-history.html')applyHistory();
    else applyDetail();
  }

  apply();
  setTimeout(apply,220);
  setTimeout(apply,500);
  const target=file==='promotion-history.html'?$('#orders'):document.body;
  if(target){
    let queued=false;
    new MutationObserver(()=>{
      if(queued)return;queued=true;
      requestAnimationFrame(()=>{queued=false;apply()});
    }).observe(target,{childList:true,subtree:true});
  }
})();
