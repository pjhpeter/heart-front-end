import MenuAPI4Jeesite from "@/api/heart/menu/impl/MenuAPI4Jeesite";
import MenuAPI from "@/api/heart/menu/MenuAPI";
import { MENU_ICON_COLORS } from "@/constants/heart/values/Global";
import ModalInfo from "@/model/heart/global/ModalInfo";
import OpenedInfo from "@/model/heart/global/OpenedInfo";
import Menu from "@/model/heart/menu/Menu";
import { Vue } from "vue-property-decorator";
import store from "../../store";

/**
 * 公共工具类
 * @author 彭嘉辉
 */
export default class Commons {
  private static currentIconColorIndex = 0;

  /**
   * 打开一个模态框
   * @param modalInfo 模态框信息
   * @returns 模态框id
   */
  static showModule(modalInfo: ModalInfo): number {
    // 清空当前打开模块信息的激活状态
    const openedList: Array<OpenedInfo> =
      store.getters["globals/getOpenedList"];
    openedList.some((opened: OpenedInfo) => {
      if (opened.active) {
        Vue.set(opened, "active", false);
      }
    });

    // 缓存已打开的模块信息，并激活
    const id: number = Commons.createId();
    const openedInfo: OpenedInfo = {
      id: id,
      backgroundColor: modalInfo.backgroundColor,
      title: modalInfo.title,
      url: modalInfo.url,
      active: true,
      modalInfo
    };
    store.commit("globals/addOpenedInfo", openedInfo);
    return id;
  }

  /**
   * 通过id找到模态框
   * @param id 模态框id
   * @returns 模态框对象
   */
  static findModalById(id: number): any {
    const openedList: Array<OpenedInfo> =
      store.getters["globals/getOpenedList"];
    let modal: any = null;
    openedList.some((openedInfo: OpenedInfo) => {
      if (id === openedInfo.id) {
        modal = openedInfo.modal;
      }
    });
    return modal;
  }

  /**
   * 获取图标颜色，一般用于底部栏图标背景颜色
   * @returns 图标颜色
   */
  static getIconColor(): string {
    const colors = MENU_ICON_COLORS;
    // 当前应用的颜色
    const color: string = colors[Commons.currentIconColorIndex];
    if (Commons.currentIconColorIndex === MENU_ICON_COLORS.length - 1) {
      // 下标已经到最后则重置
      Commons.currentIconColorIndex = 0;
    } else {
      // 将下标后移
      Commons.currentIconColorIndex++;
    }
    return color;
  }

  /**
   * 生成一个id
   * @returns id
   */
  static createId(): number {
    return Number(
      Math.random()
        .toString()
        .substr(3, length) + Date.now()
    );
  }

  static async loadMenuTreeData(): Promise<Array<Menu> | null> {
    let menuTree: Array<Menu> = store.getters["menu/getMenuTree"];
    if (menuTree.length === 0) {
      // 如果状态数据中没有则向后端发请求获取
      const menuAPI: MenuAPI<Menu> = new MenuAPI4Jeesite();
      menuTree = await menuAPI.fetchMenuTree();
    }
    return menuTree;
  }

  /**
   * 根据url获取对应菜单节点对象
   * @param 菜单url
   * @returns 对应菜单节点对象
   */
  static findMenuByUrl(url: string): Menu | undefined {
    const menuTree: Array<Menu> = store.getters["menu/getMenuTree"];
    return Commons.doFindMenu(menuTree, url);
  }

  /**
   * 根据url从菜单数组中寻找对应的菜单
   * @param menuList 菜单对象数组
   * @param url 菜单url
   */
  private static doFindMenu(
    menuList: Array<Menu>,
    url: string
  ): Menu | undefined {
    for (let index = 0; index < menuList.length; index++) {
      const menu: Menu = menuList[index];
      if (menu.children) {
        return Commons.doFindMenu(menu.children, url);
      }
      if (url === menu.menuUrl) {
        return menu;
      }
    }
  }
}
