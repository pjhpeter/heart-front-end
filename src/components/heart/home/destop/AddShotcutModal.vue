<template>
  <div class="add-shotcut-modal">
    <Menu width="auto" @on-select="selecMenuItem">
      <menu-tree :menuTree="menuTree" className="select-menu-tree" />
    </Menu>
  </div>
</template>

<script lang="ts">
/**
 * 添加快捷方式的模态框组件
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import Menu from "../../../../model/heart/menu/Menu";
import Commons from "../../../../utils/heart/Commons";
import ModalInfo from "../../../../model/heart/global/ModalInfo";

@Component({
  name: "add-shotcut-modal",
  components: {
    MenuTree: () => import("../menu/MenuTree.vue")
  }
})
export default class AddShotcutModal extends Vue {
  // 菜单树
  menuTree: Array<Menu> | null = [];

  // 选中的菜单项对应信息
  selectedModalInfo: ModalInfo | undefined;

  async mounted() {
    this.menuTree = await Commons.loadMenuTreeData();
  }

  /**
   * 选中菜单项
   * @param menuInfo Menu组件传过来name属性字符串，里面有menuUrl-menuName-menuColor，自己拼接的^_^
   */
  selecMenuItem(menuInfo: string) {
    // menuInfo = "menuUrl-menuName-menuColor"
    const menuInfoArr: Array<string> = menuInfo.split("-");
    this.selectedModalInfo = {
      url: menuInfoArr[0],
      title: menuInfoArr[1],
      backgroundColor: menuInfoArr[2]
    };
  }
}
</script>

<style lang="scss">
.select-menu-tree {
  background-color: $background;
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: $primary !important;
    background: rgba($color: $darkPrimary, $alpha: 0.1) !important;
    &::after {
      background: $darkPrimary !important;
    }
  }
  .ivu-menu-item,
  .ivu-menu-submenu-title {
    color: $title;
    &:hover {
      background-color: rgba($color: $lightPrimary, $alpha: 0.3);
      color: $title;
    }
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: white;
      font-weight: 700;
      font-size: 18px;
      border-radius: 5px;
      margin-right: 10px;
    }
  }
}
</style>
