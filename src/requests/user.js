import request from '../utils/request'

export function userLogin(data) {
  return request({
    url: '/v1/user/login',
    data,
    header: {
      noAuth: true,
    },
    method: 'POST',
  })
}

export function userUploadInfo(data) {
  return request({
    url: '/v1/user/info',
    data,
    method: 'POST',
  })
}

export function userGetInfo() {
  return request({
    url: '/v1/user/info',
    method: 'GET',
  })
}
