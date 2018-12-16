import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import classNames from 'classnames'

import { getCurrentPage } from '../../../utils/routerHelper'

import './tabbar.scss'

class ComponentCommonTabbar extends Component {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    share: false,
  }

  state = {
    currentRoute: '',
  }

  componentWillMount() {
    const { route } = getCurrentPage()
    this.setState({ currentRoute: route })
  }

  handleSwitch = ({ path }) => Taro.switchTab({ url: `/${path}` })

  render() {
    const { share } = this.props
    const { currentRoute } = this.state

    return (
      <View className="tabbar">
        <View className="tabs">
          {PAGE.TABBARS.map(page => (
            <View
              className={classNames('tab', {
                active: page.path === currentRoute,
              })}
              key={page.path}
              onClick={this.handleSwitch.bind(this, page)}
            >
              <View className={classNames('icon', 'iconfont', page.icon)} />
              <View className="text">{page.text}</View>
            </View>
          ))}
        </View>
        {share && (
          <Button className="share" openType="share">
            <View className="iconfont icon-share icon" />
          </Button>
        )}
      </View>
    )
  }
}

export default ComponentCommonTabbar
