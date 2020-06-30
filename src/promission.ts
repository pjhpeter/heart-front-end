import { NavigationGuardNext, Route } from "vue-router";
import router from "./router";
import store from "./store";
import UserAPI from "./api/user/UserAPI";
import UserInfo from "./model/user/UserInfo";
import UserAPI4Jeesit from "./api/user/impl/UserAPI4Jeesite";

// 导出beforeEach方法，方便单元测试
export async function beforeEach(
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
      const userAPI: UserAPI<UserInfo> = new UserAPI4Jeesit();
      const userInfo: UserInfo | null = await userAPI.getUserInfo();
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
  async (to: Route, from: Route, next: NavigationGuardNext<Vue>) =>
    await beforeEach(to, from, next)
);
