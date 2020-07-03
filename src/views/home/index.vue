<template>
  <div class="home">
    <Layout>
      <!-- 桌面 -->
      <Content class="content"></Content>
      <!-- 底部栏 -->
      <div v-show="isShowFooter">
        <Footer class="footer">
          <Layout>
            <!-- 开始按钮 -->
            <Sider class="start-button-container" hide-trigger :width="45">
              <start-button @start-click="showOrHideMenu" />
            </Sider>
            <!-- 已打开的模块图标容器 -->
            <Content>
              <tab-container :tabs="tabs" />
            </Content>
            <!-- 右下角图标容器 -->
            <Sider class="icon-container" hide-trigger :width="200"></Sider>
          </Layout>
        </Footer>
        <!-- 毛玻璃底层 -->
        <Footer class="footer-background"></Footer>
      </div>
    </Layout>
    <menu-container @menu-click="showModule" v-show="isShowedMenu" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { VueConstructor, VNode } from "vue";
import { Md5 } from "md5-typescript";
import ComponentInfo from "../../model/menu/ComponentInfo";
import BaseModal from "@/components/commons/BaseModal.vue";
import { CombinedVueInstance, CreateElement } from "vue/types/vue";
import TabInfo from "../../model/home/TabInfo";

@Component({
  components: {
    MenuContainer: () => import("@/components/home/menu/MenuContainer.vue"),
    StartButton: () => import("@/components/home/footer/StartButton.vue"),
    TabContainer: () => import("../../components/home/footer/TabContainer.vue")
  }
})
export default class Home extends Vue {
  // 开始菜单是否显示
  isShowedMenu = false;
  // 底部栏是否显示
  isShowFooter = true;
  // 已经打开的模块
  tabs: Array<TabInfo> = [];

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
    const modal: any = new Vue({
      render(createElement: CreateElement): VNode {
        return createElement(BaseModal, {
          props: {
            menuUrl: menuInfoArr[0],
            title: menuInfoArr[1],
            onClose: $vm.removeTab
          },
          on: {
            "show-footer": $vm.showFooter,
            "hide-footer": $vm.hideFooter
          }
        });
      }
    }).$mount().$children[0];
    // 缓存已打开的模块信息
    this.tabs.push({
      backgroundColor: menuInfoArr[2],
      modal
    });
  }

  /**
   * 隐藏或显示开始菜单
   */
  showOrHideMenu(): void {
    this.isShowedMenu = !this.isShowedMenu;
  }

  /**
   * 显示底部栏
   */
  showFooter(): void {
    this.isShowFooter = true;
  }

  /**
   * 隐藏底部栏
   */
  hideFooter(): void {
    this.isShowFooter = false;
  }

  /**
   * 删除指定的底部栏模块图标
   */
  removeTab(modal: any) {
    console.log(modal);
    this.tabs.every((tabInfo: TabInfo, index: number) => {
      if (tabInfo.modal._uid === modal._uid) {
        this.tabs.splice(index, 1);
        return false;
      }
      return true;
    });
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
      background-image: url("../../assets/home/images/background.jpg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .footer,
    .footer-background {
      position: fixed;
      display: inline-block;
      width: 100%;
      bottom: 0;
      height: $footerHeight;
      padding: 0 !important;
      background-color: rgba($color: #ffffff, $alpha: 0.7);
      box-sizing: content-box;
      z-index: 10010;
      border-top: 1px solid rgba($color: $background, $alpha: 0.2);
    }
    .footer-background {
      z-index: 10000;
      background: url("../../assets/home/images/background.jpg") center / cover
        no-repeat fixed;
      -webkit-filter: blur(10px);
      filter: blur(10px);
    }
  }
}
</style>
