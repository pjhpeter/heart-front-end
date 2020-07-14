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
    if (!menu.menuColor) {
      menu.menuColor = Commons.getIconColor();
    }
    return menu.menuColor;
  }
}
</script>
