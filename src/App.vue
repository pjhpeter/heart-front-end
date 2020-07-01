<template>
  <div id="app">
    <home />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Home from "./views/home/index.vue";

@Component({
  components: {
    Home
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  font-family: $fontFamily;
}
</style>
