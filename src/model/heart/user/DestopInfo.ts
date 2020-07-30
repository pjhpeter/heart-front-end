import ModalInfo from "../global/ModalInfo";

/**
 * 快捷方式信息
 * @author 彭嘉辉
 */
export default interface DestopInfo {
  // 用户唯一标识
  userCode: string;
  // 用户对应的快捷方式对应的模态框信息
  modalInfoList: Array<ModalInfo>;
  // 锁屏图片路径
  lockImageUrl?: string;
  // 壁纸路径
  wallpaperUrl?: string;
  // 主题类名
  theme?: string;
}
