(()=>{
  const params=new URLSearchParams(location.search);
  if(params.get('mode')!=='package')return;
  if(document.body.dataset.packageOrderEnhanced==='1')return;
  document.body.dataset.packageOrderEnhanced='1';

  document.body.classList.add('package-result-mode');
  const packageId=params.get('package')||'popular-1';

  const style=document.createElement('style');
  style.textContent=`
    .package-result-mode .items-card{padding:20px}
    .package-result-mode .package-summary{margin-bottom:8px;padding:12px 15px}
    .package-result-mode .package-summary span{display:none}
    .package-result-mode .item{padding:16px 2px}
    .package-result-mode .item-main{align-items:center}
    .package-result-mode .result{font-size:18px;line-height:1.35;color:var(--brand);font-weight:650}
    .package-result-mode .service{margin-top:5px;color:#858c97;font-size:11px;line-height:1.55}
    .package-result-mode .choice-wrap{margin:12px 0 0 48px;padding:3px 0 3px 17px;border:0;border-left:2px solid #e3e7ef;border-radius:0;background:transparent}
    .package-result-mode .choice-label{padding:5px 0 7px;margin:0;color:#8f96a1;font-size:11px}
    .package-result-mode .choice-options{display:block}
    .package-result-mode .choice{width:100%;height:auto;min-height:54px;padding:8px 9px;border:0;border-radius:4px;background:transparent;color:#444b55;display:grid;grid-template-columns:15px minmax(0,1fr);gap:10px;align-items:center;text-align:left}
    .package-result-mode .choice:hover{background:#f8f9fc;color:#444b55}
    .package-result-mode .choice.selected{background:#f5f7ff;color:#444b55;font-weight:400}
    .package-result-mode .package-radio{width:15px;height:15px;border:1px solid #cfd5df;border-radius:50%;display:grid;place-items:center;flex:none}
    .package-result-mode .choice.selected .package-radio{border-color:var(--brand)}
    .package-result-mode .choice.selected .package-radio:after{content:"";width:7px;height:7px;border-radius:50%;background:var(--brand)}
    .package-result-mode .package-choice-copy{display:block;min-width:0}
    .package-result-mode .package-choice-result{display:block;color:#444b55;font-size:13px;font-weight:600;line-height:1.35}
    .package-result-mode .package-choice-result strong{color:var(--brand);font-size:18px;font-weight:650}
    .package-result-mode .package-choice-meta{display:block;margin-top:3px;color:#929aa5;font-size:10px;line-height:1.45}
    .package-result-mode .choice-detail{margin:7px 9px 2px;color:#929aa5;font-size:10px;line-height:1.6}
    .package-result-mode .package-fixed-label{display:block;color:#444b55;font-size:13px;font-weight:600}
    .package-result-mode .package-fixed-result{color:var(--brand);font-size:18px;font-weight:650}
    .package-result-mode .checkout-column{display:grid;gap:12px;align-self:start}
    .package-result-mode .checkout-column .checkout{position:sticky;top:16px}
    .package-proof{background:#fff;border:1px solid var(--border2);border-radius:4px;padding:15px 16px}
    .package-proof-head{display:flex;align-items:flex-start;gap:10px}
    .package-proof-avatar{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#eef2ff;color:var(--brand);font-size:13px;font-weight:700;flex:none}
    .package-proof-copy{min-width:0;flex:1}
    .package-proof-copy strong{display:block;color:#3d4654;font-size:12px;line-height:1.5;font-weight:600}
    .package-proof-copy span{display:block;margin-top:3px;color:#9aa0aa;font-size:10px}
    .package-proof-result{margin:11px 0 0;padding:10px 11px;border-radius:4px;background:#f7f9ff;color:#4e5870;font-size:11px;line-height:1.6}
    .package-proof-result b{color:var(--brand);font-size:13px}
    .package-proof-action{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:10px}
    .package-proof-action small{color:#a0a6af;font-size:9px;line-height:1.45}
    .package-proof-btn{border:0;background:transparent;color:var(--brand);padding:3px 0;font-size:11px;white-space:nowrap}
    .package-proof-btn:hover{text-decoration:underline}
    @media(max-width:1240px){.package-result-mode .checkout-column .checkout{position:static}}
  `;
  document.head.appendChild(style);

  const fixedResults={
    '官方歌单推荐':{result:'1 张官方垂类歌单推荐',meta:'QQ音乐 / 网易云音乐'},
    '资源位代申请':{result:'保底获得 5 个音乐平台推荐资源位',meta:'覆盖主流国内及海外音乐平台，由服务团队统筹匹配'},
    '音乐平台推荐资源位':{result:'保底获得 5 个音乐平台推荐资源位',meta:'覆盖主流国内及海外音乐平台，由服务团队统筹匹配'},
    '抖音混剪':{result:'15 个万粉账号参与传播',meta:'抖音混剪 · 万粉高互动优质账号'},
    '网易云歌单矩阵':{result:'18 万 / 月总播放',meta:'网易云歌单矩阵 · 执行 1 个月'},
    'QQ音乐歌单矩阵':{result:'28 万 / 月总播放',meta:'QQ音乐歌单矩阵 · 执行 1 个月'},
    '歌曲制作并上架':{result:'1 首歌曲制作并上架',meta:'合作 KTV 曲库'}
  };

  const proofData={
    'popular-2':{
      packageName:'养歌加强包',
      platform:'QQ 音乐',
      result:'连续 3 期进入 QQ 音乐飙升榜 <b>TOP 20</b>',
      detail:'QQ 音乐飙升榜案例：已有音乐人连续 3 期进入 QQ 音乐飙升榜 TOP 20。'
    },
    'allround-1':{
      packageName:'全能破圈包',
      platform:'网易云音乐',
      result:'网易云播放量在 7 天内突破 <b>10 万</b>',
      detail:'网易云破圈案例：已有音乐人推广后网易云播放量在 7 天内突破 10 万。'
    }
  };

  function stripSeparators(text){return text.replace(/^[·\s]+|[·\s]+$/g,'').replace(/\s{2,}/g,' ').trim()}
  function parseChoice(text){
    const raw=text.trim();let m;
    if((m=raw.match(/([\d,]+)\s*次(?:真实)?播放/)))return {result:`<strong>${m[1]}</strong> 次真实播放`,meta:stripSeparators(raw.replace(m[0],''))};
    if((m=raw.match(/保底\s*(\d+)\s*万播放/))){const rank=(raw.match(/排名参考\s*([^，·]+(?:名)?)/)||[])[1];const priceNote=(raw.match(/(套餐已含|补差\s*\+?¥[\d,]+)/)||[])[1];const level=(raw.split('·')[0]||'').trim();return {result:`保底 <strong>${m[1]} 万</strong>播放`,meta:[level,rank?`排名参考 ${rank}`:'',priceNote||''].filter(Boolean).join(' · ')}}
    if(/KOC\s*1\s*个/.test(raw)&&/素人\s*3\s*个/.test(raw))return {result:'<strong>4 个</strong>账号参与传播',meta:'小红书 · 1 个 KOC + 3 个素人账号'};
    if((m=raw.match(/(\d+)\s*条/)))return {result:`<strong>${m[1]} 条</strong>内容`,meta:stripSeparators(raw.replace(m[0],''))};
    if(/15\s*个/.test(raw)&&/账号/.test(raw))return {result:'<strong>15 个</strong>账号参与传播',meta:'抖音混剪 · 万粉高互动优质账号'};
    if((m=raw.match(/素人投放\s*(\d+)\s*个/)))return {result:`<strong>${m[1]} 个</strong>账号参与传播`,meta:'小红书 · 素人投放（粉丝 1–5k）'};
    if((m=raw.match(/收藏\s*([\d,]+)\s*个/)))return {result:`<strong>${m[1]} 个</strong>收藏`,meta:stripSeparators(raw.replace(m[0],''))+'收藏'};
    return {result:raw,meta:'套餐内可选执行方式'};
  }

  function enhanceFixed(item,title,resultEl,serviceEl){
    const fixed=fixedResults[title];if(!fixed)return;
    resultEl.innerHTML=`<span class="package-fixed-result">${fixed.result}</span>`;
    const original=serviceEl.textContent.trim();serviceEl.textContent=fixed.meta+(original&&!original.includes(fixed.meta)?` · ${original}`:'');
  }
  function enhanceChoiceItem(item,title,resultEl,serviceEl,wrap){
    const buttons=[...wrap.querySelectorAll('.choice')];
    buttons.forEach(btn=>{if(!btn.dataset.packageOriginal)btn.dataset.packageOriginal=btn.textContent.trim();const parsed=parseChoice(btn.dataset.packageOriginal);btn.innerHTML=`<span class="package-radio"></span><span class="package-choice-copy"><span class="package-choice-result">${parsed.result}</span><span class="package-choice-meta">${parsed.meta}</span></span>`});
    const selected=buttons.find(b=>b.classList.contains('selected'))||buttons[0];
    if(selected){const parsed=parseChoice(selected.dataset.packageOriginal||selected.textContent);resultEl.innerHTML=parsed.result;serviceEl.textContent=`${title} · ${parsed.meta}`}
  }
  function enhance(){
    document.querySelectorAll('#items .item').forEach(item=>{const resultEl=item.querySelector('.result'),serviceEl=item.querySelector('.service');if(!resultEl||!serviceEl)return;if(!item.dataset.packageTitle)item.dataset.packageTitle=resultEl.textContent.trim();const title=item.dataset.packageTitle,wrap=item.querySelector('.choice-wrap');if(wrap)enhanceChoiceItem(item,title,resultEl,serviceEl,wrap);else enhanceFixed(item,title,resultEl,serviceEl)});
  }

  function installProofCard(){
    const proof=proofData[packageId];if(!proof)return;
    const checkout=document.querySelector('.checkout');if(!checkout||document.querySelector('.package-proof'))return;
    let column=checkout.parentElement;
    if(!column.classList.contains('checkout-column')){
      column=document.createElement('div');column.className='checkout-column';checkout.parentNode.insertBefore(column,checkout);column.appendChild(checkout);
    }
    const card=document.createElement('section');card.className='package-proof';
    card.innerHTML=`<div class="package-proof-head"><div class="package-proof-avatar">♪</div><div class="package-proof-copy"><strong>近期有音乐人选择了「${proof.packageName}」</strong><span>近期推广案例 · ${proof.platform}</span></div></div><div class="package-proof-result">${proof.result}</div><div class="package-proof-action"><small>历史案例仅供参考，不代表未来推广效果</small><button class="package-proof-btn" type="button">查看案例 →</button></div>`;
    card.querySelector('.package-proof-btn').onclick=()=>alert(`${proof.detail}\n\n案例为历史推广结果，仅供参考，不代表或承诺未来推广效果。实际效果受作品内容、投放周期、平台规则等因素影响。`);
    column.appendChild(card);
  }

  if(typeof window.renderItems==='function'){
    const baseRender=window.renderItems;
    window.renderItems=function(){baseRender();enhance()};
  }
  enhance();
  installProofCard();
})();
