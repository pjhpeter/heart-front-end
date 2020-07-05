import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { user } from "./modules/user";
import { menu } from "./modules/menu";
import { globals } from "./modules/globals";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    user,
    menu,
    globals
  }
};

export default new Vuex.Store(store);
