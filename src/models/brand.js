import { getHotBrandList } from '../requests/brand'

export default {
  namespace: 'brand',

  mixins: ['common'],

  state: {
    brands: [],
  },

  effects: {
    async getHotBrandList(action, { put }) {
      const { brands = [] } = await getHotBrandList()
      put({ type: 'update', payload: { brands } })
    },
  },
}
