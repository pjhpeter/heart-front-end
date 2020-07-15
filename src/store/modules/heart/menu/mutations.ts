import MenuInfo4Jeesite from "@/model/heart/menu/MenuInfo4Jeesite";
import { MutationTree } from "vuex";
import { MenuState } from "./types";

export const mutations: MutationTree<MenuState> = {
  /**
   * 保存菜单树
   * @param state 菜单模块状态对象
   * @param menuTree 菜单树
   */
  setMenuTree(state: MenuState, menuTree: Array<MenuInfo4Jeesite>): void {
    state.menuTree = menuTree;
  }
};
