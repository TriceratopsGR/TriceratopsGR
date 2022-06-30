const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // 路径中出现了 /api 就走这个代理服务器
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn/',
        // pathRewrite:{'':''},
      }
    }
  }
})
