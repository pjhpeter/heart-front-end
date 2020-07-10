<template>
  <div id="app" @contextmenu.prevent="disabledContextMenu">
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

@Component({
  components: {
    Lock: () => import("./components/heart/login/Lock.vue")
  }
})
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
