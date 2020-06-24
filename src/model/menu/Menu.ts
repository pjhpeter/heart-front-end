/**
 * 针对jeesite的功能菜单接口
 * @author 彭嘉辉
 */
export interface Menu {
  isShow?: string;
  permission?: string;
  menuCode?: string;
  sysCode?: string;
  menuTarget?: string;
  menuIcon?: string;
  menuType?: string;
  menuColor?: string;
  menuUrl?: string;
  menuName?: string;
  childList?: Array<Menu>;
}
