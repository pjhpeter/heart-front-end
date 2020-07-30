import { EmailState } from "./types";
import { Module } from "vuex";
import { RootState } from "@/store/types";
import { mutations } from "./mutations";
import { getters } from "./getters";

const namespaced = true;

export const state: EmailState = {
  sendList: []
};
export const sendbox: Module<EmailState, RootState> = {
  namespaced,
  state,
  mutations,
  getters
};
