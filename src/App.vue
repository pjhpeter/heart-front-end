<template>
  <div id="app" @contextmenu.prevent="disabledContextMenu">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
  // 禁用右键默认行为
  disabledContextMenu(): void {
    // 什么都不做
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
