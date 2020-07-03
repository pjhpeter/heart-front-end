<template>
  <div class="menu-tree">
    <label v-for="menu in menuTree" :key="menu.menuCode">
      <!-- 菜单点击事件只能返回MenuItem的name属性，为了后续操作方便，把name属性赋值成menuRrl+menuName -->
      <MenuItem
        v-if="!menu.children"
        :name="`${menu.menuUrl}-${menu.menuName}`"
      >
        <span
          :style="{ backgroundColor: getMenuIconColor() }"
          v-text="menu.menuName.substring(0, 1)"
        ></span>
        {{ menu.menuName }}
      </MenuItem>
      <Submenu v-if="menu.children" :name="menu.menuCode">
        <template slot="title">
          <i class="iconfont icon-folder"></i>
          {{ menu.menuName }}
        </template>
        <menu-tree :menuTree="menu.children" />
      </Submenu>
    </label>
  </div>
</template>

<script lang="ts">
/**
 * 菜单节点树
 * @author 彭嘉辉
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import Menu from "../../../model/menu/Menu";
import { MENU_ICON_COLORS } from "../../../constants/values/Global";

// 本来写在组件变量里面，不过Vue会警告可能出现无限循环，所以计数器写在这里
let currentMenuColorIndex = 0;

@Component({
  name: "menu-tree"
})
export default class MenuTree extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: []
  })
  menuTree!: Array<Menu>;

  /**
   * 计算菜单icon背景色，只不过是在MENU_ICON_COLORS数组中按顺序读取每一个元素
   */
  private getMenuIconColor(): string {
    const colors = MENU_ICON_COLORS;
    // 当前应用的颜色
    const color = colors[currentMenuColorIndex];

    if (currentMenuColorIndex === MENU_ICON_COLORS.length - 1) {
      // 下标已经到最后则重置
      currentMenuColorIndex = 0;
    } else {
      // 将下标后移
      currentMenuColorIndex++;
    }

    return color;
  }
}
</script>

<style lang="scss">
.menu-tree {
  background-color: $background;
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: $title !important;
    background: none !important;
    z-index: 1 !important;
    &::after {
      width: 0 !important;
    }
  }
  .ivu-menu-item,
  .ivu-menu-submenu-title {
    color: $title;
    &:hover {
      background-color: rgba($color: $lightPrimary, $alpha: 0.3);
      color: $title;
    }
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: white;
      font-weight: 700;
      font-size: 18px;
      border-radius: 5px;
      margin-right: 10px;
    }
  }
}
</style>
