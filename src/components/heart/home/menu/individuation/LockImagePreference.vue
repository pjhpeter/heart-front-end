<template>
  <div class="lock-image-preference">
    <img class="selected-image" v-lazy="currentLockImageUrl" alt />
    <p class="description-image">请选择锁屏图片</p>
    <div class="image-cards">
      <img
        class="image-card"
        v-lazy="image"
        v-for="(image, index) in images"
        :key="index"
        @click="selectLockImage(image)"
      />
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 锁屏背景选择组件
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import { Card, Divider } from "view-design";
import { WALLPAPER_URLS } from "../../../../../constants/heart/values/Global";

@Component({
  name: "lock-image-preference",
  components: {
    Card,
    Divider
  }
})
export default class ImageConfig extends Vue {
  // 壁纸列表
  private images: Array<string> = WALLPAPER_URLS;
  // 当前壁纸
  private currentLockImageUrl = "";

  created(): void {
    this.currentLockImageUrl = this.$store.getters["user/getLockImageUrl"];
  }

  /**
   * 选择锁屏
   */
  selectLockImage(imageUrl: string): void {
    this.currentLockImageUrl = imageUrl;
    this.$store.commit("user/setLockImageUrl", imageUrl);
  }
}
</script>

<style lang="scss" scoped>
.lock-image-preference {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  .selected-image {
    width: 382px;
    height: 200px;
    margin-bottom: 30px;
  }
  .image-cards {
    display: flex;
    flex-wrap: wrap;
    .image-card {
      flex: 0 0 48%;
      height: 100px;
      margin: 6px 6px 6px 0;
    }
  }
}
</style>
