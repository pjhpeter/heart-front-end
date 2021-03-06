import DestopInfo from "@/model/heart/user/DestopInfo";
import UserInfo4Jeesite from "@/model/heart/user/UserInfo4Jeesite";
import { RootState } from "@/store/types";
import Auth from "@/utils/heart/Auth";
import { Module } from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { UserState } from "./types";

const namespaced = true;

const userInfo: UserInfo4Jeesite | null = Auth.getUserInfo();
const destopInfoList: Array<DestopInfo> = Auth.getDestopInfoList();

export const state: UserState = {
  token: Auth.getToken(),
  user: userInfo,
  destopInfoList: destopInfoList
};

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  mutations,
  getters
};
