import { mutations } from "@/store/modules/user/mutations";
import { getters } from "@/store/modules/user/getters";
import { LocalStorageKeys } from "@/constants/enum/LocalStorageKeys";
import { UserState } from "@/store/modules/user/types";
import UserInfo from "@/model/user/UserInfo";

describe("测试mutations", () => {
  let state: UserState;

  beforeEach(() => {
    state = {
      token: "",
      user: null
    };
  });

  describe("测试setToken方法", () => {
    it("保存token", () => {
      mutations.setToken(state, "test");
      const localToken: string = localStorage.getItem(
        LocalStorageKeys.USER_TOKEN
      )!;
      const stateToken: string = state.token;
      expect(localToken).toBe("test");
      expect(stateToken).toBe("test");
    });
  });

  describe("测试setUser方法", () => {
    it("保存user", () => {
      const userInfo: UserInfo = {
        loginCode: "test",
        userName: "测试"
      };
      mutations.setUser(state, userInfo);
      const localUserInfo: UserInfo = JSON.parse(
        localStorage.getItem(LocalStorageKeys.USER_INFO)!
      ) as UserInfo;
      const stateUserInfo: UserInfo = state.user!;
      expect(localUserInfo).toMatchObject({
        loginCode: "test",
        userName: "测试"
      });
      expect(stateUserInfo).toMatchObject({
        loginCode: "test",
        userName: "测试"
      });
    });
  });

  describe("测试clearUserState方法", () => {
    it("清空UserState和localStorage对应的属性值", () => {
      const token = "test";
      const userInfo: UserInfo = {
        loginCode: "test",
        userName: "测试"
      };
      state = {
        token: token,
        user: userInfo
      };
      localStorage.setItem(LocalStorageKeys.USER_TOKEN, token);
      localStorage.setItem(
        LocalStorageKeys.USER_INFO,
        JSON.stringify(userInfo)
      );
      mutations.clearUserState(state);

      const localToken: string | null = localStorage.getItem(
        LocalStorageKeys.USER_TOKEN
      );
      const localUserInfoStr: string | null = localStorage.getItem(
        LocalStorageKeys.USER_INFO
      );

      expect(state).toMatchObject({
        token: "",
        user: null
      });
      expect(localToken).toBeNull();
      expect(localUserInfoStr).toBeNull();
    });
  });

  afterEach(() => {
    localStorage.clear();
  });
});

describe("测试getters", () => {
  let state: UserState;
  beforeAll(() => {
    state = {
      token: "test",
      user: {
        loginCode: "test",
        userName: "测试"
      }
    };
  });
  describe("测试getToken", () => {
    it("读取token", () => {
      // Getter的类型一定要传4个参数，所以只能这样了
      const token: string = getters.getToken(state, null, {}, null);
      const user: UserInfo = getters.getUser(state, null, {}, null);
      expect(token).toBe("test");
      expect(user).toMatchObject({
        loginCode: "test",
        userName: "测试"
      });
    });
  });
});
