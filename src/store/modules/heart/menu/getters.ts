import Menu from "@/model/heart/menu/Menu";
import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { MenuState } from "./types";

export const getters: GetterTree<MenuState, RootState> = {
  /**
   * 获取菜单树
   * @param state 菜单状态信息
   */
  getMenuTree(state: MenuState): Array<Menu> | null {
    return state.menuTree;
  },

  /**
   * 获取所有叶子菜单信息
   * @param state 菜单状态信息
   */
  getMenuItemList(state: MenuState): Array<Menu> {
    return state.menuItemList;
  }
};
