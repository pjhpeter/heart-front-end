<template>
  <div class="destop-icon-container">
    <destop-icon
      v-for="modalInfo in $store.getters['user/getDestopShotcutInfo']"
      :key="modalInfo.url"
      :modalInfo="modalInfo"
    />
    <add-shotcut-button />
  </div>
</template>

<script lang="ts">
/**
 * 桌面图标容器
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "destop-icon-container",
  components: {
    DestopIcon: () => import("./DestopIcon.vue"),
    AddShotcutButton: () => import("./AddShotcutButton.vue")
  }
})
export default class DestopIconContainer extends Vue {}
</script>

<style lang="scss" scoped>
.destop-icon-container {
  height: calc(100% - #{$footerHeight});
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  padding: 5px;
}
</style>
