import LoginParams from "@/model/heart/user/LoginParams";
import UserAPI4Jeesit from "@/api/heart/user/impl/UserAPI4Jeesite";
import UserAPI from "@/api/heart/user/UserAPI";
import store from "@/store";
import UserInfo4Jeesite from "@/model/heart/user/UserInfo";
import { LocalStorageKeys } from "@/constants/heart/enum/LocalStorageKeys";

let userAPI: UserAPI<UserInfo4Jeesite>;
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
    const user: UserInfo4Jeesite = store.getters["user/getUser"];
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
    const localUser: UserInfo4Jeesite = {
      userCode: "123",
      loginCode: "test",
      userName: "测试"
    };
    localStorage.setItem(LocalStorageKeys.USER_TOKEN, localToken);
    localStorage.setItem(LocalStorageKeys.USER_INFO, JSON.stringify(localUser));
    const restult: boolean = await userAPI.logout();
    expect(restult).toBeTruthy();

    const stateToken: string = store.getters["user/getToken"];
    const stateUser: UserInfo4Jeesite = store.getters["user/getUser"];
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
    const userInfo: UserInfo4Jeesite | null = await userAPI.getUserInfo();
    expect(userInfo).not.toBeNull();
  });
});
