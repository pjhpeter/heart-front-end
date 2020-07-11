import { GetterTree } from "vuex";
import { UserState } from "./types";
import { RootState } from "@/store/types";
import UserInfo from "@/model/heart/user/UserInfo";
import ModalInfo from "@/model/heart/global/ModalInfo";
import DestopInfo from "@/model/heart/user/DestopInfo";
import { WALLPAPER_URLS } from "@/constants/heart/values/Global";

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
  getDestopShotcutList(state: UserState): Array<ModalInfo> {
    if (!state.user) return [];
    const userCode: string = state.user.userCode;
    let destopInfo: DestopInfo | undefined;
    // 找出当前用户快捷方式信息
    state.destopInfoList.some((destop: DestopInfo) => {
      if (userCode === destop.userCode) {
        destopInfo = destop;
        return true;
      }
      return false;
    });

    if (destopInfo) {
      return destopInfo.modalInfoList;
    }
    // 如果当前用户没有桌面信息则初始化
    const initDestopInfo: DestopInfo = {
      userCode,
      modalInfoList: [],
      wallpaperUrl: WALLPAPER_URLS[0]
    };
    state.destopInfoList.push(initDestopInfo);
    return [];
  },

  /**
   * 获取当前壁纸
   * @param state 用户模块状态对象
   * @returns 当前壁纸路径
   */
  getWallpaperUrl(state: UserState): string {
    if (!state.user) return WALLPAPER_URLS[0];
    const userCode: string = state.user.userCode!;
    // 找到当前用户的桌面信息
    const currentUserDestopInfo:
      | DestopInfo
      | undefined = state.destopInfoList.find((destopInfo: DestopInfo) => {
      return destopInfo.userCode === userCode;
    });
    if (currentUserDestopInfo && currentUserDestopInfo.wallpaperUrl) {
      // 如果用户配置了壁纸，则返回用户配置
      return currentUserDestopInfo.wallpaperUrl;
    }
    // 返回默认
    return WALLPAPER_URLS[0];
  }
};
