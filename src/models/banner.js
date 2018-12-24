import { getBannerInfo } from '../requests/banner'
import { SKELETON_BANNER } from '../constants/skeleton'

export default {
  namespace: 'banner',

  mixins: ['common'],

  state: {
    banners: SKELETON_BANNER,
  },

  effects: {
    async getBannerInfo(action, { put }) {
      const { data = [] } = await getBannerInfo()
      put({ type: 'update', payload: { banners: data } })
    },
  },
}
