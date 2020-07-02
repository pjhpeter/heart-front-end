const path = require("path");

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,

  devServer: {
    port: 1111,
    host: "localhost",
    open: false,
    proxy: {
      // 匹配/dev-api的请求
      // 用变量名来做key需要用中括号包裹
      [process.env.VUE_APP_PROXY_URI]: {
        // 代理转发地址
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          // 假如axios发请求到/dev-api/test
          // 经过代理的请求路径会变成http://rap2api.taobao.org/app/mock/240993/dev-api/test
          // 把路径中的/dev-api字符串替换成空字符串，就是把/dev-api去掉
          // 最终请求路径会编程http://rap2api.taobao.org/app/mock/240993/test
          ["^" + process.env.VUE_APP_PROXY_URI]: "" // 用变量名来做key需要用中括号包裹
        }
      }
    }
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/assets/global/scss/variables.scss")
      ]
    }
  }
};
