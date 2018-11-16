import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button, Text, Icon } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'

import ComponentSpin from '../../components/spin/spin'

import './todos.scss'

@connect(({ todos }) => ({
  todos: todos.lists,
}))
class PageTodos extends Component {
  config = {
    navigationBarTitleText: '待办事项',
  }

  state = {
    value: '',
    loading: false,
  }

  componentWillMount() {
    this.showLoading()
    dispatcher.todos
      .getTodos()
      .then(this.hideLoading)
      .catch(this.hideLoading)
  }

  showLoading = () => this.setState({ loading: true })

  hideLoading = () => this.setState({ loading: false })

  handleInput = ({ detail: { value } }) => {
    this.setState({ value })
  }

  handleAdd = () => {
    const { value } = this.state
    if (!value) {
      Taro.showToast({
        icon: 'none',
        title: '请输入待办事项!',
        duration: 2000,
      })
      return
    }

    dispatcher.todos.addTodo({ text: value }).then(() => {
      this.setState({ value: '' })
      Taro.showToast({
        icon: 'none',
        title: '添加成功',
        duration: 2000,
      })
    })
  }

  handleDelete = id => {
    dispatcher.todos.deleteTodo({ id }).then(() => {
      Taro.showToast({
        icon: 'none',
        title: '删除成功',
        duration: 2000,
      })
    })
  }

  handleHttpStatusError = () => dispatcher.todos.httpStatusError()

  handleServiceError = () => dispatcher.todos.serviceError()

  render() {
    const { todos } = this.props
    const { value, loading } = this.state

    return (
      <View className="todos">
        <ComponentSpin loading={loading} />
        <View className="logo" />
        <Input
          className="input"
          value={value}
          placeholder="输入添加的待办事件"
          onInput={this.handleInput}
        />
        <View className="tools">
          <Button className="tool" onClick={this.handleAdd}>
            添加
          </Button>
          <Button className="tool" onClick={this.handleHttpStatusError}>
            演示http服务错误
          </Button>
          <Button className="tool" onClick={this.handleServiceError}>
            演示业务错误
          </Button>
        </View>
        {todos.map(todo => (
          <View className="todo" key={todo.id}>
            <Text>{todo.text}</Text>
            <View onClick={this.handleDelete.bind(this, todo.id)}>
              <Icon type="cancel" class="delete" />
            </View>
          </View>
        ))}
      </View>
    )
  }
}

export default PageTodos
