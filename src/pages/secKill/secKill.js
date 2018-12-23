import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import ComponentCommonNavigation from '../../components/common/navigation/navigation'

class PageSecKill extends Component {
  render() {
    return (
      <View>
        <ComponentCommonNavigation title="秒杀专区" />
        <Text>待开发中，敬请期待</Text>
      </View>
    )
  }
}

export default PageSecKill
