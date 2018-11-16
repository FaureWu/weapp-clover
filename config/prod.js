module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {},
  weapp: {},
  h5: {},
  plugins: {
    uglify: {
      enable: true,
    },
    csso: {
      enable: true,
    },
  },
}
