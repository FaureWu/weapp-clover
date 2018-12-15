import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './modal.scss'

class ComponentBaseModal extends Component {
  defaultProps = {
    visible: false,
  }

  render() {
    const { visible } = this.props

    return (
      <View className={classNames('modal', { visible })} onTouchMove>
        <View className="content">{this.props.children}</View>
      </View>
    )
  }
}

export default ComponentBaseModal
