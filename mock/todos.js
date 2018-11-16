const faker = require('faker')

function createTodos(number) {
  const todos = []
  for (let i = 0; i < number; i += 1) {
    todos.push({
      id: faker.random.uuid(),
      text: faker.random.words(10),
    })
  }

  return todos
}

let todos = createTodos(faker.random.number({ min: 3, max: 6 }))

function getTodos(req, res) {
  res.status(200).json({
    code: 'success',
    message: '获取待办列表成功',
    data: todos,
  })
}

function addTodo(req, res) {
  const { text } = req.body

  todos.push({
    id: faker.random.uuid(),
    text,
  })

  res.status(200).json({
    code: 'success',
    message: '添加待办事件成功',
  })
}

function deleteTodo(req, res) {
  const { id } = req.params

  todos = todos.filter(todo => todo.id !== id)
  res.status(200).json({
    code: 'success',
    message: '删除待办事件成功',
  })
}

function httpStatusError(req, res) {
  res.status(500).json({
    code: 'error',
    message: '',
  })
}

function serviceError(req, res) {
  res.status(200).json({
    code: 'error',
    message: '业务数据异常',
  })
}

module.exports = {
  'GET /v1/todos': getTodos,
  'POST /v1/todo': addTodo,
  'DELETE /v1/todo/:id': deleteTodo,
  'GET /v1/todo/httpStatusError': httpStatusError,
  'GET /v1/todo/serviceError': serviceError,
}
