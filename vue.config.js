module.exports = {
  devServer: {
    proxy: 'http://hannao.gicp.net:9091/',
    port: 8077,
  },
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      return [
        {
          ...args[0],
          SERVER_URI: JSON.stringify(process.env.SERVER_URI),
        }
      ]
    })
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
