const faker = require('faker')

function userLogin(req, res) {
  // 获取前端传递过来的code
  // 然后根据appid，appsecret，code访问微信服务器api获取session_key，openid
  // 根据session_key，openid关联自定义登录态，生成token
  const { code } = req.body

  res.status(200).json({
    code: 'success',
    message: '登录成功',
    // 通过faker模拟生成token
    token: req.app.locals.token,
  })
}

function userUploadInfo(req, res) {
  // 前端传递rawData, signature, encryptedData, iv校验和解析用户信息
  // 详见https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html
  const { rawData, signature, encryptedData, iv } = req.body

  res.status(200).json({
    code: 'success',
    message: '上传成功',
  })
}

function userGetInfo(req, res) {
  res.status(200).json({
    code: 'success',
    message: '获取用户信息成功',
    memberInfo: {
      memberId: faker.random.uuid(),
      nickName: 'Faure',
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJS8AiaqOQqE1j3qHCbiaNKF9D9BgtQuE6gFXoXPKUibRMeWvTO55TSeblaMIzFfp3lGdJt3qUPCibBTQ/132',
      city: '成都',
      province: '四川',
      country: '中国',
      gender: 1,
    }
  })
}

module.exports = {
  'POST /v1/user/login': userLogin,
  'POST /v1/user/info': userUploadInfo,
  'GET /v1/user/info': userGetInfo,
}
