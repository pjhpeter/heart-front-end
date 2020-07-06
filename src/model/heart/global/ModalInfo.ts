import { Store } from "vuex";

/**
 * 模态框信息
 * @author 彭嘉辉
 */
export default interface ModalInfo {
  // 模态框内渲染的组件路径，如果不是后端返回的模块入口路径，则必须以.vue结尾
  url: string;
  // 模态框标题
  title: string;
  // 模块图标背景颜色
  backgroundColor: string;
}
