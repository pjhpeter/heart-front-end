<template>
  <transition name="fade">
    <Dropdown
      class="destop-icon-dropdown-menu"
      trigger="contextMenu"
      transfer
      @on-click="handleItemClick"
      @contextmenu.native.stop
    >
      <div
        class="destop-icon"
        @dblclick="showModal"
        :title="
          modalInfo.backgroundColor === lossMenuColor
            ? '快捷方式对应的菜单已经不存在，请删除'
            : ''
        "
      >
        <div class="icon-content">
          <div
            class="icon"
            v-text="modalInfo.title.substring(0, 1)"
            :style="{
              backgroundColor: modalInfo.backgroundColor,
              opacity: modalInfo.backgroundColor === lossMenuColor ? 0.5 : 1
            }"
          ></div>
          <p
            class="title"
            v-text="modalInfo.title"
            :title="modalInfo.title"
          ></p>
        </div>
      </div>
      <DropdownMenu slot="list">
        <DropdownItem name="open">打开</DropdownItem>
        <DropdownItem name="remove" class="delete-icon">删除</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </transition>
</template>

<script lang="ts">
/**
 * 桌面快捷方式模块图标组件
 * @author 彭嘉辉
 */
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import Commons from "../../../../utils/heart/Commons";
import { LOSS_MENU_COLOR } from "../../../../constants/heart/values/Global";
import { Dropdown, DropdownMenu, DropdownItem } from "view-design";

@Component({
  name: "destop-icon",
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem
  }
})
export default class DestopIcon extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  modalInfo!: ModalInfo;

  @Prop({
    type: Boolean,
    default: false
  })
  isInGroup!: boolean;

  lossMenuColor: string = LOSS_MENU_COLOR;

  /**
   * 快捷方式右击菜单点击事件
   * @param 菜单的name属性值
   */
  private handleItemClick(name: string): void {
    if (name === "open") {
      this.showModal();
    } else if (name === "remove") {
      if (this.isInGroup) {
        // 在工作组模态框点的右键
        this.onRemove();
      } else {
        // 在桌面点的右键
        this.$store.commit("user/removeDestopShotcut", this.modalInfo);
      }
    }
  }

  /**
   * 打开对应的模态框
   */
  private showModal() {
    Commons.showModule(this.modalInfo);
  }

  /**
   * 触发功能组模态框的删除快捷方式事件
   */
  @Emit("on-remove")
  private onRemove() {
    return this.modalInfo;
  }
}
</script>

<style lang="scss" scoped>
.destop-icon-dropdown-menu {
  // 下拉菜单容器不给宽度的话，IE11中下拉菜单会出现在屏幕中间
  width: 80px;
  .destop-icon {
    // display: flex;
    width: 80px;
    height: 100px;
    cursor: pointer;
    color: white;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 5px;
    // IE11不支持flex+margin:auto的垂直居中方式，所以选择了padding的方式比较保险，虽然low了些
    padding: 15px 0;
    &:hover {
      background-color: rgba($color: white, $alpha: 0.3);
    }
    .icon-content {
      // margin: auto;
      width: 100%;
      .icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        line-height: 40px;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 5px;
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 0.1em 0.1em 0.2em black;
      }
    }
  }
}
.delete-icon {
  color: $error;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
