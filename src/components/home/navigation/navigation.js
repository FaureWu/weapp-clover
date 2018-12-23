import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'

import { noop } from '../../../utils/tools'
import ComponentBaseNavigation from '../../base/navigation/navigation'

import styles from './navigation.scss'

class ComponentHomeNavigation extends Component {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    onSearch: noop,
  }

  render() {
    const { onSearch } = this.props

    return (
      <ComponentBaseNavigation>
        <View className={styles.navigation}>
          <Image className={styles.logo} src="@oss/logo.png" />
          <View className={styles.search} onClick={onSearch}>
            <View
              className={classNames('iconfont', 'icon-search', styles.icon)}
            />
            <Text className={styles.text}>搜索</Text>
          </View>
        </View>
      </ComponentBaseNavigation>
    )
  }
}

export default ComponentHomeNavigation
