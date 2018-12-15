const faker = require('faker')

function createCommodity() {
  return {
    commodityId: faker.random.uuid(),
    commodityAlias: faker.random.word(5),
    commodityName: faker.random.words(10),
    commodityImage: '',
    brandId: faker.random.uuid(),
    brandLogo: faker.image.imageUrl(100, 100, undefined, true),
    brandName: faker.name.findName(),
    costPrice: `${faker.commerce.price(1, 100)}`,
    salePrice: `${faker.commerce.price(1, 50)}`,
  }
}

function createHotSaleCommodities(num) {
  const commodities = []

  for (let i = 0; i < num; i++) {
    commodities.push(createCommodity())
  }

  return commodities
}

function getHotSaleCommodityList(req, res) {
  res.status(200).json({
    code: 'success',
    message: '获取热卖商品列表',
    commodities: createCommodities(100),
  })
}

module.exports = {
  'GET /v1/commodity/hotSaleList': getHotSaleCommodityList,
}
