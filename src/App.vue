<template>
  <div id="app" @contextmenu.prevent="disabledContextMenu">
    <home />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Home from "./views/heart/home/index.vue";
// FIXME:临时用
import UserInfo from "./model/heart/user/UserInfo";

@Component({
  components: {
    Home
  }
})
export default class App extends Vue {
  // 禁用右键默认行为
  disabledContextMenu(): void {
    // 什么都不做
  }

  // FIXME:登录没做之前临时用来添加用户信息
  beforeCreate() {
    const userInfo: UserInfo = {
      userCode: "123",
      loginCode: "test",
      userName: "测试"
    };
    this.$store.commit("user/setUser", userInfo);
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
</style>
