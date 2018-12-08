import Taro from '@tarojs/taro'

import { delay, throttle } from './tools'

export function pageReady() {
  return new Promise(async resolve => {
    while (true) {
      if (Taro.getCurrentPages().length > 0) {
        break
      }
      await delay(500)
    }

    resolve()
  })
}

export function getCurrentPageTypeAndUrlWithArgs() {
  const { route, options = {}, __data__ = {} } =
    Taro.getCurrentPages().pop() || {}

  const search = Object.keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&')

  const url = search ? `${route}?${search}` : route

  return { url, isTabbar: __data__.__TAB_PAGE__ }
}

export const redirectToRelogin = throttle(async function() {
  await pageReady()

  const { url, isTabbar } = getCurrentPageTypeAndUrlWithArgs()
  const redirectUrl = encodeURIComponent(`/${url}`)

  if (url) {
    Taro.redirectTo({
      url: `/pages/relogin/relogin?isTabbar=${isTabbar}&redirectUrl=${redirectUrl}`,
    })
  }
}, 1000)
