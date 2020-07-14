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
import { THEMES } from "../../../../../constants/heart/values/Global";

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
  private currentThemeColor: string = THEMES[0].color;
  // 改变之前的主题
  private originTheme = "";

  created(): void {
    // 遍历主题和主色映射，初始化主题颜色数组
    THEMES.forEach((theme: any) => {
      this.themeColors.push(theme.color);
    });

    // 初始化主题选项
    const currentTheme: string = this.$store.getters["user/getTheme"];
    THEMES.some((theme: any) => {
      if (currentTheme === theme.class) {
        // 初始化当前主题颜色
        this.currentThemeColor = theme.color;
        // 初始化原主题
        this.originTheme = currentTheme;
        return true;
      }
      return false;
    });
  }

  /**
   * 选择主题
   * @param themeColor 主题颜色
   */
  selectTheme(themeColor: string): void {
    // 通过颜色映射主题
    THEMES.some((theme: any) => {
      if (themeColor === theme.color) {
        this.currentThemeColor = themeColor;
        // 删除原来的主题配置
        document.body.classList.remove(this.originTheme);
        // 添加新的主题配置
        document.body.classList.add(theme.class);
        // 将当前主题设为原主题
        this.originTheme = theme.class;
        // 保存主题设置到localStorage
        this.$store.commit("user/setTheme", theme.class);
      }
    });
  }
}
</script>

<style lang="scss">
.theme {
  padding: 20px;
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
