import { GetterTree } from "vuex";
import { UserState } from "./types";
import { RootState } from "@/store/types";
import UserInfo from "@/model/heart/user/UserInfo";
import ModalInfo from "@/model/heart/global/ModalInfo";
import DestopShotcutInfo from "@/model/heart/user/DestopShotcutInfo";

export const getters: GetterTree<UserState, RootState> = {
  /**
   * 读取令牌
   * @param state 用户模块状态对象
   * @returns 令牌
   */
  getToken(state: UserState): string {
    return state.token;
  },

  /**
   * 读取用户信息
   * @param state 用户模块状态对象
   * @returns 用户信息
   */
  getUser(state: UserState): UserInfo | null {
    return state.user;
  },

  /**
   * 读取当前用户桌面快捷方式列表
   * @param state 用户模块状态对象
   */
  getDestopShotcutInfo(state: UserState): Array<ModalInfo> {
    const userCode: string = (state.user as any).userCode;
    let destopShotcutInfo: DestopShotcutInfo | undefined;
    // 找出当前用户快捷方式信息
    state.destopShotcutList.some((destopShotcut: DestopShotcutInfo) => {
      if (userCode === destopShotcut.userCode) {
        destopShotcutInfo = destopShotcut;
        return true;
      }
      return false;
    });

    if (destopShotcutInfo) {
      return destopShotcutInfo.modalInfoList;
    }
    return [];
  },

  /**
   * 获取当前壁纸
   * @param state 用户模块状态对象
   * @returns 当前壁纸路径
   */
  getWallpaperUrl(state: UserState): string {
    return state.wallpaperUrl;
  }
};
