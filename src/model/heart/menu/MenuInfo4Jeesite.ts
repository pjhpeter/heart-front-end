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
  /**
   * 组件地址
   */
  component?: any;
  parent?: MenuInfo4Jeesite;
  children?: Array<MenuInfo4Jeesite>;
  /**
   * 对于模块内各请求的权限
   */
  permissions?: Array<string>;
}
