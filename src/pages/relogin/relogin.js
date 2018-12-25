import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { dispatcher } from '@opcjs/zoro'
import classNames from 'classnames'

import styles from './relogin.scss'

class PageRelogin extends Component {
  state = {
    error: false,
  }

  componentWillMount() {
    this.handleLogin()
  }

  handleLogin = () => {
    this.setState({ error: false })
    const { params: { redirectUrl, isTabbar } = {} } = this.$router
    const url = decodeURIComponent(redirectUrl)
    dispatcher.user
      .login({}, { noAuth: true })
      .then(() => {
        Taro.eventCenter.trigger('login')
        dispatcher.user.getInfo()
        if (isTabbar) {
          Taro.switchTab({ url })
        } else {
          Taro.redirectTo({ url })
        }
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  render() {
    const { error } = this.state
    return (
      <View className={styles.relogin}>
        <View
          className={classNames('iconfont', styles.icon, {
            [styles.fail]: error,
            'icon-clover': !error,
            'icon-login-fail': error,
          })}
        />
        <Button
          disabled={!error}
          className={styles.tip}
          onClick={this.handleLogin}
        >
          {error ? '登录失败，点击重试' : '正在登录，请稍后'}
        </Button>
      </View>
    )
  }
}

export default PageRelogin
