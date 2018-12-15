import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import ComponentBaseNavigation from '../../base/navigation/navigation'

import './navigation.scss'

class ComponentCommonNavigation extends Component {
  static defaultProps = {
    title: '',
  }

  state = {
    canBack: false,
  }

  componentDidMount() {
    const canBack = Taro.getCurrentPages().length > 1
    this.setState({ canBack })
  }

  handleGoHome = () => Taro.switchTab({ url: '/pages/home/home' })

  handleGoBack = () => Taro.navigateBack()

  render() {
    const { title } = this.props
    const { canBack } = this.state

    return (
      <ComponentBaseNavigation>
        <View className={classNames('navigation', { padding: !canBack })}>
          <View className="tools">
            {canBack && (
              <View
                className="iconfont icon-arrow-left back"
                onClick={this.handleGoBack}
              />
            )}
            <View
              className="iconfont icon-home home"
              onClick={this.handleGoHome}
            />
          </View>
          <View className="title">{title}</View>
        </View>
      </ComponentBaseNavigation>
    )
  }
}

export default ComponentCommonNavigation
