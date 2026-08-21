(()=>{
  const sidebar=document.querySelector('.sidebar'),topbar=document.querySelector('.topbar');
  if(!sidebar||!topbar)return;
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
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
  sidebar.setAttribute('aria-label','星球发行主导航');
  sidebar.innerHTML=`<div class="brand"><div class="brand-logo"><img src="https://star.kanjian.com/app/release/images/star-logo.png" alt="星球发行"></div></div><nav class="nav">${nav.map(([id,href,icon,label])=>`<a class="nav-item${id===active?' active':''}" href="${href}"${id===active?' aria-current="page"':''}><svg class="nav-icon" viewBox="0 0 24 24">${icon}</svg><span class="nav-label">${label}</span></a>`).join('')}</nav>`;
  topbar.innerHTML=`<div class="topbar-actions"><a class="topbar-action" href="#"><svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9.8 9.2a2.4 2.4 0 1 1 4.6 1c-.35.8-1.1 1.2-1.7 1.7-.5.4-.7.9-.7 1.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="17.1" r="1" fill="currentColor"/></svg><span>帮助中心</span></a><a class="topbar-action" href="#"><span>简体中文</span><svg class="caret" viewBox="0 0 12 12"><path d="m2 4 4 4 4-4H2Z" fill="currentColor"/></svg></a><a class="topbar-action" href="#"><span>环环</span><svg class="caret" viewBox="0 0 12 12"><path d="m2 4 4 4 4-4H2Z" fill="currentColor"/></svg></a></div>`;

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
    const normalizeNextLabel=()=>{
      if(next && !next.disabled)next.textContent='下一步：自定义推广组合';
    };
    document.querySelectorAll('.goal').forEach(el=>el.addEventListener('click',()=>setTimeout(normalizeNextLabel,0)));
    normalizeNextLabel();
    if(next && typeof goals!=='undefined' && typeof song!=='undefined'){
      next.onclick=()=>{
        if(!goals.size)return;
        const selected=[...goals];
        const p=new URLSearchParams(song);
        p.set('goals',selected.join(','));
        p.set('goal',selected[0]);
        location.href='custom-combination.html?'+p.toString();
      };
    }
  }

  if(file==='promotion-method.html'){
    const expertLink=document.getElementById('expertLink');
    if(expertLink){
      const p=new URLSearchParams(location.search);
      expertLink.href='promotion-expert.html'+(p.toString()?'?'+p.toString():'');
    }
  }

  if(file==='order-confirm.html' && new URLSearchParams(location.search).get('mode')==='package'){
    const script=document.createElement('script');
    script.src='package-order-view.js';
    document.body.appendChild(script);
  }
})();