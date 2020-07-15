/**
 * 针对jeesite的功能菜单接口
 * @author 彭嘉辉
 */
export default interface MenuInfo4Jeesite {
  menuCode?: string;
  menuIcon?: string;
  menuColor?: string;
  menuUrl?: string;
  menuName?: string;
  component?: any;
  parent?: MenuInfo4Jeesite;
  children?: Array<MenuInfo4Jeesite>;
}
