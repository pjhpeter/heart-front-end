import { MutationTree } from "vuex";
import { MenuState } from "./types";
import { Menu } from "view-design";
import VueRouter from "vue-router";

export const mutations: MutationTree<MenuState> = {
  /**
   * 保存菜单树
   * @param state 菜单模块状态对象
   * @param menuTree 菜单树
   */
  setMenuTree(state: MenuState, menuTree: Array<Menu>): void {
    state.menuTree = menuTree;
  },

  /**
   * 保存路由器
   * @param stat 菜单模块状态对象
   * @param router 路由器对象
   */
  setRouter(stat: MenuState, router: VueRouter): void {
    stat.router = router;
  }
};
