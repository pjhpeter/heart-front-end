import OpenedInfo from "@/model/heart/global/OpenedInfo";

/**
 * 全局状态数据处理
 * @author 彭嘉辉
 */
export interface GlobalState {
  // 当前已打开的模块信息
  openedList: Array<OpenedInfo>;
  // 是否显示底部栏
  showedFooter: boolean;
}
