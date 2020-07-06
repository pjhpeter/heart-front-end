/**
 * 底部栏已打开模块的信息接口
 * @author 彭嘉辉
 */
export default interface OpenedInfo {
  // 唯一标识
  id: number;
  // 图标背景色
  backgroundColor: string;
  // 模态框展示组件的路径
  url: string;
  // 打开的模态框对象
  title: string;
  // 图标选中样式
  active?: boolean;
  // 打开的模态框对象
  modal?: any;
}
