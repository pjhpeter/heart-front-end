import Vue from "vue";
import VueRouter, { RouteConfig, RawLocation } from "vue-router";

// 处理路由跳转当前路径时报错的问题：Navigating to current location ("/") is not allowed
const originalPush: Function = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: RawLocation) {
  return originalPush.call(this, location).catch((error: any) => error);
};

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/heart/login/index.vue")
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/heart/home/index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
