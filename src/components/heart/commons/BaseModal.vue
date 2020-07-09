<template>
  <div>
    <Modal
      v-model="isShow"
      :title="title"
      :mask-closable="modalInfo.maskClosable"
      :loading="modalInfo.loading"
      :scrollable="modalInfo.scrollable"
      :fullscreen="modalInfo.fullscreen"
      :draggable="modalInfo.draggable"
      :mask="modalInfo.mask"
      :ok-text="modalInfo.okText"
      :cancel-text="modalInfo.cancelText"
      :width="modalInfo.width ? modalInfo.width : 1000"
      :footer-hide="
        modalInfo.footerHide !== undefined ? modalInfo.footerHide : true
      "
      :closable="false"
      :class-name="`heart-base-modal ${modalInfo.className}`"
      :z-index="modalInfo.zIndex"
      :transition-names="modalInfo.transitionNames"
      :transfer="modalInfo.transfer"
      @on-ok="onOk"
      @on-cancel="onCancel"
      @on-visible-change="onVisibleChange"
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
              v-show="modalInfo.fullscreen"
              class="reset-screen-button"
              @click="resetScreen"
              v-if="modalInfo.enabledFuscreen"
            >
              <i class="iconfont icon-reset-screen"></i>
            </Button>
            <Button
              type="text"
              v-show="!modalInfo.fullscreen"
              class="fullscreen-button"
              @click="doFullscreen"
              v-if="modalInfo.enabledFuscreen"
            >
              <i class="iconfont icon-fullscreen"></i>
            </Button>
            <Button type="text" class="close-button" @click="close">
              <i class="iconfont icon-close"></i>
            </Button>
          </div>
        </div>
      </template>
      <component-loader :url="url" ref="componentLoader" />
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
import OpenedInfo from "../../../model/heart/global/OpenedInfo";
import ModalInfo from "../../../model/heart/global/ModalInfo";
import { Modal, Button } from "view-design";

@Component({
  components: {
    ComponentLoader,
    Modal,
    Button
  }
})
export default class BaseModal extends Vue {
  // 模态框id
  @Prop({
    type: Number,
    required: true
  })
  _id!: number;
  // 模态框内加载的组件路径
  @Prop({
    type: String,
    default: ""
  })
  url!: string;
  // 模态框标题
  @Prop({
    type: String,
    required: true,
    default: ""
  })
  title!: string;
  // 模态框配置信息
  @Prop({
    type: Object,
    default: {}
  })
  modalInfo!: ModalInfo;

  // 显示状态
  isShow = true;

  created() {
    // 初始化必要的参数
    if (!this.modalInfo.draggable) {
      this.modalInfo.draggable = true;
    }
    if (this.modalInfo.enabledFuscreen === undefined) {
      this.modalInfo.enabledFuscreen = true;
    }
  }

  mounted(): void {
    // 普通的监听器写法无法监听复杂路径的变量
    // 如果要监听复杂路径的变量，用函数的方式返回变量
    // 监听ViewUI的Modal组件中modalIndex变量，模态框每次层级变化，这个变量都会变化，由此判断模态框是否置为顶层
    this.$watch(() => (this.$children[0] as any).modalIndex, this.active);
    // 将当前模态框对象缓存的打开的模块信息中
    this.$store.getters["globals/getOpenedList"].some(
      (openedInfo: OpenedInfo) => {
        if (!openedInfo.modal) {
          // 缓存打开的模态框对象
          this.$store.commit("globals/setOpenedModal", this);
          return true;
        }
        return false;
      }
    );
  }

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
  private doFullscreen(): void {
    Vue.set(this.modalInfo, "draggable", false);
    Vue.set(this.modalInfo, "fullscreen", true);
    // 模拟点击模态框操作，使其至于最顶层，查看源代码发现的
    (this.$children[0] as any).handleClickModal();
    this.hideFooter();
  }

  /**
   * 取消最大化
   */
  private resetScreen(): void {
    Vue.set(this.modalInfo, "draggable", true);
    Vue.set(this.modalInfo, "fullscreen", false);
    this.showFooter();
  }

  /**
   * 关闭
   */
  close(): void {
    this.isShow = false;
    this.showFooter();
    this.removeOpened();
    if (this.modalInfo.onClose) {
      // 触发自定义关闭处理方法，将模态框内渲染的组件对象传回
      this.modalInfo.onClose.call(
        this,
        (this.$refs["componentLoader"] as any).$children[0]
      );
    }
  }

  /**
   * 鼠标按下事件
   */
  private mousedown(event: any): void {
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
   * 鼠标松开事件
   */
  mouseup(event: any): void {
    document.onmousemove = null;
  }

  /**
   * 监听模态框层级变化
   */
  active(newValue: number, oldValue: number): void {
    // 选中当前点击项，清楚其他选中项
    const openedList: Array<OpenedInfo> = this.$store.getters[
      "globals/getOpenedList"
    ];
    openedList.forEach((opened: OpenedInfo) => {
      if (opened.id === this._id && this.isShow) {
        // 必须这样赋值才能触发UI响应
        Vue.set(opened, "active", true);
      } else {
        // 必须这样赋值才能触发UI响应
        Vue.set(opened, "active", false);
      }
    });
  }

  /**
   * 触发桌面底部栏显示
   */
  private showFooter(): void {
    this.$store.commit("globals/setShowedFooter", true);
  }

  /**
   * 触发桌面底部栏隐藏
   */
  private hideFooter(): void {
    this.$store.commit("globals/setShowedFooter", false);
  }

  /**
   * 删除本模块信息缓存
   */
  private removeOpened(): void {
    const openedInfo: OpenedInfo = {
      id: this._id,
      backgroundColor: "",
      title: this.title,
      url: this.url,
      active: false
    };
    this.$store.commit("globals/ramoveOpenedInfo", openedInfo);
  }

  /**
   * 点击确定按钮触发事件
   */
  private onOk() {
    this.close();
    if (this.modalInfo.onOk) {
      this.modalInfo.onOk.call(
        this,
        (this.$refs["componentLoader"] as any).$children[0]
      );
    }
  }

  /**
   * 点击取消按钮触发事件
   */
  private onCancel() {
    this.close();
    if (this.modalInfo.onCancel) {
      // 将组件对象返回给调用者
      this.modalInfo.onCancel.call(
        this,
        (this.$refs["componentLoader"] as any).$children[0]
      );
    }
  }

  /**
   * 显示状态变化触发事件
   */
  private onVisibleChange(isShow: boolean) {
    if (this.modalInfo.onVisibleChange) {
      // 将组件对象返回给调用者
      this.modalInfo.onVisibleChange.call(
        this,
        isShow,
        this.$refs["componentLoader"]
      );
    }
  }
}
</script>
