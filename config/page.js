const HOME = {
  path: 'pages/home/home',
  text: '首页',
  icon: 'icon-home',
}

const SHOP = {
  path: 'pages/shop/shop',
  text: '商店',
  icon: 'icon-shop',
}

const CART = {
  path: 'pages/cart/cart',
  text: '购物车',
  icon: 'icon-cart',
}

const USER = {
  path: 'pages/user/user',
  text: '我的',
  icon: 'icon-user',
}

const RELOGIN = {
  path: 'pages/relogin/relogin',
  text: '登录',
}

const SEARCH = {
  path: 'pages/search/search',
  text: '搜索',
}

const HOT_CAKE = {
  path: 'pages/hotCake/hotCake',
  text: '爆款专区',
}

const RED_PACKET = {
  path: 'pages/redPacket/redPacket',
  text: '红包专区',
}

const TABBARS = [HOME, SHOP, CART, USER]
const PAGES = { HOME, SHOP, CART, USER, RELOGIN, SEARCH, HOT_CAKE, RED_PACKET }

module.exports = {
  CONFIG_TABBAR_LIST: TABBARS.map(({ text, path }) => ({ text, pagePath: path })),
  CONFIG_PAGES: Object.keys(PAGES).map(key => PAGES[key].path),
  PAGES,
  TABBARS,
}
