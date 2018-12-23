import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ComponentCommonNavigation from '../../components/common/navigation/navigation'

class PageCart extends Component {
  state = {
    // 请到README.md中查看此参数说明
    __TAB_PAGE__: true, // eslint-disable-line
  }

  render() {
    return (
      <View>
        <ComponentCommonNavigation title="购物车" />
        <Text>待开发中，敬请期待</Text>
      </View>
    )
  }
}

export default PageCart
