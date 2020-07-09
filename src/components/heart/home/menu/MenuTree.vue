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
          <p class="title-content">{{ menu.menuName }}</p>
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
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import MenuInfo from "../../../../model/heart/menu/MenuInfo";
import Commons from "../../../../utils/heart/Commons";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import { MenuItem, Submenu } from "view-design";

@Component({
  name: "menu-tree",
  components: {
    MenuItem,
    Submenu
  }
})
export default class MenuTree extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: []
  })
  menuTree!: Array<MenuInfo>;

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
  private getMenuIconColor(menu: MenuInfo): string {
    // 保存当前模块图标的背景颜色
    menu.menuColor = Commons.getIconColor();
    return menu.menuColor;
  }
}
</script>

<style lang="scss">
.menu-tree {
  background-color: rgba($color: white, $alpha: 0);
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: $title !important;
    background: none !important;
    z-index: 1 !important;
    &::after {
      width: 0 !important;
    }
    &:hover {
      background-color: rgba($color: $lightPrimary, $alpha: 0.3) !important;
      color: $title !important;
    }
  }
  .ivu-menu-submenu-title {
    // 设置文件夹图标样式
    .icon-folder {
      display: inline-block;
      color: $warning;
      font-size: 30px;
      line-height: 30px;
    }
    .title-content {
      display: inline-block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .ivu-menu-item {
    span {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: white;
      font-weight: 700;
      font-size: 16px;
      border-radius: 5px;
      margin-right: 10px;
    }
  }
  .ivu-menu-item,
  .ivu-menu-submenu-title {
    color: $title;
    &:hover {
      background-color: rgba($color: $lightPrimary, $alpha: 0.3);
      color: $title;
    }
  }
}
</style>
