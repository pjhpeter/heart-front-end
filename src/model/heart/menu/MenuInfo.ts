/**
 * 针对jeesite的功能菜单接口
 * @author 彭嘉辉
 */
export default interface MenuInfo {
  menuCode?: string;
  menuIcon?: string;
  menuColor?: string;
  menuUrl?: string;
  menuName?: string;
  component?: any;
  parent?: MenuInfo;
  children?: Array<MenuInfo>;
}
