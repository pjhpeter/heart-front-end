<template>
  <div>
    <Form :model="emailData" label-position="right" :label-width="80">
      <FormItem label="标题" prop="emailSubject">
        <Input v-model="emailData.emailSubject" />
        <!-- <Input/> -->
      </FormItem>
      <FormItem label="发件人" prop="fromEmail">
        <Input v-model="emailData.fromEmail" />
        <!-- <Input></Input> -->
      </FormItem>
      <FormItem label="内容" prop="emailContent">
        <!-- <Input v-model="emailData.emailContent" /> -->
        <tinymce v-model="emailData.emailContent" />
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Form, FormItem, Input } from "view-design";
import EmailAPI from "../../../../api/example/email/EmailAPI";
import EmailAPI4Jeesite from "../../../../api/example/email/impl/EmailAPI4Jessite";
import EmailInfo4Jeesite from "../../../../model/example/send/EmailInfo4Jeesite";
import TableDate from "../../../../model/example/global/TableData";
import Tinymce from "../../../heart/commons/Tinymce.vue";

@Component({
  name: "inbox-editor",
  components: {
    Form,
    FormItem,
    Input,
    Tinymce
  }
})
export default class InboxEditor extends Vue {
  emailData: object = { emailSubject: "", fromEmail: "", emailContent: "" };
  created(): void {
    (async () => {
      this.emailData = (this.$parent as any).data;
    })();
  }
}
</script>
