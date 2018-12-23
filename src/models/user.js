import Taro from '@tarojs/taro'

import { userLogin, uploadUserInfo, getUserInfo } from '../requests/user'
import { TOKEN_KEY } from '../constants/common'
import { checkToken } from '../utils/tools'

export default {
  namespace: 'user',

  mixins: ['common'],

  state: {
    authorize: true,
    memberInfo: {},
    systemInfo: {},
  },

  setup({ put }) {
    Taro.getSystemInfo().then(systemInfo =>
      put({ type: 'update', payload: { systemInfo } }),
    )
    Taro.getSetting()
      .then(({ authSetting }) =>
        put({
          type: 'update',
          payload: { authorize: authSetting['scope.userInfo'] },
        }),
      )
      .catch(() => put({ type: 'update', payload: { authorize: false } }))
    put({ type: 'getInfo' })
  },

  effects: {
    async checkLogin() {
      await Taro.checkSession()
      await checkToken()
    },
    async login() {
      const { code } = await Taro.login()
      const { token } = await userLogin({ code })
      await Taro.setStorage({ key: TOKEN_KEY, data: token })
    },
    async uploadInfo(
      {
        payload: { rawData, signature, encryptedData, iv },
      },
      { put },
    ) {
      await uploadUserInfo({ rawData, signature, encryptedData, iv })
      put({ type: 'getInfo' })
      put({ type: 'update', payload: { authorize: true } })
    },
    async getInfo(action, { put }) {
      const { memberInfo } = await getUserInfo()
      put({ type: 'update', payload: { memberInfo } })
    },
  },
}
