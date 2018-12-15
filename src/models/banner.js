import { getBannerInfo } from '../requests/banner'

export default {
  namespace: 'banner',

  mixins: ['common'],

  state: {
    banners: [],
  },

  effects: {
    async getBannerInfo(action, { put }) {
      const { data = [] } = await getBannerInfo()
      put({ type: 'update', payload: { banners: data } })
    },
  },
}
