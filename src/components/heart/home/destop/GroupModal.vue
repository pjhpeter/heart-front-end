<template>
  <div class="group-modal">
    <destop-icon
      v-for="child in children"
      :key="child.url"
      :modalInfo="child"
      class="child-icon"
      :isInGroup="true"
      @on-remove="removeItem"
    />
    <add-shotcut-button :groupModalInfo="groupModalInfo" />
  </div>
</template>

<script lang="ts">
/**
 * 功能组模态框
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import ModalInfo from "../../../../model/heart/global/ModalInfo";

@Component({
  name: "group-modal",
  components: {
    DestopIcon: () => import("./DestopIcon.vue"),
    AddShotcutButton: () => import("./AddShotcutButton.vue")
  }
})
export default class GroupModal extends Vue {
  // 功能组模态框信息
  groupModalInfo!: ModalInfo;
  // 功能组中的模块列表
  children: Array<ModalInfo> = [];

  created(): void {
    this.groupModalInfo = (this.$parent as any).data as ModalInfo;
    this.children = this.groupModalInfo.children!;
  }

  /**
   * 删除功能组中的快捷方式
   */
  removeItem(modalInfo: ModalInfo): void {
    this.children.some((modal: ModalInfo, index: number) => {
      if (modal.url === modalInfo.url) {
        this.children.splice(index, 1);
        return true;
      }
      return false;
    });
  }
}
</script>

<style lang="scss">
.group-modal {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
  .child-icon {
    .destop-icon {
      &:hover {
        background-color: rgba($color: $info, $alpha: 0.3);
      }
    }
  }
}
</style>
