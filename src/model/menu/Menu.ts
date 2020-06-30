/**
 * 针对jeesite的功能菜单接口
 * @author 彭嘉辉
 */
export default interface Menu {
  menuCode?: string;
  menuIcon?: string;
  menuUrl?: string;
  menuName?: string;
  component?: any;
  parent?: Menu;
  children?: Array<Menu>;
}
