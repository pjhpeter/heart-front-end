import { GlobalState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/store/types";
import { mutations } from "./mutations";
import { getters } from "./getters";
import Auth from "@/utils/heart/Auth";

const namespaced = true;

export const state: GlobalState = {
  openedList: [],
  showedFooter: true,
  locked: Auth.getLocked(),
  fullscreen: false,
  rememberMe: Auth.getRememberMe()
};

export const globals: Module<GlobalState, RootState> = {
  namespaced,
  state,
  mutations,
  getters
};
