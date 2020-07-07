import ModalInfo from "../global/ModalInfo";

/**
 * 快捷方式信息
 */
export default interface DestopShotcutInfo {
  userCode: string;
  // 用户对应的快捷方式对应的模态框信息
  modalInfoList: Array<ModalInfo>;
}
