<template>
  <div class="home">
    <Layout>
      <!-- 桌面 -->
      <Content class="content" :style="backgroundStyles">
        <destop-icon-container />
      </Content>
      <!-- 底部栏 -->
      <transition name="slide-fade">
        <div v-show="$store.getters['globals/isShowedFooter']">
          <Footer class="footer">
            <Layout>
              <!-- 开始按钮 -->
              <Sider class="start-button-container" hide-trigger :width="45">
                <start-button @start-click.stop="showOrHideMenu" />
              </Sider>
              <!-- 已打开的模块图标容器 -->
              <Content>
                <tab-container />
              </Content>
              <!-- 右下角图标容器 -->
              <Sider class="icon-container" hide-trigger :width="250">
                <icon-group />
              </Sider>
            </Layout>
          </Footer>
          <!-- 毛玻璃底层 -->
          <Footer
            class="footer-background"
            :style="footerBackgroundStyles"
          ></Footer>
        </div>
      </transition>
    </Layout>
    <menu-container @menu-click="showModule" v-show="showedMenu" />
    <!-- 模态框组件占位标签 -->
    <component
      :is="BaseModal"
      v-for="openedInfo in $store.getters['globals/getOpenedList']"
      :key="openedInfo.id"
      :title="openedInfo.title"
      :url="openedInfo.url"
      :ref="openedInfo.id"
      :_id="openedInfo.id"
      :modalInfo="openedInfo.modalInfo"
    ></component>
  </div>
</template>

<script lang="ts">
/**
 * 桌面组件
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import { VueConstructor, VNode } from "vue";
import { CombinedVueInstance, CreateElement } from "vue/types/vue";
import ModalInfo from "../../../model/heart/global/ModalInfo";
import Commons from "../../../utils/heart/Commons";
import BaseModal from "../../../components/heart/commons/BaseModal.vue";
import OpenedInfo from "../../../model/heart/global/OpenedInfo";
import { Layout, Content, Sider, Footer } from "view-design";
import MenuInfo4Jeesite from "../../../model/heart/menu/MenuInfo4Jeesite";

// ts不识别require函数，必须要这样声明一下
declare function require(img: string): string;

@Component({
  components: {
    MenuContainer: () =>
      import("../../../components/heart/home/menu/MenuContainer.vue"),
    StartButton: () =>
      import("../../../components/heart/home/footer/StartButton.vue"),
    TabContainer: () =>
      import("../../../components/heart/home/footer/TabContainer.vue"),
    IconGroup: () =>
      import("../../../components/heart/home/footer/IconGroup.vue"),
    DestopIconContainer: () =>
      import("../../../components/heart/home/destop/DestopIconContainer.vue"),
    Layout,
    Content,
    Sider,
    Footer
  }
})
export default class Home extends Vue {
  BaseModal: any = BaseModal;
  // 开始菜单是否显示
  showedMenu = false;
  // 壁纸样式
  backgroundStyles: any = {
    background: `url(${this.$store.getters["user/getWallpaperUrl"]}) center / 100% 100% no-repeat`
  };
  // 底部栏背景样式，毛玻璃效果需要
  footerBackgroundStyles: any = {
    background: `url(${this.$store.getters["user/getWallpaperUrl"]}) center / 100% 100% no-repeat fixed`
  };

  created(): void {
    // 添加点击页面隐藏开始菜单事件
    document.addEventListener("click", this.hideMenu);
    // 不加监听器不能实时切换壁纸，要刷新组件才能更换
    this.$watch(
      () => this.$store.getters["user/getWallpaperUrl"],
      () => {
        Vue.set(this, "backgroundStyles", {});
        this.backgroundStyles.background = `url(${this.$store.getters["user/getWallpaperUrl"]}) left top / 100% 100% no-repeat`;
        this.footerBackgroundStyles.background = `url(${this.$store.getters["user/getWallpaperUrl"]}) center / 100% 100% no-repeat fixed`;
      }
    );
  }

  /**
   * 获取menu-container传回来的menuInfo，内容是menuUrl-menuName
   */
  showModule(menuInfo: string): void {
    // 隐藏开始菜单
    this.showOrHideMenu();
    // menuUrl-menuName-menuIcon
    const menuInfoArr: Array<string> = menuInfo.split("-");
    const menuInfo4Jeesite:
      | MenuInfo4Jeesite
      | undefined = Commons.findMenuByUrl(menuInfoArr[0]);
    // 打开一个模态框
    const modalInfo: ModalInfo = {
      url: menuInfoArr[0],
      title: menuInfoArr[1],
      backgroundColor: menuInfoArr[2],
      data: { permissions: menuInfo4Jeesite!.permissions }
    };
    Commons.showModule(modalInfo);
  }

  /**
   * 隐藏或显示开始菜单，给开始按钮用
   */
  showOrHideMenu(): void {
    this.showedMenu = !this.showedMenu;
  }

  /**
   * 隐藏开始菜单
   */
  hideMenu(): void {
    this.showedMenu = false;
  }
}
</script>

<style lang="scss">
$blur: 5px;

.home {
  height: 100%;
  overflow: hidden;
  .ivu-layout {
    height: 100%;
    .content {
      height: 100%;
    }
    .footer,
    .footer-background {
      position: fixed;
      display: inline-block;
      width: 100%;
      bottom: 0;
      height: $footerHeight;
      padding: 0 !important;
      background-color: rgba($color: #ffffff, $alpha: 0.6);
      box-sizing: content-box;
      z-index: 99999;
      // border-top: 1px solid rgba($color: $background, $alpha: 0.2);
      .ivu-layout {
        background-color: rgba($color: white, $alpha: 0);
        .start-button-container,
        .icon-container {
          background-color: rgba($color: white, $alpha: 0);
        }
      }
    }
    .footer-background {
      z-index: 99998;
      -webkit-filter: blur($blur);
      filter: blur($blur);
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
