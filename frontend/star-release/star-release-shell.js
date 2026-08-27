(()=>{
  const sidebar=document.querySelector('.sidebar'),topbar=document.querySelector('.topbar');
  if(!sidebar||!topbar)return;

  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const currentParams=new URLSearchParams(location.search);
  const url=(target,omit=[])=>{
    const p=new URLSearchParams(currentParams);
    omit.forEach(k=>p.delete(k));
    const q=p.toString();
    return target+(q?'?'+q:'');
  };
  const cleanSongTarget=target=>url(target,['mode','package','custom']);
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const hide=s=>$$(s).forEach(el=>el.style.display='none');
  const setText=(s,t)=>{const el=$(s);if(el)el.textContent=t};

  document.body.classList.add('star-page-'+file.replace(/\.html$/,''));

  if(file==='promotion-step3.html'){
    location.replace(cleanSongTarget('promotion-method.html'));
    return;
  }

  const active=file==='album-list.html'?'albums':file==='royalty-withdrawal.html'?'royalty':'promotion';
  const nav=[
    ['home','#','<path fill="currentColor" d="M3 10.6 12 3l9 7.6V21h-6v-6H9v6H3V10.6Z"/>','主页'],
    ['albums','album-list.html','<circle cx="12" cy="12" r="8.2" fill="currentColor"/><circle cx="12" cy="12" r="2.3" fill="#fff"/><circle cx="16.3" cy="8.2" r="1.1" fill="#fff" opacity=".85"/>','专辑列表'],
    ['video','#','<rect x="3.2" y="6.5" width="12.8" height="11" rx="1.5" fill="currentColor"/><path d="M16 9.7 21 7.4v9.2L16 14.3V9.7Z" fill="currentColor"/>','视频'],
    ['artist','#','<circle cx="9" cy="8" r="4" fill="currentColor"/><circle cx="16.5" cy="9.5" r="3.2" fill="currentColor" opacity=".88"/><path d="M2.8 20c.4-4.1 2.7-6.2 6.2-6.2 3.4 0 5.8 2.1 6.2 6.2H2.8Z" fill="currentColor"/><path d="M13.5 19.8c.25-3.2 1.95-4.9 4.7-4.9 2.1 0 3.7 1.2 4.3 3.5-.9.9-2.2 1.4-3.9 1.4h-5.1Z" fill="currentColor" opacity=".88"/>','艺人'],
    ['promotion','index.html','<path d="M2.7 13.1c2.8-1.2 4.4-3.4 5.1-6.4 4.9-.3 8.7 1 11.5 4-1 4.7-4 7.6-8.9 8.8-2.8.7-5.3-.1-7.2-2.5 1.1-.9 1.8-2.2 2-3.8-.9.3-1.7.3-2.5-.1Z" fill="currentColor"/><circle cx="14.6" cy="10.2" r="1.2" fill="#fff"/>','音乐推广'],
    ['royalty','royalty-withdrawal.html','<rect x="4" y="3.5" width="16" height="17" rx="3" fill="currentColor"/><path d="M8.4 9.1h7.2M8.4 14.9h7.2M12 6.8v10.4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>','我的版税'],
    ['contract','#','<path d="M5 2.8h10l4 4V21H5V2.8Z" fill="currentColor"/><path d="M15 2.8v4h4M8 11h8M8 15h8" stroke="#fff" stroke-width="1.4"/>','我的合同'],
    ['analysis','#','<rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor"/><path d="M6.5 15.8 10 12.3l2.5 2.2 5-5" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>','销售分析']
  ];

  let context=null;
  if(file==='promotion-method.html'){
    context={back:'index.html',crumbs:[['音乐推广','index.html'],['选择推广方式']],hide:['.breadcrumb']};
  }else if(file==='promotion-expert.html'){
    context={back:url('promotion-method.html'),crumbs:[['音乐推广','index.html'],['选择推广方式',url('promotion-method.html')],['专属推广方案']],hide:['.breadcrumb','#backMethodTop']};
  }else if(file==='promotion-history.html'){
    context={back:'index.html',crumbs:[['音乐推广','index.html'],['推广历史']],hide:['.back-link']};
  }else if(file==='official-packages.html'){
    context={back:url('promotion-method.html'),crumbs:[['音乐推广','index.html'],['选择推广方式',url('promotion-method.html')],['全部官方套餐']],hide:['.breadcrumb']};
  }else if(file==='custom-combination.html'){
    context={back:cleanSongTarget('promotion-method.html'),crumbs:[['音乐推广','index.html'],['选择推广方式',cleanSongTarget('promotion-method.html')],['自定义推广组合']],hide:['#backRecommend']};
  }else if(file==='order-confirm.html'){
    const isCustom=currentParams.get('custom')==='1';
    const back=isCustom?cleanSongTarget('custom-combination.html'):cleanSongTarget('promotion-method.html');
    const parentLabel=isCustom?'自定义推广组合':'选择推广方式';
    context={back,crumbs:[['音乐推广','index.html'],[parentLabel,back],['确认推广订单']],hide:['#backBtn']};
  }else if(file==='promotion-order-detail.html'){
    context={back:'promotion-history.html',crumbs:[['音乐推广','index.html'],['推广历史','promotion-history.html'],['推广订单详情']],hide:['.back-link']};
  }

  sidebar.setAttribute('aria-label','星球发行主导航');
  sidebar.innerHTML=`<div class="brand"><div class="brand-logo"><img src="https://star.kanjian.com/app/release/images/star-logo.png" alt="星球发行"></div></div><nav class="nav">${nav.map(([id,href,icon,label])=>`<a class="nav-item${id===active?' active':''}" href="${href}"${id===active?' aria-current="page"':''}><svg class="nav-icon" viewBox="0 0 24 24">${icon}</svg><span class="nav-label">${label}</span></a>`).join('')}</nav>`;

  const contextHtml=context?`<div class="topbar-context"><a class="topbar-back" href="${esc(context.back)}" aria-label="返回上一层"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.8 4.5 7.3 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><span>返回</span></a><span class="topbar-context-divider"></span><nav class="topbar-breadcrumb" aria-label="面包屑">${context.crumbs.map((item,i)=>{const label=item[0],href=item[1],last=i===context.crumbs.length-1;return `${i?'<span class="topbar-breadcrumb-separator">/</span>':''}${last||!href?`<span class="topbar-breadcrumb-current">${esc(label)}</span>`:`<a href="${esc(href)}">${esc(label)}</a>`}`}).join('')}</nav></div>`:'';

  topbar.innerHTML=`${contextHtml}<div class="topbar-actions"><a class="topbar-action" href="#"><svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9.8 9.2a2.4 2.4 0 1 1 4.6 1c-.35.8-1.1 1.2-1.7 1.7-.5.4-.7.9-.7 1.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="17.1" r="1" fill="currentColor"/></svg><span>帮助中心</span></a><a class="topbar-action" href="#"><span>简体中文</span><svg class="caret" viewBox="0 0 12 12"><path d="m2 4 4 4 4-4H2Z" fill="currentColor"/></svg></a><a class="topbar-action" href="#"><span>环环</span><svg class="caret" viewBox="0 0 12 12"><path d="m2 4 4 4 4-4H2Z" fill="currentColor"/></svg></a></div>`;

  if(context){
    document.body.classList.add('star-has-context-nav');
    (context.hide||[]).forEach(selector=>document.querySelectorAll(selector).forEach(el=>el.classList.add('shell-return-migrated')));
  }

  function cleanupIndex(){
    const sideNote=$('.side-note');if(sideNote)sideNote.textContent=sideNote.textContent.replace('歌曲名称已脱敏展示 · ','');
    hide('.songs-subtitle');
    $$('.promo-title').forEach(el=>el.textContent='可推广');
    $$('.opportunity-count').forEach(el=>{const m=el.textContent.match(/\d+/);if(m)el.textContent=`${m[0]} 种推广方式`});
  }

  function cleanupMethod(){
    hide('.page-desc,.section-sub,.scroll-hint,.note');
  }

  function cleanupOfficialPackages(){
    hide('.head p,.include-title,.disclaimer');
    $$('.card').forEach(card=>{if(card.querySelector('.title')?.textContent.trim()==='冲榜助推包'){const fit=card.querySelector('.fit');if(fit)fit.innerHTML='适合：<strong>重点冲榜</strong>'}});
  }

  function cleanupExpert(){
    const title=$('.page-title');if(title)title.textContent='获取专属推广方案';
    const desc=$('.page-desc');if(desc)desc.textContent='告诉我们推广目标和预算，专属音乐推广专家会为这首歌制定更合适的推广建议。';
    hide('.step-tag');
    const panels=$$('.panel');
    const titles=['选择主要推广目标','预算和推广市场','补充歌曲情况（选填）','联系方式'];
    panels.forEach((panel,i)=>{const t=panel.querySelector('.panel-title');if(t&&titles[i])t.textContent=titles[i];const sub=panel.querySelector('.panel-sub');if(sub)sub.style.display='none'});
    $$('.goal-option').forEach(el=>{
      const strong=el.querySelector('strong');if(!strong)return;
      if(strong.textContent.trim()==='增加歌曲播放'){strong.textContent='提升播放曝光';el.dataset.value='提升播放曝光'}
      if(strong.textContent.trim()==='提升热度 / 冲榜'){strong.textContent='头部热度冲刺';el.dataset.value='头部热度冲刺'}
    });
    $$('.summary-row').forEach(row=>{if(row.querySelector('span')?.textContent.trim()==='方案类型')row.style.display='none'});
    const promise=$('.promise');if(promise)promise.textContent='提交需求不会产生订单，专家与你确认方案和费用后再下单。';
    hide('.helper');
    const successDesc=$('.success-desc');if(successDesc)successDesc.textContent='推广需求已记录，专属音乐推广专家会整理建议并与你确认具体方案。';
  }

  function cleanupCustom(){
    hide('.progress,.cart-note');
    $$('.product-meta').forEach(el=>{if(el.textContent.trim()==='来源真实用户点击')el.style.display='none'});
    const empty=$('.cart-empty');if(empty&&/还没有选择|尚未选择/.test(empty.textContent)){empty.innerHTML='还没有添加推广项目<br><span style="color:#b0b5bd">从左侧选择适合的推广方式</span>'}
  }

  function cleanupOrder(){
    hide('.progress,.footnote,.warning');
    const desc=$('.balance-desc');if(desc)desc.textContent='余额不足时，仅支付剩余差额。';
    const modalP=$('.modal-head p');if(modalP)modalP.style.display='none';
    const pageDesc=$('#pageDesc');if(pageDesc)pageDesc.style.display='none';
    const itemsDesc=$('#itemsDesc');if(itemsDesc){
      if(currentParams.get('mode')==='package')itemsDesc.textContent='请确认套餐内的可选执行方式。';
      else itemsDesc.style.display='none';
    }
    const resultNote=$('#resultNote');if(resultNote)resultNote.style.display='none';
  }

  function cleanupHistory(){
    const headP=$('.head-copy p');if(headP)headP.style.display='none';
    const head=$('.orders-head span:nth-child(2)');if(head)head.textContent='推广结果';
    try{
      if(typeof orders!=='undefined'){
        const planMap={'均衡推广':'自定义推广组合','起步推广':'养歌启动包','加强推广':'养歌加强包'};
        orders.forEach(o=>{if(planMap[o.plan])o.plan=planMap[o.plan]});
      }
    }catch(e){}
    const applyRows=()=>{
      $$('.order').forEach(row=>{
        const status=row.querySelector('.status');const label=status?.classList.contains('done')?'实际结果':status?.classList.contains('running')?'当前结果':'预计结果';
        row.querySelectorAll('.effect-label').forEach(el=>el.textContent=label);
      });
      const countText=$('#countText')?.textContent||'';const n=Number((countText.match(/\d+/)||[])[0]||0);if(n<=10)hide('.footer .pager');
    };
    applyRows();
    const ordersEl=$('#orders');if(ordersEl&&!ordersEl.dataset.cleanObserver){ordersEl.dataset.cleanObserver='1';new MutationObserver(applyRows).observe(ordersEl,{childList:true,subtree:true})}
  }

  function cleanupOrderDetail(){
    const desc=$('.section-head p');if(desc)desc.style.display='none';
    $$('.info-row').forEach(row=>{const v=row.querySelector('strong')?.textContent.trim();if(!v||v==='—'||v==='-')row.style.display='none'});
  }

  function cleanupAlbumList(){
    $$('.promote-link').forEach(el=>{if(!el.classList.contains('disabled'))el.textContent='选择歌曲推广'});
  }

  function cleanup(){
    if(file==='index.html')cleanupIndex();
    if(file==='promotion-method.html')cleanupMethod();
    if(file==='official-packages.html')cleanupOfficialPackages();
    if(file==='promotion-expert.html')cleanupExpert();
    if(file==='custom-combination.html')cleanupCustom();
    if(file==='order-confirm.html')cleanupOrder();
    if(file==='promotion-history.html')cleanupHistory();
    if(file==='promotion-order-detail.html')cleanupOrderDetail();
    if(file==='album-list.html')cleanupAlbumList();
  }

  if(file==='index.html' && typeof openStep2==='function'){
    openStep2=function(song){
      const p=new URLSearchParams({id:String(song.id||''),title:song.name||song.title||'',artist:song.artist||'',album:song.album||'',cover:song.cover||'♪'});
      location.href='promotion-method.html?'+p.toString();
    };
  }

  if(file==='promotion-step2.html'){
    const thirdLabel=document.querySelector('.progress-step:last-child span:last-child');
    if(thirdLabel)thirdLabel.textContent='自定义推广组合';
    const next=document.getElementById('nextBtn');
    const normalizeNextLabel=()=>{if(next&&!next.disabled)next.textContent='下一步：自定义推广组合'};
    document.querySelectorAll('.goal').forEach(el=>el.addEventListener('click',()=>setTimeout(normalizeNextLabel,0)));
    normalizeNextLabel();
    if(next && typeof goals!=='undefined' && typeof song!=='undefined'){
      next.onclick=()=>{
        if(!goals.size)return;
        const selected=[...goals],p=new URLSearchParams(song);
        p.set('goals',selected.join(','));p.set('goal',selected[0]);
        location.href='custom-combination.html?'+p.toString();
      };
    }
  }

  if(file==='promotion-method.html'){
    const expertLink=document.getElementById('expertLink');
    if(expertLink)expertLink.href='promotion-expert.html'+(currentParams.toString()?'?'+currentParams.toString():'');
  }

  if(file==='order-confirm.html' && currentParams.get('mode')==='package'){
    const script=document.createElement('script');script.src='package-order-view.js';document.body.appendChild(script);
  }

  if(['custom-combination.html','promotion-method.html','official-packages.html','order-confirm.html'].includes(file)){
    setTimeout(()=>{
      const script=document.createElement('script');
      script.src='promotion-product-patch.js';
      document.body.appendChild(script);
    },0);
  }

  if(['index.html','custom-combination.html','order-confirm.html','promotion-order-detail.html','promotion-method.html','official-packages.html'].includes(file)){
    const script=document.createElement('script');
    script.src='platform-logos.js';
    document.body.appendChild(script);
  }

  cleanup();
  setTimeout(cleanup,180);
})();
