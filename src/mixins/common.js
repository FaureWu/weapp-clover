export default {
  namespace: 'common',
  state: {},
  reducers: {
    update({ payload }, state) {
      return { ...state, ...payload }
    },
  },
}
