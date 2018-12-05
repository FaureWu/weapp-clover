import Taro from '@tarojs/taro'

export function getCurrentPageTypeAndUrlWithArgs() {
  const { route, options = {}, __data__ = {} } =
    Taro.getCurrentPages().pop() || {}

  const search = Object.keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&')

  const url = search ? `${route}?${search}` : route

  return { url, isTabbar: __data__.__TAB_PAGE__ }
}
