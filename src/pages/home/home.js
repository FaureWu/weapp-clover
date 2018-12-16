import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { dispatcher } from '@opcjs/zoro'

import ComponentCommonLogin from '../../components/common/login/login'
import ComponentCommonSlogan from '../../components/common/slogan/slogan'
import ComponentCommonTabbar from '../../components/common/tabbar/tabbar'
import ComponentHomeNavigation from '../../components/home/navigation/navigation'
import ComponentHomeCarousel from '../../components/home/carousel/carousel'
import ComponentHomeBrand from '../../components/home/brand/brand'
import ComponentHomeMarket from '../../components/home/market/market'

import './home.scss'

class PageHome extends Component {
  config = {
    enablePullDownRefresh: true,
  }

  state = {
    // 请到README.md中查看此参数说明
    __TAB_PAGE__: true, // eslint-disable-line
  }

  componentDidMount() {
    dispatcher.banner.getBannerInfo()
    dispatcher.brand.getHotBrandList()
  }

  onPullDownRefresh() {
    Promise.all([
      dispatcher.banner.getBannerInfo(),
      dispatcher.brand.getHotBrandList(),
    ])
      .then(Taro.stopPullDownRefresh)
      .catch(Taro.stopPullDownRefresh)
  }

  handleGoSearch = () => Taro.navigateTo({ url: `/${PAGE.PAGES.SEARCH.path}` })

  render() {
    return (
      <View className="home">
        <ComponentCommonLogin />
        <ComponentHomeNavigation onSearch={this.handleGoSearch} />
        <ComponentHomeCarousel />
        <View class="content">
          <ComponentCommonSlogan />
          <ComponentHomeBrand />
          <ComponentHomeMarket />
        </View>
        <ComponentCommonTabbar share />
      </View>
    )
  }
}

export default PageHome
