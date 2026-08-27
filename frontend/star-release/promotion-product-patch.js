(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  const replacePackageCopy=()=>{
    const replacements=[
      ['5个平台资源位代申请','保底获得 5 个平台推荐资源位'],
      ['5 个平台资源位代申请','保底获得 5 个平台推荐资源位'],
      ['5个平台资源位','保底 5 个推荐资源位'],
      ['5 个平台资源位','保底 5 个推荐资源位']
    ];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      let text=node.nodeValue;
      replacements.forEach(([from,to])=>{text=text.split(from).join(to)});
      if(text!==node.nodeValue)node.nodeValue=text;
    }
  };

  if(file==='custom-combination.html'){
    try{
      const xhs=products.social.find(p=>p.id==='xiaohongshu-promotion');
      if(xhs){
        xhs.quantitySpecs=xhs.quantitySpecs.filter(s=>!s.name.includes('5–10w')&&!s.name.includes('20w+')).slice(0,4);
        xhs.hint='4 种达人规格，可组合购买';
        xhs.priceHint='¥300 起';
      }
      if(!products.plays.some(p=>p.id==='platform-recommendation-resource')){
        products.plays.push({
          id:'platform-recommendation-resource',
          platform:'音乐平台',
          name:'音乐平台推荐资源位推广',
          meta:'覆盖主流音乐平台推荐资源，由服务团队统筹匹配与申请',
          hint:'保底获得 5 个推荐资源位',
          priceHint:'¥2,000',
          single:{
            result:'保底获得 5 个推荐资源位',
            price:2000,
            label:'覆盖 QQ音乐、网易云音乐、酷狗音乐、酷我音乐、咪咕音乐、Apple Music、Spotify、JOOX、KKBOX、Friday、MOOV、九太音乐等平台'
          },
          covers:['plays']
        });
      }
      if(typeof renderAll==='function')renderAll();
    }catch(e){console.warn('promotion product patch failed',e)}
  }

  if(['promotion-method.html','official-packages.html','order-confirm.html'].includes(file)){
    replacePackageCopy();
    let count=0;
    const timer=setInterval(()=>{
      replacePackageCopy();
      if(++count>=10)clearInterval(timer);
    },120);
  }
})();
