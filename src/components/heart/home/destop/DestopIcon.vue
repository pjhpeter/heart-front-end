<template>
  <div class="destop-icon">
    <div class="icon-content">
      <div
        class="icon"
        v-text="modalInfo.title.substring(0, 1)"
        :style="{ backgroundColor: modalInfo.backgroundColor }"
      ></div>
      <p class="title" v-text="modalInfo.title"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ModalInfo from "../../../../model/heart/global/ModalInfo";

@Component({
  name: "destop-icon"
})
export default class DestopIcon extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  modalInfo!: ModalInfo;
}
</script>

<style lang="scss" scoped>
.destop-icon {
  display: flex;
  width: 80px;
  height: 100px;
  cursor: pointer;
  color: white;
  text-align: center;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 5px;
  &:hover {
    background-color: rgba($color: white, $alpha: 0.3);
  }
  .icon-content {
    margin: auto;
    .icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 5px;
      line-height: 40px;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 5px;
    }
    .title {
      text-shadow: black 2px 3px 6px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>
