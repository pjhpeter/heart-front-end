import RequestFactory from "@/utils/heart/RequestFactory";
import { AxiosInstance } from "axios";
import { LocalStorageKeys } from "@/constants/heart/enum/LocalStorageKeys";

afterEach(() => {
  localStorage.clear();
  RequestFactory.clearRequest();
});

/*
 * 只能用测试环境模拟开发环境的配置进行，test命令回读.env.test文件里面的配置
 */
describe("测试buildBaseURL方法", () => {
  it("模拟开发环境，默认配置", () => {
    const baseURL: string = RequestFactory.buildBaseURL();
    const baseURLExpect = "/dev-api";
    expect(baseURL).toBe(baseURLExpect);
  });

  // it("模拟开发环境，默认配置，如果不改.env.test配置文件的话，这个测试用例永远过不了", () => {
  //   process.env.NODE_ENV = "production";
  //   const baseURL: string = RequestFactory.buildBaseURL();
  //   const baseURLExpect = "/prod";
  //   expect(baseURL).toBe(baseURLExpect);
  // });

  it("测试自定义配置", () => {
    process.env.NODE_ENV = "production";
    localStorage.setItem(
      LocalStorageKeys.GLOBAL_CONFIG,
      JSON.stringify({ reverseProxy: false, serverURL: "127.0.0.1" })
    );
    const baseURL: string = RequestFactory.buildBaseURL();
    const baseURLExpect = "127.0.0.1";
    expect(baseURL).toBe(baseURLExpect);
  });
});

describe("测试getRequestInstance方法", () => {
  it("模拟开发环境，第一次调用", () => {
    const request: AxiosInstance = RequestFactory.getRequestInstance();
    expect(request.defaults).toMatchObject({
      baseURL: "/dev-api",
      timeout: 5000
    });
  });

  it("两次调用，测试单例逻辑", () => {
    RequestFactory.getRequestInstance();
    const requestExpect: AxiosInstance = RequestFactory.getRequestInstance();
    expect(requestExpect.defaults).toMatchObject({
      baseURL: "/dev-api",
      timeout: 5000
    });
  });
});

describe("测试发请求", () => {
  it("测试请求拦截器", async () => {
    const request: AxiosInstance = RequestFactory.getRequestInstance();
    const response = await request({
      // 测试环境下不知道怎么使用vue.config.js配置的请求代理，只能自己拼接url
      url: `${process.env.VUE_APP_BASE_URL}/authInfo`,
      method: "get"
    });
    expect(response.data.result).toBe("true");
  });
});
