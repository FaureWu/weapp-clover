import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { dispatcher } from '@opcjs/zoro'

import ComponentCommonLogin from '../../components/common/login/login'
import ComponentCommonSlogan from '../../components/common/slogan/slogan'
import ComponentHomeNavigation from '../../components/home/navigation/navigation'
import ComponentHomeCarousel from '../../components/home/carousel/carousel'
import ComponentHomeBrand from '../../components/home/brand/brand'

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

  handleGoSearch = () => Taro.navigateTo({ url: '/pages/search/search' })

  render() {
    return (
      <View className="home">
        <ComponentCommonLogin />
        <ComponentHomeNavigation onSearch={this.handleGoSearch} />
        <ComponentHomeCarousel />
        <View class="content">
          <ComponentCommonSlogan />
          <ComponentHomeBrand />
        </View>
      </View>
    )
  }
}

export default PageHome
