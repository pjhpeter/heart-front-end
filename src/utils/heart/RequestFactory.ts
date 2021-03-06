import router from "@/router";
import store from "@/store";
import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { Message } from "view-design";
import { GlobalConfigReader } from "./GlobalConfigReader";
import GlobalConfig from "@/model/heart/global/GlobalConfig";
import NProgress from "./NProgress";

/**
 * 针对Jeesite的请求拦截器
 * @param config 请求配置对象
 * @returns 请求配置对象
 */
function requestInterceptor4Jeesite(
  config: AxiosRequestConfig
): AxiosRequestConfig {
  if (config && config.url) {
    // 验证token，有则进行url添加token，然后发送请求
    const token: string = store.getters["user/getToken"];
    if (token) {
      // 这里是url只能有一个？号，如果url已有问号，则拼接为&
      let end = `__sid=${token}`;
      if (config.url.indexOf("?") > -1) {
        end = `&${end}`;
        config.url += end;
      } else {
        end = `?${end}`;
        config.url += end;
      }
    } else if (config.url.indexOf("/login") > -1) {
      let end = "__sid=";
      if (config.url.indexOf("?") > -1) {
        end = `&${end}`;
        config.url += end;
      } else {
        end = `?${end}`;
        config.url += end;
      }
    }
  }
  return config;
}

/**
 * 针对Jeesite的响应拦截器
 * @param response 响应对象
 * @returns 响应对象
 */
function responseInterceptor4Jeestie(
  response: AxiosResponse<any>
): AxiosResponse<any> | Promise<AxiosResponse<any>> {
  // 即使response.status等于200也有可能会有异常
  // 所以一般都需要自定义返回码规则
  // 统一异常处理
  // 判断会话是否过期，如果过期返回登录页
  if (response.data.result === "login") {
    // 清理本地的用户信息
    // 进行登出的function(){}。。。
    store.commit("user/clearUserState");
    router.push("/login");
  }
  if (
    response.data.isValidCodeLogin != undefined &&
    !response.data.isValidCodeLogin
  ) {
    (Message as any).warning(
      response.data.message ? response.data.message : "登录失败"
    );
    router.push("/login");
  }
  const resp = response;
  return response;
}

/**
 * Ajax请求工具工厂类，通过getRequestInstance方法获取request实例，request对象封装了向后端服务发送请求的方法
 * @author 彭嘉辉
 */
export default class RequestFactory {
  private static request: AxiosInstance | undefined;
  /**
   * 获取request实例
   * @returns request的单例
   */
  static getRequestInstance(): AxiosInstance {
    if (!RequestFactory.request) {
      let baseURL: string;
      // 判断是否测试环境
      if (process.env.NODE_ENV === "test") {
        // 如果是测试环境，直接设置baseURL为mock的url
        baseURL = process.env.VUE_APP_BASE_URL;
      } else {
        baseURL = RequestFactory.buildBaseURL();
      }
      RequestFactory.request = Axios.create({
        baseURL,
        timeout: 5000
        // 如果用Authorization头来传token的话可以参考下面方式写
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
      });

      // 请求拦截器，----这种按照自己的业务来旧习惯
      RequestFactory.request.interceptors.request.use(
        (config: AxiosRequestConfig) => {
          // 显示顶部进度条
          NProgress.start();
          return requestInterceptor4Jeesite(config);
        },
        error => {
          NProgress.done();
          return Promise.reject(error);
        }
      );

      // 响应拦截，用于统一进行异常处理（通过状态码输出异常）,----这种按照自己的业务来旧习惯
      RequestFactory.request.interceptors.response.use(
        (response: AxiosResponse<any>) => {
          // 结束顶部进度条
          NProgress.done();
          return responseInterceptor4Jeestie(response);
        },
        error => {
          NProgress.done();
          // 这回后台真的抛异常了
          // 异常处理
          const resp = error.response;
          if (!resp) {
            (Message as any).error("暂时连不上服务器，请与管理员联系");
            return Promise.reject(error);
          }
          (Message as any).error(
            resp.data && resp.data.message
              ? resp.data.message
              : `系统异常，错误码为：${resp.status}`
          );
          return Promise.reject(error);
        }
      );
    }
    return RequestFactory.request;
  }

  /**
   * 生成请求的前置路径
   * @returns 请求前置地址
   */
  static buildBaseURL(): string {
    const globalConfig: GlobalConfig = GlobalConfigReader.readGlobalConfig();
    // 开发环境或则使用反向代理的生产环境使用环境变量配置
    if (globalConfig.reverseProxy) {
      return process.env.VUE_APP_PROXY_URI;
    }
    // 不能使用反向代理的生产环境直接读取后端服务地址
    return globalConfig.serverURL;
  }

  /**
   * 清空request实例
   */
  static clearRequest(): void {
    RequestFactory.request = undefined;
  }
}
