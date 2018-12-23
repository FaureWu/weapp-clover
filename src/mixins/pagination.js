import { PAGINATION } from '../constants/common'
import { formatPagination } from '../utils/tools'

export default {
  namespace: 'pagination',
  state: {
    pagination: { ...PAGINATION },
    noMore: false,
  },
  effects: {
    // 存储分页数据采用静默刷新模式
    updatePageData(
      {
        payload: { key, data, pagination },
      },
      { select, put },
    ) {
      put({ type: 'setPagination', payload: { pagination } })
      const oldState = select()
      const oldData = oldState[key]
      const { pos } = oldState.pagination

      let newData = []
      if (oldData.length > pos) {
        newData = oldData.slice(0, pos)
      } else {
        newData = oldData.slice(0)
      }

      newData[pos - 1] = data
      put({
        type: 'update',
        payload: { [key]: newData, noMore: data.length <= 0 },
      })
    },
    // 存储分页数据为伪双列瀑布流模式
    updatePageDataToDoubleColunms(
      {
        payload: { firstKey, secondKey, data, pagination },
      },
      { select, put },
    ) {
      put({ type: 'setPagination', payload: { pagination } })
      const oldState = select()
      const oldFirstData = oldState[firstKey]
      const oldSecondData = oldState[secondKey]
      const { pos } = oldState.pagination

      let newFirstData = []
      if (oldFirstData.length > pos) {
        newFirstData = oldFirstData.slice(0, pos)
      } else {
        newFirstData = oldFirstData.slice(0)
      }

      let newSecondData = []
      if (oldSecondData.length > pos) {
        newSecondData = oldSecondData.slice(0, pos)
      } else {
        newSecondData = oldSecondData.slice(0)
      }

      const { first, second } = data.reduce(
        (result, item, index) => {
          if (index % 2) {
            result.second.push(item)
          } else {
            result.first.push(item)
          }

          return result
        },
        { first: [], second: [] },
      )

      newFirstData[pos - 1] = first
      newSecondData[pos - 1] = second

      put({
        type: 'update',
        payload: {
          [firstKey]: newFirstData,
          [secondKey]: newSecondData,
          noMore: data.length <= 0,
        },
      })
    },
  },
  reducers: {
    setPagination(
      {
        payload: { pagination },
      },
      state,
    ) {
      const currentPagination = formatPagination(pagination)
      return { ...state, pagination: { ...currentPagination } }
    },
    resetPagination(action, state) {
      return { ...state, pagination: { ...PAGINATION } }
    },
  },
}
