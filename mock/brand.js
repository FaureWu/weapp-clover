const faker = require('faker')

const brandUrls = [
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/ab96f5d821b44579a60f1c1ea0087183',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/8e55f84e8c55eeb495f9ff8eb5476e68',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/ab5de336cf16d91009efb921d6232994',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/93a807bf050c0c92f77723c8f5e7c548',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/ca80c47e9395ef44aceb70a39fad7882',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/427c23b86ccdea3d67c4324f60bf31d6',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/83b5261ea4ac2adce0081e3ef5ae7e50'
]

function createBrands(num) {
  const brands = []

  for (let i = 0; i < num; i++) {
    brands.push({
      brandId: faker.random.uuid(),
      brandLogo: brandUrls[i % 7],
      brandName: faker.name.findName(),
      brandQty: faker.random.number({ min: 1, max: 999 }),
    })
  }

  return brands
}

function getHotBrandList(req, res) {
  res.status(200).json({
    code: 'success',
    message: '获取品牌列表成功',
    brands: createBrands(7),
  })
}

module.exports = {
  'GET /v1/brand/hotList': getHotBrandList,
}
