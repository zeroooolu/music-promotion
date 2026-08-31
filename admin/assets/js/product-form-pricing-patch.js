(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  if(file!=='product-form.html')return;

  const ensureCatalog=()=>{
    if(window.ADMIN_PRODUCT_CATALOG)return Promise.resolve();
    return new Promise(resolve=>{
      const s=document.createElement('script');
      s.src='../assets/js/product-catalog-data.js';
      s.onload=resolve;
      document.body.appendChild(s);
    });
  };

  const waitForForm=()=>new Promise(resolve=>{
    const tick=()=>{
      if(typeof quantity!=='undefined'&&typeof fixed!=='undefined'&&typeof tiers!=='undefined'&&typeof renderTables==='function'&&typeof renderTiers==='function'&&typeof syncPreview==='function')resolve();
      else setTimeout(tick,30);
    };
    tick();
  });

  const apply=async()=>{
    try{
      await Promise.all([ensureCatalog(),waitForForm()]);

      const category=document.getElementById('category');
      if(category&&!category.querySelector('option[value="chart-promotion"]')){
        const opt=document.createElement('option');opt.value='chart-promotion';opt.textContent='打榜推广';
        const before=category.querySelector('option[value="platform-resource"]');category.insertBefore(opt,before||null);
      }

      const panel=document.getElementById('quantityPanel');
      const head=panel?.querySelector('thead tr');
      if(head)head.innerHTML='<th>规格名称</th><th class="pf-effect-name">效果名称</th><th class="pf-effect-value">每份数值</th><th class="pf-effect-unit">单位</th><th>售价</th><th>最低购买</th><th class="pf-url">案例链接（可选）</th><th class="pf-preview-cell">前台效果预览</th><th></th>';
      const summary=panel?.querySelector('.pf-summary');
      if(summary)summary.textContent='每个规格配置一个统一售价。用户增加购买份数后，价格与效果数值都按购买份数累加。';

      quantityRow=function(x,i){return `<tr data-quantity-row="${i}"><td><input data-k="name" value="${x.name||''}"></td><td><input class="pf-effect-name" data-k="effectName" value="${x.effectName||''}"></td><td><input class="pf-effect-value" data-k="value" type="number" value="${x.value??''}"></td><td><input class="pf-effect-unit" data-k="unit" value="${x.unit||''}"></td><td><div class="pf-money"><span>¥</span><input data-k="price" type="number" value="${x.price??''}"></div></td><td><input data-k="minBuy" type="number" value="${x.minBuy||1}"></td><td><input class="pf-url" data-k="caseUrl" value="${x.caseUrl||''}" placeholder="https://..."></td><td class="pf-preview-cell">${effectText(x)}</td><td><button class="pf-remove" data-remove-quantity="${i}">删除</button></td></tr>`};

      bindRowInputs=function(){
        document.querySelectorAll('[data-fixed-row]').forEach(row=>row.querySelectorAll('[data-k]').forEach(input=>input.oninput=()=>{const x=fixed[+row.dataset.fixedRow],k=input.dataset.k;x[k]=['value','price'].includes(k)?Number(input.value||0):input.value;row.querySelector('.pf-preview-cell').textContent=effectText(x);syncPreview()}));
        document.querySelectorAll('[data-quantity-row]').forEach(row=>row.querySelectorAll('[data-k]').forEach(input=>input.oninput=()=>{const x=quantity[+row.dataset.quantityRow],k=input.dataset.k;x[k]=['value','price','minBuy'].includes(k)?Number(input.value||0):input.value;row.querySelector('.pf-preview-cell').textContent=effectText(x);syncPreview()}));
        document.querySelectorAll('[data-remove-fixed]').forEach(b=>b.onclick=()=>{fixed.splice(+b.dataset.removeFixed,1);renderTables()});
        document.querySelectorAll('[data-remove-quantity]').forEach(b=>b.onclick=()=>{quantity.splice(+b.dataset.removeQuantity,1);renderTables()});
      };

      const baseSync=syncPreview;
      syncPreview=function(){
        baseSync();
        if(currentMode==='quantity'){
          const prices=quantity.map(x=>Number(x.price)||0).filter(x=>x>0);
          const price=prices.length?Math.min(...prices):0;
          document.getElementById('previewPrice').textContent=(price?money(price):'¥0')+' 起';
        }
      };

      document.getElementById('addQuantity').onclick=()=>{
        const base=quantity[0]||{};
        quantity.push({name:'新规格',effectName:base.effectName||'参与传播',value:1,unit:base.unit||'个',price:0,minBuy:1,caseUrl:''});
        renderTables();
      };

      const dspMap={'网易云音乐':'netease','QQ音乐':'qqmusic','酷狗音乐':'kugou','酷我音乐':'kuwo','Spotify':'spotify','YouTube':'youtube'};
      const params=new URLSearchParams(location.search),id=params.get('id')||'';
      const product=window.getAdminProduct?.(id);
      if(product){
        document.getElementById('title').value=product.title;
        document.getElementById('subtitle').value=product.subtitle;
        category.value=product.categoryId;
        selectedGoals=new Set(product.goals);
        document.getElementById('internalNote').value=product.internalNote||'';
        if(dspMap[product.platform])setDsp(dspMap[product.platform]);else setOther(product.platform);

        if(product.modeKey==='fixed'){
          setMode('fixed');
          fixed.splice(0,fixed.length,...product.specs.map(x=>({...x})));
          renderTables();
        }else if(product.modeKey==='quantity'){
          setMode('quantity');
          quantity.splice(0,quantity.length,...product.specs.map(x=>({...x})));
          renderTables();
        }else{
          setMode('budget');
          if(product.budgetMode==='tiered'){
            tiers=product.tiers.map(x=>({...x}));
            setBudgetMode('tiered');
            renderTiers();
          }else{
            setBudgetMode('continuous');
            document.getElementById('continuousEffectName').value=product.effectName;
            document.getElementById('continuousEffectUnit').value=product.unit;
            document.getElementById('budgetMin').value=product.budget.min;
            document.getElementById('budgetMax').value=product.budget.max;
            document.getElementById('budgetStep').value=product.budget.step;
            document.getElementById('referenceBudget').value=product.budget.referenceBudget;
            document.getElementById('referenceEffect').value=product.budget.referenceValue;
          }
        }
        renderGoals();
      }else{
        quantity.forEach(item=>{
          const fallback=item.price!=null?item.price:(item.priceMin!=null?item.priceMin:item.priceMax);
          item.price=Number(fallback||0);delete item.priceMin;delete item.priceMax;
        });
        renderTables();
      }

      ['title','subtitle','continuousEffectName','continuousEffectUnit','referenceBudget','referenceEffect','budgetMin','budgetMax','budgetStep'].forEach(id=>{const input=document.getElementById(id);if(input)input.oninput=syncPreview});
      syncPreview();
    }catch(e){console.warn('product form finalized model patch failed',e)}
  };

  apply();
})();
