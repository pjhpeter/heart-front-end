import { MenuState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/store/types";
import { mutations } from "./mutations";

const namespaced = true;

export const state: MenuState = {
  menuTree: null,
  router: null
};

export const menu: Module<MenuState, RootState> = {
  namespaced,
  state,
  mutations
};
