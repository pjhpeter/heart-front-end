import Auth from "@/utils/Auth";
import { LocalStorageKeys } from "@/constants/enum/LocalStorageKeys";
import { UserInfo } from "@/model/user/UserInfo";

describe("测试setToken方法", () => {
  it("保存token-'test'", () => {
    Auth.setToken("test");
    const token: string | null = localStorage.getItem(
      LocalStorageKeys.USER_TOKEN
    );
    expect(token).toBe("test");
  });
});

describe("测试getToken方法", () => {
  it("读取保存好的token", () => {
    localStorage.setItem(LocalStorageKeys.USER_TOKEN, "test");
    const token: string = Auth.getToken();
    expect(token).toBe("test");
  });

  it("读取空token", () => {
    const token: string = Auth.getToken();
    expect(token).toBe("");
  });
});

describe("测试setUserInfo方法", () => {
  it("保存用户信息", () => {
    // 必须断言一次，保证测试用例准确性
    expect.assertions(1);
    Auth.setUserInfo({
      loginCode: "test",
      userName: "测试"
    });
    const userInfoStr: string | null = localStorage.getItem(
      LocalStorageKeys.USER_INFO
    );
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      expect(userInfo).toMatchObject({
        loginCode: "test",
        userName: "测试"
      });
    }
  });
});

describe("测试getUserInfo方法", () => {
  it("读取保存好的用户信息", () => {
    const userInfo: UserInfo = {
      loginCode: "test",
      userName: "测试"
    };
    localStorage.setItem(LocalStorageKeys.USER_INFO, JSON.stringify(userInfo));
    const result: UserInfo | null = Auth.getUserInfo();
    expect(result).toMatchObject({
      loginCode: "test",
      userName: "测试"
    });
  });

  it("读取空用户信息", () => {
    const userInfo: UserInfo | null = Auth.getUserInfo();
    expect(userInfo).toBeNull();
  });
});

describe("测试clearAuth方法", () => {
  it("清空令牌和用户信息", () => {
    localStorage.setItem(LocalStorageKeys.USER_TOKEN, "test");
    const userInfo: UserInfo = {
      loginCode: "test",
      userName: "测试"
    };
    localStorage.setItem(LocalStorageKeys.USER_INFO, JSON.stringify(userInfo));
    Auth.clearAuth();
    const token = localStorage.getItem(LocalStorageKeys.USER_TOKEN);
    const userInfoResult = localStorage.getItem(LocalStorageKeys.USER_INFO);
    expect(token).toBeNull();
    expect(userInfoResult).toBeNull();
  });
});

afterEach(() => {
  localStorage.clear();
});
