import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 只引入ViewUI的css，组件库按需引入
import "view-design/dist/styles/iview.css";
import "./assets/heart/global/scss/index.scss";

import "./promission";

Vue.config.productionTip = process.env.NODE_ENV !== "production";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
