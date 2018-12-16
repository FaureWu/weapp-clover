import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ComponentCommonNavigation from '../../components/common/navigation/navigation'
import ComponentCommonTabbar from '../../components/common/tabbar/tabbar'

class PageCart extends Component {
  state = {
    // 请到README.md中查看此参数说明
    __TAB_PAGE__: true, // eslint-disable-line
  }

  render() {
    return (
      <View>
        <ComponentCommonNavigation title={PAGE.PAGES.CART.text} />
        <Text>待开发中，敬请期待</Text>
        <ComponentCommonTabbar />
      </View>
    )
  }
}

export default PageCart
