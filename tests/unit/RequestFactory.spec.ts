import RequestFactory from "@/utils/RequestFactory";
import { AxiosInstance } from "axios";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";

afterEach(() => {
  localStorage.clear();
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

  it("模拟开发环境，默认配置，如果不改.env.test配置文件的话，这个测试用例永远过不了", () => {
    process.env.NODE_ENV = "production";
    const baseURL: string = RequestFactory.buildBaseURL();
    const baseURLExpect = "/prod";
    expect(baseURL).toBe(baseURLExpect);
  });

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
