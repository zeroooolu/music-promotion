(()=>{
  const base='assets/platform-logos/';
  const logos={
    'QQ音乐':'qq-music.png',
    '网易云音乐':'netease-music.jpg',
    '网易云':'netease-music.jpg',
    '酷狗音乐':'kugou-music.png',
    '酷狗':'kugou-music.png',
    '酷我音乐':'kuwo-music.png',
    '酷我':'kuwo-music.png',
    'Spotify':'spotify.jpeg',
    'Apple Music':'apple-music.jpg',
    'YouTube':'youtube-music.jpg',
    'YouTube Music':'youtube-music.jpg',
    '抖音':'douyin-qishui.jpg',
    '汽水音乐':'douyin-qishui.jpg',
    'TikTok':'tiktok.jpeg',
    'JOOX':'joox.png',
    'KKBOX':'kkbox.png',
    'MOOV':'moov.png',
    '华为音乐':'huawei-music.jpg',
    'Amazon Music':'amazon-music.png'
  };
  const inlineIcons={
    '小红书':'<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M7.1 5.7h13.8a2.4 2.4 0 0 1 2.4 2.4v11.8a2.4 2.4 0 0 1-2.4 2.4H7.1a2.4 2.4 0 0 1-2.4-2.4V8.1a2.4 2.4 0 0 1 2.4-2.4Z"></path><path d="M9 10.2h10M9 14h6.2M9 17.8h8.3"></path></svg>',
    'KTV':'<svg viewBox="0 0 28 28" aria-hidden="true"><rect x="10" y="4" width="8" height="13" rx="4"></rect><path d="M7 13a7 7 0 0 0 14 0M14 20v4M10.5 24h7"></path></svg>'
  };
  const aliases={
    Q:'QQ音乐',
    易:'网易云音乐',
    云:'网易云音乐',
    狗:'酷狗音乐',
    酷:'酷狗音乐',
    我:'酷我音乐',
    S:'Spotify',
    Y:'YouTube Music',
    抖:'抖音'
  };
  const goalLabels={
    plays:'提升播放曝光',
    playlist:'进入更多歌单',
    social:'短视频·内容传播',
    global:'推广到海外',
    chart:'提升热度、互动量或冲榜',
    ktv:'上架到 KTV'
  };
  const orderedNames=['QQ音乐','网易云音乐','酷狗音乐','酷我音乐','Apple Music','Spotify','YouTube Music','抖音','汽水音乐','TikTok','小红书','KTV','JOOX','KKBOX','MOOV','华为音乐','Amazon Music'];
  function normalize(name){
    const raw=String(name||'').trim();
    if(logos[raw]||inlineIcons[raw])return raw;
    if(aliases[raw])return aliases[raw];
    if(/网易云/.test(raw))return '网易云音乐';
    if(/QQ/.test(raw))return 'QQ音乐';
    if(/酷狗/.test(raw))return '酷狗音乐';
    if(/酷我/.test(raw))return '酷我音乐';
    if(/YouTube/.test(raw))return 'YouTube Music';
    if(/Apple/.test(raw))return 'Apple Music';
    if(/Spotify/i.test(raw))return 'Spotify';
    if(/抖音|汽水/.test(raw))return '抖音';
    if(/小红书/.test(raw))return '小红书';
    if(/KTV/i.test(raw))return 'KTV';
    return '';
  }
  function img(name,className='platform-logo-img'){
    const key=normalize(name);
    if(!key)return '';
    if(logos[key])return `<img class="${className}" src="${base}${logos[key]}" alt="${key}">`;
    if(inlineIcons[key])return `<span class="${className} platform-logo-inline platform-logo-inline-${key==='KTV'?'ktv':'xiaohongshu'}" role="img" aria-label="${key}">${inlineIcons[key]}</span>`;
    return '';
  }
  function namesIn(text){
    const found=[];
    orderedNames.forEach(name=>{
      if(text.includes(name)&&!found.includes(normalize(name)))found.push(normalize(name));
    });
    if(/网易云/.test(text)&&!found.includes('网易云音乐'))found.push('网易云音乐');
    if(/QQ/.test(text)&&!found.includes('QQ音乐'))found.push('QQ音乐');
    if(/酷狗/.test(text)&&!found.includes('酷狗音乐'))found.push('酷狗音乐');
    if(/酷我/.test(text)&&!found.includes('酷我音乐'))found.push('酷我音乐');
    return found.filter(Boolean).slice(0,10);
  }
  function ensureStyle(){
    if(document.getElementById('platform-logo-style'))return;
    const style=document.createElement('style');
    style.id='platform-logo-style';
    style.textContent=`
      .platform-logo-img{display:block;width:100%;height:100%;object-fit:cover;border-radius:inherit}
      .platform-logo-inline{display:grid!important;place-items:center;width:100%;height:100%;background:transparent!important}
      .platform-logo-inline svg{display:block;width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
      .platform-logo-inline-xiaohongshu{color:#ff2442!important}
      .platform-logo-inline-ktv{color:#7655d9!important}
      .platform.has-real-logo,.platform-logo.has-real-logo,.token-logo.has-real-logo{background:#fff!important;color:transparent;border:1px solid #e1e5ec;overflow:hidden}
      .token-logo.has-real-logo{box-shadow:0 1px 2px rgba(30,35,45,.06)}
      .platform-logo-strip{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:7px}
      .platform-logo-chip{width:22px;height:22px;border:1px solid #e1e5ec;border-radius:5px;background:#fff;overflow:hidden;display:grid;place-items:center}
      .platform-logo-chip img{width:100%;height:100%;object-fit:cover}
      body[data-star-page="custom-combination"] .product .platform.has-real-logo{width:30px;height:30px;border:0!important;border-radius:0;background:transparent!important;overflow:visible;box-shadow:none!important}
      body[data-star-page="custom-combination"] .product .platform.has-real-logo>.platform-logo-img{object-fit:contain;border-radius:0}
      body[data-star-page="custom-combination"] .product .platform.has-real-logo>.platform-logo-inline{width:27px;height:27px}
      body[data-star-page="custom-combination"] .cart-item-main{display:flex;align-items:flex-start;gap:9px;min-width:0;flex:1}
      body[data-star-page="custom-combination"] .cart-platform-copy{min-width:0;flex:1}
      body[data-star-page="custom-combination"] .cart-platform-icon{width:27px;height:27px;display:grid;place-items:center;flex:none;margin-top:1px;color:#657085}
      body[data-star-page="custom-combination"] .cart-platform-icon>.platform-logo-img{object-fit:contain;border-radius:0}
      body[data-star-page="custom-combination"] .cart-platform-icon>.platform-logo-inline{width:25px;height:25px}
      body[data-star-page="order-confirm"] .item .platform.has-real-logo{border:0!important;border-radius:0;background:transparent!important;overflow:visible;box-shadow:none!important}
      body[data-star-page="order-confirm"] .item .platform.has-real-logo>.platform-logo-img{object-fit:contain;border-radius:0}
      body[data-star-page="order-confirm"] .item .platform.has-real-logo>.platform-logo-inline{width:31px;height:31px}
    `;
    document.head.appendChild(style);
  }
  function replaceBadge(el){
    if(el.dataset.logoApplied==='1')return;
    const label=el.getAttribute('data-platform')||el.getAttribute('aria-label')||el.textContent;
    const key=normalize(label);
    if(!key)return;
    el.dataset.logoApplied='1';
    el.dataset.platform=key;
    el.setAttribute('aria-label',key);
    el.classList.add('has-real-logo');
    el.innerHTML=img(key);
  }
  function appendStrip(el){
    const product=el.closest?.('.product');
    if(product?.querySelector('[data-toggle="platform-recommendation-resource"]')){
      el.querySelector('.platform-logo-strip')?.remove();
      el.dataset.logoStripApplied='1';
      return;
    }
    if(el.dataset.logoStripApplied==='1'||el.querySelector('.platform-logo-strip'))return;
    const names=namesIn(el.textContent||'');
    if(names.length<2)return;
    const strip=document.createElement('div');
    strip.className='platform-logo-strip';
    strip.innerHTML=names.map(name=>`<span class="platform-logo-chip" title="${name}">${img(name)}</span>`).join('');
    el.appendChild(strip);
    el.dataset.logoStripApplied='1';
  }
  function enhanceCustomCombinationCart(){
    if((location.pathname.split('/').pop()||'').toLowerCase()!=='custom-combination.html')return;
    document.body.dataset.starPage='custom-combination';
    document.querySelectorAll('.cart-item').forEach(item=>{
      if(item.dataset.platformIconApplied==='1')return;
      const top=item.querySelector('.cart-item-top');
      const service=item.querySelector('.cart-service');
      const info=top?.firstElementChild;
      if(!top||!service||!info||info.classList.contains('cart-item-main'))return;
      const platform=(service.textContent||'').split('·')[0].trim();
      const iconHtml=img(platform);
      if(!iconHtml)return;
      const main=document.createElement('div');
      main.className='cart-item-main';
      const icon=document.createElement('span');
      icon.className='cart-platform-icon';
      icon.setAttribute('aria-hidden','true');
      icon.innerHTML=iconHtml;
      const copy=document.createElement('div');
      copy.className='cart-platform-copy';
      while(info.firstChild)copy.appendChild(info.firstChild);
      main.append(icon,copy);
      info.replaceWith(main);
      item.dataset.platformIconApplied='1';
    });
  }
  function enhanceOrderGoalLabels(){
    if((location.pathname.split('/').pop()||'').toLowerCase()!=='order-confirm.html')return;
    document.body.dataset.starPage='order-confirm';
    document.querySelectorAll('.goal-tag').forEach(tag=>{
      const value=(tag.textContent||'').trim();
      const next=goalLabels[value]||({
        '短视频 / 内容传播':'短视频·内容传播',
        '做短视频 / 内容传播':'短视频·内容传播',
        '头部热度冲刺':'提升热度、互动量或冲榜',
        '提升热度·冲榜':'提升热度、互动量或冲榜'
      })[value];
      if(next)tag.textContent=next;
    });
  }
  function enhance(){
    ensureStyle();
    document.querySelectorAll('.platform,.platform-logo,.token-logo').forEach(replaceBadge);
    document.querySelectorAll('.service,.product-meta,.cart-service,.package-desc,.package-detail-item div,.package-proof-copy span').forEach(appendStrip);
    enhanceCustomCombinationCart();
    enhanceOrderGoalLabels();
  }
  window.platformLogoHtml=(name,className)=>img(name,className);
  window.enhancePlatformLogos=enhance;
  const observer=new MutationObserver(()=>enhance());
  if(document.body)observer.observe(document.body,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);
  else enhance();

  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  if(file==='index.html'){
    const applySongListCopy=()=>{
      const title=document.querySelector('.songs-title');
      const subtitle=document.querySelector('.songs-subtitle');
      if(title)title.textContent='选择一首歌曲开始推广';
      if(subtitle){
        subtitle.textContent='歌曲按发布时间从新到旧排序';
        subtitle.style.display='block';
      }
    };
    applySongListCopy();
    setTimeout(applySongListCopy,250);
    setTimeout(applySongListCopy,500);
  }
  if(file==='promotion-order-detail.html'&&!document.querySelector('script[data-promotion-orders-polish]')){
    const script=document.createElement('script');
    script.src='promotion-orders-polish.js';
    script.dataset.promotionOrdersPolish='1';
    document.body.appendChild(script);
  }
})();
