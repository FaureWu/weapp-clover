import request from '../utils/request'

export function getHotSaleCommodityList() {
  return request({
    url: '/v1/commodity/hotSaleList',
    method: 'GET',
  })
}
