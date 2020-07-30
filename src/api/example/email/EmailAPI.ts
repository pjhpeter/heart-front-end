import TableData from "@/model/example/global/TableData";
import TreeNode from "@/model/example/send/TreeNode";

export default interface EmailAPI<T> {
  getSendboxList(requestParams?: object): TableData<T>;
  getInboxList(requestParams?: object): TableData<T>;
  getTree(requestParams?: object): Array<TreeNode>;
  sentEmail(requestParams?: object): boolean;
}
