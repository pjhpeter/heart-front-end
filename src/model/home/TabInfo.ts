import { CombinedVueInstance } from "vue/types/vue";

/**
 * 底部栏已打开模块的信息接口
 * @author 彭嘉辉
 */
export default interface TabInfo {
  // 菜单图标背景色
  backgroundColor: string;
  // 点击菜单时打开的模态框对象
  modal: any;
}
