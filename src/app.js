import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import zoro from '@opcjs/zoro'
import { createLoading } from '@opcjs/zoro-plugin'

import PageTodos from './pages/todos/todos'
import models from './models'
import mixins from './mixins'
import { TOKEN_KEY } from './constants/common'

import './app.scss'

function waitLogin() {
  return new Promise(resolve => {
    Taro.eventCenter.on('login', resolve)
  })
}

const app = zoro({
  onError(error) {
    if (error.message) {
      Taro.showToast({
        icon: 'none',
        title: error.message,
        duration: 2000,
      })
    }
  },
})
app.use(mixins)
app.use(createLoading())
app.intercept.effect(async action => {
  if (action.meta && action.meta.noAuth) return action

  try {
    const token = Taro.getStorageSync(TOKEN_KEY)
    if (!token) {
      await waitLogin()
    }
  } catch (error) {
    await waitLogin()
  }
})
app.model(models)

const store = app.start(false)

if (CONFIG.DEBUG) {
  store.subscribe(() => console.log(store.getState()))
}
class App extends Component {
  config = {
    pages: ['pages/home/home', 'pages/shop/shop', 'pages/user/user'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#222',
      navigationBarTitleText: '四叶草庄园',
      navigationBarTextStyle: 'white',
      backgroundColor: '#222',
    },
    tabBar: {
      backgroundColor: '#fff',
      color: '#000',
      selectedColor: '#E1B621',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/home/home',
          text: '首页',
          iconPath: 'assets/tabbar/home.png',
          selectedIconPath: 'assets/tabbar/home-active.png',
        },
        {
          pagePath: 'pages/shop/shop',
          text: '商店',
          iconPath: 'assets/tabbar/shop.png',
          selectedIconPath: 'assets/tabbar/shop-active.png',
        },
        {
          pagePath: 'pages/user/user',
          text: '我的',
          iconPath: 'assets/tabbar/user.png',
          selectedIconPath: 'assets/tabbar/user-active.png',
        },
      ],
    },
  }

  componentDidMount() {
    app.setup()
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return (
      <Provider store={store}>
        <PageTodos />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
