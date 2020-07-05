import { GlobalState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/store/types";
import { mutations } from "./mutations";
import { getters } from "./getters";

const namespaced = true;

export const state: GlobalState = {
  openedList: [],
  showedFooter: true
};

export const globals: Module<GlobalState, RootState> = {
  namespaced,
  state,
  mutations,
  getters
};
