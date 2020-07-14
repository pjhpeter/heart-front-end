<template>
  <div class="icon-group">
    <div class="date">
      <p>{{ time }}</p>
      <p>{{ day }}</p>
    </div>
    <div class="icon" title="邮箱">
      <Badge :count="100" :overflow-count="99">
        <i class="iconfont icon-email"></i>
      </Badge>
    </div>
    <div class="icon" title="即时消息">
      <Badge :count="0" :over-count="99">
        <i class="iconfont icon-message"></i>
      </Badge>
    </div>
    <div class="show-destop" @click="showDestop" title="显示桌面"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import OpenedInfo from "../../../../model/heart/global/OpenedInfo";
import { Badge } from "view-design";

/**
 * 桌面右下角图标组
 * @author 彭嘉辉
 */
@Component({
  name: "icon-group",
  components: {
    Badge
  }
})
export default class IconGroup extends Vue {
  time = "";
  day = "";
  // 缓存已经打开的模态框对象集合，用于显示桌面后再次恢复显示
  private openedModalList: Array<any> = [];

  mounted(): void {
    this.now();
    setInterval(this.now, 1000);
  }

  /**
   * 计算当前时间
   */
  private now(): void {
    const now: Date = new Date();
    const hours: number = now.getHours();
    const minutes: number = now.getMinutes();
    this.time = `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }`;
    this.day = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  }

  /**
   * 显示桌面
   */
  private showDestop(): void {
    const openedList: Array<OpenedInfo> = this.$store.getters[
      "globals/getOpenedList"
    ];
    // 判断是否有模态框打开的标志
    let hasOpened = false;
    // 将所有显示的
    openedList.forEach((openedInfo: OpenedInfo) => {
      const modal = openedInfo.modal;
      if (modal.isShow) {
        // 将打开的模态框缓存
        this.openedModalList.push(modal);
        // 最小化
        modal.hide();
        // 标志为有模态框打开过
        hasOpened = true;
      }
    });

    if (!hasOpened) {
      // 如果没有模态框打开过，说明是在显示桌面的情况下点击“显示桌面按钮”，将曾经显示的模态框全部还原成显示状态
      this.openedModalList.forEach((modal: any) => {
        modal.isShow = true;
      });
      // 清空缓存
      this.openedModalList = [];
    }
  }
}
</script>
