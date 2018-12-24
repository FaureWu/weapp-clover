import { getHotSaleCommodityList } from '../requests/commodity'
import { SKELETON_COMMODITY } from '../constants/skeleton'

export default {
  namespace: 'hotSale',

  state: {
    leftCommodities: SKELETON_COMMODITY,
    rightCommodities: SKELETON_COMMODITY,
  },

  mixins: ['common', 'pagination'],

  effects: {
    async getHotSaleCommodityList(
      { payload: { pos: current } = {} },
      { put, select },
    ) {
      const {
        pagination: { pos, count },
      } = select()

      const pagination = { pos: current || pos + 1, count }
      const { commodities = [] } = await getHotSaleCommodityList(pagination)

      put({
        type: 'updatePageDataToDoubleColunms',
        payload: {
          firstKey: 'leftCommodities',
          secondKey: 'rightCommodities',
          data: commodities,
          pagination,
        },
      })
    },
  },
}
