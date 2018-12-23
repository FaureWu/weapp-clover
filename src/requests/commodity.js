import request from '../utils/request'

export function getHotSaleCommodityList(data) {
  return request({
    url: '/v1/commodity/hotSaleList',
    method: 'GET',
    data,
  })
}
