window.PROMOTION_GOALS = [
  { id: 'plays', name: '增加歌曲播放' },
  { id: 'playlist', name: '进入更多歌单' },
  { id: 'social', name: '短视频 / 内容传播' },
  { id: 'global', name: '推广到海外' },
  { id: 'chart', name: '提升热度 / 冲榜' },
  { id: 'ktv', name: '上架到 KTV' }
];

window.PRODUCT_CATEGORIES = [
  {
    id: 'traffic',
    goalId: 'plays',
    names: { zhCN: '播放推广', en: 'Streaming Promotion', ja: '再生数プロモーション', zhTW: '播放推廣' },
    descriptions: {
      zhCN: '面向网易云音乐、QQ音乐、酷狗、酷我等平台的歌曲播放量与互动推广服务。',
      en: 'Promotion services for increasing song plays and engagement on NetEase Cloud Music, QQ Music, Kugou, Kuwo and other platforms.',
      ja: 'NetEase Cloud Music、QQ Music、Kugou、Kuwo などで楽曲再生数やエンゲージメントを伸ばすプロモーションサービス。',
      zhTW: '面向網易雲音樂、QQ音樂、酷狗、酷我等平台的歌曲播放量與互動推廣服務。'
    },
    products: 3, plans: 25, sort: 10, status: 'on', updated: '2026-08-21 12:30'
  },
  {
    id: 'playlist',
    goalId: 'playlist',
    names: { zhCN: '歌单推广', en: 'Playlist Promotion', ja: 'プレイリストプロモーション', zhTW: '歌單推廣' },
    descriptions: {
      zhCN: '音乐平台歌单、歌单矩阵及相关歌单资源推广服务。',
      en: 'Playlist promotion services covering music-platform playlists, playlist networks and related playlist resources.',
      ja: '音楽プラットフォームのプレイリスト、プレイリストネットワーク、関連リソースを活用したプロモーションサービス。',
      zhTW: '音樂平台歌單、歌單矩陣及相關歌單資源推廣服務。'
    },
    products: 1, plans: 3, sort: 20, status: 'on', updated: '2026-08-21 12:30'
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
    products: 2, plans: 13, sort: 30, status: 'on', updated: '2026-08-21 12:30'
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
    products: 2, plans: 2, sort: 40, status: 'on', updated: '2026-08-21 12:30'
  },
  {
    id: 'platform-resource',
    goalId: 'chart',
    names: { zhCN: '平台资源', en: 'Platform Resources', ja: 'プラットフォームリソース', zhTW: '平台資源' },
    descriptions: {
      zhCN: '平台推荐位申请、打榜及其他需要人工沟通确认的平台资源服务。',
      en: 'Platform resource services including recommendation placements, chart campaigns and other manually coordinated opportunities.',
      ja: 'レコメンド枠の申請、チャート施策、その他個別調整が必要なプラットフォームリソースサービス。',
      zhTW: '平台推薦位申請、打榜及其他需要人工溝通確認的平台資源服務。'
    },
    products: 3, plans: 7, sort: 50, status: 'on', updated: '2026-08-21 12:30'
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
    products: 1, plans: 1, sort: 60, status: 'on', updated: '2026-08-21 12:30'
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
