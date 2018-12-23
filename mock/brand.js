const faker = require('faker')

function createBrands(num, { brandUrls }) {
  const brands = []

  for (let i = 0; i < num; i++) {
    brands.push({
      brandId: faker.random.uuid(),
      brandLogo: brandUrls[i % brandUrls.length],
      brandName: faker.name.findName(),
      brandQty: faker.random.number({ min: 1, max: 999 }),
    })
  }

  return brands
}

function getHotBrandList(req, res) {
  const { brandUrls } = req.app.locals

  res.status(200).json({
    code: 'success',
    message: '获取品牌列表成功',
    brands: createBrands(7, { brandUrls }),
  })
}

module.exports = {
  'GET /v1/brand/hotList': getHotBrandList,
}
