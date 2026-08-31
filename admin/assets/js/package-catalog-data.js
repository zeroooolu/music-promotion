(()=>{
  const productOption=(label,productId,saleIndex,extra={})=>({source:'product',label,productId,saleIndex,...extra});
  const packageOption=(label,extra={})=>({source:'package',label,...extra});
  const traffic=(neteaseLabel,tmeLabel,neteaseIndex,tmeIndex)=>[
    productOption(`网易云音乐 ${neteaseLabel} 次真实播放`,'netease-play',neteaseIndex),
    productOption(`QQ音乐 ${tmeLabel} 次真实播放`,'qq-play',tmeIndex),
    productOption(`酷狗音乐 ${tmeLabel} 次真实播放`,'kugou-play',tmeIndex),
    productOption(`酷我音乐 ${tmeLabel} 次真实播放`,'kuwo-play',tmeIndex)
  ];
  const packages=[
    {
      id:'popular-1',name:'养歌启动包',price:799,fit:'短期起量',badge:'推荐',sort:10,status:'上架',updated:'今天 16:20',
      items:[
        {title:'网易云 1 万 / QQ音乐、酷狗、酷我 1.25 万真实播放',tag:'四选一',mode:'choose',pick:1,options:traffic('10,000','12,500',6,6)},
        {title:'垂类歌单推荐 1 张',tag:'',mode:'included',options:[packageOption('垂类歌单推荐 1 张')]},
        {title:'抖音投放 / 小红书 KOC',tag:'二选一',mode:'choose',pick:1,options:[
          productOption('抖音 · 手势舞号 10 条','douyin-promotion',3),
          productOption('抖音 · 对口型号 10 条','douyin-promotion',4),
          packageOption('小红书 · 素人投放 3 个（粉丝 1–5k）')
        ]}
      ]
    },
    {
      id:'popular-2',name:'养歌加强包',price:2199,fit:'加强冲量',badge:'',sort:20,status:'上架',updated:'今天 16:20',
      items:[
        {title:'网易云 2.4 万 / QQ音乐、酷狗、酷我 3 万真实播放',tag:'四选一',mode:'choose',pick:1,options:traffic('24,000','30,000',9,9)},
        {title:'垂类歌单推荐 1 张',tag:'',mode:'included',options:[packageOption('垂类歌单推荐 1 张')]},
        {title:'抖音 / 小红书 / 红心收藏',tag:'三选一',mode:'choose',pick:1,options:[
          productOption('抖音 · 手势舞号 10 条','douyin-promotion',3),
          packageOption('小红书 · 素人投放 3 个（粉丝 1–5k）'),
          packageOption('网易云音乐红心收藏 1,000 个')
        ]}
      ]
    },
    {
      id:'allround-1',name:'全能破圈包',price:2899,fit:'海量曝光',badge:'',sort:30,status:'上架',updated:'今天 16:20',
      items:[
        {title:'网易云 2.4 万 / QQ音乐、酷狗、酷我 3 万真实播放',tag:'四选一',mode:'choose',pick:1,options:traffic('24,000','30,000',9,9)},
        {title:'垂类歌单推荐 1 张',tag:'',mode:'included',options:[packageOption('垂类歌单推荐 1 张')]},
        {title:'保底获得 5 个音乐平台推荐资源位',tag:'',mode:'included',options:[productOption('保底获得 5 个音乐平台推荐资源位','platform-recommendation-resource',0)]},
        {title:'15 个万粉抖音混剪账号参与传播',tag:'',mode:'included',options:[productOption('15 个万粉抖音混剪账号参与传播','douyin-promotion',1)]}
      ]
    },
    {
      id:'allround-2',name:'深度爆发包',price:6600,fit:'重点打歌 / 破圈',badge:'',sort:40,status:'上架',updated:'今天 16:20',
      items:[
        {title:'网易云 4 万 / QQ音乐、酷狗、酷我 5 万真实播放',tag:'四选一',mode:'choose',pick:1,options:traffic('40,000','50,000',11,11)},
        {title:'垂类歌单推荐 1 张',tag:'',mode:'included',options:[packageOption('垂类歌单推荐 1 张')]},
        {title:'保底获得 5 个音乐平台推荐资源位',tag:'',mode:'included',options:[productOption('保底获得 5 个音乐平台推荐资源位','platform-recommendation-resource',0)]},
        {title:'小红书种草 / 抖音混剪',tag:'二选一',mode:'choose',pick:1,options:[
          packageOption('小红书 · KOC 1 个（粉丝 1–3w）+ 素人 3 个（1–5k）'),
          productOption('抖音混剪 · 15 个万粉高互动优质账号','douyin-promotion',1)
        ]},
        {title:'红心收藏',tag:'二选一',mode:'choose',pick:1,options:[
          packageOption('网易云音乐红心收藏 1,000 个'),
          packageOption('QQ音乐收藏 1,000 个')
        ]}
      ]
    },
    {
      id:'chart-addon',name:'冲榜助推包',price:8600,fit:'重点冲榜',badge:'',sort:50,status:'上架',updated:'今天 16:20',
      note:'进阶补差 ¥8,600 · 高级补差 ¥25,700',
      items:[
        {title:'网易云歌单矩阵 · 18 万 / 月',tag:'',mode:'included',options:[packageOption('网易云歌单矩阵 · 18 万 / 月 · 执行 1 个月')]},
        {title:'QQ 音乐歌单矩阵 · 28 万 / 月',tag:'',mode:'included',options:[packageOption('QQ 音乐歌单矩阵 · 28 万 / 月 · 执行 1 个月')]},
        {title:'酷狗音乐热度冲刺',tag:'基础档已含',mode:'choose',pick:1,options:[
          productOption('基础 · 保底 10 万播放，排名参考 40–60 名 · 套餐已含','kugou-chart-sprint',0,{addon:0}),
          productOption('进阶 · 保底 20 万播放，排名参考 20–30 名 · 补差 +¥8,600','kugou-chart-sprint',1,{addon:8600}),
          productOption('高级 · 保底 40 万播放，排名参考 5–20 名 · 补差 +¥25,700','kugou-chart-sprint',2,{addon:25700})
        ]}
      ]
    }
  ];
  const relationLabel=item=>item.tag||'直接包含';
  const choiceItemCount=p=>p.items.filter(x=>x.mode==='choose').length;
  window.ADMIN_PACKAGE_CATALOG=packages;
  window.getAdminPackage=id=>packages.find(x=>x.id===id)||null;
  window.getAdminPackageRelationLabel=relationLabel;
  window.getAdminPackageChoiceItemCount=choiceItemCount;
})();