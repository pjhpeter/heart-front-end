import UserAPI from "../UserAPI";
import LoginParams from "@/heart/model/user/LoginParams";
import store from "@/heart/store";
import UserInfo from "@/heart/model/user/UserInfo";
import Request from "@/heart/decorator/request/Request";
import { RequestMethod } from "@/heart/constants/enum/RequestMethod";

/**
 * 针对Jeesite后端接口的用户操作
 * @author 彭嘉辉
 */
export default class UserAPI4Jeesit implements UserAPI {
  /**
   * 用户登录
   * @param loginParams 登录参数
   * @param data 响应数据，调用方法时不必传入
   * @returns 是否登录成功
   */
  @Request(
    "/login?__login=true&__ajax=json",
    RequestMethod.POST,
    (loginParams: LoginParams, error: any) => false
  )
  login(loginParams: LoginParams, data?: any): boolean {
    if (data.result === "true") {
      store.commit("user/setToken", data.sessionid as string);
      store.commit("user/setUser", data.user as UserInfo);
      return true;
    }
    return false;
  }

  /**
   * 用户登出
   * @param data 响应数据，调用方法时不必传入
   * @returns 是否登出成功
   */
  @Request("/logout?__ajax=json", RequestMethod.POST, (error: any) => false)
  logout(data?: any): boolean {
    if (data.result === "true") {
      store.commit("user/clearUserState");
      return true;
    }
    return false;
  }
}
