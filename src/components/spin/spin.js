import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './spin.scss'

class ComponentSpin extends Component {
  render() {
    const { loading } = this.props

    return (
      <View className={classNames('spin', { hide: !loading })}>
        <View className="overlay">
          <View className="spin-list">
            <View className="spin-rect" />
            <View className="spin-rect" />
            <View className="spin-rect" />
            <View className="spin-rect" />
            <View className="spin-rect" />
          </View>
        </View>
      </View>
    )
  }
}

export default ComponentSpin
