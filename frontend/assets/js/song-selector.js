(()=>{
const LIBRARY=[
 {title:'夏夜的风',artist:'林屿',album:'夏夜的风',year:'2026',platform:'星球发行',tone:['#ff665f','#7655ff']},
 {title:'没有寄出的信',artist:'林屿',album:'没有寄出的信',year:'2026',platform:'星球发行',tone:['#3d73ff','#70d8ff']},
 {title:'凌晨三点',artist:'Mori',album:'凌晨三点',year:'2025',platform:'星球发行',tone:['#20242c','#9c72ff']},
 {title:'慢慢靠近',artist:'Mori',album:'靠近',year:'2025',platform:'星球发行',tone:['#ff8a49','#ffd36e']},
 {title:'海岸线以北',artist:'Nora',album:'海岸线以北',year:'2026',platform:'星球发行',tone:['#118d90','#72e5c7']}
];
const PLATFORMS=[
 {key:'netease',label:'网易云音乐',mark:'云',match:u=>u.includes('music.163.com'),demo:['夏夜的风','林屿']},
 {key:'qq',label:'QQ音乐',mark:'Q',match:u=>u.includes('y.qq.com')||u.includes('c.y.qq.com'),demo:['没有寄出的信','林屿']},
 {key:'kugou',label:'酷狗音乐',mark:'K',match:u=>u.includes('kugou.com'),demo:['凌晨三点','Mori']},
 {key:'kuwo',label:'酷我音乐',mark:'酷',match:u=>u.includes('kuwo.cn'),demo:['慢慢靠近','Mori']},
 {key:'qishui',label:'汽水音乐',mark:'汽',match:u=>u.includes('qishui.douyin.com')||u.includes('music.douyin.com'),demo:['海岸线以北','Nora']},
 {key:'spotify',label:'Spotify',mark:'S',match:u=>u.includes('open.spotify.com'),demo:['Moonlit Drive','Mori']},
 {key:'youtube',label:'YouTube',mark:'▶',match:u=>u.includes('youtube.com')||u.includes('youtu.be'),demo:['凌晨三点 (Official Video)','Mori']}
];
function cover(text,c1='#ff665f',c2='#7655ff'){
 const safe=String(text||'♪').slice(0,4).replace(/[&<>"']/g,'');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="160" height="160" rx="28" fill="url(#g)"/><circle cx="116" cy="44" r="38" fill="rgba(255,255,255,.12)"/><text x="18" y="140" fill="white" font-family="Arial,sans-serif" font-size="22" font-weight="700">${safe}</text></svg>`;
 return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
}
function esc(v){return String(v??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));}
function platformFor(url){const u=url.toLowerCase();return PLATFORMS.find(p=>p.match(u))||null;}
function html(){
 return `<div class="sp-choices">
   <button type="button" class="sp-choice active" data-sp-tab="external"><strong>粘贴歌曲链接</strong><span>支持主流流媒体平台，粘贴后自动识别歌曲信息</span></button>
   <button type="button" class="sp-choice" data-sp-tab="library"><strong>从星球发行中选择歌曲</strong><span>登录星球发行后，搜索并选择当前账号发行的歌曲</span></button>
 </div>
 <div class="sp-pane active" data-sp-pane="external">
   <label class="sp-label">歌曲链接</label>
   <div class="sp-linkbox"><input data-sp-link placeholder="粘贴网易云、QQ音乐、Spotify 等歌曲链接"><div class="sp-platforms">${PLATFORMS.map(p=>`<span class="sp-platform" data-sp-platform="${p.key}" title="${p.label}">${p.mark}</span>`).join('')}</div></div>
   <div class="sp-helper">粘贴完整歌曲链接，我们会识别平台并提取歌曲封面、名称和艺人。</div>
   <div class="sp-state" data-sp-state></div>
   <div class="sp-result" data-sp-result><img class="sp-cover" data-sp-result-cover alt="歌曲封面"><div class="sp-meta"><strong data-sp-result-title></strong><span data-sp-result-artist></span><span class="sp-pill" data-sp-result-platform></span></div><button type="button" class="sp-mini" data-sp-use-link>使用这首歌</button></div>
 </div>
 <div class="sp-pane" data-sp-pane="library">
   <div class="sp-login-card" data-sp-login-card><div><strong>登录星球发行，选择你已发行的歌曲</strong><p>登录后可以直接搜索当前账号通过星球发行的歌曲，不需要再复制歌曲链接。</p></div><button type="button" class="sp-primary" data-sp-login>登录星球发行</button></div>
   <div class="sp-library" data-sp-library><div class="sp-account"><span>已登录星球发行账号</span><strong data-sp-account>demo@kanjian.com</strong></div><div class="sp-searchbox"><span>⌕</span><input data-sp-search placeholder="搜索歌曲名或艺人"></div><div class="sp-dropdown" data-sp-dropdown></div><div class="sp-helper">输入关键词搜索；点击下拉结果即可选择歌曲。</div></div>
 </div>
 <div class="sp-selected" data-sp-selected><img class="sp-cover" data-sp-selected-cover alt="已选择歌曲封面"><div class="sp-selected-copy"><strong data-sp-selected-title></strong><span data-sp-selected-info></span><span class="sp-pill">已选择</span></div><button type="button" class="sp-mini" data-sp-change>更换</button></div>
 <div class="sp-modal" data-sp-modal><div class="sp-dialog"><div class="sp-dialog-head"><div><h3>登录星球发行</h3><p>登录后即可选择你通过星球发行的歌曲。本页面仅演示登录交互。</p></div><button type="button" class="sp-close" data-sp-close>×</button></div><div class="sp-form"><input data-sp-account-input placeholder="手机号或邮箱" value="demo@kanjian.com"><input data-sp-code-input placeholder="验证码" value="123456"><button type="button" class="sp-primary" data-sp-submit-login>登录并选择歌曲</button></div><div class="sp-demo">Demo：任意账号和验证码均可登录</div></div></div>`;
}
function mount(root,options={}){
 root.innerHTML=html();
 let selected=null,resolved=null,timer=null,logged=false;
 const q=s=>root.querySelector(s),qa=s=>[...root.querySelectorAll(s)];
 const tabs=qa('[data-sp-tab]');
 function showTab(name){tabs.forEach(x=>x.classList.toggle('active',x.dataset.spTab===name));qa('[data-sp-pane]').forEach(x=>x.classList.toggle('active',x.dataset.spPane===name));if(name==='library'&&logged){q('[data-sp-search]').focus();renderLibrary('');}}
 tabs.forEach(x=>x.addEventListener('click',()=>showTab(x.dataset.spTab)));
 function emit(song){selected=song;const box=q('[data-sp-selected]');box.classList.add('show');q('[data-sp-selected-cover]').src=song.cover;q('[data-sp-selected-title]').textContent=song.title;q('[data-sp-selected-info]').textContent=[song.artist,song.platform].filter(Boolean).join(' · ');root.dispatchEvent(new CustomEvent('songselected',{detail:song,bubbles:true}));}
 q('[data-sp-change]').addEventListener('click',()=>{q('[data-sp-selected]').classList.remove('show');selected=null;root.dispatchEvent(new CustomEvent('songcleared',{bubbles:true}));});
 const input=q('[data-sp-link]'),state=q('[data-sp-state]'),result=q('[data-sp-result]');
 input.addEventListener('input',()=>{
   clearTimeout(timer);resolved=null;result.classList.remove('show');state.className='sp-state';state.textContent='';qa('[data-sp-platform]').forEach(x=>x.classList.remove('on'));
   const value=input.value.trim();if(!value)return;
   if(!/^https?:\/\//i.test(value)){state.textContent='请输入完整的 http / https 歌曲链接';state.classList.add('warn');return;}
   const p=platformFor(value);if(!p){state.textContent='暂未识别这个链接。请尝试网易云、QQ音乐、酷狗、酷我、汽水、Spotify 或 YouTube。';state.classList.add('warn');return;}
   const icon=q(`[data-sp-platform="${p.key}"]`);if(icon)icon.classList.add('on');state.textContent=`正在识别 ${p.label} 歌曲…`;
   timer=setTimeout(()=>{const [title,artist]=p.demo;resolved={title,artist,platform:p.label,source:'external',url:value,cover:cover(p.mark,p.key==='spotify'?'#1db954':'#ff665f',p.key==='youtube'?'#ff0000':'#7655ff')};q('[data-sp-result-cover]').src=resolved.cover;q('[data-sp-result-title]').textContent=title;q('[data-sp-result-artist]').textContent=artist;q('[data-sp-result-platform]').textContent=p.label;state.textContent='✓ 已识别歌曲信息';state.className='sp-state ok';result.classList.add('show');},520);
 });
 q('[data-sp-use-link]').addEventListener('click',()=>{if(resolved)emit(resolved);});
 const modal=q('[data-sp-modal]'),loginCard=q('[data-sp-login-card]'),library=q('[data-sp-library]'),dropdown=q('[data-sp-dropdown]'),search=q('[data-sp-search]');
 function openModal(){modal.classList.add('show');}
 function closeModal(){modal.classList.remove('show');}
 q('[data-sp-login]').addEventListener('click',openModal);q('[data-sp-close]').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
 q('[data-sp-submit-login]').addEventListener('click',()=>{logged=true;const account=q('[data-sp-account-input]').value.trim()||'demo@kanjian.com';q('[data-sp-account]').textContent=account;loginCard.style.display='none';library.classList.add('show');closeModal();renderLibrary('');setTimeout(()=>{search.focus();dropdown.classList.add('show');},80);});
 function renderLibrary(query=''){
   const term=query.trim().toLowerCase();const list=LIBRARY.filter(s=>!term||(s.title+s.artist+s.album).toLowerCase().includes(term));dropdown.innerHTML=list.length?list.map((s,i)=>`<div class="sp-item" data-sp-index="${LIBRARY.indexOf(s)}"><img src="${cover(s.title,s.tone[0],s.tone[1])}" alt=""><div><strong>${esc(s.title)}</strong><span>${esc(s.artist)} · ${esc(s.album)} · ${s.year}</span></div></div>`).join(''):'<div class="sp-helper" style="padding:12px">没有找到匹配歌曲</div>';dropdown.classList.add('show');dropdown.querySelectorAll('[data-sp-index]').forEach(el=>el.addEventListener('click',()=>{const s=LIBRARY[Number(el.dataset.spIndex)];emit({...s,source:'library',cover:cover(s.title,s.tone[0],s.tone[1])});dropdown.classList.remove('show');search.value=s.title;}));
 }
 search.addEventListener('focus',()=>renderLibrary(search.value));search.addEventListener('input',()=>renderLibrary(search.value));document.addEventListener('click',e=>{if(!root.contains(e.target))dropdown.classList.remove('show');});
 if(options.initial&&options.initial.title){emit({...options.initial,cover:options.initial.cover||cover(options.initial.title)});}
 return {getSelected:()=>selected,showTab,select:emit};
}
window.KJSongPicker={mount,cover};
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-song-picker]').forEach(root=>{if(!root.__songPicker)root.__songPicker=mount(root);});});
})();