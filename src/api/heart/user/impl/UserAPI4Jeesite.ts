import UserAPI from "../UserAPI";
import LoginParams from "@/model/heart/user/LoginParams";
import store from "@/store";
import UserInfo4Jeesite from "@/model/heart/user/UserInfo4Jeesite";
import Request from "@/decorator/heart/request/Request";
import { RequestMethod, ParamMode } from "@/constants/heart/enum/RequestEnums";
import ChangePasswordParams from "@/model/heart/user/changePasswordParams";
import { Message } from "view-design";

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
    ParamMode.FORM_DATA,
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
      // 清空menuTree菜单
      store.commit("menu/removeMenuTree");
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

  @Request(
    "/sys/user/infoSavePwd",
    RequestMethod.POST,
    ParamMode.FORM_DATA,
    (error: any) => false
  )
  changePassword(passwordParams: ChangePasswordParams, data?: any): boolean {
    if (data.result == "true") {
      const msg = data.message
        ? data.message + "！请在3秒后重新登录！"
        : "修改密码成功！请在3秒后重新登录！";
      (Message as any).success({
        content: msg,
        duration: 3
      });
      return true;
    }
    return false;
  }
}
