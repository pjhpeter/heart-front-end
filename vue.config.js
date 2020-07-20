"use-strict";
const path = require("path");
// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  assetsDir: "static",
  lintOnSave: false,
  // 关闭生产环境的 source map
  productionSourceMap: false,

  devServer: {
    port: 1111,
    host: "0.0.0.0",
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

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch-index");
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete("preload-index");
    // 图片压缩
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({ bypassOnDebug: true })
      .end();
  },

  pluginOptions: {
    // 全局加载sass变量
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/assets/heart/global/scss/variables.scss")
      ]
    }
  },

  // 这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  configureWebpack: config => {
    // 支持IE
    config.entry.app = ["babel-polyfill", "./src/main.ts"];

    // 生产环境
    if (process.env.NODE_ENV === "production") {
      //gzip压缩
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp(".(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      );

      // 公共代码抽离
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            //公用模块抽离
            common: {
              chunks: "all",
              minSize: 0, //大于0个字节
              minChunks: 2 //抽离公共代码时，这个代码块最小被引用的次数
            },
            //第三方库抽离
            vendor: {
              priority: 1, //权重
              test: /node_modules/,
              chunks: "all",
              minSize: 0, //大于0个字节
              minChunks: 2 //在分割之前，这个代码块最小应该被引用的次数
            },
            styles: {
              name: "styles",
              test: /\.(sa|sc|c)ss$/,
              chunks: "all",
              enforce: true
            }
          }
        },
        // 优化持久化缓存
        runtimeChunk: {
          name: "manifest"
        }
      };
    }
  }
};
