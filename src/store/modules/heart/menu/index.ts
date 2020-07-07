import { MenuState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/store/types";
import { mutations } from "./mutations";
import { getters } from "./getters";

const namespaced = true;

export const state: MenuState = {
  menuTree: null,
  menuItemList: []
};

export const menu: Module<MenuState, RootState> = {
  namespaced,
  state,
  mutations,
  getters
};
