<template>
  <Button class="start-button" @click="onStartClick">
    <i class="iconfont icon-app"></i>
  </Button>
</template>

<script lang="ts">
/**
 * 开始按钮组件
 * @author 彭嘉辉
 */
import { Vue, Component, Emit } from "vue-property-decorator";

@Component({
  name: "start-button"
})
export default class FooterContainer extends Vue {
  /**
   * 触发父组件的menuClick事件，将menuInfo传给父组件
   */
  @Emit("start-click")
  onStartClick() {}
}
</script>

<style lang="scss" scoped>
.start-button {
  background-color: rgba($color: $background, $alpha: 0.9);
  height: $footerHeight;
  width: $footerHeight;
  padding: 0;
  color: $primary;
  border-radius: 0;
  box-shadow: none;
  &:hover {
    background-color: $primary;
    color: white;
    border-color: $lightPrimary;
  }
}
</style>
