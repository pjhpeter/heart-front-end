import MenuAPI from "../MenuAPI";
import MenuInfo4Jeesite from "@/model/heart/menu/MenuInfo4Jeesite";
import Request from "@/decorator/heart/request/Request";
import { RequestMethod } from "@/constants/heart/enum/RequestEnums";
import store from "@/store";

/**
 * 针对Jeesite的菜单数据解析
 * @author 彭嘉辉
 */
export default class MenuAPI4Jeesite implements MenuAPI<MenuInfo4Jeesite> {
  /**
   * 生成菜单树
   * @param data 响应的数据，调用方法时不必传入
   * @returns 菜单树对象
   */
  @Request("/menuTree.json", RequestMethod.GET, undefined, (error: any) => [])
  fetchMenuTree(data?: any): Array<MenuInfo4Jeesite> {
    try {
      const menuTree: Array<MenuInfo4Jeesite> = [];
      this.parseMenuData(data, menuTree);
      store.commit("menu/setMenuTree", menuTree);
      return menuTree;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  /**
   * 专门处理Jeesite响应数据不规范的问题多写的方法，无语....
   * @param menuData 后端响应的菜单JSON数据
   * @param menuTree 前端需要的菜单对象数组
   * @param parent 上级菜单对象
   */
  private parseMenuData(
    menuData: any,
    menuTree: Array<MenuInfo4Jeesite>,
    parent?: MenuInfo4Jeesite
  ) {
    if (menuData._root_) {
      this.doParse(menuData._root_, menuTree, parent);
    } else {
      this.doParse(menuData, menuTree, parent);
    }
  }

  /**
   * 解析后端响应的菜单JSON数据
   * @param menuData 后端响应的菜单JSON数据
   * @param menuTree 前端需要的菜单对象数组
   * @param parent 上级菜单对象
   */
  private doParse(
    menuData: any,
    menuTree: Array<MenuInfo4Jeesite>,
    parent?: MenuInfo4Jeesite
  ) {
    menuData.forEach((menu: any) => {
      if (!menu.childList && !menu.menuUrl) return;
      // Jeesite响应的模块路径都会有/XX/a/前缀的，把多余的url去掉部分
      const menuUrl = menu.menuUrl.substr(menu.menuUrl.indexOf("/a/") + 2);
      // 是否叶子节点，有menuUrl属性，及不存在子节点则认定为叶子节点
      const isLeaf: boolean = this.isLeaf(menu);
      // 生成菜单对象
      const menuItem: MenuInfo4Jeesite = {
        menuCode: menu.menuCode,
        menuIcon: menu.menuIcon,
        menuName: menu.menuName,
        menuColor: menu.menuColor,
        menuUrl: isLeaf ? menuUrl : Math.random() + "",
        permissions: isLeaf ? this.getPermissions(menu) : [],
        parent
      };

      // 如果有子菜单则继续递归解析
      if (menu.childList) {
        const children: Array<MenuInfo4Jeesite> = [];
        this.doParse(menu.childList, children, menuItem);
        if (children.length > 0) {
          menuItem.children = children;
        }
      }

      // 生成菜单树
      menuTree.push(menuItem);
    });
  }

  /**
   * 判断菜单是否叶子菜单
   * @menu 菜单对象
   */
  private isLeaf(menu: any): boolean {
    const url: string = menu.menuUrl;
    // 如果有url，可能就是叶子节点
    if (url) {
      // 判断是否有childList
      if (!menu.childList || menu.childList.length === 0) {
        // 没有childList，肯定是叶子了
        return true;
      }

      // 遍历childList，看看是否只有权限配置节点
      return menu.childList.every((child: any) => {
        return child.menuType === "2";
      });
    }
    // 没有url，肯定不是叶子
    return false;
  }

  /**
   * 获取用户对当前叶子节点的访问权限
   * @param menu 菜单信息对象 n
   * @returns 访问权限字符串
   */
  private getPermissions(menu: any): Array<string> {
    if (!menu.childList) return [];
    const permissions: Array<string> = [];
    menu.childList.forEach((child: any) => {
      if (child.menuType === "2") {
        permissions.push(child.permission);
      }
    });
    return permissions;
  }
}
