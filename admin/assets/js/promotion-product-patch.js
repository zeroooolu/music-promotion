(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  const resourceProduct={
    id:'platform-recommendation-resource',
    name:'音乐平台推荐资源位推广',
    category:'平台资源',
    platform:'多平台',
    logo:'资',
    goals:['plays'],
    metric:'推荐资源位',
    effectLabel:'保底获得推荐资源位',
    unit:'个',
    mode:'固定套餐',
    configMode:'固定服务',
    summary:'覆盖主流音乐平台推荐资源，由服务团队统筹匹配与申请，保底最终获得 5 个推荐资源位',
    internalNote:'不由用户选择平台；服务团队根据歌曲与平台适配度统筹申请。覆盖 QQ音乐、网易云音乐、酷狗音乐、酷我音乐、咪咕音乐、Apple Music、Spotify、JOOX、KKBOX、Friday、MOOV、九太音乐等平台。',
    specs:[{name:'推荐资源位推广',result:'保底获得 5 个推荐资源位',effect:5,price:2000,delivery:'由服务团队统筹平台与资源申请，最终保底获得 5 个推荐资源位'}]
  };

  if(window.PRODUCT_CATEGORIES){
    const content=window.PRODUCT_CATEGORIES.find(c=>c.id==='content');
    if(content){content.products=2;content.plans=11;content.updated='2026-08-27 14:45'}
    const resources=window.PRODUCT_CATEGORIES.find(c=>c.id==='platform-resource');
    if(resources){resources.products=4;resources.plans=10;resources.updated='2026-08-27 14:45'}
    if(file==='product-categories.html'&&typeof render==='function')render();
  }

  if(file==='products.html'){
    try{
      const xhs=products.find(p=>p.id==='xiaohongshu-promotion');
      if(xhs){xhs.config='4 个规格';xhs.price='¥300 起';xhs.updated='今天 14:45'}
      if(!products.some(p=>p.id===resourceProduct.id)){
        products.push({id:resourceProduct.id,name:resourceProduct.name,logo:'资',category:'平台资源',goals:['plays'],platform:'多平台',source:'平台资源',mode:'固定套餐',modeKey:'fixed',configMode:'固定服务',config:'1 个规格 · 保底 5 个推荐资源位',price:'¥2,000',sort:45,status:'上架',updated:'今天 14:45'});
      }
      if(typeof render==='function')render();
    }catch(e){console.warn('admin product list patch failed',e)}
  }

  if(file==='product-detail.html'){
    try{
      if(typeof data!=='undefined'){
        data[resourceProduct.id]=resourceProduct;
        const xhs=data['xiaohongshu-promotion'];
        if(xhs?.quantity)xhs.quantity=xhs.quantity.filter(s=>!s.name.includes('5–10w')&&!s.name.includes('20w+')).slice(0,4);
      }
      const currentId=new URLSearchParams(location.search).get('id')||'';
      const renderQuantity=(p)=>{
        set('specCount',p.quantity.length+' 个规格');
        const lows=p.quantity.map(s=>Number(s.price??s.priceMin??0));
        const highs=p.quantity.map(s=>Number(s.price??s.priceMax??s.priceMin??0));
        set('priceRange',`${money(Math.min(...lows))} – ${money(Math.max(...highs))}`);
        set('salesTitle','数量规格');
        $('configTable').hidden=false;$('continuousRule').hidden=true;
        $('tableHead').innerHTML='<tr><th>#</th><th>规格名称</th><th>每份包含</th><th>单价</th><th>最低购买</th><th>案例</th></tr>';
        $('specRows').innerHTML=p.quantity.map((s,i)=>{const low=Number(s.price??s.priceMin??0),high=Number(s.price??s.priceMax??s.priceMin??0),price=low===high?money(low):`${money(low)} – ${money(high)}`;return `<tr><td>${i+1}</td><td>${s.name}</td><td>${num(s.qty)} ${s.unit||p.unit}</td><td class="price">${price} / 份</td><td>${s.minBuy} 份</td><td>${s.caseUrl?`<a href="${s.caseUrl}" target="_blank" rel="noopener">查看案例</a>`:'—'}</td></tr>`}).join('');
      };
      if(currentId==='xiaohongshu-promotion'&&typeof data!=='undefined')renderQuantity(data[currentId]);
      if(currentId===resourceProduct.id){
        const p=resourceProduct;
        set('title',p.name);set('breadcrumbName',p.name);set('metaCategory',p.category);set('metaPlatform',p.platform);set('metaMode',p.mode);set('name',p.name);set('category',p.category);set('platformLogo',p.logo);set('platform',p.platform);set('metric',p.metric);set('effectLabel',p.effectLabel);set('unit',p.unit);set('saleMode',p.mode);set('configMode',p.configMode);set('frontName',p.name);set('frontPlatform',p.platform);set('summary',p.summary);set('previewName',p.name);set('previewSummary',p.summary);set('internalNote',p.internalNote);
        $('editLink').href=`product-form.html?mode=edit&id=${p.id}`;
        $('goals').innerHTML=p.goals.map(g=>`<span class="pd-object-goal">${goalNames[g]||g}</span>`).join('');
        set('specCount','1 个规格');set('priceRange','¥2,000');set('salesTitle','固定服务');
        $('configTable').hidden=false;$('continuousRule').hidden=true;
        $('tableHead').innerHTML='<tr><th>#</th><th>规格名称</th><th>效果</th><th>售价</th><th>交付说明</th></tr>';
        $('specRows').innerHTML=`<tr><td>1</td><td>${p.specs[0].name}</td><td>${p.specs[0].result}</td><td class="price">¥2,000</td><td class="delivery">${p.specs[0].delivery}</td></tr>`;
      }
    }catch(e){console.warn('admin product detail patch failed',e)}
  }

  if(file==='product-form.html'){
    try{
      if(typeof editingId!=='undefined'&&editingId==='xiaohongshu-promotion'){
        quantity.splice(0,quantity.length,...quantity.filter(s=>!s.name.includes('5–10w')&&!s.name.includes('20w+')).slice(0,4));
        renderTables();
      }
      if(typeof editingId!=='undefined'&&editingId===resourceProduct.id){
        $('name').value=resourceProduct.name;
        $('category').value='platform-resource';
        selectedGoals=new Set(['plays']);
        setOther('多平台');
        setMode('fixed');
        $('metric').value='coverage';
        $('effectLabel').value=resourceProduct.effectLabel;
        $('metricUnit').value='个';
        $('frontName').value=resourceProduct.name;
        $('summary').value=resourceProduct.summary;
        $('description').value='服务覆盖 QQ音乐、网易云音乐、酷狗音乐、酷我音乐、咪咕音乐、Apple Music、Spotify、JOOX、KKBOX、Friday、MOOV、九太音乐等平台。平台无需用户选择，由服务团队统筹匹配与申请，最终保底获得 5 个推荐资源位。';
        $('internalNote').value=resourceProduct.internalNote;
        fixed.splice(0,fixed.length,{name:'推荐资源位推广',type:'guaranteed',min:5,max:5,price:2000,resultText:'保底获得 5 个推荐资源位',delivery:'由服务团队统筹平台与资源申请，最终保底获得 5 个推荐资源位'});
        renderTables();
        document.querySelectorAll('[data-goal]').forEach(btn=>{btn.classList.remove('primary');btn.classList.toggle('active',btn.dataset.goal==='plays')});
      }
    }catch(e){console.warn('admin product form patch failed',e)}
  }
})();
