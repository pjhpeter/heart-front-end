<template>
  <div>
    <Table :columns="columns" :data="inList">
      <template slot-scope="{ row }" slot="emailSubject">
        <span style="cursor:pointer" @click.stop="inboxEditor(row)">{{
          row.emailSubject
        }}</span>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button, Table, Modal } from "view-design";
import EmailAPI from "../../../../api/example/email/EmailAPI";
import EmailAPI4Jeesite from "../../../../api/example/email/impl/EmailAPI4Jessite";
import EmailInfo4Jeesite from "../../../../model/example/send/EmailInfo4Jeesite";
import TableDate from "../../../../model/example/global/TableData";
import BaseModel from "../../../heart/commons/BaseModal.vue";
import Commons from "../../../../utils/heart/Commons";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import Extend4Jeesite from "../../../../model/heart/global/Extend4Jeesite";
import InboxEditor from "./InboxEditor.vue";

// import Editor from "./Editor.vue";

@Component({
  name: "inbox-table",
  components: {
    Button,
    Table,
    Modal,
    InboxEditor
  }
})
export default class InboxTable extends Vue {
  inList: Array<EmailInfo4Jeesite> = [];
  modalInfo: Array<Extend4Jeesite> = [];

  isShow = false;
  inboxEditor(row: any): void {
    this.isShow = true;
    const modalInfo: ModalInfo = {
      url: "/example/email/inboxlist/InboxEditor.vue",
      title: "详细信息",
      backgroundColor: Commons.getIconColor(),
      width: 600,
      footerHide: true,
      okText: "反复",
      cancelText: "sfadd",
      className: "send-modal-height",
      data: {
        emailId: row.emailId,
        emailSubject: row.emailSubject,
        fromEmail: row.fromEmail,
        emailContent: row.emailContent
      }
    };
    Commons.showModule(modalInfo);
  }
  columns: Array<any> = [
    {
      title: "标题",
      slot: "emailSubject"
    },
    {
      title: "发件人",
      key: "fromEmail"
    },
    {
      title: "日期",
      key: "emailDate"
    }
  ];

  created(): void {
    (async () => {
      const emailAPI: EmailAPI<EmailInfo4Jeesite> = new EmailAPI4Jeesite();
      const TableData: TableDate<EmailInfo4Jeesite> = await emailAPI.getInboxList();
      this.inList = TableData.list;
    })();
  }
}
</script>
