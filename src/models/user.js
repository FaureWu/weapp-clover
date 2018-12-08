import Taro from '@tarojs/taro'

import { userLogin, userUploadInfo, userGetInfo } from '../requests/user'
import { TOKEN_KEY } from '../constants/common'
import { getAuthorize, checkToken } from '../utils/tools'

export default {
  namespace: 'user',

  mixins: ['common'],

  state: {
    authorize: true,
    memberInfo: {},
  },

  async setup({ put }) {
    try {
      const authorize = await getAuthorize('userInfo')
      if (!authorize) {
        Taro.hideTabBar()
      } else {
        put({ type: 'getInfo' })
      }

      put({ type: 'update', payload: { authorize } })
    } catch (error) {
      Taro.hideTabBar()
      put({ type: 'update', payload: { authorize: false } })
    }
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
      await userUploadInfo({ rawData, signature, encryptedData, iv })
      put({ type: 'getInfo' })
    },
    async getInfo(action, { put }) {
      const { memberInfo } = await userGetInfo()
      put({ type: 'update', payload: { memberInfo } })
    },
  },
}
