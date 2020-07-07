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
  /**
   * 打开添加快捷方式的模态框
   */
  private showAddShotcutModal(): void {
    const modalInfo: ModalInfo = {
      url: "/heart/home/destop/AddShotcutModal.vue",
      title: "选择模块",
      backgroundColor: Commons.getIconColor()
    };
    // Commons.showModule(modalInfo);
    this.$store.commit("user/addDestopShotcut", modalInfo);
  }
}
</script>

<style lang="scss" scoped>
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
</style>
