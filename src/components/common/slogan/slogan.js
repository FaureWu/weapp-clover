import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './slogan.scss'

class ComponentCommonSlogan extends Component {
  static options = {
    addGlobalClass: true,
  }

  render() {
    return (
      <View className="slogan">
        <View className="item ">
          <View className="iconfont icon-quality icon" />
          <Text className="text">品质好物</Text>
        </View>
        <View className="item ">
          <View className="icon iconfont icon-service" />
          <Text className="text">贴心服务</Text>
        </View>
        <View className="item ">
          <View className="icon iconfont icon-free-shipping" />
          <Text className="text">全场包邮</Text>
        </View>
      </View>
    )
  }
}

export default ComponentCommonSlogan
