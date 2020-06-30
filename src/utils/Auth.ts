import { LocalStorageKeys } from "@/constants/enum/LocalStorageKeys";
import UserInfo from "@/model/user/UserInfo";

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
}
