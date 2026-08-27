(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  const replacePackageCopy=()=>{
    const replacements=[
      ['5个平台资源位代申请','保底获得 5 个音乐平台推荐资源位'],
      ['5 个平台资源位代申请','保底获得 5 个音乐平台推荐资源位'],
      ['5个平台资源位','保底 5 个音乐平台推荐资源位'],
      ['5 个平台资源位','保底 5 个音乐平台推荐资源位']
    ];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
    while((node=walker.nextNode())){let text=node.nodeValue;replacements.forEach(([from,to])=>{text=text.split(from).join(to)});if(text!==node.nodeValue)node.nodeValue=text}
  };

  const splitPackageDescription=text=>String(text||'').split(/\s+\+\s+/).map(x=>x.trim()).filter(Boolean);
  const formatPackageDetail=text=>{
    const escaped=String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return escaped.replace(/（(二选一|三选一)）/g,' <span class="include-choice">$1</span>');
  };
  const normalizePackageCards=()=>{
    if(file==='promotion-method.html'){
      document.querySelectorAll('.package-card').forEach(card=>{
        if(card.dataset.copyMerged==='1')return;
        const desc=card.querySelector('.package-desc'),list=card.querySelector('.include-list');
        if(!desc||!list)return;
        const details=splitPackageDescription(desc.textContent);
        if(details.length){
          list.innerHTML=details.map(item=>`<div class="include-item"><span class="include-check">✓</span><span class="include-copy">${formatPackageDetail(item)}</span></div>`).join('');
          desc.remove();
          card.classList.add('package-copy-merged');
          card.dataset.copyMerged='1';
        }
        card.querySelectorAll('.case-entry').forEach(el=>el.remove());
      });
    }
    if(file==='official-packages.html'){
      document.querySelectorAll('.card').forEach(card=>{
        if(card.dataset.copyMerged==='1')return;
        const desc=card.querySelector('.desc');
        if(!desc)return;
        const details=splitPackageDescription(desc.textContent);
        const title=card.querySelector('.title');
        if(details.length&&title){
          const block=document.createElement('div');
          block.className='package-detail-block';
          block.innerHTML=`<div class="package-detail-title">套餐包含</div><div class="package-detail-list">${details.map(item=>`<div class="package-detail-item"><span>✓</span><div>${formatPackageDetail(item)}</div></div>`).join('')}</div>`;
          title.insertAdjacentElement('afterend',block);
        }
        desc.remove();
        card.querySelectorAll('.tags,.line,.row,.case-entry').forEach(el=>el.remove());
        card.classList.add('package-copy-merged');
        card.dataset.copyMerged='1';
      });
    }
  };
  const installPackageCardStyle=()=>{
    if(document.getElementById('package-copy-merged-style'))return;
    const style=document.createElement('style');style.id='package-copy-merged-style';
    style.textContent=`
      .package-card.package-copy-merged{height:408px}
      .package-card.package-copy-merged .include-title{margin-top:18px}
      .package-card.package-copy-merged .include-list{gap:7px;margin-top:9px}
      .package-card.package-copy-merged .include-item{align-items:flex-start;line-height:16px}
      .package-card.package-copy-merged .include-check{margin-top:1px}
      .package-card.package-copy-merged .include-copy{white-space:normal;overflow:visible;text-overflow:clip;font-size:10.5px;line-height:16px}
      .package-card.package-copy-merged .effect{margin-top:12px}
      .card.package-copy-merged{min-height:390px;padding-bottom:76px}
      .package-detail-block{margin-top:18px}
      .package-detail-title{color:#999fa9;font-size:10px;margin-bottom:8px}
      .package-detail-list{display:grid;gap:8px}
      .package-detail-item{display:grid;grid-template-columns:16px minmax(0,1fr);gap:7px;align-items:flex-start;color:#515966;font-size:11px;line-height:17px}
      .package-detail-item>span{width:16px;height:16px;border-radius:50%;display:grid;place-items:center;background:#eef2ff;color:var(--brand);font-size:9px;font-weight:700}
      .package-detail-item .include-choice{margin-left:4px}
    `;document.head.appendChild(style);
  };

  if(file==='custom-combination.html'){
    try{
      const xhs=products.social.find(p=>p.id==='xiaohongshu-promotion');
      if(xhs){xhs.quantitySpecs=xhs.quantitySpecs.filter(s=>!s.name.includes('5–10w')&&!s.name.includes('20w+')).slice(0,4);xhs.hint='4 种达人规格，可组合购买';xhs.priceHint='¥300 起'}
      const qq=products.chart.find(p=>p.id==='qq-chart-sprint');
      if(qq){qq.meta='QQ音乐官方 · 私人歌单打榜服务';qq.skus=[['基础打榜',14500,'保底新增真实播放 20 万次','未登榜保底实际播放 20 万'],['中级打榜',21500,'保底新增真实播放 30 万次','未登榜保底实际播放 30 万'],['高级打榜',28600,'保底新增真实播放 40 万次','未登榜保底实际播放 40 万']]}
      const netease=products.chart.find(p=>p.id==='netease-chart-sprint');
      if(netease){netease.meta='网易云音乐官方 · 私人歌单打榜服务';netease.skus=[['基础',8600,'保底新增真实播放 12 万次'],['进阶',17200,'保底新增真实播放 25 万次'],['高级',25800,'保底新增真实播放 38 万次']]}
      const kugou=products.chart.find(p=>p.id==='kugou-chart-sprint');
      if(kugou){kugou.meta='酷狗音乐官方 · 私人歌单打榜服务';kugou.skus=[['基础',8600,'保底新增真实播放 10 万次','冲飙升榜、内地榜（排名参考 40–60 名）'],['进阶',17200,'保底新增真实播放 20 万次','冲飙升榜、新歌榜、内地榜（排名参考 20–30 名）'],['高级',34300,'保底新增真实播放 40 万次','冲飙升榜、新歌榜、内地榜等（排名参考 5–20 名）']]}
      let resource=products.plays.find(p=>p.id==='platform-recommendation-resource');
      if(!resource){
        resource={id:'platform-recommendation-resource',platform:'音乐平台',name:'音乐平台推荐资源位推广',meta:'覆盖 QQ音乐、网易云音乐、酷狗、酷我、咪咕、Apple Music、Spotify 等主流音乐平台',hint:'保底获得 5 个推荐资源位',priceHint:'¥2,000',single:{result:'保底获得 5 个推荐资源位',price:2000,label:'覆盖 QQ音乐、网易云音乐、酷狗音乐、酷我音乐、咪咕音乐、Apple Music、Spotify、JOOX、KKBOX、Friday、MOOV、九太音乐等平台；由服务团队统筹匹配与申请'},covers:['plays']};
        products.plays.push(resource);
      }
      if(typeof productMap!=='undefined')productMap[resource.id]=resource;
      if(typeof renderAll==='function')renderAll();
    }catch(e){console.warn('promotion product patch failed',e)}
  }

  if(['promotion-method.html','official-packages.html','order-confirm.html'].includes(file)){
    replacePackageCopy();
    if(file!=='order-confirm.html'){installPackageCardStyle();normalizePackageCards()}
    let count=0;const timer=setInterval(()=>{replacePackageCopy();if(file!=='order-confirm.html')normalizePackageCards();if(++count>=10)clearInterval(timer)},120);
  }
})();
