<template>
  <div class="menu-tree">
    <label v-for="menu in menuTree" :key="menu.menuCode">
      <!-- 菜单点击事件只能返回MenuItem的name属性，为了后续操作方便，把name属性赋值成menuRrl+menuName -->
      <MenuItem
        v-if="!menu.children"
        :name="`${menu.menuUrl}-${menu.menuName}`"
      >
        <Icon :type="menu.menuIcon" />
        {{ menu.menuName }}
      </MenuItem>
      <Submenu v-if="menu.children" :name="menu.menuCode">
        <template slot="title">
          <Icon :type="menu.menuIcon" />
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
}
</script>
