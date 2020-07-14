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
        @click.native="selectTheme(themeColor, $event)"
      ></Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Card, Divider } from "view-design";
import {
  ThemeColorMap,
  Themes
} from "../../../../../constants/heart/enum/Themes";

@Component({
  name: "theme",
  components: {
    Card,
    Divider
  }
})
export default class Theme extends Vue {
  // 主题颜色数组
  private themeColors: Array<ThemeColorMap> = [];
  // 当前主题颜色
  private currentThemeColor: ThemeColorMap = ThemeColorMap.RED;
  // 改变之前的主题
  private originTheme: Themes = Themes.RED;

  created(): void {
    // 遍历主题和主色映射，初始化主题颜色数组
    for (const key in ThemeColorMap) {
      this.themeColors.push(ThemeColorMap[key]);
    }

    // 初始化主题选项
    const currentTheme: Themes = this.$store.getters["user/getTheme"];
    for (const key in Themes) {
      if (currentTheme === Themes[key]) {
        this.currentThemeColor = ThemeColorMap[key];
        this.originTheme = currentTheme;
      }
    }
  }

  selectTheme(themeColor: ThemeColorMap, event): void {
    // 通过颜色映射主题
    for (const key in ThemeColorMap) {
      if (themeColor === ThemeColorMap[key]) {
        this.currentThemeColor = themeColor;
        // 删除原来的主题配置
        document.body.classList.remove(this.originTheme);
        // 添加新的主题配置
        document.body.classList.add(Themes[key]);
        // 将当前主题设为原主题
        this.originTheme = Themes[key];
        // 保存主题设置到localStorage
        this.$store.commit("user/setTheme", Themes[key]);
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
