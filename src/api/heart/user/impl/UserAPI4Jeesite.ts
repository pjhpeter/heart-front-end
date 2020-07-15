import UserAPI from "../UserAPI";
import LoginParams from "@/model/heart/user/LoginParams";
import store from "@/store";
import UserInfo4Jeesite from "@/model/heart/user/UserInfo";
import Request from "@/decorator/heart/request/Request";
import { RequestMethod, ParamMode } from "@/constants/heart/enum/RequestEnums";

/**
 * 针对Jeesite后端接口的用户操作
 * @author 彭嘉辉
 */
export default class UserAPI4Jeesit implements UserAPI<UserInfo4Jeesite> {
  /**
   * 用户登录
   * @param loginParams 登录参数
   * @param data 响应数据，调用方法时不必传入
   * @returns 是否登录成功
   */
  @Request(
    "/login?__login=true&__ajax=json",
    RequestMethod.POST,
    ParamMode.REQUEST_PAYLOAD,
    (loginParams: LoginParams, error: any) => false
  )
  login(loginParams: LoginParams, data?: any): boolean {
    if (data.result === "true") {
      // 保存用户信息
      store.commit("user/setToken", data.sessionid as string);
      store.commit("user/setUser", data.user as UserInfo4Jeesite);
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
  @Request(
    "/logout?__ajax=json",
    RequestMethod.POST,
    undefined,
    (error: any) => false
  )
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
  @Request(
    "/sys/user/info.json",
    RequestMethod.GET,
    undefined,
    (error: any) => null
  )
  getUserInfo(data?: any): UserInfo4Jeesite | null {
    if (data.user) {
      return data.user as UserInfo4Jeesite;
    }
    return null;
  }
}
