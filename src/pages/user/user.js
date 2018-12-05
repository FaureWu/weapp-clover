import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ComponentCommonLogin from '../../components/common/login/login'

import './user.scss'

class PageUser extends Component {
  config = {
    navigationBarTitleText: '我的',
  }

  state = {
    // 请到README.md中查看此参数说明
    __TAB_PAGE__: true, // eslint-disable-line
  }

  render() {
    return (
      <View className="user">
        <ComponentCommonLogin />
        <Text>我的</Text>
      </View>
    )
  }
}

export default PageUser
