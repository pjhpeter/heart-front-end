import Menu from "@/model/heart/menu/Menu";
import { MutationTree } from "vuex";
import { MenuState } from "./types";

export const mutations: MutationTree<MenuState> = {
  /**
   * 保存菜单树
   * @param state 菜单模块状态对象
   * @param menuTree 菜单树
   */
  setMenuTree(state: MenuState, menuTree: Array<Menu>): void {
    state.menuTree = menuTree;
  }
};
