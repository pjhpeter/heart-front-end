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
import MenuInfo from "../../../../model/heart/menu/MenuInfo";
import MenuAPI4Jeesite from "../../../../api/heart/menu/impl/MenuAPI4Jeesite";
import MenuAPI from "../../../../api/heart/menu/MenuAPI";
import Commons from "../../../../utils/heart/Commons";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import { LOSS_MENU_COLOR } from "../../../../constants/heart/values/Global";
import { Menu } from "view-design";

@Component({
  name: "menu-container",
  components: {
    MenuTree: () => import("./MenuTree.vue"),
    UserOperation: () => import("./UserOperation.vue"),
    Menu
  }
})
export default class MenuContainer extends Vue {
  menuTree: Array<MenuInfo> | null = [];

  // 开始菜单背景样式，毛玻璃效果需要
  menuContainerBackgroundStyles: object = {
    background: `url(${this.$store.getters["user/getWallpaperUrl"]}) center / cover no-repeat fixed`,
    backgroundSize: "100% 100%"
  };
  async mounted() {
    // 先从状态数据读取菜单树
    this.menuTree = await Commons.loadMenuTreeData();
    this.$nextTick(() => {
      // 更新桌面快捷方式图标颜色
      this.updateDestopShotcutIcon();
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
      // 寻找对应的菜单对象
      const menu: MenuInfo | undefined = Commons.findMenuByUrl(modalInfo.url);
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

<style lang="scss">
.start-box {
  position: fixed;
  left: 0;
  bottom: $footerHeight;
  z-index: 99997;
  border-radius: 5px;
  box-shadow: 0 0 5px black;
  .menu-container {
    padding-top: 5px;
    border-radius: 5px;
    display: flex;
    height: 500px;
    width: 550px;
    z-index: 1;
    background-color: rgba($color: white, $alpha: 0.8);
    .menu-box {
      flex: 60%;
      overflow: auto;
      background-color: rgba($color: white, $alpha: 0);
      margin-right: 5px;
      &::-webkit-scrollbar {
        opacity: 0;
      }
      &:hover {
        &::-webkit-scrollbar {
          opacity: 1;
        }
      }
      &::after {
        width: 0;
      }
    }
    .user-info {
      flex: 40%;
      box-sizing: content-box;
    }
  }
  .menu-container-background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    -webkit-filter: blur(10px);
    filter: blur(10px);
  }
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
