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
  const orderedNames=['QQ音乐','网易云音乐','酷狗音乐','酷我音乐','Apple Music','Spotify','YouTube Music','抖音','汽水音乐','TikTok','JOOX','KKBOX','MOOV','华为音乐','Amazon Music'];
  function normalize(name){
    const raw=String(name||'').trim();
    if(logos[raw])return raw;
    if(aliases[raw])return aliases[raw];
    if(/网易云/.test(raw))return '网易云音乐';
    if(/QQ/.test(raw))return 'QQ音乐';
    if(/酷狗/.test(raw))return '酷狗音乐';
    if(/酷我/.test(raw))return '酷我音乐';
    if(/YouTube/.test(raw))return 'YouTube Music';
    if(/Apple/.test(raw))return 'Apple Music';
    if(/Spotify/i.test(raw))return 'Spotify';
    if(/抖音|汽水/.test(raw))return '抖音';
    return '';
  }
  function img(name,className='platform-logo-img'){
    const key=normalize(name);
    if(!key||!logos[key])return '';
    return `<img class="${className}" src="${base}${logos[key]}" alt="${key}">`;
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
      .platform.has-real-logo,.platform-logo.has-real-logo,.token-logo.has-real-logo{background:#fff!important;color:transparent;border:1px solid #e1e5ec;overflow:hidden}
      .token-logo.has-real-logo{box-shadow:0 1px 2px rgba(30,35,45,.06)}
      .platform-logo-strip{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:7px}
      .platform-logo-chip{width:22px;height:22px;border:1px solid #e1e5ec;border-radius:5px;background:#fff;overflow:hidden;display:grid;place-items:center}
      .platform-logo-chip img{width:100%;height:100%;object-fit:cover}
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
    if(el.dataset.logoStripApplied==='1'||el.querySelector('.platform-logo-strip'))return;
    const names=namesIn(el.textContent||'');
    if(names.length<2)return;
    const strip=document.createElement('div');
    strip.className='platform-logo-strip';
    strip.innerHTML=names.map(name=>`<span class="platform-logo-chip" title="${name}">${img(name)}</span>`).join('');
    el.appendChild(strip);
    el.dataset.logoStripApplied='1';
  }
  function enhance(){
    ensureStyle();
    document.querySelectorAll('.platform,.platform-logo,.token-logo').forEach(replaceBadge);
    document.querySelectorAll('.service,.product-meta,.cart-service,.package-desc,.package-detail-item div,.package-proof-copy span').forEach(appendStrip);
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
