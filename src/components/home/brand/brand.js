import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import styles from './brand.scss'

@connect(({ brand }) => ({
  brands: brand.brands,
}))
class ComponentHomeBrand extends Component {
  static defaultProps = {
    brands: [],
  }

  render() {
    const { brands } = this.props

    return (
      <ScrollView className={styles.brand} scrollX>
        {brands.map(brand => (
          <View id={brand.brandId} key={brand.brandId} className={styles.item}>
            <Image className={styles.image} lazyLoad src={brand.brandLogo} />
            <View className={styles.text}>{brand.brandQty}款</View>
          </View>
        ))}
      </ScrollView>
    )
  }
}

export default ComponentHomeBrand
