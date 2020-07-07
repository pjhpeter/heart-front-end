import { Module } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "./types";
import { mutations } from "./mutations";
import { getters } from "./getters";
import Auth from "@/utils/heart/Auth";
import UserInfo from "@/model/heart/user/UserInfo";

const namespaced = true;

const userInfo: UserInfo | null = Auth.getUserInfo();

export const state: UserState = {
  token: Auth.getToken(),
  user: userInfo,
  destopShotcutList: Auth.getDestopShotcut()
};

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  mutations,
  getters
};
