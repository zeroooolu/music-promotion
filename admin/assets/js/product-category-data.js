window.PROMOTION_GOALS = [
  { id: 'plays', name: '提升播放曝光' },
  { id: 'playlist', name: '进入更多歌单' },
  { id: 'social', name: '短视频·内容传播' },
  { id: 'global', name: '推广到海外' },
  { id: 'chart', name: '提升热度、互动量或冲榜' },
  { id: 'ktv', name: '上架到 KTV' }
];

window.PRODUCT_CATEGORIES = [
  {
    id: 'traffic',
    goalId: 'plays',
    names: { zhCN: '播放推广', en: 'Streaming Promotion', ja: '再生数プロモーション', zhTW: '播放推廣' },
    descriptions: {
      zhCN: '面向网易云音乐、QQ音乐、酷狗、酷我等平台的歌曲播放推广服务。',
      en: 'Promotion services for increasing song plays on NetEase Cloud Music, QQ Music, Kugou, Kuwo and other platforms.',
      ja: 'NetEase Cloud Music、QQ Music、Kugou、Kuwo などで楽曲再生を伸ばすプロモーションサービス。',
      zhTW: '面向網易雲音樂、QQ音樂、酷狗、酷我等平台的歌曲播放推廣服務。'
    },
    products: 4, plans: 52, sort: 10, status: 'on', updated: '2026-08-31 16:20'
  },
  {
    id: 'playlist',
    goalId: 'playlist',
    names: { zhCN: '歌单推广', en: 'Playlist Promotion', ja: 'プレイリストプロモーション', zhTW: '歌單推廣' },
    descriptions: {
      zhCN: '音乐平台歌单矩阵推广服务。',
      en: 'Playlist-network promotion services for music platforms.',
      ja: '音楽プラットフォームのプレイリストネットワークを活用したプロモーションサービス。',
      zhTW: '音樂平台歌單矩陣推廣服務。'
    },
    products: 3, plans: 10, sort: 20, status: 'on', updated: '2026-08-31 16:20'
  },
  {
    id: 'content',
    goalId: 'social',
    names: { zhCN: '内容推广', en: 'Content Promotion', ja: 'コンテンツプロモーション', zhTW: '內容推廣' },
    descriptions: {
      zhCN: '面向抖音、小红书等内容平台的音乐内容传播与达人推广服务。',
      en: 'Music content distribution and creator promotion services for Douyin, Xiaohongshu and other content platforms.',
      ja: 'Douyin、RED（小紅書）などのコンテンツプラットフォーム向け音楽コンテンツ拡散・クリエイタープロモーションサービス。',
      zhTW: '面向抖音、小紅書等內容平台的音樂內容傳播與達人推廣服務。'
    },
    products: 2, plans: 13, sort: 30, status: 'on', updated: '2026-08-31 16:20'
  },
  {
    id: 'overseas',
    goalId: 'global',
    names: { zhCN: '海外推广', en: 'Global Promotion', ja: '海外プロモーション', zhTW: '海外推廣' },
    descriptions: {
      zhCN: '面向 Spotify、YouTube 等海外平台的广告投放与听众增长服务。',
      en: 'Advertising and audience-growth services for Spotify, YouTube and other global platforms.',
      ja: 'Spotify、YouTube など海外プラットフォーム向けの広告配信・オーディエンス成長サービス。',
      zhTW: '面向 Spotify、YouTube 等海外平台的廣告投放與聽眾增長服務。'
    },
    products: 2, plans: 2, sort: 40, status: 'on', updated: '2026-08-31 16:20'
  },
  {
    id: 'chart-promotion',
    goalId: 'chart',
    names: { zhCN: '打榜推广', en: 'Chart Promotion', ja: 'チャートプロモーション', zhTW: '打榜推廣' },
    descriptions: {
      zhCN: 'QQ音乐、网易云音乐、酷狗音乐等平台的热度与榜单冲刺服务。',
      en: 'Chart and popularity promotion services for QQ Music, NetEase Cloud Music, Kugou Music and other platforms.',
      ja: 'QQ Music、NetEase Cloud Music、Kugou Music などのランキング・人気度向上施策。',
      zhTW: 'QQ音樂、網易雲音樂、酷狗音樂等平台的熱度與榜單衝刺服務。'
    },
    products: 3, plans: 9, sort: 50, status: 'on', updated: '2026-08-31 16:20'
  },
  {
    id: 'platform-resource',
    goalId: 'plays',
    names: { zhCN: '平台资源', en: 'Platform Resources', ja: 'プラットフォームリソース', zhTW: '平台資源' },
    descriptions: {
      zhCN: '音乐平台推荐位、推荐资源及其他需要人工统筹的平台资源推广服务。',
      en: 'Music-platform recommendation placements and other manually coordinated platform-resource promotion services.',
      ja: '音楽プラットフォームのレコメンド枠や、個別調整が必要なプラットフォームリソースのプロモーションサービス。',
      zhTW: '音樂平台推薦位、推薦資源及其他需要人工統籌的平台資源推廣服務。'
    },
    products: 1, plans: 1, sort: 55, status: 'on', updated: '2026-08-31 16:20'
  },
  {
    id: 'scene-service',
    goalId: 'ktv',
    names: { zhCN: '场景服务', en: 'Music Scene Services', ja: 'シーン別サービス', zhTW: '場景服務' },
    descriptions: {
      zhCN: 'KTV 制作上架等面向特定音乐使用场景的一次性交付服务。',
      en: 'One-time delivery services for specific music-use scenarios, such as KTV production and distribution.',
      ja: 'KTV向け制作・配信など、特定の音楽利用シーンに対応する単発納品サービス。',
      zhTW: 'KTV 製作上架等面向特定音樂使用場景的一次性交付服務。'
    },
    products: 1, plans: 1, sort: 60, status: 'on', updated: '2026-08-31 16:20'
  }
];

window.PRODUCT_CATEGORY_LANGUAGES = [
  { key: 'zhCN', label: '简体中文', shortLabel: '简中' },
  { key: 'en', label: 'English', shortLabel: 'EN' },
  { key: 'ja', label: '日本語', shortLabel: '日本語' },
  { key: 'zhTW', label: '繁體中文', shortLabel: '繁中' }
];

window.getPromotionGoal = function getPromotionGoal(id) {
  return window.PROMOTION_GOALS.find(goal => goal.id === id) || null;
};

window.getProductCategory = function getProductCategory(id) {
  return window.PRODUCT_CATEGORIES.find(category => category.id === id) || window.PRODUCT_CATEGORIES[0];
};
