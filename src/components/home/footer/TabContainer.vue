<template>
  <div class="tab-container">
    <div
      :class="`tab-icon ${tabInfo.active}`"
      v-for="(tabInfo, index) in tabs"
      :key="index"
      @click="onTabClick(tabInfo)"
    >
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
import { TAB_ACTIVE_CLASS } from "../../../constants/values/Global";

@Component({
  name: "tab-container"
})
export default class TabContainer extends Vue {
  @Prop({
    type: Array,
    default: []
  })
  tabs!: Array<TabInfo>;

  /**
   * 底部栏模块图标点击事件
   */
  onTabClick(tabInfo: TabInfo): void {
    // 选中当前点击项，清楚其他选中项
    this.tabs.forEach((tab: TabInfo) => {
      if (tab.modal._uid === tabInfo.modal._uid) {
        // 必须这样赋值才能触发UI响应
        Vue.set(tab, "active", TAB_ACTIVE_CLASS);
      } else {
        // 必须这样赋值才能触发UI响应
        Vue.set(tab, "active", "");
      }
    });

    // 判断标签对应的模态框是否隐藏
    if (!tabInfo.modal.isShow) {
      // 隐藏则显示
      Vue.set(tabInfo.modal, "isShow", true);
    }

    // 模拟点击模态框操作，使其至于最顶层，查看源代码发现的
    tabInfo.modal.$children[0].handleClickModal();
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  .tab-icon {
    position: relative;
    display: inline-block;
    height: $footerHeight;
    width: $footerHeight;
    color: white;
    font-size: 16px;
    font-weight: 700;
    &:hover {
      background-color: rgba($color: white, $alpha: 0.2);
      &::after {
        content: "";
        width: 80%;
        height: 3px;
        background-color: $darkPrimary;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
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
  .tab-icon-active {
    background-color: rgba($color: white, $alpha: 0.4);
    position: relative;
    &:hover {
      background-color: rgba($color: white, $alpha: 0.6) !important;
      &::after {
        content: "";
        width: 90%;
        height: 3px;
        background-color: $darkPrimary;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    &::after {
      content: "";
      width: 90%;
      height: 3px;
      background-color: $darkPrimary;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
