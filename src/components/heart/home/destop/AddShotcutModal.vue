<template>
  <div class="add-shotcut-modal">
    <Menu class="select-menu-tree" width="auto" @on-select="selecMenuItem">
      <menu-tree :menuTree="menuTree" />
    </Menu>
  </div>
</template>

<script lang="ts">
/**
 * 添加快捷方式的模态框组件
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import MenuInfo4Jeesite from "../../../../model/heart/menu/MenuInfo4Jeesite";
import Commons from "../../../../utils/heart/Commons";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import { Menu } from "view-design";

@Component({
  name: "add-shotcut-modal",
  components: {
    MenuTree: () => import("../menu/MenuTree.vue"),
    Menu
  }
})
export default class AddShotcutModal extends Vue {
  // 菜单树
  menuTree: Array<MenuInfo4Jeesite> | null = [];

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
