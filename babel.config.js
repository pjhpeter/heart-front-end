module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // 减少ES6转ES5产生的冗余代码
    "@babel/plugin-transform-runtime"
  ]
};
