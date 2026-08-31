(()=>{
  const body=document.body;
  const page=body.dataset.adminPage||'home';
  const title=body.dataset.pageTitle||'首页';
  const inPages=location.pathname.includes('/pages/');
  const root=inPages?'..':'.';
  const frontendHref=inPages?'../../frontend/star-release/index.html':'../frontend/star-release/index.html';
  const icons={
    home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    categories:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    products:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7.5 12 4l7 3.5-7 3.5-7-3.5Zm0 0V16l7 4 7-4V7.5M12 11v9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    packages:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5h14v12H5v-12Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 4h8v5H8V4Zm-3 7h14M9 14h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    orders:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12a1 1 0 0 1 1 1v15l-3-2-4 2-4-2-3 2V5a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 9h8M8 13h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
  };
  const items=[
    {id:'home',label:'首页',href:root+'/index.html'},
    {id:'categories',label:'产品类目',href:root+'/pages/product-categories.html'},
    {id:'products',label:'产品列表',href:root+'/pages/products.html'},
    {id:'packages',label:'推广套餐',href:root+'/pages/packages.html'},
    {id:'orders',label:'订单管理',href:root+'/pages/orders.html'}
  ];
  const shell=document.getElementById('admin-shell');
  if(!shell)return;
  shell.innerHTML=`
    <div class="admin-app">
      <aside class="admin-sidebar">
        <a class="admin-brand" href="${root}/index.html" aria-label="星球发行首页"><img src="https://star.kanjian.com/app/release/images/star-logo.png" alt="星球发行" /></a>
        <button class="admin-collapse" type="button" aria-label="收起菜单">‹</button>
        <nav class="admin-nav"><div class="admin-nav-label">音乐推广</div>${items.map(i=>`<a class="admin-nav-item${i.id===page?' active':''}" href="${i.href}"><span class="admin-nav-icon">${icons[i.id]}</span><span>${i.label}</span></a>`).join('')}</nav>
      </aside>
      <header class="admin-topbar">
        <div class="admin-page-title"><div class="admin-breadcrumb"><span>音乐推广</span><i>›</i><strong>${title}</strong></div></div>
        <div class="admin-top-actions">
          <a class="admin-top-action" href="${frontendHref}" title="查看前台" aria-label="查看前台"><svg viewBox="0 0 24 24"><path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 9.2 4.5 4.5 0 0 0 7 18Z" fill="currentColor"/><path d="m12 9-3 3h2v4h2v-4h2l-3-3Z" fill="#fff"/></svg></a>
          <span class="admin-top-action" title="帮助文档" aria-label="帮助文档"><svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></span>
          <span class="admin-top-action" title="语言" aria-label="语言"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 12h17M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21M12 3C9.8 5.4 8.7 8.4 8.7 12s1.1 6.6 3.3 9" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span>
          <span class="admin-avatar" title="账号"><svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4" fill="currentColor"/><path d="M5 20c.6-4 3.2-6 7-6s6.4 2 7 6" fill="currentColor"/></svg></span>
        </div>
      </header>
      <main class="admin-main"><div class="admin-content"><div class="admin-content-inner" id="admin-content"></div></div></main>
    </div>`;
  const template=document.getElementById('page-content');
  const target=document.getElementById('admin-content');
  if(template&&target)target.appendChild(template.content.cloneNode(true));
  setTimeout(()=>{
    const script=document.createElement('script');
    script.src=root+'/assets/js/promotion-product-patch.js';
    script.onload=()=>{
      const pricingPatch=document.createElement('script');
      pricingPatch.src=root+'/assets/js/product-form-pricing-patch.js';
      document.body.appendChild(pricingPatch);
    };
    document.body.appendChild(script);
  },0);
})();
