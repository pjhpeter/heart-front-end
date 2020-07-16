<template>
  <div class="destop-icon-container">
    <div
      :id="`box-${index}`"
      class="icon-box"
      :style="{
        width: `${cellWidth}px`,
        height: `${cellHeight - 10}px`,
        marginBottom: '10px'
      }"
      v-for="index in cellTotalCount"
      :key="index"
      @dragover.stop.prevent
      @drop.prevent.stop="drop"
    >
      <!-- v-for和v-if不能在一起用，所以要这样写 -->
      <template
        v-for="(modalInfo, destopIconIndex) in $store.getters[
          'user/getDestopShotcutList'
        ]"
      >
        <destop-icon
          class="draggable-icon"
          :key="modalInfo.url"
          :modalInfo="modalInfo"
          :draggable="true"
          @dragstart.native="dragstart(modalInfo, $event)"
          v-if="
            modalInfo.parentBoxId
              ? modalInfo.parentBoxId === `box-${index}`
              : destopIconIndex + 1 === index
          "
        />
      </template>
    </div>
    <!-- <add-shotcut-button /> -->
  </div>
</template>

<script lang="ts">
/**
 * 桌面图标容器
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import ModalInfo from "../../../../model/heart/global/ModalInfo";

@Component({
  name: "destop-icon-container",
  components: {
    DestopIcon: () => import("./DestopIcon.vue"),
    AddShotcutButton: () => import("./AddShotcutButton.vue")
  }
})
export default class DestopIconContainer extends Vue {
  // 当前被拖放的图标元素
  private currentDragDom: any;
  // 当前拖放的图标对应的模态框信息对象
  private currentDragModalInfo!: ModalInfo;
  // 网格宽度
  private cellWidth = 80;
  // 网格高度
  private cellHeight = 110;
  // 网格总数
  private cellTotalCount = 0;
  // 桌面容器元素
  private destopIconConainerDom: any;

  mounted() {
    this.destopIconConainerDom = document.getElementsByClassName(
      "destop-icon-container"
    )[0];

    // 计算桌面网格数量
    this.buildGrid();
  }

  /**
   * 拖动开始触发的事件
   * @param modalInfo 模态框信息
   */
  dragstart(modalInfo: ModalInfo, event: DragEvent): void {
    this.currentDragDom = event.target;
    this.currentDragModalInfo = modalInfo;
    // 兼容火狐
    if (event && event.dataTransfer) {
      event.dataTransfer.setData("Text", modalInfo.title);
    }
  }

  // 拖动结束触发的事件
  drop(event: DragEvent): void {
    const targetDom: any = event.target;
    if (targetDom.className.indexOf("icon-box") > -1) {
      // 关联图标和网格
      this.currentDragModalInfo.parentBoxId = targetDom.id;
      // 保存图标位置到Vuex，Vuex的数据改变
      // destop-icon组件的v-if与parentBoxId绑定
      // 所以只需要改变modalInfo的parentBoxId值
      // 图标自动会移动到目标网格中，不需要操作dom
      this.$store.commit("user/updateDestopShotcut", this.currentDragModalInfo);
    }
  }

  /**
   * 计算桌面网格总数，创建网格
   */
  private buildGrid(): void {
    // 每行的网格数
    const cellCountPerRow: number = Math.floor(
      this.destopIconConainerDom.offsetWidth / this.cellWidth
    );
    // 行数
    const rowCount: number = Math.floor(
      this.destopIconConainerDom.offsetHeight / this.cellHeight
    );
    this.cellTotalCount = cellCountPerRow * rowCount;
  }
}
</script>

<style lang="scss" scoped>
.destop-icon-container {
  height: calc(100% - #{$footerHeight});
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  padding: 5px;
}
</style>
