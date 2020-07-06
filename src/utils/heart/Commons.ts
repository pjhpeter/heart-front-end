import BaseModal from "@/components/heart/commons/BaseModal.vue";
import { MENU_ICON_COLORS } from "@/constants/heart/values/Global";
import ModalInfo from "@/model/heart/global/ModalInfo";
import OpenedInfo from "@/model/heart/global/OpenedInfo";
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
   */
  static showModule(modalInfo: ModalInfo): void {
    // 清空当前打开模块信息的激活状态
    const openedList: Array<OpenedInfo> =
      store.getters["globals/getOpenedList"];
    openedList.some((opened: OpenedInfo) => {
      if (opened.active) {
        Vue.set(opened, "active", false);
      }
    });

    // 缓存已打开的模块信息，并激活
    const openedInfo: OpenedInfo = {
      id: Commons.createId(),
      backgroundColor: modalInfo.backgroundColor,
      title: modalInfo.title,
      url: modalInfo.url,
      active: true
    };
    store.commit("globals/addOpenedInfo", openedInfo);
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
}
