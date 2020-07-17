<template>
  <div id="app" @contextmenu.prevent>
    <transition v-if="!$store.getters['globals/isLocked']" name="fade">
      <router-view></router-view>
    </transition>
    <transition v-if="$store.getters['globals/isLocked']" name="fade">
      <lock />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Commons from "./utils/heart/Commons";

@Component({
  components: {
    Lock: () => import("./components/heart/login/Lock.vue")
  }
})
export default class App extends Vue {
  created(): void {
    // 阻止F11键默认事件，用HTML5全屏API代替
    window.addEventListener("keydown", (event: any) => {
      event = event || window.event;
      if (event.keyCode === 122) {
        event.preventDefault();
        Commons.fullscreen();
      }
    });

    // 添加主题样式
    document.body.classList.add(this.$store.getters["user/getTheme"]);
    // 禁止后退键 作用于Firefox、Opera
    document.onkeypress = this.banBackSpace;
    // 禁止后退键  作用于IE、Chrome
    document.onkeydown = this.banBackSpace;
  }

  /**
   * 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
   */
  private banBackSpace(event: any): boolean {
    //获取event对象
    const ev = event || window.event;
    //获取事件源
    const obj = ev.target || ev.srcElement;
    //获取事件源类型
    const t = obj.type || obj.getAttribute("type");
    //获取作为判断条件的事件类型
    let vReadOnly = obj.getAttribute("readonly");
    //处理null值情况
    vReadOnly = vReadOnly == "" ? false : vReadOnly;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
    const flag1 =
      ev.keyCode == 8 &&
      (t == "password" || t == "text" || t == "textarea") &&
      vReadOnly == "readonly"
        ? true
        : false;
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    const flag2 =
      ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea"
        ? true
        : false;

    //判断
    if (flag2) {
      return false;
    }
    if (flag1) {
      return false;
    }
    return true;
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
  width: 100%;
}

body {
  font-family: $fontFamily;
  height: 100%;
  width: 100%;
  #app {
    height: 100%;
    overflow: hidden;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
