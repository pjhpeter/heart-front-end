// 兼容IE
import "babel-polyfill";
import Vue from "vue";
// 图片懒加载
import VueLazyload from "vue-lazyload";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 只引入ViewUI的css，组件库按需引入
import "view-design/dist/styles/iview.css";
import "./assets/heart/global/scss/index.scss";
// 引入顶部进度条样式
import "nprogress/nprogress.css";

import "./promission";

Vue.use(VueLazyload, {
  loading: require("./assets/heart/global/images/image-loading.png"),
  error: require("./assets/heart/global/images/image-error.png")
});

Vue.config.productionTip = process.env.NODE_ENV !== "production";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
