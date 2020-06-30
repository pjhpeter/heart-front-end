import LoginParams from "@/heart/model/user/LoginParams";
import UserAPI4Jeesit from "@/heart/api/user/impl/UserAPI4Jeesite";
import UserAPI from "@/heart/api/user/UserAPI";
import store from "@/heart/store";
import UserInfo from "@/heart/model/user/UserInfo";
import { LocalStorageKeys } from "@/heart/constants/enum/LocalStorageKeys";

let userAPI: UserAPI<UserInfo>;
beforeAll(() => {
  userAPI = new UserAPI4Jeesit();
});

describe("测试login方法", () => {
  it("登录", async () => {
    const loginParams: LoginParams = {
      username: "test",
      password: "abcd1234"
    };
    const result: boolean = await userAPI.login(loginParams);
    expect(result).toBeTruthy();

    const token: string = store.getters["user/getToken"];
    const user: UserInfo = store.getters["user/getUser"];
    expect(token).toBeDefined();
    expect(user).toBeDefined();

    const localToken: string | null = localStorage.getItem(
      LocalStorageKeys.USER_TOKEN
    );
    const userInfoStr: string | null = localStorage.getItem(
      LocalStorageKeys.USER_INFO
    );
    expect(localToken).not.toBeNull();
    expect(userInfoStr).not.toBeNull();
  });
});

describe("测试logout方法", () => {
  it("登出", async () => {
    const localToken = "test";
    const localUser: UserInfo = {
      loginCode: "test",
      userName: "测试"
    };
    localStorage.setItem(LocalStorageKeys.USER_TOKEN, localToken);
    localStorage.setItem(LocalStorageKeys.USER_INFO, JSON.stringify(localUser));
    const restult: boolean = await userAPI.logout();
    expect(restult).toBeTruthy();

    const stateToken: string = store.getters["user/getToken"];
    const stateUser: UserInfo = store.getters["user/getUser"];
    expect(stateToken).toBe("");
    expect(stateUser).toBeNull();

    const token: string | null = localStorage.getItem(
      LocalStorageKeys.USER_TOKEN
    );
    const userInfoStr: string | null = localStorage.getItem(
      LocalStorageKeys.USER_INFO
    );
    expect(token).toBeNull();
    expect(userInfoStr).toBeNull();
  });
});

afterEach(() => {
  localStorage.clear();
});

describe("测试getUserInfo方法", () => {
  it("获取当前用户数据", async () => {
    expect.assertions(1);
    const userInfo: UserInfo | null = await userAPI.getUserInfo();
    expect(userInfo).not.toBeNull();
  });
});
