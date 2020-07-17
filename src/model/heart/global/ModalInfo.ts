/**
 * 模态框信息
 * @author 彭嘉辉
 */
export default interface ModalInfo {
  // 所在网格的id
  parentBoxId?: string;
  // 快捷方式类型
  type?: number;
  // 模态框内渲染的组件路径，如果不是后端返回的模块入口路径，则必须以.vue结尾
  url: string;
  // 模块图标背景颜色
  backgroundColor: string;
  // 是否允许最大化
  enabledFuscreen?: boolean;
  // 是否可拉伸，默认可拉伸
  resizable?: boolean;
  // 模态框关闭时的回调函数
  onClose?: Function;

  /**
   * 根据ViewUI的API，暴露出配置参数
   */
  title: string;
  maskClosable?: boolean;
  loading?: boolean;
  scrollable?: boolean;
  draggable?: boolean;
  mask?: boolean;
  okText?: string;
  cancelText?: string;
  width?: number;
  footerHide?: boolean;
  styles?: object;
  className?: string;
  zIndex?: number;
  transitionNames?: Array<string>;
  transfer?: boolean;
  onOk?: Function;
  onCancel?: Function;
  onVisibleChange?: Function;
}
