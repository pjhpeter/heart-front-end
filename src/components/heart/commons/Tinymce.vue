<template>
  <div>
    <editor :id="id" v-model="content" :init="init"></editor>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";

import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/media";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/preview";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/hr";
import "tinymce/plugins/paste";
import "tinymce/icons/default/icons";

console.log(tinymce);

@Component({
  name: "TinymceEditer",
  components: { Editor }
})
export default class Tinymce extends Vue {
  //设置prop id
  @Prop({ default: "vue-tinymce-" + +new Date() }) id!: string;

  //富文本框值
  @Prop()
  value!: string;

  private content!: string;

  created(): void {
    this.content = this.value;
  }

  //富文本框init配置
  private get init() {
    return {
      selector: "#" + this.id, //富文本编辑器的id
      language: "zh_CN", //语言
      language_url: "/tinymce/zh_CN.js", //语言包
      skin_url: "/tinymce/skins/ui/oxide", //编辑器需要一个skin才能正常工作，所以要设置一个skin_url指向之前复制出来的skin文件
      menubar: false, //菜单条
      plugins:
        "link lists image code table colorpicker textcolor wordcount contextmenu  media table fullscreen preview pagebreak insertdatetime hr paste", //插件
      toolbar:
        "bold italic underline strikethrough  | fontselect | fontsizeselect | formatselect  | forecolor backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | removeformat| undo redo | link unlink image media insertdatetime table  hr pagebreak | code fullscreen preview", //工具条
      font_formats:
        "Arial=arial,helvetica,sans-serif; 宋体=SimSun;  微软雅黑=Microsoft Yahei; Impact=impact,chicago;", //字体
      fontsize_formats: "11px 12px 14px 16px 18px 24px 36px 48px 64px 72px", //文字大小
      height: 300, //高度
      branding: false, //水印
      elementpath: false, //底部元素路径
      paste_data_images: true, //允许粘贴图片
      video_template_callback: (data: any) => {
        //视频设置回调
        return `<video width="
                    ${data.width} " height="${data.height}"
                    ${data.poster ? 'poster="' + data.poster + '"' : ""}
                    controls="controls">
                    <source src="${data.source}"/>
                </video>`;
      }
    };
  }
}
</script>
