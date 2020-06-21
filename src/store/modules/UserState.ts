import { StoreOptions } from "vuex";

const UserState: StoreOptions<{
  token: "";
}> = {
  getters: {
    getToken(state): string {
      return state.token;
    }
  }
};

export default UserState;
