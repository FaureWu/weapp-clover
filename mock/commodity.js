const faker = require('faker')

function createCommodity({ brandLogo }) {
  return {
    commodityId: faker.random.uuid(),
    commodityName: faker.random.words(5),
    commodityImage: 'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/ab96f5d821b44579a60f1c1ea0087183',
    brandId: faker.random.uuid(),
    brandLogo,
    brandName: faker.name.findName(),
    costPrice: `${faker.commerce.price(1, 100)}`,
    salePrice: `${faker.commerce.price(1, 50)}`,
  }
}

function createHotSaleCommodities(num, { brandUrls }) {
  const commodities = []

  for (let i = 0; i < num; i++) {
    commodities.push(createCommodity({ brandLogo: brandUrls[i % brandUrls.length] }))
  }

  return commodities
}

let commodities = []
function getHotSaleCommodityList(req, res) {
  const { pos, count } = req.query
  const { brandUrls } = req.app.locals

  if (commodities.length <= 0) {
    commodities = createHotSaleCommodities(100, { brandUrls })
  }

  const pageSize = parseInt(count)
  const current = parseInt(pos)
  const pageData = commodities.slice(
    pageSize * (current - 1),
    pageSize * (current - 1) + pageSize,
  )

  res.status(200).json({
    code: 'success',
    message: '获取热卖商品列表',
    commodities: pageData,
  })
}

module.exports = {
  'GET /v1/commodity/hotSaleList': getHotSaleCommodityList,
}
