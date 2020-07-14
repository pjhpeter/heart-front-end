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
import { Button } from "view-design";

@Component({
  name: "start-button",
  components: {
    Button
  }
})
export default class FooterContainer extends Vue {
  /**
   * 触发父组件的menuClick事件，将menuInfo传给父组件
   */
  @Emit("start-click")
  onStartClick() {}
}
</script>
