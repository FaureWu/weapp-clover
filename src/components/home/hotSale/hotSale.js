import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'

import ComponentCommonLoading from '../../common/loading/loading'
import ComponentHomeCommodity from '../commodity/commodity'
import { hotSaleCommoditiesSelector } from '../../../selectors/commodity'

import styles from './hotSale.scss'

@connect(state => ({
  ...hotSaleCommoditiesSelector(state),
  noMore: state.hotSale.noMore,
  loading: state.loading.effect['hotSale/getHotSaleCommodityList'],
}))
class ComponentHomeHotSale extends Component {
  static defaultProps = {
    leftCommodities: [],
    rightCommodities: [],
    noMore: false,
    loading: false,
  }

  render() {
    const { leftCommodities, rightCommodities, loading } = this.props

    return (
      <View className={classNames(styles.hotsale, 'skeleton-light')}>
        <View className={styles.header}>
          <View className={classNames(styles.title, 'skeleton-square')}>
            今日热卖
          </View>
          <View className={classNames(styles.tip, 'skeleton-square')}>
            每日推荐，超值抢购
          </View>
        </View>
        <View className={styles.list}>
          <View className={styles.left}>
            {leftCommodities.map(commodity => (
              <View className={styles.commodity} key={commodity.commodityId}>
                <ComponentHomeCommodity commodity={commodity} />
              </View>
            ))}
          </View>
          <View className={styles.right}>
            {rightCommodities.map(commodity => (
              <View className={styles.commodity} key={commodity.commodityId}>
                <ComponentHomeCommodity commodity={commodity} />
              </View>
            ))}
          </View>
        </View>
        <ComponentCommonLoading loading={loading} />
      </View>
    )
  }
}

export default ComponentHomeHotSale
