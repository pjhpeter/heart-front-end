import Menu from "@/model/heart/menu/Menu";
import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { MenuState } from "./types";

export const getters: GetterTree<MenuState, RootState> = {
  /**
   * 获取菜单树
   * @param state 菜单状态信息
   * @returns 菜单树
   */
  getMenuTree(state: MenuState): Array<Menu> {
    if (state.menuTree) {
      return state.menuTree;
    }
    return [];
  }
};
