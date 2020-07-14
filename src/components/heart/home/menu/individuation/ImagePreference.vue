<template>
  <div class="image-preference">
    图片
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Card, Divider } from "view-design";
import {
  ThemeColorMap,
  Themes
} from "../../../../../constants/heart/enum/Themes";

@Component({
  name: "image-preference",
  components: {
    Card,
    Divider
  }
})
export default class ImageConfig extends Vue {}
</script>

<style lang="scss" scoped>
.image-preference {
}
</style>
