import Taro from '@tarojs/taro'

export async function getAuthorize(scopeName) {
  try {
    const { authSetting } = await Taro.getSetting()
    return !!authSetting[`scope.${scopeName}`]
  } catch (error) {
    return false
  }
}

export function weappApiFail(message) {
  return /:fail/.test(message)
}
