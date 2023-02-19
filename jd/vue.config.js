const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    port: 8080,//前台端口号
    https: false,

    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
      '/api': {
        target: 'http://localhost:3000/api',//这里把我们的前台主机和端口换成我们挂载上的主机和端口（也就是我们服务端的主机和端口）
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': ''//请求的时候使用这个api就可以
        }
      }

    },

  },
  configureWebpack :{plugins:[new webpack.ProvidePlugin({ $:"jquery", jQuery:"jquery", "windows.jQuery":"jquery"})]}
})
