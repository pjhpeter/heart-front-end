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
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import { LOSS_MENU_COLOR } from "../../../../constants/heart/values/Global";

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
    this.$nextTick(() => {
      // 更新桌面快捷方式图标颜色，模块发生变化时，缓存和实际可能会不一样
      const modalInfoList: Array<ModalInfo> = this.$store.getters[
        "user/getDestopShotcutInfo"
      ];
      modalInfoList.forEach((modalInfo: ModalInfo) => {
        // 寻找对应的菜单对象
        const menu: Menu | undefined = Commons.findMenuByUrl(modalInfo.url);
        if (menu) {
          if (menu.menuColor !== modalInfo.backgroundColor) {
            // 快捷方式和菜单颜色不一致时，将实际的菜单颜色赋值给快捷方式
            Vue.set(modalInfo, "backgroundColor", menu.menuColor);
          }
        } else {
          // 菜单中找不到该模块，说明已经不存在了，将颜色编程暗颜色
          Vue.set(modalInfo, "backgroundColor", LOSS_MENU_COLOR);
        }
      });
    });
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
