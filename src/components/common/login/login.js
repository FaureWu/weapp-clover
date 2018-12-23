import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { dispatcher } from '@opcjs/zoro'

import ComponentBaseModal from '../../base/modal/modal'
import { weappApiFail } from '../../../utils/tools'

import styles from './login.scss'

@connect(({ user }) => ({
  authorize: user.authorize,
}))
class ComponentCommonLogin extends Component {
  static defaultProps = {
    authorize: true,
  }

  handleUploadUserInfo = ({
    detail: { errMsg, rawData, signature, encryptedData, iv },
  }) => {
    if (!weappApiFail(errMsg)) {
      dispatcher.user.uploadInfo({ rawData, signature, encryptedData, iv })
    }
  }

  render() {
    const { authorize } = this.props

    return (
      <ComponentBaseModal visible={!authorize}>
        <View className={styles.login}>
          <View className={styles.logo} />
          <Text className={styles.title}>欢迎加入四叶草庄园</Text>
          <Button
            className={styles.btn}
            openType="getUserInfo"
            lang="zh_CN"
            onGetUserInfo={this.handleUploadUserInfo}
          >
            微信登录
          </Button>
        </View>
      </ComponentBaseModal>
    )
  }
}

export default ComponentCommonLogin
