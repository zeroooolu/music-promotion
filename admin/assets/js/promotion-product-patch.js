(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  const chartIds=['qq-chart-sprint','netease-chart-sprint','kugou-chart-sprint'];
  const chartConfig={
    'qq-chart-sprint':{platform:'QQ音乐',summary:'QQ音乐官方 · 私人歌单打榜服务',note:'基础/中级/高级档位均配置未登榜保底实际播放。'},
    'netease-chart-sprint':{platform:'网易云音乐',summary:'网易云音乐官方 · 私人歌单打榜服务',note:'本次定稿未配置额外“不登榜保底”说明，按保底播放与打榜服务交付。'},
    'kugou-chart-sprint':{platform:'酷狗音乐',summary:'酷狗音乐官方 · 私人歌单打榜服务',note:'各档位按飙升榜、新歌榜、内地榜等目标及对应排名参考执行。'}
  };
  const resourceProduct={
    id:'platform-recommendation-resource',name:'音乐平台推荐资源位推广',category:'平台资源',platform:'多平台',logo:'资',goals:['plays'],metric:'推荐资源位',effectLabel:'保底获得推荐资源位',unit:'个',mode:'固定套餐',configMode:'固定服务',summary:'覆盖主流音乐平台推荐资源，由服务团队统筹匹配与申请，保底最终获得 5 个推荐资源位',internalNote:'不由用户选择平台；服务团队根据歌曲与平台适配度统筹申请。覆盖 QQ音乐、网易云音乐、酷狗音乐、酷我音乐、咪咕音乐、Apple Music、Spotify、JOOX、KKBOX、Friday、MOOV、九太音乐等平台。',specs:[{name:'推荐资源位推广',result:'保底获得 5 个推荐资源位',effect:5,price:2000,delivery:'由服务团队统筹平台与资源申请，最终保底获得 5 个推荐资源位'}]
  };

  if(window.PRODUCT_CATEGORIES){
    const content=window.PRODUCT_CATEGORIES.find(c=>c.id==='content');if(content){content.products=2;content.plans=11}
    const chart=window.PRODUCT_CATEGORIES.find(c=>c.id==='chart-promotion');if(chart){chart.products=3;chart.plans=9}
    const resources=window.PRODUCT_CATEGORIES.find(c=>c.id==='platform-resource');if(resources){resources.products=1;resources.plans=1}
    if(file==='product-categories.html'&&typeof render==='function')render();
  }

  if(file==='products.html'){
    try{
      const xhs=products.find(p=>p.id==='xiaohongshu-promotion');
      if(xhs){xhs.config='4 个规格';xhs.price='¥300 起';xhs.updated='今天 15:10'}
      chartIds.forEach(id=>{const p=products.find(x=>x.id===id);if(p){p.category='打榜推广';p.configMode='打榜档位';p.updated='今天 15:10'}});
      if(!products.some(p=>p.id===resourceProduct.id))products.push({id:resourceProduct.id,name:resourceProduct.name,logo:'资',category:'平台资源',goals:['plays'],platform:'多平台',source:'平台资源',mode:'固定套餐',modeKey:'fixed',configMode:'固定服务',config:'1 个规格 · 保底 5 个推荐资源位',price:'¥2,000',sort:45,status:'上架',updated:'今天 15:10'});
      if(typeof render==='function')render();
    }catch(e){console.warn('admin product list patch failed',e)}
  }

  if(file==='product-detail.html'){
    try{
      if(typeof data!=='undefined'){
        data[resourceProduct.id]=resourceProduct;
        const xhs=data['xiaohongshu-promotion'];if(xhs?.quantity)xhs.quantity=xhs.quantity.filter(s=>!s.name.includes('5–10w')&&!s.name.includes('20w+')).slice(0,4);
        chartIds.forEach(id=>{const p=data[id];if(!p)return;p.category='打榜推广';p.configMode='打榜档位';p.summary=chartConfig[id].summary;p.internalNote=chartConfig[id].note;if(id==='netease-chart-sprint')p.specs.forEach(s=>s.delivery='')});
      }
      const currentId=new URLSearchParams(location.search).get('id')||'';
      const renderQuantity=p=>{set('specCount',p.quantity.length+' 个规格');const lows=p.quantity.map(s=>Number(s.price??s.priceMin??0)),highs=p.quantity.map(s=>Number(s.price??s.priceMax??s.priceMin??0));set('priceRange',`${money(Math.min(...lows))} – ${money(Math.max(...highs))}`);set('salesTitle','数量规格');$('configTable').hidden=false;$('continuousRule').hidden=true;$('tableHead').innerHTML='<tr><th>#</th><th>规格名称</th><th>每份包含</th><th>单价</th><th>最低购买</th><th>案例</th></tr>';$('specRows').innerHTML=p.quantity.map((s,i)=>{const low=Number(s.price??s.priceMin??0),high=Number(s.price??s.priceMax??s.priceMin??0),price=low===high?money(low):`${money(low)} – ${money(high)}`;return `<tr><td>${i+1}</td><td>${s.name}</td><td>${num(s.qty)} ${s.unit||p.unit}</td><td class="price">${price} / 份</td><td>${s.minBuy} 份</td><td>${s.caseUrl?`<a href="${s.caseUrl}" target="_blank" rel="noopener">查看案例</a>`:'—'}</td></tr>`}).join('')};
      if(currentId==='xiaohongshu-promotion'&&typeof data!=='undefined')renderQuantity(data[currentId]);
      if(chartIds.includes(currentId)&&typeof data!=='undefined'){
        const p=data[currentId];set('metaCategory',p.category);set('category',p.category);set('configMode',p.configMode);set('summary',p.summary);set('previewSummary',p.summary);set('internalNote',p.internalNote||'—');set('salesTitle','打榜档位');$('specRows').innerHTML=p.specs.map((s,i)=>`<tr><td>${i+1}</td><td>${s.name}</td><td>${s.result||'—'}</td><td class="price">${money(s.price)}</td><td class="delivery">${s.delivery||'—'}</td></tr>`).join('');
      }
      if(currentId===resourceProduct.id){
        const p=resourceProduct;set('title',p.name);set('breadcrumbName',p.name);set('metaCategory',p.category);set('metaPlatform',p.platform);set('metaMode',p.mode);set('name',p.name);set('category',p.category);set('platformLogo',p.logo);set('platform',p.platform);set('metric',p.metric);set('effectLabel',p.effectLabel);set('unit',p.unit);set('saleMode',p.mode);set('configMode',p.configMode);set('frontName',p.name);set('frontPlatform',p.platform);set('summary',p.summary);set('previewName',p.name);set('previewSummary',p.summary);set('internalNote',p.internalNote);$('editLink').href=`product-form.html?mode=edit&id=${p.id}`;$('goals').innerHTML=p.goals.map(g=>`<span class="pd-object-goal">${goalNames[g]||g}</span>`).join('');set('specCount','1 个规格');set('priceRange','¥2,000');set('salesTitle','固定服务');$('configTable').hidden=false;$('continuousRule').hidden=true;$('tableHead').innerHTML='<tr><th>#</th><th>规格名称</th><th>效果</th><th>售价</th><th>交付说明</th></tr>';$('specRows').innerHTML=`<tr><td>1</td><td>${p.specs[0].name}</td><td>${p.specs[0].result}</td><td class="price">¥2,000</td><td class="delivery">${p.specs[0].delivery}</td></tr>`;
      }
    }catch(e){console.warn('admin product detail patch failed',e)}
  }

  if(file==='product-form.html'){
    try{
      const category=$('category');
      if(category&&!category.querySelector('option[value="chart-promotion"]')){const opt=document.createElement('option');opt.value='chart-promotion';opt.textContent='打榜推广';const before=category.querySelector('option[value="platform-resource"]');category.insertBefore(opt,before||null)}
      if(typeof editingId!=='undefined'&&editingId==='xiaohongshu-promotion'){quantity.splice(0,quantity.length,...quantity.filter(s=>!s.name.includes('5–10w')&&!s.name.includes('20w+')).slice(0,4));renderTables()}
      if(typeof editingId!=='undefined'&&chartIds.includes(editingId)){
        category.value='chart-promotion';$('summary').value=chartConfig[editingId].summary;$('description').value='官方私人歌单打榜服务，按档位提供保底播放，并根据平台规则执行榜单冲刺。';$('internalNote').value=chartConfig[editingId].note;if(editingId==='netease-chart-sprint')fixed.forEach(s=>s.delivery='');renderTables();
      }
      if(typeof editingId!=='undefined'&&editingId===resourceProduct.id){$('name').value=resourceProduct.name;category.value='platform-resource';selectedGoals=new Set(['plays']);setOther('多平台');setMode('fixed');$('metric').value='coverage';$('effectLabel').value=resourceProduct.effectLabel;$('metricUnit').value='个';$('frontName').value=resourceProduct.name;$('summary').value=resourceProduct.summary;$('description').value='服务覆盖 QQ音乐、网易云音乐、酷狗音乐、酷我音乐、咪咕音乐、Apple Music、Spotify、JOOX、KKBOX、Friday、MOOV、九太音乐等平台。平台无需用户选择，由服务团队统筹匹配与申请，最终保底获得 5 个推荐资源位。';$('internalNote').value=resourceProduct.internalNote;fixed.splice(0,fixed.length,{name:'推荐资源位推广',type:'guaranteed',min:5,max:5,price:2000,resultText:'保底获得 5 个推荐资源位',delivery:'由服务团队统筹平台与资源申请，最终保底获得 5 个推荐资源位'});renderTables();document.querySelectorAll('[data-goal]').forEach(btn=>{btn.classList.remove('primary');btn.classList.toggle('active',btn.dataset.goal==='plays')})}
    }catch(e){console.warn('admin product form patch failed',e)}
  }
})();
