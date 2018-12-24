import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'

import styles from './commodity.scss'

class ComponentHomeCommodity extends Component {
  static defaultProps = {
    commodity: {},
  }

  render() {
    const {
      commodity: { commodityName, commodityImage, costPrice, salePrice },
    } = this.props

    return (
      <View className={styles.commodity}>
        <Image
          className={classNames(styles.image, 'skeleton-square')}
          lazyLoad
          src={commodityImage}
        />
        <View className={classNames(styles.name, 'skeleton-square')}>
          {commodityName}
        </View>
        <View className={styles.tool}>
          <View className={styles.price}>
            <View className={classNames(styles.sprice, 'skeleton-square')}>
              <Text className={styles.unit}>¥</Text>
              {salePrice}
            </View>
            <View className={classNames(styles.cprice, 'skeleton-square')}>
              ¥{costPrice}
            </View>
          </View>
          <View className={classNames(styles.btn, 'skeleton-square')}>抢</View>
        </View>
      </View>
    )
  }
}

export default ComponentHomeCommodity
