(()=>{
  const file=(location.pathname.split('/').pop()||'').toLowerCase();
  const replacePackageCopy=()=>{
    const replacements=[
      ['5个平台资源位代申请','保底获得 5 个音乐平台推荐资源位'],
      ['5 个平台资源位代申请','保底获得 5 个音乐平台推荐资源位'],
      ['5个平台资源位','保底 5 个音乐平台推荐资源位'],
      ['5 个平台资源位','保底 5 个音乐平台推荐资源位']
    ];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
    while((node=walker.nextNode())){let text=node.nodeValue;replacements.forEach(([from,to])=>{text=text.split(from).join(to)});if(text!==node.nodeValue)node.nodeValue=text}
  };

  if(file==='custom-combination.html'){
    try{
      const xhs=products.social.find(p=>p.id==='xiaohongshu-promotion');
      if(xhs){xhs.quantitySpecs=xhs.quantitySpecs.filter(s=>!s.name.includes('5–10w')&&!s.name.includes('20w+')).slice(0,4);xhs.hint='4 种达人规格，可组合购买';xhs.priceHint='¥300 起'}
      const qq=products.chart.find(p=>p.id==='qq-chart-sprint');
      if(qq){qq.meta='QQ音乐官方 · 私人歌单打榜服务';qq.skus=[['基础打榜',14500,'保底新增真实播放 20 万次','未登榜保底实际播放 20 万'],['中级打榜',21500,'保底新增真实播放 30 万次','未登榜保底实际播放 30 万'],['高级打榜',28600,'保底新增真实播放 40 万次','未登榜保底实际播放 40 万']]}
      const netease=products.chart.find(p=>p.id==='netease-chart-sprint');
      if(netease){netease.meta='网易云音乐官方 · 私人歌单打榜服务';netease.skus=[['基础',8600,'保底新增真实播放 12 万次'],['进阶',17200,'保底新增真实播放 25 万次'],['高级',25800,'保底新增真实播放 38 万次']]}
      const kugou=products.chart.find(p=>p.id==='kugou-chart-sprint');
      if(kugou){kugou.meta='酷狗音乐官方 · 私人歌单打榜服务';kugou.skus=[['基础',8600,'保底新增真实播放 10 万次','冲飙升榜、内地榜（排名参考 40–60 名）'],['进阶',17200,'保底新增真实播放 20 万次','冲飙升榜、新歌榜、内地榜（排名参考 20–30 名）'],['高级',34300,'保底新增真实播放 40 万次','冲飙升榜、新歌榜、内地榜等（排名参考 5–20 名）']]}
      let resource=products.plays.find(p=>p.id==='platform-recommendation-resource');
      if(!resource){
        resource={id:'platform-recommendation-resource',platform:'音乐平台',name:'音乐平台推荐资源位推广',meta:'覆盖 QQ音乐、网易云音乐、酷狗、酷我、咪咕、Apple Music、Spotify 等主流音乐平台',hint:'保底获得 5 个推荐资源位',priceHint:'¥2,000',single:{result:'保底获得 5 个推荐资源位',price:2000,label:'覆盖 QQ音乐、网易云音乐、酷狗音乐、酷我音乐、咪咕音乐、Apple Music、Spotify、JOOX、KKBOX、Friday、MOOV、九太音乐等平台；由服务团队统筹匹配与申请'},covers:['plays']};
        products.plays.push(resource);
      }
      if(typeof productMap!=='undefined')productMap[resource.id]=resource;
      if(typeof renderAll==='function')renderAll();
    }catch(e){console.warn('promotion product patch failed',e)}
  }

  if(['promotion-method.html','official-packages.html','order-confirm.html'].includes(file)){
    replacePackageCopy();let count=0;const timer=setInterval(()=>{replacePackageCopy();if(++count>=10)clearInterval(timer)},120);
  }
})();
