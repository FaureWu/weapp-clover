import { getHotBrandList } from '../requests/brand'
import { SKELETON_BRAND } from '../constants/skeleton'

export default {
  namespace: 'brand',

  mixins: ['common'],

  state: {
    brands: SKELETON_BRAND,
  },

  effects: {
    async getHotBrandList(action, { put }) {
      const { brands = [] } = await getHotBrandList()
      put({ type: 'update', payload: { brands } })
    },
  },
}
