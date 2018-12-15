import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import { noop } from '../../../utils/tools'
import ComponentBaseNavigation from '../../base/navigation/navigation'

import './navigation.scss'

class ComponentHomeNavigation extends Component {
  static defaultProps = {
    onSearch: noop,
  }

  render() {
    const { onSearch } = this.props

    return (
      <ComponentBaseNavigation>
        <View className="navigation">
          <Image className="logo" src="@oss/logo.png" />
          <View className="search" onClick={onSearch}>
            <View className="icon iconfont icon-search" />
            <Text className="text">搜索</Text>
          </View>
        </View>
      </ComponentBaseNavigation>
    )
  }
}

export default ComponentHomeNavigation
