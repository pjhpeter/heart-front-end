import { Tree } from "view-design";

export default interface TreeNode {
  id: string;
  pId?: string;
  name?: string;
  title?: string;
  children?: Array<TreeNode>;
  currentName?: Array<TreeNode>;
  currentNodeName?: string;
  checked?: boolean;
  isParent?: boolean;
  expand?: boolean;
}
