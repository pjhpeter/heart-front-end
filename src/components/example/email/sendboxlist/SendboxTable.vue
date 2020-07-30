<template>
  <div>
    <Button @click.stop="edit" type="primary">发送邮件</Button>
    <br />
    <br />

    <Table height="400" :columns="columns" :data="sendList">
      <template slot-scope="{ row }" slot="action">
        <a @click.stop="edit(row)">查看</a>
        <a style="margin-left:10px;color:#ED4014">删除</a>
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
  Button,
  Table,
  Modal,
  Form,
  FormItem,
  Input,
  Message
} from "view-design";
import Edit from "./Edit.vue";
import store from "../../../../store";
import EmailAPI from "../../../../api/example/email/EmailAPI";
import EmailInfo4Jeesite from "../../../../model/example/send/EmailInfo4Jeesite";
import EmailAPI4Jeesite from "../../../../api/example/email/impl/EmailAPI4Jessite";
import TableData from "../../../../model/example/global/TableData";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import Extend4Jeesite from "../../../../model/heart/global/Extend4Jeesite";
import Commons from "../../../../utils/heart/Commons";

import TreeList from "../../../../model/example/global/TreeList";
// import Tree from "./Tree.vue";

// import OpenedInfo from "../../../../model/heart/global/OpenedInfo";

@Component({
  name: "sendbox-table",
  components: {
    Edit,
    Button,
    Table,
    Modal,
    Input,
    FormItem,
    Form,
    Message
  }
})
export default class SendboxTable extends Vue {
  sendList: Array<EmailInfo4Jeesite> = [];
  modalInfo: Array<Extend4Jeesite> = [];
  count = 0;

  tree: Array<EmailInfo4Jeesite> = [];

  isShow = false;
  edit(row: any): void {
    this.isShow = true;
    const sendEmailData: EmailInfo4Jeesite = {
      emailId: row.emailId,
      emailSubject: row.emailSubject,
      receiveEmails: row.receiveEmails,
      emailContent: row.emailContent,
      receiveUserIds: row.receiveUserIds,
      isNewRecord: row.isNewRecord,
      optStatus: 1
    };
    const modalInfo: ModalInfo = {
      url: "/example/email/sendboxlist/Edit.vue",
      title: "详细信息",
      backgroundColor: Commons.getIconColor(),
      width: 850,
      footerHide: false,
      okText: "发送",
      cancelText: "取消",
      className: "send-modal-height",
      data: sendEmailData,
      onOk: this.onOk
    };
    Commons.showModule(modalInfo);
  }
  columns: Array<any> = [
    {
      title: "标题",
      key: "emailSubject"
    },
    {
      title: "收件人",
      key: "receiveEmails"
    },
    {
      title: "日期",
      key: "emailDate"
    },
    {
      title: "操作",
      slot: "action",
      width: "200"
    }
  ];

  created(): void {
    this.getSendList();
  }

  async getSendList() {
    const emailAPI: EmailAPI<EmailInfo4Jeesite> = new EmailAPI4Jeesite();
    const tableData: TableData<EmailInfo4Jeesite> = await emailAPI.getSendboxList();
    this.sendList = tableData.list;
    this.count = tableData.count;
  }

  onOk(): void {
    (async () => {
      const emailAPI: EmailAPI<EmailInfo4Jeesite> = new EmailAPI4Jeesite();
      if (await emailAPI.sentEmail()) {
        this.getSendList();
        (Message as any).success("邮件发送成功");
      } else {
        (Message as any).warning("邮件发送失败");
      }
    })();
  }
}
</script>

<style lang="scss">
.send-modal-height {
  .ivu-modal-body {
    height: 530px !important;
    margin-top: 20px !important;
  }
}
</style>
