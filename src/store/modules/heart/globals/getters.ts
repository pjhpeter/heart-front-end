import { GetterTree } from "vuex";
import { GlobalState } from "./types";
import { RootState } from "@/store/types";
import OpenedInfo from "@/model/heart/global/OpenedInfo";

export const getters: GetterTree<GlobalState, RootState> = {
  /**
   * 获取已打开的模块信息列表
   * @param state 全局状态数据
   * @returns 已打开的模块信息列表
   */
  getOpenedList(state: GlobalState): Array<OpenedInfo> {
    return state.openedList;
  },

  /**
   * 获取底部栏显示状态
   * @param state 全局状态数据
   * @returns 是否隐藏底部栏
   */
  isShowedFooter(state: GlobalState): boolean {
    return state.showedFooter;
  },

  /**
   * 获取锁定状态
   * @param state 全局状态数据
   * @returns 是否锁定
   */
  isLocked(state: GlobalState): boolean {
    return state.locked;
  },

  /**
   * 获取浏览器全屏状态
   * @param state 全局状态数据
   * @returns 是否全屏
   */
  isFullscreen(state: GlobalState): boolean {
    return state.fullscreen;
  }
};
