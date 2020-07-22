<template>
  <transition name="slide-fade">
    <div class="start-box" @click.stop="disabledClick">
      <div class="menu-container">
        <Menu @on-select="onMenuClick" class="menu-box" width="auto">
          <menu-tree :menuTree="menuTree" />
        </Menu>
        <div class="user-info">
          <user-operation />
        </div>
      </div>
      <div
        class="menu-container-background"
        :style="menuContainerBackgroundStyles"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
/**
 * 菜单树容器
 * @author 彭嘉辉
 */
import { Vue, Component, Emit } from "vue-property-decorator";
import MenuInfo4Jeesite from "../../../../model/heart/menu/MenuInfo4Jeesite";
import MenuAPI4Jeesite from "../../../../api/heart/menu/impl/MenuAPI4Jeesite";
import MenuAPI from "../../../../api/heart/menu/MenuAPI";
import Commons from "../../../../utils/heart/Commons";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import { LOSS_MENU_COLOR } from "../../../../constants/heart/values/Global";
import { Menu } from "view-design";
import { ModalInfoType } from "../../../../constants/heart/enum/ModalInfoType";

@Component({
  name: "menu-container",
  components: {
    MenuTree: () => import("./MenuTree.vue"),
    UserOperation: () => import("./UserOperation.vue"),
    Menu
  }
})
export default class MenuContainer extends Vue {
  menuTree: Readonly<Array<MenuInfo4Jeesite>> | null = [];

  // 开始菜单背景样式，毛玻璃效果需要
  menuContainerBackgroundStyles: any = {
    background: `url(${this.$store.getters["user/getWallpaperUrl"]}) center / 100% 100% no-repeat fixed`,
    backgroundSize: "100% 100%"
  };
  async mounted() {
    // 不加监听器不能实时切换壁纸，要刷新组件才能更换
    this.$watch(
      () => this.$store.getters["user/getWallpaperUrl"],
      () => {
        Vue.set(this, "menuContainerBackgroundStyles", {});
        this.menuContainerBackgroundStyles.background = `url(${this.$store.getters["user/getWallpaperUrl"]}) center / 100% 100% no-repeat fixed`;
      }
    );
    // 先从状态数据读取菜单树
    this.menuTree = await Commons.loadMenuTreeData();
    // 必须确保菜单树渲染结束
    this.$nextTick(() => {
      setTimeout(() => {
        // 更新桌面快捷方式图标颜色
        this.updateDestopShotcutIcon();
      }, 300);
    });
  }

  /**
   * 更新桌面快捷方式图标颜色图标，模块发生变化时，缓存和实际可能会不一样
   */
  updateDestopShotcutIcon(): void {
    const modalInfoList: Array<ModalInfo> = this.$store.getters[
      "user/getDestopShotcutList"
    ];
    let flag = false;
    modalInfoList.forEach((modalInfo: ModalInfo) => {
      // 功能组不需要调整颜色
      if (modalInfo.type === ModalInfoType.GROUP) return;
      // 寻找对应的菜单对象
      const menu: MenuInfo4Jeesite | undefined = Commons.findMenuByUrl(
        modalInfo.url
      );
      if (menu) {
        if (menu.menuColor !== modalInfo.backgroundColor) {
          // 快捷方式和菜单颜色不一致时，将实际的菜单颜色赋值给快捷方式
          Vue.set(modalInfo, "backgroundColor", menu.menuColor);
          // 标记数据被更改过
          flag = true;
        }
      } else {
        // 菜单中找不到该模块，说明已经不存在了，将颜色编程暗颜色
        Vue.set(modalInfo, "backgroundColor", LOSS_MENU_COLOR);
      }
    });

    if (flag) {
      // 如果数据被更改过，保存到localStorage，以免每次都要更新颜色
      this.$store.commit("user/setDestopInfoList");
    }
  }

  // 禁用document点击事件，以免点击这里也关闭开始菜单
  disabledClick() {
    // 什么都不做
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
