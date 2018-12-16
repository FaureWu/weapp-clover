import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './navigation.scss'

@connect(({ user }) => ({
  statusBarHeight: user.systemInfo.statusBarHeight,
}))
class ComponentBaseNavigation extends Component {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    color: 'white',
    backgroundColor: '#2f3333',
  }

  render() {
    const { statusBarHeight, backgroundColor, color } = this.props

    const barStyle = {
      paddingTop: `${statusBarHeight}px`,
      backgroundColor,
      color,
    }

    return (
      <View className="navigation">
        <View className="bar" style={barStyle}>
          {this.props.children}
        </View>
        <View className="placeholder" style={barStyle} />
      </View>
    )
  }
}

export default ComponentBaseNavigation
