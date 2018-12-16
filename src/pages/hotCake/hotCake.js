import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ComponentCommonNavigation from '../../components/common/navigation/navigation'

class PageHotCake extends Component {
  render() {
    return (
      <View>
        <ComponentCommonNavigation title={PAGE.PAGES.HOT_CAKE.text} />
        <Text>待开发中，敬请期待</Text>
      </View>
    )
  }
}

export default PageHotCake
