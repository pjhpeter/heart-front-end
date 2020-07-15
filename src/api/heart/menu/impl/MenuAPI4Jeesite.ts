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
      const isLeaf: boolean = menuUrl && !menu.childList;
      // 生成菜单对象
      const menuItem: MenuInfo4Jeesite = {
        menuCode: menu.menuCode,
        menuIcon: menu.menuIcon,
        menuName: menu.menuName,
        menuColor: menu.menuColor,
        menuUrl: isLeaf ? menuUrl : Math.random() + "",
        // 动态加载组件，这里可以看出每个模块的入口组件必须放在views目录下，并且目录结构与menuUrl的值保持一致
        component: isLeaf ? () => import(`@/views${menuUrl}`) : undefined,
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
}
