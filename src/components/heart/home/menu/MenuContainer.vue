<template>
  <transition name="slide-fade">
    <div class="menu-container">
      <Menu @on-select="onMenuClick">
        <menu-tree :menuTree="menuTree" />
      </Menu>
    </div>
  </transition>
</template>

<script lang="ts">
/**
 * 菜单树容器
 * @author 彭嘉辉
 */
import { Vue, Component, Emit } from "vue-property-decorator";
import Menu from "../../../../model/heart/menu/Menu";
import MenuAPI4Jeesite from "../../../../api/heart/menu/impl/MenuAPI4Jeesite";
import MenuAPI from "../../../../api/heart/menu/MenuAPI";
import Commons from "../../../../utils/heart/Commons";

@Component({
  name: "menu-container",
  components: {
    MenuTree: () => import("./MenuTree.vue")
  }
})
export default class MenuContainer extends Vue {
  menuTree: Array<Menu> | null = [];

  async mounted() {
    // 先从状态数据读取菜单树
    this.menuTree = await Commons.loadMenuTreeData();
  }

  /**
   * 触发父组件的menuClick事件，将menuInfo传给父组件
   */
  @Emit("menu-click")
  onMenuClick(menuInfo: string) {
    // menuUrl-menuName-menuColor
    return menuInfo;
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  position: fixed;
  left: 0;
  bottom: $footerHeight;
  z-index: 99997;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
