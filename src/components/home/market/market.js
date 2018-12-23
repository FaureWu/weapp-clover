import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import styles from './market.scss'

class ComponentHomeMarket extends Component {
  handleGoHotCake = () => Taro.navigateTo({ url: '/pages/hotCake/hotCake' })

  handleGoSecKill = () => Taro.navigateTo({ url: '/pages/secKill/secKill' })

  render() {
    return (
      <View className={styles.market}>
        <View
          className={classNames(styles.item, styles.hotcake)}
          onClick={this.handleGoHotCake}
        />
        <View
          className={classNames(styles.item, styles.seckill)}
          onClick={this.handleGoSecKill}
        />
      </View>
    )
  }
}

export default ComponentHomeMarket
