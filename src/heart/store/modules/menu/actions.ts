import { ActionTree, ActionContext } from "vuex";
import { MenuState } from "./types";
import { RootState } from "@/heart/store/types";

export const actions: ActionTree<MenuState, RootState> = {
  /**
   * 保存菜单树
   * @param param0 上下文
   */
  setMenuTree({ commit, state }: ActionContext<MenuState, RootState>) {
    // TODO:
  },

  /**
   * 保存路由器对象
   * @param param0 上下文
   */
  setRouter({ commit }: ActionContext<MenuState, RootState>) {
    // TODO:
  }
};
