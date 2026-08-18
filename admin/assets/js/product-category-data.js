window.PRODUCT_CATEGORIES = [
  {
    id: 'traffic',
    names: {
      zhCN: '播放推广',
      en: 'Streaming Promotion',
      ja: '再生数プロモーション',
      zhTW: '播放推廣'
    },
    products: 2,
    plans: 24,
    sort: 10,
    status: 'on',
    updated: '2026-08-18 10:32'
  },
  {
    id: 'playlist',
    names: {
      zhCN: '歌单推广',
      en: 'Playlist Promotion',
      ja: 'プレイリストプロモーション',
      zhTW: '歌單推廣'
    },
    products: 3,
    plans: 12,
    sort: 20,
    status: 'on',
    updated: '2026-08-18 10:18'
  },
  {
    id: 'content',
    names: {
      zhCN: '内容推广',
      en: 'Content Promotion',
      ja: 'コンテンツプロモーション',
      zhTW: '內容推廣'
    },
    products: 2,
    plans: 13,
    sort: 30,
    status: 'on',
    updated: '2026-08-17 17:46'
  },
  {
    id: 'platform-resource',
    names: {
      zhCN: '平台资源',
      en: 'Platform Resources',
      ja: 'プラットフォームリソース',
      zhTW: '平台資源'
    },
    products: 2,
    plans: 10,
    sort: 40,
    status: 'on',
    updated: '2026-08-17 16:20'
  },
  {
    id: 'scene-service',
    names: {
      zhCN: '场景服务',
      en: 'Music Scene Services',
      ja: 'シーン別サービス',
      zhTW: '場景服務'
    },
    products: 1,
    plans: 1,
    sort: 50,
    status: 'off',
    updated: '2026-08-16 14:08'
  }
];

window.PRODUCT_CATEGORY_LANGUAGES = [
  { key: 'zhCN', label: '简体中文', shortLabel: '简中' },
  { key: 'en', label: 'English', shortLabel: 'EN' },
  { key: 'ja', label: '日本語', shortLabel: '日本語' },
  { key: 'zhTW', label: '繁體中文', shortLabel: '繁中' }
];

window.getProductCategory = function getProductCategory(id) {
  return window.PRODUCT_CATEGORIES.find(category => category.id === id) || window.PRODUCT_CATEGORIES[0];
};
