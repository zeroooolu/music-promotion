window.PRODUCT_PLATFORM_LIBRARY = [
  { id:'netease', name:'网易云音乐', code:'NetEase Cloud Music', icon:'云', keywords:['网易云','云音乐','netease','cloud music'] },
  { id:'tme', name:'TME', code:'Tencent Music Entertainment', icon:'T', keywords:['tme','腾讯音乐','腾讯音乐娱乐'] },
  { id:'qqmusic', name:'QQ音乐', code:'QQ Music', icon:'Q', keywords:['qq','qq音乐','qq music'] },
  { id:'kugou', name:'酷狗音乐', code:'Kugou Music', icon:'酷', keywords:['酷狗','kugou'] },
  { id:'kuwo', name:'酷我音乐', code:'Kuwo Music', icon:'我', keywords:['酷我','kuwo'] },
  { id:'migu', name:'咪咕音乐', code:'Migu Music', icon:'咪', keywords:['咪咕','migu'] },
  { id:'qishui', name:'汽水音乐', code:'Qishui Music', icon:'汽', keywords:['汽水','qishui'] },
  { id:'apple', name:'Apple Music', code:'Apple Music', icon:'A', keywords:['apple','苹果音乐'] },
  { id:'spotify', name:'Spotify', code:'Spotify', icon:'S', keywords:['spotify'] },
  { id:'youtube', name:'YouTube', code:'YouTube', icon:'YT', keywords:['youtube','yt'] },
  { id:'joox', name:'JOOX', code:'JOOX', icon:'J', keywords:['joox'] },
  { id:'kkbox', name:'KKBOX', code:'KKBOX', icon:'K', keywords:['kkbox'] },
  { id:'friday', name:'friDay音乐', code:'friDay Music', icon:'F', keywords:['friday','friDay音乐'] },
  { id:'moov', name:'MOOV', code:'MOOV', icon:'M', keywords:['moov'] },
  { id:'9tai', name:'九太', code:'9T', icon:'九', keywords:['九太','9tai','9t'] }
];

window.getProductPlatform = function getProductPlatform(id){
  return window.PRODUCT_PLATFORM_LIBRARY.find(item=>item.id===id)||null;
};
