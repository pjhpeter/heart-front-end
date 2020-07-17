<template>
  <div class="destop-icon-container">
    <Dropdown
      trigger="contextMenu"
      v-for="index in cellTotalCount"
      :key="index"
      @on-click="menuItemClick"
    >
      <div
        :id="`box-${index}`"
        class="icon-box"
        :style="{
          width: `${cellWidth}px`,
          height: `${cellHeight - 10}px`,
          marginBottom: '10px'
        }"
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
      <DropdownMenu slot="list">
        <DropdownItem :name="`addDestopShotcut_box-${index}`"
          >添加快捷方式</DropdownItem
        >
        <DropdownItem :name="`addGroup_box-${index}`">新建功能组</DropdownItem>
        <DropdownItem :name="`fullscreen_box-${index}`">全屏</DropdownItem>
        <DropdownItem :name="`quit-fullscreen_box-${index}`"
          >取消全屏</DropdownItem
        >
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script lang="ts">
/**
 * 桌面图标容器
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import { Dropdown, DropdownMenu, DropdownItem } from "view-design";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import Commons from "../../../../utils/heart/Commons";

@Component({
  name: "destop-icon-container",
  components: {
    DestopIcon: () => import("./DestopIcon.vue"),
    Dropdown,
    DropdownMenu,
    DropdownItem
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
  // 添加快捷方式模态框id
  private addShotcutModalId?: number;

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
  private dragstart(modalInfo: ModalInfo, event: DragEvent): void {
    this.currentDragDom = event.target;
    this.currentDragModalInfo = modalInfo;
    // 兼容火狐
    if (event && event.dataTransfer) {
      event.dataTransfer.setData("Text", modalInfo.title);
    }
  }

  // 拖动结束触发的事件
  private drop(event: DragEvent): void {
    const targetDom: any = event.target;
    if (targetDom.className.indexOf("icon-box") > -1) {
      // 关联图标和网格
      Vue.set(this.currentDragModalInfo, "parentBoxId", targetDom.id);
      // this.currentDragModalInfo.parentBoxId = targetDom.id;
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

  /**
   * 桌面右击菜单项点击事件
   * @param name 菜单项name属性值
   */
  private menuItemClick(name: string): void {
    const nameArr: Array<string> = name.split("_");
    // 操作类型
    const operation: string = nameArr[0];
    // 网格id
    const parentBoxId: string = nameArr[1];

    if (operation === "addDestopShotcut") {
      // 添加快捷方式
      this.showAddShotcutModal(parentBoxId);
    } else if (operation === "addGroup") {
      // 新建功能组
    } else if (operation === "fullscreen") {
      // 全屏
    } else if (operation === "quit-fullscreen") {
      // 退出全屏
    }
  }

  /**
   * 打开添加快捷方式的模态框
   * @param parentBoxId 网格id
   */
  private showAddShotcutModal(parentBoxId: string): void {
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
      onOk(addShotcutModal: any) {
        if (addShotcutModal.selectedModalInfo) {
          // 将模态框信息与对应网格信息关联
          addShotcutModal.selectedModalInfo.parentBoxId = parentBoxId;
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
.destop-icon-container {
  display: flex;
  height: calc(100vh - #{$footerHeight});
  flex-flow: column wrap;
  align-content: flex-start;
  padding: 5px;
}

.select-menu-modal {
  .ivu-modal-body {
    height: 350px !important;
  }
}
</style>
