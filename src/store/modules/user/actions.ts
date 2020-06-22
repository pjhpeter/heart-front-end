import { ActionTree, ActionContext } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "./types";
import { LoginParams } from "@/model/user/LoginParams";

export const actions: ActionTree<UserState, RootState> = {
  /**
   * 用户登录
   * @param param0 上下文
   * @param loginParams 登录表单提交参数，包括账号和密码
   */
  login(
    { commit }: ActionContext<UserState, RootState>,
    loginParams: LoginParams
  ): void {
    // TODO:
  },

  /**
   * 用户注销
   * @param param0 上下文
   */
  logout({ commit }: ActionContext<UserState, RootState>): void {
    // TODO:
  }
};
