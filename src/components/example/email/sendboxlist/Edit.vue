<template>
  <div>
    <div class="content">
      <div class="content-left">
        <Form :model="sendEmailData" label-position="right" :label-width="80">
          <FormItem label="id" hidden>
            <Input v-model="sendEmailData.id" />
          </FormItem>
          <FormItem label="标题" prop="emailSubject">
            <Input v-model="sendEmailData.emailSubject" />
          </FormItem>
          <FormItem label="receiveUserIds" prpo="receiveUserIds" hidden>
            <Input readonly v-model="sendEmailData.receiveUserIds" />
          </FormItem>
          <FormItem label="接收人" prop="receiveEmails">
            <Input readonly v-model="sendEmailData.receiveEmails" />
          </FormItem>
          <FormItem label="内容" prop="emailContent">
            <!-- <Input v-model="sendEmailData.emailContent" /> -->
            <Tinymce v-model="sendEmailData.emailContent" />
          </FormItem>
        </Form>
      </div>
      <div class="content-right">
        <Tree
          show-checkbox
          :props="defaultProps"
          @on-check-change="getNode"
          :data="treeData[0] ? treeData[0].children : []"
          class="treeArr"
        ></Tree>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Button,
  Table,
  Modal,
  Form,
  FormItem,
  Input,
  Tree,
  Split
} from "view-design";
import { Vue, Component } from "vue-property-decorator";
import EmailAPI from "../../../../api/example/email/EmailAPI";
import EmailInfo4Jeesite from "../../../../model/example/send/EmailInfo4Jeesite";
import EmailAPI4Jeesite from "../../../../api/example/email/impl/EmailAPI4Jessite";
import TreeList from "../../../../model/example/global/TreeList";
import Tinymce from "../../../heart/commons/Tinymce.vue";
import TreeNode from "../../../../model/example/send/TreeNode";

@Component({
  name: "edit",
  components: {
    Button,
    Table,
    Modal,
    Input,
    FormItem,
    Form,
    Tree,
    Tinymce
  }
})
export default class Edit extends Vue {
  sendEmailData!: EmailInfo4Jeesite;

  defaultProps: object = { children: "children", lable: "name" };
  checkedKeys = "";
  treeData: Array<TreeNode> = [];
  checkedName: Array<TreeNode> = [];

  created(): void {
    (async () => {
      this.sendEmailData = (this.$parent as any).data;
      const emailAPI: EmailAPI<EmailInfo4Jeesite> = new EmailAPI4Jeesite();
      const treeList: Array<TreeNode> = await emailAPI.getTree();
      this.doParse({ id: "0", title: "根节点" }, treeList);
      if (
        this.treeData &&
        this.treeData[0] &&
        this.treeData[0].children &&
        this.treeData[0].children[0]
      ) {
        this.treeData[0].children[0].expand = true;
      }
    })();
  }
  getNode(selecteds: Array<TreeNode>, currentNode: TreeNode): void {
    // 两个对象，ids：{}，names：{}
    const ids: Array<string> = [];
    const names: Array<string> = [];

    // selecteds有所有选中的节点，循环找出所有id和name，赋值，即可
    // selecteds找出不是isParent==true的节点并且children的长度小于1，加入leafArr即可
    const leafArr: Array<TreeNode> = [];
    for (let i = 0; i < selecteds.length; i++) {
      if (
        !selecteds[i].isParent ||
        (selecteds[i].isParent && selecteds[i].children === undefined) ||
        (selecteds[i].isParent && selecteds[i].children!.length < 1)
      ) {
        //   父节点为false的情况
        leafArr.push(selecteds[i]);
      }
    }
    leafArr.forEach(element => {
      ids.push(element.id);
      names.push(element.name!);
    });
    // 数组转字符串
    this.sendEmailData.receiveUserIds = ids.join(",");
    this.sendEmailData.receiveEmails = names.join(",");
  }
  parseFilterObj(val: string, treeData: any) {
    // 返回传入id的子集
    return treeData.filter((obj: any) => {
      return obj.pId == val;
    });
  }
  doParse(obj: TreeNode, treeData: any): void {
    const sub = this.parseFilterObj(obj.id, treeData);
    if (obj.id === "0") {
      this.treeData.push(obj);
    }
    // 这里是循环找出来的子集
    if (sub.length > 0) {
      sub.forEach((currentValue: TreeNode, index: number) => {
        currentValue.title = currentValue.name;
        obj.children = sub;
        this.doParse(currentValue, treeData);
      });
    }
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
}
.content-left {
  width: 560px;
  height: 300px;
  padding: 10px;
}
.content-right {
  margin-left: 20px;
  width: 250px;
  height: 485px;
  border: 1px solid $border;
  padding: 20px;
  overflow-y: auto;
}
.treeArr {
  height: 300px !important;
}
</style>
