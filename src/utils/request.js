import Taro from '@tarojs/taro'
import { TOKEN_KEY } from '../constants/common'

const HTTP_ERROR = {
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
  '403': '用户得到授权，但是访问是被禁止的。',
  '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
}

/**
 * 替换url地址中的冒号参数占位符
 * @param {Object} options Taro.request参数
 * @return {Object} 冒号参数替换完成后的options
 */
function resolveParams(options) {
  let { url, data } = options

  if (
    typeof data !== 'object' ||
    data instanceof Array ||
    data instanceof ArrayBuffer
  ) {
    return options
  }

  const reg = /\/:(\w+)/
  let match = reg.exec(url)
  while (match && match[1]) {
    const param = data[match[1]]
    if (typeof param === 'string') {
      url = url.replace(match[0], `/${param}`)
      delete data[match[1]]
    }

    match = reg.exec(url)
  }

  return { ...options, url, data }
}

/**
 * 检查http状态值
 * @param {Object} response
 * @return {Object} 返回业务数据
 */
function checkHttpStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    Taro.hideNavigationBarLoading()
    return response.data
  }

  const message =
    HTTP_ERROR[response.statusCode] || `ERROR CODE: ${response.statusCode}`
  const error = new Error(message)
  error.response = response
  throw error
}

/**
 * 检查业务返回值是否正常
 *
 * 该接口假设后台返回格式统一为
 * {
 *  code: 'SUCCESS',
 *  message: '请求信息',
 *  ...其他参数
 * }
 *
 * @param {Object} data
 * @return {Object} 返回业务数据
 */
function checkSuccess(data) {
  if (typeof data === 'string' && data instanceof ArrayBuffer) {
    return data
  }

  if (
    typeof data.code === 'string' &&
    data.code.toLocaleUpperCase() === 'SUCCESS'
  ) {
    return data
  }

  const error = new Error(data.message)
  error.data = data
  throw error
}

function throwError(error) {
  Taro.hideNavigationBarLoading()

  if (error.errMsg) {
    throw new Error('服务器正在维护中!')
  }

  throw error
}

export default function request(options) {
  const { url } = options
  Taro.showNavigationBarLoading()

  const token = Taro.getStorageSync(TOKEN_KEY)

  return Taro.request(
    resolveParams({
      ...options,
      url: `${CONFIG.SERVER}${url}`,
      mode: 'cors',
      header: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.header,
      },
    }),
  )
    .then(checkHttpStatus)
    .then(checkSuccess)
    .catch(throwError)
}
