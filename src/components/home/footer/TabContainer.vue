<template>
  <div class="tab-container">
    <div class="tab-icon" v-for="(tabInfo, index) in tabs" :key="index">
      <Row class="tab-row" type="flex" justify="center" align="middle">
        <Col span="8">
          <div
            v-text="tabInfo.modal.title.substring(0, 1)"
            :style="{ backgroundColor: tabInfo.backgroundColor }"
          ></div>
        </Col>
      </Row>
    </div>
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
  .tab-icon {
    display: inline-block;
    height: $footerHeight;
    width: $footerHeight;
    color: white;
    font-size: 16;
    font-weight: 700;
    .tab-row {
      height: 100%;
      div {
        height: 30px;
        width: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
      }
    }
  }
}
</style>
