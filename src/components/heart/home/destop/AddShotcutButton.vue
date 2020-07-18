<template>
  <div class="add-shotcut-button" @click.stop="showAddShotcutModal">
    <i class="iconfont icon-add-shotcut"></i>
  </div>
</template>

<script lang="ts">
/**
 * 添加桌面快捷方式按钮
 * @author 彭嘉辉
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import Commons from "../../../../utils/heart/Commons";
import ModalInfo from "../../../../model/heart/global/ModalInfo";

@Component({
  name: "add-shotcut-button"
})
export default class AddShotcutButton extends Vue {
  // 功能组id
  @Prop({
    type: Object,
    required: true
  })
  groupModalInfo!: ModalInfo;
  private addShotcutModalId?: number;

  /**
   * 打开添加快捷方式的模态框
   */
  private showAddShotcutModal(): void {
    if (this.addShotcutModalId) {
      // 如果原来已经打开了添加快捷方式的模态框，则不重复创建，直接显示
      const modal: any = Commons.findModalById(this.addShotcutModalId);
      if (modal) {
        modal.isShow = true;
        // 模拟点击模态框中ViewUI的Modal组件
        modal.$children[0].handleClickModal();
        return;
      }
    }
    const modalInfo: ModalInfo = {
      url: "/heart/home/destop/AddShotcutModal.vue",
      title: "添加快捷方式",
      backgroundColor: Commons.getIconColor(),
      footerHide: false,
      resizable: false,
      width: 400,
      className: "select-menu-modal",
      enabledFuscreen: false,
      onOk: this.onOk
    };
    this.addShotcutModalId = Commons.showModule(modalInfo);
  }

  /**
   * 点击确定按钮事件
   * @param addShotcutModal 选中的模块信息
   */
  onOk(addShotcutModal: any): void {
    if (addShotcutModal.selectedModalInfo) {
      // 添加快捷方式当功能组
      this.groupModalInfo!.children!.push(addShotcutModal.selectedModalInfo);
      // 添加快捷方式
      this.$store.commit("user/addDestopShotcut", this.groupModalInfo);
    }
  }
}
</script>

<style lang="scss">
.add-shotcut-button {
  border-radius: 5px;
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  margin: 10px;
  cursor: pointer;
  .icon-add-shotcut {
    color: rgba($color: $info, $alpha: 0.6);
    font-size: 60px;
  }
}

.select-menu-modal {
  .ivu-modal-body {
    height: 350px !important;
  }
}
</style>
