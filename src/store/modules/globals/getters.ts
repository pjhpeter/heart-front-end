import { GetterTree } from "vuex";
import { GlobalState } from "./types";
import { RootState } from "@/store/types";
import OpenedInfo from "@/model/global/OpenedInfo";

export const getters: GetterTree<GlobalState, RootState> = {
  /**
   * 获取已打开的模块信息列表
   * @param state 全局状态数据
   */
  getOpenedList(state: GlobalState): Array<OpenedInfo> {
    return state.openedList;
  },

  /**
   * 获取底部栏显示状态
   * @param state 全局状态数据
   */
  isShowedFooter(state: GlobalState): boolean {
    return state.showedFooter;
  }
};
