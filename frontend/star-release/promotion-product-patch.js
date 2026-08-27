(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();

  if(file==='custom-combination.html'){
    try{
      const xhs=products.social.find(p=>p.id==='xiaohongshu-promotion');
      if(xhs){
        xhs.quantitySpecs=xhs.quantitySpecs.filter(s=>!s.name.includes('5–10w')&&!s.name.includes('20w+')).slice(0,4);
        xhs.hint='4 种达人规格，可组合购买';
        xhs.priceHint='¥300 起';
      }

      ['netease-play','qq-play','kugou-play','kuwo-play'].forEach(id=>{
        const p=products.plays.find(x=>x.id===id);
        if(p)p.meta='';
      });

      const qq=products.chart.find(p=>p.id==='qq-chart-sprint');
      if(qq){
        qq.meta='QQ音乐官方 · 私人歌单打榜服务';
        qq.skus=[['基础打榜',14500,'保底新增真实播放 20 万次','未登榜保底实际播放 20 万'],['中级打榜',21500,'保底新增真实播放 30 万次','未登榜保底实际播放 30 万'],['高级打榜',28600,'保底新增真实播放 40 万次','未登榜保底实际播放 40 万']];
      }
      const netease=products.chart.find(p=>p.id==='netease-chart-sprint');
      if(netease){
        netease.meta='网易云音乐官方 · 私人歌单打榜服务';
        netease.skus=[['基础',8600,'保底新增真实播放 12 万次'],['进阶',17200,'保底新增真实播放 25 万次'],['高级',25800,'保底新增真实播放 38 万次']];
      }
      const kugou=products.chart.find(p=>p.id==='kugou-chart-sprint');
      if(kugou){
        kugou.meta='酷狗音乐官方 · 私人歌单打榜服务';
        kugou.skus=[['基础',8600,'保底新增真实播放 10 万次','冲飙升榜、内地榜（排名参考 40–60 名）'],['进阶',17200,'保底新增真实播放 20 万次','冲飙升榜、新歌榜、内地榜（排名参考 20–30 名）'],['高级',34300,'保底新增真实播放 40 万次','冲飙升榜、新歌榜、内地榜等（排名参考 5–20 名）']];
      }

      let resource=products.plays.find(p=>p.id==='platform-recommendation-resource');
      if(!resource){
        resource={
          id:'platform-recommendation-resource',
          platform:'音乐平台',
          name:'音乐平台推荐资源位推广',
          meta:'覆盖 QQ音乐、网易云音乐、酷狗、酷我、咪咕、Apple Music、Spotify 等主流音乐平台',
          hint:'保底获得 5 个推荐资源位',
          priceHint:'¥2,000',
          single:{
            result:'保底获得 5 个推荐资源位',
            price:2000,
            label:'覆盖 QQ音乐、网易云音乐、酷狗音乐、酷我音乐、咪咕音乐、Apple Music、Spotify、JOOX、KKBOX、Friday、MOOV、九太音乐等平台；由服务团队统筹匹配与申请'
          },
          covers:['plays']
        };
        products.plays.push(resource);
      }
      if(typeof productMap!=='undefined')productMap[resource.id]=resource;

      const cartStyle=document.createElement('style');
      cartStyle.textContent=`
        .cart .cart-head{padding-bottom:15px}
        .cart .cart-head p{font-size:11px}
        .cart .coverage-list{padding-bottom:10px}
        .cart .coverage-row{padding:4px 0}
        .cart .cart-items{margin-top:8px}
        .cart .cart-item{padding:12px 0}
        .cart .cart-item-top{align-items:center}
        .cart .cart-item-main{display:flex;align-items:center;gap:8px;min-width:0;flex:1}
        .cart .cart-platform{width:22px;height:22px;border-radius:4px;display:grid;place-items:center;color:#fff;font-size:8px;font-weight:700;flex:none}
        .cart .cart-title{min-width:0;color:var(--strong);font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .cart .cart-item-bottom{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:6px 22px 0 30px}
        .cart .cart-summary{min-width:0;color:#7f8792;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .cart .cart-price{margin:0;color:#3f4650;font-size:12px;font-weight:650;white-space:nowrap;flex:none}
        .cart .remove-item{line-height:1;color:#a3a9b2}
        .cart .cart-empty{padding:24px 6px}
        .cart .coverage-warning{margin-top:10px}
        .cart .cart-note{display:none!important}
      `;
      document.head.appendChild(cartStyle);

      function compactCartSummary(item){
        const p=productMap[item.id];
        const state=selected[item.id]||{};
        if(!p)return item.result||'';
        if(p.quantitySpecs){
          const parts=String(item.key||'').split('::');
          const index=Number(parts[1]);
          const spec=p.quantitySpecs[index];
          const count=Number(state.specs?.[index]||1);
          if(!spec)return item.result||'';
          const total=Number(spec.quantity||0)*count;
          return `${spec.name} × ${count} 份 · ${total.toLocaleString('zh-CN')} ${spec.unit||''}`.trim();
        }
        if(p.skus){
          const sku=p.skus[state.sku||0];
          return sku?[sku[0],sku[2]].filter(Boolean).join(' · '):(item.result||'');
        }
        if(p.budget)return item.result||'';
        if(p.single)return p.single.result||item.result||'';
        return item.result||'';
      }

      window.renderCart=function(){
        const items=cart();
        const coverage=document.getElementById('coverageList');
        coverage.innerHTML=goals.map(g=>`<div class="coverage-row"><span>${goalNames[g]}</span><strong class="coverage-state ${covered(g)?'done':''}">${covered(g)?'✓ 已选':'未选'}</strong></div>`).join('');
        document.getElementById('cartSub').textContent=`已选 ${items.length} 项`;
        document.getElementById('cartItems').innerHTML=items.length?items.map(i=>{
          const summary=compactCartSummary(i);
          return `<div class="cart-item"><div class="cart-item-top"><div class="cart-item-main"><span class="cart-platform" style="background:${colors[i.platform]||'#667180'}">${short(i.platform)}</span><div class="cart-title">${i.product}</div></div><button class="remove-item" data-remove="${i.key}" aria-label="移除">×</button></div><div class="cart-item-bottom"><div class="cart-summary">${summary}</div><div class="cart-price">${i.priceText}</div></div></div>`;
        }).join(''):'<div class="cart-empty">还没有添加推广项目<br>从左侧选择推广产品和规格</div>';
        document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>removeItem(b.dataset.remove));
        const min=items.reduce((s,i)=>s+Number(i.priceMin||0),0),max=items.reduce((s,i)=>s+Number(i.priceMax||0),0),coveredCount=goals.filter(covered).length;
        document.getElementById('cartTotal').textContent=min===max?money(min):`${money(min)}–${money(max)}`;
        const w=document.getElementById('coverageWarning');
        if(items.length&&coveredCount<goals.length){
          w.hidden=false;
          w.textContent=`还有 ${goals.length-coveredCount} 个推广目标未选择，仍可直接下单`;
          w.className='coverage-warning';
        }else{
          w.hidden=true;
        }
        document.getElementById('confirmBtn').disabled=!items.length;
      };

      if(typeof renderAll==='function')renderAll();
    }catch(e){console.warn('promotion product patch failed',e)}
  }

  if(file==='promotion-method.html'||file==='official-packages.html'){
    const replacements=[
      ['网易云 1 万 / TME 1.25 万真实播放','网易云 1 万 / QQ音乐、酷狗、酷我 1.25 万真实播放'],
      ['网易云 2.4 万 / TME 3 万真实播放','网易云 2.4 万 / QQ音乐、酷狗、酷我 3 万真实播放'],
      ['网易云 4 万 / TME 5 万真实播放','网易云 4 万 / QQ音乐、酷狗、酷我 5 万真实播放']
    ];
    document.querySelectorAll('.include-item').forEach(item=>{
      let touched=false;
      const walker=document.createTreeWalker(item,NodeFilter.SHOW_TEXT);let node;
      while((node=walker.nextNode())){
        let text=node.nodeValue;
        replacements.forEach(([from,to])=>{if(text.includes(from)){text=text.split(from).join(to);touched=true}});
        node.nodeValue=text;
      }
      if(touched){const choice=item.querySelector('.include-choice,.choice');if(choice)choice.textContent='四选一'}
    });
  }

  if(file==='order-confirm.html'){
    try{
      if(typeof packages!=='undefined'){
        const trafficMap={
          'popular-1':[['netease','网易云音乐 10,000 次真实播放'],['qq','QQ音乐 12,500 次真实播放'],['kugou','酷狗音乐 12,500 次真实播放'],['kuwo','酷我音乐 12,500 次真实播放']],
          'popular-2':[['netease','网易云音乐 24,000 次真实播放'],['qq','QQ音乐 30,000 次真实播放'],['kugou','酷狗音乐 30,000 次真实播放'],['kuwo','酷我音乐 30,000 次真实播放']],
          'allround-1':[['netease','网易云音乐 24,000 次真实播放'],['qq','QQ音乐 30,000 次真实播放'],['kugou','酷狗音乐 30,000 次真实播放'],['kuwo','酷我音乐 30,000 次真实播放']],
          'allround-2':[['netease','网易云音乐 40,000 次真实播放'],['qq','QQ音乐 50,000 次真实播放'],['kugou','酷狗音乐 50,000 次真实播放'],['kuwo','酷我音乐 50,000 次真实播放']]
        };
        Object.entries(trafficMap).forEach(([id,options])=>{
          const pkg=packages[id];if(!pkg)return;
          const item=pkg.items.find(x=>x.choice&&x.choice.key==='traffic');
          if(item)item.choice.options=options;
        });
        if(typeof selections!=='undefined'&&selections.traffic==='tme')selections.traffic='qq';
        if(typeof currentPackage!=='undefined'&&typeof renderItems==='function')renderItems();
      }
    }catch(e){console.warn('package traffic patch failed',e)}

    const replacements=[
      ['5个平台资源位代申请','保底获得 5 个音乐平台推荐资源位'],
      ['5 个平台资源位代申请','保底获得 5 个音乐平台推荐资源位'],
      ['资源位代申请','音乐平台推荐资源位']
    ];
    const apply=()=>{
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
      while((node=walker.nextNode())){
        let text=node.nodeValue;
        replacements.forEach(([from,to])=>{text=text.split(from).join(to)});
        if(text!==node.nodeValue)node.nodeValue=text;
      }
    };
    apply();
    let count=0;const timer=setInterval(()=>{apply();if(++count>=10)clearInterval(timer)},120);
  }
})();
