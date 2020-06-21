import Vue from "vue";
import Vuex from "vuex";
import UserState from "./modules/UserState";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: UserState
  }
});
