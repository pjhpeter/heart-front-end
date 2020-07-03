<template>
  <div class="home">
    <Layout>
      <Content class="content"></Content>
      <div v-show="isShowFooter">
        <Footer class="footer">
          <start-button @start-click="showOrHideMenu" />
        </Footer>
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

@Component({
  components: {
    MenuContainer: () => import("@/components/home/menu/MenuContainer.vue"),
    StartButton: () => import("@/components/home/footer/StartButton.vue")
  }
})
export default class Home extends Vue {
  isShowedMenu = false;
  isShowFooter = true;

  /**
   * 获取menu-container传回来的menuInfo，内容是menuUrl-menuName
   */
  showModule(menuInfo: string): void {
    const $vm = this as any;
    $vm.showOrHideMenu();

    // menuUrl-menuName
    const menuInfoArr: Array<string> = menuInfo.split("-");
    // 手动实例化模态框实例
    new Vue({
      render(createElement): VNode {
        return createElement(BaseModal, {
          props: {
            menuUrl: menuInfoArr[0],
            title: menuInfoArr[1]
          },
          on: {
            "size-change": $vm.showOrHideFooter
          }
        });
      }
    }).$mount();
  }

  /**
   * 隐藏或显示开始菜单
   */
  showOrHideMenu() {
    this.isShowedMenu = !this.isShowedMenu;
  }

  /**
   * 隐藏或显示底部栏
   */
  showOrHideFooter() {
    this.isShowFooter = !this.isShowFooter;
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
