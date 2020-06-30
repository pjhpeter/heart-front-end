import { Module } from "vuex";
import { RootState } from "@/store/types";
import { UserState } from "./types";
import { mutations } from "./mutations";
import { getters } from "./getters";
import Auth from "@/utils/Auth";

const namespaced = true;

export const state: UserState = {
  token: Auth.getToken(),
  user: Auth.getUserInfo()
};

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  mutations,
  getters
};
