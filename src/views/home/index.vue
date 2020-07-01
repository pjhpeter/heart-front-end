<template>
  <div id="home">
    <menu-container @menuClick="showModule" />
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
    MenuContainer: () => import("@/components/home/menu/MenuContainer.vue")
  }
})
export default class Home extends Vue {
  /**
   * 获取menu-container传回来的menuInfo，内容是menuUrl-menuName
   */
  showModule(menuInfo: string): void {
    // menuUrl-menuName
    const menuInfoArr: Array<string> = menuInfo.split("-");
    // 手动实例化模态框实例
    new Vue({
      render(createElement): VNode {
        return createElement(BaseModal, {
          props: {
            menuUrl: menuInfoArr[0],
            title: menuInfoArr[1]
          }
        });
      }
    }).$mount();
  }
}
</script>
