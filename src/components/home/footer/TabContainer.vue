<template>
  <div class="tab-container">
    <i v-for="(tabInfo, index) in tabs" :key="index">{{
      tabInfo.backgroundColor
    }}</i>
  </div>
</template>

<script lang="ts">
/**
 * 底部栏已打开模块的图标容器
 * @author 彭嘉辉
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import TabInfo from "../../../model/home/TabInfo";

@Component({
  name: "tab-container"
})
export default class TabContainer extends Vue {
  @Prop({
    type: Array,
    default: []
  })
  tabs!: Array<TabInfo>;
}
</script>

<style lang="scss" scoped>
.tab-container {
}
</style>
