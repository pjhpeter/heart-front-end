import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { user } from "./modules/user";
import { menu } from "./modules/menu";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    user,
    menu
  }
};

export default new Vuex.Store(store);
