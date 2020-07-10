import UserAPI from "../UserAPI";
import LoginParams from "@/model/heart/user/LoginParams";
import store from "@/store";
import UserInfo from "@/model/heart/user/UserInfo";
import Request from "@/decorator/heart/request/Request";
import { RequestMethod } from "@/constants/heart/enum/RequestMethod";

/**
 * 针对Jeesite后端接口的用户操作
 * @author 彭嘉辉
 */
export default class UserAPI4Jeesit implements UserAPI<UserInfo> {
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
      // 解除锁屏
      store.commit("globals/setLocked", false);
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
      // 清空token
      store.commit("user/clearUserState");
      // 清空打开模块信息
      store.commit("globals/clearOpenedInfoList");
      return true;
    }
    return false;
  }

  /**
   * 获取当前用户信息
   * @param data 响应数据，调用方法时不必传入
   * @returns 当前用户信息对象
   */
  @Request("/sys/user/info.json", RequestMethod.GET, (error: any) => null)
  getUserInfo(data?: any): UserInfo | null {
    if (data.user) {
      return data.user as UserInfo;
    }
    return null;
  }
}
