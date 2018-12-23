import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'

import styles from './slogan.scss'

class ComponentCommonSlogan extends Component {
  static options = {
    addGlobalClass: true,
  }

  render() {
    return (
      <View className={styles.slogan}>
        <View className={styles.item}>
          <View
            className={classNames('iconfont', 'icon-quality', styles.icon)}
          />
          <Text className={styles.text}>品质好物</Text>
        </View>
        <View className={styles.item}>
          <View
            className={classNames('iconfont', 'icon-service', styles.icon)}
          />
          <Text className={styles.text}>贴心服务</Text>
        </View>
        <View className={styles.item}>
          <View
            className={classNames(
              'iconfont',
              'icon-free-shipping',
              styles.icon,
            )}
          />
          <Text className={styles.text}>全场包邮</Text>
        </View>
      </View>
    )
  }
}

export default ComponentCommonSlogan
