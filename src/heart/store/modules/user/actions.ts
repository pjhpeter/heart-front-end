import { ActionTree, ActionContext } from "vuex";
import { RootState } from "@/heart/store/types";
import { UserState } from "./types";
import { LoginParams } from "@/heart/model/user/LoginParams";
import Request from "@/heart/decorator/request/Request";

class UserStateActions {
  /**
   * 用户登录
   * @param param0 上下文
   * @param loginParams 登录表单提交参数，包括账号和密码
   */
  login(
    { commit }: ActionContext<UserState, RootState>,
    loginParams: LoginParams
  ): any {
    // TODO:
    return "";
  }

  /**
   * 用户注销
   * @param param0 上下文
   */
  logout({ commit }: ActionContext<UserState, RootState>): void {
    // TODO:
  }
}

export const actions: ActionTree<UserState, RootState> = {
  /**
   * 用户登录
   * @param param0 上下文
   * @param loginParams 登录表单提交参数，包括账号和密码
   */
  login(
    { commit }: ActionContext<UserState, RootState>,
    loginParams: LoginParams
  ): any {
    // TODO:
    return "";
  },

  /**
   * 用户注销
   * @param param0 上下文
   */
  logout({ commit }: ActionContext<UserState, RootState>): void {
    // TODO:
  }
};
