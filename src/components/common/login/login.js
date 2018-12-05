import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'

import ComponentCommonModal from '../modal/modal'
import { weappApiFail } from '../../../utils/tools'

import './login.scss'

@connect(({ user }) => ({
  authorize: user.authorize,
}))
class ComponentCommonLogin extends Component {
  handleUploadUserInfo = ({
    detail: { errMsg, rawData, signature, encryptedData, iv },
  }) => {
    if (!weappApiFail(errMsg)) {
      dispatcher.user.uploadInfo({ rawData, signature, encryptedData, iv })
      dispatcher.user.update({ authorize: true })
      Taro.showTabBar()
    }
  }

  render() {
    const { authorize } = this.props

    return (
      <ComponentCommonModal visible={!authorize}>
        <View className="login">
          <View className="logo" />
          <Text className="title">欢迎加入四叶草庄园</Text>
          <Button
            className="btn"
            openType="getUserInfo"
            lang="zh_CN"
            onGetUserInfo={this.handleUploadUserInfo}
          >
            微信登录
          </Button>
        </View>
      </ComponentCommonModal>
    )
  }
}

export default ComponentCommonLogin
