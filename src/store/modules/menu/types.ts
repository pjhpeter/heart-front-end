import { Menu } from "view-design";
import VueRouter from "vue-router";

/**
 * 菜单状态信息接口
 * @author 彭嘉辉
 */
export interface MenuState {
  menuTree: Array<Menu> | null;
  router: VueRouter | null;
}
