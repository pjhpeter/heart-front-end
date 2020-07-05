import { MutationTree } from "vuex";
import { GlobalState } from "./types";
import OpenedInfo from "@/model/global/OpenedInfo";

export const mutations: MutationTree<GlobalState> = {
  /**
   * 添加打开模块的信息
   * @param state 全局状态数据
   * @param openedInfo 打开的模块信息
   */
  addOpenedInfo(state: GlobalState, openedInfo: OpenedInfo): void {
    state.openedList?.push(openedInfo);
  },

  /**
   * 删除打开的模块信息
   * @param state 全局状态数据
   * @param openedInfo 打开的模块信息
   */
  ramoveOpenedInfo(state: GlobalState, openedInfo: OpenedInfo): void {
    state.openedList?.some((opened: OpenedInfo, index: number) => {
      if (openedInfo.modal._uid === opened.modal._uid) {
        state.openedList?.splice(index, 1);
        return true;
      }
      return false;
    });
  },

  /**
   * 修改底部栏显示状态
   * @param state 全局状态数据
   * @param showFooter 是否显示底部栏
   */
  setShowedFooter(state: GlobalState, showedFooter: boolean): void {
    state.showedFooter = showedFooter;
  }
};
