import { ModalInfoType } from "@/constants/heart/enum/ModalInfoType";

/**
 * 模态框信息
 * @author 彭嘉辉
 */
export default interface ModalInfo {
  // -------------桌面快捷方式所需属性---------------//
  // 所在网格的id
  parentBoxId?: string;
  // 快捷方式类型
  type?: ModalInfoType;
  // 功能组id，功能组图标才会有值
  groupId?: number;
  // 功能组中的模块列表，功能组图标才会有值
  children?: Array<ModalInfo>;
  // ----------------------------------------------//

  /**
   * 模态框内渲染的组件路径，如果不是后端返回的模块入口路径，则必须以.vue结尾
   * 如果是功能组快捷方式，url的值与groupId的值相等
   */
  url: string;
  /**
   * 模块图标背景颜色
   */
  backgroundColor: string;
  /**
   * 是否允许最大化
   */
  enabledFuscreen?: boolean;
  /**
   * 是否可拉伸，默认可拉伸
   */
  resizable?: boolean;
  /**
   * 传入子组件的数据，JSON格式
   */
  data?: any;
  /**
   * 模态框关闭时的回调函数
   */
  onClose?: Function;

  /**
   * 根据ViewUI的API，暴露出配置参数
   */
  title: string;
  maskClosable?: boolean;
  loading?: boolean;
  scrollable?: boolean;
  draggable?: boolean;
  fullscreen?: boolean;
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
