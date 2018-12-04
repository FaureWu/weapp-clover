import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ComponentCommonLogin from '../../components/common/login/login'

import './home.scss'

class PageHome extends Component {
  config = {
    navigationBarTitleText: '四叶草庄园',
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
