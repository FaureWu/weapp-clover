import request from '../utils/request'

export function getTodos() {
  return request({
    url: '/v1/todos',
  })
}

export function addTodo(data) {
  return request({
    url: '/v1/todo',
    data,
    method: 'POST',
  })
}

export function deleteTodo(data) {
  return request({
    url: '/v1/todo/:id',
    data,
    method: 'DELETE',
  })
}

export function httpStatusError() {
  return request({
    url: '/v1/todo/httpStatusError',
  })
}

export function serviceError() {
  return request({
    url: '/v1/todo/serviceError',
  })
}
