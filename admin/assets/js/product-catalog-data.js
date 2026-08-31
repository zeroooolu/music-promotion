(()=>{
  const playTiers=(first)=>first==='netease'
    ? [[45,600],[95,1320],[145,1980],[215,3000],[290,4000],[430,6000],[715,10000],[1150,16000],[1430,20000],[1720,24000],[2290,32000],[2860,40000],[3570,49980]]
    : [[45,750],[95,1650],[145,2475],[215,3750],[290,5000],[430,7500],[715,12500],[1150,20000],[1430,25000],[1720,30000],[2290,40000],[2860,50000],[3570,62475]];
  const tieredPlay=(id,title,platform,logo,type)=>({
    id,title,subtitle:'来源真实用户点击',categoryId:'traffic',category:'播放推广',goals:['plays'],platform,logo,source:'DSP 平台',modeKey:'budget',mode:'按预算投放',budgetMode:'tiered',sort:{'netease-play':10,'qq-play':20,'kugou-play':30,'kuwo-play':40}[id],status:'上架',
    tiers:playTiers(type).map(([price,value])=>({price,effectName:'保底新增真实播放',value,unit:'次'}))
  });
  const fixed=(o)=>({...o,modeKey:'fixed',mode:'固定档位',source:o.source||'DSP 平台',status:o.status||'上架'});
  const quantity=(o)=>({...o,modeKey:'quantity',mode:'多规格可选',source:o.source||'自定义平台',status:o.status||'上架'});
  const continuous=(o)=>({...o,modeKey:'budget',mode:'按预算投放',budgetMode:'continuous',source:o.source||'DSP 平台',status:o.status||'上架'});

  const products=[
    tieredPlay('netease-play','网易云音乐播放推广','网易云音乐','云','netease'),
    tieredPlay('qq-play','QQ 音乐播放推广','QQ音乐','Q','tme'),
    tieredPlay('kugou-play','酷狗音乐播放推广','酷狗音乐','酷','tme'),
    tieredPlay('kuwo-play','酷我音乐播放推广','酷我音乐','我','tme'),
    fixed({id:'platform-recommendation-resource',title:'音乐平台推荐资源位推广',subtitle:'覆盖 QQ音乐、网易云音乐、酷狗、酷我、咪咕、Apple Music、Spotify 等主流音乐平台',categoryId:'platform-resource',category:'平台资源',goals:['plays'],platform:'多平台',logo:'资',source:'平台资源',sort:50,internalNote:'平台无需用户选择，由服务团队根据歌曲与平台适配度统筹匹配与申请。',specs:[{name:'推荐资源位推广',effectName:'保底获得推荐资源位',value:5,unit:'个',price:2000,note:'由服务团队统筹平台与资源申请'}]}),
    fixed({id:'qq-playlist-chart',title:'QQ 音乐歌单矩阵',subtitle:'将歌曲加入 QQ 音乐高质量歌单资源位，持续获得自然曝光',categoryId:'playlist',category:'歌单推广',goals:['playlist'],platform:'QQ音乐',logo:'Q',sort:60,specs:[{name:'12万/月总播',effectName:'月总播',value:12,unit:'万',price:5800},{name:'18万/月总播',effectName:'月总播',value:18,unit:'万',price:8600},{name:'30万/月总播',effectName:'月总播',value:30,unit:'万',price:14500}]}),
    fixed({id:'netease-playlist',title:'网易云歌单矩阵',subtitle:'将歌曲加入网易云高质量歌单资源位，持续获得自然曝光',categoryId:'playlist',category:'歌单推广',goals:['playlist'],platform:'网易云音乐',logo:'云',sort:70,specs:[{name:'4万/月总播（约3张歌单）',effectName:'月总播',value:4,unit:'万',price:1500,note:'约3张歌单'},{name:'13万/月总播',effectName:'月总播',value:13,unit:'万',price:4300},{name:'28万/月总播',effectName:'月总播',value:28,unit:'万',price:8600},{name:'90万/月总播',effectName:'月总播',value:90,unit:'万',price:25800}]}),
    fixed({id:'kugou-playlist',title:'酷狗歌单矩阵',subtitle:'将歌曲加入酷狗音乐高质量歌单资源位，持续获得自然曝光',categoryId:'playlist',category:'歌单推广',goals:['playlist'],platform:'酷狗音乐',logo:'酷',sort:80,specs:[{name:'10万/日播',effectName:'日播',value:10,unit:'万',price:2600},{name:'30万/日播',effectName:'日播',value:30,unit:'万',price:7300},{name:'70万/日播',effectName:'日播',value:70,unit:'万',price:17000}]}),
    quantity({id:'douyin-promotion',title:'抖音投放',subtitle:'达人内容合作，素人号到万粉号可自由组合购买',categoryId:'content',category:'内容推广',goals:['social'],platform:'抖音',logo:'抖',sort:90,specs:[{name:'素人号',effectName:'参与传播',value:2000,unit:'个账号',price:2600,minBuy:1,caseUrl:'https://docs.qq.com/pdf/DQVVBc1dyeVVOR1V1'},{name:'万粉混剪号',effectName:'参与传播',value:15,unit:'个账号',price:1100,minBuy:1,caseUrl:'https://docs.qq.com/pdf/DQW9haHh4Q21YWHVH'},{name:'十万混剪号',effectName:'参与传播',value:10,unit:'个账号',price:1750,minBuy:1,caseUrl:'https://docs.qq.com/pdf/DQW1vcnpnbG9FQkJD'},{name:'手势舞号',effectName:'参与传播',value:10,unit:'个账号',price:450,minBuy:1,caseUrl:'https://docs.qq.com/pdf/DQUhyc2RIREZNQmh1'},{name:'对口型号',effectName:'参与传播',value:10,unit:'个账号',price:450,minBuy:1,caseUrl:'https://docs.qq.com/pdf/DQUNUTkxwamhkZENT'},{name:'剪映模板号',effectName:'参与传播',value:10,unit:'个账号',price:600,minBuy:1,caseUrl:'https://docs.qq.com/pdf/DQWtScEdYc0FBUEta'},{name:'广场舞',effectName:'参与传播',value:10,unit:'个账号',price:750,minBuy:1,caseUrl:'https://docs.qq.com/pdf/DQVREcU1ZV3B6WVVu'}]}),
    quantity({id:'xiaohongshu-promotion',title:'小红书投放',subtitle:'达人种草传播，素人到头部 KOL 可自由组合购买',categoryId:'content',category:'内容推广',goals:['social'],platform:'小红书',logo:'红',sort:100,specs:[{name:'素人投放（粉丝 <1k）',effectName:'参与传播',value:1,unit:'位达人',price:300,minBuy:1},{name:'素人投放（粉丝 1–5k）',effectName:'参与传播',value:1,unit:'位达人',price:450,minBuy:1},{name:'KOC 投放（粉丝 1–3w）',effectName:'参与传播',value:1,unit:'位达人',price:1200,minBuy:1},{name:'KOL 投放（粉丝 3–5w）',effectName:'参与传播',value:1,unit:'位达人',price:2200,minBuy:1},{name:'KOL 投放（粉丝 5–10w）',effectName:'参与传播',value:1,unit:'条内容',price:1500,minBuy:1},{name:'KOL 投放（粉丝 20w+）',effectName:'参与传播',value:1,unit:'条内容',price:5800,minBuy:1}]}),
    continuous({id:'spotify-ads',title:'Spotify 播放推广',subtitle:'通过 Spotify 官方广告系统精准触达海外听众',categoryId:'overseas',category:'海外推广',goals:['global'],platform:'Spotify',logo:'S',sort:110,effectName:'预计新增真实播放',unit:'次',budget:{min:250,max:2000,step:50,referenceBudget:250,referenceValue:4500}}),
    continuous({id:'youtube-views',title:'YouTube 播放推广',subtitle:'通过 YouTube 官方广告系统提升视频播放',categoryId:'overseas',category:'海外推广',goals:['global'],platform:'YouTube',logo:'YT',sort:120,effectName:'预计新增真实播放',unit:'次',budget:{min:1000,max:20000,step:500,referenceBudget:1000,referenceValue:12000}}),
    fixed({id:'qq-chart-sprint',title:'QQ音乐热度冲刺',subtitle:'提升歌曲热度声量·助力登上官方榜单',categoryId:'chart-promotion',category:'打榜推广',goals:['chart'],platform:'QQ音乐',logo:'Q',sort:130,specs:[{name:'基础打榜',effectName:'保底新增真实播放',value:20,unit:'万次',price:14500,note:'未登榜保底实际播放 20 万'},{name:'中级打榜',effectName:'保底新增真实播放',value:30,unit:'万次',price:21500,note:'未登榜保底实际播放 30 万'},{name:'高级打榜',effectName:'保底新增真实播放',value:40,unit:'万次',price:28600,note:'未登榜保底实际播放 40 万'}]}),
    fixed({id:'netease-chart-sprint',title:'网易云音乐热度冲刺',subtitle:'提升歌曲热度声量·助力登上官方榜单',categoryId:'chart-promotion',category:'打榜推广',goals:['chart'],platform:'网易云音乐',logo:'云',sort:140,specs:[{name:'基础',effectName:'保底新增真实播放',value:12,unit:'万次',price:8600},{name:'进阶',effectName:'保底新增真实播放',value:25,unit:'万次',price:17200},{name:'高级',effectName:'保底新增真实播放',value:38,unit:'万次',price:25800}]}),
    fixed({id:'kugou-chart-sprint',title:'酷狗音乐热度冲刺',subtitle:'提升歌曲热度声量·助力登上官方榜单',categoryId:'chart-promotion',category:'打榜推广',goals:['chart'],platform:'酷狗音乐',logo:'酷',sort:150,specs:[{name:'基础',effectName:'保底新增真实播放',value:10,unit:'万次',price:8600,note:'排名参考 40–60 名'},{name:'进阶',effectName:'保底新增真实播放',value:20,unit:'万次',price:17200,note:'排名参考 20–30 名'},{name:'高级',effectName:'保底新增真实播放',value:40,unit:'万次',price:34300,note:'排名参考 5–20 名'}]}),
    fixed({id:'ktv-publish',title:'KTV 制作上架',subtitle:'覆盖全国主流合作 KTV 曲库渠道',categoryId:'scene-service',category:'场景服务',goals:['ktv'],platform:'KTV',logo:'KTV',source:'自定义平台',sort:160,specs:[{name:'单首上架',effectName:'完成上架',value:1,unit:'首歌曲',price:2000}]})
  ];

  const goalNames={plays:'提升播放曝光',playlist:'进入更多歌单',social:'短视频·内容传播',global:'推广到海外',chart:'提升热度、互动量或冲榜',ktv:'上架到 KTV'};
  const firstSaleItem=p=>p.modeKey==='budget'&&p.budgetMode==='continuous'?{effectName:p.effectName,value:p.budget.referenceValue,unit:p.unit,price:p.budget.min}:(p.tiers?.[0]||p.specs?.[0]||null);
  const prices=p=>p.modeKey==='budget'&&p.budgetMode==='continuous'?[p.budget.min,p.budget.max]:(p.tiers||p.specs||[]).map(x=>Number(x.price)||0).filter(Boolean);
  const minPrice=p=>Math.min(...prices(p).filter(Boolean));
  const maxPrice=p=>Math.max(...prices(p).filter(Boolean));
  const configLabel=p=>p.modeKey==='quantity'?`${p.specs.length} 个规格可多选`:p.modeKey==='budget'&&p.budgetMode==='continuous'?'连续预算':p.tiers?`${p.tiers.length} 个预算档位`:`${p.specs.length} 个档位`;
  const effectSummary=p=>{
    if(p.modeKey==='quantity')return `${p.specs[0]?.effectName||'效果'} · 按规格`;
    const x=firstSaleItem(p);return x?`${x.effectName} ${Number(x.value).toLocaleString('zh-CN')} ${x.unit}`:'—';
  };
  window.ADMIN_PRODUCT_CATALOG=products;
  window.ADMIN_PRODUCT_GOAL_NAMES=goalNames;
  window.getAdminProduct=id=>products.find(p=>p.id===id)||null;
  window.getAdminProductFirstSaleItem=firstSaleItem;
  window.getAdminProductMinPrice=minPrice;
  window.getAdminProductMaxPrice=maxPrice;
  window.getAdminProductConfigLabel=configLabel;
  window.getAdminProductEffectSummary=effectSummary;
})();