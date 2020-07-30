import EmailInfo4Jeestie from "@/model/example/send/EmailInfo4Jeesite";
import { RootState } from "@/store/types";
import { GetterTree } from "vuex";
import { EmailState } from "./types";

export const getters: GetterTree<EmailState, RootState> = {
  /**
   * 获取发送邮件列表
   * @param state
   */
  getSendboxList(state: EmailState): Readonly<Array<EmailInfo4Jeestie>> {
    if (state.sendList) {
      return state.sendList;
    }
    return [];
  }
};
