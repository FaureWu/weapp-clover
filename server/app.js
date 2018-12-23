var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var faker = require('faker')

var mock = require('./routes/mock')
var geteway = require('./routes/gateway')

var app = express()

app.locals.token = faker.random.uuid()
app.locals.brandUrls = [
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/ab96f5d821b44579a60f1c1ea0087183',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/8e55f84e8c55eeb495f9ff8eb5476e68',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/ab5de336cf16d91009efb921d6232994',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/93a807bf050c0c92f77723c8f5e7c548',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/ca80c47e9395ef44aceb70a39fad7882',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/427c23b86ccdea3d67c4324f60bf31d6',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/83b5261ea4ac2adce0081e3ef5ae7e50',
]
app.locals.bannerUrls = [
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/16e4df33c7c6b83e19091dd381ef92b2',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/d5bbde1f5cae7a19083b1b311ac5f73a',
  'https://xmpt-sit.oss-cn-shenzhen.aliyuncs.com/6fdea3657d45205c6e369d6eae33247c',
]

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(geteway)
app.use('/api', mock)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
