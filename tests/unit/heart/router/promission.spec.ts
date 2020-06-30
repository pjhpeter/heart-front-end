import { LocalStorageKeys } from "@/heart/constants/enum/LocalStorageKeys";
import { beforeEach } from "@/promission";
import { Route } from "vue-router";
import store from "@/heart/store";

let path = "/";
const next = jest.fn((nextPath: any) => {
  path = nextPath;
});

describe("测试导航守卫", () => {
  it("登录", () => {
    const to: Route = {
      path: "/login",
      hash: "",
      fullPath: "/login",
      matched: [],
      params: {},
      query: {}
    };

    const from: Route = {
      path: "/",
      hash: "",
      fullPath: "/",
      matched: [],
      params: {},
      query: {}
    };
    beforeEach(to, from, next);
    expect(next).toBeCalled();
    expect(path).toBeUndefined();
  });

  it("没有token，重新登录", () => {
    const to: Route = {
      path: "/home",
      hash: "",
      fullPath: "/home",
      matched: [],
      params: {},
      query: {}
    };

    const from: Route = {
      path: "/",
      hash: "",
      fullPath: "/",
      matched: [],
      params: {},
      query: {}
    };
    beforeEach(to, from, next);
    expect(next).toBeCalled();
    expect(path).toBe("/login");
  });

  it("成功跳转", async () => {
    store.commit("user/setToken", "test");
    const to: Route = {
      path: "/home",
      hash: "",
      fullPath: "/home",
      matched: [],
      params: {},
      query: {}
    };

    const from: Route = {
      path: "/",
      hash: "",
      fullPath: "/",
      matched: [],
      params: {},
      query: {}
    };
    await beforeEach(to, from, next);
    expect(next).toBeCalled();
    expect(path).toBeUndefined();
  });

  // 这个测试要修改获取当前用户信息的mock接口，响应不对应的用户信息，因此成功跳转和过期不能同时被测试
  // it("token过期", async () => {
  //     store.commit("user/setToken", "test");
  //     let to: Route = {
  //         path: "/home",
  //         hash: "",
  //         fullPath: "/home",
  //         matched: [],
  //         params: {},
  //         query: {}
  //     };

  //     let from: Route = {
  //         path: "/",
  //         hash: "",
  //         fullPath: "/",
  //         matched: [],
  //         params: {},
  //         query: {}
  //     };
  //     await beforeEach(to, from, next);
  //     expect(next).toBeCalled();
  //     expect(path).toBe("/login");
  // });
});

afterEach(() => {
  path = "/";
  store.commit("user/clearUserState");
});
