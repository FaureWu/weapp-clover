module.exports = {
  server: {
    dev: 'https://devapiserver',
    prod: 'https://prodapiserver',
  },
  // 阿里云oss插件配置
  oss: {
    dev: {
      accessKeyId: '************',
      accessKeySecret: '***************',
      endpoint: 'https://************.aliyuncs.com',
      region: '*************',
      bucket: '*********',
    },
    prod: {
      accessKeyId: '************',
      accessKeySecret: '***************',
      endpoint: 'https://************.aliyuncs.com',
      region: '*************',
      bucket: '*********',
    },
    path: 'src/assets/',
    prefix: '@oss',
    formats: ['png', 'jpeg', 'jpg', 'svg'],
  },
  debug: true,
}
