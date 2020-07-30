import EmailInfo4Jeesite from "@/model/example/send/EmailInfo4Jeesite";
import { MutationTree } from "vuex";
import { EmailState } from "./types";

export const mutations: MutationTree<EmailState> = {
  /**
   * 保存列表
   */
  setSendboxList(
    state: EmailState,
    sendList: Readonly<Array<EmailInfo4Jeesite>>
  ): void {
    state.sendList = sendList;
  }
};
