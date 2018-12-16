import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './brand.scss'

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
      <ScrollView className="brand" scrollX>
        {brands.map(brand => (
          <View id={brand.brandId} key={brand.brandId} className="item">
            <Image className="image" src={brand.brandLogo} />
            <View className="text">{brand.brandQty}款</View>
          </View>
        ))}
      </ScrollView>
    )
  }
}

export default ComponentHomeBrand
