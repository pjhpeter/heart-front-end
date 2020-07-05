<template>
  <div class="home">
    <Layout>
      <!-- 桌面 -->
      <Content class="content" :style="backgroundStyles"></Content>
      <!-- 底部栏 -->
      <div v-show="$store.getters['globals/isShowedFooter']">
        <Footer class="footer">
          <Layout>
            <!-- 开始按钮 -->
            <Sider class="start-button-container" hide-trigger :width="45">
              <start-button @start-click="showOrHideMenu" />
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
    </Layout>
    <menu-container @menu-click="showModule" v-show="showedMenu" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { VueConstructor, VNode } from "vue";
import { Md5 } from "md5-typescript";
import ComponentInfo from "../../model/menu/ComponentInfo";
import { CombinedVueInstance, CreateElement } from "vue/types/vue";
import OpenedInfo from "../../model/global/OpenedInfo";
import Commons from "../../utils/Commons";
import ModalInfo from "../../model/global/ModalInfo";

// ts不识别require函数，必须要这样声明一下
declare function require(img: string): string;

@Component({
  components: {
    MenuContainer: () => import("@/components/home/menu/MenuContainer.vue"),
    StartButton: () => import("@/components/home/footer/StartButton.vue"),
    TabContainer: () => import("../../components/home/footer/TabContainer.vue"),
    IconGroup: () => import("../../components/home/footer/IconGroup.vue")
  }
})
export default class Home extends Vue {
  // 开始菜单是否显示
  showedMenu = false;
  // 壁纸url
  // 不在style标签中设置路径的话，必须用require函数来加载图片，否则会找不到
  // TODO:这里以后可以读后端返回的路径
  wallpaperUrl: string = require("../../assets/home/images/background.jpg");
  // 壁纸样式
  backgroundStyles: object = {
    background: `url(${this.wallpaperUrl}) center / cover no-repeat`,
    backgroundSize: "100% 100%"
  };
  // 底部栏背景样式，毛玻璃效果需要
  footerBackgroundStyles: object = {
    background: `url(${this.wallpaperUrl}) center / cover no-repeat fixed`,
    backgroundSize: "100% 100%"
  };

  /**
   * 获取menu-container传回来的menuInfo，内容是menuUrl-menuName
   */
  showModule(menuInfo: string): void {
    const $vm = this as any;
    // 隐藏开始菜单
    $vm.showOrHideMenu();
    // menuUrl-menuName-menuIcon
    const menuInfoArr: Array<string> = menuInfo.split("-");
    // 手动实例化模态框实例
    const modalInfo: ModalInfo = {
      store: $vm.$store,
      url: menuInfoArr[0],
      title: menuInfoArr[1],
      backgroundColor: menuInfoArr[2]
    };
    Commons.showModule(modalInfo);
  }

  /**
   * 隐藏或显示开始菜单
   */
  showOrHideMenu(): void {
    this.showedMenu = !this.showedMenu;
  }
}
</script>

<style lang="scss">
$blur: 35px;

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
      border-top: 1px solid rgba($color: $background, $alpha: 0.2);
      .ivu-layout {
        background-color: rgba($color: white, $alpha: 0);
        .icon-container {
          background-color: rgba($color: white, $alpha: 0);
        }
      }
    }
    .footer-background {
      z-index: 99998;
      -webkit-filter: blur(10px);
      filter: blur(10px);
    }
  }
}
</style>
