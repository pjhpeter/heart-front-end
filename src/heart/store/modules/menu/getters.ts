import { GetterTree } from "vuex";
import { MenuState } from "./types";
import { RootState } from "@/heart/store/types";
import VueRouter from "vue-router";
import { Menu } from "@/heart/model/menu/Menu";

export const getters: GetterTree<MenuState, RootState> = {
  /**
   * 获取菜单树
   * @param state 菜单状态信息
   */
  getMenuTree(state: MenuState): Array<Menu> | null {
    return state.menuTree;
  },

  /**
   * 获取路由器对象
   * @param state 菜单状态信息
   */
  getRouter(state: MenuState): VueRouter | null {
    return state.router;
  }
};
