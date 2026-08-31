(()=>{
  const productExec=(productId,saleIndex,extra={})=>({source:'product',productId,saleIndex,...extra});
  const packageExec=(name,extra={})=>({source:'package',name,...extra});
  const option=(name,executionItems,extra={})=>({name,executionItems,...extra});
  const group=(title,options,selection={min:1,max:1},extra={})=>({title,options,selection,...extra});

  const trafficOptions=(neteaseName,tmeName,neteaseIndex,tmeIndex)=>[
    option('网易云音乐',[productExec('netease-play',neteaseIndex,{display:`网易云音乐 ${neteaseName} 次真实播放`})]),
    option('QQ音乐',[productExec('qq-play',tmeIndex,{display:`QQ音乐 ${tmeName} 次真实播放`})]),
    option('酷狗音乐',[productExec('kugou-play',tmeIndex,{display:`酷狗音乐 ${tmeName} 次真实播放`})]),
    option('酷我音乐',[productExec('kuwo-play',tmeIndex,{display:`酷我音乐 ${tmeName} 次真实播放`})])
  ];

  const packages=[
    {
      id:'popular-1',name:'养歌启动包',price:799,fit:'短期起量',badge:'推荐',sort:10,status:'上架',updated:'今天 16:40',
      items:[
        group('网易云 1 万 / QQ音乐、酷狗、酷我 1.25 万真实播放',trafficOptions('10,000','12,500',6,6),{min:1,max:1}),
        group('垂类歌单推荐 1 张',[option('垂类歌单推荐',[packageExec('垂类歌单推荐 1 张')])]),
        group('抖音投放 / 小红书 KOC',[
          option('抖音投放',[
            productExec('douyin-promotion',3,{display:'手势舞号 · 10 个账号'}),
            productExec('douyin-promotion',4,{display:'对口型号 · 10 个账号'})
          ],{executionSelection:{min:1,max:1}}),
          option('小红书 KOC',[packageExec('小红书 · 素人投放 3 个（粉丝 1–5k）')])
        ],{min:1,max:1})
      ]
    },
    {
      id:'popular-2',name:'养歌加强包',price:2199,fit:'加强冲量',badge:'',sort:20,status:'上架',updated:'今天 16:40',
      items:[
        group('网易云 2.4 万 / QQ音乐、酷狗、酷我 3 万真实播放',trafficOptions('24,000','30,000',9,9),{min:1,max:1}),
        group('垂类歌单推荐 1 张',[option('垂类歌单推荐',[packageExec('垂类歌单推荐 1 张')])]),
        group('抖音 / 小红书 / 红心收藏',[
          option('抖音投放',[productExec('douyin-promotion',3,{display:'手势舞号 · 10 个账号'})]),
          option('小红书种草',[packageExec('小红书 · 素人投放 3 个（粉丝 1–5k）')]),
          option('红心收藏',[packageExec('网易云音乐红心收藏 1,000 个')])
        ],{min:1,max:1})
      ]
    },
    {
      id:'allround-1',name:'全能破圈包',price:2899,fit:'海量曝光',badge:'',sort:30,status:'上架',updated:'今天 16:40',
      items:[
        group('网易云 2.4 万 / QQ音乐、酷狗、酷我 3 万真实播放',trafficOptions('24,000','30,000',9,9),{min:1,max:1}),
        group('垂类歌单推荐 1 张',[option('垂类歌单推荐',[packageExec('垂类歌单推荐 1 张')])]),
        group('保底获得 5 个音乐平台推荐资源位',[option('推荐资源位',[productExec('platform-recommendation-resource',0)])]),
        group('15 个万粉抖音混剪账号参与传播',[option('抖音混剪',[productExec('douyin-promotion',1)])])
      ]
    },
    {
      id:'allround-2',name:'深度爆发包',price:6600,fit:'重点打歌 / 破圈',badge:'',sort:40,status:'上架',updated:'今天 16:40',
      items:[
        group('网易云 4 万 / QQ音乐、酷狗、酷我 5 万真实播放',trafficOptions('40,000','50,000',11,11),{min:1,max:1}),
        group('垂类歌单推荐 1 张',[option('垂类歌单推荐',[packageExec('垂类歌单推荐 1 张')])]),
        group('保底获得 5 个音乐平台推荐资源位',[option('推荐资源位',[productExec('platform-recommendation-resource',0)])]),
        group('小红书种草 / 抖音混剪',[
          option('小红书种草',[packageExec('小红书 · KOC 1 个（粉丝 1–3w）+ 素人 3 个（1–5k）')]),
          option('抖音混剪',[productExec('douyin-promotion',1,{display:'15 个万粉高互动优质账号'})])
        ],{min:1,max:1}),
        group('红心收藏',[
          option('网易云音乐收藏',[packageExec('网易云音乐红心收藏 1,000 个')]),
          option('QQ音乐收藏',[packageExec('QQ音乐收藏 1,000 个')])
        ],{min:1,max:1})
      ]
    },
    {
      id:'chart-addon',name:'冲榜助推包',price:8600,fit:'重点冲榜',badge:'',sort:50,status:'上架',updated:'今天 16:40',
      note:'进阶补差 ¥8,600 · 高级补差 ¥25,700',
      items:[
        group('网易云歌单矩阵 · 18 万 / 月',[option('网易云歌单矩阵',[packageExec('网易云歌单矩阵 · 18 万 / 月 · 执行 1 个月')])]),
        group('QQ 音乐歌单矩阵 · 28 万 / 月',[option('QQ 音乐歌单矩阵',[packageExec('QQ 音乐歌单矩阵 · 28 万 / 月 · 执行 1 个月')])]),
        group('酷狗音乐热度冲刺',[
          option('基础档',[productExec('kugou-chart-sprint',0)],{addon:0}),
          option('进阶档',[productExec('kugou-chart-sprint',1)],{addon:8600}),
          option('高级档',[productExec('kugou-chart-sprint',2)],{addon:25700})
        ],{min:1,max:1},{defaultOption:0})
      ]
    }
  ];

  const cnNum=n=>{
    const map=['零','一','二','三','四','五','六','七','八','九','十'];
    if(n>=0&&n<=10)return map[n];
    return String(n);
  };
  const normalizeSelection=(selection,count)=>{
    const min=Math.max(0,Math.min(count,Number(selection?.min??1)));
    const max=Math.max(min,Math.min(count,Number(selection?.max??min)));
    return {min,max};
  };
  const relationLabel=item=>{
    const count=item.options?.length||0;
    if(count<=1)return '';
    const {min,max}=normalizeSelection(item.selection,count);
    if(Number.isInteger(item.defaultOption)){
      const def=item.options[item.defaultOption];
      const hasUpgrade=item.options.some((x,i)=>i!==item.defaultOption&&Number(x.addon||0)>0);
      if(def&&Number(def.addon||0)===0&&hasUpgrade)return `${def.name||'默认档'}已含`;
    }
    if(min===max)return `${cnNum(count)}选${cnNum(min)}`;
    if(min===0)return `最多选${cnNum(max)}项`;
    return `可选${cnNum(min)}–${cnNum(max)}项`;
  };
  const selectionSummary=item=>{
    const count=item.options?.length||0;
    if(count<=1)return '直接包含';
    const {min,max}=normalizeSelection(item.selection,count);
    return min===max?`${count} 个方案 · 选择 ${min} 个`:`${count} 个方案 · 选择 ${min}–${max} 个`;
  };
  const executionRelationLabel=option=>{
    const count=option.executionItems?.length||0;
    if(count<=1)return '';
    const {min,max}=normalizeSelection(option.executionSelection||{min:count,max:count},count);
    if(min===max&&min===count)return '全部执行';
    if(min===max)return `${cnNum(count)}选${cnNum(min)}`;
    if(min===0)return `最多选${cnNum(max)}项`;
    return `可选${cnNum(min)}–${cnNum(max)}项`;
  };
  const choiceItemCount=p=>p.items.filter(x=>(x.options?.length||0)>1).length;

  window.ADMIN_PACKAGE_CATALOG=packages;
  window.getAdminPackage=id=>packages.find(x=>x.id===id)||null;
  window.getAdminPackageRelationLabel=relationLabel;
  window.getAdminPackageSelectionSummary=selectionSummary;
  window.getAdminPackageExecutionRelationLabel=executionRelationLabel;
  window.getAdminPackageChoiceItemCount=choiceItemCount;
  window.getAdminPackageNormalizeSelection=normalizeSelection;
})();