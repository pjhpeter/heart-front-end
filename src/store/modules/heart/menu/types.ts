import VueRouter from "vue-router";
import MenuInfo4Jeesite from "@/model/heart/menu/MenuInfo";

/**
 * 菜单状态信息接口
 * @author 彭嘉辉
 */
export interface MenuState {
  menuTree: Array<MenuInfo4Jeesite>;
}
