const express = require('express')
const faker = require('faker')
const mock = require('../server/routes/mock')
const gateway = require('../server/routes/gateway')

module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  weapp: {},
  h5: {
    devServer: {
      port: 3000,
      setup(app) {
        app.locals.token = faker.random.uuid()
        app.use(express.json())
        app.use(gateway)
        app.use('/api', mock)
      },
    },
  },
}
