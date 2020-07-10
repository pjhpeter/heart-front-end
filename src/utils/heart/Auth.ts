import { LocalStorageKeys } from "@/constants/heart/enum/LocalStorageKeys";
import UserInfo from "@/model/heart/user/UserInfo";
import DestopInfo from "@/model/heart/user/DestopInfo";

/**
 * 用户信息对localStorage的读写操作接口
 * @author 彭嘉辉
 */
export default class Auth {
  /**
   * 保存令牌到localStorage
   * @param token 令牌
   */
  static setToken(token: string): void {
    localStorage.setItem(LocalStorageKeys.USER_TOKEN, token);
  }
  /**
   * 读取localStorage中的令牌信息
   * @returns 令牌
   */
  static getToken(): string {
    let token: string | null = localStorage.getItem(
      LocalStorageKeys.USER_TOKEN
    );
    if (!token) {
      token = "";
    }
    return token;
  }

  /**
   * 保存用户信息到localStorage
   * @param userInfo 用户信息
   */
  static setUserInfo(userInfo: UserInfo): void {
    const userInfoStr: string = JSON.stringify(userInfo);
    localStorage.setItem(LocalStorageKeys.USER_INFO, userInfoStr);
  }

  /**
   * 从localStorage中读取用户信息
   * @returns 用户信息
   */
  static getUserInfo(): UserInfo | null {
    const userInfoStr: string | null = localStorage.getItem(
      LocalStorageKeys.USER_INFO
    );
    if (!userInfoStr) {
      return null;
    }
    return JSON.parse(userInfoStr) as UserInfo;
  }

  /**
   * 清空localStorage中的令牌和用户信息
   */
  static clearAuth(): void {
    localStorage.removeItem(LocalStorageKeys.USER_TOKEN);
    localStorage.removeItem(LocalStorageKeys.USER_INFO);
  }

  /**
   * 将快捷方式数据写入localStorage
   * @param destopShotcutList 快捷方式数据
   */
  static setDestopInfoList(destopShotcutList: Array<DestopInfo>) {
    localStorage.setItem(
      LocalStorageKeys.DESTOP_SHOTCUT,
      JSON.stringify(destopShotcutList)
    );
  }

  /**
   * 从localStorage读取桌面数据
   * @returns 快捷方式数据
   */
  static getDestopInfoList(): Array<DestopInfo> {
    const destopInfoListStr: string | null = localStorage.getItem(
      LocalStorageKeys.DESTOP_SHOTCUT
    );
    if (destopInfoListStr) {
      return JSON.parse(destopInfoListStr) as Array<DestopInfo>;
    }
    return [];
  }

  /**
   * 保存锁定状态
   * @param locked 是否锁定
   */
  static setLocked(locked: boolean): void {
    localStorage.setItem(LocalStorageKeys.LOCKED, locked + "");
  }

  /**
   * 获取锁定状态
   * @returns 是否锁定
   */
  static getLocked(): boolean {
    const lockedStr: string | null = localStorage.getItem(
      LocalStorageKeys.LOCKED
    );
    if (lockedStr) {
      return lockedStr === "true";
    }
    // 默认不锁定
    return false;
  }
}
