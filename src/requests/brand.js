import request from '../utils/request'

export function getHotBrandList() {
  return request({
    url: '/v1/brand/hotList',
    method: 'GET',
  })
}
