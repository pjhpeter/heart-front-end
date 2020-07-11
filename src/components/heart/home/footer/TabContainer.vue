<template>
  <div class="tab-container">
    <transition
      v-for="(openedInfo, index) in openedList"
      :key="index"
      name="fade"
    >
      <Dropdown trigger="contextMenu" transfer @on-click="onMenuClick">
        <div
          :class="`tab-icon ${openedInfo.active ? 'tab-icon-active' : ''}`"
          @click="onTabClick(openedInfo)"
          :title="openedInfo.title"
        >
          <Row class="tab-row" type="flex" justify="center" align="middle">
            <Col span="8">
              <div
                v-text="openedInfo.title.substring(0, 1)"
                :style="{ backgroundColor: openedInfo.backgroundColor }"
              ></div>
            </Col>
          </Row>
        </div>
        <DropdownMenu slot="list">
          <DropdownItem :name="`closeCurrent-${openedInfo.id}`"
            >关闭</DropdownItem
          >
          <DropdownItem :name="`closeOther-${openedInfo.id}`"
            >关闭其他</DropdownItem
          >
          <DropdownItem name="closeAll">关闭全部</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </transition>
  </div>
</template>

<script lang="ts">
/**
 * 底部栏已打开模块的图标容器
 * @author 彭嘉辉
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import OpenedInfo from "../../../../model/heart/global/OpenedInfo";
import { Row, Col, Dropdown, DropdownMenu, DropdownItem } from "view-design";

@Component({
  name: "tab-container",
  components: {
    Row,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownItem
  }
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
      if (openedInfo.id === opened.id) {
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

  /**
   * 点击右键菜单事件
   * @param name 菜单项的name属性，内容是：操作项-openedInfo的id
   */
  onMenuClick(name: string): void {
    // name=closeCurrent-1232454543534
    // 读取当前点击的已打开模块信息的id
    const currentOpenedInfoId: number = parseInt(
      name.substring(name.lastIndexOf("-") + 1)
    );
    if (name.indexOf("Current") > -1) {
      // 关闭当前项
      this.closeCurrent(currentOpenedInfoId);
    } else if (name.indexOf("Other") > -1) {
      // 关闭其他
      this.closeOther(currentOpenedInfoId);
    } else if (name === "closeAll") {
      // 关闭全部
      this.$store.commit("globals/clearOpenedInfoList");
    }
  }

  /**
   * 关闭当前
   * @param 当前右击的标签
   */
  private closeCurrent(currentOpenedInfoId: number): void {
    this.openedList.some((openedInfo: OpenedInfo, index: number) => {
      if (openedInfo.id === currentOpenedInfoId) {
        this.$store.commit("globals/ramoveOpenedInfo", openedInfo);
        return true;
      }
      return false;
    });
  }

  /**
   * 关闭其他
   * @param 当前右击的标签
   */
  private closeOther(currentOpenedInfoId: number): void {
    const remainingOpenedInfoList: Array<OpenedInfo> = this.openedList.filter(
      (openedInfo: OpenedInfo) => {
        return openedInfo.id === currentOpenedInfoId;
      }
    );

    // 由于for循环中删除元素，会因为下标问题造成操作不成功，所以采取下面的思路
    // 先删除所有打开模块的信息
    this.openedList.splice(0, this.openedList.length);
    // 再插入当前的
    this.openedList.push(...remainingOpenedInfoList);
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  height: 100%;
  .ivu-dropdown {
    // 不浮动的话在火狐和IE会出现滚动条
    float: left;
    .tab-icon {
      position: relative;
      height: $footerHeight;
      width: $footerHeight;
      color: white;
      font-size: 16px;
      font-weight: 700;
      // 底下的小红线
      &::after {
        content: "";
        transition: width 0.5s;
        opacity: 0;
        width: 0;
        height: 3px;
        background-color: $darkPrimary;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      &:hover {
        background-color: rgba($color: white, $alpha: 0.2);
        &::after {
          width: 80%;
          opacity: 1;
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
    // 选中样式
    .tab-icon-active {
      background-color: rgba($color: white, $alpha: 0.4);
      position: relative;
      &:hover {
        background-color: rgba($color: white, $alpha: 0.6) !important;
        &::after {
          width: 98%;
        }
      }
      &::after {
        opacity: 1;
        width: 98%;
      }
    }
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
