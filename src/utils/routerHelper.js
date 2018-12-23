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

export function isTabbarPage(page) {
  const { __data__ } = page || Taro.getCurrentPages().pop() || {}
  return !!__data__.__TAB_PAGE__
}

export function getCurrentPageTypeAndUrlWithArgs() {
  const currentPage = Taro.getCurrentPages().pop() || {}
  const { route, options = {} } = currentPage

  const search = Object.keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&')

  const url = search ? `${route}?${search}` : route

  return { url, isTabbar: isTabbarPage(currentPage) }
}

export function getCurrentPage() {
  return Taro.getCurrentPages().pop() || {}
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
