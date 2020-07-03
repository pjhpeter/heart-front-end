<template>
  <div>
    <Modal
      v-model="isShow"
      :title="title"
      :draggable="isDraggable"
      :width="1000"
      footer-hide
      :fullscreen="isFullscreen"
      :closable="false"
      class-name="base-modal"
    >
      <template slot="header">
        <div>
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

@Component({
  components: {
    ComponentLoader
  }
})
export default class BaseModal extends Vue {
  @Prop({
    type: String,
    required: true,
    default: ""
  })
  title!: string;
  @Prop({
    type: String,
    default: ""
  })
  menuUrl!: string;
  @Prop()
  onClose?: Function;
  isShow = true;
  isDraggable = true;
  isFullscreen = false;

  private hide(): void {
    this.isShow = false;
    this.showFooter();
  }

  private fullscreen(): void {
    this.isDraggable = false;
    this.isFullscreen = true;
    this.hideFooter();
  }

  private resetScreen(): void {
    this.isDraggable = true;
    this.isFullscreen = false;
    this.showFooter();
  }

  private close(): void {
    this.isShow = false;
    this.showFooter();
    if (this.onClose) {
      this.onClose.call(this, this);
    }
    this.$destroy();
  }

  @Emit("show-footer")
  private showFooter(): void {}

  @Emit("hide-footer")
  private hideFooter(): void {}
}
</script>
