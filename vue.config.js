module.exports = {
  devServer: {
    proxy: 'http://hannao.gicp.net:9091/',
    port: 8077,
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
