(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  if(file!=='package-form.html')return;
  const bindPackageTitleInputs=()=>{
    try{
      if(typeof current==='undefined'||typeof syncPreview!=='function')return;
      document.querySelectorAll('[data-item-title]').forEach(el=>{
        el.oninput=()=>{
          const i=Number(el.dataset.itemTitle);
          current.items[i].title=el.value;
          const card=el.closest('.pk-builder-item');
          const title=card?.querySelector('.pk-builder-title span:nth-child(2)');
          if(title)title.textContent=el.value||'未命名内容';
          syncPreview();
        };
      });
    }catch(e){console.warn('package form interaction patch failed',e)}
  };
  bindPackageTitleInputs();
  const builder=document.getElementById('builder');
  if(builder)new MutationObserver(()=>bindPackageTitleInputs()).observe(builder,{childList:true,subtree:true});
})();
