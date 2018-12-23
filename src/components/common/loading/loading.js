import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import styles from './loading.scss'

class ComponentCommonLoading extends Component {
  static defaultProps = {
    loading: false,
  }

  render() {
    const { loading } = this.props

    return (
      <View className={styles.loading}>
        {loading && (
          <View className={styles.spin}>
            <View className={styles.rect} />
            <View className={styles.rect} />
            <View className={styles.rect} />
            <View className={styles.rect} />
            <View className={styles.rect} />
          </View>
        )}
      </View>
    )
  }
}

export default ComponentCommonLoading
