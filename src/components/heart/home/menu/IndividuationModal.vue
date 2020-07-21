<template>
  <div class="individuation-modal">
    <div class="menu-box-individuation">
      <Menu
        class="select-menu-tree"
        width="auto"
        @on-select="showComponent"
        active-name="image-preference"
      >
        <MenuItem name="image-preference">
          <i class="iconfont icon-image"></i>
          背景
        </MenuItem>
        <MenuItem name="lock-image-preference">
          <i class="iconfont icon-lock"></i>
          锁屏
        </MenuItem>
        <MenuItem name="theme">
          <i class="iconfont icon-theme"></i>
          主题
        </MenuItem>
      </Menu>
    </div>
    <div class="component-box-individuation">
      <transition name="fast-slide-fade">
        <keep-alive>
          <component v-bind:is="activeComponent"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 个性化模态框组件
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import { Menu, MenuItem } from "view-design";

@Component({
  name: "individuation-modal",
  components: {
    LockImagePreference: () =>
      import("./individuation/LockImagePreference.vue"),
    ImagePreference: () => import("./individuation/ImagePreference.vue"),
    Theme: () => import("./individuation/Theme.vue"),
    Menu,
    MenuItem
  }
})
export default class Individuation extends Vue {
  // 当前显示的组件
  private activeComponent = "image-preference";

  // 点击左侧菜单显示对应组件
  private showComponent(name: string): void {
    this.activeComponent = name;
  }
}
</script>

<style lang="scss">
.individuation-modal {
  display: flex;
  height: 100%;
  overflow: hidden;
  .menu-box-individuation {
    flex: 0 0 30%;
    padding-right: 10px;
  }
  .component-box-individuation {
    flex: 0 0 70%;
  }
}
</style>
