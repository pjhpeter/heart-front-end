<template>
  <transition name="fade">
    <Dropdown
      trigger="contextMenu"
      class="destop-icon-dropdown-menu"
      transfer
      @on-click="handleItemClick"
      @contextmenu.native.stop
    >
      <div
        class="group-icon"
        :id="modalInfo.groupId"
        @dblclick="showGroupModal"
      >
        <div class="group-content">
          <div class="icon">
            <template v-for="(child, index) in modalInfo.children">
              <div
                class="child-icon"
                :key="child.url"
                v-text="child.title.substring(0, 1)"
                v-if="index < 4"
                :style="{ backgroundColor: child.backgroundColor }"
              ></div>
            </template>
          </div>
          <p
            class="title"
            v-text="modalInfo.title"
            :title="modalInfo.title"
            v-if="!activeRename"
          ></p>
          <Input
            class="rename-input"
            v-model="modalInfo.title"
            v-if="activeRename"
            @keypress.native.enter="handleRename"
            autofocus
            @click.native.stop
          />
        </div>
      </div>
      <DropdownMenu slot="list">
        <DropdownItem name="open">打开</DropdownItem>
        <DropdownItem name="rename" @click.native.stop>重命名</DropdownItem>
        <DropdownItem name="remove" class="delete-icon">删除</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </transition>
</template>

<script lang="ts">
/**
 * 桌面快捷方式功能组图标组件
 * @author 彭嘉辉
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import { Dropdown, DropdownMenu, DropdownItem, Input } from "view-design";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import Commons from "../../../../utils/heart/Commons";

@Component({
  name: "group-icon",
  components: {
    DestopIcon: () => import("./DestopIcon.vue"),
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input
  }
})
export default class GroupIcon extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  modalInfo!: ModalInfo;

  // 是否正在重命名
  private activeRename = false;

  /**
   * 快捷方式右击菜单点击事件
   * @param 菜单的name属性值
   */
  private handleItemClick(name: string): void {
    if (name === "open") {
      //   this.showModal();
    } else if (name === "rename") {
      // 重命名
      this.handleRename();
    } else if (name === "remove") {
      // 删除快捷方式
      this.$store.commit("user/removeDestopShotcut", this.modalInfo);
    }
  }

  /**
   * 切换重命名状态
   */
  private handleRename(): void {
    this.activeRename = !this.activeRename;
    if (this.activeRename) {
      document.addEventListener("click", this.handleRename);
    } else if (!this.activeRename) {
      document.removeEventListener("click", this.handleRename);
      // 重命名结束，保存信息
      this.$store.commit("user/updateDestopShotcut", this.modalInfo);
    }
  }

  private showGroupModal(): void {
    const modalInfo: ModalInfo = {
      url: "/heart/home/destop/GroupModal.vue",
      backgroundColor: Commons.getIconColor(),
      title: this.modalInfo.title,
      groupId: this.modalInfo.groupId,
      data: this.modalInfo,
      width: 400,
      className: "group-modal-set-height"
    };
    Commons.showModule(modalInfo);
  }
}
</script>

<style lang="scss">
.destop-icon-dropdown-menu {
  // 下拉菜单容器不给宽度的话，IE11中下拉菜单会出现在屏幕中间
  width: 80px;
  .group-icon {
    width: 80px;
    height: 100px;
    cursor: pointer;
    color: white;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 5px;
    // IE11不支持flex+margin:auto的垂直居中方式，所以选择了padding的方式比较保险，虽然low了些
    padding: 10px 0;
    &:hover {
      background-color: rgba($color: white, $alpha: 0.3);
    }
    .group-content {
      width: 100%;
      .icon {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-flow: row wrap;
        background-color: rgba($color: white, $alpha: 0.3);
        border: 1px solid rgba($color: white, $alpha: 0.5);
        width: 50px;
        height: 50px;
        text-align: center;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 1px;
        .child-icon {
          width: 20px;
          height: 20px;
          flex: 0 0 45%;
          display: inline-block;
          border-radius: 2px;
          margin: 1px;
          line-height: 20px;
          font-size: 12px;
        }
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 0.1em 0.1em 0.2em black;
      }
      .rename-input {
        width: 90%;
        .ivu-input {
          height: 22px;
        }
      }
    }
  }
}

.delete-icon {
  color: $error;
}

.group-modal-set-height {
  .ivu-modal-body {
    height: 350px !important;
  }
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
