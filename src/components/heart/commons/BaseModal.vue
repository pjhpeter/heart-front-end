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
      :footer-hide="modalInfo.footerHide"
      :closable="false"
      :class-name="`heart-base-modal ${modalInfo.className}`"
      :z-index="modalInfo.zIndex"
      :transition-names="modalInfo.transitionNames"
      :transfer="modalInfo.transfer"
      @on-ok="onOk"
      @on-cancel="onCancel"
      @on-visible-change="onVisibleChange"
      v-init
    >
      <template slot="header">
        <div @mousedown="mousedown" @mouseup="mouseup" @dblclick="doFullscreen">
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
      <component-loader
        :url="url"
        ref="componentLoader"
        :data="modalInfo.data"
      />
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
import { VNode } from "vue";

@Component({
  components: {
    ComponentLoader,
    Modal,
    Button
  },
  directives: {
    // 拖动边框改变大小
    // 只支持右边界、下边界和右下角三个地方
    init: {
      bind: (el: Element, binding: any, vnode: VNode, oldVNode: VNode) => {
        // BaseModal
        const baseModal: any = vnode.context;
        // 获取模态框有效显示元素
        const modalContent: any = el.querySelector(".ivu-modal-content");
        // 模态框主体
        const modalBody: any = el.querySelector(".ivu-modal-body");
        // 保存模态框初始信息
        baseModal.modalContent = modalContent;
        baseModal.modalBody = modalBody;
        if (baseModal.modalInfo.resizable) {
          baseModal.$nextTick(() => {
            // 保证模态框已经存在
            baseModal.modalOriginHeight = modalContent.style.height;
            baseModal.modalBodyOriginHeight = modalBody.style.height;
            modalContent.onmousemove = baseModal.setCursor(modalContent);
            modalContent.onmousedown = baseModal.resize(modalContent);
          });
        }
      }
    }
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

  // 模态框头部高度
  private headerHeight = 40;
  // 模态框底栏高度
  private footerHeight = 0;
  // 鼠标进入拉伸范围，拉伸功能生效
  private activeResize = false;
  // 正在拉伸
  private resizing = false;
  // 模态框有效显示元素
  private modalContent: any = null;
  // 模态框主体元素，不包括header和footer
  private modalBody: any = null;
  // 模态框最大化前的高宽，由于ViewUI的Modal组件并不管理高度，所以要自己管理
  private modalOriginHeight = "";
  // 模态框body最大化前的高宽，由于ViewUI的Modal组件并不管理高度，所以要自己管理
  private modalBodyOriginHeight = "";

  created() {
    // 初始化必要的参数
    if (!this.modalInfo.draggable) {
      this.modalInfo.draggable = true;
    }
    if (this.modalInfo.enabledFuscreen === undefined) {
      this.modalInfo.enabledFuscreen = true;
    }
    if (this.modalInfo.resizable === undefined) {
      this.modalInfo.resizable = true;
    }
    if (this.modalInfo.footerHide === undefined) {
      this.modalInfo.footerHide = true;
    }
    if (!this.modalInfo.footerHide) {
      this.footerHeight = 57;
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
    // 如果拉伸过，高度无法达到最高，必须重新设置
    this.modalContent.style.height = `${document.body.clientHeight}px`;
    this.modalBody.style.setProperty(
      "height",
      `${document.body.clientHeight - this.headerHeight - this.footerHeight}px`,
      "important"
    );
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
    // 将模态框的高度设置会最大化之前的值
    this.modalContent.style.height = this.modalOriginHeight;
    this.modalBody.style.setProperty(
      "height",
      this.modalBodyOriginHeight,
      "important"
    );
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
   * 鼠标按下header事件
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
   * 鼠标松开header事件
   */
  private mouseup(event: any): void {
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

  // 设置鼠标形状
  private setCursor(): Function {
    // 拖动效果范围
    const range = 8;
    return (event: MouseEvent) => {
      // 正在拉伸直接返回，不能影响方向
      if (this.resizing) return;
      // 获取模态框的位置
      const box: any = this.modalContent.getBoundingClientRect();
      const left: number = box.left;
      const top: number = box.top;
      // 鼠标位置
      const xPosition: number = event.clientX;
      const yPosition: number = event.clientY;
      // 模态框的高宽
      const offsetWidth: number = this.modalContent.offsetWidth;
      const offsetHeight: number = this.modalContent.offsetHeight;
      // 鼠标样式
      let cursorStr = "";

      // 要减去header的40px高度
      if (yPosition > top + offsetHeight - range) {
        // 从南边来
        cursorStr += "s";
      }
      if (xPosition > left + offsetWidth - range) {
        // 从东边来
        cursorStr += "e";
      }

      if (cursorStr) {
        // 拉伸功能生效
        this.modalContent.style.cursor = cursorStr + "-resize";
        this.activeResize = true;
      } else {
        // 离开拉伸生效范围
        this.modalContent.style.cursor = "default";
        this.activeResize = false;
      }
    };
  }

  /**
   * 拉伸模态框
   * @param modalContent 模态框有效显示元素
   */
  private resize(): Function {
    return (event: MouseEvent) => {
      if (this.activeResize) {
        // 模态框外框的高宽
        const offsetWidth: number = this.modalContent.offsetWidth;
        const offsetHeight: number = this.modalContent.offsetHeight;
        // 模态框body高宽
        const bodyOffsetWidth: number = this.modalBody.offsetWith;
        const bodyOffsetHeight: number = this.modalBody.offsetHeight;
        // 模态框当前位置
        const modalX: number = event.clientX - offsetWidth;
        const modalY: number = event.clientY - offsetHeight;
        document.onmousemove = (event: MouseEvent) => {
          // 禁用默认行为，防止选中浏览器文字效果触发
          if (event.preventDefault) {
            event.preventDefault();
          }
          // 开始拉伸
          this.resizing = true;
          // 鼠标样式
          const cursorStr: string = this.modalContent.style.cursor;
          // 拉伸方向
          const direction: string = cursorStr.substring(
            0,
            cursorStr.indexOf("-")
          );

          if ("e" === direction) {
            // 横向拉伸，只改变宽度
            this.modalContent.style.width = `${event.clientX - modalX}px`;
          } else if ("s" === direction) {
            // 纵向拉伸，只改变高度
            this.modalContent.style.height = `${event.clientY - modalY}px`;
            this.modalOriginHeight = this.modalContent.style.height;
            // 纵向拉伸要同时处理模态框body的高度
            this.modalBody.style.setProperty(
              "height",
              `${event.clientY -
                modalY -
                this.headerHeight -
                this.footerHeight}px`,
              "important"
            );
            this.modalBodyOriginHeight = this.modalBody.style.height;
          } else if ("se" === direction) {
            // 右下角拉伸，同时改变宽高
            this.modalContent.style.width = `${event.clientX - modalX}px`;
            this.modalContent.style.height = `${event.clientY - modalY}px`;
            this.modalOriginHeight = this.modalContent.style.height;
            // 纵向拉伸要同时处理模态框body的高度
            this.modalBody.style.setProperty(
              "height",
              `${event.clientY -
                modalY -
                this.headerHeight -
                this.footerHeight}px`,
              "important"
            );
            this.modalBodyOriginHeight = this.modalBody.style.height;
          }
        };
        document.onmouseup = (event: MouseEvent) => {
          this.resizing = false;
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    };
  }
}
</script>
