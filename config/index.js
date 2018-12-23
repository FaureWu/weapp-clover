const path = require('path')
const fs = require('fs')
const appConfig = require('./config')

let localAppConfig = {}
if (fs.existsSync(require.resolve('./config.local.js'))) {
  localAppConfig = require('./config.local.js')
}

let server =
  localAppConfig.server &&
  localAppConfig.server[process.env.BUILD_ENV]
    ? localAppConfig.server[process.env.BUILD_ENV]
    : appConfig.server[process.env.BUILD_ENV]
if (process.env.ENABLE_MOCK === 'true') {
  server = 'http://localhost:3000/api'
}

const ossOptions = {
  ...(localAppConfig.oss &&
  localAppConfig.oss[process.env.BUILD_ENV]
    ? localAppConfig.oss[process.env.BUILD_ENV]
    : appConfig.oss[process.env.BUILD_ENV]),
  path: appConfig.oss.path,
  prefix: appConfig.oss.prefix,
  formats: appConfig.oss.formats,
}

const config = {
  projectName: 'ztaro',
  date: '2018-10-31',
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
      ],
    },
    typescript: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        baseUrl: '.',
        declaration: false,
        experimentalDecorators: true,
        jsx: 'preserve',
        jsxFactory: 'Nerv.createElement',
        module: 'commonjs',
        moduleResolution: 'node',
        noImplicitAny: false,
        noUnusedLocals: true,
        outDir: './dist/',
        preserveConstEnums: true,
        removeComments: false,
        rootDir: '.',
        sourceMap: true,
        strictNullChecks: true,
        target: 'es6',
      },
      include: ['src/**/*'],
      exclude: ['node_modules'],
      compileOnSave: false,
    },
  },
  defineConstants: {
    CONFIG: JSON.stringify({
      SERVER: server,
      DEBUG: localAppConfig.debug || appConfig.debug,
    }),
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
        },
        cssModules: {
          enable: true,
          config: {
            namingPattern: 'global',
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          },
        },
      },
      url: {
        enable: true,
        config: {
          limit: 10240,
        },
      },
      pxtransform: {
        enable: true,
        config: {
          onePxTransform: true,
          unitPrecision: 6,
          replace: true,
          mediaQuery: true,
          minPixelValue: 1,
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
        },
        cssModules: {
          enable: true,
          config: {
            namingPattern: 'global',
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          },
        },
      },
    },
    webpackChain(chain, webpack) {
      chain.merge({
        module: {
          rule: {
            alioss: {
              test: /.js|.jsx|.css|.styl|.less|.scss?/,
              use: [
                {
                  loader: require.resolve('alioss-upload-loader'),
                  options: ossOptions,
                },
              ],
            },
          },
        },
      })
    },
  },
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
