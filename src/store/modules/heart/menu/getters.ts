import MenuInfo4Jeesite from "@/model/heart/menu/MenuInfo4Jeesite";
import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { MenuState } from "./types";

export const getters: GetterTree<MenuState, RootState> = {
  /**
   * 获取菜单树
   * @param state 菜单状态信息
   * @returns 菜单树
   */
  getMenuTree(state: MenuState): Array<MenuInfo4Jeesite> {
    if (state.menuTree) {
      return state.menuTree;
    }
    return [];
  }
};
