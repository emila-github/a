const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
process.env.VUE_APP_VERSION = require('./package.json').version

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463
   */
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  publicPath: process.env.VUE_APP_CONTEXT_PATH,
  css: {
    loaderOptions: {},
  },
  configureWebpack: config => {
    //生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
    // 配置webpack 压缩
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.html$|\.css$/,
        // 超过4kb压缩
        threshold: 4096,
      }),
    )
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@config', resolve('src/config'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
    config.plugin('html').tap(args => {
      args[0].title = '普通交易'
      return args
    })
    // 清除css，js版本号
    config.output.filename(`js/[name].${process.env.VUE_APP_VERSION}.js`).end()
    config.output.chunkFilename(`js/[name].${process.env.VUE_APP_VERSION}.js`).end()
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      // eslint-disable-next-line no-unused-vars
      config.plugin('extract-css').tap(args => [{
        filename: `css/[name].${process.env.VUE_APP_VERSION}.css`,
        chunkFilename: `css/[name].${process.env.VUE_APP_VERSION}.css`,
      }, ])
    }
  },
  devServer: {
    // https: true,
    port: 8080,
    disableHostCheck: true,
    // host: '0.0.0.0',
    public: '40.177.36.19:8080',
    proxy: {
      '/utf8': {
        target: 'https://web.sqt.gtimg.cn/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/utf8': '' //需要rewrite重写的,
        }
      },
      '/api': {
        target: 'https://push2his.eastmoney.com/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //需要rewrite重写的,
        }
      },
      // '/wx/': {
      //   target: 'http://rcepicc.vaiwan.com',
      //   ws: false,
      //   changeOrigin: true,
      // },
    },
  },

  lintOnSave: undefined,
}