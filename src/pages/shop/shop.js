import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ComponentCommonNavigation from '../../components/common/navigation/navigation'
import ComponentCommonLogin from '../../components/common/login/login'
import ComponentCommonTabbar from '../../components/common/tabbar/tabbar'

class PageShop extends Component {
  state = {
    // 请到README.md中查看此参数说明
    __TAB_PAGE__: true, // eslint-disable-line
  }

  render() {
    return (
      <View>
        <ComponentCommonLogin />
        <ComponentCommonNavigation title={PAGE.PAGES.SHOP.text} />
        <Text>待开发中，敬请期待</Text>
        <ComponentCommonTabbar share />
      </View>
    )
  }
}

export default PageShop
