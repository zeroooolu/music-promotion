(()=>{
  const params=new URLSearchParams(location.search);
  if(params.get('mode')!=='package')return;

  document.body.classList.add('package-result-mode');

  const style=document.createElement('style');
  style.textContent=`
    .package-result-mode .items-card{padding:20px}
    .package-result-mode .package-summary{margin-bottom:8px}
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
  `;
  document.head.appendChild(style);

  const fixedResults={
    '官方歌单推荐':{result:'1 张官方垂类歌单推荐',meta:'QQ音乐 / 网易云音乐'},
    '资源位代申请':{result:'保底 5 个资源位申请',meta:'覆盖主流国内及海外音乐平台'},
    '抖音混剪':{result:'15 个优质账号参与传播',meta:'抖音混剪 · 万粉高互动优质账号'},
    '网易云歌单矩阵':{result:'18 万 / 月总播放',meta:'网易云歌单矩阵 · 执行 1 个月'},
    'QQ音乐歌单矩阵':{result:'28 万 / 月总播放',meta:'QQ音乐歌单矩阵 · 执行 1 个月'},
    '歌曲制作并上架':{result:'1 首歌曲制作并上架',meta:'合作 KTV 曲库'}
  };

  function stripSeparators(text){
    return text.replace(/^[·\s]+|[·\s]+$/g,'').replace(/\s{2,}/g,' ').trim();
  }

  function parseChoice(text){
    const raw=text.trim();
    let m;
    if((m=raw.match(/([\d,]+)\s*次播放/))){
      return {result:`<strong>${m[1]}</strong> 次播放`,meta:stripSeparators(raw.replace(m[0],''))};
    }
    if((m=raw.match(/保底\s*(\d+)\s*万播放/))){
      const rank=(raw.match(/排名参考\s*([^，]+(?:名)?)/)||[])[1];
      const level=(raw.split('·')[0]||'').trim();
      return {result:`保底 <strong>${m[1]} 万</strong>播放`,meta:[level,rank?`排名参考 ${rank}`:''].filter(Boolean).join(' · ')};
    }
    if(/KOC\s*1\s*个/.test(raw)&&/素人\s*3\s*个/.test(raw)){
      return {result:'<strong>4 个</strong>账号参与传播',meta:'小红书 · 1 个 KOC + 3 个素人账号'};
    }
    if((m=raw.match(/(\d+)\s*条/))){
      return {result:`<strong>${m[1]} 条</strong>内容`,meta:stripSeparators(raw.replace(m[0],''))};
    }
    if(/15\s*个/.test(raw)&&/账号/.test(raw)){
      return {result:'<strong>15 个</strong>账号参与传播',meta:'抖音混剪 · 万粉高互动优质账号'};
    }
    if((m=raw.match(/素人投放\s*(\d+)\s*个/))){
      return {result:`<strong>${m[1]} 个</strong>账号参与传播`,meta:'小红书 · 素人投放（粉丝 1–5k）'};
    }
    if((m=raw.match(/收藏\s*([\d,]+)\s*个/))){
      return {result:`<strong>${m[1]} 个</strong>收藏`,meta:stripSeparators(raw.replace(m[0],''))+'收藏'};
    }
    return {result:raw,meta:'套餐内可选执行方式'};
  }

  function enhanceFixed(item,title,resultEl,serviceEl){
    const fixed=fixedResults[title];
    if(!fixed)return;
    resultEl.innerHTML=`<span class="package-fixed-result">${fixed.result}</span>`;
    const original=serviceEl.textContent.trim();
    serviceEl.textContent=fixed.meta+(original&&!original.includes(fixed.meta)?` · ${original}`:'');
  }

  function enhanceChoiceItem(item,title,resultEl,serviceEl,wrap){
    const buttons=[...wrap.querySelectorAll('.choice')];
    buttons.forEach(btn=>{
      if(!btn.dataset.packageOriginal)btn.dataset.packageOriginal=btn.textContent.trim();
      const parsed=parseChoice(btn.dataset.packageOriginal);
      btn.innerHTML=`<span class="package-radio"></span><span class="package-choice-copy"><span class="package-choice-result">${parsed.result}</span><span class="package-choice-meta">${parsed.meta}</span></span>`;
    });
    const selected=buttons.find(b=>b.classList.contains('selected'))||buttons[0];
    if(selected){
      const parsed=parseChoice(selected.dataset.packageOriginal||selected.textContent);
      resultEl.innerHTML=parsed.result;
      serviceEl.textContent=`${title} · ${parsed.meta}`;
    }
  }

  function enhance(){
    document.querySelectorAll('#items .item').forEach(item=>{
      const resultEl=item.querySelector('.result');
      const serviceEl=item.querySelector('.service');
      if(!resultEl||!serviceEl)return;
      if(!item.dataset.packageTitle)item.dataset.packageTitle=resultEl.textContent.trim();
      const title=item.dataset.packageTitle;
      const wrap=item.querySelector('.choice-wrap');
      if(wrap)enhanceChoiceItem(item,title,resultEl,serviceEl,wrap);
      else enhanceFixed(item,title,resultEl,serviceEl);
    });
  }

  if(typeof window.renderItems==='function'){
    const baseRender=window.renderItems;
    window.renderItems=function(){
      baseRender();
      enhance();
    };
  }

  enhance();
})();
