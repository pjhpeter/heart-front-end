import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";

import "view-design/dist/styles/iview.css";
import "./promission";

Vue.use(ViewUI);

Vue.config.productionTip = process.env.NODE_ENV !== "production";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
