(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  if(file!=='product-form.html')return;

  const apply=()=>{
    try{
      if(typeof quantity==='undefined'||typeof renderTables!=='function'||typeof syncPreview!=='function'){
        setTimeout(apply,30);
        return;
      }

      quantity.forEach(item=>{
        const fallback=item.price!=null?item.price:(item.priceMin!=null?item.priceMin:item.priceMax);
        item.price=Number(fallback||0);
        delete item.priceMin;
        delete item.priceMax;
      });

      const panel=document.getElementById('quantityPanel');
      const head=panel?.querySelector('thead tr');
      if(head){
        head.innerHTML='<th>规格名称</th><th class="pf-effect-name">效果名称</th><th class="pf-effect-value">每份数值</th><th class="pf-effect-unit">单位</th><th>售价</th><th>最低购买</th><th class="pf-url">案例链接（可选）</th><th class="pf-preview-cell">前台效果预览</th><th></th>';
      }
      const summary=panel?.querySelector('.pf-summary');
      if(summary)summary.textContent='每个规格配置一个统一售价。用户增加购买份数后，价格与效果数值都按购买份数累加。';

      quantityRow=function(x,i){
        return `<tr data-quantity-row="${i}"><td><input data-k="name" value="${x.name||''}"></td><td><input class="pf-effect-name" data-k="effectName" value="${x.effectName||''}"></td><td><input class="pf-effect-value" data-k="value" type="number" value="${x.value??''}"></td><td><input class="pf-effect-unit" data-k="unit" value="${x.unit||''}"></td><td><div class="pf-money"><span>¥</span><input data-k="price" type="number" value="${x.price??''}"></div></td><td><input data-k="minBuy" type="number" value="${x.minBuy||1}"></td><td><input class="pf-url" data-k="caseUrl" value="${x.caseUrl||''}" placeholder="https://..."></td><td class="pf-preview-cell">${effectText(x)}</td><td><button class="pf-remove" data-remove-quantity="${i}">删除</button></td></tr>`;
      };

      const originalSyncPreview=syncPreview;
      syncPreview=function(){
        originalSyncPreview();
        if(currentMode==='quantity'){
          const prices=quantity.map(x=>Number(x.price)||0).filter(x=>x>0);
          const price=prices.length?Math.min(...prices):0;
          document.getElementById('previewPrice').textContent=(price?money(price):'¥0')+' 起';
        }
      };

      const addButton=document.getElementById('addQuantity');
      if(addButton){
        addButton.onclick=()=>{
          const base=quantity[0]||{};
          quantity.push({name:'新规格',effectName:base.effectName||'参与传播',value:1,unit:base.unit||'个',price:0,minBuy:1,caseUrl:''});
          renderTables();
        };
      }

      ['title','subtitle'].forEach(id=>{
        const input=document.getElementById(id);
        if(input)input.oninput=syncPreview;
      });

      renderTables();
      syncPreview();
    }catch(e){
      console.warn('product form single price patch failed',e);
    }
  };

  apply();
})();
