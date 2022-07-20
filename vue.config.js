const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包加上map文件
  transpileDependencies: false,
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
