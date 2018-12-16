import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import zoro, { dispatcher } from '@opcjs/zoro'

import models from './models'
import mixins from './mixins'
import { TOKEN_KEY } from './constants/common'
import { redirectToRelogin } from './utils/routerHelper'

import './app.scss'

function waitLogin() {
  return new Promise(resolve => {
    Taro.eventCenter.on('login', resolve)
  })
}

const app = zoro({
  onError(error) {
    // 屏蔽用户登录过期信息，因为当用户登录过期时会跳转自动登录
    if (error.response && error.response.statusCode === 401) return

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

/**
 * 由于后台绝大部分接口都需要用户预先登录才可以获取数据
 * 并且前端所有的接口调用都发生在页面中，难以在页面中统一控制接口必须在登录完成后才触发调用
 * 因此在这里设置登录拦截器，拦截所有需要预先登录的接口，等待登录完成后返回
 */
app.intercept.effect(async (action = {}) => {
  const { meta = {} } = action
  if (meta.noAuth) return action

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
    pages: PAGE.CONFIG_PAGES,
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#2f3333',
      navigationStyle: 'custom',
    },
    tabBar: {
      backgroundColor: '#fff',
      color: '#fff',
      selectedColor: '#fff',
      borderStyle: 'white',
      list: PAGE.CONFIG_TABBAR_LIST,
    },
  }

  componentDidMount() {
    Taro.hideTabBar()
    app.setup()
    dispatcher.user
      .checkLogin({}, { noAuth: true })
      .then(() => Taro.eventCenter.trigger('login'))
      .catch(() => {
        dispatcher.user
          .login({}, { noAuth: true })
          .then(() => Taro.eventCenter.trigger('login'))
          .catch(() => redirectToRelogin())
      })
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return <Provider store={store} />
  }
}

Taro.render(<App />, document.getElementById('app'))
