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
    .package-result-mode .item{padding:17px 2px}
    .package-result-mode .item-main{align-items:center}
    .package-result-mode .result{font-size:15px;line-height:1.4;color:var(--strong);font-weight:600}
    .package-result-mode .service{margin-top:5px;color:#858c97;font-size:11px;line-height:1.55}
    .package-result-mode .choice-wrap{margin:12px 0 0 48px;padding:5px 0 4px 17px;border:0;border-left:2px solid #e3e7ef;border-radius:0;background:transparent}
    .package-result-mode .choice-label{padding:5px 9px 7px;margin:0;color:#8f96a1;font-size:11px}
    .package-result-mode .choice-options{display:block}
    .package-result-mode .choice{width:100%;height:auto;min-height:54px;padding:8px 9px;border:0;border-radius:4px;background:transparent;color:#444b55;display:grid;grid-template-columns:15px minmax(0,1fr) auto;gap:10px;align-items:center;text-align:left}
    .package-result-mode .choice:hover{background:#f8f9fc;color:#444b55}
    .package-result-mode .choice.selected{background:#f5f7ff;color:#444b55;font-weight:400}
    .package-result-mode .package-radio{width:15px;height:15px;border:1px solid #cfd5df;border-radius:50%;display:grid;place-items:center;flex:none}
    .package-result-mode .choice.selected .package-radio{border-color:var(--brand)}
    .package-result-mode .choice.selected .package-radio:after{content:"";width:7px;height:7px;border-radius:50%;background:var(--brand)}
    .package-result-mode .package-choice-copy{display:block;min-width:0}
    .package-result-mode .package-choice-result{display:block;color:#444b55;font-size:13px;font-weight:600;line-height:1.35}
    .package-result-mode .package-choice-result strong{color:var(--brand);font-size:17px;font-weight:650}
    .package-result-mode .package-choice-meta{display:block;margin-top:3px;color:#929aa5;font-size:10px;line-height:1.45}
    .package-result-mode .package-choice-status{height:20px;display:inline-flex;align-items:center;padding:0 7px;border-radius:10px;background:#e8edff;color:var(--brand);font-size:9px;font-weight:600;opacity:0}
    .package-result-mode .choice.selected .package-choice-status{opacity:1}
    .package-result-mode .choice-detail{margin:7px 9px 2px;color:#929aa5;font-size:10px;line-height:1.6}
  `;
  document.head.appendChild(style);

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

  function enhanceChoices(){
    document.querySelectorAll('#items .choice').forEach(btn=>{
      const original=btn.dataset.packageOriginal||btn.textContent.trim();
      btn.dataset.packageOriginal=original;
      const parsed=parseChoice(original);
      btn.innerHTML=`<span class="package-radio"></span><span class="package-choice-copy"><span class="package-choice-result">${parsed.result}</span><span class="package-choice-meta">${parsed.meta}</span></span><span class="package-choice-status">已选</span>`;
    });
  }

  function fillProofCard(){
    const card=document.getElementById('packageProof');
    if(!card)return;
    const proof=proofData[packageId];
    if(!proof){card.hidden=true;return}
    document.getElementById('packageProofTitle').textContent=`近期有音乐人选择了「${proof.packageName}」`;
    document.getElementById('packageProofMeta').textContent=`近期推广案例 · ${proof.platform}`;
    document.getElementById('packageProofResult').innerHTML=proof.result;
    document.getElementById('packageProofBtn').onclick=()=>alert(`${proof.detail}\n\n案例为历史推广结果，仅供参考，不代表或承诺未来推广效果。实际效果受作品内容、投放周期、平台规则等因素影响。`);
    card.hidden=false;
  }

  if(typeof window.renderItems==='function'){
    const baseRender=window.renderItems;
    window.renderItems=function(){baseRender();enhanceChoices()};
  }
  enhanceChoices();
  fillProofCard();
})();
