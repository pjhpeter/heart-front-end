import VueRouter from "vue-router";
import { Menu } from "@/heart/model/menu/Menu";

/**
 * 菜单状态信息接口
 * @author 彭嘉辉
 */
export interface MenuState {
  menuTree: Array<Menu> | null;
  router: VueRouter | null;
}
