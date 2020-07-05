import { Store } from "vuex";
import { CreateElement, VNode } from "vue/types/umd";
import ModalInfo from "@/model/global/ModalInfo";
import { Vue } from "vue-property-decorator";
import BaseModal from "@/components/commons/BaseModal.vue";
import OpenedInfo from "@/model/global/OpenedInfo";
import { MENU_ICON_COLORS } from "@/constants/values/Global";

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
    const store = modalInfo.store;
    const modal: any = new Vue({
      store,
      render(createElement: CreateElement): VNode {
        return createElement(BaseModal, {
          props: {
            url: modalInfo.url,
            title: modalInfo.title
          }
        });
      }
    }).$mount().$children[0]; // $mount方法不传参数会自动生成一个root节点，模态框是root的第一个子节点

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
      backgroundColor: modalInfo.backgroundColor,
      modal,
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
}
