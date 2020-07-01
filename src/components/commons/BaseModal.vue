<template>
  <div>
    <Modal
      v-model="isShow"
      :title="title"
      draggable
      :width="900"
      footer-hide
      class-name="base-modal"
      @on-visible-change="destroy"
    >
      <component-loader :menuUrl="menuUrl" />
    </Modal>
  </div>
</template>

<script lang="ts">
/**
 * 基础对话框，用于展示开始菜单的模块
 * @author 彭嘉辉
 */
import { Vue, Component, Prop } from "vue-property-decorator";
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
    required: true,
    default: ""
  })
  menuUrl!: string;
  isShow = true;

  private destroy(): void {
    this.$destroy();
  }
}
</script>
