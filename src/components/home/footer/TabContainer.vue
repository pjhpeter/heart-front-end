<template>
  <div class="tab-container">
    <div
      :class="`tab-icon ${openedInfo.active ? 'tab-icon-active' : ''}`"
      v-for="(openedInfo, index) in openedList"
      :key="index"
      @click="onTabClick(openedInfo)"
    >
      <Row class="tab-row" type="flex" justify="center" align="middle">
        <Col span="8">
          <div
            v-text="openedInfo.modal.title.substring(0, 1)"
            :style="{ backgroundColor: openedInfo.backgroundColor }"
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
import OpenedInfo from "../../../model/global/OpenedInfo";

@Component({
  name: "tab-container"
})
export default class TabContainer extends Vue {
  // 已打开的模块信息
  openedList: Array<OpenedInfo> = this.$store.getters["globals/getOpenedList"];
  /**
   * 底部栏模块图标点击事件
   */
  onTabClick(openedInfo: OpenedInfo): void {
    // 选中当前点击项，清楚其他选中项
    this.openedList.forEach((opened: OpenedInfo) => {
      if (opened.modal._uid === opened.modal._uid) {
        // 必须这样赋值才能触发UI响应
        Vue.set(opened, "active", true);
      } else {
        // 必须这样赋值才能触发UI响应
        Vue.set(opened, "active", false);
      }
    });

    // 判断标签对应的模态框是否隐藏
    if (!openedInfo.modal.isShow) {
      // 隐藏则显示
      Vue.set(openedInfo.modal, "isShow", true);
    }

    // 模拟点击模态框操作，使其至于最顶层，查看源代码发现的
    openedInfo.modal.$children[0].handleClickModal();
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
