<template>
  <div>
    <Modal
      v-model="isShow"
      :title="title"
      :draggable="isDraggable"
      :width="width"
      :footer-hide="footerHide"
      :fullscreen="isFullscreen"
      :closable="false"
      class-name="base-modal"
    >
      <template slot="header">
        <div @mousedown="mousedown" @mouseup="mouseup">
          <span class="title" v-text="title"></span>
          <div class="button-group">
            <Button type="text" class="hide-button" @click="hide">
              <i class="iconfont icon-hide"></i>
            </Button>
            <Button
              type="text"
              v-show="isFullscreen"
              class="reset-screen-button"
              @click="resetScreen"
            >
              <i class="iconfont icon-reset-screen"></i>
            </Button>
            <Button
              type="text"
              v-show="!isFullscreen"
              class="fullscreen-button"
              @click="fullscreen"
            >
              <i class="iconfont icon-fullscreen"></i>
            </Button>
            <Button type="text" class="close-button" @click="close">
              <i class="iconfont icon-close"></i>
            </Button>
          </div>
        </div>
      </template>
      <component-loader :menuUrl="menuUrl" />
    </Modal>
  </div>
</template>

<script lang="ts">
/**
 * 基础对话框
 * @author 彭嘉辉
 */
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import ComponentLoader from "./ComponentLoader.vue";
import TabInfo from "../../model/home/TabInfo";
import { TAB_ACTIVE_CLASS } from "../../constants/values/Global";

@Component({
  components: {
    ComponentLoader
  },
  mounted() {
    // 普通的监听器写法无法监听复杂路径的变量
    // 如果要监听复杂路径的变量，用函数的方式返回变量
    this.$watch(
      () => (this.$children[0] as any).modalIndex,
      (this as any).activeTab
    );
  }
})
export default class BaseModal extends Vue {
  // 模态框标题
  @Prop({
    type: String,
    required: true,
    default: ""
  })
  title!: string;
  // 模态框内加载的组件路径
  @Prop({
    type: String,
    default: ""
  })
  menuUrl!: string;
  // 底部栏模块图标集合
  @Prop({
    type: Array,
    default: []
  })
  tabs?: Array<TabInfo>;
  // 模态框关闭时的回调函数
  @Prop()
  onClose?: Function;
  // 不显示底部
  @Prop({
    type: Boolean,
    default: true
  })
  footerHide?: boolean;
  // 模态框宽度
  @Prop({
    type: Number,
    default: 1000
  })
  width?: number;

  // 是否显示模态框
  isShow = true;
  // 是否可拖拽
  isDraggable = true;
  // 是否最大化
  isFullscreen = false;

  /**
   * 最小化
   */
  hide(): void {
    this.isShow = false;
    this.showFooter();
  }

  /**
   * 最大化
   */
  private fullscreen(): void {
    this.isDraggable = false;
    this.isFullscreen = true;
    this.hideFooter();
  }

  /**
   * 取消最大化
   */
  private resetScreen(): void {
    this.isDraggable = true;
    this.isFullscreen = false;
    this.showFooter();
  }

  /**
   * 关闭
   */
  close(): void {
    this.isShow = false;
    this.showFooter();
    this.removeTab();
    this.removeModal();
    if (this.onClose) {
      // 触发自定义关闭处理方法
      this.onClose.call(this, this);
    }
    this.$parent.$destroy();
  }

  /**
   * 鼠标按下事件
   */
  mousedown(event: any): void {
    // 页面高度
    const windowHeight = window.innerHeight;

    // 这种绑定事件方式可以防止鼠标快速移动时mousemove失效问题
    document.onmousemove = (event: any) => {
      if (event.clientY <= 0 || event.clientY > windowHeight - 50) {
        // 停止模态框拖拽事件，禁止移出浏览器上下边界
        (this.$children[0] as any).handleMoveEnd();
      }
    };
  }

  /**
   * 监听模态框层级变化
   */
  activeTab(newValue: number, oldValue: number): void {
    const $vm = this as any;
    const currentUid = $vm._uid;
    // 选中当前点击项，清楚其他选中项
    $vm.tabs.forEach((tab: TabInfo) => {
      if (tab.modal._uid === currentUid && $vm.isShow) {
        // 必须这样赋值才能触发UI响应
        Vue.set(tab, "active", TAB_ACTIVE_CLASS);
      } else {
        // 必须这样赋值才能触发UI响应
        Vue.set(tab, "active", "");
      }
    });
  }

  /**
   * 鼠标松开事件
   */
  mouseup(event: any): void {
    document.onmousemove = null;
  }

  /**
   * 触发桌面底部栏显示
   */
  @Emit("show-footer")
  private showFooter(): void {}

  /**
   * 触发桌面底部栏隐藏
   */
  @Emit("hide-footer")
  private hideFooter(): void {}

  /**
   * 触发首页删除本模态框缓存
   */
  @Emit("remove-modal")
  private removeModal(): any {
    return this;
  }

  /**
   * 触发首页删除本模块信息缓存
   */
  @Emit("remove-tab")
  private removeTab(): any {
    return this;
  }
}
</script>
