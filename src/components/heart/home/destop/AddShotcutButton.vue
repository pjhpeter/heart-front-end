<template>
  <div class="add-shotcut-button" @click="showAddShotcutModal">
    <i class="iconfont icon-add-shotcut"></i>
  </div>
</template>

<script lang="ts">
/**
 * 添加桌面快捷方式按钮
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import Commons from "../../../../utils/heart/Commons";
import ModalInfo from "../../../../model/heart/global/ModalInfo";

@Component({
  name: "add-shotcut-button"
})
export default class AddShotcutButton extends Vue {
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
      // resizable: false,
      width: 400,
      className: "select-menu-modal",
      // enabledFuscreen: false,
      onOk(addShotcutModal: any) {
        if (addShotcutModal.selectedModalInfo) {
          // 添加快捷方式
          (this as any).$store.commit(
            "user/addDestopShotcut",
            addShotcutModal.selectedModalInfo
          );
        }
      }
    };
    this.addShotcutModalId = Commons.showModule(modalInfo);
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
    color: rgba($color: white, $alpha: 0.9);
    font-size: 60px;
  }
}

.select-menu-modal {
  .ivu-modal-body {
    height: 350px !important;
  }
}
</style>
