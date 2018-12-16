import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { isTabbarPage } from '../../../utils/routerHelper'
import ComponentBaseNavigation from '../../base/navigation/navigation'

import './navigation.scss'

class ComponentCommonNavigation extends Component {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    title: '',
  }

  state = {
    canBack: false,
    canGoHome: true,
  }

  componentWillMount() {
    const pages = Taro.getCurrentPages()
    this.setState({
      canBack: pages.length > 1,
      canGoHome: !isTabbarPage(pages.pop()),
    })
  }

  handleGoHome = () => Taro.switchTab({ url: `/${PAGE.PAGES.HOME.path}` })

  handleGoBack = () => Taro.navigateBack()

  render() {
    const { title } = this.props
    const { canBack, canGoHome } = this.state

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
            {canGoHome && (
              <View
                className="iconfont icon-home home"
                onClick={this.handleGoHome}
              />
            )}
          </View>
          <View className="title">{title}</View>
        </View>
      </ComponentBaseNavigation>
    )
  }
}

export default ComponentCommonNavigation
