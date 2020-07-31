<template>
  <div class="destop-icon-container">
    <Dropdown
      trigger="custom"
      :visible="false"
      v-for="index in cellTotalCount"
      :ref="`dropdown-${index}`"
      :key="index"
      @on-click="menuItemClick"
      @contextmenu.native="showDropdownMenu(`dropdown-${index}`)"
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
        @drop.stop.prevent="drop"
      >
        <!-- v-for和v-if不能在一起用，所以要这样写 -->
        <template
          v-for="modalInfo in $store.getters['user/getDestopShotcutList']"
        >
          <destop-icon
            :key="modalInfo.url"
            :modalInfo="modalInfo"
            :draggable="true"
            @dragstart.native="dragstart(modalInfo, $event)"
            v-if="
              modalInfo.type === moduleType &&
                modalInfo.parentBoxId === `box-${index}`
            "
          />
          <group-icon
            :key="modalInfo.groupId"
            :modalInfo="modalInfo"
            @dragstart.native="dragstart(modalInfo, $event)"
            @dragover.stop.prevent
            :draggable="true"
            v-if="
              modalInfo.type === groupType &&
                modalInfo.parentBoxId === `box-${index}`
            "
          />
        </template>
      </div>
      <DropdownMenu slot="list">
        <DropdownItem :name="`addDestopShotcut_box-${index}`"
          >添加快捷方式</DropdownItem
        >
        <DropdownItem :name="`addGroup_box-${index}`">新建功能组</DropdownItem>
        <DropdownItem
          :name="`fullscreen_box-${index}`"
          v-if="!$store.getters['globals/isFullscreen']"
          >全屏</DropdownItem
        >
        <DropdownItem
          :name="`fullscreen_box-${index}`"
          v-if="$store.getters['globals/isFullscreen']"
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
import { ModalInfoType } from "../../../../constants/heart/enum/ModalInfoType";

@Component({
  name: "destop-icon-container",
  components: {
    DestopIcon: () => import("./DestopIcon.vue"),
    GroupIcon: () => import("./GroupIcon.vue"),
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
  // 模块图标类型
  private moduleType: ModalInfoType = ModalInfoType.MODULE;
  // 功能组图标类型
  private groupType: ModalInfoType = ModalInfoType.GROUP;

  mounted() {
    this.destopIconConainerDom = document.querySelector(
      ".destop-icon-container"
    );

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

    // 功能组暂时不支持嵌套，也不想做嵌套，像手机操作系统那样只有一层就挺好的
    if (this.currentDragModalInfo.type === ModalInfoType.GROUP) return;

    const groupDom: any = this.getGroupDom(targetDom);
    if (!groupDom) return;
    // 拖放到了功能组中
    const groupModalInfo:
      | ModalInfo
      | undefined = Commons.findGroupInfoByGroupId(parseInt(groupDom.id));
    if (groupModalInfo) {
      // 与网格切断联系
      this.currentDragModalInfo.parentBoxId = "";
      // 将模块图标放入功能组中
      groupModalInfo.children!.push(this.currentDragModalInfo);
      this.$store.commit("user/updateDestopShotcut", groupModalInfo);
      // 删除模块的快捷方式
      this.$store.commit("user/removeDestopShotcut", this.currentDragModalInfo);
    }
  }

  /**
   * 获取功能组的dom对象
   * @returns 功能组的dom对象
   */
  private getGroupDom(dom: any): any {
    if (dom.className.indexOf("group-icon") > -1) {
      return dom;
    }
    if (dom.tagName === "BODY") {
      return;
    }
    return this.getGroupDom(dom.parentNode);
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
   * 显示下拉菜单
   * @param refString 下拉菜单标识
   */
  private showDropdownMenu(refString: string): void {
    Object.keys(this.$refs).forEach((key: string) => {
      // 隐藏其他菜单
      if (key !== refString) (this.$refs as any)[key][0].currentVisible = false;
      // 显示当前菜单
      else (this.$refs as any)[key][0].currentVisible = true;
    });
    // 绑定点击其他地方隐藏菜单事件
    document.onmousedown = () => {
      (this.$refs as any)[refString][0].currentVisible = false;
    };
    document.onmouseup = () => {
      document.onmousedown = null;
      document.onmouseup = null;
    };
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
      this.addGroup(parentBoxId);
    } else if (operation === "fullscreen") {
      // 全屏或取消全屏
      Commons.fullscreen();
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
        const selectedModalInfo: ModalInfo = addShotcutModal.selectedModalInfo;
        if (selectedModalInfo) {
          // 将模态框信息与对应网格信息关联
          selectedModalInfo.parentBoxId = parentBoxId;
          // 添加的快捷方式一定是模块图标
          selectedModalInfo.type = ModalInfoType.MODULE;
          // 添加快捷方式
          (this as any).$store.commit(
            "user/addDestopShotcut",
            selectedModalInfo
          );
        }
      }
    };
    this.addShotcutModalId = Commons.showModule(modalInfo);
  }

  /**
   * 新建功能组
   * @param parentBoxId 网格id
   */
  private addGroup(parentBoxId: string): void {
    const id: number = Commons.createId();
    const groupModalInfo: ModalInfo = {
      url: id + "",
      backgroundColor: "",
      title: "功能组",
      groupId: id,
      parentBoxId,
      type: ModalInfoType.GROUP,
      children: []
    };
    // 添加快捷方式
    this.$store.commit("user/addDestopShotcut", groupModalInfo);
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
