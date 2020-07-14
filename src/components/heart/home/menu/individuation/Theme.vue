<template>
  <div class="theme">
    <Card
      class="selected-theme"
      :style="{ backgroundColor: currentThemeColor }"
    ></Card>
    <p class="description-theme">请选择颜色主题</p>
    <div class="theme-cards">
      <Card
        class="theme-card"
        v-for="(themeColor, index) in themeColors"
        :key="index"
        :style="{ backgroundColor: themeColor }"
        @click.native="selectTheme(themeColor)"
      ></Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Card, Divider } from "view-design";
import { THEMES } from "../../../../../constants/heart/values/Themes";

@Component({
  name: "theme",
  components: {
    Card,
    Divider
  }
})
export default class Theme extends Vue {
  // 主题颜色数组
  private themeColors: Array<string> = [];
  // 当前主题颜色
  private currentThemeColor: string = THEMES.red;
  // 改变之前的主题
  private originTheme = "";

  created(): void {
    // 遍历主题和主色映射，初始化主题颜色数组
    for (const key in THEMES) {
      this.themeColors.push(THEMES[key]);
    }

    // 初始化主题选项
    const currentTheme: string = this.$store.getters["user/getTheme"];
    for (const key in THEMES) {
      if (currentTheme === key) {
        this.currentThemeColor = THEMES[key];
        this.originTheme = currentTheme;
      }
    }
  }

  /**
   * 选择主题
   * @param themeColor 主题颜色
   */
  selectTheme(themeColor: string): void {
    // 通过颜色映射主题
    for (const key in THEMES) {
      if (themeColor === THEMES[key]) {
        this.currentThemeColor = themeColor;
        // 删除原来的主题配置
        document.body.classList.remove(this.originTheme);
        // 添加新的主题配置
        document.body.classList.add(key);
        // 将当前主题设为原主题
        this.originTheme = key;
        // 保存主题设置到localStorage
        this.$store.commit("user/setTheme", key);
      }
    }
  }
}
</script>

<style lang="scss">
.theme {
  padding: 20px;
  //   background-color: $background;
  height: 100%;
  .selected-theme {
    width: 370px;
    height: 160px;
    margin-bottom: 30px;
  }
  .description-theme {
    color: $subColor;
  }
  .theme-cards {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .theme-card {
      flex: 0 0 31%;
      margin: 2px 2px 2px 0;
      height: 40px;
    }
  }
}
</style>
