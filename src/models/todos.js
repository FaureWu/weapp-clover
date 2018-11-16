import {
  getTodos,
  addTodo,
  deleteTodo,
  httpStatusError,
  serviceError,
} from '../requests/todos'

export default {
  namespace: 'todos',
  state: {
    lists: [],
  },
  mixins: ['common'],
  effects: {
    async getTodos(action, { put }) {
      const { data } = await getTodos()
      put({ type: 'update', payload: { lists: data } })
    },

    async addTodo(
      {
        payload: { text },
      },
      { put },
    ) {
      await addTodo({ text })
      await put({ type: 'getTodos' })
    },

    async deleteTodo(
      {
        payload: { id },
      },
      { put },
    ) {
      await deleteTodo({ id })
      await put({ type: 'getTodos' })
    },

    async httpStatusError() {
      await httpStatusError()
    },

    async serviceError() {
      await serviceError()
    },
  },
}
