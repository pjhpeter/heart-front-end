import { GetterTree } from "vuex";
import { UserState } from "./types";
import { RootState } from "@/store/types";
import { UserInfo } from "@/model/user/UserInfo";

export const getters: GetterTree<UserState, RootState> = {
  /**
   * 读取令牌
   * @param state 用户模块状态对象
   * @returns 令牌
   */
  getToken(state: UserState): string {
    return state.token;
  },

  /**
   * 读取用户信息
   * @param state 用户模块状态对象
   * @returns 用户信息
   */
  getUserInfo(state: UserState): UserInfo | null {
    return state.user;
  }
};
