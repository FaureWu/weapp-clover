import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import styles from './modal.scss'

class ComponentBaseModal extends Component {
  static defaultProps = {
    visible: false,
  }

  state = {
    show: true,
  }

  componentWillReceiveProps(nextProps) {
    this.ensureTabbar(nextProps.visible)
  }

  componentDidMount() {
    const { visible } = this.props
    this.ensureTabbar(visible)
  }

  componentDidShow() {
    const { visible } = this.props
    if (visible) Taro.hideTabBar()
    this.setState({ show: true })
  }

  componentDidHide() {
    this.setState({ show: false })
  }

  ensureTabbar = visible => {
    const { show } = this.state
    if (visible && show) {
      Taro.hideTabBar()
    } else {
      Taro.showTabBar()
    }
  }

  render() {
    const { visible } = this.props

    return (
      <View
        className={classNames(styles.modal, { [styles.show]: visible })}
        onTouchMove
        onClick
      >
        <View className={styles.content}>{this.props.children}</View>
      </View>
    )
  }
}

export default ComponentBaseModal
