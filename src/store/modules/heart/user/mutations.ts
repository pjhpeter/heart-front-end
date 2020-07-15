import ModalInfo from "@/model/heart/global/ModalInfo";
import DestopInfo from "@/model/heart/user/DestopInfo";
import UserInfo4Jeesite from "@/model/heart/user/UserInfo4Jeesite";
import Auth from "@/utils/heart/Auth";
import { MutationTree } from "vuex";
import { UserState } from "./types";
import { Vue } from "vue-property-decorator";

export const mutations: MutationTree<UserState> = {
  /**
   * 保存令牌
   * @param state 用户模块状态对象
   * @param token 后端返回的令牌字符串
   */
  setToken(state: UserState, token: string): void {
    state.token = token;
    Auth.setToken(token);
  },
  /**
   * 保存用户信息
   * @param state 用户模块状态对象
   * @param userInfo 后端返回的用户信息
   */
  setUser(state: UserState, userInfo: UserInfo4Jeesite): void {
    state.user = userInfo;
    Auth.setUserInfo(userInfo);
  },
  /**
   * 清空令牌和用户信息
   * @param state 用户模块状态对象
   */
  clearUserState(state: UserState): void {
    state.token = "";
    state.user = null;
    Auth.clearAuth();
  },

  /**
   * 一次性更新桌面信息到localStorage
   * @param state 用户模块状态对象
   */
  setDestopInfoList(state: UserState): void {
    // 将快捷方式数据写入localStoraage
    Auth.setDestopInfoList(state.destopInfoList);
  },

  /**
   * 添加快捷方式
   * @param state 用户模块状态对象
   * @param modalInfo 快捷方式对应的模态框信息
   */
  addDestopShotcut(state: UserState, modalInfo: ModalInfo): void {
    if (!state.user) return;
    const userCode: string | undefined = state.user.userCode;
    // 判断是否有当前用户用户快捷方式信息，有则把模态框信息添加到快捷方式信息中
    let isModalExist = true;
    const flag: boolean = state.destopInfoList.some(
      (destopShotcutInfo: DestopInfo) => {
        if (userCode === destopShotcutInfo.userCode) {
          isModalExist = destopShotcutInfo.modalInfoList.some(
            (modal: ModalInfo) => {
              if (modalInfo.url === modal.url) {
                return true;
              }
              return false;
            }
          );

          // 判断模态框信息是否已存在
          if (!isModalExist) {
            // 不存在才添加
            destopShotcutInfo.modalInfoList.push(modalInfo);
          }
          return true;
        }
        return false;
      }
    );

    if (!flag) {
      // 没有当前用户用户快捷方式信息先添加一下
      state.destopInfoList.push({
        userCode,
        modalInfoList: [modalInfo]
      });
    }

    // 只有在当前用户本来没有快捷方式信息，或添加的模态框信息本来不存在时，数据才会变化
    if (!flag || !isModalExist) {
      // 数据产生变化，则将快捷方式数据写入localStoraage
      Auth.setDestopInfoList(state.destopInfoList);
    }
  },

  /**
   * 移除快捷方式
   * @param state 用户模块状态对象
   * @param modalInfo 快捷方式对应的模态框信息
   */
  removeDestopShotcut(state: UserState, modalInfo: ModalInfo): void {
    if (!state.user) return;
    const userCode: string | undefined = state.user.userCode;
    // 找出当前用户快捷方式信息，并删除对应模态框信息
    // 标记是否有数据被修改
    let flag = false;
    state.destopInfoList.some((destopShotcutInfo: DestopInfo) => {
      if (userCode === destopShotcutInfo.userCode) {
        // 删除模态框信息
        flag = destopShotcutInfo.modalInfoList.some(
          (modal: ModalInfo, index: number) => {
            if (modal.url === modalInfo.url) {
              destopShotcutInfo.modalInfoList.splice(index, 1);
              return true;
            }
            return false;
          }
        );
        return true;
      }
      return false;
    });

    if (flag) {
      // 如果有数据被修改，则将快捷方式数据写入localStoraage
      Auth.setDestopInfoList(state.destopInfoList);
    }
  },

  /**
   * 更改锁屏图片路径
   * @param state 用户模块状态对象
   * @param url 壁纸路径
   */
  setLockImageUrl(state: UserState, url: string) {
    if (!state.user) return;
    const userCode: string | undefined = state.user.userCode;
    // 找到当前用户的桌面信息并更新锁屏图片路径
    const flag: boolean = state.destopInfoList.some(
      (destopInfo: DestopInfo) => {
        if (destopInfo.userCode === userCode) {
          Vue.set(destopInfo, "lockImageUrl", url);
          return true;
        }
        return false;
      }
    );

    // 锁屏被修改，则保存到localStorage中
    if (flag) {
      Auth.setDestopInfoList(state.destopInfoList);
    }
  },

  /**
   * 更改壁纸路径
   * @param state 用户模块状态对象
   * @param url 壁纸路径
   */
  setWallpaperUrl(state: UserState, url: string) {
    if (!state.user) return;
    const userCode: string | undefined = state.user.userCode;
    // 找到当前用户的桌面信息并更新壁纸路径
    const flag: boolean = state.destopInfoList.some(
      (destopInfo: DestopInfo) => {
        if (destopInfo.userCode === userCode) {
          Vue.set(destopInfo, "wallpaperUrl", url);
          return true;
        }
        return false;
      }
    );

    // 壁纸被修改，则保存到localStorage中
    if (flag) {
      Auth.setDestopInfoList(state.destopInfoList);
    }
  },

  /**
   * 更新主题
   * @param state 用户模块状态对象
   * @param theme 主题类名，Themes枚举的key
   */
  setTheme(state: UserState, theme: string): void {
    if (!state.user) return;
    const userCode: string | undefined = state.user.userCode;
    // 找到当前用户的桌面信息并更新
    const flag: boolean = state.destopInfoList.some(
      (destopInfo: DestopInfo) => {
        if (destopInfo.userCode === userCode) {
          Vue.set(destopInfo, "theme", theme);
          return true;
        }
        return false;
      }
    );

    // 壁纸被修改，则保存到localStorage中
    if (flag) {
      Auth.setDestopInfoList(state.destopInfoList);
    }
  }
};
