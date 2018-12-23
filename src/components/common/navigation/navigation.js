import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { isTabbarPage } from '../../../utils/routerHelper'
import ComponentBaseNavigation from '../../base/navigation/navigation'

import styles from './navigation.scss'

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

  handleGoHome = () => Taro.switchTab({ url: '/pages/home/home' })

  handleGoBack = () => Taro.navigateBack()

  render() {
    const { title } = this.props
    const { canBack, canGoHome } = this.state

    return (
      <ComponentBaseNavigation>
        <View
          className={classNames(styles.navigation, {
            [styles.padding]: !canBack,
          })}
        >
          <View className={styles.tools}>
            {canBack && (
              <View
                className={classNames(
                  'iconfont',
                  'icon-arrow-left',
                  styles.back,
                )}
                onClick={this.handleGoBack}
              />
            )}
            {canGoHome && (
              <View
                className={classNames('iconfont', 'icon-home', styles.home)}
                onClick={this.handleGoHome}
              />
            )}
          </View>
          <View className={styles.title}>{title}</View>
        </View>
      </ComponentBaseNavigation>
    )
  }
}

export default ComponentCommonNavigation
