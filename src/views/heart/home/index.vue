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
    <component
      :is="BaseModal"
      v-for="openedInfo in $store.getters['globals/getOpenedList']"
      :key="openedInfo.id"
      :title="openedInfo.title"
      :url="openedInfo.url"
      :ref="openedInfo.id"
      :_id="openedInfo.id"
    ></component>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { VueConstructor, VNode } from "vue";
import { Md5 } from "md5-typescript";
import { CombinedVueInstance, CreateElement } from "vue/types/vue";
import ModalInfo from "../../../model/heart/global/ModalInfo";
import Commons from "../../../utils/heart/Commons";
import BaseModal from "../../../components/heart/commons/BaseModal.vue";
import OpenedInfo from "../../../model/heart/global/OpenedInfo";

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
      import("../../../components/heart/home/footer/IconGroup.vue")
  }
})
export default class Home extends Vue {
  BaseModal: any = BaseModal;
  // 开始菜单是否显示
  showedMenu = false;
  // 壁纸url
  // 不在style标签中设置路径的话，必须用require函数来加载图片，否则会找不到
  // TODO:这里以后可以读后端返回的路径
  wallpaperUrl: string = require("../../../assets/heart/home/images/background.jpg");
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

  mounted(): void {
    // document.addEventListener("click", this.showOrHideMenu);
    this.$watch(
      () => this.$store.getters["globals/getOpenedList"].length,
      this.setOpenedModals
    );
  }

  /**
   * 获取menu-container传回来的menuInfo，内容是menuUrl-menuName
   */
  showModule(menuInfo: string): void {
    const $vm = this as any;
    // 隐藏开始菜单
    $vm.showOrHideMenu();
    // menuUrl-menuName-menuIcon
    const menuInfoArr: Array<string> = menuInfo.split("-");
    // 打开一个模态框
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
  showOrHideMenu(event: any): void {
    this.showedMenu = !this.showedMenu;
  }

  /**
   * 监听store中openedList的变化，缓存打开的模态框对象
   */
  setOpenedModals(newLength: number, oldLength: number): void {
    // 只有openedList长度增加时才需要缓存新打开的模态框对象，如果长度减少说明是关闭模态框，不需要缓存
    if (newLength > oldLength) {
      // 安全起见，等待模态框组件渲染完成
      this.$nextTick(() => {
        this.$store.getters["globals/getOpenedList"].some(
          (openedInfo: OpenedInfo) => {
            if (!openedInfo.modal) {
              // 缓存打开的模态框对象
              this.$store.commit(
                "globals/setOpenedModal",
                (this.$refs[openedInfo.id] as any)[0]
              );
              return true;
            }
            return false;
          }
        );
      });
    }
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
