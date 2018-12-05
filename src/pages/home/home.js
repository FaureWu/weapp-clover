import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ComponentCommonLogin from '../../components/common/login/login'

import './home.scss'

class PageHome extends Component {
  config = {
    navigationBarTitleText: '四叶草庄园',
  }

  state = {
    // 请到README.md中查看此参数说明
    __TAB_PAGE__: true, // eslint-disable-line
  }

  componentDidMount() {}

  render() {
    return (
      <View className="home">
        <ComponentCommonLogin />
        <Text>首页</Text>
      </View>
    )
  }
}

export default PageHome
