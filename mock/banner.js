const faker = require('faker')

function createBanners(num, { bannerUrls }) {
  const banners = []
  for (let i = 0; i < num; i++) {
    banners.push({
      bannerId: faker.random.uuid(),
      bannerName: faker.name.findName(),
      redirectUrl: '',
      image: bannerUrls[i % bannerUrls.length],
    })
  }
  return banners
}

function getBannerInfo(req, res) {
  const { bannerUrls } = req.app.locals

  res.status(200).json({
    code: 'success',
    message: '获取资源位成功',
    data: createBanners(3, { bannerUrls }),
  })
}

module.exports = {
  'GET /v1/banner/info': getBannerInfo,
}
