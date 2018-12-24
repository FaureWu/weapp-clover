import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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
          <View className={classNames(styles.logo, 'skeleton-circular')} />
          <View
            className={classNames(styles.search, 'skeleton-cylinder')}
            onClick={onSearch}
          >
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
