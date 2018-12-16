import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class ComponentHomeMarket extends Component {
  handleGoHotCake = () =>
    Taro.navigateTo({ url: `/${PAGE.PAGES.HOT_CAKE.path}` })

  handleGoRedPacket = () =>
    Taro.navigateTo({ url: `/${PAGE.PAGES.RED_PACKET.path}` })

  render() {
    return (
      <View className="market">
        <View className="item hot-cake" onClick={this.handleGoHotCake} />
        <View className="item red-packet" onClick={this.handleGoRedPacket} />
      </View>
    )
  }
}

export default ComponentHomeMarket
