(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();

  if(file==='custom-combination.html'){
    try{
      const byId=(list,id)=>list.find(p=>p.id===id);

      ['netease-play','qq-play','kugou-play','kuwo-play'].forEach(id=>{
        const p=byId(products.plays,id);
        if(p)p.meta='来源真实用户点击';
      });

      const qqOfficialPlaylist=byId(products.playlist,'qq-official-playlist-new');
      if(qqOfficialPlaylist){
        qqOfficialPlaylist.meta='将歌曲加入 QQ 音乐高质量歌单资源位，持续获得自然曝光';
        qqOfficialPlaylist.hint='1 个官方歌单资源位';
        qqOfficialPlaylist.skus=[['单次投放',580,'1 个官方歌单资源位']];
      }
      const qqPlaylist=byId(products.playlist,'qq-playlist-chart');
      if(qqPlaylist){
        qqPlaylist.name='QQ 音乐歌单矩阵';
        qqPlaylist.meta='将歌曲加入 QQ 音乐高质量歌单资源位，持续获得自然曝光';
        qqPlaylist.hint='1 张高质量歌单资源位起';
        qqPlaylist.skus=[
          ['12万/月总播',5800,'12万/月总播'],
          ['18万/月总播',8600,'18万/月总播'],
          ['30万/月总播',14500,'30万/月总播']
        ];
      }
      const neteasePlaylistNew=byId(products.playlist,'netease-playlist-new');
      if(neteasePlaylistNew){
        neteasePlaylistNew.meta='网易云高质量歌单资源位，歌单内位置前三';
        neteasePlaylistNew.hint='1 张高质量歌单资源位';
        neteasePlaylistNew.skus=[['单张歌单',500,'1 张高质量歌单资源位','歌单内位置前三']];
      }
      const neteasePlaylist=byId(products.playlist,'netease-playlist');
      if(neteasePlaylist){
        neteasePlaylist.name='网易云歌单矩阵';
        neteasePlaylist.meta='将歌曲加入网易云高质量歌单资源位，持续获得自然曝光';
        neteasePlaylist.hint='1 张高质量歌单资源位起';
        neteasePlaylist.skus=[
          ['单张歌单',750,'1 张高质量歌单资源位'],
          ['基础资源组合',1500,'基础歌单资源组合'],
          ['进阶资源组合',4300,'进阶歌单资源组合'],
          ['高级资源组合',8600,'高级歌单资源组合'],
          ['旗舰资源组合',25800,'旗舰歌单资源组合']
        ];
      }
      const kugouPlaylist=byId(products.playlist,'kugou-playlist');
      if(kugouPlaylist){
        kugouPlaylist.meta='将歌曲加入酷狗音乐高质量歌单资源位，持续获得自然曝光';
        kugouPlaylist.hint='基础歌单资源组合起';
        kugouPlaylist.skus=[
          ['基础资源组合',2600,'基础歌单资源组合'],
          ['进阶资源组合',7300,'进阶歌单资源组合'],
          ['高级资源组合',17000,'高级歌单资源组合']
        ];
      }

      const douyin=byId(products.social,'douyin-promotion');
      if(douyin){
        douyin.meta='达人内容合作，素人号到万粉号可自由组合购买';
        douyin.hint='7 种账号规格，可组合购买';
      }
      const xhs=byId(products.social,'xiaohongshu-promotion');
      if(xhs){
        xhs.meta='达人种草传播，素人到头部 KOL 可自由组合购买';
        xhs.hint='6 种达人规格，可组合购买';
        xhs.priceHint='¥300 起';
      }

      const spotify=byId(products.global,'spotify-ads');
      if(spotify){
        spotify.name='Spotify 播放推广';
        spotify.meta='通过 Spotify 官方广告系统精准触达海外听众';
        spotify.hint='预计新增真实播放 4,500 次起';
        if(spotify.budget)spotify.budget.resultPrefix='预计新增真实播放';
      }
      const youtube=byId(products.global,'youtube-views');
      if(youtube){
        youtube.name='YouTube 播放推广';
        youtube.meta='通过 YouTube 官方广告系统提升视频播放';
        youtube.hint='预计新增真实播放 12,000 次起';
        if(youtube.budget)youtube.budget.resultPrefix='预计新增真实播放';
      }

      ['qq-chart-sprint','netease-chart-sprint','kugou-chart-sprint'].forEach(id=>{
        const p=byId(products.chart,id);
        if(p)p.meta='提升歌曲热度声量·助力登上官方榜单';
      });

      const ktv=byId(products.ktv,'ktv-publish');
      if(ktv){
        ktv.meta='覆盖全国主流合作 KTV 曲库渠道';
        ktv.hint='完成 1 首歌曲 KTV 渠道上架';
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