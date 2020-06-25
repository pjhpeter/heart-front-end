import { MenuState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/heart/store/types";
import { mutations } from "./mutations";
import { actions } from "./actions";

const namespaced = true;

export const state: MenuState = {
  menuTree: null,
  router: null
};

export const menu: Module<MenuState, RootState> = {
  namespaced,
  state,
  mutations,
  actions
};
