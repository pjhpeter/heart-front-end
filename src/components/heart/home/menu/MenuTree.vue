<template>
  <div :class="className">
    <label v-for="menu in menuTree" :key="menu.menuCode">
      <!-- 菜单点击事件只能返回MenuItem的name属性，为了后续操作方便，把name属性赋值成menuRrl+menuName -->
      <MenuItem
        v-if="!menu.children"
        :name="`${menu.menuUrl}-${menu.menuName}-${getMenuIconColor(menu)}`"
      >
        <span
          :style="{ backgroundColor: menu.menuColor }"
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
import Menu from "../../../../model/heart/menu/Menu";
import Commons from "../../../../utils/heart/Commons";

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

  @Prop({
    type: String,
    default: "menu-tree"
  })
  className!: string;

  /**
   * 计算菜单icon背景色，只不过是在MENU_ICON_COLORS数组中按顺序读取每一个元素
   * @param menu 当前菜单
   * @returns 菜单项背景颜色
   */
  private getMenuIconColor(menu: Menu): string {
    // 保存当前模块图标的背景颜色
    menu.menuColor = Commons.getIconColor();
    return menu.menuColor;
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
