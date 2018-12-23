import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

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
        <Image className={styles.image} lazyLoad src={commodityImage} />
        <View className={styles.name}>{commodityName}</View>
        <View className={styles.tool}>
          <View className={styles.price}>
            <View className={styles.sprice}>
              <Text className={styles.unit}>¥</Text>
              {salePrice}
            </View>
            <View className={styles.cprice}>¥{costPrice}</View>
          </View>
          <View className={styles.btn}>抢</View>
        </View>
      </View>
    )
  }
}

export default ComponentHomeCommodity
