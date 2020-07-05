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
import MenuAPI from "../../../api/menu/MenuAPI";
import MenuAPI4Jeesite from "../../../api/menu/impl/MenuAPI4Jeesite";
import Menu from "../../../model/menu/Menu";

@Component({
  name: "menu-container",
  components: {
    MenuTree: () => import("./MenuTree.vue")
  }
})
export default class MenuContainer extends Vue {
  menuTree: Array<Menu> | null = [];

  async mounted() {
    // 这样写方便后面的代码读取this的属性，避免类型检查报错
    const $vm = this as any;
    // 先从状态数据读取菜单树
    let menuTree: Array<Menu> | null = $vm.$store.getters["menu/getMenuTree"];
    if (!menuTree) {
      // 如果状态数据中没有则向后端发请求获取
      const menuAPI: MenuAPI<Menu> = new MenuAPI4Jeesite();
      menuTree = await menuAPI.fetchMenuTree();
    }
    $vm.menuTree = menuTree;
  }

  /**
   * 触发父组件的menuClick事件，将menuInfo传给父组件
   */
  @Emit("menu-click")
  onMenuClick(menuInfo: string) {
    // menuUrl-menuName-menuIcon
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
