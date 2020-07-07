import ModalInfo from "@/model/heart/global/ModalInfo";
import DestopShotcutInfo from "@/model/heart/user/DestopShotcutInfo";
import UserInfo from "@/model/heart/user/UserInfo";
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
  setUser(state: UserState, userInfo: UserInfo): void {
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
   * 添加快捷方式
   * @param state 用户模块状态对象
   * @param modalInfo 快捷方式对应的模态框信息
   */
  addDestopShotcut(state: UserState, modalInfo: ModalInfo): void {
    const userCode: string = (state.user as any).userCode;
    // 判断是否有当前用户用户快捷方式信息，有则把模态框信息添加到快捷方式信息中
    let isModalExist = true;
    const flag: boolean = state.destopShotcutList.some(
      (destopShotcutInfo: DestopShotcutInfo) => {
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
      state.destopShotcutList.push({
        userCode,
        modalInfoList: [modalInfo]
      });
    }

    // 只有在当前用户本来没有快捷方式信息，或添加的模态框信息本来不存在时，数据才会变化
    if (!flag || !isModalExist) {
      // 数据产生变化，则将快捷方式数据写入localStoraage
      Auth.setDestopShotcut(state.destopShotcutList);
    }
  },

  /**
   * 移除快捷方式
   * @param state 用户模块状态对象
   * @param modalInfo 快捷方式对应的模态框信息
   */
  removeDestopShotcut(state: UserState, modalInfo: ModalInfo): void {
    const userCode: string = (state.user as any).userCode;
    // 找出当前用户快捷方式信息，并删除对应模态框信息
    // 标记是否有数据被修改
    let flag = false;
    state.destopShotcutList.some((destopShotcutInfo: DestopShotcutInfo) => {
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
      Auth.setDestopShotcut(state.destopShotcutList);
    }
  },

  /**
   * 更新桌面快捷方式，主要是拿来改颜色
   * @param state 用户模块状态对象
   * @param modalInfo 新的快捷方式对应的模态框信息
   */
  updateDestopShotcut(state: UserState, modalInfo: ModalInfo): void {
    const userCode: string = (state.user as any).userCode;
    // 找出当前用户快捷方式信息，并更新对应模态框信息
    // 标记是否有数据被修改
    let flag = false;
    state.destopShotcutList.some((destopShotcutInfo: DestopShotcutInfo) => {
      if (userCode === destopShotcutInfo.userCode) {
        // 删除模态框信息
        flag = destopShotcutInfo.modalInfoList.some(
          (modal: ModalInfo, index: number) => {
            if (modal.url === modalInfo.url) {
              destopShotcutInfo.modalInfoList[0] = modalInfo;
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
      Auth.setDestopShotcut(state.destopShotcutList);
    }
  }
};
