import EmailAPI from "../EmailAPI";
import EmailInfo4Jeesite from "@/model/example/send/EmailInfo4Jeesite";
import Request from "@/decorator/heart/request/Request";
import { RequestMethod } from "@/constants/heart/enum/RequestEnums";
import TableData from "@/model/example/global/TableData";
import TreeNode from "@/model/example/send/TreeNode";

export default class EmailAPI4Jessite implements EmailAPI<EmailInfo4Jeesite> {
  // 发邮件列表
  @Request(
    "/email/sndbox/listData",
    RequestMethod.POST,
    undefined,
    (error: any) => {}
  )
  getSendboxList(data?: any): TableData<EmailInfo4Jeesite> {
    if (data) {
      return {
        count: data.count,
        list: data.list
      };
    }
    return {
      count: 0,
      list: []
    };
  }
  // 收邮件列表
  @Request(
    "/email/inbox/listData",
    RequestMethod.POST,
    undefined,
    (error: any) => {}
  )
  getInboxList(data?: any): TableData<EmailInfo4Jeesite> {
    if (data) {
      return {
        count: data.count,
        list: data.list
      };
    }
    return {
      count: 0,
      list: []
    };
  }

  // 获取联系人树
  @Request(
    "/email/emailGroupPerson/treeData?isLoadUser=true&isAll=true&___t=:___t",
    RequestMethod.GET,
    undefined,
    (error: any) => {}
  )
  getTree(data?: any): Array<TreeNode> {
    if (data) {
      return data._root_;
    }
    return [];
  }

  // 发邮件
  @Request("/email/save", RequestMethod.POST, undefined, (error: any) => false)
  sentEmail(data?: any): boolean {
    if (data.result === "true") {
      return true;
    }
    return false;
  }
}
