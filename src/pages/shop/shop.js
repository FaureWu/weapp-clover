import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ComponentCommonLogin from '../../components/common/login/login'

import './shop.scss'

class PageShop extends Component {
  config = {
    navigationBarTitleText: '商店',
  }

  render() {
    return (
      <View className="shop">
        <ComponentCommonLogin />
        <Text>商店</Text>
      </View>
    )
  }
}

export default PageShop
