const faker = require('faker')

const bannerUrls = [
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/16e4df33c7c6b83e19091dd381ef92b2',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/d5bbde1f5cae7a19083b1b311ac5f73a',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/6fdea3657d45205c6e369d6eae33247c',
]

function createBanners(num) {
  const banners = []
  for (let i = 0; i < num; i++) {
    banners.push({
      bannerId: faker.random.uuid(),
      bannerName: faker.name.findName(),
      redirectUrl: '',
      image: bannerUrls[i % 3],
    })
  }
  return banners
}

function getBannerInfo(req, res) {
  res.status(200).json({
    code: 'success',
    message: '获取资源位成功',
    data: createBanners(3),
  })
}

module.exports = {
  'GET /v1/banner/info': getBannerInfo,
}
