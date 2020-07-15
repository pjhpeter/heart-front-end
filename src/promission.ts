import { NavigationGuardNext, Route } from "vue-router";
import router from "./router";
import store from "./store";
import UserAPI from "./api/heart/user/UserAPI";
import UserInfo4Jeesite from "./model/heart/user/UserInfo";
import UserAPI4Jeesit from "./api/heart/user/impl/UserAPI4Jeesite";
import NProgress from "./utils/heart/NProgress";

// 导出beforeEach方法，方便单元测试
export async function beforeEach4Jeesite(
  to: Route,
  from: Route,
  next: NavigationGuardNext<Vue>
) {
  // 不拦截登录请求
  if (to.path === "/login") {
    next();
  } else {
    // 检查是否已经存在令牌
    const token = store.getters["user/getToken"];
    if (!token) {
      // 没有令牌，重新登录
      next("/login");
    } else {
      // 有令牌，尝试当前获取用户信息
      const userAPI: UserAPI<UserInfo4Jeesite> = new UserAPI4Jeesit();
      const userInfo: UserInfo4Jeesite | null = await userAPI.getUserInfo();
      if (userInfo) {
        // 获取当前用户信息成功，允许路由跳转
        next();
      } else {
        // 获取用户信息不成功，重新登录
        next("/login");
      }
    }
  }
}

// 定义导航守卫
router.beforeEach(
  async (to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
    // 路由跳转开始，显示进度条
    NProgress.start();
    await beforeEach4Jeesite(to, from, next);
  }
);

router.afterEach(() => {
  // 路由跳转完成，进度条结束
  NProgress.done();
});
