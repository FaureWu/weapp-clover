import request from '../utils/request'

export function getBannerInfo() {
  return request({
    url: '/v1/banner/info',
    method: 'GET',
  })
}
