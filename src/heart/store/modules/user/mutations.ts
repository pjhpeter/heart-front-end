import { MutationTree } from "vuex";
import { UserState } from "./types";
import UserInfo from "@/heart/model/user/UserInfo";
import Auth from "@/heart/utils/Auth";

export const mutations: MutationTree<UserState> = {
  /**
   * 保存令牌
   * @param state 用户模块状态对象
   * @param token 后端返回的令牌字符串
   */
  setToken(state: UserState, token: string): void {
    state.token = token;
    Auth.setToken(token);
  },
  /**
   * 保存用户信息
   * @param state 用户模块状态对象
   * @param userInfo 后端返回的用户信息
   */
  setUser(state: UserState, userInfo: UserInfo): void {
    state.user = userInfo;
    Auth.setUserInfo(userInfo);
  },
  /**
   * 清空令牌和用户信息
   * @param state 用户模块状态对象
   */
  clearUserState(state: UserState): void {
    state.token = "";
    state.user = null;
    Auth.clearAuth();
  }
};
