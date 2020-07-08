import { Module } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "./types";
import { mutations } from "./mutations";
import { getters } from "./getters";
import Auth from "@/utils/heart/Auth";
import UserInfo from "@/model/heart/user/UserInfo";
import { WALLPAPER_URLS } from "@/constants/heart/values/Global";

const namespaced = true;

const userInfo: UserInfo | null = Auth.getUserInfo();

export const state: UserState = {
  token: Auth.getToken(),
  user: userInfo,
  destopShotcutList: Auth.getDestopShotcut(),
  // TODO:向后端请求壁纸
  wallpaperUrl: WALLPAPER_URLS[0]
};

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  mutations,
  getters
};
