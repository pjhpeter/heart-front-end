import { Module } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "./types";
import { mutations } from "./mutations";
import { getters } from "./getters";
import Auth from "@/utils/heart/Auth";
import UserInfo from "@/model/heart/user/UserInfo";
import { WALLPAPER_URLS } from "@/constants/heart/values/Global";
import DestopInfo from "@/model/heart/user/DestopInfo";

const namespaced = true;

const userInfo: UserInfo | null = Auth.getUserInfo();
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
