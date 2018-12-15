export default {
  namespace: 'pagination',
  state: {},
  reducers: {
    update({ payload }, state) {
      return { ...state, ...payload }
    },
  },
}
