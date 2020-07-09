<template>
  <div class="user-operation-box" @click.stop="disabledClick">
    <div class="user-operation">
      <img class="avatar" :src="avatarUrl" />
      <Menu class="operations" width="auto" @on-select="onMenuItemClick">
        <MenuItem name="changeWallpaper">
          <i class="iconfont icon-theme"></i>
          切换壁纸
        </MenuItem>
        <MenuItem name="editPassword">
          <i class="iconfont icon-edit"></i>
          修改密码
        </MenuItem>
        <MenuItem name="lock">
          <i class="iconfont icon-lock"></i>
          锁定
        </MenuItem>
      </Menu>
      <Button class="logout-button">退出</Button>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 用户操作组件
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import { WALLPAPER_URLS } from "../../../../constants/heart/values/Global";
import { Menu, MenuItem } from "view-design";

// ts不识别require函数，必须要这样声明一下
declare function require(img: string): string;

@Component({
  name: "user-operation",
  components: {
    Menu,
    MenuItem
  }
})
export default class UserOperation extends Vue {
  // 用户头像路径
  avatarUrl: string = require("../../../../assets/heart/home/images/avatar.png");

  // 禁用document点击事件，以免点击这里也关闭开始菜单
  disabledClick() {
    // 什么都不做
  }

  /**
   * 点击操作项
   */
  onMenuItemClick(name: string): void {
    if (name === "changeWallpaper") {
      // 切换壁纸操作
      const currentWallpaperUrl: string = this.$store.getters[
        "user/getWallpaperUrl"
      ];
      // 从壁纸路径集合中读取下一张壁纸路径
      let index = WALLPAPER_URLS.indexOf(currentWallpaperUrl);
      if (index === WALLPAPER_URLS.length - 1) {
        index = 0;
      } else {
        index++;
      }
      // 切换壁纸
      this.$store.commit("user/setWallpaperUrl", WALLPAPER_URLS[index]);
    }
  }
}
</script>

<style lang="scss" scoped>
.user-operation-box {
  height: 100%;
  position: relative;
  text-align: center;
  .user-operation {
    height: 100%;
    .avatar {
      width: 60px;
      height: 60px;
      margin: -30px auto 10px auto;
    }
    .operations {
      text-align: left;
      color: $content;
      background-color: rgba($color: white, $alpha: 0);
      .ivu-menu-item-active:not(.ivu-menu-submenu) {
        color: $title !important;
        background: none !important;
        z-index: 1 !important;
        &::after {
          width: 0 !important;
          opacity: 0 !important;
        }
        &:hover {
          background-color: rgba($color: $lightPrimary, $alpha: 0.3) !important;
          color: $title !important;
        }
      }
      .ivu-menu-item,
      .ivu-menu-submenu-title {
        font-size: 16px;
        &:hover {
          background-color: rgba($color: $lightPrimary, $alpha: 0.3);
          color: $title;
        }
      }
    }
    .logout-button {
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba($color: white, $alpha: 0);
      width: 100px;
      height: 30px;
      color: $primary;
      border-color: $primary;
      &:hover {
        background-color: rgba($color: $primary, $alpha: 0.9);
        color: white;
      }
    }
  }
}
</style>
